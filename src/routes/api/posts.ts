import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import postController from "../../controllers/posts/posts.controller";
import validator from "../../middlewares/validator";
import {
  ICreatePostDto,
  IFilterPostDto,
  IUpdatePostDto,
} from "../../models/interfaces/post.interface";

const postsRouter: Router = express.Router();

postsRouter.get(
  "/",
  validator("filterPost", "queryString"),
  async (req: Request, res: Response) => {
    try {
      const filter = req.query as unknown as IFilterPostDto;
      const data = await postController.findAll(filter);

      res.status(StatusCodes.OK).send({
        success: true,
        data,
        ...filter,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        data: { message: "Erro ao buscar todos os posts.", error },
      });
    }
  }
);

postsRouter.post(
  "/",
  validator("createPost"),
  async (req: Request, res: Response) => {
    try {
      const dto: ICreatePostDto = req.body;
      const data = await postController.create(dto);

      res.status(StatusCodes.CREATED).send({
        success: true,
        data,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        data: { message: "Erro ao criar o post.", error },
      });
    }
  }
);

postsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const post = await postController.findBy(id);

    if (!post)
      res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        data: "Post não encontrado.",
      });
    else {
      const data = await postController.findBy(id);

      res.status(StatusCodes.OK).send({
        success: true,
        data,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      data: { message: "Erro ao buscar o post.", error },
    });
  }
});

postsRouter.put(
  "/:id",
  validator("updatePost"),
  async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const post = await postController.findBy(id);

      if (!post)
        res.status(StatusCodes.NOT_FOUND).send({
          success: false,
          data: "Post não encontrado.",
        });
      else {
        const dto: IUpdatePostDto = req.body;
        const data = await postController.update(id, dto);

        res.status(StatusCodes.OK).send({
          success: true,
          data,
        });
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        data: { message: "Erro ao atualizar o post.", error },
      });
    }
  }
);

postsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const post = await postController.findBy(id);

    if (!post)
      res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        data: "Post não encontrado.",
      });
    else {
      const data = await postController.delete(id);

      res.status(StatusCodes.OK).send({
        success: true,
        data,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      success: false,
      data: { message: "Erro ao deletar o post.", error },
    });
  }
});

export default postsRouter;
