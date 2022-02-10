import Meme from '../models/meme.js';
import Template from '../models/template.js';

export const getUserMemes = async (req, res) => {
  const memes = await Meme.find({
    owner: req.user._id,
  }).sort('-createdAt').select('-views');

  return res.json({ success: true, memes });
};

export const getUserTemplates = async (req, res) => {
  const templates = await Template.find({
    uploadUser: req.user._id,
  }).sort('-uploadedAt');

  return res.json({ success: true, templates });
};
