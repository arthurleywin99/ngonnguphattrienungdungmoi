import { SEARCH_FAIL, SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants/searchConstants.js'
import Axios from 'axios'

export const searchProduct = (content, order) => async (dispatch) => {
  dispatch({ type: SEARCH_REQUEST, payload: content })
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/search/${content}/${order}`
    )
    dispatch({ type: SEARCH_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SEARCH_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}
