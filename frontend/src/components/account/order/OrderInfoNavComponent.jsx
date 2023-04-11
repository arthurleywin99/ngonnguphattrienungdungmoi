import React from 'react'
import { useNavigate } from 'react-router-dom'

function OrderInfoNavComponent({ option }) {
  const navigate = useNavigate()

  return (
    <div className='flex justify-around text-[18px] border-b border-solid border-[#ddd] rounded'>
      <div
        className={`hover:font-bold hover:border-b-[2px] hover:border-[#000] hover:cursor-pointer ${
          option === 'all' && 'text-orange-500 font-bold border-orange-500 border-b-[2px]'
        }`}
        onClick={() => navigate('/my-account?option=order&status=all')}
      >
        Tất cả
      </div>
      <div
        className={`hover:font-bold hover:border-b-[2px] hover:border-[#000] hover:cursor-pointer ${
          option === 'pending' && 'text-orange-500 font-bold border-orange-500 border-b-[2px]'
        }`}
        onClick={() => navigate('/my-account?option=order&status=pending')}
      >
        Đang xử lý
      </div>
      <div
        className={`hover:font-bold hover:border-b-[2px] hover:border-[#000] hover:cursor-pointer ${
          option === 'delivered' && 'text-orange-500 font-bold border-orange-500 border-b-[2px]'
        }`}
        onClick={() => navigate('/my-account?option=order&status=delivered')}
      >
        Hoàn thành
      </div>
      <div
        className={`hover:font-bold hover:border-b-[2px] hover:border-[#000] hover:cursor-pointer ${
          option === 'canceled' && 'text-orange-500 font-bold border-orange-500 border-b-[2px]'
        }`}
        onClick={() => navigate('/my-account?option=order&status=canceled')}
      >
        Đã huỷ
      </div>
    </div>
  )
}

export default OrderInfoNavComponent
