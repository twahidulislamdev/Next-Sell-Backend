const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../../config/jwt");

const verifyJwt = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }

  jwt.verify(token, jwtConfig().JwtAccessSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  });
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = { verifyJwt, restrictTo };
