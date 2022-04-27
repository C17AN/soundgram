import React from 'react'
import commonStyle from "styles/common.module.scss"
import defaultStyle from "styles/default.module.scss"
import "./table.css"

const PortalData = () => {
  return (

    <div className={`${commonStyle.contents} ${commonStyle.con03}`}>
      <div className={`${commonStyle.con_in}`}>
        <div className={`${commonStyle.section}`} id='position_after_paging'>
          {/* <?php if($class != 's' && $class != 'c'):?> */}
          <div className={`${commonStyle.tabgroup}`}>
            <ul class={`${commonStyle.clear}`}>
              {/* <?php
          echo ("<li className='tab lately active all' data='$class_name' value='all'><a>");
            echo(($class == 'c') ? "" : $class_name);
            echo("<b>전체</b></a></li>");
  foreach ($E_K as $e => $k) {
            $rk = str_replace($class_name, '', $k);
          // if (strpos($k, '뉴스') && strcmp($class_name, '구글'))
          //   $active = 'active';
          // else if(strpos($k, '통합검색') && !strcmp($class_name, '구글'))
          //   $active = 'active';
          // else
          //   $active = '';
          echo ("<li className='tab lately' data='$k' value='$e'><a>");
            echo(($class == 'c') ? "" : $class_name);
            echo("<b>$rk</b></a></li>");
  }
?> */}
            </ul>
          </div>
          {/* <?php endif; ?> */}
          <div className={`${commonStyle.form_group} ${commonStyle.clear}`}>
            <strong>검색 결과 : <span id="table_total">0건</span></strong>
            <div>
              {/* <?php if($user_level < 100) :?> */}
              <button className={`${commonStyle.excel}`} type="button" hidden>엑셀파일 다운</button>
              {/* <?php if($user_level == 0) :?> */}
              <button type="button" class="remixicon-folder-upload-line" hidden>외부파일업로드</button>
              {/* <?php endif; ?> */}
              <button type="button" class="fe-repeat">평판재생성</button>
              <button type="button" class="remixicon-keyboard-fill"
                onClick="openAddDataPopUp()">수동입력</button>
              {/* <?php endif; ?> */}
              <button type="button" className={`${commonStyle.show_btn} ${commonStyle.show_title}`}>제목으로 보기</button>
              <select id="order">
                <option value='desc' selected>최신순</option>
                <option value='asc'>시간순</option>
                {/* <?php if($user_level < 100) :?> */}
                <option value='searchdesc'>발견최신순</option>
                <option value='searchasc'>발견시간순</option>
                {/* <?php endif; ?> */}
              </select>
            </div>
          </div>
          <div className={`${commonStyle.section_in}`}>
            <table id="main-datatable">
            </table>
            <div className={`${commonStyle.table_chk_wrap} ${commonStyle.clear}`}>
              <div className={`${commonStyle.table_chk}`}>
                {/* <?php if($user_level==0 || $user_level >= 100): ?> */}
                <div name="all_unchk" onClick="changeAllNotCustomerConfirm()">
                  <label for="all_unchk">전체미확인</label>
                </div>
                <div name="all_chk" onClick="changeAllCustomerConfirm()">
                  <label for="all_chk">전체확인</label>
                </div>
                {/* <?php endif; ?> */}
                {/* <?php if($user_level < 100): ?> */}
                <div name="all_unchk" onClick="changeAllNotConfirm()">
                  <label for="all_unchk">전체검수미확인</label>
                </div>
                <div name="all_chk" onClick="changeAllConfirm()">
                  <label for="all_chk">전체검수확인</label>
                </div>
                {/* <?php endif; ?> */}
                {/* <?php if($user_level==0): ?> */}
                <div name="memo_sum" onClick="getRespondSum('memo', '#memo_sum')">
                  <label id="memo_sum" for="memo_sum">#MEMO_SUM</label>
                </div>
                <div name="extra_sum" onClick="getRespondSum('extra', '#extra_sum')">
                  <label id="extra_sum" for="extra_sum">#EXTRA_SUM</label>
                </div>
                {/* <?php endif; ?> */}
              </div>
            </div>
            <div className={commonStyle.pagenation}>
              <nav>
                <ul className={commonStyle.clear}>
                  <li className={commonStyle["page-item"]}>
                    <button className={commonStyle["page-prev"]}>
                      <span>«</span>
                      <span className={commonStyle.blind}>Previous</span>
                    </button>
                  </li>
                  <li className={commonStyle["page-item"]}>
                    <button className={commonStyle["page-next"]}>
                      <span>»</span>
                      <span className={defaultStyle.blind}>Next</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* <!-- section_in end --> */}
        </div>
      </div>
    </div>
  )
}

export default PortalData