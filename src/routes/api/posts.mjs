import { Router } from 'express';
import { createPost, getAllPosts, getPost } from '../../controller/posts.mjs';

const router = Router()

router.post('/api/posts', createPost);
router.get('/api/posts', getAllPosts);
router.get('/api/posts/:id', getPost);

export default router;