import Footer from 'components/common/Footer'
import React from 'react'
import style from "styles/pages/SignIn.module.css"
import commonStyle from "styles/common.module.css"

const SignInLayout = ({ children }) => {
  return (
    <>
      <div className={style.deco_line} />
      <div className={`${commonStyle.wrap} ${commonStyle.fold_lnb}`}>
        <div className={style.contents_wrap}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignInLayout