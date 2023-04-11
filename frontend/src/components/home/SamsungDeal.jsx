import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../shared/Card'
import FontAwesome from '../utils/FontAwesome'

function SamsungDeal() {
  const { products, loading, error } = useSelector(
    (state) => state.getSamsungTopDiscount
  )

  const counterRef = useRef(0)

  const [productList, setProductList] = useState(products.slice(0, 5))

  useEffect(() => {
    setInterval(() => {
      handleNext()
    }, 3000)
  }, [])

  const handlePrev = () => {
    if (counterRef.current - 5 < 0) {
      counterRef.current = 5
    } else {
      counterRef.current -= 5
    }
    setProductList(products.slice(counterRef.current, counterRef.current + 5))
  }

  const handleNext = () => {
    if (counterRef.current + 5 >= products.length) {
      counterRef.current = 0
    } else {
      counterRef.current += 5
    }
    setProductList(products.slice(counterRef.current, counterRef.current + 5))
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className='container m-auto mb-[30px] px-[10px] pt-[10px] pb-[20px] bg-[#2579d7] rounded-[14px] mb-[30px]'>
      <h1 className='text-[50px] leading-[90px] text-white uppercase text-center'>
        Tuần lễ Samsung
      </h1>
      <div className='samsung__list-product-deal'>
        {products.length > 5 && (
          <div className='main__list-product-button-prev' onClick={handlePrev}>
            <FontAwesome icon='far fa-chevron-left' />
          </div>
        )}
        <ul className='grid grid-cols-5'>
          {productList.map((product, index) => (
            <li
              key={index}
              className='bg-white px-[10px] pt-[10px] pb-[20px] rounded m-[5px]'
            >
              <Card product={product} />
            </li>
          ))}
        </ul>
        {products.length > 5 && (
          <div className='main__list-product-button-next' onClick={handleNext}>
            <FontAwesome icon='far fa-chevron-right' />
          </div>
        )}
      </div>
    </div>
  )
}

export default SamsungDeal
