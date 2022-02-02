import mongoose from 'mongoose';
import path from 'path';

const comment = new mongoose.Schema({
  author: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  comment: String,
  posted: {
    type: Date,
    default: new Date(),
  },
});

const like = new mongoose.Schema({
  liker: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  liked: {
    type: Date,
    default: new Date(),
  },
});

const view = new mongoose.Schema({
  viewer: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const meme = new mongoose.Schema({
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  title: String,
  commentCount: {
    type: Number,
    default: 0,
  },
  comments: [comment],
  viewCount: {
    type: Number,
    default: 0,
  },
  views: [view],
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [like],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  path: String,
  tags: [String],
  captions: [String],
  template: {
    ref: 'template',
    type: mongoose.Schema.Types.ObjectId,
  },
});

meme.virtual('url').get(function () {
  return `${
    process.env.PUBLIC_URL
  }/${this.path.split(path.sep).join(path.posix.sep)}`;
});

meme.set('toJSON', { getters: true, virtuals: true });

const MemeSchema = mongoose.model('meme', meme);
export default MemeSchema;
