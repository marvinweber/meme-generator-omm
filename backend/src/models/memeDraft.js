import mongoose from 'mongoose';

const MemeDraftSchema = new mongoose.Schema({
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: String,
  templateUrl: String,
  templateId: String,
  memeConfig: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const MemeDraft = mongoose.model('memeDraft', MemeDraftSchema);
export default MemeDraft;
