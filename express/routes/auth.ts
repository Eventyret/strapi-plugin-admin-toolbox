import express from "express";
import crypto from "crypto";

const router = express.Router();

// Generate a random password for each session
const generatePassword = () => {
  return crypto.randomBytes(16).toString("hex");
};

// Route to get the password
router.get("/get-password", (req, res) => {
  if (!req.session.password) {
    req.session.password = generatePassword();
    console.log(`Generated password: ${req.session.password}`);
  }
  console.log("same request sent", req.session.password);
  res.json({ password: req.session.password });
});

// Route to login
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === req.session.password) {
    req.session.isAuthenticated = true;
    res.send("Login successful");
  } else {
    res.status(401).send("Unauthorized");
  }
});

// Route to logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    } else {
      res.send("Logout successful");
    }
  });
});

export default router;
