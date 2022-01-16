import { Model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
});

export default Model('user', UserSchema);
