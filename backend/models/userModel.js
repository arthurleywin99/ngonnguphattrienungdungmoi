import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    phoneNumber: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, select: false },
    profilePicUrl: { type: String },
    bYear: { type: Number, required: true, trim: true },
    bMonth: { type: Number, required: true, trim: true },
    bDay: { type: Number, required: true, trim: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: { type: String, trim: true },
      logo: { type: String, trim: true },
      description: { type: String, trim: true },
    },
    isVerified: { type: Boolean, default: false },
    resetToken: { type: String, trim: true },
    expireToken: { type: Date },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)
export default User
