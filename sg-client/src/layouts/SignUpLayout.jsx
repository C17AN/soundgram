import React from 'react'
import Header from 'components/common/Header'
import Footer from 'components/common/Footer'
import signUpStyle from "styles/pages/SignUp.module.css"


const SignUpLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div class={signUpStyle.contents_wrap}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default SignUpLayout