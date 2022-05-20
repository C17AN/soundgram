// 페이지 생성
function getHTMLPageData(page) {
	var returnData = "";

	$.ajax({
     	//url: ""+soundgramApi.diskpath.split("/")[0]+"/pages/"+page+".html"
     	url: ""+soundgramApi.diskpath + "/pages/"+page+".html"
     	, type: "POST"
     	, async: false
     }).done(function(data) {
     	returnData = data;
     });

     return returnData;
}

// 리스트 생성
function getHTMLListData(page) {
	var returnData = "";

	$.ajax({
     	//url: ""+soundgramApi.diskpath.split("/")[0]+"/pages/"+page+".html"
     	url: ""+soundgramApi.diskpath + "/lists/"+page+".html"
     	, type: "POST"
     	, async: false
     }).done(function(data) {
     	returnData = data;
     });

     return returnData;
}

// 서브메뉴 타이틀 생성 21.04.06
function makeSubmenuTitle(lm) {
	var  title = "cover";

	if(lm=="aa") title = "artist";
	else if(lm=="ab") title = "album info";
	else if(lm=="ac") title = "credit";
	else if(lm=="al") title = "track list";
	else if(lm=="al") title = "track list";
	else if(lm=="bo") title = "gallery";
	else if(lm=="vi") title = "video";
	else if(lm=="th") title = "thanks to";

	return title;
}

function makePromotionPopup() {
	var HTML = "";
	
	HTML
	= "<div class='promotion_wrap'>"
    + "<div class='promotion_wrap_in'>"
    + "<div class='promotion_img_wrap'>"
    + "<img src='images/popup.jpg' alt='네비게이션 메뉴 터치' class='guide_img01'/>"
    + "</div>"
    + "<div class='promotion_txt_wrap'>"
    + "<div class='popup_close_wrap'>"
    + "<img src='images/popup_checked.png' alt='다시 보지 않기' />"
    + "<span onclick='javascript:todaycloseWin();'>오늘은 그만 보기</span>"
    + "</div>"
    + "<p class='promotion_close' onclick='javascript:closeWin();'>닫기</p>"
    + "</div>"
    + "</div>"
	+ "</div>"

	return HTML;
}

function makeHeader(album_type) {
	var HTML = "";

	if(album_type=="s") {
		HTML
		= "<header id='tb01'>"
    	+ "<nav>"
		+ "<ul class='tb_menu'>"
		+ "<a id='0'><li id='0' class='tb_ho_off'></li></a>"
		+ "<a id='1'><li id='1' class='tb_al_off'></li></a>"
		+ "<a id='2'><li id='2' class='tb_pl_off'></li></a>"
		+ "<a id='3'><li id='3' class='tb_ga_off'></li></a>"
		+ "<a id='4'><li id='4' class='tb_st_off'></li></a>"
		+ "</ul>"
    	+ "</nav>"
  		+ "</header>";
	}
	else {
		HTML
		= "<div id='openleftmenu' class='menu'></div>"
		+ "<header id='me02' class='hidden'>"
		+ "<div class='fl_right'></div>"
		+ "<nav class='navClass'>"
		+ "<span id='closeleftmenu' class='close'></span>"
		+ "<div id='leftmenu_profile' class='profile' style='' >"
		+ "</div>"
		+ "<h4 id='nick'>로그인을 해주세요.</h4>"
		+ "<hr>"
		+ "<ul class='menu_main'>"
		+ "<a id='0'><li id='0' class='over'>cover</li></a>"
		+ "<a id='1'><li id='1' class=''>track list</li></a>"
		+ "<a id='2'><li id='2' class=''>booklet</li></a>"
		+ "<a id='3'><li id='3' class=''>video</li></a>"
		+ "<a id='4'><li id='4' class=''>thanks to</li></a>"
		+ "</ul>"
		+ "<hr>"
		+ "<ul class='menu_sub'>"
		+ "<li class='sub_01'>schedule</li>"
		+ "<li class='sub_02'>sns</li>"
		+ "<li class='sub_03'>talk</li>"
		+ "</ul>"
		+ "<div class='logo'></div>"
		+ "</nav>"
		+ "</header>"
		;
	}

	return HTML;
}

