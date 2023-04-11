import {
  GET_WEBINFO_FAIL,
  GET_WEBINFO_REQUEST,
  GET_WEBINFO_SUCCESS,
} from '../constants/webInfoConstants'
import Axios from 'axios'

export const getWebInfo = () => async (dispatch) => {
  dispatch({ type: GET_WEBINFO_REQUEST })
  try {
    const { data } = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/webinfos`
    )
    dispatch({ type: GET_WEBINFO_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_WEBINFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
