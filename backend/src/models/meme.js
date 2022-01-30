import mongoose from 'mongoose';
import path from 'path'

const memeSchema = new mongoose.Schema({
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  title: String,
  viewCount: {
    type: Number,
    default: 0,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  path: String,
  tags: [String],
  captions: [String],
});
memeSchema.virtual('url').get(function () {
  return `${
    process.env.PUBLIC_URL
  }/${this.path.split(path.sep).join(path.posix.sep)}`;
});
memeSchema.set('toJSON', { getters: true, virtuals: true });

const MemeSchema = mongoose.model('meme', memeSchema);
export default MemeSchema;
