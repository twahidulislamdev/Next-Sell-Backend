const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/jwt");

// Generate Access Token
exports.generateAccessToken = (user) => {
  const { JwtAccessSecret } = jwtConfig();
  return jwt.sign(
    {
      id: user._id,
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JwtAccessSecret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" },
  );
};

// Generate Refresh Token
exports.generateRefreshToken = (user) => {
  const { JwtRefreshSecret } = jwtConfig();
  return jwt.sign(
    {
      id: user._id,
      userId: user._id,
      role: user.role,
    },
    JwtRefreshSecret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" },
  );
};
