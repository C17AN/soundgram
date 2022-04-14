import React from 'react'
import HeaderLogo from "assets/images/logo.png"
import commonStyle from "styles/common.module.scss"
import { useLocation } from "react-router-dom"
import AdminHeader from './AdminHeader'
import LoginHeader from './LoginHeader'

const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname)
  const isAdminPage = pathname === "/admin"

  return (
    <header>
      <div className={commonStyle.gnb_menu}>
        <h1 className={`${commonStyle.logo} ${commonStyle.pc_logo}`}>
          <a>
            {/* <button type="button" onClick="location.href='login.php'; ">메인페이지 이동</button> */}
          </a>
        </h1>
        <h1 className={`${commonStyle.logo} ${commonStyle.fold_logo}`}>
          <a href="main_index.php">
            <img src={HeaderLogo} alt="BrandCast CONSOLE" />
          </a>
        </h1>

        <div className={commonStyle.gnb_lst}>
          <div className={commonStyle.gnb_txt}>
            <span className={commonStyle.gt_01}>REALTIME BIG DATA SOLUTION</span>
            <span className={commonStyle.gt_02}>2021</span>
          </div>
          <>
            {!isAdminPage ? <LoginHeader /> : <AdminHeader />
            }
          </>
        </div>
      </div >
    </header >
  )
}

export default Header