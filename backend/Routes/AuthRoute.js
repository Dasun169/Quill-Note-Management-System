const express = require("express");
const router = express.Router();
const { Signup, Login, Logout } = require("../Controllers/AuthController");
const {
  userVerification,
  verifyToken,
} = require("../Middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/verify", userVerification);

// Protected route example
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
