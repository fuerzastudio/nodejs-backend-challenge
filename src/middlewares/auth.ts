import { Login } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { jwtScret } from "../config";
import loginModel from "../models/login";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const login = await loginModel.findByEmail(email);

        if (!login)
          return done(null, false, { message: "Login não encontrado." });

        const isMatch = await bcrypt.compare(password, login.password);

        if (isMatch)
          return done(null, false, { message: "E-mail ou senha incorretos." });

        return done(null, login);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export const authenticateLocal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: Express.User | undefined, info: { message: string }) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ success: false, data: info.message });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);
};

export const generateJwtToken = (login: Login) => {
  const payload = {
    id: login.id,
    email: login.email,
  };

  return jwt.sign(payload, jwtScret, {
    expiresIn: "1h",
  });
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não fornecida." });

  jwt.verify(token, jwtScret, (err) => {
    if (err) {
      return res.status(401).json({ message: "Token inválida." });
    }
    next();
  });
};

export default validateToken;
