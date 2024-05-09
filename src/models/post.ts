import { Post } from "@prisma/client";
import { Utils } from "../helpers/utils";
import prismaClient from "../prisma.client";
import {
  ICreatePostDto,
  IFilterPostDto,
  IUpdatePostDto,
} from "./interfaces/post.interface";

class PostModel {
  async create(dto: ICreatePostDto): Promise<Post> {
    return prismaClient.post.create({
      data: dto,
    });
  }

  async findAll(filter: IFilterPostDto): Promise<Post[]> {
    const pagination = await Utils.paginate(filter.page, filter.limit);

    return prismaClient.post.findMany({
      where: {},
      ...pagination,
    });
  }

  async findBy(id: string): Promise<Post | null> {
    return prismaClient.post.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: IUpdatePostDto): Promise<Post> {
    return prismaClient.post.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string): Promise<Post> {
    return prismaClient.post.delete({
      where: { id },
    });
  }
}

const postModel = new PostModel();
export default postModel;
