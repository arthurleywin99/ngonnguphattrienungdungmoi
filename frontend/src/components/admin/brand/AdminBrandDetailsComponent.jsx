import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { calculateTime } from '../../utils/utils.js'

function AdminBrandDetailsComponent() {
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/brands`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  const brandCreateHandler = () => {
    navigate('/admin/brands/create')
  }

  const brandChangeHandler = (id) => {
    navigate(`/admin/brands/update/${id}`)
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className='mr-[15px]'>
      <h1 className='uppercase text-[22px] font-bold mt-[5px]'>Quản lý thương hiệu</h1>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-green-600 text-white rounded'
        onClick={() => brandCreateHandler()}
      >
        Tạo mới
      </button>
      <table class='table-auto w-full text-center border border-solid border-[#ccc] mt-[10px] rounded'>
        <thead className='border-bottom-[#ccc]'>
          <tr className='bg-blue-500 text-white'>
            <th className='w-[25%] p-[10px] text-[20px] uppercase'>ID</th>
            <th className='w-[25%] p-[10px] text-[20px] uppercase'>Tên</th>
            <th className='w-[25%] p-[10px] text-[20px] uppercase'>Ảnh</th>
            <th className='w-[25%] p-[10px] text-[20px] uppercase'>Ngày cập nhật</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {brands &&
            brands.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`border border-solid border-[#ccc] ${index % 2 !== 0 && 'bg-[#ccc]'}`}
                >
                  <td className='text-[18px] p-[10px]'>{item._id}</td>
                  <td className='text-[18px] p-[10px]'>{item.name}</td>
                  <td className='flex justify-center items-center p-[10px]'>
                    <img className='w-[80px]' src={item.image} alt={item.name} />
                  </td>
                  <td className='text-[18px] p-[10px]'>{calculateTime(item.updatedAt)}</td>
                  <td>
                    <div className='flex'>
                      <button
                        className='px-[10px] py-[5px] text-[16px] uppercase'
                        type='button'
                        onClick={() => brandChangeHandler(item._id)}
                      >
                        <i className='fal fa-edit text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                      </button>
                      {/* <button className='px-[10px] py-[5px] text-[16px] uppercase' type='button'>
                        Khoá
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

export default AdminBrandDetailsComponent