function makeMainPages(type, diskid) {
	var HTML = "";

	if(type=="ho01") {
		HTML
		= "<div id='ho01' class='swiper-slide'>"
		+ "<div class='cover_img' style='background-image:url("+soundgramApi.diskpath+"/"+diskid+"/images/server/cover.png');'><span class='cover_effect'></span></div>"
		+ "<div class='cover_txt'>"
		+ "<h1 class='cv_title'></h1>"
		+ "<h2 class='cv_artist'></h2>"
		+ "<h3 class='cv_album'></h3>"
		+ "<p><span id='infomation' class='btn_info'></span></p>"
		+ "</div>"
		+ "</div>"
	}
	else if(type=="ho02") {
		HTML
		= "<div id='ho02' class='swiper-slide' style='width: 100%;'>"
		+ "<div class='cover_img1 hidden'></div>"
		+ "<div class='cover_img2 hidden'></div>"
		+ "<div class='cover_img3 hidden'></div>"
		+ "<h1 class='cover_title hidden'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/ho02_img_title_album.png' width='100%' alt='앨범타이틀'></h1>"
		+ "<h2 class='cover_artist hidden'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/ho02_img_title_artist.png' width='100%' alt='가수명'></h2>"
		+ "<p class='cover_txt txt_11 hidden'>세븐시즌스 / 지니뮤직</p>"
		+ "</div>"
	}
	else if(type=="al01") {
		HTML
		= "<div id='al01' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1>TRACK LIST</h1>"
		+ "<div class='list_albumcover' style='background-image: url("+soundgramApi.diskpath+"/"+diskid+"/images/server/cover.png)'>"
		+ "</div>"
		+ "<div class='list_albuminfo'>"
		+ "<div>"
		+ "<h2 class='list_title'>MARISKA</h2>"
		+ "<h3 class='list_artist'>Jerry James</h3>"
		+ "<div class='list_info'>EP</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div class='vertical_playlist swiper-container hidden' style='width:100%;'>"
		+ "<ul class='songlist swiper-wrapper'>"
		+ "</ul>"
		+ "<div class='swiper-scrollbar playlist_scollbar hidden'>"
		+ "</div>"
		+ "</div>"
		+ "</div>";
	}
	else if(type=="al02") {
		HTML
		= "<div id='al02' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/al02_img_title.png' alt='페이지타이틀' width='100%'></h1>	"
		+ "<div class='list_albumcover' style='background-image: url("+soundgramApi.diskpath+"/"+diskid+"/images/al02_img_title.jpg)' >"
		+ "</div>"
		+ "<div class='list_albuminfo'>"
		+ "<div>"
		+ "<h2 class='list_title'></h2>"
		+ "<h3 class='list_artist'></h3>"
		+ "<a href='#'><div class='list_info'><strong>EP</strong><span id='albuminfo'>앨범소개</span></div></a>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div class='vertical_playlist swiper-container hidden' style='width:100%; height:40%'>"
		+ "<ul class='songlist swiper-wrapper'></ul>"
		+ "<div class='swiper-scrollbar playlist_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>"
	}
	else if(type=="pl01") {
		HTML
		= "<div id='pl01' class='swiper-slide'>"
		+ "<div class='play_eq'>"
		+ "<h1 class='play_title'></h1>"
		+ "<h4 class='play_artist'></h4>"
		+ "<div class='play_img'>"
		+ "<div class='player_swiper swiper-container' style='width:100%'>"
		+ "<div id='p_swipe' class='swiper-wrapper'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "<div class='play_control'>"
		+ "<div class='play_btn'>"
		+ "<dl>"
		+ "<dd><button class='pl_pre'></button></dd>"
		+ "<dd><button id='plpa_btn' class='pl_play'></button></dd>"
		+ "<dd><button class='pl_nex'></button></dd>"
		+ "</dl>"
		+ "<dl>"
		+ "<dd class='fl_left'><button class='pl_lyc'></button></dd>"
		+ "<dd id='songlike_play'></dd>"
		+ "<dd class='fl_right'><button class='pl_repon'></button></dd>"
		+ "</dl>"
		+ "<dl class='bar'>"
		+ "<div class='playbar progress col-12 mb-3'>"
		+ "<dd id='playerbar' class='bar_on' style='width: 0%'></dd>"
		+ "</div>"
		+ "<dd id='currTime' class='play_on fl_left'>00:00</dd>"
		+ "<dd id='endTime' class='fl_right'>00:00</dd>"
		+ "</dl>"
		+ "<div style='width:0;height:0'>"
		+ "<audio id='playMusic' preload='metadata' onended='playend()'>"
		+ "<source id='audiofile' type='audio/mpeg' />"
		+ "</audio>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
	}
	else if(type=="ga01") {
		HTML
		= "<div id='ga01' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1>GALLARY</h1>"
		+ "</div>"
		+ "<div class='vertical_vb swiper-container hidden' style='width:100%;'>"
		+ "<div class='gallary swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar vb_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>";
	}
	else if(type=="bo02") {
		HTML
		= "<div id='bo02' class='swiper-slide'>"
		+ "<div id='booklet_pagetitle' class='page_title'>"
		+ "<h1 class='hidden'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/bo02_img_title.png' alt='페이지타이틀' width='100%'></h1>"
		+ "</div>"
		+ "<div class='booklet_img hidden' style='height:70%;width:100%'>"
		+ "<div class='swiper-container vertical_booklet' style='width:100%'>"
		+ "<div id='booklet_img_list' class='swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar booklet_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>";
	}
	else if(type=="vi02") {
		HTML
		= "<div id='vi02' class='swiper-slide'>"
		+ "<div id='video_pagetitle' class='page_title'>"
		+ "<h1 class='hidden'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/vi02_img_title.png' alt='페이지타이틀' width='100%'></h1>	"
		+ "</div>"
		+ "<div class='video hidden' style='height:70%;width:100%'>"
		+ "<div class='swiper-container vertical_video' style='width:100%'>"
		+ "<div id='video_list' class='swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar video_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>";
	}
	else if(type=="st01") {
		HTML
		= "<div id='st01'  class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1>ALBUM STORY</h1>"
		+ "<div class='thanks_profile' style='background-image: url("+soundgramApi.diskpath+"/"+diskid+"/images/server/ga01_img_01.jpg)'>"
		+ "</div>"
		+ "</div>"
		+ "<div class='thanks_contants'>"
		+ "</div>"
		+ "</div>"
	}
	else if(type=="th02") {
		HTML
		= "<div id='th02' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1 class='hidden'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/th02_img_title.png' alt='페이지타이틀' width='100%'></h1>"
		+ "</div>"
		+ "<div class='thanks hidden' style='height:70%;width:100%'>"
		+ "<div class='swiper-container vertical_thanksto' style='width:100%'>"
		+ "<div id='thanks_list' class='swiper-wrapper' style='width: calc(100% - 40px);margin: 0 20px;'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar thanks_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>";
	}
	else if(type=="ar01") {
		HTML
		= "<div id='ar01' class='swiper-slide'>"
		+ "</div>";
	}

	return HTML;
}

function makeContainerPopup() {
	var HTML = "";

	HTML
	= "<div id='cu01_d'>"
	+ "<div class='mb_title'>"
	+ "<h2>이용 약관</h2>"
	+ "</div>"
	+ "<div class='mb_content'>"
	+ "<div class='mb_text'>"
	+ "제 1 장 : 총칙<br>"
	+ "제 2 장 : 계약당사자의 의무<br>"
	+ "제 3 장 : 서비스 이용<br>"
	+ "제 4 장 : 기타<br><br>"
	+ "제1장 총 칙<br><br>"
	+ "제1조 (목적)<br>"
	+ "이 약관은 회원이 주식회사 사운드그램(이하 “회사”라 합니다)에서 제공하는 무선 인터넷 음악서비스인 사운드그램 모바일 음반 서비스(이하 ‘서비스'라 합니다)를 이용함에 있어 회원과 회사간의 권리, 의무 및 책임사항, 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.<br><br>"
	+ "제2조 (용어의 정의)<br>"
	+ "이 약관에서 사용하는 용어의 정의는 다음 각 호와 같습니다.<br>"
	+ "서비스 : 구현되는 단말기(휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이 '이용자'가 이용할 수 있는 모바일 음반의 서비스를 의미합니다.이용자 : 본 약관에 따라 회사가 제공하는 서비스를 받는 자게시물 : 이용자가 서비스를 이용함에 있어 서비스 상에 게시한 부호ㆍ문자ㆍ음성ㆍ음향ㆍ화상ㆍ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.게시자 : 사운드그램 모바일 음반에서 제공하는 서비스를 통해 자신의 게시물을 등록한 이용자운영자 : 서비스의 전반적인 관리와 원활한 운영을 위하여 회사가 선정한 자<br><br>"
	+ "제3조 (약관의 효력 및 변경)<br>"
	+ "이용자는 변경된 약관에 동의하지 않을 경우 서비스 이용 내용 삭제를 요청할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이후에도 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.<br>"
	+ "이 약관은 대한민국 및 해외에서 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력이 발생합니다. 이 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공시하고, 이에 동의한 회원이 서비스에 가입함으로써 효력이 발생합니다. 회사는 회원이 동의하기에 앞서 약관의 내용을 회원이 쉽게 이해하여 착오 없이 거래할 수 있도록 별도의 연결 화면 또는 팝업 화면 등을 제공하여 회원의 확인을 구합니다.회사는 필요하다고 인정되는 경우 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 서비스 화면에 공지하며, 공지 후 7일 이후에도 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 본인의 회원 등록을 취소할 수 있으며, 계속 사용하시는 경우에는 약관 변경에 동의한 것으로 간주되며 변경된 약관은 전항과 같은 방법으로 효력이 발생합니다.<br><br>"
	+ "제4조 (약관 외 준칙)<br>"
	+ "이 약관에 명시되지 않은 사항은 콘텐츠산업진흥법, 전자상거래등에서의 소비자보호에 관한 법률, 저작권법 등 관련 법령의 규정과 일반 상관례에 의합니다.<br><br>"
	+ "제2장 계약당사자의 의무<br><br>"
	+ "제5조 (회사의 의무)<br>"
	+ "회사는 서비스 제공과 관련해서 알고 있는 회원의 신상 정보를 본인의 승낙 없이 제3자에게 누설하거나 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 또는 기타 관계법령에서 정한 절차에 의한 요청이 있을 경우에는 그러하지 아니합니다.<br><br>"
	+ "제6조 (이용자의 의무)<br>"
	+ "이용자는 서비스를 이용할 때 다음 각 호의 행위를 하지 않아야 합니다.다른 회원의 ID를 부정하게 사용하는 행위 서비스에서 얻은 정보를 복제, 출판 또는 제3자에게 제공하는 행위회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위 공공질서 및 미풍양속에 위반되는 내용을 유포하는 행위 범죄와 결부된다고 객관적으로 판단되는 행위 기타 관계법령에 위반되는 행위 이용자는 서비스를 이용하여 영업활동을 할 수 없으며, 영업활동에 이용하여 발생한 결과에 대하여 회사는 책임을 지지 않습니다.이용자는 서비스의 이용권한, 기타 이용계약상 지위를 타인에게 양도하거나 증여할 수 없으며, 이를 담보로도 제공할 수 없습니다.<br><br>"
	+ "제3장 서비스 이용<br><br>"
	+ "제7조 (이용자의 의무)<br>"
	+ " 이용자는 필요에 따라 자신의 메일, 게시판, 등록 자료 등 유지보수에 대한 관리책임을 갖습니다. 회사에서 제공하는 자료를 임의로 삭제, 변경할 수 없습니다.이용자는 회사의 모바일 음반에서 공공질서 및 미풍양속에 위반되는 내용물이나 제3자의 저작권 등 기타 권리를 침해하는 내용물을 등록하는 행위를 하지 않아야 합니다. 만약 이와 같은 내용물을 게재하였을 때 발생하는 결과에 대한 모든 책임은 회원에게 있습니다.만 14세 미만의 미성년자 회원의 경우 법정대리인의 동의를 구해야 합니다.<br><br>"
	+ "제8조 (게시물 관리 및 삭제)<br>"
	+ "회사는 효율적인 서비스 운영을 위하여 회원의 메모리 공간, 메시지 크기, 보관일 수 등을 제한할 수 있으며 회원이 게시하거나 전달하는 서비스 내의 내용물(회원간 전달 포함)이 다음 각 호의 경우에 해당한다고 판단되는 경우 사전통지 없이 삭제할 수 있으며, 이에 대해 회사는 어떤 책임도 지지 않습니다.<br>"
	+ "회사, 다른 회원 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등의 유포에 해당하는 경우 범죄적 행위에 결부된다고 인정되는 내용인 경우 회사의 저작권, 제3자의 저작권, 모바일 음반 콘텐츠의 저작권 및 초상권 등 기타 권리를 침해하는 내용인 경우회사에서 제공하는 서비스와 관련 없는 내용인 경우승인되지 않은 광고, 판촉물을 게재하는 경우이용자가 음란물을 게재하거나 음란 사이트를 링크하는 경우 기타 관계법령에 위반된다고 판단되는 경우<br><br>"
	+ "제9조 (게시물의 저작권)<br>"
	+ "게시물의 저작권은 게시자 본인에게 있으며 이용자는 서비스를 이용하여 얻은 정보를 가공, 판매하는 행위 등 서비스에 게재된 자료를 상업적으로 사용할 수 없습니다. 게시물과 관련하여 발생하는 부분에 대해서는 게시자에게 그 책임이 있습니다.회사는 회원이 서비스 내에 게시한 게시물이 타인의 저작권, 프로그램 저작권 등을 침해하더라도 이에 대한 민, 형사상의 책임을 부담하지 않습니다. 만일 회원이 타인의 저작권, 프로그램저작권 등을 침해하였음을 이유로 회사가 타인으로부터 손해배상청구 등 이의 제기를 받은 경우 회원은 회사의 면책을 위하여 노력하여야 하며, 회사가 면책되지 못한 경우 회원은 그로 인해 회사에 발생한 모든 손해를 부담하여야 합니다.회사가 작성한 저작물, 기타 콘텐츠에 대한 저작권 기타 권리는 회사에 귀속합니다.<br><br>"
	+ "제10조 (서비스 이용시간)<br>"
	+ "서비스의 이용은 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 다만 정기 점검 등의 사유 발생 시는 그러하지 않습니다.<br><br>"
	+ "제11조 (서비스 이용 책임)<br>"
	+ "서비스를 이용하여 해킹, 음란사이트 링크, 상용S/W 불법 배포, 게시된 자료에 대하여 무단 도용 등의 행위를 하여서는 아니 되며, 이를 위반 시 발생한 영업활동의 결과 및 손실, 관계기관에 의한 법적 조치 등에 관하여는 회사는 책임을 지지 않습니다.<br><br>"
	+ "제12조 (서비스 제공의 중지)<br>"
	+ "다음 각 호에 해당하는 경우에는 서비스 제공을 중지할 수 있습니다.<br>"
	+ "서비스용 설비의 보수 등 공사로 인한 부득이한 경우 전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우시스템 점검이 필요한 경우기타 불가항력적 사유가 있는 경우<br><br>"
	+ "제4장 기 타<br><br>"
	+ "제13조 (양도 금지)<br>"
	+ "회원은 서비스의 이용권한, 기타 이용계약상의 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.<br><br>"
	+ "제14조 (손해 배상)<br>"
	+ "회사는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 동 손해가 회사의 고의 또는 중대한 과실로 인한 손해를 제외하고 이에 대하여 책임을 부담하지 아니합니다.회원이 서비스를 이용함에 있어 행한 불법행위나 이 약관 위반행위로 인하여 회사가 당해 회원 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는 경우 당해 회원은 자신의 책임과 비용으로 회사를 면책하여야 하며, 회사가 면책되지 못한 경우 당해 회원은 그로 인하여 회사에 발생한 모든 손해를 배상하여야 합니다.<br><br>"
	+ "제15조 (면책 조항)<br>"
	+ "회사는 천재지변, 전쟁 또는 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.회사는 회원의 귀책사유로 인한 서비스이용의 장애에 대하여 책임을 지지 않습니다.회사는 회원이 서비스를 이용하여 기대하는 이익이나 서비스를 통하여 얻는 자료로 인한 손해에 관하여 책임을 지지 않습니다.회사는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없으며 이로 인한 손해를 배상할 책임도 없습니다.<br><br>"
	+ "제16조(관할 법원)<br>"
	+ "서비스 이용으로 발생한 분쟁에 대해 소송이 제기 될 경우 회사의 소재지를 관할하는 법원을 전속 관할법원으로 합니다.<br><br>"
	+ "부 칙 <br>"
	+ "(시행일) 이 약관은 2019년 06월 01일부터 시행합니다."
	+ "</div>"
	+ "</div>"
	+ "<div class='mb_title'>"
	+ "<h2>개인정보 보호정책</h2>"
	+ "</div>"
	+ "<div class='mb_content'>"
	+ "<div class='mb_text'>"
	+ "주식회사 사운드그램(이하 ‘회사’ 라고 합니다.)은 개인정보 보호법 제 30조에 따라 관련 주요 법률인 개인정보 보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 “정보통신망법”이라고 합니다.)을 비롯한 모든 개인정보 보호 관련 법률 규정 및 관련 국가기관 등이 제정한 고시, 훈령, 지침 등을 준수하며, 정보 주체의 개인 정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 최선을 다해 노력하고 있습니다.<br><br>"
	+ "제1조 개인정보의 수집 및 이용목적<br><br>"
	+ "회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.<br><br>"
	+ "1. 회원 가입 및 관리<br>"
	+ "- 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원 자격 유지·관리, 제한적 본인 확인제 시행에 따른 본인 확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의 여부 확인, 각종 고지․통지, 고충처리 등을 목적으로 개인정보를 처리합니다.<br>"
	+ "2. 재화 또는 서비스 제공<br>"
	+ "- 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인 인증, 연령 인증, 요금 결제·정산, 채권 추심, 물품 배송 등을 목적으로 개인정보를 처리합니다.<br>"
	+ "3. 고충 처리<br>"
	+ "- 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락 및 통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.<br><br>"
	+ "제2조 개인정보의 처리 및 보유 기간<br><br>"
	+ "이용자의 개인정보는 법령에 따라 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.<br><br>"
	+ "1. 회원 가입 및 관리 : 서비스 탈퇴 시까지<br>"
	+ "다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지<br>"
	+ "1) 관계 법령 위반에 따른 수사·조사 등이 진행중인 경우에는 해당 수사·조사 종료 시까지<br>"
	+ "2) 미납 요금 청구의 경우 요금 완납 시, 민원 대응의 경우 민원 해결 시까지<br>"
	+ "2. 재화 또는 서비스 제공 : 재화·서비스 공급 완료 및 요금 결제·정산 완료 시까지<br>"
	+ "다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지<br>"
	+ "1) 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록<br>"
	+ " - 표시·광고에 관한 기록 : 6개월<br>"
	+ " - 계약 또는 청약철회, 대금결제, 재화 등의 공급 기록 : 5년<br>"
	+ " - 소비자 불만 또는 분쟁 처리에 관한 기록 : 3년<br>"
	+ "2) 「통신비밀보호법」제41조에 따른 통신사실확인자료 보관<br>"
	+ " - 가입자 전기통신일시, 개시·종료시간, 상대방 가입자번호, 사용도수, 발신기지국 위치추적자료 : 1년<br>"
	+ " - 컴퓨터통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월<br>"
	+ "3) 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」시행령 제29조에 따른 본인확인정보 보관 : 게시판에 정보 게시가 종료된 후 6개월<br><br>"
	+ "제3조 개인정보 제3자 제공에 관한 사항<br><br>"
	+ "회원의 개인정보를 이용약관 및 개인정보취급방침 등을 통해 회원에게 알리고 동의를 얻은 범위 내에서 사용하며, 동 범위를 넘어 이용하거나 제3자에게 제공하지 않습니다. 개인정보를 제3자에게 제공하는 경우, 사전에 회원에게 ‘제공받는 자, 제공 받는 자의 이용 목적, 제공하는 개인정보 항목, 보유 및 기간을 고지 후 동의를 구하며, 회원이 동의하지 않는 경우 제공하지 않도록 합니다. 다만, 회원이 해당 제휴 서비스를 이용함에 있어 개인정보의 제3자 제공을 하지 않으면 제휴서비스를 이용할 수 없거나 제휴 서비스 혜택을 적용 받을 수 없는 경우에는 그 취지 및 동의 거부 시 불이익에 대하여 안내합니다.<br>"
	+ "다만, 정보통신망법 등 법령에서 정하는 사유로서, 다음의 각 경우에는 회원의 동의 없이 회원의 개인정보를 이용하거나 제3자에게 제공할 수 있습니다.<br>"
	+ "1. 서비스의 제공에 관한 계약의 이행을 위하여 필요한 개인정보로서 경제적 또는 기술적인 사유로 통상의 동의를 받는 것이 현저히 곤란한 경우<br>"
	+ "2. 서비스 제공에 따른 요금 정산을 위하여 필요한 경우<br>"
	+ "3. 통신비밀보호법, 국세기본법, 정보통신망법, 전기통신사업법, 지방세법, 형사소송법 등 다른 법률에 특별한 규정이 있는 경우<br><br>"
	+ "단, '법률에 특별한 규정이 있는 경우'로 행정목적이나 수사목적으로 행정관청 또는 수사기관이 요구해 온 경우라도 무조건 회원의 개인정보를 제공하지 않으며, 법률에 규정된 바에 따라 영장 또는 기관장의 직인이 날인된 서면에 의한 경우 등 관련 자료에 의하여 법률이 요구하는 자료라는 점을 확인할 수 있는 경우에 한하여 제공합니다.<br><br>"
	+ "제4조 이용자 및 법정대리인의 권리와 그 행사방법<br><br>"
	+ "1. 이용자는 회사에 대해 언제든지 개인정보 열람 · 정정 · 삭제 · 처리 정지 요구 등의 권리를 행사할 수 있습니다.<br>"
	+ "2. 제1항에 따른 권리 행사는 회사에 대해 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.<br>"
	+ "3. 제1항에 따른 권리 행사는 이용자의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br>"
	+ "4. 개인정보 열람 및 처리 정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 이용자의 권리가 제한 될 수 있습니다.<br>"
	+ "5. 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br>"
	+ "6. 회사는 이용자의 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리 정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.<br><br>"
	+ "제5조 처리하는 개인정보 항목<br><br>"
	+ "회사는 다음의 개인정보 항목을 처리하고 있습니다.<br><br>"
	+ "1. 회원 가입 및 관리<br>"
	+ "1) 필수 항목 : ID, 비밀번호, 이름, 닉네임2) 비필수 항목 : 휴대전화번호, 이메일, 프로필이미지, 가입일, 탈퇴일, 중복 가입 확인 정보<br>"
	+ "2. SNS서비스 연동에 따른 개인정보 수집<br>"
	+ "회원이 서비스에 타 SNS 계정을 이용하여 로그인 하는 경우 다음과 같은 정보를 수집합니다.<br>"
	+ "- SNS ID (또는 고유번호), 이름, 프로필 사진 또는 사진의 URL, 성별, 메일 주소 등<br>"
	+ "3. 재화 또는 서비스 제공<br>"
	+ "1) 필수 항목 : 이름, ID, 비밀번호, 생년월일, 주소, 전화번호, 이메일, 아이핀 번호 등 결제 정보<br>"
	+ "2) 비필수 항목 : 관심 분야, 과거 구매 내역<br>"
	+ "4. 고충 처리<br>"
	+ "- 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.<br><br>"
	+ "또한 인터넷 서비스 이용 과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.<br>"
	+ "- 이용자의 기기 정보 및 브라우저 종류 및 OS, 검색어, IP Address, MAC Adress, 쿠키<br>"
	+ "- 서비스 이용 기록, 방문 기록, 불량 이용 기록<br><br>"
	+ "제6조 개인정보 파기에 관한 사항<br><br>"
	+ "이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 이용자로부터 동의 받은 개인정보 보유 기간이 경과하거나 처리 목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관 장소를 달리하여 보존합니다. 회사의 개인정보 파기절차 및 방법은 다음과 같습니다.<br><br>"
	+ "1. 파기절차<br>"
	+ "- 회사는 파기 사유가 발생한 개인정보를 선정하고, 개인정보 보호 책임자의 승인을 받아 개인정보를 파기합니다.<br>"
	+ "2. 파기방법<br>"
	+ "- 회사는 전자적 파일 형태로 기록 및 저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록 및 저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.<br><br>"
	+ "제7조 개인정보의 안전성 확보 조치에 관한 사항<br><br>"
	+ "회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br>"
	+ "1. 관리적 조치 : 내부 관리 계획 수립 및 시행, 정기적 직원 교육 등<br>"
	+ "2. 기술적 조치 : 개인정보처리시스템 등의 접근 권한 관리, 접근 통제 시스템 설치, 고유 식별 정보 등의 암호화, 보안 프로그램 설치<br>"
	+ "3. 물리적 조치 : 전산실, 자료 보관실 등의 접근 통제<br><br>"
	+ "제8조 개인정보 자동 수집 장치의 설치/운영 및 그 거부에 관한 사항<br><br>"
	+ "1. 회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br>"
	+ "2. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)<br>가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내 하드디스크에 저장되기도 합니다.<br>"
	+ "1) 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안 접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.<br>"
	+ "2) 쿠키의 설치 운영 및 거부 : 웹브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.<br>"
	+ "3) 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.<br><br>"
	+ "제9조 개인정보 보호책임자에 관한 사항<br><br>"
	+ "회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.<br><br>"
	+ "▶ 개인정보 보호책임자<br>"
	+ "- 이름 : 박미연<br>"
	+ "- 직책 : 대표이사<br>"
	+ "- 이메일 : soundgram@soundgram.co.kr<br>"
	+ "- 전화번호 : 02-455-2346<br><br>"
	+ "이용자께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해 구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보 주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.<br><br>"
	+ "기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br>"
	+ "- 개인분쟁조정위원회 (www.1336.or.kr / 1336)<br>"
	+ "- 정보보호마크인증위원회 (www.eprivacy.or.kr / 02-580-0533~4)<br>"
	+ "- 대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr / 02-3480-3600)<br>"
	+ "- 경찰청 사이버테러대응센터 (www.ctrc.go.kr / 02-392-0330)<br><br>"
	+ "제10조 고지의 의무<br><br>"
	+ "현 개인정보취급방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 사운드그램 홈페이지의 '공지사항'을 통해 고지할 것입니다.<br><br>"
	+ "부 칙<br>"
	+ "(시행일) 이 약관은 2019년 09월 01일부터 시행합니다."
	+ "</div>"
	+ "</div>"
	+ "</div>"

	return HTML;
}

