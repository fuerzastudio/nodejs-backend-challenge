import { Router } from 'express';
import { body } from 'express-validator';
import { createUser, getUser, loginUser } from '../../controller/users.mjs';

const router = Router()

router.post(
  '/api/users', 
  [
    body('name').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('password').isString().notEmpty()
  ], 
  createUser
);
router.get('/api/users/:id', getUser);
router.post('/api/users/login', loginUser);

export default router;