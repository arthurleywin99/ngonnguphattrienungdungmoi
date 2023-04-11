import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import controller from '../controllers/utilController.js'
import { showResult } from '../utils/utils.js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'jpeg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploadCloud = multer({ storage })

const utilRouter = express.Router()

utilRouter.post(
  '/cloudinary-upload',
  uploadCloud.single('file'),
  expressAsyncHandler(async (req, res) => {
    const { statusCode, data } = controller.uploadCloudinary(req)
    return showResult(res, statusCode, data)
  })
)

utilRouter.get(
  '/cloudinary-delete/:imageId',
  expressAsyncHandler(async (req, res) => {
    const { statusCode, data } = await controller.deleteImageCloudinary(req)
    return showResult(res, statusCode, data)
  })
)

export default utilRouter
