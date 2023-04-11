import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function RatingScreen() {
  const navigate = useNavigate()

  const { order, product } = useParams()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [orderObj, setOrderObj] = useState(null)
  const [error, setError] = useState(null)

  const [number, setNumber] = useState(0)
  const [hoverStar, setHoverStar] = useState(undefined)
  const [comment, setComment] = useState('')

  const handleText = () => {
    switch (number || hoverStar) {
      case 1:
        return 'Tệ'
      case 2:
        return 'Không hài lòng'
      case 3:
        return 'Bình thường'
      case 4:
        return 'Hài lòng'
      case 5:
        return 'Tuyệt vời'
      default:
        return 'Chưa đánh giá'
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/get/${order}/${product}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderObj(data.message)
      })
      .catch((err) => setError(err.message))
  }, [order, product, userInfo.token])

  const sendRatingHandler = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/rating/create`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
      body: JSON.stringify({
        orderId: order,
        productId: product,
        ratingNumber: number,
        comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate(-1)
        }
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div className='container mx-auto mt-[10px]'>
      {orderObj && (
        <div className='border border-solid border-[#ccc] rounded px-[10px] py-[15px] mt-[10px] grid grid-cols-[150px_1fr_150px]'>
          <img className='w-[120px]' src={orderObj.product.images[0]} alt={orderObj.product.name} />
          <div>
            <div className='text-[18px] font-bold'>{orderObj.product.name}</div>
            <div className='text-[18px]'>Mã đơn hàng: {orderObj._id}</div>
            <div className='text-[16px]'>Số lượng: {orderObj.product.qty}</div>
            <div className='text-[16px]'>
              Giá tiền:{' '}
              {orderObj.product.price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
          <div className='text-[20px] font-bold text-rose-500'>
            {(orderObj.product.qty * orderObj.product.price).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </div>
        </div>
      )}
      <h3 className='text-center mt-[15px] text-[22px]'>Đánh giá sản phẩm</h3>
      <span>{error}</span>
      <div className='text-center mt-[10px]'>
        {Array(5)
          .fill()
          .map((_, index) =>
            number >= index + 1 || hoverStar >= index + 1 ? (
              <i
                key={index}
                className='fas fa-star text-[40px]'
                style={{ color: '#ffb91d' }}
                onMouseOver={() => !number && setHoverStar(index + 1)}
                onMouseLeave={() => setHoverStar(undefined)}
                onClick={() => setNumber(index + 1)}
              />
            ) : (
              <i
                key={index}
                className='fal fa-star text-[40px]'
                style={{ color: '#ffb91d' }}
                onMouseOver={() => !number && setHoverStar(index + 1)}
                onMouseLeave={() => setHoverStar(undefined)}
                onClick={() => setNumber(index + 1)}
              />
            )
          )}
        <div className='text-[22px]'>{handleText()}</div>
        <div>
          <textarea
            cols={45}
            rows={5}
            className='resize-none border border-solid border-[#ccc] rounded outline-none text-[18px] p-[10px]'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button
          type='button'
          className='px-[10px] py-[5px] bg-cyan-500 text-white rounded uppercase text-[18px]'
          onClick={() => sendRatingHandler()}
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  )
}

export default RatingScreen