function makeLeftMenu(type, diskid) {
	var HTML = "";

	if(type=="sc02") {
		HTML 
		= "<div id='sc02' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/sc02_img_title.png' alt='페이지타이틀' width='100%'></h1>"
		+ "<div class='schedule'>"
		+ "<button class='arrow_left'></button>"
		+ "<h2></h2>"
		+ "<button class='arrow_right'></button>"
		+ "</div>"				
		+ "</div>"
		+ "<div class='sche_list'>"
		+ "<div class='schedule_swiper swiper-container' style='width:100%;height:70%'>"
		+ "<div id='schedulelist' class='swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar schedulelist_scollbar'></div>"
		+ "</div>"
		+ "</div>"
		+ "<div id='_schedulelist' class='hidden'></div>"
		+ "</div>"
	}
	else if(type=="sn02") {
		HTML 
		= "<div id='sn02' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/sn02_img_title.png' alt='페이지타이틀' width='100%'></h1>"
		+ "<div class='sns'>"
		+ "<h2>ZICO(지코)<br>공식홈페이지 바로가기</h2>"
		+ "<a href='https://www.facebook.com/koz.entofficial'><button class='arrow_right'></button></a>"
		+ "</div>"
		+ "</div>"
		+ "<div class='sns_list'>"
		+ "<div class='sns_swiper swiper-container' style='width:100%;'>"
		+ "<div id='snslist' class='swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar sns_scollbar'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
	}
	else if(type=="rv02") {
		HTML 
		= "<div id='rv02' class='swiper-slide'>"
		+ "<div class='page_title'>"
		+ "<h1><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/rv02_img_title.png' alt='페이지타이틀' width='100%'></h1>"
		+ "<div class='review'>"
		+ "</div>"
		+ "</div>"
		+ "<div class='review_info_btnbox'>"
		+ "<div class='review_info'>"
		+ "<img src='"+soundgramApi.diskpath+"/"+diskid+"/images/rv02_btn_reduce.png' class='review_info_btn'>"
		+ "</div>"
		+ "</div>"
		+ "<div class='review_content3' style='bottom:0%'>"
		+ "<div class='swiper-container review_swiper' style='width:100%;height:70%'>"
		+ "<div id='_review' class='swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar review_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>"
		+ "<div class='rv_write_snb hidden' style='margin-top:66px;'>"
		+ "<a href='#'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/rv02_btn_close.png' style='height:42px;'></a>"
		+ "</div>"
		+ "<div class='review_content4 hidden'>"
		+ "<textarea placeholder='앨범에 대한 리뷰를 써 주세요' class='rv_writebox'></textarea>"
		+ "</div>"
		+ "<h5 id='r_toolbar' class='review_toolbar'>"
		+ "<span id='newest' class='toolbar_select'>최신순</span>"
		+ "<span id='recomm'>추천순</span>"
		+ "<span class='toolbar_write'><img src='"+soundgramApi.diskpath+"/"+diskid+"/images/rv02_ic_write.png' class='toolbar_write_icon'>글쓰기</span>"
		+ "</div>"
		+ "<div class='review_content2'>"
		+ "<div class='swiper-container reviewcomment_swiper' style='width:100%;height:70%'>"
		+ "<div id='rclist' class='swiper-wrapper'>"
		+ "</div>"
		+ "<div class='swiper-scrollbar reviewcomment_scollbar hidden'></div>"
		+ "</div>"
		+ "</div>"
		+ "</div>"
	}

	return HTML;
}

