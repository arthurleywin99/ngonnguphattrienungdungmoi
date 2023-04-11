import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_DELETE_ITEM,
  CART_EMPTY,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_ITEM,
  CART_UPDATE_ITEM_FAIL,
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload
      const isExistItem = state.cartItems.find((x) => x.product === item.product)
      if (isExistItem) {
        if (Number(item.qty) + Number(isExistItem.qty) > Number(isExistItem.countInStock)) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === item.product ? { ...x, qty: Number(x.countInStock) } : x
            ),
          }
        }
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? { ...x, qty: Number(x.qty) + Number(item.qty) } : x
          ),
        }
      } else {
        if (item.qty > item.countInStock) {
          return {
            ...state,
            cartItems: [...state.cartItems, { ...item, qty: Number(item.countInStock) }],
          }
        }
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    }
    case CART_ADD_ITEM_FAIL: {
      return { ...state, error: action.payload }
    }
    case CART_UPDATE_ITEM: {
      const item = action.payload
      const isExistItem = state.cartItems.find((x) => x.product === item.product)
      if (isExistItem) {
        if (Number(item.newQty) > Number(isExistItem.countInStock)) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === item.product ? { ...x, qty: Number(x.countInStock) } : x
            ),
          }
        }
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? { ...x, qty: Number(item.newQty) } : x
          ),
        }
      }
      return state
    }
    case CART_UPDATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case CART_DELETE_ITEM: {
      const productId = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== productId),
      }
    }
    case CART_SAVE_SHIPPING_ADDRESS: {
      const address = action.payload
      return {
        ...state,
        shippingAddress: address,
      }
    }
    case CART_SAVE_PAYMENT_METHOD: {
      const payment = action.payload
      return {
        ...state,
        payment,
      }
    }
    case CART_EMPTY: {
      return { cartItems: [] }
    }
    default: {
      return state
    }
  }
}
