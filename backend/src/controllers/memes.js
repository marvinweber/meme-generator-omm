import mongoose from 'mongoose'
import { ROOT_DIR } from '../app.js';
import MemeSchema from '../models/meme.js';
import path from 'path';

export const getMemes = async (req, res) => {
  // TODO: pagination, filters, sorting, etc.

  try {
    const memes = await MemeSchema.find()
      .sort({ createdAt: 'desc' })
      .populate('owner', 'name');

    res.status(200).json({
      success: true,
      memes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMemeByConfig = async (req, res) => {
  res.status(500).json('not yet supported!');
};

export const createMemeByFileUpload = async (req, res) => {
  if (!req.files?.meme) {
    return res.json({ success: false });
  }

  const tags =
    req.body.tags && req.body.tags.length > 0 ? JSON.parse(req.body.tags) : [];
  const captions =
    req.body.captions && req.body.captions.length > 0
      ? JSON.parse(req.body.captions)
      : [];

  const md5 = req.files.meme.md5;
  const fileName = `${md5}.jpeg`;
  const memeTitle = req.body.name || 'No Title';

  const now = new Date();
  const filePath = path.join(
    'uploads/memes',
    `${now.getFullYear()}/${now.getMonth() + 1}`,
    fileName
  );
  const uploadPath = path.join(ROOT_DIR, 'public', filePath);

  req.files.meme.mv(uploadPath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    const meme = await new MemeSchema({
      owner: req.user._id,
      title: memeTitle,
      createdAt: now,
      path: filePath,
      tags,
      captions,
    })
      .save()
      .then((t) => t.populate('owner', 'name'));

    res.json({
      success: true,
      memes: [meme],
    });
  });
};

export const updateMeme = async (req, res) => {
  // TODO
};

export const deleteMeme = async (req, res) => {
  // TODO
};

export const likeMeme = async (req, res) => {
  // TODO
};
