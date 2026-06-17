const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(`${process.env.DB_URL}`)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
    });
};
module.exports = dbConnection;
