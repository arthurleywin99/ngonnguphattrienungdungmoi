import React, { useEffect, useState } from 'react'
import FontAwesome from '../../utils/FontAwesome'

const ExitButton = React.memo(() => {
  return <FontAwesome icon='fas fa-times' color='#777' />
})

function AdminProductDetailReview({ id, token, setShowProductReview }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  const handleHideForm = () => {
    setShowProductReview(false)
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className='fixed bg-gray-400 color-blur inset-0 z-50'>
      <div className='relative top-[50%] left-[50%] w-[800px] translate-x-[-50%] translate-y-[-50%] bg-rose-50 p-[40px] rounded-[10px]'>
        <div
          className='absolute right-[5px] top-[5px] text-2xl hover:cursor-pointer hover:opacity-70'
          onClick={handleHideForm}
        >
          <ExitButton />
        </div>
        <h1 className='text-center text-[28px] font-bold mb-[25px] uppercase'>Chi tiết sản phẩm</h1>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Ảnh</div>
          <div className='flex'>
            {product?.images &&
              product.images.map((item, index) => (
                <img key={index} className='w-[100px] mr-[10px]' src={item} alt={product?.name} />
              ))}
          </div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Tên sản phẩm</div>
          <div className='text-[20px]'>{product?.name}</div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Phân loại</div>
          <div className='text-[20px]'>{product?.category}</div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Thương hiệu</div>
          <div className='text-[20px]'>{product?.brand.name}</div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Giá bán</div>
          <div className='text-[20px]'>
            {product?.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Giảm giá</div>
          <div className='text-[20px]'>{product?.discount}%</div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Số lượng tồn</div>
          <div className='text-[20px]'>{product?.countInStock}</div>
        </div>
        <div className='grid grid-cols-[250px_1fr] mb-[5px]'>
          <div className='text-[20px] font-bold'>Mô tả</div>
          <div className='text-[20px]'>{product?.description}</div>
        </div>
        <div className='text-[20px] font-bold'>Cấu hình</div>
        {product?.settings.length > 0 &&
          product?.settings.map((item, index) => {
            return (
              <div
                key={index}
                className={`grid grid-cols-[250px_1fr] px-[10px] py-[5px] rounded ${
                  index % 2 === 0 ? 'bg-neutral-300' : ''
                }`}
              >
                <div className='text-[16px]'>{item.key}</div>
                <div className='text-[16px]'>{item.value}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default AdminProductDetailReview
