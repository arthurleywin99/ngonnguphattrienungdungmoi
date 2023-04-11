import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRouter from './routers/productRouter.js'
import brandRouter from './routers/brandRouter.js'
import utilRouter from './routers/utilRouter.js'
import webInfoRouter from './routers/webInfoRouter.js'
import userRouter from './routers/userRouter.js'
import orderRouter from './routers/orderRouter.js'
import searchRouter from './routers/searchRouter.js'

dotenv.config()

const app = express()

let allowed = ['http://localhost:3000', 'http://localhost:8080', 'https://sandbox.vnpayment.vn']

function options(req, res) {
  let tmp
  let origin = req.header('Origin')
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    }
  } else {
    tmp = {
      origin: 'error',
    }
  }
  res(null, tmp)
}

app.use(cors(options))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log('Connection error: ' + err)
  })

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.status(200).send('Server connect successfully')
})

app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`)
})

app.use('/api/products', productRouter)
app.use('/api/brands', brandRouter)
app.use('/api/utils', utilRouter)
app.use('/api/webinfos', webInfoRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/search', searchRouter)
app.get('/api/config/paypal', (req, res) => {
  res.status(200).send({ message: process.env.PAYPAL_CLIENT_ID || 'sb' })
})
