import React from 'react'
import HeaderLogo from "assets/images/logo.png"
import commonStyle from 'styles/common.module.css'
import signUpStyle from 'styles/pages/SignUp.module.css'

const Header = () => {
  return (
    <header>
      <div class={commonStyle.gnb_menu}>
        <h1 class={`${commonStyle.logo} ${commonStyle.pc_logo}`}>
          <a>
            {/* <button type="button" onclick="location.href='login.php'; ">메인페이지 이동</button> */}
          </a>
        </h1>
        <h1 class={`${commonStyle.logo} ${commonStyle.fold_logo}`}>
          <button type="button" onclick="location.href='login.php'; ">
            <img src={HeaderLogo} alt="BrandCast CONSOLE" />
          </button>
        </h1>

        <div class={commonStyle.gnb_lst}>
          <div class={commonStyle.gnb_txt}>
            <span class={commonStyle.gt_01}>REALTIME BIG DATA SOLUTION</span>
            <span class={commonStyle.gt_02}>2021</span>
          </div>
          <ul>
            <li class={signUpStyle.login_top}>
              <button type="button" class={signUpStyle.login} onclick="location.href='login.php'; ">LOGIN</button>
            </li>
          </ul>
        </div>
      </div>
    </header >
  )
}

export default Header