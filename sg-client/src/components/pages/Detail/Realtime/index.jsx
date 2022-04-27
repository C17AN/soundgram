import React from 'react'
import SearchFilter from 'components/common/SearchFilter'
import commonStyle from "styles/common.module.scss"
import { useSearchParams } from "react-router-dom"
import ChannelFame from './ChannelFame'
import PortalData from './PortalData'
import './styles.css'

const Realtime = () => {
  const [searchParams] = useSearchParams()
  const serviceName = searchParams.get('serviceName')

  return (
    <>
      <div className={`${commonStyle.contents} ${commonStyle.con01}`}>
        <div className={`${commonStyle.con_in}`}>
          <div className={`${commonStyle.page_tit}`}>
            <h2>
              {/* <span><?php echo(($class == 's' || $class == 'c') ? $channel_name : $class_name);?></span> */}
              <span>{serviceName} </span>
              실시간 전체보기</h2>
            <p>
              {/* <?php echo(($class == 's' || $class == 'c') ? $channel_name : $class_name);?> */}
              {serviceName}에 올라온 브랜드 관련 글을 실시간으로 볼 수 있어요.
            </p>
          </div>
          {/* <?php require_once("common_filter.php"); ?> */}
          <SearchFilter />
          {/* <!-- section end --> */}
        </div>
      </div>
      <ChannelFame serviceName={serviceName} />
      <PortalData />
    </>
  )
}

export default Realtime