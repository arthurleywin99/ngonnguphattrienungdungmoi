import React, { useState } from 'react'
import FontAwesome from '../components/utils/FontAwesome'

function ActivatedScreen() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState(
    'Tài khoản của bạn chưa được kích hoạt. Vui lòng nhập lại email mà bạn đã đăng ký để nhận email kích hoạt'
  )

  const activatedAccount = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/re-activate`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ email }),
    })
      .then((data) => data.json())
      .then((res) => {
        setError(null)
        setMsg('Đã gửi một email kích hoạt đến tài khoản của bạn. Vui lòng kiểm tra hộp thư')
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }

  return (
    <div className='mx-auto container text-center mt-[18px]'>
      <div>
        <h1 className='text-center pb-[10px]'>
          <span className='bg-rose-500 text-white'>{error ? <>{error}</> : <>{msg}</>}</span>
        </h1>
        <div>
          <input
            type='text'
            className='h-[40px] w-1/3 outline-none border border-solid border-[#ccc] text-[18px] leading-6 pl-[10px] rounded-tl-[5px] rounded-bl-[5px]'
            placeholder='Nhập email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type='button'
            className='h-[40px] w-[40px] bg-sky-500 border-none text-base font-bold rounded-tr rounded-br hover:bg-sky-700'
            onClick={activatedAccount}
          >
            {loading ? (
              loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />
            ) : (
              <FontAwesome icon='fal fa-paper-plane' color='#fff' />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActivatedScreen
