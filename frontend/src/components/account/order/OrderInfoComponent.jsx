import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FontAwesome from '../../utils/FontAwesome'
import OrderInfoNavComponent from './OrderInfoNavComponent'

function OrderInfoComponent() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { userInfo } = useSelector((state) => state.userSignin)

  const [orderList, setOrderList] = useState([])
  const [loading, setLoading] = useState(false)

  const statusQuery = searchParams.get('status')

  const getOrders = () =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/getall/${statusQuery}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        setOrderList(response.message)
        setLoading(false)
      })

  useEffect(() => {
    setLoading(true)
    getOrders()
  }, [statusQuery, userInfo.token])

  const cancelOrderHandler = (orderId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/cancel/${orderId}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => getOrders())
      .catch((err) => console.log(err))
  }

  const ratingOrderHandler = (orderId, productId) => {
    navigate(`/rating/order/${orderId}/product/${productId}`)
  }

  return (
    <div>
      <OrderInfoNavComponent option={statusQuery} />
      {loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />}
      {orderList &&
        orderList.map((item, index) => (
          <div
            key={index}
            className='border border-solid border-[#ccc] rounded px-[10px] py-[15px] mt-[10px] grid grid-cols-[150px_1fr_150px]'
          >
            <img className='w-[120px]' src={item.data.product.images[0]} alt={item.data.name} />
            <div>
              <div className='text-[18px] font-bold'>{item.data.name}</div>
              <div className='text-[18px]'>Mã đơn hàng: {item._id}</div>
              <div className='text-[16px]'>Hình thức thanh toán: {item.payment.method}</div>
              <div className='text-[16px]'>Số lượng: {item.data.qty}</div>
              <div className='text-[16px]'>
                Giá tiền:{' '}
                {item.data.price.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
              <div className='text-[16px]'>
                Tình trạng đơn:{' '}
                {item.status === 'pending'
                  ? 'Đang xử lý'
                  : item.status === 'delivered'
                  ? 'Đã giao'
                  : item.status === 'evaluated'
                  ? 'Đã đánh giá'
                  : 'Đã huỷ'}
              </div>
              <div>
                {item.status === 'evaluated' && (
                  <>
                    {Array(Number(item.data.rating.rateNumber))
                      .fill()
                      .map((_, index) => (
                        <i
                          key={index}
                          className='fas fa-star text-[20px]'
                          style={{ color: '#ffb91d' }}
                        />
                      ))}
                  </>
                )}
              </div>
              {item.status === 'pending' && (
                <button
                  type='button'
                  className='text-[18px] font-bold bg-rose-500 text-white px-[15px] rounded py-[5px] mx-[2px]'
                  onClick={() => cancelOrderHandler(item._id)}
                >
                  Huỷ đơn
                </button>
              )}
              {item.status === 'delivered' && (
                <button
                  type='button'
                  className='text-[18px] font-bold bg-blue-500 text-white px-[15px] rounded py-[5px] mx-[2px]'
                  onClick={() => ratingOrderHandler(item._id, item.data.product._id)}
                >
                  Đánh giá
                </button>
              )}
              {item.status === 'evaluated' && (
                <button
                  type='button'
                  className='text-[18px] font-bold bg-teal-500 text-white px-[15px] rounded py-[5px] mx-[2px]'
                  disabled
                >
                  Đã đánh giá
                </button>
              )}
            </div>
            <div className='text-[20px] font-bold text-rose-500'>
              {(item.data.qty * item.data.price).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
        ))}
    </div>
  )
}

export default OrderInfoComponent
