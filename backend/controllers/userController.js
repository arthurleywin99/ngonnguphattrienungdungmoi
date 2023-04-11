import User from '../models/userModel.js'
import { generateToken, sendMailActivate, showResult } from '../utils/utils.js'
import msg from '../configs/messageConstants.js'
import isEmail from 'validator/lib/isEmail.js'
import isStrongPassword from 'validator/lib/isStrongPassword.js'
import bcrypt from 'bcrypt'
import util from 'util'
import jwt from 'jsonwebtoken'

export default {
  signUp: async (req, res) => {
    const {
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
      password,
      bYear,
      bMonth,
      bDay,
      isAdmin,
      isSeller,
    } = req.body

    const userEmail = await User.findOne({ email })
    const userPhone = await User.findOne({ phoneNumber })

    if (userEmail) {
      return showResult(res, 400, {
        message: msg.EMAIL_EXIST,
      })
    }

    if (userPhone) {
      return showResult(res, 400, {
        message: msg.PHONE_EXIST,
      })
    }

    if (!isEmail(email)) {
      return showResult(res, 401, {
        message: msg.WRONG_EMAIL_FORMAT,
      })
    }

    if (password.length < 6) {
      return showResult(res, 401, {
        message: util.format(msg.PASSWORD_LENGTH_MISMATCH, '6'),
      })
    }

    const salt = await bcrypt.genSalt(10)
    const cryptedPassword = await bcrypt.hash(password, salt)

    const createdUser = await new User({
      firstName,
      lastName,
      gender,
      email: String(email).toLowerCase(),
      phoneNumber,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      isAdmin,
      isSeller,
    }).save()

    if (createdUser) {
      const token = generateToken(createdUser)
      const activeUrl = `${process.env.BACKEND_URL}/api/users/active/${token}`
      const mailOptions = {
        from: 'Admin',
        to: createdUser.email,
        subject: msg.SIGNUP_MAILING_SUBJECT,
        html: util.format(msg.SIGNUP_MAILING_HTML, createdUser.firstName, activeUrl),
      }
      sendMailActivate(res, mailOptions)
    }

    const data = {
      message: msg.REGISTERED_SUCCESS,
      userInfo: {
        id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        gender: createdUser.gender,
        email: createdUser.email,
        phoneNumber: createdUser.phoneNumber,
        bYear: createdUser.bYear,
        bMonth: createdUser.bMonth,
        bDay: createdUser.bDay,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        seller: createdUser.seller,
      },
    }

    return data
  },

  activeAccount: async (req) => {
    const { token } = req.params

    if (token) {
      var userId
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          return {
            statusCode: 401,
            data: {
              message: msg.TOKEN_EXPIRED,
            },
          }
        }
        userId = decoded._id
      })
      const user = await User.findById(userId)
      if (user) {
        user.isVerified = true
        await user.save()
        return {
          statusCode: 200,
          data: {
            message: msg.VERIFIED_SUCCESS,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.USER_NOT_FOUND,
        },
      }
    }
    return {
      statusCode: 404,
      data: {
        message: msg.NO_TOKEN,
      },
    }
  },

  signIn: async (req) => {
    const { username, password } = req.body

    if (username.length === 0 || !username) {
      return {
        statusCode: 401,
        data: {
          message: msg.USERNAME_REQUIRED,
        },
      }
    }

    if (!password) {
      return {
        statusCode: 401,
        data: {
          message: msg.PASSWORD_REQUIRED,
        },
      }
    }

    if (password.length < 6) {
      return {
        statusCode: 401,
        data: {
          message: util.format(msg.PASSWORD_LENGTH_MISMATCH, '6'),
        },
      }
    }

    try {
      const userEmail = await User.findOne({
        email: String(username).toLowerCase(),
      }).select('+password')
      const userPhoneNumber = await User.findOne({
        phoneNumber: username,
      }).select('+password')

      if (userEmail) {
        const isMatched = await bcrypt.compare(password, userEmail.password)
        if (isMatched) {
          return {
            statusCode: 200,
            data: {
              _id: userEmail._id,
              firstName: userEmail.firstName,
              lastName: userEmail.lastName,
              gender: userEmail.gender,
              email: userEmail.email,
              phoneNumber: userEmail.phoneNumber,
              profilePicUrl: userEmail.profilePicUrl,
              bDay: userEmail.bDay,
              bMonth: userEmail.bMonth,
              bYear: userEmail.bYear,
              isAdmin: userEmail.isAdmin,
              isSeller: userEmail.isSeller,
              isVerified: userEmail.isVerified,
              token: generateToken(userEmail),
            },
          }
        } else {
          return {
            statusCode: 401,
            data: {
              message: msg.SIGNIN_INVALID_EMAIL_PASSWORD,
            },
          }
        }
      }

      if (userPhoneNumber) {
        const isMatched = await bcrypt.compare(password, userPhoneNumber.password)
        if (isMatched) {
          return {
            statusCode: 200,
            data: {
              _id: userPhoneNumber._id,
              firstName: userPhoneNumber.firstName,
              lastName: userPhoneNumber.lastName,
              gender: userPhoneNumber.gender,
              email: userPhoneNumber.email,
              phoneNumber: userPhoneNumber.phoneNumber,
              profilePicUrl: userPhoneNumber.profilePicUrl,
              bDay: userPhoneNumber.bDay,
              bMonth: userPhoneNumber.bMonth,
              bYear: userPhoneNumber.bYear,
              isAdmin: userPhoneNumber.isAdmin,
              isSeller: userPhoneNumber.isSeller,
              isVerified: userPhoneNumber.isVerified,
              token: generateToken(userPhoneNumber),
            },
          }
        } else {
          return {
            statusCode: 401,
            data: {
              message: msg.SIGNIN_INVALID_EMAIL_PASSWORD,
            },
          }
        }
      }

      return {
        statusCode: 404,
        data: {
          message: msg.USER_NOT_FOUND,
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

  getById: async (req) => {
    try {
      const id = req.user
      const user = await User.findById(id)
      if (user) {
        return {
          statusCode: 200,
          data: user,
        }
      }
      return {
        statusCode: 404,
        data: { message: msg.USER_NOT_FOUND },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: { message: error.message },
      }
    }
  },

  getAll: async () => {
    try {
      const users = await User.find({}).exec()
      return {
        statusCode: 200,
        data: {
          message: users,
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

  update: async (req) => {
    try {
      const {
        firstName,
        lastName,
        gender,
        email,
        phoneNumber,
        bDay,
        bMonth,
        bYear,
        profilePicUrl,
      } = req.body

      const id = req.user

      if (!firstName) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Firstname'),
          },
        }
      }

      if (!lastName) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Lastname'),
          },
        }
      }

      if (!gender) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Gender'),
          },
        }
      }

      if (!email) {
        return {
          statusCode: 401,
          data: {
            message: msg.EMAIL_REQUIRED,
          },
        }
      }

      if (!phoneNumber) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Phone number'),
          },
        }
      }

      let update = {}

      if (profilePicUrl) {
        update = {
          firstName,
          lastName,
          gender,
          phoneNumber,
          bDay,
          bMonth,
          bYear,
          profilePicUrl,
        }
      } else {
        update = {
          firstName,
          lastName,
          gender,
          bDay,
          bMonth,
          bYear,
          phoneNumber,
        }
      }

      const item = await User.findOneAndUpdate(id, update, { new: true })
      if (item) {
        return {
          statusCode: 200,
          data: {
            message: item,
          },
        }
      }

      return {
        statusCode: 401,
        data: {
          message: msg.USER_UPDATE_ERROR,
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

  updatePassword: async (req) => {
    try {
      const { oldPassword, newPassword } = req.body
      const id = req.user
      const user = await User.findById(id).select('password')
      if (!oldPassword || !newPassword) {
        return {
          statusCode: 401,
          message: msg.PASSWORD_REQUIRED,
        }
      }
      if (!isStrongPassword(newPassword)) {
        return {
          statusCode: 401,
          message: msg.PASSWORD_STRONG,
        }
      }
      if (newPassword.length < 6) {
        return {
          statusCode: 401,
          message: util.format(msg.PASSWORD_LENGTH_MISMATCH, '6'),
        }
      }
      if (user) {
        const isMatched = await bcrypt.compare(oldPassword, user.password)
        if (isMatched) {
          const salt = await bcrypt.genSalt(10)
          const cryptedPassword = await bcrypt.hash(newPassword, salt)
          user.password = cryptedPassword
          user.save()
          return {
            statusCode: 200,
            message: msg.PASSWORD_CHANGE_SUCCESS,
          }
        }
        return {
          statusCode: 401,
          message: msg.PASSWORD_INCORRECT,
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.USER_NOT_FOUND,
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

  sendMail: async (req, res) => {
    try {
      const { email } = req.body
      const user = await User.findOne({ email })
      if (user) {
        const token = generateToken(user)
        const activeUrl = `${process.env.BACKEND_URL}/api/users/active/${token}`
        const mailOptions = {
          from: 'Admin',
          to: email,
          subject: msg.SIGNUP_MAILING_SUBJECT,
          html: util.format(msg.SIGNUP_MAILING_HTML, user.firstName, activeUrl),
        }
        sendMailActivate(res, mailOptions)
        return {
          statusCode: 200,
          data: {
            message: msg.SEND_MAIL_SUCCESS,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.USER_NOT_FOUND,
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
