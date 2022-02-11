import express from 'express';
import requireAuthentication from '../middleware/requireAuthentication.js';
import { loginUser, oAuthLogin, registerUser } from '../controllers/auth.js';
const router = express.Router();

router.get('/oauth/login', [requireAuthentication], oAuthLogin);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
