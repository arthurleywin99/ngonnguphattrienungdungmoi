import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AdminAsideBar() {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.userSignin)

  return (
    <div className='my-[5px] bg-[#262629] mx-[10px] px-[10px] rounded-[10px]'>
      <div className='flex items-center mt-[10px] pl-[15px]'>
        <img
          className='w-[60px] rounded-[50%] mr-[10px]'
          src={userInfo.profilePicUrl}
          alt={userInfo.firstName}
        />
        <span className='text-white uppercase text-[18px]'>{userInfo.lastName}</span>
      </div>
      <div className='border border-t-[1px] border-[#ccc] mt-[10px]'></div>
      <div
        className='text-white text-[16px] py-[15px] pl-[10px] rounded hover:bg-[#4f4f52] hover:cursor-pointer mb-[5px]'
        onClick={() => {
          navigate('/admin/brands')
        }}
      >
        Quản lý loại sản phẩm
      </div>
      <div
        className='text-white text-[16px] py-[15px] pl-[10px] rounded hover:bg-[#4f4f52] hover:cursor-pointer mb-[5px]'
        onClick={() => {
          navigate('/admin/products')
        }}
      >
        Quản lý sản phẩm
      </div>
      <div
        className='text-white text-[16px] py-[15px] pl-[10px] rounded hover:bg-[#4f4f52] hover:cursor-pointer mb-[5px]'
        onClick={() => {
          navigate('/admin/orders')
        }}
      >
        Quản lý đơn hàng
      </div>
      <div
        className='text-white text-[16px] py-[15px] pl-[10px] rounded hover:bg-[#4f4f52] hover:cursor-pointer mb-[5px]'
        onClick={() => {
          navigate('/admin/accounts')
        }}
      >
        Quản lý tài khoản
      </div>
      <div className='border border-t-[1px] border-[#ccc] mt-[10px]'></div>
      <div
        className='text-white text-[16px] py-[15px] pl-[10px] rounded hover:bg-[#4f4f52] hover:cursor-pointer mb-[5px]'
        onClick={() => {
          navigate('/admin/web-configs')
        }}
      >
        Quản lý thông tin web
      </div>
      <div
        className='text-white text-[16px] py-[15px] pl-[10px] rounded hover:bg-[#4f4f52] hover:cursor-pointer mb-[5px]'
        onClick={() => {
          navigate('/admin/permissions')
        }}
      >
        Phân quyền
      </div>
    </div>
  )
}

export default AdminAsideBar
