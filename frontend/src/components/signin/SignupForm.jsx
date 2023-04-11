import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome from '../utils/FontAwesome'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userRegisterSchema } from '../utils/Schema'
import { signup } from '../../actions/userActions'
import Loading from '../bootstrap/Loading'
import Message from '../bootstrap/Message'

const ExitButton = React.memo(() => {
  return <FontAwesome icon='fas fa-times' color='#777' />
})

const QuestionIcon = React.memo(() => {
  return <FontAwesome icon='fas fa-question-circle' />
})

function SignupForm({ setShowForm }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const birthDateInfo = {
    bDay: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    bYear: new Date().getFullYear(),
  }

  const [birthDate, setBirthDate] = useState(birthDateInfo)

  const { userRegister, loading, error } = useSelector((state) => state.userRegister)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
  })

  const { bDay, bMonth, bYear } = birthDate

  const years = Array.from(new Array(118), (value, index) => new Date().getFullYear() - index)
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const days = Array.from(
    new Array(new Date(bYear, bMonth, 0).getDate()),
    (value, index) => 1 + index
  )
  const handleUpdateDay = (e) => {
    const { name, value } = e.target
    setBirthDate({ ...birthDate, [name]: value })
  }

  const handleHideForm = () => {
    setShowForm(false)
  }

  const onSubmit = (values) => {
    dispatch(signup(values))
  }

  useEffect(() => {
    if (userRegister) {
      setTimeout(() => {
        setShowForm(false)
      }, 2000)
    }
  }, [userRegister, navigate])

  return (
    <>
      <div className='fixed bg-gray-400 color-blur inset-0 z-50'>
        <form
          className='relative block w-[360px] bg-white m-auto box-shadow-signin text-center py-[50px] px-[10px] mt-[92px] rounded-lg'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className='absolute right-[5px] top-[5px] text-2xl hover:cursor-pointer hover:opacity-70'
            onClick={handleHideForm}
          >
            <ExitButton />
          </div>
          <h1 className='text-3xl font-bold'>Đăng ký</h1>

          {loading && <Loading />}
          {error && <Message message={error} color='danger' />}

          <input
            {...register('firstName')}
            className={`w-[330px] text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
              errors.firstName &&
              'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
            }`}
            type='text'
            placeholder='Họ'
          />

          {errors.firstName && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] top-[14%] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[12px]'>
              {errors.firstName?.message}
            </div>
          )}

          <input
            {...register('lastName')}
            className={`w-[330px] text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
              errors.lastName &&
              'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
            }`}
            type='text'
            placeholder='Tên'
          />

          {errors.lastName && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[23%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[15px]'>
              {errors.lastName?.message}
            </div>
          )}

          <input
            {...register('email')}
            className={`w-[330px] text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
              errors.email &&
              'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
            }`}
            type='email'
            placeholder='Nhập email'
          />

          {errors.email && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] top-[33%] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[12px]'>
              {errors.email?.message}
            </div>
          )}

          <input
            {...register('phoneNumber')}
            className={`w-[330px] text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
              errors.phoneNumber &&
              'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
            }`}
            type='text'
            placeholder='Nhập số điện thoại'
          />

          {errors.phoneNumber && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] top-[33%] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[12px]'>
              {errors.phoneNumber?.message}
            </div>
          )}

          <input
            {...register('password')}
            className={`w-[330px] text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
              errors.password &&
              'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
            }`}
            type='password'
            placeholder='Mật khẩu mới'
          />

          {errors.password && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[42%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[14px]'>
              {errors.password?.message}
            </div>
          )}

          <div className='text-left mb-2.5'>
            <div className='text-[13px] pl-[5px]'>
              <span>Sinh nhật</span> <QuestionIcon />
            </div>
            <div className='flex justify-between px-[5px]'>
              <select
                {...register('bDay')}
                className={`text-[17px] py-[10px] px-4 w-3/10 rounded border border-solid border-borderbtn bg-white ${
                  errors.atLeast13 || errors.noMoreThan70
                    ? 'border border-solid border-danger rounded-md'
                    : ''
                }`}
                value={bDay}
                onChange={handleUpdateDay}
              >
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                {...register('bMonth')}
                className={`text-[17px] py-[10px] px-4 w-3/10 rounded border border-solid border-borderbtn bg-white ${
                  (errors.atLeast13 || errors.noMoreThan70) &&
                  'border border-solid border-danger rounded-md'
                }`}
                value={bMonth}
                onChange={handleUpdateDay}
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                {...register('bYear')}
                className={`text-[17px] py-[10px] px-4 w-3/10 rounded border border-solid border-borderbtn bg-white ${
                  (errors.atLeast13 || errors.noMoreThan70) &&
                  'border border-solid border-danger rounded-md'
                }`}
                value={bYear}
                onChange={handleUpdateDay}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errors.atLeast13 && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] bottom-[35%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-l-danger before:right-[-20px] before:top-[20%]'>
              {errors.atLeast13?.message}
            </div>
          )}

          {errors.noMoreThan70 && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] bottom-[35%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-l-danger before:right-[-20px] before:top-[20%]'>
              {errors.noMoreThan70?.message}
            </div>
          )}

          <div className='text-left mb-2.5'>
            <div className='mb-1.5 text-[13px] pl-[5px]'>
              <span>Giới tính</span> <QuestionIcon />
            </div>
            <div className='flex justify-between px-[5px]'>
              <div
                className={`text-[17px] w-3/10 py-2.5 rounded-md border border-solid border-borderbtn bg-white ${
                  errors.gender && 'border border-solid border-danger rounded-md'
                }`}
              >
                <label className='flex justify-between align-center px-2.5' htmlFor='female'>
                  Nữ
                  <input {...register('gender')} id='female' type='radio' value='Female' />
                </label>
              </div>
              <div
                className={`text-[17px] w-3/10 py-2.5 rounded-md border border-solid border-borderbtn bg-white ${
                  errors.gender && 'border border-solid border-danger rounded-md'
                }`}
              >
                <label className='flex justify-between align-center px-2.5' htmlFor='male'>
                  Nam
                  <input {...register('gender')} id='male' type='radio' value='Male' />
                </label>
              </div>
              <div
                className={`text-[17px] w-3/10 py-2.5 rounded-md border border-solid border-borderbtn bg-white ${
                  errors.gender && 'border border-solid border-danger rounded-md'
                }`}
              >
                <label className='flex justify-between align-center px-2.5' htmlFor='other'>
                  Khác
                  <input {...register('gender')} id='other' type='radio' value='Other' />
                </label>
              </div>
            </div>
          </div>

          {errors.gender && (
            <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] bottom-[28%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[10px]'>
              {errors.gender?.message}
            </div>
          )}

          <p className='text-justify p-2.5 text-xs text-gray7'>
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng tư và
            Chính sách của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua email và hủy
            nhận bất kỳ lúc nào
          </p>

          <button
            className='w-[330px] text-base border-none rounded-md bg-btn text-gray5 font-bold py-[15px] my-[2px] hover:cursor-pointer hover:bg-amber-500 hover:text-black'
            type='submit'
          >
            {loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />} Đăng ký
          </button>
        </form>
      </div>
    </>
  )
}

export default SignupForm
