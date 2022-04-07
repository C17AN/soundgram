import Footer from 'components/common/Footer'
import React from 'react'
import style from "styles/pages/SignIn.module.css"

const SignInLayout = ({ children }) => {
  return (
    <>
      <div className={style.deco_line} />
      <div className={style.contents_wrap}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default SignInLayout