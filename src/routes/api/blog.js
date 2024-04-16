const express = require("express");
const controller = require("../../controllers/blog.controller");
const auth = require("../../middlewares/auth");

const blogRouter = express.Router();

blogRouter.get("/", controller.list);
blogRouter.get("/:id", controller.show);
blogRouter.post("/", auth.authenticateUser, controller.create);
blogRouter.put("/:id", auth.authenticateUser, controller.update);
blogRouter.delete("/:id", auth.authenticateUser, controller.deletePost);

module.exports = blogRouter;
