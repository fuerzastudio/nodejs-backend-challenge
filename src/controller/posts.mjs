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

export const getPost = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.getPost(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const updatePost = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.updatePost(req.params.id, req.body)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const deletePost = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.deletePost(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};