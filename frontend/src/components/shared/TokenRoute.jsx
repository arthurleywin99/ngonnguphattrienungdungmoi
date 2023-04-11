import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { signout } from '../../actions/userActions'

const TokenRoute = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.userSignin)

  const expiredTokenHanlder = () => {
    navigate('/signin')
    dispatch(signout())
  }

  return jwt_decode(userInfo.token).exp >= Date.now() / 1000 ? children : expiredTokenHanlder()
}

export default TokenRoute
