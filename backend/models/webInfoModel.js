import mongoose from 'mongoose'

const webInfoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const WebInfo = mongoose.model('WebInfo', webInfoSchema)
export default WebInfo
