import React, { useRef, useState } from 'react'
import ImageDropComponent from './ImageDropComponent'
import { userUpdateSchema } from '../../utils/Schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FontAwesome from '../../utils/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../../actions/userActions'
import Axios from 'axios'

const ExitButton = React.memo(() => {
  return <FontAwesome icon='fas fa-times' color='#777' />
})

const QuestionIcon = React.memo(() => {
  return <FontAwesome icon='fas fa-question-circle' />
})

function UpdateUserModalComponent({ setShowForm, user }) {
  const dispatch = useDispatch()

  const [media, setMedia] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)
  const [highlighted, setHighlighted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputRef = useRef()

  const birthDateInfo = {
    bDay: user.bDay,
    bMonth: user.bMonth,
    bYear: user.bYear,
  }

  const [birthDate, setBirthDate] = useState(birthDateInfo)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  })

  const handleMediaChange = (e) => {
    const { files } = e.target
    setMedia(files[0])
    setMediaPreview(URL.createObjectURL(files[0]))
  }

  const { userInfo } = useSelector((state) => state.userSignin)

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

  const onSubmit = async (values) => {
    if (media) {
      let formData = new FormData()
      formData.set('file', media)
      const { data } = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/utils/cloudinary-upload`,
        formData
      )
      if (data) {
        const newUser = {
          ...values,
          ...birthDate,
          profilePicUrl: data.message,
        }
        dispatch(updateUser(newUser, setShowForm, setLoading, setError, userInfo.token))
      } else {
        const newUser = {
          ...values,
          ...birthDate,
        }
        dispatch(updateUser(newUser, setShowForm, setLoading, setError, userInfo.token))
      }
    } else {
      const newUser = {
        ...values,
        ...birthDate,
      }
      dispatch(updateUser(newUser, setShowForm, setLoading, setError, userInfo.token))
    }
  }

  const handleHideForm = () => {
    setShowForm(false)
  }

  return (
    <div className='fixed bg-gray-400 color-blur inset-0 z-50'>
      <form
        className='relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-60%] w-[800px] bg-gray-100 px-[30px] py-[40px] rounded'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className='absolute right-[5px] top-[5px] text-2xl hover:cursor-pointer hover:opacity-70'
          onClick={handleHideForm}
        >
          <ExitButton />
        </div>
        <h1 className='text-center mb-[10px] text-[30px] uppercase font-bold'>
          Cập nhật thông tin
        </h1>
        {error && <div>{error}</div>}
        <div className='grid grid-cols-[300px_1fr] gap-4'>
          <div>
            <ImageDropComponent
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              mediaPreview={mediaPreview}
              setMediaPreview={setMediaPreview}
              inputRef={inputRef}
              handleMediaChange={handleMediaChange}
              setMedia={setMedia}
              profilePicUrl={user.profilePicUrl}
            />
          </div>
          <div>
            <input
              {...register('firstName')}
              className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                errors.firstName &&
                'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
              }`}
              type='text'
              placeholder='Họ'
            />
            {errors.firstName && (
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[17%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[12px]'>
                {errors.firstName?.message}
              </div>
            )}

            <input
              {...register('lastName')}
              className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                errors.lastName &&
                'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
              }`}
              type='text'
              placeholder='Tên'
            />
            {errors.lastName && (
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[28%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[12px]'>
                {errors.lastName?.message}
              </div>
            )}

            <div className='text-left mb-2.5 w-full'>
              <div className='mb-1.5 text-[13px] pl-[5px]'>
                <span>Giới tính</span> <QuestionIcon />
              </div>
              <div className='flex justify-between'>
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
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[300px] validation-shadow absolute right-[-300px] top-[41%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[12px]'>
                {errors.gender?.message}
              </div>
            )}

            <input
              {...register('email')}
              className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                errors.email &&
                'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
              }`}
              type='email'
              placeholder='Nhập email'
              disabled
            />

            {errors.email && (
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[300px] validation-shadow absolute right-[-300px] top-[52%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[12px]'>
                {errors.email?.message}
              </div>
            )}

            <input
              {...register('phoneNumber')}
              className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                errors.phoneNumber &&
                'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
              }`}
              type='text'
              placeholder='Nhập số điện thoại'
            />
            {errors.phoneNumber && (
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[300px] validation-shadow absolute right-[-300px] top-[63%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[12px]'>
                {errors.phoneNumber?.message}
              </div>
            )}

            <div className='text-left mb-2.5'>
              <div className='text-[13px] pl-[5px]'>
                <span>Sinh nhật</span> <QuestionIcon />
              </div>
              <div className='flex justify-between'>
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
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[300px] validation-shadow absolute left-[25px] bottom-[15%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-l-danger before:right-[-20px] before:top-[20%]'>
                {errors.atLeast13?.message}
              </div>
            )}

            {errors.noMoreThan70 && (
              <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[300px] validation-shadow absolute left-[25px] bottom-[15%] before:content[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-l-danger before:right-[-20px] before:top-[20%]'>
                {errors.noMoreThan70?.message}
              </div>
            )}
          </div>
        </div>
        <div className='flex justify-center mt-[20px]'>
          <button
            className='px-[40px] py-[5px] text-[18px] border border-solid border-[#ccc] bg-green-500 rounded text-white uppercase hover:bg-green-700'
            type='submit'
          >
            {loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />} Cập nhật
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUserModalComponent
