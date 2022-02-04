import crypto from 'crypto';
import fs from 'fs';
import https from 'https';
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
  const ending = path.extname(req.files.template.name) || ".jpg";
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
  const imgUrl = req.body.templateUrl;
  if (!imgUrl) {
    return res.status(400).json({ success: false });
  }

  const now = new Date();
  const fileExtention = path.extname(imgUrl);
  const originalFilename = path.basename(imgUrl);

  const downloadFilename =
    crypto.createHash('md5').update(imgUrl).digest('hex') + fileExtention;
  const downloadDir = path.join(
    'uploads/templates',
    `${now.getFullYear()}/${now.getMonth() + 1}`
  );
  const downloadPath = path.join(
    ROOT_DIR,
    'public',
    downloadDir,
    downloadFilename
  );
  try {
    await downloadImage(imgUrl, downloadPath);
  } catch (e) {
    console.error(e);
    return res
      .status(400)
      .json({ success: false, message: 'Could not download template image!' });
  }

  // create target file name (from md5 hash of image)
  const imageBuffer = fs.readFileSync(downloadPath);
  const targetFileName =
    crypto.createHash('md5').update(imageBuffer).digest('hex') + fileExtention;
  const targetPath = path.join(ROOT_DIR, 'public', downloadDir, targetFileName);
  const uploadPath = path.join(downloadDir, targetFileName);

  fs.renameSync(downloadPath, targetPath);

  const template = await new Template({
    uploadedAt: now,
    originalFilename,
    name: req.body.name || originalFilename,
    path: uploadPath,
    uploadUser: req.user._id,
  })
    .save()
    .then((t) => t.populate('uploadUser', 'name'));

  res.json({
    success: true,
    templates: [template],
  });
};

const downloadImage = async (url, downloadPath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(downloadPath))
          .on('error', reject)
          .once('close', () => resolve(downloadPath));
      } else {
        res.resume();
        reject(
          new Error(`Request failed: ${res.statusCode} - ${res.statusMessage}`)
        );
      }
    });
  });
};
