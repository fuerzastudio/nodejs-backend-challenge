import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../../controller/posts.mjs';
import { body } from 'express-validator';

const router = Router()

router.post(
  '/api/posts', 
  [
    body('title').isString().notEmpty(),
    body('body').isString().notEmpty(),
    body('tags').isArray().notEmpty()
  ], 
  createPost
);
router.get('/api/posts', getAllPosts);
router.get('/api/posts/:id', getPost);
router.put(
  '/api/posts/:id', 
  [
    body('title').isString().optional(),
    body('body').isString().optional(),
    body('tags').optional()
  ], 
  updatePost
);
router.delete('/api/posts/:id', deletePost);

export default router;