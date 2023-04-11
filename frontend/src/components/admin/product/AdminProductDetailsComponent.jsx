import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminProductDetailReview from './AdminProductDetailReview'
import { calculateTime } from '../../utils/utils.js'

function AdminProductDetailsComponent() {
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showProductReview, setShowProductReview] = useState(false)
  const [id, setId] = useState(null)

  const getData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  const productCreateHandler = () => {
    navigate('/admin/products/create')
  }

  const productChangeHandler = (id) => {
    navigate(`/admin/products/update/${id}`)
  }

  const productReviewHandler = (id) => {
    setShowProductReview(true)
    setId(id)
  }

  const productLockHandler = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/lock/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getData()
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }

  const productUnlockHandler = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/unlock/${id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getData()
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      {showProductReview && (
        <AdminProductDetailReview
          id={id}
          token={userInfo.token}
          setShowProductReview={setShowProductReview}
        />
      )}
      <div className='mr-[15px]'>
        <h1 className='uppercase text-[22px] font-bold mt-[5px]'>Quản lý sản phẩm</h1>
        <button
          className='text-[18px] px-[10px] py-[5px] bg-green-600 text-white rounded'
          onClick={() => productCreateHandler()}
        >
          Tạo mới
        </button>
        <table className='table-auto w-full text-center border border-solid border-[#ccc] mt-[10px] rounded'>
          <thead className='border-bottom-[#ccc]'>
            <tr className='bg-blue-500 text-white'>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>ID</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Tên</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Loại</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Hãng</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Ảnh</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Giá</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Giảm giá</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Số lượng tồn</th>
              <th className='w-[10%] p-[10px] text-[18px] uppercase'>Ngày cập nhật</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={`border border-solid border-[#ccc] ${
                      index % 2 !== 0 && 'bg-[#ccc]'
                    }`}
                  >
                    <td className='text-[16px] p-[10px]'>{item._id.slice(0, 10) + '...'}</td>
                    <td className='text-[16px] p-[10px]'>{item.name.slice(0, 20) + '...'}</td>
                    <td className='text-[16px] p-[10px]'>{item.category}</td>
                    <td className='text-[16px] p-[10px]'>{item.brand.name}</td>
                    <td className='flex justify-center items-center p-[10px]'>
                      <img className='w-[80px]' src={item.images[0]} alt={item.name} />
                    </td>
                    <td className='text-[16px] p-[10px]'>
                      {item.price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td className='text-[16px] p-[10px]'>{item.discount}%</td>
                    <td className='text-[16px] p-[10px]'>{item.countInStock}</td>
                    <td className='text-[16px] p-[10px]'>{calculateTime(item.updatedAt)}</td>
                    <td>
                      <div className='flex'>
                        <button
                          className='px-[10px] py-[5px] text-[16px] uppercase'
                          type='button'
                          onClick={() => productReviewHandler(item._id)}
                        >
                          <i className='far fa-eye text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                        </button>
                        <button
                          className='px-[10px] py-[5px] text-[16px] uppercase'
                          type='button'
                          onClick={() => productChangeHandler(item._id)}
                        >
                          <i className='fal fa-edit text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                        </button>
                        {item.status ? (
                          <button
                            className='px-[10px] py-[5px] text-[16px] uppercase'
                            type='button'
                            onClick={() => productLockHandler(item._id)}
                          >
                            <i className='far fa-lock-open text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                          </button>
                        ) : (
                          <button
                            className='px-[10px] py-[5px] text-[16px] uppercase'
                            type='button'
                            onClick={() => productUnlockHandler(item._id)}
                          >
                            <i className='far fa-lock text-[25px] text-blue-500 px-[10px] py-[5px]'></i>
                          </button>
                        )}
                      </div>
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

export default AdminProductDetailsComponent
