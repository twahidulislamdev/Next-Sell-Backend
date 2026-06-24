const express = require("express");
const router = express.Router();

const {
  SignUp,
  Login,
  VerifyOtp,
  ResendOtp,
  RefreshToken,
  LogOut,
  LogOutAll,
} = require("./auth.controller");
const { verifyJwt, restrictTo } = require("./auth.middlewares");

const validate = require("./auth.validation.middleware");
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("./auth.validation");

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user (customer or vendor)
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               phone: { type: string }
 *               password: { type: string, format: password }
 *               role: { type: string, enum: ["user", "admin", "vendor"], default: "user" }
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 user: { type: object, properties: { id: { type: string }, name: { type: string }, email: { type: string }, role: { type: string }, isVerified: { type: boolean } } }
 *       400:
 *         description: Invalid request or missing fields
 *       409:
 *         description: Email already exists
 */

// POST /api/v1/auth/signup
router.post("/signup", validate(registerValidationSchema), SignUp);

// POST /api/v1/auth/verify-email
router.post("/verify-email", VerifyOtp);

// POST /api/v1/auth/resend-otp
router.post("/resend-otp", ResendOtp);

// POST /api/v1/auth/login
router.post("/login", validate(loginValidationSchema), Login);

// POST /api/v1/auth/refresh-token
router.post("/refresh-token", RefreshToken);

// POST /api/v1/auth/logout
router.post("/logout", LogOut);

// POST /api/v1/auth/logout-all
router.post("/logout-all", LogOutAll);

//
router.get("/admin/dashboard", verifyJwt, restrictTo("admin"));

module.exports = router;
