import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FontAwesome from '../utils/FontAwesome'

function Card({ product }) {
  const navigate = useNavigate()
  const [handleHover, setHandleHover] = useState(false)

  return (
    <div
      onMouseEnter={() => {
        setHandleHover(true)
      }}
      onMouseLeave={() => {
        setHandleHover(false)
      }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div
        className='relative mb-[10px] z-0'
        style={{
          transform: `translateY(${handleHover ? '-4%' : '0'})`,
          transition: 'all .7s',
        }}
      >
        <img className='w-[207px] h-[207px]' src={product.images[0]} alt={product.name} />
        {product.isMonolopy && (
          <img
            className='w-[40px] h-[40px] absolute bottom-[-6px] left-[5px]'
            src='/images/Label_01-05.png'
            alt='Monopoly'
          />
        )}
      </div>
      <div className='card__content'>
        <p
          className='text-[18px] text-start mb-[8px] break-keep text-black font-bold'
          style={{ wordWrap: 'break-word' }}
        >
          {product.name}
        </p>
        <p className='text-start'>
          <span className='text-start mb-[8px] text-[#d0021c] font-bold inline-block text-[20px]'>
            {(product.price + (product.price * product.discount) / 100).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
          <span className='text-[#eb5757] bg-[#fff0e9] rounded pt-px px-0.5 pb-0.5 ml-[7px] text-[14px]'>
            {product.discount}%
          </span>
        </p>
        <p className='text-start text-base line-through decoration-black font-bold'>
          <span className='text-black'>
            {product.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </span>
        </p>
        <p>
          <span className='text-[#fb6e2e] font-bold text-[14px]'>
            {product.rating.average}&nbsp;&nbsp;
            <FontAwesome icon='fas fa-star' />
          </span>
          <span className='text-[#999] text-[14px]'>({product.rating.quantity})</span>
        </p>
        <p className='mb-[8px] text-start text-[#666] text-[14px]'>{product.description}</p>
      </div>
    </div>
  )
}

export default Card
