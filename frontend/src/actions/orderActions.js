import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_SEARCH_FAIL,
  ORDER_SEARCH_REQUEST,
  ORDER_SEARCH_SUCCESS,
} from '../constants/orderConstants'
import Axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
  const {
    userSignin: { userInfo },
  } = getState()
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders/create`,
      {
        user: order.user,
        orderItems: order.orderItems,
        shippingInformation: order.shippingInformation,
        payment: order.payment,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    )
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const searchOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_SEARCH_REQUEST, payload: orderId })
  try {
    const { data } = await Axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${orderId}`)
    dispatch({ type: ORDER_SEARCH_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
