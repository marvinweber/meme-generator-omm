import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  title: String,
  viewCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  path: String,
  tags: [String],
  captions: [String],
});

const MemeSchema = mongoose.model('meme', memeSchema);
export default MemeSchema;
