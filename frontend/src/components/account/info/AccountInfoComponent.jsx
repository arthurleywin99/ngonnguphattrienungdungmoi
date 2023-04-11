import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UpdatePasswordModalComponent from './UpdatePasswordModalComponent'
import UpdateUserModalComponent from './UpdateUserModalComponent'

function AccountInfoComponent() {
  const [user, setUser] = useState(null)

  const { userInfo } = useSelector((state) => state.userSignin)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userInfo.token,
      }),
    })
      .then((data) => data.json())
      .then((response) => {
        setUser(response)
      })
  }, [userInfo])

  const [displayUpdateUserModal, setDisplayUpdateUserModal] = useState(false)
  const [displayUpdatePassModal, setDisplayUpdatePassModal] = useState(false)

  const imageOnError = (e) => {
    e.currentTarget.src =
      'https://res.cloudinary.com/gb-hutech/image/upload/v1679813620/149071_ojopyr.png'
  }

  return (
    <>
      {user && (
        <>
          {displayUpdateUserModal && (
            <UpdateUserModalComponent setShowForm={setDisplayUpdateUserModal} user={user} />
          )}
          {displayUpdatePassModal && <UpdatePasswordModalComponent user={user} />}
          <div>
            <h1>Thông tin tài khoản</h1>
            <div className='grid grid-cols-[300px_1fr] gap-4'>
              <div>
                <img
                  src={user.profilePicUrl || ''}
                  alt={user.firstName}
                  onError={(e) => imageOnError(e)}
                />
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Họ tên</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>
                        {user.firstName + ' ' + user.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Giới tính</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>
                        {user.gender === 'Male' ? 'Nam' : 'Nữ'}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Email</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>{user.email}</td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Số điện thoại</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>{user.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Sinh nhật</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>
                        {user.bDay + '/' + user.bMonth + '/' + user.bYear}
                      </td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Địa chỉ</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>{user.address}</td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>
                        Số đơn hàng đã thanh toán
                      </td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>0</td>
                    </tr>
                    <tr>
                      <td className='text-[18px] px-[10px] py-[10px] font-bold'>Số tiền đã mua</td>
                      <td className='text-[18px] px-[10px] py-[10px] italic'>0</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className='rounded border border-solid border-[#ccc] ml-[10px] px-[15px] py-[5px] bg-cyan-600 text-[18px] text-white hover:bg-cyan-500'
                  type='button'
                  onClick={() => setDisplayUpdateUserModal(true)}
                >
                  Cập nhật thông tin
                </button>
                <button
                  className='rounded border border-solid border-[#ccc] ml-[10px] px-[15px] py-[5px] bg-rose-600 text-[18px] text-white hover:bg-rose-500'
                  type='button'
                  onClick={() => setDisplayUpdatePassModal(true)}
                >
                  Đổi mật khẩu
                </button>
              </div>
            </div>
            {user.seller && (
              <>
                <h1>Thông tin cửa hàng</h1>
                <div className='grid grid-cols-[300px_1fr]'>
                  <div>
                    <img src={user.profilePicUrl} alt={user.firstName} />
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>Tên cửa hàng</td>
                        <td>{user.seller?.name}</td>
                      </tr>
                      <tr>
                        <td>Mô tả</td>
                        <td>{user.seller?.description}</td>
                      </tr>
                      <tr>
                        <td>Số sao đánh giá trung bình</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Số người đánh giá</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default AccountInfoComponent
