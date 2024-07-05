import { faker } from "@faker-js/faker";
import { Attribute, Strapi } from "@strapi/strapi";
import { SatConfig } from "../types";

export default ({ strapi }: { strapi: Strapi }) => ({
  createFakeAdmin: async (): Promise<void> => {
    const config = strapi.config.get<SatConfig>("plugin.sat");
    const { enabled, count: adminCount } = config.generateFakeAdmins;

    if (!enabled || adminCount <= 0) {
      console.log(
        "🔧 Fake Admin User creation script is inactive or count is not valid."
      );
      return;
    }

    console.log(
      `🚀 Starting the creation of ${adminCount} fake admin users...`
    );

    console.log("🔍 Finding the admin role...");

    const adminRole = (await strapi.entityService?.findOne(
      "admin::role",
      1
    )) as Attribute.GetValues<"admin::role">;
    if (!adminRole) {
      console.error("❌ Admin role not found");
      return;
    }

    console.log(`🔑 Admin role found: ${adminRole.name}`);

    for (let i = 0; i < adminCount; i++) {
      const fakeAdmin = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        is_active: true,
      };

      try {
        console.log(
          `🛠️ Creating admin user ${i + 1} of ${adminCount}: ${
            fakeAdmin.email
          } - password: ${fakeAdmin.password}`
        );

        (await strapi.entityService?.create("admin::user", {
          data: {
            ...fakeAdmin,
            roles: [adminRole.id],
          },
        })) as Attribute.GetValues<"admin::user">;
      } catch (error) {
        console.error(
          `❌ Error creating admin user ${fakeAdmin.email}:`,
          error
        );
      }
    }

    console.log("🎉 Finished creating fake admin users.");
  },

  deleteExceptFirst: async (): Promise<void> => {
    const config = strapi.config.get<SatConfig>("plugin.sat");
    const { enabled } = config.deleteExceptFirst;

    if (!enabled) {
      console.log(
        "🗑️ Deletion of all admin users except the first one is disabled."
      );
      return;
    }

    console.log(
      "🗑️ Starting deletion of all admin users except the first one with ID 1..."
    );

    try {
      const adminWithId1 = (await strapi
        .query("admin::user")
        ?.findOne({ where: { id: 1 } })) as Attribute.GetValues<"admin::user">;

      let adminToKeep;
      if (adminWithId1) {
        adminToKeep = adminWithId1;
        console.log("🔑 Admin user with ID 1 exists and will be kept.");
      } else {
        const adminUsers = await strapi.entityService?.findMany("admin::user", {
          sort: { createdAt: "asc" },
          limit: 1,
        });

        if (!adminUsers || adminUsers.length === 0) {
          console.log("ℹ️ No admin users found.");
          return;
        }

        adminToKeep = adminUsers[0];
        console.log(
          `🔑 Admin user with ID 1 does not exist. Keeping the first created admin user: ${adminToKeep.email}`
        );
      }

      const allAdminUsers = (await strapi.entityService?.findMany(
        "admin::user",
        {
          filters: {
            id: {
              $ne: adminToKeep.id,
            },
          },
        }
      )) as Attribute.GetValues<"admin::user">[];

      if (!allAdminUsers) {
        console.log("ℹ️ No admin users found.");
        return;
      }

      if (allAdminUsers.length === 0) {
        console.log("ℹ️ No additional admin users to delete.");
        return;
      }

      console.log(`⚠️ About to delete ${allAdminUsers.length} admin users.`);

      for (const admin of allAdminUsers) {
        await strapi.query("admin::user")?.delete({ where: { id: admin.id } });
        console.log(`❌ Deleted admin user: ${admin.email}`);
      }

      // Set is_active to true for the admin to keep
      await strapi.entityService?.update("admin::user", adminToKeep.id, {
        data: { is_active: true },
      });

      console.log("🎉 Finished deleting admin users.");
    } catch (error) {
      console.error("❌ Error deleting admin users:", error);
    }
  },

  deleteExceptEmail: async (): Promise<void> => {
    const config = strapi.config.get<SatConfig>("plugin.sat");
    const { enabled, email: emailToKeep } = config.deleteExceptEmail;

    if (!enabled) {
      console.log(
        "🗑️ Deletion of all admin users except for the specified email is disabled."
      );
      return;
    }

    if (!emailToKeep) {
      console.error(
        "❌ No email address provided in the plugin configuration for ADMIN_EMAIL_TO_KEEP."
      );
      return;
    }

    console.log(
      `🗑️ Starting deletion of all admin users except for: ${emailToKeep}`
    );

    try {
      const adminToKeep = (await strapi.query("admin::user")?.findOne({
        where: { email: emailToKeep },
      })) as Attribute.GetValues<"admin::user">;

      if (!adminToKeep) {
        console.error(
          "❌ Provided email does not exist among admin users. No users will be deleted."
        );
        return;
      }

      const adminUsers = (await strapi.entityService?.findMany("admin::user", {
        filters: {
          email: {
            $ne: emailToKeep,
          },
        },
      })) as Attribute.GetValues<"admin::user">[];

      if (!adminUsers || adminUsers.length === 0) {
        console.log(
          "ℹ️ No admin users to delete or only the specified email exists."
        );
        return;
      }

      console.log(`⚠️ About to delete ${adminUsers.length} admin users.`);

      for (const admin of adminUsers) {
        await strapi.query("admin::user")?.delete({ where: { id: admin.id } });
        console.log(`❌ Deleted admin user: ${admin.email}`);
      }

      (await strapi.entityService?.update("admin::user", adminToKeep.id, {
        data: { is_active: true },
      })) as Attribute.GetValues<"admin::user">;

      console.log("🎉 Finished deleting admin users.");
    } catch (error) {
      console.error("❌ Error deleting admin users:", error);
    }
  },

  restoreAdmin: async (email: string): Promise<void> => {
    try {
      const admin = (await strapi
        .query("admin::user")
        ?.findOne({ where: { email } })) as Attribute.GetValues<"admin::user">;

      if (!admin) {
        console.error(`❌ Admin with email ${email} not found.`);
        return;
      }

      await strapi.entityService?.update("admin::user", admin.id, {
        data: { is_active: true, blocked: false },
      });

      console.log(`🎉 Restored admin user: ${email}`);
    } catch (error) {
      console.error(
        `❌ Error restoring admin user with email ${email}:`,
        error
      );
    }
  },
});
