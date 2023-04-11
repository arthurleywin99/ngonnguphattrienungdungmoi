import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_DELETE_ITEM,
  CART_EMPTY,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_ITEM,
  CART_UPDATE_ITEM_FAIL,
} from '../constants/cartConstants'
import Axios from 'axios'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
    )
    if (data) {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          images: data.images,
          price: data.price,
          discount: data.discount,
          countInStock: data.countInStock,
          qty,
        },
      })
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } else {
      dispatch({ type: CART_ADD_ITEM_FAIL, payload: 'Product not found' })
    }
  } catch (error) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const updateCart = (productId, newQty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`
    )
    if (data && Number(newQty) <= data.countInStock && Number(newQty) > 1) {
      dispatch({
        type: CART_UPDATE_ITEM,
        payload: {
          product: data._id,
          countInStock: data.countInStock,
          newQty,
        },
      })
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } else {
      dispatch({ type: CART_UPDATE_ITEM_FAIL, payload: 'Product not found' })
    }
  } catch (error) {
    dispatch({
      type: CART_UPDATE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deleteFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_DELETE_ITEM,
    payload: productId,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (address) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: address })
}

export const savePayment = (payment) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: payment })
}

export const cartClearState = () => (dispatch) => {
  dispatch({
    type: CART_EMPTY,
  })
  localStorage.removeItem('cartItems')
}
