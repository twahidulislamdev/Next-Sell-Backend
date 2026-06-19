const express = require("express");
const {
  SignUp,
  Login,
  VerifyOtp,
  ResendOtp,
  RefreshToken,
  LogOut,
  LogOutAll,
} = require("./auth.Controller");
const router = express.Router();

// POST /api/v1/auth/signup
router.post("/signup", SignUp);

// POST /api/v1/auth/verify-email
router.post("/verify-email", VerifyOtp);

// POST /api/v1/auth/resend-otp
router.post("/resend-otp", ResendOtp);

// POST /api/v1/auth/login
router.post("/login", Login);

// POST /api/v1/auth/refresh-token
router.post("/refresh-token", RefreshToken);

// POST /api/v1/auth/logout
router.post("/logout", LogOut);

// POST /api/v1/auth/logout-all
router.post("/logout-all", LogOutAll);

module.exports = router;
