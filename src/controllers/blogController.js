const create = async (req, res) => {
  try {
    const { title, body, tags } = req.body;

    // TODO: store post

    res.status(302).json({ message: "Post created", data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating post" });
  }
};

const list = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // TODO: get posts

    res.status(200).json({ posts, page });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

const show = async (req, res) => {
  try {
    const blogId = req.params.id;

    // TODO: fetch post bt id

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
    const postId = req.params.id;

    // TODO: get post by id

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // TODO: update post

    res.status(200).json({ message: "Post updated", data: post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // TODO: get post by id

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // TODO: remove post

    res.status(302).json({ message: "Post removed" });
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
