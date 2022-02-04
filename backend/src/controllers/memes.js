import mongoose from 'mongoose';
import { ROOT_DIR } from '../app.js';
import Meme from '../models/meme.js';
import path from 'path';
import Template from '../models/template.js';
import { generateMeme } from '../lib/memeGenerator.js';
import crypto from 'crypto';
import fs from 'fs';

/** Field allowed to sort by. */
const SORT_ALLOWED_FIELDS = [
  'createdAt',
  'viewCount',
  'likeCount',
  'commentCount',
];
/** Possible sort directions. */
const SORT_ALLOWED_DIRS = ['desc', 'asc'];

/** Fields with numerical filters. */
const NUMERIC_FILTERS = ['viewCount', 'likeCount', 'commentCount'];
/** Allowed comparison operations for numerical filters. */
const NUMERIC_FILTERS_ALLOWED_OPS = ['$lt', '$lte', '$gte', '$gt'];

/** Fields with list filters (i.e., check multiple sub strings). */
const LIST_FILTERS = ['title', 'captions', 'tags'];

/** Fields to filter by other object id. */
const ID_FILTERS = ['owner', 'template'];

export const getMemes = async (req, res) => {
  // pagination
  const perPage = req.query.perPage || 30;
  const page = req.query.p || 1;

  const sortRequests = req.query.sort;
  // ensure only valid sort requests
  const sorting = Object.fromEntries(
    Object.entries(sortRequests).filter(
      ([sortField, sortDir]) =>
        SORT_ALLOWED_FIELDS.includes(sortField) &&
        SORT_ALLOWED_DIRS.includes(sortDir)
    )
  );

  const filters = {};

  // view count filter
  NUMERIC_FILTERS.forEach((filterKey) => {
    if (req.query[filterKey]) {
      const [op, val] = Object.entries(req.query[filterKey])[0];
      if (NUMERIC_FILTERS_ALLOWED_OPS.includes(op)) {
        filters[filterKey] = { [op]: parseInt(val) };
      }
    }
  });

  // list filters
  LIST_FILTERS.forEach((filterKey) => {
    if (req.query[filterKey]) {
      const filterVals = req.query[filterKey].split(' ');
      filters[filterKey] = { $in: filterVals.map((v) => new RegExp(v, 'i')) };
    }
  });

  // date / createdAt filter
  if (req.query.createdAt) {
    const [op, val] = Object.entries(req.query.createdAt)[0];
    const date = new Date(val);
    if (!isNaN(date) && NUMERIC_FILTERS_ALLOWED_OPS.includes(op)) {
      filters['createdAt'] = { [op]: date };
    }
  }

  ID_FILTERS.forEach((filterKey) => {
    if (req.query[filterKey]) {
      const filterVal = req.query[filterKey];
      if (mongoose.isValidObjectId(filterVal)) {
        filters[filterKey] = filterVal;
      }
    }
  });

  try {
    const memes = await Meme.find(filters)
      .select('-views')
      .sort(sorting || { createdAt: 'desc' }) // fallback: sort by date descending
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate('owner', 'name')
      .populate('template', '-originalFilename');

    res.status(200).json({
      success: true,
      memes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
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
    const meme = await Meme.findByIdAndUpdate(memeId, update, {
      returnOriginal: false,
    })
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl')
      .populate('template', '-originalFilename');

    if (!meme) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, meme });
  } catch (e) {
    res.status(404).json({ success: false });
  }
};

export const getPreviousMemeForId = async (req, res) => {
  const memeId = req.params.id;
  const meme = await Meme.findById(memeId);
  if (!meme) {
    return res.status(404).json({ success: false });
  }

  const previousMeme = await Meme.find({
    createdAt: { $lt: meme.createdAt },
  })
    .sort('-createdAt')
    .limit(1)
    .select('-views')
    .populate('owner', 'name profilePicUrl')
    .populate('comments.author', 'name profilePicUrl')
    .populate('likes.liker', 'name profilePicUrl')
    .populate('template', '-originalFilename');
  return res.json({ success: true, meme: previousMeme });
};

