import React, { useEffect, useState } from 'react'
import FontAwesome from '../../utils/FontAwesome'

const ExitButton = React.memo(() => {
  return <FontAwesome icon='fas fa-times' color='#777' />
})

function AdminOrderDetailReview({ id, token, setShowOrderReview }) {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  const handleHideForm = () => {
    setShowOrderReview(false)
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className='fixed bg-gray-400 color-blur inset-0 z-50'>
      <div className='relative top-[50%] left-[50%] w-[900px] translate-x-[-50%] translate-y-[-50%] bg-rose-50 p-[40px] rounded-[10px]'>
        <div
          className='absolute right-[5px] top-[5px] text-2xl hover:cursor-pointer hover:opacity-70'
          onClick={handleHideForm}
        >
          <ExitButton />
        </div>
        <h1 className='text-center text-[28px] font-bold mb-[25px] uppercase'>Chi tiết đơn hàng</h1>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Người đặt</div>
          <div className='text-[20px]'>{order?.user.firstName + ' ' + order?.user.lastName}</div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Trạng thái</div>
          <div className='text-[20px]'>
            {order?.status === 'canceled'
              ? 'Huỷ đơn'
              : order?.status === 'pending'
              ? 'Đang xử lý'
              : order?.status === 'confirmed'
              ? 'Đã xác nhận'
              : order?.status === 'delivered'
              ? 'Đã nhận'
              : 'Đã đánh giá'}
          </div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Tổng tiền</div>
          <div className='text-[20px]'>
            {order?.orderItems
              .reduce((acc, item) => {
                return acc + Number(item.qty * item.price)
              }, 0)
              .toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
          </div>
        </div>
        <div className='text-[20px] font-bold'>Thông tin nhận hàng</div>
        <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded bg-neutral-300`}>
          <div className='text-[16px]'>Họ tên</div>
          <div className='text-[16px]'>{order?.shippingInformation.fullName}</div>
        </div>
        <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded`}>
          <div className='text-[16px]'>Địa chỉ</div>
          <div className='text-[16px]'>{order?.shippingInformation.address}</div>
        </div>
        <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded bg-neutral-300`}>
          <div className='text-[16px]'>Email</div>
          <div className='text-[16px]'>{order?.shippingInformation.email}</div>
        </div>
        <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded`}>
          <div className='text-[16px]'>Số điện thoại liên lạc</div>
          <div className='text-[16px]'>{order?.shippingInformation.phoneNumber}</div>
        </div>
        <div className='text-[20px] font-bold mt-[10px]'>Thông tin thanh toán</div>
        <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded bg-neutral-300`}>
          <div className='text-[16px]'>Hình thức thanh toán</div>
          <div className='text-[16px]'>{order?.payment.method}</div>
          {order?.payment.method !== 'COD' && (
            <>
              <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded`}>
                <div className='text-[16px]'>Trạng thái thanh toán</div>
                <div className='text-[16px]'>
                  {order?.payment.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                </div>
              </div>
              <div
                className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded bg-neutral-300`}
              >
                <div className='text-[16px]'>Thời gian thanh toán</div>
                <div className='text-[16px]'>{order?.payment.paidAt}</div>
              </div>
              <div className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded`}>
                <div className='text-[16px]'>Mã thanh toán</div>
                <div className='text-[16px]'>{order?.payment.paymentId}</div>
              </div>
            </>
          )}
        </div>
        <div className='text-[20px] font-bold mt-[10px]'>Chi tiết sản phẩm</div>
        <table className='text-[18px] text-center w-full px-[10px] border border-solid border-[#000]'>
          <thead>
            <tr className='border border-solid border-[#000]'>
              <th className='border border-solid border-[#000]'>Mã sản phẩm</th>
              <th className='border border-solid border-[#000]'>Tên sản phẩm</th>
              <th className='border border-solid border-[#000]'>Số lượng</th>
              <th className='border border-solid border-[#000]'>Giá bán</th>
              <th className='border border-solid border-[#000]'>Đánh giá</th>
            </tr>
          </thead>
          {order?.orderItems.map((item, index) => (
            <tr key={index} className='border border-solid border-[#000]'>
              <td className='border border-solid border-[#000]'>{item?.product}</td>
              <td className='border border-solid border-[#000]'>{item?.name}</td>
              <td className='border border-solid border-[#000]'>{item?.qty}</td>
              <td className='border border-solid border-[#000]'>{item?.price}</td>
              <td className='border border-solid border-[#000]'>
                Số sao: {item?.rating.rateNumber} <br /> Bình luận: {item?.rating.comment}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default AdminOrderDetailReview
