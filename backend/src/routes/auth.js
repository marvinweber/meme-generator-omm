import express from 'express';
import requireAuthentication from '../middleware/requireAuthentication.js';
import { loginUser, getUser, registerUser } from '../controllers/auth.js';
const router = express.Router();

router.get('/me', [requireAuthentication], getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
