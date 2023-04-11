import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { productValidatorSchema } from '../../utils/Schema'
import { useSelector } from 'react-redux'
import ImageDropComponent from '../../account/info/ImageDropComponent'

const settingList = [
  {
    key: 'Màn hình',
    value: '',
  },
  {
    key: 'Hệ điều hành',
    value: '',
  },
  {
    key: 'Camera sau',
    value: '',
  },
  {
    key: 'Camera trước',
    value: '',
  },
  {
    key: 'Chip',
    value: '',
  },
  {
    key: 'RAM',
    value: '',
  },
  {
    key: 'Dung lượng lưu trữ',
    value: '',
  },
  {
    key: 'SIM',
    value: '',
  },
  {
    key: 'Pin, Sạc',
    value: '',
  },
]

function AdminProductCreateComponent() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productValidatorSchema),
  })

  const { userInfo } = useSelector((state) => state.userSignin)

  const [media1, setMedia1] = useState(null)
  const [media2, setMedia2] = useState(null)
  const [media3, setMedia3] = useState(null)
  const [mediaPreview1, setMediaPreview1] = useState(null)
  const [mediaPreview2, setMediaPreview2] = useState(null)
  const [mediaPreview3, setMediaPreview3] = useState(null)
  const [highlighted, setHighlighted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [settings, setSettings] = useState(settingList)
  const [categories, setCategories] = useState(null)
  const [brands, setBrands] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])
  const [data, setData] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/category/getall`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.message)
      })
      .catch((err) => setError(err.message))
  }, [])

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/brands`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)

  const uploadImage = async (media) => {
    let formData = new FormData()
    formData.set('file', media)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/utils/cloudinary-upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setImages((prev) => [...prev, data.message])
        }
      })
      .catch((err) => setError(err.message))
  }

  const onSubmit = async (values) => {
    setData(values)
    if (media1) {
      await uploadImage(media1)
    }

    if (media2) {
      await uploadImage(media2)
    }

    if (media3) {
      await uploadImage(media3)
    }
  }

  useEffect(() => {
    if (images.length === 3) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/create`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        }),
        body: JSON.stringify({ ...data, settings, images }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setSuccess(true)
            navigate(-1, { replace: true })
          }
        })
        .catch((err) => setError(err.message))
    }
  }, [images])

  const settingChangeHandler = (e) => {
    const { name, value } = e.target
    const temp = settings.map((item) => {
      if (item.key === name) {
        item.value = value
      }
      return item
    })
    setSettings(temp)
  }

  const handleMediaChange1 = (e) => {
    const { files } = e.target
    setMedia1(files[0])
    setMediaPreview1(URL.createObjectURL(files[0]))
  }

  const handleMediaChange2 = (e) => {
    const { files } = e.target
    setMedia2(files[0])
    setMediaPreview2(URL.createObjectURL(files[0]))
  }

  const handleMediaChange3 = (e) => {
    const { files } = e.target
    setMedia3(files[0])
    setMediaPreview3(URL.createObjectURL(files[0]))
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className='flex justify-center'>
      {categories && (
        <form className='w-[1200px] mt-[10px]' onSubmit={handleSubmit(onSubmit)}>
          {success && (
            <div className='px-[10px] py-[10px] text-[18px] uppercase font-bold bg-green-400 rounded-[10px] text-red-700'>
              Tạo mới sản phẩm thành công
            </div>
          )}
          <div className='grid grid-cols-[1fr_1fr] gap-10 mt-[10px]'>
            <div className='box-shadow-signin px-[40px] py-[20px] rounded-[10px]'>
              <span className='text-[18px] flex items-center font-bold'>Thông tin sản phẩm</span>
              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Tên</span>
                <input
                  {...register('name')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.name &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                  type='text'
                />
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.name && (
                  <span className='text-red-500 text-[13px] italic'>{errors.name?.message}</span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Loại sản phẩm</span>
                <select
                  {...register('category')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.category &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                >
                  {categories &&
                    categories.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.category && (
                  <span className='text-red-500 text-[13px] italic'>
                    {errors.category?.message}
                  </span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Thương hiệu</span>
                <select
                  {...register('brand')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.brand &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                >
                  {brands &&
                    brands.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.brand && (
                  <span className='text-red-500 text-[13px] italic'>{errors.brand?.message}</span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Giá</span>
                <input
                  {...register('price')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.price &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                  type='text'
                />
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.price && (
                  <span className='text-red-500 text-[13px] italic'>{errors.price?.message}</span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Giảm giá</span>
                <input
                  {...register('discount')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.discount &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                  type='text'
                />
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.discount && (
                  <span className='text-red-500 text-[13px] italic'>
                    {errors.discount?.message}
                  </span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Số lượng tồn</span>
                <input
                  {...register('countInStock')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.countInStock &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                  type='text'
                />
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.countInStock && (
                  <span className='text-red-500 text-[13px] italic'>
                    {errors.countInStock?.message}
                  </span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Mô tả</span>
                <input
                  {...register('description')}
                  className={`text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none ${
                    errors.description &&
                    'border border-solid border-danger focus:border focus:border-solid focus:border-danger'
                  }`}
                  type='text'
                />
              </div>
              <div className='grid grid-cols-[150px_1fr]'>
                <span></span>
                {errors.description && (
                  <span className='text-red-500 text-[13px] italic'>
                    {errors.description?.message}
                  </span>
                )}
              </div>

              <div className='grid grid-cols-[150px_1fr]'>
                <span className='text-[18px] flex items-center font-bold'>Ảnh</span>
                <div className='flex justify-between'>
                  <ImageDropComponent
                    customClassName={`w-[100px]`}
                    highlighted={highlighted}
                    setHighlighted={setHighlighted}
                    mediaPreview={mediaPreview1}
                    setMediaPreview={setMediaPreview1}
                    inputRef={inputRef1}
                    handleMediaChange={handleMediaChange1}
                    setMedia={setMedia1}
                  />
                  <ImageDropComponent
                    customClassName={`w-[100px]`}
                    highlighted={highlighted}
                    setHighlighted={setHighlighted}
                    mediaPreview={mediaPreview2}
                    setMediaPreview={setMediaPreview2}
                    inputRef={inputRef2}
                    handleMediaChange={handleMediaChange2}
                    setMedia={setMedia2}
                  />
                  <ImageDropComponent
                    customClassName={`w-[100px]`}
                    highlighted={highlighted}
                    setHighlighted={setHighlighted}
                    mediaPreview={mediaPreview3}
                    setMediaPreview={setMediaPreview3}
                    inputRef={inputRef3}
                    handleMediaChange={handleMediaChange3}
                    setMedia={setMedia3}
                  />
                </div>
              </div>
            </div>

            <div className='box-shadow-signin px-[40px] py-[20px] rounded-[10px]'>
              <div className='grid grid-cols-[150px_1fr]'>
                <div className='text-[18px] flex items-center font-bold'>Cấu hình</div>
              </div>
              {settings.map((item, index) => (
                <div key={index} className='flex grid grid-cols-[170px_1fr] gap-4'>
                  <span
                    className='text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
                    type='text'
                  >
                    {item.key}
                  </span>
                  <input
                    className='text-base px-3 py-3.5 my-2.5 w-full border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
                    type='text'
                    name={item.key}
                    value={item.value}
                    onChange={settingChangeHandler}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-center my-[20px] gap-4'>
            <button
              className='px-[60px] py-[10px] bg-green-600 text-white uppercase text-[18px] font-bold rounded hover:bg-green-800'
              type='submit'
            >
              Tạo mới
            </button>
            <button
              className='px-[60px] py-[10px] bg-cyan-600 text-white uppercase text-[18px] font-bold rounded hover:bg-cyan-800'
              type='button'
              onClick={() => {
                navigate(-1)
              }}
            >
              Huỷ bỏ
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AdminProductCreateComponent
