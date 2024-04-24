const express = require("express");
const validateAuth = require("../../../middlewares/validateAuth");
const authController = require("../../controllers/auth");

const router = express.Router();

router.post("/login", validateAuth, authController.login);
module.exports = router;
