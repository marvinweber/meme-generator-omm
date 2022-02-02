import express from 'express';
import {
  getMemes,
  createMemeByConfig,
  deleteMeme,
  likeMeme,
  createMemeByFileUpload,
  getMemeById,
  postCommentOnMeme,
  unlikeMeme,
  getPreviousMemeForId,
  getNextMemeForId,
  getRandomMeme,
} from '../controllers/memes.js';
import requireAuthentication from '../middleware/requireAuthentication.js';
const router = express.Router();

router.get('/', getMemes);
router.get('/random', getRandomMeme);
router.get('/:id', getMemeById);
router.get('/:id/previous', getPreviousMemeForId);
router.get('/:id/next', getNextMemeForId);
router.post('/:id/comment', [requireAuthentication], postCommentOnMeme);
router.post('/:id/like', likeMeme);
router.post('/:id/unlike', unlikeMeme);
router.post('/file', [requireAuthentication], createMemeByFileUpload);
router.post('/config', [requireAuthentication], createMemeByConfig);
// router.delete('/:id', deleteMeme);

export default router;
