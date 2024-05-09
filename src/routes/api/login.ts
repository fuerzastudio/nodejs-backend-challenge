import { Login } from "@prisma/client";
import express, { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { authenticateLocal, generateJwtToken } from "../../middlewares/auth";

const authRouter: Router = express.Router();

authRouter.post("/login", authenticateLocal, async (req, res) => {
  try {
    console.log({ req });
    const login = req.user as unknown as Login;
    const token = generateJwtToken(login);

    return res.status(StatusCodes.OK).send({
      success: true,
      data: { token },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      data: { message: "Erro ao realizar login.", error },
    });
  }
});

export default authRouter;
