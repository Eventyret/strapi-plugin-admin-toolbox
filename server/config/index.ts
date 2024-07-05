export default {
  config: {
    default: ({ env }) => ({
      generateFakeAdmins: {
        enabled: false,
        count: 0,
      },
      deleteExceptFirst: {
        enabled: false,
      },
      deleteExceptEmail: {
        enabled: false,
        email: env("ADMIN_EMAIL_TO_KEEP", ""),
      },
      restoreAdmin: {
        enabled: false,
        email: env("ADMIN_EMAIL_TO_KEEP", ""),
      },
    }),
    validator: (config) => {
      const configTypes = [
        { key: "generateFakeAdmins.enabled", type: "boolean" },
        { key: "generateFakeAdmins.count", type: "number" },
        { key: "deleteExceptFirst.enabled", type: "boolean" },
        { key: "deleteExceptEmail.enabled", type: "boolean" },
        { key: "deleteExceptEmail.email", type: "string" },
        { key: "restoreAdmin.enabled", type: "boolean" },
        { key: "restoreAdmin.email", type: "string" },
      ];

      configTypes.forEach(({ key, type }) => {
        const keys = key.split(".");
        let value = config;

        keys.forEach((k) => {
          if (value) value = value[k];
        });

        if (typeof value !== type) {
          throw new Error(
            `CAM plugin configuration error: ${key} must be of type ${type}`
          );
        }
      });
    },
  },
};
