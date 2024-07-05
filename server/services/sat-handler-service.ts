import { Strapi } from "@strapi/strapi";
import { SatConfig } from "../types";

export const handleGenerateFakeAdmins = async (
  strapi: Strapi,
  config: SatConfig
) => {
  const count = config.generateFakeAdmins.count;
  console.log(`Creating ${count} fake admin users...`);
  await strapi.plugin("sat").service("satService").createFakeAdmin();
};

export const handleDeleteExceptFirst = async (strapi: Strapi) => {
  console.log("Deleting all admins except the first one...");
  await strapi.plugin("sat").service("satService").deleteAllAdminsExceptFirst();
};

export const handleDeleteExceptEmail = async (
  strapi: Strapi,
  config: SatConfig
) => {
  const emailToKeep = config.deleteExceptEmail.email;
  console.log(`Deleting all admins except the one with email: ${emailToKeep}`);
  await strapi.plugin("sat").service("satService").deleteAllAdminsExceptEmail();
};
export const handleRestoreAdmin = async (strapi: Strapi, config: SatConfig) => {
  const emailToKeep = config.deleteExceptEmail.email;
  console.log(
    `Setting is_active to "true" for admin with email: ${emailToKeep}`
  );
  await strapi.plugin("sat").service("satService").restoreAdmin();
};
