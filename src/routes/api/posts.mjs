import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../../controller/posts.mjs';

const router = Router()

router.post('/api/posts', createPost);
router.get('/api/posts', getAllPosts);
router.get('/api/posts/:id', getPost);
router.put('/api/posts/:id', updatePost);
router.delete('/api/posts/:id', deletePost);

export default router;