const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection");
const routes = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Enable CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

// Getting Data From The Request Body
app.use(express.json({ limit: "1mb" }));

// Base Route For All API Endpoints
app.use("/api/v1", routes);

// Connect To The Database
dbConnection();

module.exports = app;
