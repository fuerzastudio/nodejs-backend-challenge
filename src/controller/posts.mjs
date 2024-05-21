import { Posts } from '../models/post.model.mjs'
import { TypeORMPostRepository } from '../database/TypeORMPostRepository.mjs'

export const createPost = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.createPost(req.body)
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const getAllPosts = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const postModel = new Posts(userRepository)

  try {
    const posts = await postModel.listPosts(req.body.page)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};