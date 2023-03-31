import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  address: { type: String, require: true },
  age: { type: Number, require: true },
  phone: { type: String, require: true },
  image: { type: String, require: true },
  cart_id: { type: String, require: true },
},
{
  timestamps: true,
})

export default userSchema
