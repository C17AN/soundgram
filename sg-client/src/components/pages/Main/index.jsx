import React from 'react'
import mainStyle from 'styles/pages/Main.module.css'
import * as dateFns from "date-fns";

const Main = () => {
  const today = dateFns.format(new Date(), "yyyy-MM-dd HH:mm")

  return (
    <>
      <div className={`${mainStyle.contents} ${mainStyle.con01}`}>
        <div className={`${mainStyle.con_in}`}>
          <div class="main_tit">
            <div class="brand_name">
              <span class="h_t"></span>
              <h2>
                <img src="<?=$customer_logo?>" alt="브랜드로고" />
                <span class="name_txt on"></span>
              </h2>
            </div>
            <p>기준 : {today}</p>
          </div>
          <div class="section">
            <div class="section_in">
              {/* 이부분 */}
              <div class="left">
                <div class="l_top tit">
                  <h3>브랜드 검색 평판</h3>
                  <select class="keyword" id="keyword">
                    <option value="" data-class="">키워드를 선택하세요.</option>
                    {/* <?php foreach($keyword_array as $keyword => $class) : ?> */}
                    <option value="<?=$keyword?>"
                      data-naver="<?=$class['네이버']?>"
                      data-daum="<?=$class['다음']?>"
                      data-google="<?=$class['구글']?>">
                    </option>
                    {/* <?php endforeach;?> */}
                  </select>
                  <div class="grp_ref">
                    <span><b></b>긍정</span>
                    <span><b></b>부정</span>
                    <span><b></b>중립</span>
                    <span><b></b>무관</span>
                  </div>
                </div>
                <div class="l_mid">
                  <div class="m_left" id="t100_chart_total"></div>
                  <div class="m_right">
                    <ul class="show_t100 hidden">
                      <li><div class='t100_chart' id="t100_chart_0"></div></li>
                      <li><div class='t100_chart' id="t100_chart_1"></div></li>
                      <li><div class='t100_chart' id="t100_chart_2"></div></li>
                      <li><div class='t100_chart' id="t100_chart_3"></div></li>
                      <li><div class='t100_chart' id="t100_chart_4"></div></li>
                    </ul>
                    <ul class="no_data">
                      해당 채널에 없는 키워드입니다.
                    </ul>
                  </div>
                </div>
                <div class="l_bottom">
                  <span>- TODAY -</span>
                </div>
              </div>
              {/* 이부분 */}
              <div class="right">
                <div class="r_top claer" id="r_top_portals">
                  {/* <?php if (substr($PORTAL_G_FLAG, 1, 1)) : ?> */}
                  <button type="button" class="t100_tab google" data-class="구글">
                    <span>Google</span>
                  </button>
                  {/* <?php endif; ?> */}
                  <button type="button" class="t100_tab daum" data-class="다음">
                    <span>Daum</span>
                  </button>
                  <button type="button" class="t100_tab naver active" data-class="네이버">
                    <span>NAVER</span>
                  </button>
                </div>
                <div class="r_mid" id="t100_week_chart"></div>
                <div class="r_bottom">
                  <span>- WEEKLY -</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main