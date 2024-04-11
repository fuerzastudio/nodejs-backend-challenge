const express = require("express");
const controller = require("../../controllers/blogController");
const auth = require("../../middlewares/auth");

const blogRouter = express.Router();

blogRouter.use(auth.authenticateUser);

blogRouter.post("/", controller.create);
blogRouter.get("/", controller.list);
blogRouter.get("/:id", controller.show);
blogRouter.put("/:id", controller.update);
blogRouter.delete("/:id", controller.deletePost);

module.exports = blogRouter;
