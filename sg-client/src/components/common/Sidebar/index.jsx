import React from 'react'
import SidebarMenuList from './SidebarMenuList'
import commonStyle from "styles/common.module.css"
// import "styles/common.css"

const Sidebar = () => {
  return (
    <>
      <button type="button" className={commonStyle.lnb_fold_btn}>
        <span></span>
      </button>
      <div className={`${commonStyle.lnb_menu} ${commonStyle.slimscroll}`} style={{ height: "100vh" }}>
        <div className={commonStyle.fold_scr}>
          <div className={commonStyle.lnb_wide}>
            <div className={commonStyle["issue-menu"]}>
              <span>ISSUE TREND</span>
              <ul className={commonStyle.m_issue}>
                <li >
                  <a href="main_index.php" >
                    <i class="remixicon-slideshow-line"></i>
                    <span className={commonStyle.svc_name}>Dashboard</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={commonStyle['portal-menu']} >
              <span>PORTAL</span>
              <ul className={commonStyle.m_potal}>
                <SidebarMenuList serviceName={"네이버"} />
                <SidebarMenuList serviceName={"다음"} />
                <SidebarMenuList serviceName={"구글"} />
              </ul>
            </div>
            <div className="SNS-menu">
              <span>SNS</span>
              <ul className={commonStyle.m_sns}>
                <SidebarMenuList serviceName={"인스타그램"} serviceIcon={"insta"} />
                <SidebarMenuList serviceName={"트위터"} />
                <SidebarMenuList serviceName={"유튜브"} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar