import express from "express";

const router = express.Router();

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};

// Protected route example
router.get("/", authMiddleware, (req, res) => {
  res.send("You have accessed a protected route");
});

export default router;
