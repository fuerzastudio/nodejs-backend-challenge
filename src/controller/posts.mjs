import { Posts } from '../models/post.model.mjs'
import { TypeORMPostRepository } from '../utils/database/TypeORMPostRepository.mjs'

export const createPost = async (req, res) => {
  /*  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/InputPostRequest"
          }  
        }
      }
    }

    #swagger.responses[201] = {
      description: "Post created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostResponse"
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
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.createPost(req.body)
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const getAllPosts = async (req, res) => {
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetPostsListRequest"
          }  
        }
      }
    }
    #swagger.responses[200] = {
      description: "Posts list",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostResponseList"
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
  const postModel = new Posts(userRepository)

  try {
    const posts = await postModel.listPosts(req.body.page)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const getPost = async (req, res) => {
  /*
    #swagger.responses[200] = {
      description: "Post Data",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostResponse"
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
  const postModel = new Posts(userRepository)

  
  try {
    const post = await postModel.getPost(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const updatePost = async (req, res) => {
  /*  
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/InputPostRequest"
          }  
        }
      }
    }

    #swagger.responses[200] = {
      description: "Post Updated",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostResponse"
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
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.updatePost(req.params.id, req.body)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const deletePost = async (req, res) => {
  /*
    #swagger.responses[200] = {
        description: "Post Deleted",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PostResponse"
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
  const postModel = new Posts(userRepository)

  try {
    const post = await postModel.deletePost(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};