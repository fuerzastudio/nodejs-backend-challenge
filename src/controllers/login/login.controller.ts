import { Login } from "@prisma/client";
import { ICreateLoginDto } from "../../models/interfaces/post.interface";
import loginModel from "../../models/login";

class LoginController {
  async create(dto: ICreateLoginDto): Promise<Login> {
    return await loginModel.create(dto);
  }

  async findByEmail(email: string): Promise<Login | null> {
    return await loginModel.findByEmail(email);
  }
}

const loginController = new LoginController();
export default loginController;
