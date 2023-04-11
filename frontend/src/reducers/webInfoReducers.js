import {
  GET_WEBINFO_FAIL,
  GET_WEBINFO_REQUEST,
  GET_WEBINFO_SUCCESS,
} from '../constants/webInfoConstants'

export const getWebInfoReducer = (
  state = { loading: true, data: [] },
  action
) => {
  switch (action.type) {
    case GET_WEBINFO_REQUEST: {
      return { loading: true }
    }
    case GET_WEBINFO_SUCCESS: {
      return { loading: false, data: action.payload }
    }
    case GET_WEBINFO_FAIL: {
      return { loading: false, error: action.payload }
    }
    default: {
      return state
    }
  }
}
