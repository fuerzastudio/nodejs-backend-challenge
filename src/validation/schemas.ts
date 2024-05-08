import Joi from "joi";
import { createPost, filterPost, updatePost } from "./schemas/post.schema";

const schemas: {
  [index: string]: Joi.ObjectSchema<any> | Joi.ArraySchema<any>;
} = {
  createPost,
  updatePost,
  filterPost,
};

export default schemas;