function makePremiumPlayPopup() {
	var HTML ="";
	HTML
	= "<div id='pl02' class='hidden'>"
	+ "<span id='play_close' class='pclose'></span>"
	+ "<div class='play_eq'>"
	+ "<div class='player_swiper swiper-container' style='width:100%'>"
	+ "<div class='play_eq1'></div>"
	+ "<div class='play_eq2'></div>"
	+ "<div id='p_swipe' class='swiper-wrapper'>"
	+ "</div>"
	+ "<div class='player_pagination swiper-pagination'></div>"
	+ "</div>"
	+ "<h1 class='play_title'></h1>"
	+ "<h4 class='play_artist'></h4>"
	+ "</div>"
	+ "<div class='play_btn'>"
	+ "<dl>"
	+ "<dd><button class='pl_pre'></button></dd>"
	+ "<dd><button id='plpa_btn' class='pl_play'></button></dd>"
	+ "<dd><button class='pl_nex'></button></dd>"
	+ "</dl>"
	+ "<dl>"
	+ "<dd class='fl_left'><button class='pl_lyc'></button></dd>"
	+ "<dd id='songlike_play'></dd>"
	+ "<dd class='fl_right'><button class='pl_repon'></button></dd>"
	+ "</dl>"
	+ "<dl class='bar'>"
	+ "<div class='playbar progress col-12 mb-3'>"
	+ "<dd id='playerbar' class='bar_on' style='width: 0%'></dd>"
	+ "</div>"
	+ "<dd id='currTime' class='play_on fl_left'>00:00</dd>"
	+ "<dd id='endTime' class='fl_right'>00:00</dd>"
	+ "</dl>"
	+ "<div style='width:0;height:0'>"
	+ "<audio id='playMusic' preload='metadata' onended='playend()'>"
	+ "<source id='audiofile' type='audio/mpeg' />"
	+ "</audio>"
	+ "</div>"
	+ "</div>"
	+ "</div>";

	return HTML;
}

