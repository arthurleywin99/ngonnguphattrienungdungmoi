import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import FontAwesome from '../../utils/FontAwesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { userPasswordSchema } from '../../utils/Schema'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../../actions/userActions'

const ExitButton = React.memo(() => {
  return <FontAwesome icon='fas fa-times' color='#777' />
})

function UpdatePasswordModalComponent({ user }) {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userPasswordSchema),
  })

  const { userInfo } = useSelector((state) => state.userSignin)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleHideForm = () => {}

  const onSubmit = async (values) => {
    setLoading(true)
    await Axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/update-password`,
      {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    )
      .then((data) => {
        if (data) {
          dispatch(signout())
        }
      })
      .catch((err) => setError(err))
  }

  return (
    <div className='fixed bg-gray-400 color-blur inset-0 z-50'>
      <form
        className='relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-60%] w-[500px] bg-gray-100 px-[30px] py-[40px] rounded'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className='absolute right-[5px] top-[5px] text-2xl hover:cursor-pointer hover:opacity-70'
          onClick={handleHideForm}
        >
          <ExitButton />
        </div>
        <h1 className='text-center mb-[10px] text-[30px] uppercase font-bold'>Thay đổi mật khẩu</h1>
        {error && <div>{error.message}</div>}
        <input
          {...register('oldPassword')}
          className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.oldPassword &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='password'
          placeholder='Mật khẩu cũ'
        />
        {errors.oldPassword && (
          <div className='absolute bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left validation-shadow w-[300px] top-[26%] right-[-60%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[33%]'>
            {errors.oldPassword?.message}
          </div>
        )}

        <input
          {...register('newPassword')}
          className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.newPassword &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='password'
          placeholder='Mật khẩu mới'
        />
        {errors.newPassword && (
          <div className='absolute bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left validation-shadow w-[300px] top-[43%] left-[-60%] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[33%]'>
            {errors.newPassword?.message}
          </div>
        )}

        <input
          {...register('confirmPassword')}
          className={`w-full text-[17px] leading-4 py-[12px] px-4 my-2.5 rounded-md border border-solid border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.confirmPassword &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='password'
          placeholder='Nhập lại mật khẩu mới'
        />
        {errors.confirmPassword && (
          <div className='absolute bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left validation-shadow w-[300px] bottom-[26%] right-[-60%] before:content-[""] before:absolute before:w-0 after:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[33%]'>
            {errors.confirmPassword?.message}
          </div>
        )}

        <div className='flex justify-center mt-[20px]'>
          <button
            className='px-[40px] py-[5px] text-[18px] border border-solid border-[#ccc] bg-amber-500 rounded text-white uppercase hover:bg-amber-600'
            type='submit'
          >
            {loading && <FontAwesome icon='animate-spin fal fa-circle-notch' />} Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePasswordModalComponent
