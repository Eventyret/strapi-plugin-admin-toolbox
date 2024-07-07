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
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send("Error fetching admins");
  }
});

router.post("/admins", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(`Creating admin user: ${firstname} ${lastname} ${email}`);

  // Validate password
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .send(
        "Password must be at least 8 characters long and include at least one uppercase letter and one number."
      );
  }

  try {
    const strapi = getStrapiInstance();
    const adminData = {
      firstname,
      lastname,
      email,
      password: await strapi.service("admin::auth").hashPassword(password),
      isActive: true,
    };
    const newUser = await strapi
      .db!.query("admin::user")
      .create({ data: { ...adminData } });
    res.status(200).send(`User created: ${JSON.stringify(newUser)}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error creating admin user: ${error.message}`);
      res.status(500).send(`Error creating admin user: ${error.message}`);
    }
  }
});

router.post("/admins/delete-except-first", async (req, res) => {
  console.log("Received request to delete all admins except the first");

  // Log received data
  console.log("Request body:", req.body);

  // Here you would call your service to delete all admins except the first
  // Example: await strapi.service('plugin::sat').deleteExceptFirst();

  res
    .status(200)
    .send("Received request to delete all admins except the first");
});

router.post("/admins/keep", async (req, res) => {
  const { emailToKeep } = req.body;
  console.log(`Received request to delete all admins except: ${emailToKeep}`);

  // Log received data
  console.log("Request body:", req.body);

  // Here you would call your service to delete all admins except the selected one
  // Example: await strapi.service('plugin::sat').deleteExceptEmail(emailToKeep);

  res
    .status(200)
    .send(`Received request to delete all admins except: ${emailToKeep}`);
});

router.post("/admins/restore", async (req, res) => {
  const { email } = req.body;
  console.log(`Received request to restore admin user: ${email}`);

  // Log received data
  console.log("Request body:", req.body);

  // Here you would call your service to restore the admin user
  // Example: await strapi.service('plugin::sat').restoreAdmin(email);

  res.status(200).send(`Received request to restore admin user: ${email}`);
});

export default router;
