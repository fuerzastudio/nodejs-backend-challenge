import express, { Router } from "express";
import postsRouter from "./posts";

const routes: Router = express.Router();

routes.use("/posts", postsRouter);

export default routes;
