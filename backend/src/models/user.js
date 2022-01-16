import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
});

export default mongoose.model('user', UserSchema);
