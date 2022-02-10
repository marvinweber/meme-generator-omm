import express from 'express';
import requireAuthentication from '../middleware/requireAuthentication.js';
import {
  createTemplateByImageUrl,
  deleteTemplate,
  getTemplates,
  uploadTemplateWithFile,
} from '../controllers/templates.js';

const router = express.Router();

router.get('/', getTemplates);
router.post('/upload/file', [requireAuthentication], uploadTemplateWithFile);
router.post('/upload/url', [requireAuthentication], createTemplateByImageUrl);
router.delete('/:id', [requireAuthentication], deleteTemplate)

export default router;
