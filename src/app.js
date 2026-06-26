const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection");
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { apiLimiter } = require("./modules/auth/rateLimit.middleware");

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

// Getting Data From The Request Body
app.use(express.json({ limit: "1mb" }));

// Global API Rate Limiter (100 requests per IP per 24 hours)
app.use("/api/v1", apiLimiter);

// Base Route For All API Endpoints
app.use("/api/v1", routes);

// Swagger Configuration
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");

// SwaggerUI Route
app.get("/api/docs", (req, res, next) => {
  if (req.originalUrl === "/api/docs") {
    res.redirect("/api/docs/");
  } else {
    next();
  }
});
app.use(
  "/api/docs",
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);

// Connect To The Database
dbConnection();

module.exports = app;
