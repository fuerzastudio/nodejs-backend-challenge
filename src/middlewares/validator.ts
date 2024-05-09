import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "joi";
import schemas from "../validation/schemas";

const validator =
  (schemaName: string, type: string = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = type == "body" ? req.body : req.query;
      const schema = schemas[schemaName];
      const validated = await schema.validateAsync(data);
      req.body = validated;

      next();
    } catch (e) {
      if (e instanceof ValidationError) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(e);
      }
      return next(e);
    }
  };

export default validator;
