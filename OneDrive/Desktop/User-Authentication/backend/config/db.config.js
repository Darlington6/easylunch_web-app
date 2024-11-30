const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const dbConfig = () => {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Connection error:", err));
};

module.exports = dbConfig;
