import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import msg from '../configs/messageConstants.js'

dotenv.config()

export const regexUsername = (username) => {
  const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
  return regex.test(username)
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '6h',
    }
  )
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' })
      }
      req.user = user
      next()
    })
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' })
  }
}

export const sortObject = (obj) => {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

export const showResult = (res, statusCode, data) => {
  res.status(statusCode).json(data)
}

export const sendMailActivate = (res, mailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILING_ADDRESS,
      pass: process.env.MAILING_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return showResult(res, 400, {
        message: msg.SEND_MAIL_ERROR,
      })
    }
  })
}
