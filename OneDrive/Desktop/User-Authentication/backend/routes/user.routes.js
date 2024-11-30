const express = require("express");
const {
  register,
  login,
  getUsers,
  createProduct,
} = require("../controllers/user.controller.js");

const router = express.Router();

// GET /api/getUsers
router.get("/getUsers", getUsers);

// POST /api/register
router.post("/register", register);

// post /api/login

router.post("/login", login);


module.exports = router;
