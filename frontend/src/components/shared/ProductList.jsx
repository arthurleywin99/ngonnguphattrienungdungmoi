import React, { useRef, useState } from 'react'
import Card from './Card'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProductList() {
  const { order } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { products, loading, error } = useSelector((state) =>
    location.pathname.includes('search') ? state.searchProduct : state.getProductByCategory
  )

  const [productList, setProductList] = useState(products.slice(0, 15))
  const pageNumberRef = useRef(1)

  const handleChange = (e) => {
    navigate(`/${location.pathname.split('/').splice(1, 3).join('/')}/${e.target.value}`)
    if (e.target.value === 'discount') {
      setProductList(
        products
          .sort((a, b) => (a.discount > b.discount ? 1 : -1))
          .slice(0, pageNumberRef.current * 15)
      )
    } else if (e.target.value === 'decrease') {
      setProductList(
        products.sort((a, b) => (a.price < b.price ? 1 : -1)).slice(0, pageNumberRef.current * 15)
      )
    } else {
      setProductList(
        products.sort((a, b) => (a.price > b.price ? 1 : -1)).slice(0, pageNumberRef.current * 15)
      )
    }
  }

  const handleSeemore = () => {
    pageNumberRef.current++
    setProductList(
      products.slice(
        0,
        pageNumberRef.current * 15 < products.length ? pageNumberRef.current * 15 : products.length
      )
    )
  }

  return loading && <div>Loading</div> ? (
    error && <div>Error</div>
  ) : (
    <div className='container m-auto'>
      <div className='flex justify-between'>
        <h4 className='text-[24px] font-bold'>{products.length || 0} Kết quả</h4>
        <select
          className='border border-solid border-[#e0e0e0] rounded text-[12px] leading-3 py-[6px] pr-[10px] pl-[8px]'
          value={order}
          onChange={handleChange}
        >
          <option value='discount'>% Giảm</option>
          <option value='decrease'>Giá cao đến thấp</option>
          <option value='increase'>Giá thấp đến cao</option>
        </select>
      </div>
      <div className='grid auto-rows-[minmax(min-content, max-content)] grid-cols-5 mt-[10px]'>
        {productList &&
          productList.map((product, index) => (
            <Link
              to={`/product/${product._id}`}
              key={index}
              className='pt-[10px] px-[15px] pb-[20px] border border-solid border-[rgb(243, 243, 243)]'
            >
              <Card product={product} />
            </Link>
          ))}
      </div>
      {pageNumberRef.current * 15 <= products.length && (
        <button
          className='flex my-[20px] mx-auto py-[15px] px-[50px] rounded border border-solid border-[rrgb(243, 243, 243)] text-[14px] font-bold hover:bg-[#2f80ed] hover:text-white'
          type='button'
          onClick={handleSeemore}
        >
          Xem thêm
        </button>
      )}
    </div>
  )
}

export default ProductList
