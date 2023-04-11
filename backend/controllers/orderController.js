import Order from '../models/orderModel.js'
import { sendMailActivate } from '../utils/utils.js'
import msg from '../configs/messageConstants.js'
import util from 'util'

export default {
  create: async (req, res) => {
    try {
      const { orderItems, shippingInformation, payment } = req.body

      const user = req.user

      const orderCreated = await new Order({
        user,
        orderItems,
        shippingInformation,
        payment,
      }).save()

      const total = orderCreated.orderItems.reduce((item) => {
        return item.price * item.qty
      }, 0)

      if (orderCreated) {
        const mailOptions = {
          from: 'Admin',
          to: orderCreated.shippingInformation.email,
          subject: msg.NEW_ORDER_MAILING_SUBJECT,
          html: util.format(
            msg.NEW_ORDER_MAILING_HTML,
            orderCreated.shippingInformation.fullName,
            orderCreated.user.toString(),
            orderCreated.orderItems.length.toString(),
            total.toString(),
            orderCreated.payment?.method
          ),
        }
        sendMailActivate(res, mailOptions)

        return {
          statusCode: 200,
          data: {
            message: msg.CREATE_ORDER_SUCCESS,
          },
        }
      }

      return {
        statusCode: 401,
        data: {
          message: msg.CREATE_ORDER_FAIL,
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
      const { id } = req.params
      const order = await Order.findById(id).populate('user')
      if (order) {
        return {
          statusCode: 200,
          data: order,
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
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

  getByStatus: async (req) => {
    try {
      const id = req.user
      const { status } = req.params
      let orders = await Order.find({ user: id }).populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          model: 'Product',
          select: '_id name images',
        },
      })
      if (status !== 'all') {
        orders = orders.filter((item) => item.status === status)
      }
      if (orders) {
        const resultList = orders.reduce((acc, item1) => {
          const temp = item1.orderItems.map((item2) => {
            return {
              _id: item1._id,
              user: item1.user,
              data: item2,
              payment: item1.payment,
              status: item1.status,
            }
          })
          return [...acc, ...temp]
        }, [])
        return {
          statusCode: 200,
          data: {
            message: resultList,
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

  cancel: async (req) => {
    try {
      const id = req.user
      const { orderId } = req.params

      const order = await Order.findById(orderId)
      if (order) {
        if (id._id.toString() !== order.user.toString()) {
          return {
            statusCode: 401,
            data: {
              message: msg.INVALID_USER,
            },
          }
        }
        order.status = 'canceled'
        order.save()
        return {
          statusCode: 200,
          data: {
            message: msg.ORDER_UPDATE_SUCCESS,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
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

  getOrder: async (req) => {
    try {
      const { orderid, productid } = req.params

      if (!orderid) {
        return {
          statusCode: 404,
          data: {
            message: msg.ORDER_ID_REQUIRED,
          },
        }
      }

      if (!productid) {
        return {
          statusCode: 404,
          data: {
            message: msg.PRODUCT_ID_REQUIRED,
          },
        }
      }

      const order = await Order.findById(orderid).populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          model: 'Product',
          select: '_id name images',
        },
      })

      if (order) {
        const temp = order.orderItems.filter((item) => item.product._id.toString() === productid)[0]

        return {
          statusCode: 200,
          data: {
            message: {
              _id: order._id,
              product: {
                _id: temp._id,
                name: temp.name,
                price: temp.price,
                qty: temp.qty,
                images: temp.product.images,
              },
            },
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
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

  createRating: async (req) => {
    try {
      const { orderId, productId, ratingNumber, comment } = req.body
      if (!orderId) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'OrderID'),
          },
        }
      }

      if (!productId) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'ProductID'),
          },
        }
      }

      if (!ratingNumber) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Rating number'),
          },
        }
      }

      if (Number(ratingNumber) < 0 || Number(ratingNumber) > 5) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.RATING_NUMBER_ERROR),
          },
        }
      }

      if (!comment) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Comment'),
          },
        }
      }

      await Order.updateOne(
        {
          _id: orderId,
          'orderItems.$[el].product': productId,
        },
        {
          $set: {
            'orderItems.$[].rating': {
              comment,
              rateNumber: Number(ratingNumber),
            },
            status: 'evaluated',
          },
        }
      )

      return {
        statusCode: 200,
        data: {
          message: msg.UPDATE_SUCCESS,
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

  getAll: async () => {
    try {
      const orders = await Order.find({}).exec()
      return {
        statusCode: 200,
        data: {
          message: orders,
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

  confirm: async (req) => {
    try {
      const { id } = req.params
      const order = await Order.findById(id)
      if (order) {
        await Order.findByIdAndUpdate(id, {
          $set: {
            status: 'confirmed',
          },
        })
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
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

  cancel: async (req) => {
    try {
      const { id } = req.params
      const order = await Order.findById(id)
      if (order) {
        await Order.findByIdAndUpdate(id, {
          $set: {
            status: 'canceled',
          },
        })
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message: msg.ORDER_NOT_FOUND,
        },
      }
    }
  },

  delivered: async (req) => {
    try {
      const { id } = req.params
      const order = await Order.findById(id)
      if (order) {
        await Order.findByIdAndUpdate(id, {
          $set: {
            status: 'delivered',
          },
        })
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message,
        },
      }
    }
  },
}
