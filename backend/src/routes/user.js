import express from 'express';
import { getUserMemes, getUserTemplates } from '../controllers/user.js';
import requireAuthentication from '../middleware/requireAuthentication.js';

const router = express.Router();

router.get('/memes', [requireAuthentication], getUserMemes);
router.get('/templates', [requireAuthentication], getUserTemplates);

export default router;
