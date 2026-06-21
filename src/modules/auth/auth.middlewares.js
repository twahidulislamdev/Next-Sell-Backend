const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config/jwt");
const UserSchema = require("./auth.model");

const restraticTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};
