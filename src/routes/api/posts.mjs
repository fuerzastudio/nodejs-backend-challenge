import { Router } from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../../controller/posts.mjs';
import { body } from 'express-validator';
import { jwtAuth } from '../../utils/middleware/jwtAuth.mjs';

const router = Router()

router.post(
  '/api/posts', 
  [
    body('title').isString().notEmpty(),
    body('body').isString().notEmpty(),
    body('tags').isArray().notEmpty()
  ], 
  jwtAuth,
  createPost
);
router.get('/api/posts', jwtAuth, getAllPosts);
router.get('/api/posts/:id', jwtAuth, getPost);
router.put(
  '/api/posts/:id', 
  [
    body('title').isString().optional(),
    body('body').isString().optional(),
    body('tags').optional()
  ], 
  jwtAuth,
  updatePost
);
router.delete('/api/posts/:id', jwtAuth, deletePost);

export default router;