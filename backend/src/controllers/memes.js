import mongoose from 'mongoose';
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

export const getMemeById = async (req, res) => {
  try {
    const memeId = req.params.id;
    // either increment view count by one or zero (no increment)
    const viewIncrement = req.query?.countView == 'true' ? 1 : 0;
    const update = {
      $inc: { viewCount: viewIncrement },
    };
    if (viewIncrement === 1) {
      update['$push'] = { views: { viewer: req.user?._id ?? null } };
    }

    // fetch and update meme
    const meme = await MemeSchema.findByIdAndUpdate(memeId, update, {
      returnOriginal: false,
    })
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl');

    if (!meme) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, meme });
  } catch (e) {
    res.status(404).json({ success: false });
  }
};

export const postCommentOnMeme = async (req, res) => {
  try {
    const memeId = req.params.id;
    const comment = { author: req.user._id, comment: req.body.comment };

    // fetch and update meme
    const meme = await MemeSchema.findByIdAndUpdate(
      memeId,
      {
        $inc: { commentCount: 1 },
        $push: { comments: comment },
      },
      {
        returnOriginal: false,
      }
    )
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl');

    if (!meme) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, meme });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

export const likeMeme = async (req, res) => {
  try {
    const memeId = req.params.id;

    let meme = await MemeSchema.findOne({
      _id: memeId,
      'likes.liker': req.user._id,
    })
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl');

    // user has already liked that meme
    if (meme) {
      return res.json({ success: true, meme });
    }

    meme = await MemeSchema.findByIdAndUpdate(
      memeId,
      {
        $inc: { likeCount: 1 },
        $push: { likes: { liker: req.user._id } },
      },
      {
        returnOriginal: false,
      }
    )
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl');

    // meme not found
    if (!meme) {
      return res.status(404).json({ success: false });
    }

    return res.json({ success: true, meme });
  } catch (e) {
    res.status(500).json({ success: false });
  }
};

export const unlikeMeme = async (req, res) => {
  try {
    const memeId = req.params.id;
    const meme = await MemeSchema.findByIdAndUpdate(
      memeId,
      {
        $inc: { likeCount: -1 },
        $pull: { likes: { liker: req.user._id } },
      },
      {
        returnOriginal: false,
      }
    )
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl');

    // meme not found
    if (!meme) {
      return res.status(404).json({ success: false });
    }

    return res.json({ success: true, meme });
  } catch (e) {
    res.status(500).json({ success: false });
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
  const template = req.body.template || null;

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
      template,
    })
      .save()
      .then((t) => t.populate('owner', 'name'));

    res.json({
      success: true,
      memes: [meme],
    });
  });
};

export const deleteMeme = async (req, res) => {
  // TODO
};
