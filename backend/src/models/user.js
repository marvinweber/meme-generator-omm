import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  email: {
    type: String,
    unique: true,
  },
  name: String,
  password: String,
  oauth: String,
  registeredAt: Date,
  profilePicUrl: String,
});

UserSchema.set('toJSON', {
  versionKey: false,
  // hide password hash when serializing to json
  transform: function (doc, ret) {
    delete ret.password;
  },
});

export default mongoose.model('user', UserSchema);
