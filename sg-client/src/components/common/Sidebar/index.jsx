import React from 'react'
import MenuList from './MenuList'
import commonStyle from "styles/common.module.scss"
import defaultStyle from "styles/default.module.scss"
import { AiOutlineInstagram } from "react-icons/ai"
import MenuData from './MenuData'
// import "styles/common.css"

const Sidebar = ({ isSidebarOpen, toggleSidebarOpen }) => {
  return (
    <>
      <button type="button" className={commonStyle.lnb_fold_btn} onClick={toggleSidebarOpen}>
        <span></span>
      </button>
      <div className={`${commonStyle.lnb_menu} ${defaultStyle.slimscroll}`} style={{ height: "100vh" }}>
        <div className={commonStyle.fold_scr}>
          <div className={commonStyle.lnb_wide}>
            <div className={commonStyle["issue-menu"]}>
              <span>ISSUE TREND</span>
              <ul className={commonStyle.m_issue}>
                {
                  MenuData.ISSUE_TREND.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
            <div className={commonStyle['portal-menu']} >
              <span>PORTAL</span>
              <ul className={commonStyle.m_potal}>
                {
                  MenuData.PORTAL.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
            <div className="SNS-menu">
              <span>SNS</span>
              <ul className={commonStyle.m_sns}>
                {
                  MenuData.SNS.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
            <div className="community-menu">
              <span>COMMUNITY</span>
              <ul className={commonStyle.m_sns}>
                {
                  MenuData.COMMUNITY.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
            <div className="info-menu">
              <span>INFO</span>
              <ul className={commonStyle.m_sns}>
                {
                  MenuData.INFO.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
            <div className="intense-menu">
              <span>INTENSE</span>
              <ul className={commonStyle.m_sns}>
                {
                  MenuData.INTENSE.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
            <div className="management-menu">
              <span>관리</span>
              <ul className={commonStyle.m_sns}>
                {
                  MenuData.MANAGEMENT.map((item) => (
                    <MenuList key={item.serviceName} {...item} />
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar