import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import controller from '../controllers/webInfoController.js'
import { showResult } from '../utils/utils.js'

const webInfoRouter = express.Router()

webInfoRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res, next) => {
    const webInfo = await controller.seed()
    return showResult(res, 200, webInfo)
  })
)

webInfoRouter.get(
  '/',
  expressAsyncHandler(async (req, res, next) => {
    const webInfo = await controller.getAllItems()
    return showResult(res, 200, webInfo)
  })
)

export default webInfoRouter
