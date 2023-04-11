import Product from '../models/productModel.js'
import Order from '../models/orderModel.js'
import msg from '../configs/messageConstants.js'

export default {
  search: async (content, order) => {
    try {
      if (content.length === 0 || !content) {
        return {
          status: 401,
          message: msg.SEARCH_TEXT_REQUIRED,
        }
      }
      const products = await Product.find({
        name: { $regex: content, $options: 'i' },
      }).populate('brand')

      const orders = await Order.find({})

      if (products) {
        let results = products.map((product) => {
          const productRatingList =
            orders.orderItems && orders.orderItems.length > 0
              ? orders.orderItems.filter((order) => order.product === product._id)
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
}
