import { Router } from 'express';
import postsRouter from './posts.mjs';

const router = Router()

router.use(postsRouter)

export default router;