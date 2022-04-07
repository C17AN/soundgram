import SignUp from 'components/pages/SignUp'
import SignUpLayout from 'layouts/SignUpLayout'
import React from 'react'
import "styles/SignUp.css"

const SignUpPage = () => {
  return (
    <SignUpLayout>
      <SignUp />
    </SignUpLayout>
  )
}

export default SignUpPage