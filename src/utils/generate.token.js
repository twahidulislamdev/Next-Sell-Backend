const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/jwt");

// Generate Access Token
exports.generateAccessToken = (user) => {
  const { JwtSecret } = jwtConfig();
  return jwt.sign(
    {
      id: user._id,
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JwtSecret,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "30m" },
  );
};

// Generate Refresh Token
exports.generateRefreshToken = (user) => {
  const { JwtSecret } = jwtConfig();
  return jwt.sign(
    {
      id: user._id,
      userId: user._id,
      role: user.role,
    },
    JwtSecret,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" },
  );
};
