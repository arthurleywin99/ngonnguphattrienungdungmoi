import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userLoginSchema } from '../utils/Schema'
import Message from '../bootstrap/Message'
import { USER_REGISTER_RESET } from '../../constants/userConstants'
import { signin } from '../../actions/userActions'
import FontAwesome from '../utils/FontAwesome'

function SigninForm({ setShowForm }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const firstTouchedRef = useRef(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  })

  const { userRegister } = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = useSelector((state) => state.userSignin)

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleFocus = () => {
    if (firstTouchedRef.current && userRegister) {
      dispatch({ type: USER_REGISTER_RESET })
    }
  }

  const onSubmit = (values) => {
    dispatch(signin(values))
  }

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.isVerified) {
        navigate('/activated')
      } else {
        if (userInfo.isAdmin) {
          navigate('/admin/products')
        } else {
          navigate('/')
        }
      }
    }
  }, [userInfo, navigate])

  return (
    <div className='container m-auto'>
      <form
        className='block relative w-96 m-auto box-shadow-signin text-center py-12 px-2.5 rounded-lg'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-3xl font-bold'>Đăng nhập</h1>

        {userRegister && firstTouchedRef.current && (
          <Message message='Đăng ký thành công, vui lòng đăng nhập' color='success' />
        )}
        {error && <Message message={error} color='danger' />}

        <input
          {...register('username')}
          onFocus={handleFocus}
          placeholder='Email hoặc số điện thoại'
          className={`text-base px-3 py-3.5 my-2.5 w-80 border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.username &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='text'
        />

        {errors.username && (
          <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] top-[95px] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[20px]'>
            {errors.username?.message}
          </div>
        )}

        <input
          {...register('password')}
          placeholder='Mật khẩu'
          className={`text-base px-3 py-3.5 my-2.5 w-80 border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.password &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='password'
        />

        {errors.password && (
          <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[33%] before:content-[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[15px]'>
            {errors.password?.message}
          </div>
        )}

        <button
          className='block m-auto w-80 text-base border-none rounded bg-amber-400 text-slate-600 font-bold py-4 my-5 hover:cursor-pointer hover:bg-amber-500 hover:text-black'
          type='submit'
        >
          {loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />} Đăng nhập
        </button>
        <Link className='text-blue-700 text-sm' to='/'>
          Quên mật khẩu?
        </Link>
        <div className='h-px w-80 bg-slate-300 mt-5 mb-5 inline-block'></div>
        <Link
          className='w-56 text-base rounded border-none bg-slate-400 font-bold text-black py-4 px-5 my-5'
          onClick={handleShowForm}
        >
          Tạo tài khoản mới
        </Link>
      </form>
    </div>
  )
}

export default SigninForm
