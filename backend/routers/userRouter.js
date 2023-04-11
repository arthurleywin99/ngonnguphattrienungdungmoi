import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { generateToken, isAdmin, isAuth, showResult } from '../utils/utils.js'
import controller from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res, next) => {
    try {
      const data = await controller.signUp(req, res)
      showResult(res, 200, data)
    } catch (error) {
      showResult(res, 404, { message: error.message })
    }
  })
)

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.signIn(req)
    showResult(res, statusCode, data)
  })
)

userRouter.get(
  '/active/:token',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.activeAccount(req)
    showResult(res, statusCode, data)
  })
)

userRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getById(req)
    showResult(res, statusCode, data)
  })
)

userRouter.get(
  '/getall',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getAll(req)
    showResult(res, statusCode, data)
  })
)

userRouter.put(
  '/update',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.update(req)
    showResult(res, statusCode, data)
  })
)

userRouter.put(
  '/update-password',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.updatePassword(req)
    showResult(res, statusCode, data)
  })
)

userRouter.post(
  '/re-activate',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.sendMail(req, res)
    showResult(res, statusCode, data)
  })
)

export default userRouter
