import React from 'react'

function Loading() {
  return (
    <>
      <button type='button' class='bg-white' disabled>
        <svg class='animate-spin h-5 w-5 mr-3 bg-rose-500' viewBox='0 0 24 24'></svg>
      </button>
    </>
  )
}

export default Loading
