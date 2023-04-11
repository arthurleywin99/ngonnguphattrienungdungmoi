import { SEARCH_FAIL, SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants/searchConstants.js'

export const searchProductReducer = (state = { products: [], loading: true }, action) => {
  switch (action.type) {
    case SEARCH_REQUEST: {
      return { loading: true }
    }
    case SEARCH_SUCCESS: {
      return { loading: false, products: action.payload }
    }
    case SEARCH_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}
