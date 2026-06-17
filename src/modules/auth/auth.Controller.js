const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = require("./auth.model");
const { validationResult } = require("express-validator");
const CustomerVerificationToken = require("./VerificationToken.model");
const { v4: uuidv4 } = require("uuid");
const emailVerification = require("../../utils/emailVerification");
const emailValidation = require("../../utils/emailValidation");

exports.Signup = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name) return res.status(400).json({ message: "Name Is Required" });
    if (!email) return res.status(400).json({ message: "Email Is Required" });
    if (!password)
      return res.status(400).json({ message: "Password Is Required" });

    if (!emailValidation(email)) {
      return res.json({
        message: "Error: Email Format Is Not Correct",
      });
    }

    // Check If The Email Already Exists
    const existingCustomer = await userSchema.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email Already Exists" });
    }

    // Generate secure 6-digit OTP code using crypto
    const otp = crypto.randomInt(100000, 999999).toString();
    const expireOtp = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new userSchema({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      otp,
      expireOtp,
    });
    await emailVerification(email, otp);
    await newCustomer.save();

    // Generate A Verification Token
    const verificationToken = new CustomerVerificationToken({
      customerId: newCustomer._id,
      token: uuidv4(),
    });
    await verificationToken.save();

    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering User" });
  }
};

exports.VerifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    if (user.otp !== otp || !user.expireOtp || user.expireOtp < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.expireOtp = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error verifying email" });
  }
};

exports.ResendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Check if current OTP is still valid (prevent spamming resend)
    if (user.expireOtp && user.expireOtp > new Date()) {
      return res.status(400).json({
        message: "OTP is still valid. Please wait before requesting a new one.",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const expireOtp = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

    user.otp = otp;
    user.expireOtp = expireOtp;
    await user.save();

    await emailVerification(email, otp, true);

    return res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error resending OTP" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userSchema.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify your email first.",
      });
    }

    // Generate Access & Refresh Tokens
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "30m" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" },
    );

    // Save refresh token in DB
    user.refreshToken.push({ token: refreshToken });
    await user.save();

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};
