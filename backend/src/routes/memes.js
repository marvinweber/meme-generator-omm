import express from 'express';
import {
  getMemes,
  createMemeByConfig,
  updateMeme,
  deleteMeme,
  likeMeme,
  createMemeByFileUpload,
  getMemeById,
} from '../controllers/memes.js';
import requireAuthentication from '../middleware/requireAuthentication.js';
const router = express.Router();

router.get('/', getMemes);
router.get('/:id', getMemeById);
router.post('/file', [requireAuthentication], createMemeByFileUpload);
router.post('/config', [requireAuthentication], createMemeByConfig);
// router.patch('/:id', updateMeme);
// router.delete('/:id', deleteMeme);
// router.patch('/:id/likeMeme', likeMeme);

export default router;
