import React from 'react'
import HeaderLogo from "assets/images/logo.png"
import './style.css'

const Header = () => {
  return (
    <header>
      <div class="gnb_menu">
        <h1 class="logo pc_logo">
          <a>
            {/* <button type="button" onclick="location.href='login.php'; ">메인페이지 이동</button> */}
          </a>
        </h1>
        <h1 class="logo fold_logo">
          <button type="button" onclick="location.href='login.php'; ">
            <img src={HeaderLogo} alt="BrandCast CONSOLE" />
          </button>
        </h1>

        <div class="gnb_lst">
          <div class="gnb_txt">
            <span class="gt_01">REALTIME BIG DATA SOLUTION</span>
            <span class="gt_02">2021</span>
          </div>
          <ul>
            <li class="login_top">
              <button type="button" class="login" onclick="location.href='login.php'; ">LOGIN</button>
            </li>
          </ul>
        </div>
      </div>
    </header >
  )
}

export default Header