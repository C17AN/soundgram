import classNames from 'classnames'
import React from 'react'
import commonStyle from "styles/common.module.css"

const SidebarMenuList = ({ serviceName, serviceIcon, hasRealTimeData, hasSearchResult, hasNewcomerData, hasAnalysis }) => {
  return (
    <li className={`${commonStyle.menu_tit} ${commonStyle.m_fold}`}>
      <a href="javascript:void(0);" class="m_tit">
        <span className={classNames(commonStyle.menu_icon, { [commonStyle[serviceIcon]]: serviceIcon })}></span>
        <span className={commonStyle.svc_name}>{serviceName}</span>
      </a>
      <ul className={commonStyle.sub_menu}>
        <li><a href="common_lately.php?class=n">실시간 전체보기</a></li>
        <li><a href="common_t100.php?class=n&page_type=all">브랜드 검색결과</a></li>
        <li><a href="common_t100.php?class=n&page_type=new">검색 신규진입</a></li>
        <li><a href="common_lately_progress.php?class=n">통계분석</a></li>
      </ul>
    </li >
  )
}

export default SidebarMenuList