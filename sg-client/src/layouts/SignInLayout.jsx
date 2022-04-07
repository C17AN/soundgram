import Footer from 'components/common/Footer'
import React from 'react'

const SignInLayout = ({ children }) => {
  return (
    <>
      <div class="deco_line" />
      <div class="contents_wrap">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default SignInLayout