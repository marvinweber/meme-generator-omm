import express from 'express';
import requireAuthentication from '../middleware/requireAuthentication.js';
import {
  createTemplateByImageUrl,
  getTemplates,
  uploadTemplateWithFile,
} from '../controllers/templates.js';

const router = express.Router();

router.get('/', getTemplates);
router.post('/upload/file', [requireAuthentication], uploadTemplateWithFile);
router.post('/upload/url', [requireAuthentication], createTemplateByImageUrl);

export default router;
