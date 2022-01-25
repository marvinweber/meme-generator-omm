import mongoose from 'mongoose';

const memeSchema = new mongoose.Schema({
  id: String,
  ownerId: String,
  owner: String,
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
  imageUrl: String,
  tags: [String],
  captions: [String],
});

const MemeSchema = mongoose.model('MemeSchema', memeSchema);
export default MemeSchema;