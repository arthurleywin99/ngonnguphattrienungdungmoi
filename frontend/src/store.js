import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import { createOrderReducer, searchOrderByIdReducer } from './reducers/orderReducers'
import {
  getProductByCategoryReducer,
  getProductByIdReducer,
  getProductTopDiscountReducer,
  getSamsungTopDiscountReducer,
} from './reducers/productReducers'
import { searchProductReducer } from './reducers/searchReducers'
import { userRegisterReducer, userLoginReducer, userUpdateReducer } from './reducers/userReducers'
import { getWebInfoReducer } from './reducers/webInfoReducers'

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
}

const reducer = combineReducers({
  getProductByCategory: getProductByCategoryReducer,
  getWebInfo: getWebInfoReducer,
  getProductTopDiscount: getProductTopDiscountReducer,
  getSamsungTopDiscount: getSamsungTopDiscountReducer,
  userRegister: userRegisterReducer,
  userSignin: userLoginReducer,
  getProductById: getProductByIdReducer,
  cart: cartReducer,
  createOrder: createOrderReducer,
  searchOrder: searchOrderByIdReducer,
  searchProduct: searchProductReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
