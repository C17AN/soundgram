import React from 'react'
import Header from 'components/common/Header'

const SignUpLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div class="contents_wrap">
        {children}
      </div>
    </>
  )
}

export default SignUpLayout