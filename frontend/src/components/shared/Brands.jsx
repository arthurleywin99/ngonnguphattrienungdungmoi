import React from 'react'
import { Link } from 'react-router-dom'

function Brands({ brands }) {
  return (
    <div className='container mx-auto mt-[8px]'>
      <div className='flex items-center	flex-wrap'>
        {brands.map((brand, index) => (
          <Link
            key={index}
            className='rounded-[52px] border border-solid border-[#e0e0e0] py-[6px] px-[13px] mt-0 mr-[10px] mb-[10px] ml-0 hover:border hover:border-solid hover:border-[#2f80ed]'
            to='/'
          >
            <img
              key={index}
              className='h-[20px] align-middle'
              src={brand.image}
              alt={brand.name}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Brands
