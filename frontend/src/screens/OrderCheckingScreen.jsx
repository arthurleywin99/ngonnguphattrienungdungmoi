import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchOrderById } from '../actions/orderActions'
import FontAwesome from '../components/utils/FontAwesome'

function OrderCheckingScreen() {
  const dispatch = useDispatch()

  const [orderId, setOrderId] = useState('')

  const { order, loading, error } = useSelector((state) => state.searchOrder)

  const orderSearchHandler = () => {
    dispatch(searchOrderById(orderId))
  }

  return (
    <div className='container mx-auto text-center mt-[12px]'>
      <div>
        <h1 className='text-center pb-[10px]'>Kiểm tra đơn hàng của bạn</h1>
        <div>
          <input
            type='text'
            className='h-[40px] w-1/3 outline-none border border-solid border-[#ccc] text-[18px] leading-6 pl-[10px] rounded-tl-[5px] rounded-bl-[5px]'
            placeholder='Nhập mã đơn hàng'
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button
            type='button'
            className='h-[40px] w-[40px] bg-sky-500 border-none text-base font-bold rounded-tr rounded-br hover:bg-sky-700'
            onClick={orderSearchHandler}
          >
            {loading ? (
              loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />
            ) : (
              <FontAwesome icon='fas fa-search' color='#fff' />
            )}
          </button>
        </div>
      </div>
      {error ? (
        <div className='mt-[20px]'>
          <span className='bg-rose-600 text-white text-[18px] p-[10px] rounded italic'>
            Không tìm thấy đơn hàng, vui lòng kiểm tra lại
          </span>
        </div>
      ) : (
        <>
          {order && (
            <div className='flex justify-center'>
              <table className='table-auto text-start text-[16px] mt-[20px]'>
                <tbody>
                  <tr>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>Tên người đặt</td>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>
                      {order.shippingInformation?.fullName}
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>
                      Địa chỉ đặt hàng
                    </td>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>
                      {order.shippingInformation?.address}
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>Email đặt hàng</td>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>
                      {order.shippingInformation?.email}
                    </td>
                  </tr>
                  <tr>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>
                      Hình thức thanh toán
                    </td>
                    <td className='border border-slate-600 px-[10px] py-[15px]'>
                      {order.payment?.method}
                    </td>
                  </tr>
                  {order.payment.method !== 'COD' && (
                    <>
                      <tr>
                        <td className='border border-slate-600 px-[10px] py-[15px]'>Tình trạng</td>
                        <td className='border border-slate-600 px-[10px] py-[15px]'>
                          {order.payment?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </td>
                      </tr>
                      <tr>
                        <td className='border border-slate-600 px-[10px] py-[15px]'>
                          Mã thanh toán
                        </td>
                        <td className='border border-slate-600 px-[10px] py-[15px]'>
                          {order.payment?.paymentId}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OrderCheckingScreen
