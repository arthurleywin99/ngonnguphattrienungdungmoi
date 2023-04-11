import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ImageDropComponent from '../../account/info/ImageDropComponent'

function AdminWebConfigUpdateComponent() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [webInfo, setWebInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [media, setMedia] = useState(null)
  const [highlighted, setHighlighted] = useState(false)
  const [mediaPreview, setMediaPreview] = useState(null)

  const inputRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/webinfos/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setWebInfo(data.message)
      })
      .catch((err) => setError(err.message))
  }, [])

  const handleMediaChange = (e) => {
    const { files } = e.target
    setMedia(files[0])
    setMediaPreview(URL.createObjectURL(files[0]))
  }

  // const updateWebInfoHandler = () => {
  //   let formData = new FormData()
  //   formData.set('file', media)
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/api/utils/cloudinary-upload`, {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         setImages((prev) => [...prev, data.message])
  //       }
  //     })
  //     .catch((err) => setError(err.message))

  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/api/webinfos`, {
  //     method: 'PUT',
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${userInfo.token}`,
  //     }),
  //     body:
  //   })
  // }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <h2>Cập nhật</h2>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-cyan-600 text-white rounded'
        onClick={() => navigate(-1)}
      >
        Trở về
      </button>
      <div className='flex justify-center'>
        <div className='w-[400px]'>
          <div className='flex items-center justify-between'>
            <label className='text-[18px] font-bold' htmlFor='id'>
              ID
            </label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              value={webInfo?._id}
              id='id'
              disabled
              placeholder=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <label className='text-[18px] font-bold' htmlFor='id'>
              Tên
            </label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              value={webInfo?.name}
              name='name'
              disabled
              placeholder=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <label className='text-[18px] font-bold' htmlFor='id'>
              Ảnh
            </label>
            <ImageDropComponent
              customClassName={`text-center w-[300px]`}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              mediaPreview={mediaPreview}
              setMediaPreview={setMediaPreview}
              inputRef={inputRef}
              handleMediaChange={handleMediaChange}
              setMedia={setMedia}
            />
          </div>
          <div className='text-center mt-[20px]'>
            <button
              className='px-[60px] py-[10px] bg-green-600 text-white uppercase text-[18px] font-bold rounded hover:bg-green-800'
              type='submit'
              // onClick={updateWebInfoHandler}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminWebConfigUpdateComponent
