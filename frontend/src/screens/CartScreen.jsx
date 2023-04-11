import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteFromCart, updateCart } from '../actions/cartActions'

function CartScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.userSignin)

  const changeQtyHandler = (id, newQty) => {
    dispatch(updateCart(id, newQty))
  }

  const deleteItemFromCartHandler = (id) => {
    dispatch(deleteFromCart(id))
  }

  const checkOutHandler = () => {
    if (userInfo) {
      navigate('/checkout?step=shipping-address')
    } else {
      navigate('/signin')
    }
  }

  return (
    <div className='mx-auto container'>
      <div className='grid grid-cols-[minmax(500px,_1fr)_300px] mt-[15px] gap-4'>
        {cartItems && cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-[150px_minmax(0,_1fr)_180px] rounded border border-solid border-[#ccc] px-[5px] pb-[10px] pt-[5px]'
              >
                <Link to={`/product/${item.product}`} className='flex items-center'>
                  <img
                    className='align-middle transition duration-700 hover:transition hover:-translate-y-3 hover:duration-700'
                    src={item.images[0]}
                    alt={item.name}
                  />
                </Link>
                <div>
                  <Link
                    to={`/product/${item.product}`}
                    className='text-[20px] font-bold mb-[10px] text-[#000] hover:text-violet-900'
                  >
                    {item.name}
                  </Link>
                  <div className='text-[16px] font-bold mb-[5px]'>
                    Số lượng:{' '}
                    <input
                      className='text-green-500 border boder-solid border-[#ccc] rounded w-1/5 text-center focus:outline-none focus:border focus:border-'
                      type='text'
                      value={item.qty}
                      onChange={(e) => {
                        if (Number(e.target.value) < 1 || isNaN(e.target.value)) {
                          e.target.value = 1
                        }
                        changeQtyHandler(item.product, e.target.value)
                      }}
                    />
                  </div>
                  <div className='text-[16px] font-bold mb-[5px]'>
                    Giá niêm yết:{' '}
                    <span className='text-blue-500 line-through'>
                      {item.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <div className='text-[16px] font-bold mb-[5px]'>
                    Giá bán:{' '}
                    <span className='text-blue-500'>
                      {(item.price + (item.price * item.discount) / 100).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </div>
                  <button
                    className='border border-solid rounded bg-rose-600 text-[16px] p-[5px] text-white hover:cursor-pointer hover:bg-rose-700'
                    onClick={() => deleteItemFromCartHandler(item.product)}
                  >
                    Xoá khỏi giỏ hàng
                  </button>
                </div>
                <span className='text-red-500 text-[22px] font-bold'>
                  {((item.price + (item.price * item.discount) / 100) * item.qty).toLocaleString(
                    'it-IT',
                    {
                      style: 'currency',
                      currency: 'VND',
                    }
                  )}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className='bg-indigo-300	text-gray-700 text-[20px] p-[10px] rounded font-bold'>
              Giỏ hàng trống
            </div>
          </div>
        )}
        <div className='border border-solid border-[#ccc] p-[10px] rounded-md'>
          <div className='flex justify-between mb-[8px]'>
            <p className='text-[16px]'>Số lượng:</p>
            <p className='text-[16px] font-bold'>
              {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
            </p>
          </div>
          <div className='flex justify-between mb-[8px]'>
            <p className='text-[16px]'>Tiền sản phẩm:</p>
            <p className='text-[16px] font-bold'>
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc +
                    Number(item.qty) *
                      (Number(item.price) + (Number(item.price) * Number(item.discount)) / 100),
                  0
                )
                .toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
            </p>
          </div>
          <div className='flex justify-between mb-[8px]'>
            <p className='text-[16px]'>Phí ship</p>
            <p className='text-[16px] font-bold'>0</p>
          </div>
          <div className='flex justify-between mb-[8px]'>
            <p className='text-[16px]'>Tổng tiền:</p>
            <p className='text-[16px] font-bold'>
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc +
                    Number(item.qty) *
                      (Number(item.price) + (Number(item.price) * Number(item.discount)) / 100),
                  0
                )
                .toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
            </p>
          </div>
          <button
            className={`${
              !cartItems || cartItems.length === 0
                ? 'bg-gray-300'
                : 'bg-amber-300 hover:bg-amber-400'
            }	w-full text-neutral-700	text-[18px] rounded p-[5px] font-bold hover:cursor-pointer`}
            onClick={checkOutHandler}
            disabled={!cartItems || cartItems.length === 0}
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartScreen
