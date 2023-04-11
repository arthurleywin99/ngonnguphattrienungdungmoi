import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function AdminBrandUpdateComponent() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/brands/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBrand(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div>
      <h2>Cập nhật</h2>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-cyan-600 text-white rounded'
        onClick={() => navigate(-1)}
      >
        Trở về
      </button>
      <div className='flex justify-center'>
        <form className='w-[400px]'>
          <div className='flex items-center justify-between'>
            <label htmlFor='id'>ID</label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              value={brand?._id}
              id='id'
              disabled
              placeholder=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <label htmlFor='id'>Tên</label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              value={brand?.name}
              placeholder=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <label htmlFor='id'>Ảnh</label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              placeholder=''
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminBrandUpdateComponent
