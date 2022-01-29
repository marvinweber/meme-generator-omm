import express from 'express';
import path from 'path';
import Template from '../models/template.js';
import { ROOT_DIR } from '../app.js';
import requireAuthentication from '../middleware/requireAuthentication.js';

const router = express.Router();

/** Index route to get a list of all available templates. */
router.get('/', async (req, res, next) => {
  const templates = await Template.find()
    .sort({ uploadedAt: 'desc' })
    .populate('uploadUser', 'name');
  res.json({
    templates: templates.map((template) => {
      return {
        name: template.name,
        url: `${process.env.PUBLIC_URL}/${template.path
          .split(path.sep)
          .join(path.posix.sep)}`,
        _id: template._id,
        user: template.uploadUser,
      };
    }),
  });
});

/** Template upload handler for files. */
router.post('/upload/file', [requireAuthentication], async (req, res, next) => {
  if (!req.files?.template) {
    return res.json({ success: false });
  }

  const md5 = req.files.template.md5;
  const ending = path.extname(req.files.template.name);
  const fileName = `${md5}${ending}`;
  const templateName = req.body.name || req.files.template.name;

  const filePath = path.join('uploads/templates', fileName);
  const uploadPath = path.join(ROOT_DIR, 'public', filePath);

  req.files.template.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    const template = await new Template({
      uploadedAt: Date.now(),
      originalFilename: req.files.template.name,
      name: templateName,
      path: filePath,
      uploadUser: req.user._id,
    })
      .save()
      .then((t) => t.populate('uploadUser', 'name'));

    res.json({
      success: true,
      templates: [templateToJson(template)],
    });
  });
});

/** Template upload handler for urls. */
router.post('/upload/url', [requireAuthentication], async (req, res, next) => {
  res.json('not yet implemented');
});

function templateToJson(template) {
  return {
    name: template.name,
    url: `${process.env.PUBLIC_URL}/${template.path
      .split(path.sep)
      .join(path.posix.sep)}`,
    _id: template._id,
    user: template.uploadUser,
  };
}

export default router;
