import React from 'react'
import commonStyle from "styles/common.module.scss"

const ChannelFame = ({ serviceName }) => {
  return (
    <div className={`${commonStyle.contents} ${commonStyle.con02}`}>
      <div className={`${commonStyle.con_in}`}>
        <div className={`${commonStyle.section}`}>
          <h3>
            {/* <?php echo(($class == 's' || $class == 'c') ? "채널 " : $class_name." 채널별 ");?> */}
            {serviceName} 채널 평판 전체 현황
            <span className={`${commonStyle.fold_toggle}`}></span>
          </h3>
          {/* <?php if($class == 's') : ?> */}
          <div className={`${commonStyle.section_in} ${commonStyle.clear}`}>
            <div id="all_rate_chart" style={{ width: "fit-content;", margin: "0px auto 20px auto;" }}></div>
          </div>
          {/* <?php else : ?> */}
          <div className={`${commonStyle.section_in} ${commonStyle.clear}`}>
            <div className={`${commonStyle.left}`} id="all_rate_chart"></div>
            <div>
              <div className={`${commonStyle.right}`} id="channel_rate_chart"></div>
            </div>
          </div>
          {/* <?php endif; ?> */}
        </div>
      </div>
    </div>
  )
}

export default ChannelFame