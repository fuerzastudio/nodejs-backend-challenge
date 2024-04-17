const { validationResult } = require('express-validator')

const PostModel = require("../models/post.model");

const create = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Error creating post", errors: errors.array() })
  }

  try {
    const { title, body, tags } = req.body;

    const post = await PostModel.create({
      title,
      body,
      tags: tags.join(","),
    });

    res.status(200).json({ message: "Post created", data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

const list = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const posts = await PostModel.findAll({
      offset: (page - 1) * limit,
      limit,
    });

    res.status(200).json({ posts, page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (err) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching post" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    let post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { title, body, tags } = req.body;

    await PostModel.update(
      { title, body, tags: tags.join(",") },
      { where: { id } },
    );

    post = await PostModel.findByPk(id);

    res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await PostModel.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await PostModel.destroy({
      where: { id },
    });

    res.status(200).json({ message: "Post removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing post" });
  }
};

module.exports = {
  create,
  list,
  show,
  update,
  deletePost,
};
