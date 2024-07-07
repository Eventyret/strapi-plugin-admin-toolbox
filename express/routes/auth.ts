import express from "express";
import jwt from "jsonwebtoken";

const authRoutes = (jwtSecret: string) => {
  const router = express.Router();

  // Route to generate JWT token
  router.get("/authenticate", (req, res) => {
    const token = jwt.sign({ authenticated: true }, jwtSecret, {
      expiresIn: "5m",
    });
    res.json({ token });
  });

  // Route to check JWT token
  router.get("/check-session", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Not authenticated");
    }

    try {
      jwt.verify(token, jwtSecret);
      res.status(200).send("Authenticated");
    } catch (error) {
      res.status(401).send("Not authenticated");
    }
  });

  // Route to logout (invalidate token client-side)
  router.post("/logout", (req, res) => {
    res.status(200).send("Logout successful");
  });

  return router;
};

export default authRoutes;
