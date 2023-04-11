import React, { useEffect, useRef, useState } from 'react'
import FontAwesome from '../utils/FontAwesome'

function Slider({ banner, data }) {
  const counterRef = useRef(0)

  const [images, setImages] = useState({
    left: data.filter((item) => item.name === 'Slider 1')[0].image,
    right: data.filter((item) => item.name === 'Slider 2')[0].image,
  })

  useEffect(() => {
    setInterval(() => {
      handleNext()
    }, 3000)
  }, [])

  const handlePrev = () => {
    if (counterRef.current === 0) {
      counterRef.current = 2
    } else {
      counterRef.current--
    }
    setImages({
      left: data.filter((item) => item.name === `Slider ${counterRef.current + 1}`)[0].image,
      right: data.filter((item) => item.name === `Slider ${counterRef.current + 2}`)[0].image,
    })
  }

  const handleNext = () => {
    if (counterRef.current === 2) {
      counterRef.current = 0
    } else {
      counterRef.current++
    }
    setImages({
      left: data.filter((item) => item.name === `Slider ${counterRef.current + 1}`)[0].image,
      right: data.filter((item) => item.name === `Slider ${counterRef.current + 2}`)[0].image,
    })
  }

  return (
    <div
      className='pb-[450px] relative'
      style={{
        background: `url(${banner})`,
      }}
    >
      <div className='w-full flex items-center justify-center absolute bottom-0 translate-y-1/2'>
        <div className='main__button-prev hover:cursor-pointer' onClick={handlePrev}>
          <FontAwesome icon='far fa-chevron-left hover:bg-sky-200' color='#000' />
        </div>
        <img
          className='w-[600px] h-[180px] rounded-[12px] mr-[5px]'
          src={images.left}
          alt='Slider 1'
        />
        <img
          className='w-[600px] h-[180px] rounded-[12px] ml-[5px]'
          src={images.right}
          alt='Slider 2'
        />
        <div className='main__button-next hover:cursor-pointer' onClick={handleNext}>
          <FontAwesome icon='far fa-chevron-right hover:bg-sky-200' color='#000' />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Slider)
