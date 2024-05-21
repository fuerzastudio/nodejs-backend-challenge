import { Router } from 'express';
import { createPost, getAllPosts } from '../../controller/posts.mjs';

const router = Router()

router.post('/api/posts', createPost);
router.get('/api/posts', getAllPosts);

export default router;