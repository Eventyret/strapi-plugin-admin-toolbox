import { Strapi } from "@strapi/strapi";
import { SatConfig } from "./types";
import {
  handleGenerateFakeAdmins,
  handleDeleteExceptFirst,
  handleDeleteExceptEmail,
  handleRestoreAdmin,
} from "./services/sat-handler-service";

export default async ({ strapi }: { strapi: Strapi }) => {
  const config = strapi.config.get<SatConfig>("plugin.sat", {
    generateFakeAdmins: { enabled: false, count: 0 },
    deleteExceptFirst: { enabled: false },
    deleteExceptEmail: { enabled: false, email: "" },
    restoreAdmin: { enabled: false, email: "" },
  });

  const enabledOperations = getEnabledOperations(config);

  if (enabledOperations.length > 1) {
    console.error(
      `❌ SAT: plugin configuration error: Multiple operations enabled (${enabledOperations.join(
        ", "
      )}). Only one operation can be enabled at a time.`
    );
    return;
  }

  if (enabledOperations.length === 0) {
    console.log("🚀 SAT: No operations enabled, skipping all actions.");
    return;
  }

  const operation = enabledOperations[0];
  switch (operation) {
    case "generateFakeAdmins":
      await handleGenerateFakeAdmins(strapi, config);
      break;
    case "deleteExceptFirst":
      await handleDeleteExceptFirst(strapi);
      break;
    case "deleteExceptEmail":
      await handleDeleteExceptEmail(strapi, config);
      break;
    case "restoreAdmin":
      await handleRestoreAdmin(strapi, config);
      break;
    default:
      console.log("No valid operations found, skipping.");
  }
};

const getEnabledOperations = (config: SatConfig): string[] => {
  const operations = [
    {
      key: "generateFakeAdmins",
      enabled: config.generateFakeAdmins?.enabled ?? false,
    },
    {
      key: "deleteExceptFirst",
      enabled: config.deleteExceptFirst?.enabled ?? false,
    },
    {
      key: "deleteExceptEmail",
      enabled: config.deleteExceptEmail?.enabled ?? false,
    },
    { key: "restoreAdmin", enabled: config.restoreAdmin?.enabled ?? false },
  ];

  return operations.filter((op) => op.enabled).map((op) => op.key);
};
