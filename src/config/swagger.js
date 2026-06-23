const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next Sell BD API",
      version: "1.0.0",
      description: "Next Sell BD API Documentation",
      contact: {
        name: "Tahmidul Wahid",
        email: "[EMAIL_ADDRESS]",
      },
      //   license: {
      //     name: "MIT",
      //     url: "https://opensource.org/licenses/MIT",
      //   },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 6000}`,
        description: "Development Server",
      },
      //   {
      //     url: `https://${process.env.HOST || `next-sell-bd.vercel.app`}`,
      //     description: "Production Server",
      //   }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/*.js", "./src/modules/**/*.js"],
};

module.exports = swaggerJsdoc(options);
