import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminBrandCreateComponent() {
  const navigate = useNavigate()

  return (
    <div>
      <h2>Thêm mới</h2>
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

export default AdminBrandCreateComponent
