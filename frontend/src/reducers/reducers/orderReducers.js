import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_SEARCH_FAIL,
  ORDER_SEARCH_REQUEST,
  ORDER_SEARCH_SUCCESS,
} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: {
      return { loading: true }
    }
    case ORDER_CREATE_SUCCESS: {
      return { loading: false, success: true }
    }
    case ORDER_CREATE_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}

export const searchOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SEARCH_REQUEST: {
      return { loading: true }
    }
    case ORDER_SEARCH_SUCCESS: {
      return { loading: false, order: action.payload }
    }
    case ORDER_SEARCH_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}
