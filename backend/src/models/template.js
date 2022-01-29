import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  id: String,
  uploadedAt: Date,
  originalFilename: String,
  name: String,
  path: String,
  uploadUser: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default mongoose.model('template', TemplateSchema);