export const getNextMemeForId = async (req, res) => {
  const memeId = req.params.id;
  const meme = await Meme.findById(memeId);
  if (!meme) {
    return res.status(404).json({ success: false });
  }

  const nextMeme = await Meme.find({
    createdAt: { $gt: meme.createdAt },
  })
    .sort('+createdAt')
    .limit(1)
    .select('-views')
    .populate('owner', 'name profilePicUrl')
    .populate('comments.author', 'name profilePicUrl')
    .populate('likes.liker', 'name profilePicUrl')
    .populate('template', '-originalFilename');
  return res.json({ success: true, meme: nextMeme });
};

export const getRandomMeme = async (req, res) => {
  const memeCount = await Meme.countDocuments();
  const randomIndex = Math.floor(Math.random() * memeCount);
  const meme = await Meme.findOne().skip(randomIndex);
  return res.json({ success: true, meme });
};

export const postCommentOnMeme = async (req, res) => {
  try {
    const memeId = req.params.id;
    const comment = { author: req.user._id, comment: req.body.comment };

    // fetch and update meme
    const meme = await Meme.findByIdAndUpdate(
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
      .populate('likes.liker', 'name profilePicUrl')
      .populate('template', '-originalFilename');

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

    let meme = await Meme.findOne({
      _id: memeId,
      'likes.liker': req.user._id,
    })
      .select('-views')
      .populate('owner', 'name profilePicUrl')
      .populate('comments.author', 'name profilePicUrl')
      .populate('likes.liker', 'name profilePicUrl')
      .populate('template', '-originalFilename');

    // user has already liked that meme
    if (meme) {
      return res.json({ success: true, meme });
    }

    meme = await Meme.findByIdAndUpdate(
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
    const meme = await Meme.findByIdAndUpdate(
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
      .populate('likes.liker', 'name profilePicUrl')
      .populate('template', '-originalFilename');

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
  const memeConfigs = req.body.memeConfigs || [];
  const createdMemes = [];

  for (const memeConfig of memeConfigs) {
    let templateId = memeConfig.templateId;
    let templateUrl = memeConfig.templateUrl;
    const memeTitle = memeConfig.title || 'No Title';
    const memeTags = memeConfig.tags || [];
    const maxFileSize = memeConfig.maxFileSize || Number.POSITIVE_INFINITY;
    const textConfigs = memeConfig.texts || [];
    const memeCaptions = textConfigs.map((textConfig) => textConfig.text);

    let templateModel;
    if (templateId) {
      templateModel = await Template.findById(templateId);

      // if invalid template id was given and no url was specified -> invalid config
      if (!templateModel && !templateUrl) {
        return;
      } else if (templateModel) {
        templateUrl = templateModel.url;
      } else {
        // avoid saving invalid template id
        templateId = null;
      }
    }

    // at least a template url and one meme configuration is required
    if (!templateUrl || textConfigs.length === 0) {
      return;
    }

    const meme = await generateMeme(templateUrl, textConfigs, maxFileSize);
    const memeHash = crypto.createHash('md5').update(meme).digest('hex');
    const fileName = `${memeHash}.png`;

    const now = new Date();
    const filePath = path.join(
      'uploads/memes',
      `${now.getFullYear()}/${now.getMonth() + 1}`,
      fileName
    );
    const uploadPath = path.join(ROOT_DIR, 'public', filePath);

    const memeImageData = meme.replace(/^data:image\/\w+;base64,/, '');
    const bf = Buffer.from(memeImageData, 'base64');
    fs.writeFileSync(uploadPath, bf);

    const memeObj = await new Meme({
      owner: req.user._id,
      title: memeTitle,
      createdAt: now,
      path: filePath,
      tags: memeTags,
      captions: memeCaptions,
      template: templateId,
    })
      .save()
      .then((t) => t.populate('owner', 'name'));
    createdMemes.push(memeObj);
  }

  res.json({
    success: true,
    memes: createdMemes,
  });
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

    const meme = await new Meme({
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
