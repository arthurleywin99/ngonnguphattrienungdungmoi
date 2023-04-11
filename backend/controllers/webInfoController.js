import WebInfo from '../models/webInfoModel.js'
import { webInfosSeed } from '../data.js'

export default {
  seed: async () => {
    return await WebInfo.insertMany(webInfosSeed)
  },
  getAllItems: async () => {
    return await WebInfo.find({}).exec()
  },
}
