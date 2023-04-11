import React, { useEffect, useState } from 'react'
import { vnProvinces } from '../utils/VietNamProvinces.js'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { shippingAddressSchema } from '../utils/Schema.js'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../actions/cartActions.js'
import { useNavigate } from 'react-router-dom'

function ShippingAddressComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems, shippingAddress } = useSelector((state) => state.cart)

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/')
    }
    if (shippingAddress) {
      navigate('/checkout?step=payment')
    }
  }, [])

  const [province, setProvince] = useState({
    city: 'Thành phố Hà Nội',
    district: 'Quận Ba Đình',
    ward: 'Phường Cống Vị',
  })

  const [districtList, setDistrictList] = useState([])
  const [wardList, setWardList] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shippingAddressSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
    },
  })

  const provincesList = vnProvinces.map((item) => item.name)

  useEffect(() => {
    setDistrictList(vnProvinces[0].districts)
    setWardList(vnProvinces[0].districts[0].wards)
  }, [])

  const provinceChangeHandler = (e) => {
    const dList = vnProvinces.filter((item) => item.name === e.target.value)[0]
      .districts
    const wList = vnProvinces.filter((item) => item.name === e.target.value)[0]
      .districts[0].wards
    setProvince({
      city: e.target.value,
      district: dList[0].name,
      ward: wList[0],
    })

    setDistrictList(dList)
    setWardList(wList)
  }

  const districtChangeHandler = (e) => {
    const wList = districtList.filter((item) => item.name === e.target.value)[0]
      .wards
    setProvince({
      ...province,
      district: e.target.value,
      ward: wList[0],
    })
    setWardList(wList)
  }

  const wardChangeHandler = (e) => {
    setProvince({ ...province, ward: e.target.value })
  }

  const onSubmit = (values) => {
    dispatch(saveShippingAddress({ ...values, ...province }))
    navigate('/checkout?step=payment')
  }

  return (
    <div className='w-full flex justify-center mt-[20px]'>
      <form
        className='relative w-[380px] text-center py-[15px] px-[20px] border border-solid border-[#ccc]'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='font-bold text-[24px]'>Địa chỉ giao hàng</h1>
        <input
          {...register('fullName')}
          placeholder='Họ tên người nhận'
          className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.fullName &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='text'
        />
        {errors.fullName && (
          <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] top-[60px] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[20px]'>
            {errors.fullName?.message}
          </div>
        )}
        <input
          {...register('email')}
          placeholder='Địa chỉ email'
          className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.email &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='email'
        />
        {errors.email && (
          <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[135px] before:content-[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[20px]'>
            {errors.email?.message}
          </div>
        )}
        <input
          {...register('phoneNumber')}
          placeholder='Số điện thoại'
          className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.phoneNumber &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='text'
        />
        {errors.phoneNumber && (
          <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute left-[-200px] top-[200px] after:content-[""] after:absolute after:w-0 after:h-0 after:border-[10px] after:border-solid after:border-transparent after:border-l-danger after:right-[-20px] after:top-[20px]'>
            {errors.phoneNumber?.message}
          </div>
        )}
        <input
          {...register('address')}
          placeholder='Địa chỉ'
          className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
            errors.address &&
            'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
          }`}
          type='text'
        />
        {errors.address && (
          <div className='bg-danger text-white rounded-sm py-[15px] px-[10px] text-[13px] text-left w-[200px] validation-shadow absolute right-[-200px] top-[285px] before:content-[""] before:absolute before:w-0 before:h-0 before:border-[10px] before:border-solid before:border-transparent before:border-r-danger before:left-[-20px] before:top-[15px]'>
            {errors.address?.message}
          </div>
        )}
        <div className='text-start px-3 text-[13px]'>Thành phố/Tỉnh</div>
        <select
          value={province.city}
          name='city'
          onChange={provinceChangeHandler}
          className='text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
        >
          {provincesList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className='text-start px-3 text-[13px]'>Quận/Huyện</div>
        <select
          value={province.district}
          name='district'
          onChange={districtChangeHandler}
          className='text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
        >
          {districtList.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <div className='text-start px-3 text-[13px]'>Phường/Xã</div>
        <select
          value={province.ward}
          name='ward'
          onChange={wardChangeHandler}
          className='text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
        >
          {wardList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          type='submit'
          title='Submit'
          className='text-[16px] font-bold bg-yellow-500 px-[15px] py-[10px] mt-[10px] rounded'
        >
          Tiếp tục thanh toán
        </button>
      </form>
    </div>
  )
}

export default ShippingAddressComponent
