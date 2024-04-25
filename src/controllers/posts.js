const Post = require("../models/posts");
const { generateId } = require("../helpers/utils");

// Function to create a new post
async function createPost(req, res) {
  try {
    const postId = generateId();
    const { title, body, tags } = req.body;
    const newPost = await Post.create({ title, body, tags });

    res.status(201).json({ message: "Post Created", data: newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get all posts
async function getAllPosts(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const posts = await Post.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [["createdAt", "ASC"]],
    });

    if (posts.rows.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalPosts: posts.count,
      posts: posts.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get a post by ID
async function getPostById(req, res) {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (post) {
      return res.status(200).json({ data: post });
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a post by ID
async function updatePost(req, res) {
  try {
    const { id } = req.params;
    const { title, body, tags } = req.body;

    const existingPost = await Post.findByPk(id);

    if (existingPost) {
      await existingPost.update({ title, body, tags });

      return res
        .status(201)
        .json({ message: "Post Updated", data: existingPost });
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a post by ID
async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const existingPost = await Post.findByPk(id);

    if (existingPost) {
      await existingPost.destroy();

      return res.status(200).json({ message: "Post Deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
