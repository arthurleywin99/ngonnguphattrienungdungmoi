import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminOrderDetailReview from './order/AdminOrderDetailReview'
import { calculateTime } from '../utils/utils.js'

function AdminOrderComponent() {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.userSignin)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showOrderReview, setShowOrderReview] = useState(false)
  const [id, setId] = useState(null)

  const getData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  const backHandler = () => {
    navigate(-1)
  }

  const statisticalHandler = () => {}

  const orderReviewHandler = (id) => {
    setShowOrderReview(true)
    setId(id)
  }

  const orderConfirmHandler = (id) => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/confirm/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false)
          getData()
        }
      })
      .catch((err) => setError(err.message))
  }

  const orderCancelHandler = (id) => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/cancel/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false)
          getData()
        }
      })
      .catch((err) => setError(err.message))
  }

  const orderDeliveredHandler = (id) => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/delivered/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLoading(false)
          getData()
        }
      })
      .catch((err) => setError(err.message))
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      {showOrderReview && (
        <AdminOrderDetailReview
          id={id}
          token={userInfo.token}
          setShowOrderReview={setShowOrderReview}
        />
      )}
      <div className='mr-[15px]'>
        <h1 className='uppercase text-[22px] font-bold mt-[5px]'>Quản lý đơn hàng</h1>
        <button
          className='text-[18px] px-[10px] py-[5px] bg-gray-500 text-white rounded hover:bg-gray-600 mr-[10px]'
          onClick={() => backHandler()}
        >
          Trở về
        </button>
        <button
          className='text-[18px] px-[10px] py-[5px] bg-green-500 text-white rounded hover:bg-green-600'
          onClick={() => statisticalHandler()}
        >
          Xuất thống kê
        </button>
        <table className='table-auto w-full text-center border border-solid border-[#ccc] mt-[10px] rounded'>
          <thead className='border-bottom-[#ccc]'>
            <tr className='bg-blue-500 text-white'>
              <th className='w-[15%] p-[10px] text-[18px] uppercase'>ID</th>
              <th className='w-[15%] p-[10px] text-[18px] uppercase'>Người đặt</th>
              <th className='w-[15%] p-[10px] text-[18px] uppercase'>Tổng tiền</th>
              <th className='w-[15%] p-[10px] text-[18px] uppercase'>Hình thức thanh toán</th>
              <th className='w-[15%] p-[10px] text-[18px] uppercase'>Trạng thái</th>
              <th className='w-[15%] p-[10px] text-[18px] uppercase'>Ngày cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`border border-solid border-[#ccc] ${
                      index % 2 !== 0 && 'bg-[#ccc]'
                    }`}
                  >
                    <td className='text-[18px] p-[10px]'>{item._id}</td>
                    <td className='text-[18px] p-[10px]'>{item.user}</td>
                    <td className='text-[18px] p-[10px]'>
                      {item.orderItems
                        .reduce((acc, item) => {
                          return acc + Number(item.qty * item.price)
                        }, 0)
                        .toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                    </td>
                    <td className='text-[18px] p-[10px]'>{item.payment.method}</td>
                    <td className='text-[18px] p-[10px]'>
                      <span
                        className={`px-[10px] py-[5px] rounded text-white bg-${
                          item.status === 'canceled'
                            ? 'red-500'
                            : item.status === 'pending'
                            ? 'yellow-500'
                            : item.status === 'confirmed'
                            ? 'green-500'
                            : item.status === 'delivered'
                            ? 'blue-500'
                            : 'cyan-500'
                        }`}
                      >
                        {item.status === 'canceled'
                          ? 'Huỷ đơn'
                          : item.status === 'pending'
                          ? 'Đang xử lý'
                          : item.status === 'confirmed'
                          ? 'Đã xác nhận'
                          : item.status === 'delivered'
                          ? 'Đã nhận'
                          : 'Đã đánh giá'}
                      </span>
                    </td>
                    <td className='text-[18px] p-[10px]'>{calculateTime(item.updatedAt)}</td>
                    <td>
                      {
                        <button
                          className='px-[10px] py-[5px] text-[16px] uppercase'
                          type='button'
                          onClick={() => orderReviewHandler(item._id)}
                        >
                          <i className='far fa-eye text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                        </button>
                      }
                      {item.status === 'pending' ? (
                        <>
                          <button
                            className='px-[10px] py-[5px] text-[16px] uppercase bg-blue-500 hover:bg-blue-600 rounded text-white mr-[10px]'
                            type='button'
                            onClick={() => orderConfirmHandler(item._id)}
                          >
                            Xác nhận
                          </button>
                          <button
                            className='px-[10px] py-[5px] text-[16px] uppercase bg-rose-500 hover:bg-rose-600 rounded text-white'
                            type='button'
                            onClick={() => orderCancelHandler(item._id)}
                          >
                            Huỷ đơn
                          </button>
                        </>
                      ) : item.status === 'confirmed' ? (
                        <button
                          className='px-[10px] py-[5px] text-[16px] uppercase bg-teal-600 hover:bg-teal-700 rounded text-white'
                          type='button'
                          onClick={() => orderDeliveredHandler(item._id)}
                        >
                          Xác nhận đã giao
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminOrderComponent
