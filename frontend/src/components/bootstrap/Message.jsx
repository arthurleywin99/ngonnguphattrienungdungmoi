import React from 'react'

function Message({ color, message }) {
  return (
    <div className={`alert alert-${color}`} role='alert'>
      {message}
    </div>
  )
}

export default Message
