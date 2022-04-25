import React from 'react'

const SearchFilter = () => {
  return (
    <div class="section">
      <div class="section_in">

        {/* <?php if ($page_type == "progress" || $page_type2 == 'analysis' || $page_type2 == 'progress') : ?> */}
        <div class="form_row form_select">
          <strong>주기</strong>
          <button type="button" class="interval_selector time" value="%Y-%m-%d %H" time_type="form_time">시간별</button>
          <button type="button" class="interval_selector day active" value="%Y-%m-%d" time_type="form_day">일간</button>
          <button type="button" class="interval_selector week" value="weekly" time_type="form_week">주간</button>
          <button type="button" class="interval_selector month" value="monthly" time_type="form_month">월간</button>
        </div>
        {/* <?php endif; ?> */}
        <div class="form_row form_term">
          {/* <?php if ($page_type == "progress" || $page_type2 == 'analysis' || $page_type2 == 'progress') { ?>
        <?php createDateFilterForProgress("period",$week_ago,$today); ?>
      <?php }else if ($class == "n" || $class == "d") { ?>
        <?php createDateFilter("period",$week_ago,$today); ?>
      <?php }else { ?>
        <?php createDateFilter("period",$week_ago,$today); ?>
      <?php } ?>
      <?php if(($page_type == 'lately' || $page_type == 'rpt') && $page_type2 != 'progress'){ ?>
        <span class="term_ref" style="width:auto;">기간이 31일을 초과하면서 동시에 검색결과가 5000개 이상이면 검색이 불가능합니다.</span>
      <?php }?>
      </div>
      <?php if ($page_type != "all_search") : ?> */}
          <div class="form_row form_divide form_slct">
            <strong>구분</strong>
            {/* <?php if(isset($channel) || $page_type == 'rpt' || $page_type == 'rpt_channel') $hidden = 'hidden'; else $hidden = ''; ?> */}
            <select class="keyword <?=$hidden?>" id="selected_channel">
              <option value="">채널타입 전체</option>
              {/* <?php while($channel = $result_channel->fetch_assoc()):?>
              <?php if($channel_name == $channel["issue_name"]) $selected = 'selected'; else $selected = ''; ?> */}
              {/* <option value="<?=$channel[" map_id"]?>" <?= $selected ?>><?=$channel["issue_name"]?></option> */}
              {/* // <?php endwhile;?> */}
            </select>
            {/* // <?php if(!empty($class) && $class == 'c') : ?> */}
            <select class="keyword" id="selected_channel_name">
              <option value="">채널 전체</option>
            </select>
            {/* <?php endif; ?>
        <?php if($page_type != "rpt_channel") : ?> */}
            <select class="keyword02" id="selected_keyword" onchange="selectfunction($(this))">
              <option value="">키워드 전체</option>
            </select>
            {/* <?php endif; ?> 
        <?php if($page_type != 'rpt_channel') :?> */}
            <select class="cafe hidden" id="selected_cafe" onchange="selectfunction($(this))">
              <option value=''>채널전체</option>
              <option value='pick'>PICK채널</option>
              <option value='target'>타겟채널</option>
              <option value='no_target'>타겟채널외</option>
            </select>
            {/* <?php endif; ?>
        <?php if ($page_type == "rpt_channel") :?> */}
            <select class="cafe_id target" id="selected_cafe_id_target">
              {/* <?php foreach ($cafe_id_array["target"] as $cafe_id) : ?> */}
              {/* <option value="<?=$cafe_id[" value"]?>"><?=$cafe_id["name"]?></option> */}
              {/* // <?php endforeach;?> */}
            </select>
            {/* // <?php endif; ?> */}
            {/* // <?php if ($page_type == "keyword_trends") : ?> */}
            <select class="keyword02" id="konlp-selector" name="konlp">
              <option value="off">단순빈도수</option>
              <option value="on">자연어필터</option>
            </select>
            <select class="keyword02" id="period-selector" name="period-selector">
              <option value="off">전체분석</option>
              <option value="on">월별분석</option>
            </select>
            {/* <?php endif; ?> */}
          </div>
          {/* <?php endif; ?> */}


          {/* <? php if ($page_type == "progress" || $page_type == "rpt" || $page_type == "lately" || $page_type == "all_search") : ?> */}
          <div class="form_row form_word">
            <strong>단어</strong>
            {/* <?php if ($page_type == "rpt") : ?> */}
            <input id="search_channel" type="text" value="" onchange="selectfunction($(this))" placeholder="채널이름 or 채널ID" />
            {/* <?php endif; ?> */}
            <input id="search_contents" type="text" value="" onchange="selectfunction($(this))" placeholder="제목/글요약 포함 단어" />
            <input id="search_not_contents" type="text" value="" onchange="selectfunction($(this))" placeholder="제목/글요약 제외 단어" />
            <input id="search_negative" type="text" value="" onchange="selectfunction($(this))" placeholder="부정어 or 체크 단어" />
          </div>
          {/* <?php endif; ?> */}
        </div >
        {/* < !--section_in end-- > */}
        {/* < !------------------------------------------------------- 채널 start-------------------------------------- --> */}
        {/* <? php if ($page_type == "all_search"): ?> */}
        {/* <? php $isFirst = false; $isFirstExists = false;?> */}
        <div class="form_row form_option fold_dft" id="option_section">
          <strong>채널</strong>
          {/* <?php if (preg_match('/1/',$PORTAL_N_FLAG)) : ?> */}
          {/* <?php if(!$isFirstExists) { $isFirst = true; $isFirstExists = true; } ?> */}
          <div class="option_wrap <?= $isFirst ? 'option_wrap_dft' : '' ?>">
            <button type="button" class="option_btn all active" data-type="naver_channel_type" >네이버 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($N_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a class="option_btn" role="button" data-type="naver_channel_type" data="<?=$value['map_id']?>">
                  {/* <?=preg_replace('/네이버/', '', $value['issue_name'])?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn not" role="button" data-type="naver_channel_type" data="" onclick="deselect($(this))" >선택안함</a></li>
              </ul>
              {/* <?php if($isFirst) : ?> */}
              <span class="fold_toggle"></span>
              {/* <?php endif; ?> */}
            </div>
          </div>
          {/* <?php else: ?> */}
          <div class="option_wrap ">
            <button type="button" data-type="naver_channel_type" disabled="disabled">네이버 ALL</button>
            <div class="option_in off">
              <ul>
                {/* <?php foreach($N_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                {/* <li><a style="cursor : default " data="<?=$value['map_id']?>"><?=$value['issue_name']?></a></li> */}
                {/* <?php endforeach;?> */}
              </ul>
            </div>
          </div>
          {/* <?php if($isFirst) {$isFirst = false; } ?>
          <?php endif; ?> */}


          {/* <?php if (preg_match('/1/',$PORTAL_D_FLAG)) : ?> */}
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="daum_channel_type">다음 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($D_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a class="option_btn" role="button" data-type="daum_channel_type" data="<?=$value['map_id']?>">
                  {/* <?=preg_replace('/다음/', '', $value['issue_name'])?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn not" role="button" data-type="daum_channel_type" data="">선택안함</a></li>
              </ul>
            </div>
          </div>
          {/* <?php else: ?> */}
          <div class="option_wrap ">
            <button type="button" data-type="daum_channel_type" disabled="disabled">다음 ALL</button>
            <div class="option_in off">
              <ul>
                {/* <?php foreach($D_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a style={{ cursor: "default" }} data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
              </ul>
            </div>
          </div>
          {/* <?php endif; ?> */}

          {/* <?php if (preg_match('/1/',$PORTAL_G_FLAG)) : ?> */}
          <div class="option_wrap ">
            <button type="button" class="option_btn all active" data-type="google_channel_type">구글 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($G_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                {/* <li><a class="option_btn" role="button" data-type="google_channel_type" data="<?=$value['map_id']?>"><?=preg_replace('/구글/', '', $value['issue_name'])?></a></li> */}
                {/* <?php endforeach;?> */}
                <li><a class="option_btn not" role="button" data-type="google_channel_type" data="">선택안함</a></li>
              </ul>
            </div>
          </div>
          {/* <?php else: ?> */}
          <div class="option_wrap">
            <button type="button" data-type="google_channel_type" disabled="disabled">구글 ALL</button>
            <div class="option_in off">
              <ul>
                {/* <?php foreach($G_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a style={{ cursor: "default" }} data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
              </ul>
            </div>
          </div>
          {/* <?php endif; ?> */}

          {/* <?php if (preg_match('/1/',$SNS_Y_FLAG.$SNS_F_FLAG.$SNS_I_FLAG.$SNS_T_FLAG)) : ?> */}
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="sns_channel_type">SNS ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php for($i=0; $i< count($S_CHANNEL_ARR); $i++) : ?>
                <?php if (preg_match('/1/', $S_CHANNEL_ARR[$i])) : ?> */}
                <li><a class="option_btn" role="button" data-type="sns_channel_type" data="<?=$S_CHANNEL_TYPE_ARR[$i]['map_id']?>">
                  {/* <?=$S_CHANNEL_TYPE_ARR[$i]['issue_name']?> */}
                </a></li>
                {/* <?php else: ?> */}
                <li><a class="option_wrap off" role="button" style={{ cursor: "default" }} data-type="sns_channel_type" data="<?=$S_CHANNEL_TYPE_ARR[$i]['map_id']?>">
                  {/* <?=$S_CHANNEL_TYPE_ARR[$i]['issue_name']?> */}
                </a></li>
                {/* <?php endif; ?>
                <?php endfor; ?> */}
                <li><a class="option_btn not" role="button" data-type="sns_channel_type" data="">선택안함</a></li>
              </ul>
            </div>
          </div>
          {/* <?php else: ?> */}
          <div class="option_wrap">
            <button type="button" data-type="sns_channel_type" disabled="disabled">SNS ALL</button>
            <div class="option_in off">
              <ul>
                {/* <?php foreach($S_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a style={{ cursor: "default" }} data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
              </ul>
            </div>
          </div>
          {/* <?php endif; ?> */}

          {/* <?php if (preg_match('/1/',$COMMUNITY_FLAG)) :?> */}
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="com_channel_type">커뮤니티 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($C_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a class="option_btn" role="button" data-type="com_channel_type" data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn not" role="button" data-type="com_channel_type" data="">선택안함</a></li>
              </ul>
            </div>
          </div>
          {/* <?php else: ?> */}
          <div class="option_wrap ">
            <button type="button" data-type="com_channel_type" disabled="disabled">커뮤니티 ALL</button>
            <div class="option_in off">
              <ul>
                {/* <?php foreach($C_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a style={{ cursor: "default" }} data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
              </ul>
            </div>
          </div>
          {/* <?php endif; ?> */}


          {/* <?php if (preg_match('/1/',$REVIEW_N_FLAG.$REVIEW_K_FLAG.$REVIEW_G_FLAG.$REVIEW_B_FLAG.$REVIEW_Y_FLAG.$REVIEW_M_FLAG)) :?> */}
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="review_channel_type">리뷰 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php for($i=0; $i< count($R_CHANNEL_ARR); $i++) : ?>
                <?php if (preg_match('/1/', $R_CHANNEL_ARR[$i])) : ?> */}
                <li><a class="option_btn" role="button" data-type="review_channel_type" data="<?=$R_CHANNEL_TYPE_ARR[$i]['map_id']?>">
                  {/* <?=$R_CHANNEL_TYPE_ARR[$i]['issue_name']?> */}
                </a></li>
                {/* <?php else: ?> */}
                <li class="off"><a class="option_wrap off" role="button" style={{ cursor: "default" }} data-type="review_channel_type" data="<?=$R_CHANNEL_TYPE_ARR[$i]['map_id']?>">
                  {/* <?=$R_CHANNEL_TYPE_ARR[$i]['issue_name']?> */}
                </a></li>
                {/* <?php endif; ?>
                <?php endfor; ?> */}
                <li><a class="option_btn not" role="button" data-type="review_channel_type" data="">선택안함</a></li>
              </ul>
            </div>
          </div>
          {/* <?php else: ?> */}
          <div class="option_wrap">
            <button type="button" data-type="review_channel_type" disabled="disabled">리뷰 ALL</button>
            <div class="option_in off">
              <ul>
                {/* <?php foreach($R_CHANNEL_TYPE_ARR AS $value) :  ?> */}
                <li><a style={{ cursor: "default" }} data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
              </ul>
            </div>
          </div>
          {/* <?php endif; ?> */}

          {/* <!-- TODO: 채널별로 데이터 저장되는 hidden div 추가-->
          <!-- save selected option start --> */}
          <div id="naver_channel_type" class="" text="" hidden></div>
          <div id="daum_channel_type" class="" text="" hidden></div>
          <div id="google_channel_type" class="" text="" hidden></div>
          <div id="sns_channel_type" class="" text="" hidden></div>
          <div id="com_channel_type" class="" text="" hidden></div>
          <div id="review_channel_type" class="" text="" hidden></div>

          {/* <!-- save selected option end --> */}
          <div class="slced_line fold">
            <button type="button" class="btn_rs">초기화</button>
            <a role="button" class="all"> 상세 검색옵션을 선택하세요.</a>
            {/* <!-- TODO: 채널별로 선택된 항목 보여주는 리스트(?)--> */}
            <a role="button" class="naver_channel_type_title hidden"> 네이버:</a>
            <a role="button" class="naver_channel_type hidden"> all</a>
            <a role="button" class="daum_channel_type_title hidden"> 다음:</a>
            <a role="button" class="daum_channel_type hidden"> all</a>
            <a role="button" class="google_channel_type_title hidden"> 구글:</a>
            <a role="button" class="google_channel_type hidden"> all</a>
            <a role="button" class="sns_channel_type_title hidden"> SNS:</a>
            <a role="button" class="sns_channel_type hidden"> all</a>
            <a role="button" class="com_channel_type_title hidden"> 커뮤니티:</a>
            <a role="button" class="com_channel_type hidden"> all</a>
            <a role="button" class="review_channel_type_title hidden"> 리뷰:</a>
            <a role="button" class="review_channel_type hidden"> all</a>
            <span class="fold_toggle"></span>
          </div>
        </div>
        {/* <?php endif; ?>
        < !------------------------------------------------------- 채널 end-------------------------------------- -->
        < !--section_in end-- > */}
        <div class="form_row form_option" id="option_section" >
          <strong>옵션</strong>
          <div class="option_wrap option_wrap_dft">
            <button type="button" class="option_btn all" data-type="rate">평판 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php while($data_rate = $result_rate->fetch_assoc()):?> */}
                <li><a class="option_btn" role="button" data-type="rate" data="<?=$data_rate['issue_value']?>" >
                  {/* <?=$data_rate['issue_name']?> */}
                </a></li>
                {/* <?php endwhile;?> */}
                {/* <!-- <li><a class="option_btn" role="button" data-type="rate" data="null">정보없음</a></li> --> */}
              </ul>
              <span class="fold_toggle"></span>
            </div >
          </div >
          {/* <?php if ($user_level == 0) : ?> */}
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="MLrate">ML평판 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php $result_rate = sql_query(makeOptionQuery(4,false)); ?> */}
                {/* <?php while($data_rate = $result_rate->fetch_assoc()):?> */}
                <li><a class="option_btn" role="button" data-type="MLrate" data="<?=$data_rate['issue_value']?>">
                  {/* <?=$data_rate['issue_name']?> */}
                </a></li>
                {/* <?php endwhile;?> */}
                <li><a class="option_btn" role="button" data-type="MLrate" data="null">정보없음</a></li>
              </ul>
            </div>
          </div>
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="Vrate">V평판 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php $result_rate = sql_query(makeOptionQuery(4,false)); ?>
                <?php while($data_rate = $result_rate->fetch_assoc()):?> */}
                <li><a class="option_btn" role="button" data-type="Vrate" data="<?=$data_rate['issue_value']?>">
                  {/* <?=$data_rate['issue_name']?> */}
                </a></li>
                {/* <?php endwhile;?> */}
                <li><a class="option_btn" role="button" data-type="Vrate" data="null">정보없음</a></li>
              </ul>
            </div>
          </div>
          {/* <?php endif; ?> */}
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="brand">브랜드 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($BRAND_ARR AS $value) :
          if($user_level==100)
            $value['issue_name'] = replaceString($value['issue_name']); ?> */}
                <li><a class="option_btn" role="button" data-type="brand" data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn" role="button" data-type="brand">정보없음</a></li>
              </ul>
            </div>
          </div >
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="product_type">제품타입 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($PRODUCT_TYPE_ARR AS $value) : ?> */}
                <li><a class="option_btn" role="button" data-type="product_type" data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn" role="button" data-type="product_type" data="null">정보없음</a></li>
              </ul>
            </div>
          </div>
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="product">제품 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($PRODUCT_ARR AS $value) :?> */}
                <li><a class="option_btn" role="button" data-type="product" data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn" role="button" data="null">정보없음</a></li>
              </ul>
            </div>
          </div>
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="category">유형 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($CATEGORY_ARR AS $value) :?> */}
                <li><a class="option_btn" role="button" data-type="category" data="<?=$value['map_id']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn" role="button" data-type="category" data="null">정보없음</a></li>
              </ul>
            </div>
          </div>
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="detail">디테일 ALL</button>
            <div class="option_in">
              <ul>
                {/* <?php foreach($DETAIL1_ARR AS $value) :?> */}
                <li><a class="option_btn" role="button" data-type="detail" data="<?=$value['issue_value']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <br />
                {/* <?php foreach($DETAIL2_ARR AS $value) :?> */}
                <li><a class="option_btn" role="button" data-type="detail" data="<?=$value['issue_value']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <br />
                {/* <?php foreach($DETAIL3_ARR AS $value) :?> */}
                <li><a class="option_btn" role="button" data-type="detail" data="<?=$value['issue_value']?>">
                  {/* <?=$value['issue_name']?> */}
                </a></li>
                {/* <?php endforeach;?> */}
                <li><a class="option_btn" role="button" data-type="detail" data="null">정보없음</a></li>
              </ul>
            </div>
          </div>
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="c_confirm">CHECK ALL</button>
            <div class="option_in">
              <ul>
                <li><a class="option_btn" role="button" data-type="c_confirm">CHECK</a></li>
                <li><a class="option_btn" role="button" data-type="c_confirm">NOT CHECK</a></li>
              </ul>
            </div>
          </div >
          <div class="option_wrap">
            <button type="button" class="option_btn all active" data-type="pick">PICK ALL</button>
            <div class="option_in">
              <ul>
                <li><a class="option_btn" role="button" data-type="pick">PICK</a></li>
                <li><a class="option_btn" role="button" data-type="pick">NOTPICK</a></li>
              </ul>
            </div >
          </div >
          {/* <? php if ($user_level < 100): ?> */}
          <div class="adm_color">
            <div class="option_wrap">
              <button type="button" class="option_btn all active" data-type="check">체크 ALL</button>
              <div class="option_in">
                <ul>
                  {/* <?php foreach($CHECK_STATE_ARR AS $value) : ?> */}
                  <li><a class="option_btn" role="button" data-type="check" data="<?=$value['issue_value']?>">
                    {/* <?=$value["issue_name"]?> */}
                  </a></li>
                  {/* <?php endforeach;?> */}
                </ul>
              </div>
            </div>
            <div class="option_wrap">
              <button type="button" class="option_btn all active" data-type="confirm">검수확인 ALL</button>
              <div class="option_in">
                <ul>
                  <li><a class="option_btn" role="button" data-type="confirm">확인</a></li>
                  <li><a class="option_btn" role="button" data-type="confirm">미확인</a></li>
                </ul>
              </div>
            </div >
            <div class="option_wrap">
              <button type="button" class="option_btn all active" data-type="memo">메모 ALL</button>
              <div class="option_in">
                <ul>
                  <li><a class="option_btn" role="button" data-type="memo" data=">">메모있음</a></li>
                  <li><a class="option_btn" role="button" data-type="memo" data="=">메모없음</a></li>
                </ul>
              </div>
            </div>
            <div class="option_wrap">
              <button type="button" class="option_btn all active" data-type="kwd" data="">메모작성 ALL</button>
              <div class="option_in">
                <ul>
                  <li><a class="option_btn" role="button" data-type="kwd" data="hjk">hjk</a></li>
                  <li><a class="option_btn" role="button" data-type="kwd" data="bma">bma</a></li>
                  <li><a class="option_btn" role="button" data-type="kwd" data="rvf">rvf</a></li>
                  <li><a class="option_btn" role="button" data-type="kwd" data="opr">opr</a></li>
                  <li><a class="option_btn" role="button" data-type="kwd" data="admin">기타</a></li>
                </ul>
              </div>
            </div>
          </div >
          {/* <? php endif; ?>
          <? php if ($user_level == 0): ?> */}
          <div class="adm_color">
            <div class="option_wrap">
              <button type="button" class="option_btn all active" data-type="bad">부정내역 ALL</button>
              <div class="option_in">
                <ul>
                  <li><a class="option_btn" role="button" data-type="bad" data="!=">부정내역있음</a></li>
                  <li><a class="option_btn" role="button" data-type="bad" data="=">부정내역없음</a></li>
                </ul>
              </div>
            </div>
            <div class="option_wrap">
              <button type="button" class="option_btn all active" data-type="issue">이슈분류 ALL</button>
              <div class="option_in">
                <ul>
                  <li><a class="option_btn" role="button" data-type="issue" data="!=">완료</a></li>
                  <li><a class="option_btn" role="button" data-type="issue" data="NOT">미비</a></li>
                  <li><a class="option_btn" role="button" data-type="issue" data="=">미완료</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* <?php endif; ?>
    <!-- save selected option start --> */}
          <div id="rate" text="" hidden ></div >
          <div id="MLrate" class="" text="" hidden></div>
          <div id="Vrate" class="" text="" hidden></div>
          <div id="brand" class="" text="" hidden></div>
          <div id="product_type" class="" text="" hidden></div>
          <div id="product" class="" text="" hidden></div>
          <div id="category" class="" text="" hidden></div>
          <div id="detail" class="" text="" hidden></div>
          <div id="c_confirm" class="" text="" hidden></div>
          <div id="pick" class="" text="" hidden></div>
          <div id="check" class="" text="" hidden></div>
          <div id="confirm" class="" text="" hidden></div>
          <div id="memo" class="" text="" hidden></div>
          <div id="kwd" class="" text="" hidden></div>
          <div id="bad" class="" text="" hidden></div>
          <div id="issue" class="" text="" hidden></div>
          {/* <!--save selected option end-- > */}
          <div class="slced_line fold">
            <button type="button" class="btn_rs">초기화</button>
            <a role="button" class="all"> 상세 검색옵션을 선택하세요.</a>
            <a role="button" class="rate_title hidden"> 평판:</a>
            <a role="button" class="rate hidden">
              {/* <?=$negative!=0?"부정":"all"?> */}
            </a>
            {/* <?php if($user_level == 0): ?> */}
            <a role="button" class="MLrate_title hidden"> ML평판:</a>
            <a role="button" class="MLrate hidden">
              {/* <?=$negative!=0?"부정":"all"?> */}
            </a>
            <a role="button" class="Vrate_title hidden"> V평판:</a>
            <a role="button" class="Vrate hidden">
              {/* <?=$negative!=0?"부정":"all"?> */}
            </a>
            {/* <?php endif; ?> */}
            <a role="button" class="brand_title hidden"> 브랜드:</a>
            <a role="button" class="brand hidden"> all</a>
            <a role="button" class="product_type_title hidden"> 제품타입:</a>
            <a role="button" class="product_type hidden"> all</a>
            <a role="button" class="product_title hidden"> 제품:</a>
            <a role="button" class="product hidden"> all</a>
            <a role="button" class="category_title hidden"> 카테고리: </a>
            <a role="button" class="category hidden"> all</a>
            <a role="button" class="detail_title hidden"> 디테일: </a>
            <a role="button" class="detail hidden"> all</a>
            <a role="button" class="c_confirm_title hidden"> CHECK: </a>
            <a role="button" class="c_confirm hidden"> all</a>
            <a role="button" class="pick_title hidden"> PICK:</a>
            <a role="button" class="pick hidden"> all</a>
            {/* <?php if($user_level < 100): ?> */}
            <a role="button" class="check_title hidden"> 체크:</a>
            <a role="button" class="check hidden"> all</a>
            <a role="button" class="confirm_title hidden"> 검수확인: </a>
            <a role="button" class="confirm hidden"> all</a>
            <a role="button" class="memo_title hidden"> 메모:</a>
            <a role="button" class="memo hidden"> all</a>
            {/* <?php endif; ?>
    <?php if($user_level == 0): ?> */}
            <a role="button" class="bad_title hidden"> 부정내역:</a>
            <a role="button" class="bad hidden"> all</a>
            <a role="button" class="issue_title hidden"> 이슈분류:</a>
            <a role="button" class="issue hidden"> all</a>
            {/* <?php endif; ?> */}
            <span class="fold_toggle"></span>
          </div>
        </div >
        {/* < !--section_in end-- > */}
        <div class="button_wrap" >
          <button type="button" class="btn_big search_btn">검색</button>
        </div>
      </div >
    </div >
  )
}

export default SearchFilter