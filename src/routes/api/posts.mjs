import { Router } from 'express';
import { createPost } from '../../controller/posts.mjs';

const router = Router()

router.post('/api/posts', createPost);

export default router;