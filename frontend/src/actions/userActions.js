import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESIGNIN,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constants/userConstants'
import Axios from 'axios'

export const signup = (user) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: user,
  })
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, user)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const signin = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: user })
  try {
    const { data } = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signin`, user)
    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const signout = () => (dispatch) => {
  dispatch({ type: USER_SIGNOUT })
  localStorage.removeItem('userInfo')
}

export const updateUser =
  (newUser, setShowForm, setLoading, setError, token) => async (dispatch, getState) => {
    const {
      userSignin: { userInfo },
    } = getState()
    await Axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/update`, newUser, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setLoading(true)
        return res.data
      })
      .then((data) => {
        if (data) {
          setLoading(false)
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              ...userInfo,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              gender: newUser.gender,
              phoneNumber: newUser.phoneNumber,
              bDay: Number(newUser.bDay),
              bMonth: Number(newUser.bMonth),
              bYear: Number(newUser.bYear),
            })
          )
          dispatch({ type: USER_RESIGNIN, payload: newUser })
          setShowForm(false)
        }
      })
      .catch((err) => setError(err.message))
  }
