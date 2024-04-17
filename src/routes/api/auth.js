const express = require("express");
const controller = require("../../controllers/auth.controller");
const validators = require("../../validators/auth.validator");

const authRouter = express.Router();

authRouter.post("/login", validators.login, controller.login);

module.exports = authRouter;
