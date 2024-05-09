import { Login } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prismaClient from "../prisma.client";
import { ICreateLoginDto } from "./interfaces/post.interface";

class LoginModel {
  async create(dto: ICreateLoginDto): Promise<Login> {
    dto.password = dto.password = await bcrypt.hash(
      dto.password,
      process.env.SALT_ROUNDS_CRYPT
        ? parseInt(process.env.SALT_ROUNDS_CRYPT)
        : 10
    );

    return prismaClient.login.create({
      data: dto,
    });
  }

  async findByEmail(email: string): Promise<Login | null> {
    return prismaClient.login.findUnique({
      where: { email },
    });
  }
}

const loginModel = new LoginModel();
export default loginModel;
