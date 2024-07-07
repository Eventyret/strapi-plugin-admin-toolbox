import express from "express";
import { getStrapiInstance } from "../strapi";

const router = express.Router();

router.get("/admins", async (req, res) => {
  console.log("Fetching admins");
  try {
    const strapi = getStrapiInstance();
    const admins = await strapi.entityService?.findMany("admin::user", {
      populate: ["*"],
    });
    console.log(admins);
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send("Error fetching admins");
  }
});

export default router;
