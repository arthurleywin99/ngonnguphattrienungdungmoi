import React from 'react'
import FontAwesome from '../../utils/FontAwesome'

function ImageDropComponent({
  customClassName,
  highlighted,
  setHighlighted,
  mediaPreview,
  setMediaPreview,
  inputRef,
  handleMediaChange,
  setMedia,
  profilePicUrl,
}) {
  return (
    <div className={`${customClassName}`}>
      <input
        style={{ display: 'none' }}
        type='file'
        accept='image/*'
        onChange={handleMediaChange}
        name='media'
        ref={inputRef}
      />
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setHighlighted(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setHighlighted(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setHighlighted(true)
          const dropedFile = Array.from(e.dataTransfer.files)
          setMedia(dropedFile[0])
          setMediaPreview(URL.createObjectURL(dropedFile[0]))
        }}
      >
        {mediaPreview ? (
          <>
            <div className={highlighted ? 'bg-rose-500 border' : ''}>
              <span className='flex justify-center'>
                <img
                  src={profilePicUrl || mediaPreview}
                  className='hover:cursor-pointer'
                  onClick={() => inputRef.current.click()}
                  alt=''
                />
              </span>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${
                highlighted ? 'border border-solid border-rose-500' : ''
              } hover:cursor-pointer flex justify-center items-center`}
              onClick={() => inputRef.current.click()}
            >
              <FontAwesome icon='far fa-images' />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageDropComponent
