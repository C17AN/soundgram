import classNames from 'classnames'
import React from 'react'
import commonStyle from "styles/common.module.scss"
import { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const MenuList = ({ serviceName, serviceIcon, customIcon, hasRealTimeDataMenu, hasSearchResultMenu, hasNewComingDataMenu, hasAnalysisMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <li className={classNames(`${commonStyle.menu_tit} ${commonStyle.m_fold}`, { [commonStyle.active]: isExpanded })} onClick={toggleExpanded}>
      <MenuTitle className={commonStyle.m_tit}>
        <span className={classNames({ [commonStyle[customIcon]]: customIcon, [commonStyle['menu_icon']]: !serviceIcon, })}></span>
        {serviceIcon}
        <span className={commonStyle.svc_name}>{serviceName}</span>
      </MenuTitle>
      <ul className={commonStyle.sub_menu}>
        {hasRealTimeDataMenu && <li><Link to={`/realtime?serviceName=${serviceName}`}>실시간 전체보기</Link></li>}
        {hasSearchResultMenu && <li><a href="common_t100.php?class=n&page_type=all">브랜드 검색결과</a></li>}
        {hasNewComingDataMenu && <li><a href="common_t100.php?class=n&page_type=new">검색 신규진입</a></li>}
        {hasAnalysisMenu && <li><a href="common_lately_progress.php?class=n">통계분석</a></li>}
      </ul>
    </li >
  )
}

const MenuTitle = styled.a`
  display: flex !important;
  align-items: center;
  & > svg {
    margin: 0 12px 0 6px;
  }
`


export default MenuList