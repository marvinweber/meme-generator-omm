import mongoose from 'mongoose';
import path from 'path';

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

TemplateSchema.virtual('url').get(function () {
  return `${
    process.env.PUBLIC_URL
  }/${this.path.split(path.sep).join(path.posix.sep)}`;
});

export default mongoose.model('template', TemplateSchema);
