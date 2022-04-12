import React from 'react'
import Header from 'components/common/Header'
import signUpStyle from "styles/pages/SignUp.module.css"
import Footer from 'components/common/Footer'


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