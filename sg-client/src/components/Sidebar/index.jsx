import React from 'react'
import "./index.css"

const Sidebar = () => {
  return (
    <>
      <button type="button" class="lnb_fold_btn">
        <span></span>
      </button>
      <div class="lnb_menu slimscroll" style={{ height: "100vh" }}>
        <div class="fold_scr">
          <div class="lnb_wide">
            <div class="menu01">
              <span>ISSUE TREND</span>
              <ul class="m_issue">
                <li >
                  <a href="main_index.php" >
                    <i class="remixicon-slideshow-line"></i>
                    <span class="svc_name">Dashboard</span>
                  </a>
                </li>

              </ul>
            </div>
            {/* <?php if (preg_match('/1/',$PORTAL_N_FLAG.$PORTAL_D_FLAG.$PORTAL_G_FLAG)) : ?> */}
            <div class="menu02">
              <span>PORTAL</span>
              <ul class="m_potal">
                {/* <?php if (preg_match('/1/',$PORTAL_N_FLAG)) : ?> */}
                <li class="menu_tit m_fold">
                  <a href="javascript:void(0);" class="m_tit">
                    <span class="menu_icon"></span>
                    <span class="svc_name">네이버</span>
                  </a>
                  <ul class="sub_menu">
                    {/* <?php if (substr($PORTAL_N_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=n">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($PORTAL_N_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_t100.php?class=n&page_type=all">브랜드 검색결과</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($PORTAL_N_FLAG, 2, 1)) : ?> */}
                    <li><a href="common_t100.php?class=n&page_type=new">검색 신규진입</a></li>
                    {/* <?php endif; ?> */}
                    {/* <!-- <li><a href="common_t100_progress.php?class=n">타겟 채널</a></li> --> */}
                    {/* <?php if (substr($PORTAL_N_FLAG, 3, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=n">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
                {/* <?php if (preg_match('/1/',$PORTAL_D_FLAG)) : ?> */}
                <li class="menu_tit m_fold">
                  <a href="javascript:void(0);" class="m_tit">
                    <span class="menu_icon"></span>
                    <span class="svc_name">다음</span>
                  </a>
                  <ul class="sub_menu">
                    {/* <?php if (substr($PORTAL_D_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=d">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($PORTAL_D_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_t100.php?class=d&page_type=all">브랜드 검색결과</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($PORTAL_D_FLAG, 2, 1)) : ?> */}
                    <li><a href="common_t100.php?class=d&page_type=new">검색 신규진입</a></li>
                    {/* <?php endif; ?> */}
                    {/* <!-- <li><a href="common_t100_progress.php?class=d">타겟 채널</a></li> --> */}
                    {/* <?php if (substr($PORTAL_D_FLAG, 3, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=d">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
                {/* <?php if (preg_match('/1/',$PORTAL_G_FLAG)) : ?> */}
                <li class="menu_tit m_fold">
                  <a href="javascript:void(0);" class="m_tit">
                    <span class="menu_icon"></span>
                    <span class="svc_name">구글</span>
                  </a>
                  <ul class="sub_menu">
                    {/* <?php if (substr($PORTAL_G_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=g">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($PORTAL_G_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_t100.php?class=g&page_type=all">브랜드 검색결과</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($PORTAL_G_FLAG, 2, 1)) : ?> */}
                    <li><a href="common_t100.php?class=g&page_type=new">검색 신규진입</a></li>
                    {/* <?php endif; ?> */}
                    {/* <!-- <li><a href="common_t100_progress.php?class=g">타겟 채널</a></li> --> */}
                    {/* <?php if (substr($PORTAL_G_FLAG, 3, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=g">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
              </ul>
            </div>
            {/* <?php endif; ?> */}
            {/* <?php if (preg_match('/1/',$SNS_Y_FLAG.$SNS_F_FLAG.$SNS_I_FLAG.$SNS_T_FLAG)) : ?> */}
            <div class="menu03">
              <span>SNS</span>
              <ul class="m_sns">
                {/* <?php if (preg_match('/1/',$SNS_I_FLAG)) : ?> */}
                <li class="menu_tit m_fold">
                  <a href="javascript:void(0);" class="m_tit">
                    <span class="menu_icon insta"></span>
                    <span class="svc_name">인스타그램</span>
                  </a>
                  <ul class="sub_menu m_fold">
                    {/* <?php if (substr($SNS_I_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=s&channel=i">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_I_FLAG, 2, 1)) : ?> */}
                    <li><a href="#">인기게시물</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_I_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=s&channel=i">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
                {/* <?php if (preg_match('/1/',$SNS_F_FLAG)) : ?> */}
                <li class="menu_tit m_fold m_fb">
                  <a href="javascript:void(0);" class="m_tit">
                    <i class="remixicon-facebook-box-fill"></i>
                    <span class="svc_name">페이스북</span>
                  </a>
                  <ul class="sub_menu">
                    {/* <?php if (substr($SNS_F_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=s&channel=f">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_F_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=s&channel=f">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
                {/* <?php if (preg_match('/1/',$SNS_T_FLAG)) : ?> */}
                <li class="menu_tit m_fold">
                  <a href="javascript:void(0);" class="m_tit">
                    <i class="remixicon-twitter-fill"></i>
                    <span class="svc_name">트위터</span>
                  </a>
                  <ul class="sub_menu">
                    {/* <?php if (substr($SNS_T_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=s&channel=t">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_T_FLAG, 2, 1)) : ?> */}
                    <li><a href="common_t100.php?class=s&page_type=all&channel=t">브랜드 검색결과</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_T_FLAG, 3, 1)) : ?> */}
                    <li><a href="#">인기트윗</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_T_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=s&channel=t">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
                {/* <?php if (preg_match('/1/',$SNS_Y_FLAG)) : ?> */}
                <li class="menu_tit m_fold m_yt">
                  <a href="javascript:void(0);" class="m_tit">
                    <i class="remixicon-youtube-fill"></i>
                    <span class="svc_name">유튜브</span>
                  </a>
                  <ul class="sub_menu">
                    {/* <?php if (substr($SNS_Y_FLAG, 0, 1)) : ?> */}
                    <li><a href="common_lately.php?class=s&channel=y">실시간 전체보기</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_Y_FLAG, 1, 1)) : ?> */}
                    <li><a href="common_t100.php?class=s&page_type=all&channel=y">브랜드 검색결과</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_Y_FLAG, 2, 1)) : ?> */}
                    <li><a href="common_t100.php?class=s&page_type=fame&channel=y">인기 컨텐츠</a></li>
                    {/* <?php endif; ?> */}
                    {/* <?php if (substr($SNS_Y_FLAG, 3, 1)) : ?> */}
                    <li><a href="common_lately_progress.php?class=s&channel=y">통계분석</a></li>
                    {/* <?php endif; ?> */}
                  </ul>
                </li>
                {/* <?php endif; ?> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar