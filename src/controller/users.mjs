import { Users } from '../models/user.model.mjs'
import { TypeORMPostRepository } from '../utils/database/typeorm/TypeORMUserRepository.mjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const userModel = new Users(userRepository)

  try {
    const user = await userModel.createUser(req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const userModel = new Users(userRepository)

  try {
    const user = await userModel.getUser(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const loginUser = async (req, res) => {
  const userRepository = new TypeORMPostRepository()
  const userModel = new Users(userRepository)

  try {
    const user = await userModel.login(req.body)

    const token = jwt.sign({ id: user.id }, 'secret', {expiresIn: '1h'});

    res.cookie("token", token);

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
