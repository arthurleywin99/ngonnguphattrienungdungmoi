import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_RESIGNIN,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from '../constants/userConstants'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST: {
      return { loading: true }
    }
    case USER_REGISTER_SUCCESS: {
      return { loading: false, userRegister: action.payload }
    }
    case USER_REGISTER_FAIL: {
      return { loading: false, error: action.payload }
    }
    case USER_REGISTER_RESET: {
      return {}
    }
    default: {
      return state
    }
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST: {
      return { loading: true }
    }
    case USER_SIGNIN_SUCCESS: {
      return { loading: false, userInfo: action.payload }
    }
    case USER_SIGNIN_FAIL: {
      return { loading: false, error: action.payload }
    }
    case USER_SIGNOUT: {
      return {}
    }
    case USER_RESIGNIN: {
      const newUser = action.payload
      const userInfo = state.userInfo
      return {
        ...state,
        userInfo: {
          ...userInfo,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          gender: newUser.gender,
          phoneNumber: newUser.phoneNumber,
          bDay: Number(newUser.bDay),
          bMonth: Number(newUser.bMonth),
          bYear: Number(newUser.bYear),
        },
      }
    }
    default: {
      return state
    }
  }
}
