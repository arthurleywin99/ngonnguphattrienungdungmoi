import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cartClearState } from '../../actions/cartActions'
import { createOrder } from '../../actions/orderActions'

function OrderConfirmationComponent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartItems, shippingAddress, payment } = useSelector((state) => state.cart)

  const { success, loading, error } = useSelector((state) => state.createOrder)

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/')
    } else if (!shippingAddress) {
      navigate('/checkout?step=shipping-address')
    } else if (!payment) {
      navigate('/checkout?step=payment')
    }
  }, [])

  const orderConfirmHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems.map((item) => {
          return {
            name: item.name,
            qty: item.qty,
            price: item.price + (item.price * item.discount) / 100,
            product: item.product,
            rating: [],
          }
        }),
        shippingInformation: {
          fullName: shippingAddress.fullName,
          address:
            shippingAddress.address +
            ', ' +
            shippingAddress.ward +
            ', ' +
            shippingAddress.district +
            ', ' +
            shippingAddress.city,
          email: shippingAddress.email,
          phoneNumber: shippingAddress.phoneNumber,
        },
        payment: {
          method: payment.method,
          isPaid: payment.method !== 'COD',
          paidAt: payment.updated || null,
          paymentId: payment.id || '',
        },
      })
    )
  }

  useEffect(() => {
    if (success) {
      dispatch(cartClearState())
      navigate('/', { replace: true })
    }
  }, [success])

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className='w-full flex justify-center mt-[20px] flex-wrap'>
      <div className='w-[650px] border border-solid border-[#ccc] p-[15px] rounded'>
        <div className='text-[20px] mb-[14px] text-center'>Thông tin đơn hàng</div>
        {shippingAddress && (
          <table className='table-auto p-[10px]'>
            <tbody>
              <tr>
                <td className='w-1/3'>
                  <span className='text-[16px] font-bold'>Họ tên</span>
                </td>
                <td>
                  <span className='text-[16px]'>{shippingAddress.fullName}</span>
                </td>
              </tr>
              <tr>
                <td className='w-1/3'>
                  <span className='text-[16px] font-bold'>Email</span>
                </td>
                <td>
                  <span className='text-[16px]'>{shippingAddress.email}</span>
                </td>
              </tr>
              <tr>
                <td className='w-1/3'>
                  <span className='text-[16px] font-bold'>Số điện thoại</span>
                </td>
                <td>
                  <span className='text-[16px]'>{shippingAddress.phoneNumber}</span>
                </td>
              </tr>
              <tr>
                <td className='w-1/3'>
                  <span className='text-[16px] font-bold'>Địa chỉ</span>
                </td>
                <td>
                  <span className='text-[16px]'>
                    {shippingAddress.address +
                      ', ' +
                      shippingAddress.ward +
                      ', ' +
                      shippingAddress.district +
                      ', ' +
                      shippingAddress.city}
                  </span>
                </td>
              </tr>
              <tr>
                <td className='w-1/3'>
                  <span className='text-[16px] font-bold'>Hình thức thanh toán</span>
                </td>
                <td>
                  <span className='text-[16px]'>{payment.method}</span>
                </td>
              </tr>
              {payment.method === 'PAYPAL' && (
                <>
                  <tr>
                    <td className='w-1/3'>
                      <span className='text-[16px] font-bold'>Mã thanh toán</span>
                    </td>
                    <td>
                      <span className='text-[16px]'>{payment.id}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='w-1/3'>
                      <span className='text-[16px] font-bold'>Thời gian thanh toán</span>
                    </td>
                    <td>
                      <span className='text-[16px]'>{payment.created}</span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className='w-[650px] border border-solid border-[#ccc] p-[15px] rounded mt-[20px]'>
        <div className='text-[20px] mb-[14px] text-center'>Thông tin sản phẩm</div>
        <table className='table-auto p-[10px] w-full'>
          <thead>
            <tr>
              <th className='text-[16px] w-1/5'>Ảnh</th>
              <th className='text-[16px] w-3/5 text-start'>Tên sản phẩm</th>
              <th className='text-[16px] w-1/5 text-center'>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {cartItems &&
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td className='w-1/5'>
                    <img src={item.images[0]} alt={item.name} className='w-[100px]' />
                  </td>
                  <td className='text-[16px] w-3/5 text-start'>{item.name}</td>
                  <td className='text-[16px] w-1/5 text-center'>{item.qty}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className='w-full text-center'>
        <button
          className='px-[15px] py-[10px] bg-blue-500 text-white rounded mt-[20px] text-[18px] font-bold'
          onClick={orderConfirmHandler}
        >
          Xác nhận đơn hàng
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmationComponent
