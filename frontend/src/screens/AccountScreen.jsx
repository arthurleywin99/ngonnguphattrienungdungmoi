import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AccountInfoComponent from '../components/account/info/AccountInfoComponent'
import OrderInfoComponent from '../components/account/order/OrderInfoComponent'
import NotFound from '../components/shared/NotFound'

function AccountScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const optionQuery = searchParams.get('option')

  return (
    <div className='grid grid-cols-[200px_1fr] gap-4 mx-auto container mt-[10px]'>
      <div>
        <div>
          <div
            className={`border-l-[1px] border-solid border-[#ccc] p-[10px] py-5px text-[18px] ${
              optionQuery === 'account'
                ? 'hover:cursor-pointer text-cyan-500 font-bold border-l-[2px] border-cyan-500'
                : 'hover:cursor-pointer hover:border-l-[2px] hover:border-[#000] hover:font-bold'
            }`}
            onClick={() => {
              navigate('/my-account?option=account&status=all')
            }}
          >
            Tài khoản
          </div>
          <div
            className={`border-l-[1px] border-solid border-[#ccc] p-[10px] py-5px text-[18px] ${
              optionQuery === 'order'
                ? 'hover:cursor-pointer text-cyan-500 font-bold border-l-[2px] border-cyan-500'
                : 'hover:cursor-pointer hover:border-l-[2px] hover:border-[#000] hover:font-bold'
            }`}
            onClick={() => {
              navigate('/my-account?option=order&status=all')
            }}
          >
            Đơn hàng
          </div>
        </div>
      </div>
      {optionQuery === 'account' ? (
        <AccountInfoComponent />
      ) : optionQuery === 'order' ? (
        <OrderInfoComponent />
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default AccountScreen
