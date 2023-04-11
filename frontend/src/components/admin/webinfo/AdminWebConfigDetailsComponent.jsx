import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateTime } from '../../utils/utils.js'

function AdminWebConfigDetailsComponent() {
  const navigate = useNavigate()

  const [webInfoList, setWebInfoList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/webinfos`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWebInfoList(data)
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

  const webInfoCreateHandler = () => {}

  const webInfoChangeHandler = (id) => {
    navigate(`/admin/web-configs/update/${id}`)
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className='mr-[15px]'>
      <h1 className='uppercase text-[22px] font-bold mt-[5px]'>Quản lý thông tin web</h1>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-gray-500 text-white rounded hover:bg-gray-600 mr-[10px]'
        onClick={() => backHandler()}
      >
        Trở về
      </button>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-green-600 text-white rounded'
        onClick={() => webInfoCreateHandler()}
      >
        Tạo mới
      </button>
      <table className='table-auto w-full text-center border border-solid border-[#ccc] mt-[10px] rounded'>
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
          {webInfoList &&
            webInfoList.map((item, index) => {
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
                        onClick={() => webInfoChangeHandler(item._id)}
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

export default AdminWebConfigDetailsComponent
