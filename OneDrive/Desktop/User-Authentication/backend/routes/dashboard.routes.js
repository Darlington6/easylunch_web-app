const express = require("express");
const router = express.router();

router.get("/staff/dashboard");
router.get("/admin/dashboard");

module.exports = router;