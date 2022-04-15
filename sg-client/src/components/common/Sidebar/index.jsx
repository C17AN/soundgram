import React from 'react'
import SidebarMenuList from './SidebarMenuList'
import commonStyle from "styles/common.module.scss"
import defaultStyle from "styles/default.module.scss"
import { AiOutlineInstagram } from "react-icons/ai"
// import "styles/common.css"

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      <button type="button" className={commonStyle.lnb_fold_btn} onClick={toggleSidebar}>
        <span></span>
      </button>
      <div className={`${commonStyle.lnb_menu} ${defaultStyle.slimscroll}`} style={{ height: "100vh" }}>
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
                <SidebarMenuList serviceName={"네이버"} hasRealTimeData hasAnalysisMenu hasRealTimeDataMenu hasSearchResultMenu hasNewComingDataMenu />
                <SidebarMenuList serviceName={"다음"} hasRealTimeData hasAnalysisMenu hasRealTimeDataMenu hasSearchResultMenu hasNewComingDataMenu />
                <SidebarMenuList serviceName={"구글"} hasRealTimeData hasAnalysisMenu hasRealTimeDataMenu hasSearchResultMenu hasNewComingDataMenu />
              </ul>
            </div>
            <div className="SNS-menu">
              <span>SNS</span>
              <ul className={commonStyle.m_sns}>
                <SidebarMenuList serviceName={"인스타그램"} customIcon={"insta"} />
                <SidebarMenuList serviceName={"페이스북"} customIcon={"insta"} />
                <SidebarMenuList serviceName={"트위터"} serviceIcon={AiOutlineInstagram} />
                <SidebarMenuList serviceName={"유튜브"} serviceIcon={AiOutlineInstagram} />
              </ul>
            </div>
            <div className="community-menu">
              <span>COMMUNITY</span>
              <ul className={commonStyle.m_sns}>
                <SidebarMenuList serviceName={"커뮤니티"} />
              </ul>
            </div>
            <div className="info-menu">
              <span>INFO</span>
              <ul className={commonStyle.m_sns}>
                <SidebarMenuList serviceName={"키워드 검색 수"} customIcon={"insta"} />
              </ul>
            </div>
            <div className="intense-menu">
              <span>INTENSE</span>
              <ul className={commonStyle.m_sns}>
                <SidebarMenuList serviceName={"통합 검색"} customIcon={"insta"} />
                <SidebarMenuList serviceName={"Report"} serviceIcon={AiOutlineInstagram} />
                <SidebarMenuList serviceName={"트렌드 분석"} serviceIcon={AiOutlineInstagram} />
                <SidebarMenuList serviceName={"기타"} serviceIcon={AiOutlineInstagram} />
              </ul>
            </div>
            <div className="management-menu">
              <span>관리</span>
              <ul className={commonStyle.m_sns}>
                <SidebarMenuList serviceName={"환경설정"} />
                <SidebarMenuList serviceName={"ADMIN"} serviceIcon={AiOutlineInstagram} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar