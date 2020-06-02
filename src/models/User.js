import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String,
  },
  created_at: Date,
  updated_at: Date,
})

const User = mongoose.model('User', userSchema)

export default User
