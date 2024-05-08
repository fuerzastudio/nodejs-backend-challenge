import { Post } from "@prisma/client";
import {
  ICreatePostDto,
  IFilterPostDto,
  IUpdatePostDto,
} from "../../models/interfaces/post.interface";
import postModel from "../../models/post";

class PostController {
  async create(dto: ICreatePostDto): Promise<Post> {
    return await postModel.create(dto);
  }

  async findAll(filter: IFilterPostDto): Promise<Post[]> {
    return await postModel.findAll(filter);
  }

  async findBy(id: string): Promise<Post | null> {
    return await postModel.findBy(id);
  }

  async update(id: string, data: IUpdatePostDto): Promise<Post | null> {
    const post = await postModel.findBy(id);

    if (!post) return null;

    return await postModel.update(id, data);
  }

  async delete(id: string): Promise<Post | null> {
    const post = await postModel.findBy(id);

    if (!post) return null;

    return await postModel.delete(id);
  }
}

const postController = new PostController();
export default postController;
