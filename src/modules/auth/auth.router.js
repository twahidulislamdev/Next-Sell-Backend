const express = require("express");
const { Signup, VerifyEmail, ResendOtp, Login } = require("./auth.Controller");
const router = express.Router();

// POST /api/v1/auth/signup
router.post("/signup", Signup);

// POST /api/v1/auth/verify-email
router.post("/verify-email", VerifyEmail);

// POST /api/v1/auth/resend-otp
router.post("/resend-otp", ResendOtp);

// POST /api/v1/auth/login
router.post("/login", Login);

module.exports = router;
