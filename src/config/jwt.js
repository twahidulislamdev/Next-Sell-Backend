const jwtConfig = () => {
  return {
    JwtSecret: process.env.JWT_SECRET,
  };
};

module.exports = { jwtConfig };
