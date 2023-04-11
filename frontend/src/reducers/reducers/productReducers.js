import {
  PRODUCT_GET_DISCOUNT_FAIL,
  PRODUCT_GET_DISCOUNT_REQUEST,
  PRODUCT_GET_DISCOUNT_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_SAMSUNG_GET_DISCOUNT_REQUEST,
  PRODUCT_SAMSUNG_GET_DISCOUNT_SUCCESS,
  PRODUCT_SAMSUNG_GET_DISCOUNT_FAIL,
  PRODUCT_GET_BY_ID_REQUEST,
  PRODUCT_GET_BY_ID_SUCCESS,
  PRODUCT_GET_BY_ID_FAIL,
} from '../constants/productConstants'

export const getProductByCategoryReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST: {
      return { loading: true }
    }
    case PRODUCT_GET_SUCCESS: {
      return { loading: false, products: action.payload }
    }
    case PRODUCT_GET_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}

export const getProductTopDiscountReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_GET_DISCOUNT_REQUEST: {
      return { loading: true }
    }
    case PRODUCT_GET_DISCOUNT_SUCCESS: {
      return { loading: false, products: action.payload }
    }
    case PRODUCT_GET_DISCOUNT_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}

export const getSamsungTopDiscountReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SAMSUNG_GET_DISCOUNT_REQUEST: {
      return { loading: true }
    }
    case PRODUCT_SAMSUNG_GET_DISCOUNT_SUCCESS: {
      return { loading: false, products: action.payload }
    }
    case PRODUCT_SAMSUNG_GET_DISCOUNT_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}

export const getProductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_GET_BY_ID_REQUEST: {
      return { loading: true }
    }
    case PRODUCT_GET_BY_ID_SUCCESS: {
      return { loading: false, product: action.payload }
    }
    case PRODUCT_GET_BY_ID_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}
