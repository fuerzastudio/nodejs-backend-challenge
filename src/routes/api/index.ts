import express, { Router } from "express";
import passport from "passport";
import authRouter from "./login";
import postsRouter from "./posts";

const authenticateJWT = passport.authenticate("jwt", { session: false });

const routes: Router = express.Router();

routes.use("/posts", authenticateJWT, postsRouter);
routes.use("/auth", authRouter);

export default routes;
