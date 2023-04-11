import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

function ProductScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { product, loading, error } = useSelector(
    (state) => state.getProductById
  )

  useEffect(() => {
    dispatch(getProductById(id))
  }, [dispatch])

  const [qty, setQty] = useState(1)

  const changeQtyHandler = (e) => {
    if (e.target.value < 1) {
      setQty(1)
    } else {
      setQty(e.target.value)
    }
  }

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
  }

  const addAndGoToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    navigate('/cart')
  }

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    product && (
      <div className='container m-auto mt-[15px]'>
        <div className='grid grid-cols-[300px_minmax(0,_1fr)_minmax(0,_1fr)]'>
          <img src={product.images[0]} alt={product.name} />
          <div className='mx-[10px]'>
            <h1 className='text-[28px] font-bold'>{product.name}</h1>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Loại:</span>{' '}
              <span className='text-[18px]'>{product.category}</span>
            </div>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Hãng:</span>{' '}
              <span className='text-[18px]'>{product.brand.name}</span>
            </div>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Tình trạng:</span>{' '}
              <span
                className={`text-[18px] ${
                  product.countInStock > 0
                    ? 'text-green-600 font-bold'
                    : 'text-red-600 font-bold'
                }`}
              >
                {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Giá niêm yết:</span>{' '}
              <span className='text-[18px] font-bold text-amber-800 line-through'>
                {product.price.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            </div>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Giá bán:</span>
              <span className='text-[18px] font-bold text-orange-500'>
                {(
                  product.price +
                  (product.price * product.discount) / 100
                ).toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </span>
            </div>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Số lượng tồn:</span>{' '}
              <span className='text-[18px]'>{product.countInStock}</span>
            </div>
            <div className='grid grid-cols-2 my-[10px]'>
              <span className='text-[18px] font-bold'>Số lượng mua:</span>{' '}
              <span className='text-[18px]'>
                <input
                  type='number'
                  className='border border-neutral-500 rounded w-1/3'
                  value={qty}
                  onChange={changeQtyHandler}
                />
              </span>
            </div>
            <div className='grid grid-cols-2'>
              <button
                className='px-[15px] py-[13px] text-[16px] bg-orange-500 rounded-md mr-[10px] text-white font-bold'
                onClick={addAndGoToCartHandler}
              >
                Mua ngay
              </button>
              <button
                className='px-[15px] py-[13px] text-[16px] bg-sky-500 rounded-md mr-[10px] text-white font-bold'
                onClick={addToCartHandler}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
          <div className='product_right'>
            <h3 className='uppercase font-bold'>Thông số kỹ thuật</h3>
            {product.settings.length > 0 &&
              product.settings.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-2 px-[10px] py-[5px] rounded ${
                      index % 2 === 0 ? 'bg-neutral-200' : ''
                    }`}
                  >
                    <div className='text-[16px]'>{item.key}</div>
                    <div className='text-[16px]'>{item.value}</div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className='mt-[10px]'>
          <h1 className='font-bold'>Thông tin sản phẩm</h1>
          <p className='text-[16px]'>{product.description}</p>
        </div>
      </div>
    )
  )
}

export default ProductScreen
