import path from 'path';
import Template from '../models/template.js';
import { ROOT_DIR } from '../app.js';

/** Index route to get a list of all available templates. */
export const getTemplates = async (req, res, next) => {
  const templates = await Template.find()
    .select('-originalFilename')
    .sort({ uploadedAt: 'desc' })
    .populate('uploadUser', 'name');
  res.json({ success: true, templates });
};

/** Template upload handler for files. */
export const uploadTemplateWithFile = async (req, res, next) => {
  if (!req.files?.template) {
    return res.json({ success: false });
  }

  const now = new Date();
  const md5 = req.files.template.md5;
  const ending = path.extname(req.files.template.name);
  const fileName = `${md5}${ending}`;
  const templateName = req.body.name || req.files.template.name;

  const filePath = path.join(
    'uploads/templates',
    `${now.getFullYear()}/${now.getMonth() + 1}`,
    fileName
  );
  const uploadPath = path.join(ROOT_DIR, 'public', filePath);

  req.files.template.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    const template = await new Template({
      uploadedAt: now,
      originalFilename: req.files.template.name,
      name: templateName,
      path: filePath,
      uploadUser: req.user._id,
    })
      .save()
      .then((t) => t.populate('uploadUser', 'name'));

    res.json({
      success: true,
      templates: [template],
    });
  });
};

/** Template upload handler for urls. */
export const createTemplateByImageUrl = async (req, res, next) => {
  res.json('not yet implemented');
};
