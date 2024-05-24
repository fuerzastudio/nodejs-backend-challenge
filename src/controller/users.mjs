import { Users } from '../models/user.model.mjs'
import { TypeORMPostRepository } from '../utils/database/typeorm/TypeORMUserRepository.mjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
  /*  
    #swagger.tags = ['Users']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/InputUserRequest"
          }  
        }
      }
    }

    #swagger.responses[201] = {
      description: "User created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserResponse"
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseError"
          }
        }
      }
    }
  */

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
  /*
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
      description: "User Data",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserResponse"
          }
        }
      }
    }
    
    #swagger.responses[500] = {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ResponseError"
          }
        }
      }
    }
  */
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
  /*  
    #swagger.tags = ['Users']

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/InputLoginUserRequest"
          }  
        }
      }
    }

    #swagger.responses[201] = {
      description: "User created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserResponse"
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostResponseError"
          }
        }
      }
    }
  */

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
