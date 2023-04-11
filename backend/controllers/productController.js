import { productsSeed } from '../data.js'
import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import Brand from '../models/brandModel.js'
import msg from '../configs/messageConstants.js'
import util from 'util'

export default {
  seed: async () => {
    return await Product.insertMany(productsSeed)
  },

  getByCategory: async (req) => {
    const category = req.params.category.toLowerCase()
    const order = req.params.order.toLowerCase()

    try {
      const products =
        (await Product.find({
          category: { $regex: category.toString(), $options: 'i' },
        }).populate('brand')) || []

      const orders = await Order.find({}).select('orderItems')

      if (products) {
        let results = products.map((product) => {
          const productRatingList = orders.filter((item) =>
            item.orderItems.some((item) => item.product.toString() === product._id.toString())
          )

          const res = productRatingList.reduce((acc, item) => {
            acc.push(
              item.orderItems.map((item) => {
                return item.rating
              })
            )
            return acc
          }, [])

          const sumRatingStar = res.reduce((acc, item) => {
            return acc + Number(item[0].rateNumber)
          }, 0)

          const countRating = res.reduce((acc, item) => {
            if (Number(item[0].rateNumber) > 0) {
              return Number(acc) + 1
            }
            return acc
          }, 0)

          const rating = {
            average: sumRatingStar / countRating,
            quantity: countRating,
          }
          return {
            _id: product._id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            images: product.images,
            price: product.price,
            discount: product.discount,
            comments: product.comments,
            countInStock: product.countInStock,
            description: product.description,
            settings: product.settings,
            rating,
          }
        })

        if (order === 'discount') {
          results = results.sort((a, b) => (a.discount > b.discount ? 1 : -1))
        } else if (order === 'increase') {
          results = results.sort((a, b) => (a.price > b.price ? 1 : -1))
        } else {
          results = results.sort((a, b) => (a.price < b.price ? 1 : -1))
        }

        return {
          statusCode: 200,
          data: results,
        }
      }

      return {
        statusCode: 404,
        data: msg.PRODUCT_NOT_FOUND,
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

  getTopDiscount: async () => {
    const product = await Product.find({})
    const orders = await Order.find({})
    const results = product.sort((a, b) => (a.discount > b.discount ? 1 : -1)).slice(0, 15)

    if (product) {
      let temps = results.map((item) => {
        const productRatingList =
          orders.orderItems && orders.orderItems.length > 0
            ? orders.orderItems.filter((order) => order.product === item._id)
            : []
        const rating = {
          average:
            productRatingList.length > 0
              ? productRatingList.rating.reduce((total, item) => total + item, 0) /
                productRatingList.length
              : 0,
          quantity: productRatingList.length,
        }
        return {
          _id: item._id,
          name: item.name,
          category: item.category,
          brand: item.brand,
          images: item.images,
          price: item.price,
          discount: item.discount,
          comments: item.comments,
          countInStock: item.countInStock,
          description: item.description,
          settings: item.settings,
          rating,
        }
      })

      return {
        statusCode: 200,
        data: temps,
      }
    }
    return {
      statusCode: 404,
      data: {
        message: 'Product not found',
      },
    }
  },

  getTopDiscountByBrandName: async (name) => {
    const samsungObj = await Brand.findOne({ name })
    const product = await Product.find({ brand: samsungObj._id })
    const orders = await Order.find({})
    const results = product.sort((a, b) => (a.discount > b.discount ? 1 : -1)).slice(0, 15)

    if (product) {
      let temps = results.map((item) => {
        const productRatingList =
          orders.orderItems && orders.orderItems.length > 0
            ? orders.orderItems.filter((order) => order.product === item._id)
            : []
        const rating = {
          average:
            productRatingList.length > 0
              ? productRatingList.rating.reduce((total, item) => total + item, 0) /
                productRatingList.length
              : 0,
          quantity: productRatingList.length,
        }
        return {
          _id: item._id,
          name: item.name,
          category: item.category,
          brand: item.brand,
          images: item.images,
          price: item.price,
          discount: item.discount,
          comments: item.comments,
          countInStock: item.countInStock,
          description: item.description,
          settings: item.settings,
          rating,
        }
      })

      return {
        statusCode: 200,
        data: temps,
      }
    }
    return {
      statusCode: 404,
      data: msg.PRODUCT_NOT_FOUND,
    }
  },

  getById: async (req) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id).populate('brand')
      const orders = await Order.find({})

      if (product) {
        const productRatingList = orders.filter((item) =>
          item.orderItems.some((item) => item.product.toString() === product._id.toString())
        )

        const res = productRatingList.reduce((acc, item) => {
          acc.push(
            item.orderItems.map((item) => {
              return item.rating
            })
          )
          return acc
        }, [])

        const sumRatingStar = res.reduce((acc, item) => {
          return acc + Number(item[0].rateNumber)
        }, 0)

        const countRating = res.reduce((acc, item) => {
          if (Number(item[0].rateNumber) > 0) {
            return Number(acc) + 1
          }
          return acc
        }, 0)

        const rating = {
          average: sumRatingStar / countRating,
          quantity: countRating,
        }
        return {
          statusCode: 200,
          data: {
            message: {
              _id: product._id,
              name: product.name,
              category: product.category,
              brand: product.brand,
              images: product.images,
              price: product.price,
              discount: product.discount,
              comments: product.comments,
              countInStock: product.countInStock,
              description: product.description,
              settings: product.settings,
              rating,
            },
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: 'Product not found',
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
      const product = await Product.find({}).populate('brand').exec()
      return {
        statusCode: 200,
        data: {
          message: product,
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

  lock: async (req) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id)
      if (product) {
        product.status = false
        await product.save()
        return {
          statusCode: 200,
          data: {
            message: msg.PRODUCT_UPDATE_SUCCESS,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.PRODUCT_NOT_FOUND,
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

  unlock: async (req) => {
    try {
      const { id } = req.params
      const product = await Product.findById(id)
      if (product) {
        product.status = true
        await product.save()
        return {
          statusCode: 200,
          data: {
            message: msg.PRODUCT_UPDATE_SUCCESS,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.PRODUCT_NOT_FOUND,
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

  getCategories: async () => {
    return {
      statusCode: 200,
      data: {
        message: [
          'Cellphones',
          'Laptops',
          'Tablets',
          'Accessories',
          'Smartwatch',
          'Watch',
          'UsedPhone',
          'Pcandprinter',
          'SimAndCard',
          'Utilities',
        ],
      },
    }
  },

  update: async (req) => {
    try {
      const { id, name, category, brand, price, discount, countInStock, description, settings } =
        req.body
      const product = await Product.findById(id)
      if (product) {
        await Product.findByIdAndUpdate(id, {
          $set: {
            name,
            category,
            brand,
            price,
            discount,
            countInStock,
            description,
            settings,
          },
        })
        return {
          statusCode: 200,
          data: {
            message: msg.PRODUCT_UPDATE_SUCCESS,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.PRODUCT_NOT_FOUND,
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

  create: async (req) => {
    try {
      const {
        brand,
        category,
        countInStock,
        description,
        discount,
        images,
        name,
        price,
        settings,
      } = req.body
      if (!brand) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Brand'),
          },
        }
      }

      if (!category) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Category'),
          },
        }
      }

      if (!countInStock) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Count in Stock'),
          },
        }
      }

      if (isNaN(Number(countInStock)) || Number(countInStock) < 0) {
        return {
          statusCode: 401,
          data: {
            message: 'Count in stock is not available',
          },
        }
      }

      if (!description) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Description'),
          },
        }
      }

      if (!discount) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Discount'),
          },
        }
      }

      if (isNaN(Number(discount)) || Number(discount) > 0) {
        return {
          statusCode: 401,
          data: {
            message: 'Discount is not available',
          },
        }
      }

      if (!images) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Images'),
          },
        }
      }

      if (!name) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Name'),
          },
        }
      }

      if (!price) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Price'),
          },
        }
      }

      if (isNaN(Number(price)) || Number(price) < 0) {
        return {
          statusCode: 401,
          data: {
            message: 'Price is not available',
          },
        }
      }

      if (!settings) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'Settings'),
          },
        }
      }
      const product = await Product.findOne({ name })
      if (product) {
        return {
          statusCode: 401,
          data: {
            message: 'Product exists already',
          },
        }
      }
      const productCreated = await new Product({
        brand,
        category,
        countInStock,
        description,
        discount,
        images,
        name,
        price,
        settings,
      }).save()
      if (productCreated) {
        return {
          statusCode: 200,
          data: {
            message: 'Product created successfully',
          },
        }
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
