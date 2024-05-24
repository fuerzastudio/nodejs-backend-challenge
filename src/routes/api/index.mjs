import { Router } from 'express';
import postsRouter from './posts.mjs';
import usersRouter from './users.mjs';

const router = Router()

router.use(postsRouter, usersRouter)

export default router;