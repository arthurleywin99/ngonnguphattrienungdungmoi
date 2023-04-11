import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome from '../utils/FontAwesome'
import { signout } from '../../actions/userActions'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { userInfo } = useSelector((state) => state.userSignin)
  const { cartItems } = useSelector((state) => state.cart)

  const [isFocus, setIsFocus] = useState(false)
  const [content, setContent] = useState('')

  const signOutHandler = () => {
    dispatch(signout())
    navigate('/signin', { replace: true })
  }

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      setContent('')
    }
  }, [location.pathname])

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${content}/order/discount`)
  }

  const inputChangeHandler = (value) => {
    setContent(value)
  }

  return (
    <header>
      <div className='h-[60px] bg-[#131921] flex items-center justify-center'>
        <Link
          className='text-[35px] border-2 border-solid border-[#f08804] rounded hover:cursor-pointer'
          to={!location.pathname.includes('admin') ? '/' : '/admin/products'}
        >
          <strong>amazon</strong>
        </Link>

        <form
          className={`mx-[10px] w-[70vw] text-center ${
            location.pathname.includes('admin') && 'invisible'
          }`}
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            className='h-[40px] w-[69%] border-none p-[15px] rounded-tl rounded-bl text-base text-black focus:outline-none'
            style={{
              border: isFocus ? '2px solid var(--color-third)' : 'none',
            }}
            placeholder='Bạn tìm gì...'
            onFocus={() => {
              setIsFocus(true)
            }}
            onBlur={() => {
              setIsFocus(false)
            }}
            value={content}
            name='content'
            onChange={(e) => inputChangeHandler(e.target.value)}
          />
          <button
            className='h-[40px] w-[40px] bg-[#f3a847] border-none text-base font-bold rounded-tr rounded-br'
            title='Submit'
            type='submit'
          >
            <FontAwesome icon='far fa-search' />
          </button>
        </form>
        <div className='flex items-center justify-between'>
          <Link
            className='text-[12px] w-auto mx-[10px]'
            to={userInfo ? '/my-account?option=account' : '/signin'}
          >
            <span>
              {userInfo ? `Xin chào, ${userInfo.firstName}` : 'Đăng nhập'} <br />{' '}
              <strong className='text-[14px]'>Tài khoản</strong>
            </span>
          </Link>
          {!location.pathname.includes('admin') && (
            <>
              <Link className='text-[12px] w-auto mx-[10px]' to='/order-checking'>
                <span>
                  Lợi nhuận <br /> <strong className='text-[14px]'> & Đơn hàng</strong>
                </span>
              </Link>
              <Link className='text-[22px] relative w-auto m-[10px]' to='/cart'>
                <span className='absolute text-[16px] text-[#f08804] font-bold top-[-12px] left-[10px]'>
                  {cartItems && cartItems.length > 0
                    ? cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)
                    : 0}
                </span>
                <FontAwesome icon='fab fa-opencart' color='#fff' />
                <span className='text-[14px] font-bold'>Giỏ hàng</span>
              </Link>
            </>
          )}

          {userInfo && (
            <button className='text-[24px] py-[5px] px-[10px]' onClick={signOutHandler}>
              <FontAwesome icon='far fa-sign-out-alt' />
            </button>
          )}
        </div>
      </div>
      {!location.pathname.includes('admin') ? (
        <div className='bg-[#232f3e]'>
          <div className='container m-auto'>
            <ul className='flex items-center justify-between'>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/cell-phones/order/discount'>
                  <FontAwesome icon='far fa-mobile' color='#fff' />
                  &ensp;
                  <span>Điện thoại</span>
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/laptops/order/discount'>
                  <FontAwesome icon='far fa-laptop' color='#fff' />
                  &ensp;
                  <span>Laptop</span>
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/tablets/order/discount'>
                  <FontAwesome icon='far fa-tablet' color='#fff' />
                  &ensp;
                  <span>Tablet</span>
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/accessories/order/discount'>
                  <FontAwesome icon='far fa-headphones' color='#fff' />
                  &ensp;
                  <span>Phụ kiện</span>&ensp;
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/smart-watches/order/discount'>
                  <FontAwesome icon='far fa-watch-fitness' color='#fff' />
                  &ensp;
                  <span>Smartwatch</span>
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/watches/order/discount'>
                  <FontAwesome icon='far fa-watch' color='#fff' />
                  &ensp;
                  <span>Đồng hồ</span>
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/used-phones/order/discount'>
                  <FontAwesome icon='far fa-mobile-android' color='#fff' />
                  &ensp;
                  <span>Máy cũ giá rẻ</span>
                </Link>
              </li>
              <li className='leading-10 text-[17px]'>
                <Link to='/category/pc-printers/order/discount'>
                  <FontAwesome icon='far fa-desktop' color='#fff' />
                  &ensp;
                  <span>PC, Máy in</span>&ensp;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className='bg-[#131921] h-[40px]'></div>
      )}
    </header>
  )
}

export default Header
