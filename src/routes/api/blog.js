const express = require("express");

const controller = require("../../controllers/blog.controller");
const auth = require("../../middlewares/auth.middleware");
const validators = require("../../validators/blog.validator");

const blogRouter = express.Router();

blogRouter.get("/", controller.list);
blogRouter.get("/:id", controller.show);
blogRouter.post("/", auth.authenticateUser, validators.create, controller.create );
blogRouter.put("/:id", auth.authenticateUser, controller.update);
blogRouter.delete("/:id", auth.authenticateUser, controller.deletePost);

module.exports = blogRouter;
