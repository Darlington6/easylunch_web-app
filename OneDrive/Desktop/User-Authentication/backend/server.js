const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const productionRoutes = require("./routes/product.routes");
const { ValidateUserOnJwt } = require("./config/jwtValidate");
const dbConfig = require("./config/db.config");
const cors = require("cors");

dotenv.config();

// Port number
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const app = express();

// middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));
// User routes
app.use("/api/auth", userRoutes);

// Product routes
app.use("/api", ValidateUserOnJwt, productionRoutes);

app.listen(PORT, () => {
  // connect db
  dbConfig();
  console.log("server running on port 5000.");
});
