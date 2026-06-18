const jwtConfig = () => {
  return {
    // JwtSecret: process.env.JWT_SECRET,
    secret: process.env.JWT_SECRET,
  };
};

module.exports = { jwtConfig };
