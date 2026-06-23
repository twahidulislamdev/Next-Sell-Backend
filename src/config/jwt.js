const jwtConfig = () => {
  return {
    JwtAccessSecret: process.env.ACCESS_TOKEN_SECRET,
    JwtRefreshSecret: process.env.REFRESH_TOKEN_SECRET,
  };
};

module.exports = { jwtConfig };
