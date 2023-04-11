import React, { useState } from 'react'
import { SigninForm, SignupForm } from '../components/signin/index'

function SigninScreen() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <SigninForm setShowForm={setShowForm} />
      {showForm && <SignupForm setShowForm={setShowForm} />}
    </>
  )
}

export default SigninScreen
