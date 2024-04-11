const express = require("express");
const controller = require("../../controllers/authController");

const authRouter = express.Router();

authRouter.post("/login", controller.login);

module.exports = authRouter;
