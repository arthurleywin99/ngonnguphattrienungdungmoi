import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAdmin, isAuth, showResult, sortObject } from '../utils/utils.js'
import querystring from 'qs'
import crypto from 'crypto'
import dotenv from 'dotenv'
import dateFormat from 'dateformat'
import controller from '../controllers/orderController.js'

dotenv.config()

const orderRouter = express.Router()

orderRouter.post('/create_payment_url', function (req, res, next) {
  process.env.TZ = 'Asia/Ho_Chi_Minh'

  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  let vnpUrl = process.env.VNP_URL
  let vnp_Params = {}

  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE
  vnp_Params['vnp_Locale'] = 'vn'
  vnp_Params['vnp_CurrCode'] = 'VND'
  vnp_Params['vnp_TxnRef'] = dateFormat(new Date(), 'HHmmss')
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + dateFormat(new Date(), 'HHmmss')
  vnp_Params['vnp_OrderType'] = 'other'
  vnp_Params['vnp_Amount'] = req.body.amount * 100
  vnp_Params['vnp_ReturnUrl'] = process.env.VNP_RETURN_URL
  vnp_Params['vnp_IpAddr'] = '127.0.0.1' //ipAddr
  vnp_Params['vnp_CreateDate'] = dateFormat(new Date(), 'yyyymmddHHmmss')
  if (req.body.bankCode !== null && req.body.bankCode !== '') {
    vnp_Params['vnp_BankCode'] = req.body.bankCode
  }

  vnp_Params = sortObject(vnp_Params)

  const signData = querystring.stringify(vnp_Params, { encode: false })
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET)
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
  vnp_Params['vnp_SecureHash'] = signed
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

  res.status(200).json({ message: vnpUrl })
})

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getAll()
    return showResult(res, statusCode, data)
  })
)

orderRouter.post(
  '/create',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.create(req, res)
    return showResult(res, statusCode, data)
  })
)

orderRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getById(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.get(
  '/getall/:status',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getByStatus(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.get(
  '/get/:orderid/:productid/',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getOrder(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.post(
  '/cancel/:orderId',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.cancel(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.post(
  '/rating/create',
  isAuth,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.createRating(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.put(
  '/confirm/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.confirm(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.put(
  '/cancel/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.cancel(req)
    return showResult(res, statusCode, data)
  })
)

orderRouter.put(
  '/delivered/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.delivered(req)
    return showResult(res, statusCode, data)
  })
)

export default orderRouter
