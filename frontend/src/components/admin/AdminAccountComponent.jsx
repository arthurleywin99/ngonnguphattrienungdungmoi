import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { calculateTime } from '../utils/utils.js'

function AdminAccountComponent() {
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getall`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err))
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  const backHandler = () => {
    navigate(-1)
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className='mr-[15px]'>
      <h1 className='uppercase text-[22px] font-bold mt-[5px]'>Quản lý tài khoản</h1>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-green-600 text-white rounded'
        onClick={() => backHandler()}
      >
        Trở về
      </button>
      <table class='table-auto w-full text-center border border-solid border-[#ccc] mt-[10px] rounded'>
        <thead className='border-bottom-[#ccc]'>
          <tr className='bg-blue-500 text-white'>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>ID</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Họ Tên</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Email</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Số điện thoại</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Sinh nhật</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Giới tính</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Xác thực</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Ảnh</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Ngày cập nhật</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts &&
            accounts.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`border border-solid border-[#ccc] ${index % 2 !== 0 && 'bg-[#ccc]'}`}
                >
                  <td className='text-[18px] p-[10px]'>{item?._id}</td>
                  <td className='text-[18px] p-[10px]'>{item?.firstName + ' ' + item?.lastName}</td>
                  <td className='text-[18px] p-[10px]'>{item?.email}</td>
                  <td className='text-[18px] p-[10px]'>{item?.phoneNumber}</td>
                  <td className='text-[18px] p-[10px]'>
                    {item?.bDay + '/' + item?.bMonth + '/' + item?.bYear}
                  </td>
                  <td className='text-[18px] p-[10px]'>
                    {item?.gender === 'Male' ? 'Nam' : item?.gender === 'Female' ? 'Nữ' : 'Khác'}
                  </td>
                  <td className='text-[18px] p-[10px]'>
                    {item?.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                  </td>
                  <td className='flex justify-center items-center p-[10px]'>
                    <img className='w-[80px]' src={item?.profilePicUrl} alt={item?.lastName} />
                  </td>
                  <td className='text-[18px] p-[10px]'>{calculateTime(item.updatedAt)}</td>
                  <td>
                    <div>
                      {/* <button type='button'>
                        <i className='far fa-lock-open text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                      </button> */}
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminAccountComponent
