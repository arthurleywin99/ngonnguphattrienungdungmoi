import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import controller from '../controllers/searchController.js'
import { showResult } from '../utils/utils.js'

const searchRouter = express.Router()

searchRouter.get(
  '/:content/:order',
  expressAsyncHandler(async (req, res, next) => {
    const { content, order } = req.params
    const { statusCode, data } = await controller.search(content, order)
    return showResult(res, statusCode, data)
  })
)

export default searchRouter
