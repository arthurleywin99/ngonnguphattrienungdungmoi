import React from 'react'

function MiddleBanner({ image }) {
  return (
    <div className='container m-auto'>
      <img
        className='cursor-pointer mb-[25px]'
        src={image}
        alt='Medium Banner'
      />
    </div>
  )
}

export default MiddleBanner
