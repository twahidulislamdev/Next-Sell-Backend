const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    otp: {
      type: String,
    },
    expireOtp: {
      type: Date,
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "vendor"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    accessToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("UserList", UserSchema);
