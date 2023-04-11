import {
  PRODUCT_GET_BY_ID_FAIL,
  PRODUCT_GET_BY_ID_REQUEST,
  PRODUCT_GET_BY_ID_SUCCESS,
  PRODUCT_GET_DISCOUNT_FAIL,
  PRODUCT_GET_DISCOUNT_REQUEST,
  PRODUCT_GET_DISCOUNT_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_SAMSUNG_GET_DISCOUNT_FAIL,
  PRODUCT_SAMSUNG_GET_DISCOUNT_REQUEST,
  PRODUCT_SAMSUNG_GET_DISCOUNT_SUCCESS,
} from '../constants/productConstants'
import Axios from 'axios'

export const getProductByCategory =
  ({ category, order }) =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_GET_REQUEST })
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/category/${category}/order/${order}`
      )
      dispatch({ type: PRODUCT_GET_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getProductDiscount = () => async (dispatch) => {
  dispatch({ type: PRODUCT_GET_DISCOUNT_REQUEST })
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/top-discount`
    )
    dispatch({ type: PRODUCT_GET_DISCOUNT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_DISCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getSamsungDiscount = () => async (dispatch) => {
  dispatch({ type: PRODUCT_SAMSUNG_GET_DISCOUNT_REQUEST })
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/brand/samsung/top-discount`
    )
    dispatch({ type: PRODUCT_SAMSUNG_GET_DISCOUNT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_SAMSUNG_GET_DISCOUNT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_GET_BY_ID_REQUEST, payload: id })
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`
    )
    dispatch({ type: PRODUCT_GET_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
