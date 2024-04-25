const express = require("express");
const validateJWTToken = require("../../../middlewares/validateJWTToken");
const validatePost = require("../../../middlewares/validatePost");
const postsController = require("../../controllers/posts");

const router = express.Router();

router.post("/", validateJWTToken, validatePost, postsController.createPost);
router.get("/", validateJWTToken, postsController.getAllPosts);
router.get("/:id", validateJWTToken, postsController.getPostById);
router.put("/:id", validateJWTToken, postsController.updatePost);
router.delete("/:id", validateJWTToken, postsController.deletePost);

module.exports = router;
