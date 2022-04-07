import Footer from 'components/common/Footer'
import React from 'react'
import Header from 'components/common/Header'
import Sidebar from 'components/common/Sidebar'

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