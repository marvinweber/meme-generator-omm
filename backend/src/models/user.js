import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  name: String,
  password: String,
  oauth: String,
  registeredAt: Date,
});

export default mongoose.model('user', UserSchema);
