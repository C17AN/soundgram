import Footer from 'components/common/Footer'
import React from 'react'
import signInStyle from "styles/pages/SignIn.module.css"
import commonStyle from "styles/common.module.css"

const SignInLayout = ({ children }) => {
  return (
    <>
      <div className={signInStyle.deco_line} />
      <div className={`${commonStyle.wrap} ${signInStyle.wrap} ${commonStyle.fold_lnb}`}>
        <div className={signInStyle.contents_wrap}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignInLayout