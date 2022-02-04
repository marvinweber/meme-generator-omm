import mongoose from 'mongoose';
import path from 'path';

const CommentSchema = new mongoose.Schema({
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

const LikeSchema = new mongoose.Schema({
  liker: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  liked: {
    type: Date,
    default: new Date(),
  },
});

const ViewSchema = new mongoose.Schema({
  viewer: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const MemeSchema = new mongoose.Schema({
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  title: String,
  commentCount: {
    type: Number,
    default: 0,
  },
  comments: [CommentSchema],
  viewCount: {
    type: Number,
    default: 0,
  },
  views: [ViewSchema],
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [LikeSchema],
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

MemeSchema.virtual('url').get(function () {
  return `${
    process.env.PUBLIC_URL
  }/${this.path.split(path.sep).join(path.posix.sep)}`;
});

MemeSchema.set('toJSON', { getters: true, virtuals: true });

const Meme = mongoose.model('meme', MemeSchema);
export default Meme;