function makeHTML(album_type, type, data, artistname) {
    var HTML = "";
    if(type=="songlist") {
    	var id = data.id;
        var order = data.order;
        var likecnt = data.likecnt;
        var title = data.title;
        var filename = data.song_file_mp3;
        var lyric = data.lyric;
		var likeonoff = "off";

		if(data.likeonoff!=0) likeonoff="on";

        if(order.length<2) order = "0"+order;

        var likecntfork = likecnt_change(likecnt)
        var param = data.order+"|"+data.title.replace(/\'/g,"&#39;")+"|"+filename

        var isTitle = "";
        if(data.isTitle=="1") isTitle = "<strong class='titlebox'></strong>";

        HTML    = "<li id='li_play' class='swiper-slide' value='"+param+"' value2='"+id+"'>"
                + "<div class='song_no'>"+order+"</div>"
                + "<div id='songlike_playlist' class='no_like' value='"+likecnt+"' value2='"+order+"' value3='"+id+"'><span class='"+likeonoff+"'></span>"+likecntfork+"</div>"
                + "<a value='"+param+"' href='#'>"
                + "<div value='"+param+"' class='song_song'>"
                + "<span value='"+param+"' class='title'></span><h3 value='"+param+"' style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+isTitle+title+"</h3>"
                + "<h4 value='"+param+"' style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+artistname+"</h4>"
                + "</div>"
                + "</a>"
                + "</li>";
        
        var LyricHTML   = "<div class='lyr_content hidden'>"
                        + "<h2 class='lyr_title'>"+data.title
                        + "</h2>"
                        + "<p class='lyr_text'>"+data.lyric.replace(/\n/gi, "<br>")
                        + "</div>"
        if(album_type=="p") {
        	+ "<div style='position:fixed; background-color:#fff; opacity: 0.9; bottom:0; left:0; width:100%; height:50px;'></div>"
            + "</div>"
        }
        
        $("div#ly01").append(LyricHTML);

        var SongLike    = "<div class='no_like hidden'><span class='"+likeonoff+"'></span>"+likecntfork+"</div>"
        $("dd#songlike_play").append(SongLike);        
    }
    else if(type=="videolist") {
    	var title = data.videoName;
        var videoid = data.video.substring(data.video.lastIndexOf("=")+1, data.video.length);

        var likeonoff = "off";
        if(data.likeonoff>0) likeonoff = "on";

        if(album_type=="p") {
        	HTML    = "<li class='swiper-slide' style='width: calc(100% - 44px); height:auto' value='"+data.id+"' value2='"+videoid+"' value3='"+data.likecnt+"'>"
                    + "<div class='videolist' value='"+data.id+"' value2='"+videoid+"' value3='"+data.replycnt+"'>"
                    + "<div id='vlist2' class='video_thumbnail' value='"+data.id+"' value2='"+videoid+"' value3='"+data.replycnt+"' style='background-image:url(https://img.youtube.com/vi/"+videoid+"/mqdefault.jpg)'>"
                    + "<div id='vlist3' class='btn_play' value='"+data.id+"' value2='"+videoid+"' value3='"+data.replycnt+"'></div>"
                    + "</div>"
                    + "<div style='width:100%'>"
					+ "<h3 id='vlist1' value='"+data.id+"' value2='"+videoid+"' value3='"+data.replycnt+"' style='overflow:hidden;'>"+title+"</h3>"
					+ "<dd class='no_view' value='"+data.viewcnt+"'>조회수 "+likecnt_change(data.viewcnt)+"</dd>"
                    + "<a id='videoLikeCnt_a' value='"+data.id+"' href='#'><dd id='videoLikeCnt' class='no_like' value='"+data.id+"'><span id='videoLikeCnt_span' value='"+data.id+"' class='"+likeonoff+"'></span>"+likecnt_change(data.likecnt)+"</dd></a>"
                    + "<dd id='videoReplyCount' class='no_comment' value='"+data.replycnt+"'><span></span>"+likecnt_change(data.replycnt)+"</dd>"
                    + "</div>"
                    + "</div>"
                    + "</li>";
        }
        else {
            HTML    = "<div class='video swiper-slide' value='"+data.id+"' value2='"+videoid+"'>"
                    + "<h3 id='vlist1' value='"+data.id+"' value2='"+videoid+"'>"+title+"</h3>"
                    + "<div id='vlist2' class='video_box' value='"+data.id+"' value2='"+videoid+"' style='background-image:url(https://img.youtube.com/vi/"+videoid+"/mqdefault.jpg)'>"
                    + "<span id='vlist3' class='btn_videoplay' value='"+data.id+"' value2='"+videoid+"'>"
                    + "<img id='vlist4' value='"+data.id+"' value2='"+videoid+"' src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/ga01_btn_play.png' alt='PLAY'>"
                    + "</span>"
                    + "</div>"
                    + "</div>";
        }
    }
    else if(type=="bookletlist") {
        if(album_type=="p") {
            HTML    = "<li class='booklet_img swiper-slide' style='width:calc(100% - 44px)'>"
                    + "<img src='media/booklet/"+soundgramApi.albumid+"/"+data.photo+"' alt='' />"
                    + "</li>";
        }
        else {
            HTML    = "<div class='booklet swiper-slide'>"
                    + "<img src='media/booklet/"+soundgramApi.albumid+"/"+data.photo+"' alt='' />"
                    + "</div>";
        }

        DETAIL_HTML     = "<div class='swiper-slide'>"
                        + "<div class='swiper-zoom-container'>"
                        + "<img src='media/booklet/"+soundgramApi.albumid+"/"+data.photo+"' />"
                        + "</div>"
                        + "</div>";

        $("div#booklet_detail").append(DETAIL_HTML);
    }
    else if(type=="thankstolist") {
        var photo = data.photo;
        if(typeof photo == "undefined" || photo==null || photo=="") photo = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/gn01_img_profile_df.png";

        if(album_type=="p") {
			// console.log(data.contents.length);
            // contentHTML = "<p id='toggle_text'>"+data.contents.substring(0,(data.contents.length/5)).replace(/\n/gi,"<br>")+"</p>"
			contentHTML = "<p id='toggle_text'>"+data.contents.substring(0,100).replace(/\n/gi,"<br>")+"</p>"
                        + "<p id='toggle_text1' style='display:none; color:#454545'>"+data.contents.replace(/\n/gi,"<br>")+"</p>"

            HTML    = "<li class='swiper-slide'>"
                    + "<div class='thanks_contants'>"
                    + "<div class='profile' style='background-image: url(media/album/"+soundgramApi.albumid+"/"+photo+")' >"
                    + "</div>"
                    + "<h3>"+data.title+"<span> by "+data.author+"</span></h3>"
                    // + "     <textarea id='thankstoContents' readonly='Y' rows='5'>"+data.contents+"</textarea>"
                    + contentHTML
                    + "<div class='more'></div>"
                    + "</div>"
                    + "</li>";
        }
        else {
            HTML    = "<h3>"+data.title+"<span> by "+data.author+"</span></h3>"
                    + "<p>"+data.contents.replace(/\n/gi,"<br>")+"</p>";
        }
    }
    else if(type=="schedulelist") {
        var year = data.date.substring(0, data.date.indexOf("-"));
        var month = data.date.substring(data.date.indexOf("-")+1, data.date.lastIndexOf("-"));
        var day = data.date.substring(data.date.lastIndexOf("-")+1, data.date.lastIndexOf(" "));
        var time = data.date.substring(data.date.lastIndexOf(" ")+1, data.date.length);
		var time2 = time.split(":")[0]+":"+time.split(":")[1];
        // console.log(month + " / " + day + " / " + time);

        var dayclass = "day_gray";
		// var dayGubun = dayofweek("eng", data.date);
		var dayGubun = data.dayofweek_eng;
        if(dayGubun=="Sun") dayClass = "day_red";
        else if(dayGubun=="Sat") dayClass = "day_blue";
        else dayClass="day_gray";

        HTML    = "<li class='swiper-slide hidden' value='"+year+""+month+"' style='width:100%'>"
                + "<div class='"+dayClass+"'>"
                + "<dd class='dayday'>"
                + "<strong>"+day+"</strong>"
				// + "<span>"+dayofweek("eng", data.date)+"</span>"
				+ "<span>"+data.dayofweek_eng+"</span>"
                + "</dd>"
                + "<dd class='dayinfo'>"
                + "<h3>"+data.title+"</h3>"
				// + "<p>"+month+"월 "+day+"("+dayofweek("kor", data.date)+") "+time+"</p>"
				+ "<p>"+month+"월 "+day+"("+data.dayofweek_kor+") "+time2+"</p>"
                + "<p>"+data.place+"</p>"
                + "</dd>"
                + "<div class='day_cate'>"+data.category+"</div>"
                + "</div>"
                + "</li>"
    }
    else if(type=="sns_horizontal") {
        // HTML    = "<li class='swiper-slide' style='width:100%'>"
        //         + "<a href='"+data.snsUrl+"''>"
        //         + "<div class='style_a'>"
        //         + "<dd class='"+data.classname+"'>"
        //         + "</dd>"
        //         + "<dd class='snsinfo'>"
        //         + "<h3>"+data.ownerName+"<span id='sns-${data.snsName}'>"+data.snsName+"</span></h3>"
        //         + "</dd>"
        //         + "</div>"
        //         + "</a>"
        //         + "</li>";
//		$("#sns-${data.snsName}").click(function() {
//			if(soundgramApi.ostype == 2) {	
//				window.webkit.messageHandler.test.postMessage('sns');
//			}
//		});

		HTML    = "<div class='sn_icon swiper-slide'>"
                + "<div class='"+data.classname+"'>"
                + "<a href='"+data.snsUrl+"'></a>"
                + "</div>"
                + "</div>";
    }
	else if(type=="sns_vertical") {
		HTML    = "<li class='swiper-slide' style='width:100%'>"
                + "<a href='"+data.snsUrl+"''>"
                + "<div class='style_a'>"
                + "<dd class='"+data.classname+"'>"
                + "</dd>"
                + "<dd class='snsinfo'>"
                + "<h3>"+data.ownerName+"<span id='sns-${data.snsName}'>"+data.snsName+"</span></h3>"
                + "</dd>"
                + "</div>"
                + "</a>"
                + "</li>";
	}
    else if(type=="vclist") {
    	// $("div.video_title > h3").text(data.title);
     //    $("div.video_title > dd.no_view").html("조회수 "+likecnt_change(data.viewCount));
     //    $("div#video_list > li").each(function(index) {
     //        if($("div#video_list > li").eq(index).attr("value")==data.rv_id) {
     //            $("div#video_list > li").eq(index).find(".no_view").html("조회수 "+likecnt_change(data.viewCount));
     //        }
     //    });

     //    var videolikeonoff = "off";
     //    if(data.videolikeonoff=="1") videolikeonoff = "on";
     //    $("div.video_title > a > dd.no_like").html("<span class='"+videolikeonoff+"'></span>"+likecnt_change(data.videoLikeCount));
     //    // $("div.video_title > dd.no_comment").html("<span></span>"+likecnt_change($("dd#videoReplyCount").attr("value")));
     //    $("div#vd02").val(data.rv_id);

     //    // var videoid = data.video.substring(data.video.lastIndexOf("=")+1, data.video.length);
     //    $("div.review_toolbar").attr("value", data.rv_id);
     //    // $("div.review_toolbar").attr("value2", videoid);

        var videocommentlikeonoff = "off";
        if(data.likeonoff>0) videocommentlikeonoff = "on";

        // var imgbox = "<div class='rv_imgbox' style='background-image: url(media/video/"+data.comment_user_id+"/"+data.comment_img+");'></div>";
        var imgbox = "<div class='rv_imgbox' style='background-image: url(media/comment/"+soundgramApi.albumid+"/"+data.comment_img+");'></div>";
        if(typeof data.comment_img=="undefined" || data.comment_img=="" || data.comment_img==null) {
            imgbox = "";
        }
        
        var profilepath = "user/"+data.comment_user_id+"/"+data.profile;
	    if(data.profile=="profile_none.png") profilepath = "default/"+ data.profile;
	    else if(data.profile=="default/profile_none.png") profilepath = data.profile; 

	    var profile = "media/"+profilepath;
	    if(data.profile.indexOf("http")!=-1) {
	        profile = data.profile;
	    }

		var _dbtn = ""
		if(data.comment_user_id==soundgramApi.user_id) {
			_dbtn = "<span class='rv_delete_btn' onClick='javascript:deleteComment("+data.id+","+data.comment_user_id+")'>삭제</span>";
		}

        HTML    = "<li id='vc_li' class='swiper-slide' value='"+data.likeCount+"'>"
                + "<div class='rv_block'>"
                + "<div class='review_content_left'>"
                + "<div class='profile' style='background-image: url("+profile+")'></div>"
                + "</div>"
                + "<div class='review_content_right'>"
                + "<span class='rv_content_id'>"+data.nick+"</span><span class='rv_content_time'>"+data.comment_time+"</span>"+_dbtn
                + "<p class='rv_content' style='color:#454545; letter_spacing:-0.5px'>"+data.comment_contents+"</p>"
                +  imgbox
                + "<div class='rv_con'>"
                + "<a href='#' id='vclike_a' value='"+data.id+"'><dd id='videoCommentLikeCnt' class='no_like' value='"+data.id+"'>"
                + "<span value='"+data.id+"' class='"+videocommentlikeonoff+"'></span>"+likecnt_change(data.likeCount)+"</dd></a>"
                + "</div>"
                + "</div>"
                + "<div class='clear'></div>"
                + "</div>"
                + "</li>";
    }
    else if(type=="review") {
        var reviewlikeonoff = "off";
        if(data.reviewlikeonoff!="0") reviewlikeonoff = "on";

        var sign = "";
        if(data.singImg!=null || data.signImg!="") {
        	sign = "<img src='media/album/"+soundgramApi.albumid+"/"+data.signImg+"' class='rv_signimg'>";
        }

        HTML    = "<h2>"+data.reviewTitle.replace("\n","<br>")+"</h2>"
                + "<div class='fl_right m_r_20'>"
                + sign
                + "</div>"
                + "<div class='rv_info'>"
                + "<a href='#'><dd id='reviewReplayCount' value='"+data.replyCount+"' class='no_comment'><span></span>"+likecnt_change(data.replyCount)+"</dd></a>"
                + "<a id='review_a' href='#' value='"+data.id+"'><dd id='review_dd' class='no_like' value='"+data.id+"'>"
                + "<span id='reviewLikeCnt' class='"+reviewlikeonoff+"' value='"+data.id+"' value2='"+data.likeCount+"'></span>"+likecnt_change(data.likeCount)+"</dd></a>"
                + "</div>";

        $("div#_review").append("<div class='swiper-slide'><p>"+data.reviewContents.replace(/\n/gi,"<br>")+"</p></div>");
    }
    else if(type=="reviewcomment") {
    	var reviewcommentlikeonoff = "off";
        if(data.likeonoff>0) reviewcommentlikeonoff = "on";

        // var imgbox = "<div class='rv_imgbox' style='background-image: url(media/review/"+data.comment_user_id+"/"+data.comment_img+");'></div>";
        // var imgbox = "<div class='rv_imgbox' style='background-image: url(media/comment/"+soundgramApi.albumid+"/"+data.comment_img+");'></div>";
		var imgbox = "<div class='re_att_img'><img src='media/comment/"+soundgramApi.albumid+"/"+data.comment_img+"></div>";
        if(typeof data.comment_img=="undefined" ||  data.comment_img=="" || data.comment_img==null) {
            imgbox = "";
        }

        var profilepath = "user/"+data.comment_user_id+"/"+data.profile;
        if(data.profile=="profile_none.png") profilepath = "default/"+ data.profile;
	    else if(data.profile=="default/profile_none.png") profilepath = data.profile; 

	    var profile = "media/"+profilepath;
	    if(data.profile.indexOf("http")!=-1) {
	        profile = data.profile;
	    }

		var _dbtn = "";
		// if(data.comment_user_id==soundgramApi.user_id) {
		// 	_dbtn = "<span class='rv_delete_btn' onClick='javascript:deleteComment("+data.id+","+data.comment_user_id+")'>삭제</span>";
		// }

		var _ref = "<span class='rv_reply' value='"+data.id+"' value2='"+data.refCount+"'>답글 작성 <span class='r_rv_count'></span></span>";
		if(data.refCount>0) {
			_ref = "<span class='rv_reply' value='"+data.id+"' value2='"+data.refCount+"'>답글 <span class='r_rv_count'>"+data.refCount+"</span></span>"
		}

        HTML    = "<li id='rc_li' class='swiper-slide' value='"+data.likeCount+"' value2='"+data.comment_user_id+"'>"
                + "<div class='rv_block'>"
                + "<div class='review_content_left'>"
                + "<div class='profile' style='background-image: url("+profile+")'></div>"
                + "</div>"
                + "<div class='review_content_right'>"
                + "<span class='rv_content_id'>"+data.nick+"</span>"
				+ "<span class='rv_rmenu'>"
				+ "<c3-icon>"
				+ "<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24' onClick='javascript:big_comment("+data.id+", "+data.comment_user_id+")'>"
				+ "<path d='M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z'></path>"
				+ "</svg>"
				+ "</c3-icon>"
				+ "</span>"
				+ "<p class='rv_content' style='color:#000'>"+data.comment_contents+imgbox+"</p>"
                + "<span class='rv_content_time'>"+data.comment_time+"</span>"+_dbtn
				+ _ref
				+ "<div class='rv_con'>"
                + "<a href='#' id='rlike_a' value='"+data.id+"'><dd id='reviewCommentLikeCnt' class='no_like' value='"+data.id+"'>"
                + "<span value='"+data.id+"' class='"+reviewcommentlikeonoff+"'></span>"+likecnt_change(data.likeCount)+"</dd></a>"
                + "</div>"
                + "</div>"
                + "<div class='r_rv_block'>"
                + "<input class='r_contents' placeholder='답글을 입력해 주세요.' />"
                + "<button id='refcommentBtn' class='btn_write' onclick='javascript:insertRefComment(this,\"review\",\""+data.id+"\",\""+data.contents_id+"\")'>등록</button>"
                + "</div>"
                + "<div class='clear'></div>"
                + "</div>"
				+ "</li>";
    }
	else if(type=="refcomment") {
    	var reviewcommentlikeonoff = "off";
        if(data.likeonoff>0) reviewcommentlikeonoff = "on";

        var profilepath = "user/"+data.comment_user_id+"/"+data.profile;
        if(data.profile=="profile_none.png") profilepath = "default/"+ data.profile;
	    else if(data.profile=="default/profile_none.png") profilepath = data.profile; 

	    var profile = "media/"+profilepath;
	    if(data.profile.indexOf("http")!=-1) {
	        profile = data.profile;
	    }

		var _dbtn = "";
		// if(data.comment_user_id==soundgramApi.user_id) {
		// 	_dbtn = "<span class='rv_delete_btn' onClick='javascript:deleteComment("+data.id+","+data.comment_user_id+")'>삭제</span>";
		// }

        HTML    = "<div class='review_content_left'>"
                + "<div class='profile' style='background-image: url("+profile+")'></div>"
                + "</div>"
                + "<div class='review_content_right'>"
                + "<span class='rv_content_id'>"+data.nick+"</span>"
				+ "<span class='rv_rmenu'>"
				+ "<c3-icon>"
				+ "<svg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24' onClick='javascript:big_comment("+data.id+", "+data.comment_user_id+")'>"
				+ "<path d='M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z'></path>"
				+ "</svg>"
				+ "</c3-icon>"
				+ "</span>"
				+ "<p class='rv_content' style='color:#000'>"+data.comment_contents+"</p>"
                + "<span class='rv_content_time'>"+data.comment_time+"</span>"+_dbtn
				+ "<div class='rv_con'>"
                + "<a href='#' id='rlike_a' value='"+data.id+"'><dd id='reviewCommentLikeCnt' class='no_like' value='"+data.id+"'>"
                + "<span value='"+data.id+"' class='"+reviewcommentlikeonoff+"'></span>"+likecnt_change(data.likeCount)+"</dd></a>";
    }

    return HTML;
}
