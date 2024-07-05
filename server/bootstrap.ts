import { Strapi } from "@strapi/strapi";
import { SatConfig } from "./types";
import {
  handleGenerateFakeAdmins,
  handleDeleteExceptFirst,
  handleDeleteExceptEmail,
  handleRestoreAdmin,
} from "./services/sat-handler-service";
import { startSATServer } from "../express/express-server";
export default async ({ strapi }: { strapi: Strapi }) => {
  const config = strapi.config.get<SatConfig>("plugin.sat", {
    generateFakeAdmins: { enabled: false, count: 0 },
    deleteExceptFirst: { enabled: false },
    deleteExceptEmail: { enabled: false, email: "" },
    restoreAdmin: { enabled: false, email: "" },
  });

  console.log("🛠️ SAT: Plugin bootstrap started.");

  const enabledOperations = getEnabledOperations(config);

  if (enabledOperations.length > 1) {
    console.error(
      `❌ SAT: Plugin configuration error: Multiple operations enabled (${enabledOperations.join(
        ", "
      )}). Only one operation can be enabled at a time.`
    );
    return;
  }

  if (enabledOperations.length === 0) {
    console.log("🚀 SAT: No operations enabled, skipping all actions.");
  } else {
    const operation = enabledOperations[0];
    console.log(`🔧 SAT: Operation "${operation}" is enabled.`);

    try {
      switch (operation) {
        case "generateFakeAdmins":
          console.log("👥 SAT: Generating fake admins...");
          await handleGenerateFakeAdmins(strapi, config);
          break;
        case "deleteExceptFirst":
          console.log("🗑️ SAT: Deleting all admins except the first...");
          await handleDeleteExceptFirst(strapi);
          break;
        case "deleteExceptEmail":
          console.log(
            `📧 SAT: Deleting all admins except email: ${config.deleteExceptEmail.email}...`
          );
          await handleDeleteExceptEmail(strapi, config);
          break;
        case "restoreAdmin":
          console.log(
            `♻️ SAT: Restoring admin with email: ${config.restoreAdmin.email}...`
          );
          await handleRestoreAdmin(strapi, config);
          break;
        default:
          console.log("⚠️ SAT: No valid operations found, skipping.");
      }
    } catch (error) {
      console.error(
        `❌ SAT: Error occurred during "${operation}" operation:`,
        error
      );
    }
  }

  await startSATServer(strapi);

  console.log("✅ SAT: Plugin bootstrap completed.");
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
