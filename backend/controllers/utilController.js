import msg from '../configs/messageConstants.js'
import { v2 as cloudinary } from 'cloudinary'

export default {
  uploadCloudinary: (req) => {
    if (!req.file) {
      return {
        statusCode: 404,
        data: {
          message: msg.NO_FILE_UPLOAD,
        },
      }
    }
    return {
      statusCode: 200,
      data: {
        message: req.file.path,
      },
    }
  },

  deleteImageCloudinary: async (req) => {
    const { imageId } = req.params
    try {
      const response = await cloudinary.uploader.destroy(imageId)
      if (response.result === 'not found') {
        return {
          statusCode: 404,
          data: {
            message: msg.IMAGE_NOT_FOUND,
          },
        }
      }
      return {
        statusCode: 200,
        data: {
          message: msg.DELETED_IMAGE_SUCCESS,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message: error.message,
        },
      }
    }
  },
}
