import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required.']
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: [true, 'User with same email already exists.']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  phone: { type: String },
  profile: { type: String }
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
