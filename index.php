<?php
	$albumid = isset($_REQUEST['albumid'])?$_REQUEST['albumid']:"";
	// $albumdiv = $_REQUEST['albumdiv'];
	// $albumleft = $_REQUEST['albumleft'];
	// $package = $_REQUEST['package'];
	$uuid = isset($_REQUEST['uuid'])?$_REQUEST['uuid']:"";
	$ostype = isset($_REQUEST['ostype'])?$_REQUEST['ostype']:"";
	$app_ver = isset($_REQUEST['app_ver'])?$_REQUEST['app_ver']:"";
	$token = isset($_REQUEST['token'])?$_REQUEST['token']:"";
	$isGuide = isset($_REQUEST['isGuide'])?$_REQUEST["isGuide"]:false;
	$pushMovingPage = isset($_REQUEST['pushMovingPage'])?$_REQUEST['pushMovingPage']:"none";
	
    // ssemee test 220323	
	// 통합앱용 파라미터 추가 21.09.30
	$tot = isset($_REQUEST['tot'])?$_REQUEST["tot"]:false;
	$tot_id = isset($_REQUEST['tot_id'])?$_REQUEST["tot_id"]:"0";
	
	$hosturl = $_SERVER['HTTP_HOST'];
	$server_url;
	
	if(!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        $server_url = "https";
    }
    else {
        $server_url = "http";
    }
    // Here append the common URL characters.
    $server_url .= "://";
    
    // Append the host(domain name, ip) to the URL.
    $server_url .= $_SERVER['HTTP_HOST'];
    
    // Append the requested resource location to the URL
	if(strpos(explode('/',$_SERVER['REQUEST_URI'])[1],".php")==false) {
		$server_url .= "/".explode('/',$_SERVER['REQUEST_URI'])[1];
		// echo $server_url;
	}
	
	define('NAVER_CLIENT_ID', 'jqs6fMhdlwDS46pHx3D2'); 
	define('NAVER_CLIENT_SECRET', 'Zm3osSz58L');  
	define('NAVER_CALLBACK_URL', $server_url.'/oauth/naverCallback.php?albumid='.$albumid.'&uuid='.$uuid); // 네이버 로그인 접근토큰 요청 예제 
	$naver_state = md5(microtime() . mt_rand()); 
	$naver_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".NAVER_CLIENT_ID."&redirect_uri=".urlencode(NAVER_CALLBACK_URL)."&state=".$naver_state;
	
	$disk_info_url = $server_url."/api/disk_info.php?albumid=".$albumid;
	// if($tot) {
	// 	$disk_info_url = "https://devdisk.soundgram.co.kr/api/disk_info_tot.php?tot_id=".$tot_id;
	// }

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $disk_info_url);
	curl_setopt($ch, CURLOPT_POST,false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$headers = array();
	$Response = curl_exec ($ch);
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close ($ch);
	
	
	$rsp = json_decode($Response,true);

	$res = isset($rsp[0]) ? $rsp[0] : "";
	$diskpath= 		isset($res['diskpath']) ? $res['diskpath'] : ""; //diskpath만 따로 뺌
	$diskid= 		isset($res['diskid']) ? $res['diskid'] : ""; //diskid만 따로 뺌
	$chip_img = 	isset($res['chip_img'])? $res['chip_img']:""; //chip_img만 따로 뺌
	$chip_loading = isset($res['chip_loading'])?$res['chip_loading']:""; //chip_loading만 따로 뺌
	
	// var_dump($Response);
	// var_dump($rsp[0]);
	// var_dump($res);

	// $res = json_decode($Response)[0];
	// $diskpath = $res->diskpath;
	// $diskid= $res->diskid;
	// $chip_img = $res->chip_img;
	// $chip_loading = $res->chip_loading;
?>
<?php
	if($tot) {
?>
	<link rel="stylesheet" type="text/css" href="./css/common_tot.css">
<?php
	}
	else {
?>
	<link rel="stylesheet" type="text/css" href="./css/common.css">
<?php
	}
?>

<link rel="stylesheet" type="text/css" href="./css/nfc_main.css">
<link rel="stylesheet" type="text/css" href="./css/nfc_payment_tot.css">
<link rel="stylesheet" type="text/css" href="./css/ci10.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/main.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/media_query.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/font.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/album.css">

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
	<meta name="viewport" content="viewport-fit=cover, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>

    <link rel="shortcut icon" href="#">

    <link rel="stylesheet" type="text/css" href="css/swiper.css">
	<link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>
	<link rel="stylesheet" type="text/css" href="css/swiper-comm.css">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/YTPlayer.css"> -->
	<!-- <link rel="stylesheet" type="text/css" href="css/zoom.css"> -->

	<!-- <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css"> -->
	
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400&display=swap" rel="stylesheet">

	<!-- <link rel="stylesheet" type="text/css" href="css/nfc_payment.css"> -->
	<link rel="stylesheet" type="text/css" href="css/toast.css">
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
    <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
    <script type="text/javascript" src="js/swiper-setting.js"></script>
    <script type="text/javascript" src="js/SoundgramApi.js"></script>
    <script type="text/javascript" src="js/Soundgram.js"></script>
    <script type="text/javascript" src="js/loadingView.js"></script>
    <script type="text/javascript" src="js/EventGather.js"></script>
    <script type="text/javascript" src="js/player.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/common_pages.js"></script>
    <script type="text/javascript" src="js/component.js"></script>
	<script type="text/javascript" src="js/sha256.min.js"></script>
	<!-- <script type="text/javascript" src="js/YTPlayer.js"></script> -->
	<!-- <script type="text/javascript" src="js/directive.js?v=1"></script> -->
    <script type="text/javascript" src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
    <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
	<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
    <!-- <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script> -->
	<!-- <script src="https://cdn.jsdelivr.net/gh/foobar404/wave.js/dist/bundle.iife.js"></script> -->
	<script type="text/javascript" src="js/bundle.iife.js"></script>
	<script type="text/javascript" src="js/lrc.js"></script>
	<script>
    	let confirm = new ConfirmClass();
		let _alret = new AlertClass();
		let _toast = new ToastClass();
    </script>
    <script type="text/javascript">
		// enhance the original "$.ajax" with a retry mechanism 
		$.ajax = (($oldAjax) => {
			// on fail, retry by creating a new Ajax deferred
			function check(a,b,c){
				var shouldRetry = b != 'success' && b != 'parsererror';
				if( shouldRetry && --this.retries > 0 ) {
					window.setTimeout(() => { $.ajax(this) }, this.retryInterval || 100);
					
					// alert("접속이 원활하지 않아 재시도 중입니다.("+this.retries+")");
					$("body").show();
					_toast.show({
						text : "접속이 원활하지 않아<br>재시도 중입니다.("+this.retries+")"
						, onShow: function(){
						
						}
					});
				}
				else {
					_toast.hide();
				}

				var tot_id = '<?=$tot_id?>';
				if (this.retries==0) {
					// alert("접속이 원활하지 않습니다.\n칩디스크 선택 화면으로 돌아갑니다.");

					var msg = "접속이 원활하지 않습니다.<br>칩디스크 선택 화면으로<br>돌아갑니다.";
					if(tot_id==0) {
						msg = "접속이 원활하지 않습니다.<br>앱을 재시작해주세요.";
					}

					_toast.show({
						text : msg
						, onShow: function(){
						
						}
					});

					window.setTimeout(function() {
						if(soundgramApi.ostype==1) {
							Soundgram._close();
						}
						else if(soundgramApi.ostype==2) {
							window.webkit.messageHandlers.Soundgram.postMessage("gotoHome");
						}
					},1000)
				}
			}

			return settings => $oldAjax(settings).always(check)
		})($.ajax);

        $(document).ready(function(){
			//카카오 로그인 관련
        	Kakao.init("795b9d6967488b64c13ddff90785a421");
        	Kakao.isInitialized();

			console.log("Kakao.isInitialized() :: " + Kakao.isInitialized());
			
        	soundgramApi.SOUNDGRAM_Initialize();
			// soundgramApi.albumid=getParameterByName("albumid");
			// soundgramApi.package=getParameterByName("package");
			soundgramApi.albumid='<?=$albumid?>';
			soundgramApi.uuid='<?=$uuid?>';
			soundgramApi.ostype='<?=$ostype?>';
			soundgramApi.app_ver='<?=$app_ver?>';
			soundgramApi.naver_state='<?=$naver_state?>';	
			soundgramApi.token='<?=$token?>';
			soundgramApi.pushMovingPage = '<?=$pushMovingPage?>';
			soundgramApi.tot = '<?=$tot?>';
			soundgramApi.tot_id = '<?=$tot_id?>';
			
			if(soundgramApi.tot) {
				var chip_img = '<?=$chip_img?>'
				var chip_loading = '<?=$chip_loading?>'

				// soundgramApi.tplImgNum = "10";
				
				$("img.ci10_chip").attr("src","/media/album/"+soundgramApi.albumid+"/"+chip_loading);
				
				$(".ci_container").removeClass("hidden");
			}
			else {
				$("body").hide();
			}

			//210528 sh server_url 변경 
			//soundgramApi.serverUrl = '<?=$server_url?>';
			soundgramApi.serverUrl = window.location.origin;
			
            var diskpath = "";
			var diskid = "";
            var value = jQuery.param({"albumid":soundgramApi.albumid});
			// $.ajax({
			// 	type : "POST",
			// 	url : "api/disk_info.php",
			// 	data : value,
			// 	dataType: "json",
		    //     success: function(data) {
		    //     	diskpath = data[0].diskpath;
		    //     	diskid = data[0].diskid;

		        	// noticePopupOnoff();
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/album.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/font.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/media_query.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/main.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="css/nfc_main.css"'+' >').prependTo("head");
					// // $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/common.css"+'" >').prependTo("head");
                    // $('<link rel="stylesheet" type="text/css" href="css/common.css" >').prependTo("head");
					$("div.si_footer").html("<p>Version "+soundgramApi.app_ver+"</p>")

		        	addDeviceInfo();
            //     }, 
		    //     error: function(xhr, textStatus, errorThrown) {
		    //     	console.log(errorThrown);
		    //     }
            // });
        });

		$(window).load(function() {
            var diskpath = "";
			var diskid = "";
			var album_type = "";
			var artistUrl = "";
			// var app_ver ='<?=$app_ver?>';
			var isGuide = '<?=$isGuide?>';
			var nfc = false;
            var pageidx = 0;

			// 앨범 정보 가져오기
			var value = jQuery.param({"uuid":soundgramApi.uuid, "albumid":soundgramApi.albumid, "app_ver":soundgramApi.app_ver});
			$.ajax({
				type : "POST",
				url : "api/artist_info.php",
				data : value,
				dataType: "json",
				timeout       : 3000,
				retries       : 5,     //       <-------- Optional
				retryInterval : 3000,   //       <-------- Optional
		        success: function(data) {
		        	diskpath = data[0].diskpath;
		        	diskid = data[0].diskid;
		        	artistUrl = data[0].artist_url;
		        	album_type = diskid.substring(0,1);

		        	soundgramApi.diskpath=diskpath;
					soundgramApi.diskid=diskid;
					soundgramApi.album_type=album_type;
					soundgramApi.albumtitle = data[0].album_name;
					soundgramApi.artistid=data[0].artist_id;
					soundgramApi.artistname=data[0].artist_name;
					soundgramApi.albumdiv = new Array();
					soundgramApi.leftmenudiv = new Array();
					soundgramApi.google_url = data[0].google_url;
					soundgramApi.apple_url = data[0].apple_url;
					soundgramApi.share_title = data[0].share_title;
					soundgramApi.share_img = data[0].share_img;
					soundgramApi.album_info = data[0].album_info;
					soundgramApi.album_distributor = data[0].album_distributor;
					soundgramApi.album_company = data[0].album_company;
					soundgramApi.album_artist_info = data[0].album_artist_info;
					soundgramApi.album_intro_info = data[0].album_intro_info;
					soundgramApi.album_credit_info = data[0].album_credit_info;
					soundgramApi.album_time = data[0].album_time;

		        	// noticePopupOnoff();
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/album.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/font.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/media_query.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/main.css"+'" >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="css/nfc_payment.css"'+' >').prependTo("head");
					// $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/common.css"+'" >').prependTo("head");
					// $("div.si_footer").html("<p>Version "+app_ver+"</p>")

		        	// addDeviceInfo();

					var albumdiv = data[0].category;
		            var a_div = albumdiv.split(",");
		            var ltclass = "tb_menu";

		            for(var i=0; i<a_div.length;i++) {
		                // $("div#swipe").append(makeMainPages(a_div[i], diskid));

		                var lm = "";
						var _tplnum = "02";
		                if(a_div[i]!="-") {
		                	lm = a_div[i].substring(0,2);
		                }

		                if(lm=="sp") {
		                	
			            }
			            else if(lm=="in") {
							$("div.container").append(getHTMLPageData(a_div[i]));
							soundgramApi.infomation = a_div[i];
							
							var store_url = soundgramApi.google_url;
							if(soundgramApi.ostype == 2) {
								store_url=soundgramApi.apple_url;
							}
							
			            	$("div#"+a_div[i]+" > div.si_content > div:nth-child(3) > div:nth-child(1)").attr("onclick","location.href='"+store_url+"'");
			            }
			            else if(lm=="cu") {
                            // $("div.container_popup").append(getHTMLPageData("cu01_d"));
                            
							$.ajax({
     							url: "/terms.html"
								, type: "POST"
								, async: false
							}).done(function(data) {
								$("div.container_popup").append(data);
							});
							$("div#cu01_d").addClass("hidden");
							
			            	soundgramApi.cuid = a_div[i];
			            }
			            else if(lm=="nc") {

			            }
			            else if(lm=="aa" || lm=="ab" || lm=="ac" || lm=="ho" || lm=="al" || lm=="pl" || lm=="ga" || lm=="bo" || lm=="vi" || lm=="th" || lm=="st") {
		                	if(album_type=="p") {
		                		if(lm=="pl") {
									$("div.container").append(getHTMLPageData(a_div[i]));
									soundgramApi.premiumPlayer = a_div[i];
									soundgramApi.tplImgNum = a_div[i].substring(2,a_div[i].length);
									// console.log(soundgramApi.tplImgNum);
		                		}
		                		else {
									var pagehtml = getHTMLPageData(a_div[i]);
									if(pagehtml.length>0) {
										$("div#swipe").append(pagehtml);
										soundgramApi.albumdiv.push(a_div[i]);
									}
		                		}
		                	}
		                	else {
		                		$("div#swipe").append(getHTMLPageData(a_div[i]));
		                		soundgramApi.albumdiv.push(a_div[i]);
		                	}
			            }
		                else if(lm=="sc" || lm=="sn" || lm=="rv") {
							$("div#leftmenuswipe").append(getHTMLPageData(a_div[i]));
				            soundgramApi.leftmenudiv.push(a_div[i]);

							if(lm=="sn") {
								var snl = window.setInterval(function() {
									if($("div#leftmenuswipe > div").length>0) {
										window.clearInterval(snl);

										var id = $("div#leftmenuswipe > div[id*=sn]").attr("id");
										var pst = $("div#leftmenuswipe > div[id*=sn] > div.page_title").attr("pst");
										if(pst=="twt") {
											$("div#leftmenuswipe > div[id*=sn]").append(getHTMLListData("twt"));
										}
									}
								},100);
							}
						}
						else if(lm=="me" || lm=="tb") {
							if(lm=="me") {
								ltclass = "menu_main"
							}

							$("body").prepend(getHTMLPageData(a_div[i]));
							soundgramApi.lmortab = a_div[i];
			            }
			            else if(lm=="ly" || lm=="vd") {
			            	if(lm=="vd") {
			            		soundgramApi.videoPopup = a_div[i];
			            	}
			            	else {
			            		soundgramApi.lyricPopup = a_div[i];
			            	}

			            	$("div.container").append(getHTMLPageData(a_div[i]));
			            }
						else if(lm=="am") {
							$("ul.menu_player > a").css({"height":"59px"});
							$("ul.menu_player > a > li").css({"display":"block"});
						}
				    }

				    //LEFT MENU OR TAB
					for(var lt=0; lt<soundgramApi.albumdiv.length; lt++) {
				    	var lm = soundgramApi.albumdiv[lt].substring(0,2);
						var title = makeSubmenuTitle(lm);
						
						//LEFT MENU에서 aa~ac는 비노출 처리 21.04.05
				    	if(ltclass=="menu_main") {
				    		$("ul."+ltclass).append("<a id='"+lt+"'><li id='"+lt+"' class=''>"+title+"</li></a>");
				    	}
				    	else {
				    		$("ul."+ltclass).append("<a id='"+lt+"'><li id='"+lt+"' class='tb_"+lm+"_off'></li></a>")
				    	}

						//aa~ac 페이지(이미지 경로 변환) 21.04.05
						if(lm=="aa" || lm=="ab" || lm=="ac") {
							var divid = soundgramApi.albumdiv[lt];
							$("div#"+divid).children().find("img").each(function() {
								var org_img = $(this).attr("src");
								var new_img = ""+diskpath+"/"+diskid+"/"+org_img;
								// console.log(org_img+" / "+new_img);

								$(this).attr("src",new_img);
							});

							if(diskid=="p0700" && lm=="ab") {
								$("div.album_txt > p").empty();
								$("div.album_txt > p").html(soundgramApi.album_intro_info);
							}
						}
				    }
					
					//LEFT MENU BOTTOM(스케줄, SNS, 리뷰)
					for(var lt2=0; lt2<soundgramApi.leftmenudiv.length; lt2++) {
						// console.log(soundgramApi.leftmenudiv[lt2]);
						var lmb = soundgramApi.leftmenudiv[lt2].substring(0,2);
						var title = "";
						var clsname = "";

						if(lmb=="sc") {
							title = "SCHEDULE";
							clsname = "sub_01";
						}
						else if(lmb=="sn") {
							title = "SNS";
							clsname = "sub_02";
						}
						else if(lmb=="rv") {
							title = "TALK";
							clsname = "sub_03";
						}

						$("ul.menu_sub").append("<li id='me_"+lmb+"' class='"+clsname+"'>"+title+"</li>");
					}

				    if(album_type=="p") {
						// $("div#"+soundgramApi.albumdiv[0]+" > div.cover_img1").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_cover+"')"});
						
						if(diskid=="p0700") {
							var ho = "";
							for(var lt=0; lt<soundgramApi.albumdiv.length;lt++) {
								var lm = soundgramApi.albumdiv[lt].substring(0,2);
								if(lm=="ho") {
									ho = soundgramApi.albumdiv[lt];
								}
							}
							
							$("div#"+ho+" > div.cover_img1").css({"background-image":"url('"+diskpath+"/"+diskid+"/"+soundgramApi.albumid+"/"+ho+"_img_cover.jpg')"});
						}

				        $("h2.list_title").text(data[0].album_name);
				        $("h3.list_artist").text(data[0].artist_name);
				        $("h4.play_artist").text(data[0].artist_name);

				        $("div.ali_toolbar > img").attr("src", ""+diskpath+"/"+diskid+"/images/cu01_btn_close.png");
				    	$("div.rv_toolbar > img").attr("src", ""+diskpath+"/"+diskid+"/images/rv02_btn_close.png");

				    	for(var i=0; i<soundgramApi.leftmenudiv.length;i++) {
				    		var lm = soundgramApi.leftmenudiv[i].substring(0,2);
				    		if(lm=="sn") {
								var tst = $("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title").attr("tst");
				    			if(artistUrl==null || artistUrl=="") {
				    				// $("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a > h2").html(soundgramApi.artistname+"<br>Official Social Network Service");
									
									if(tst=="tt") {
										$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a").remove();
										$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns").append("<h2>"+soundgramApi.artistname+"<br>Official Social Network Service</h2>");
									}
									else {
										$("div#"+soundgramApi.leftmenudiv[i]).find(".arrow_right").hide();
									}
				    			}
				    			else {
									if(tst=="tt") {
										$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a > h2").html(soundgramApi.artistname+"<br>공식홈페이지 <strong>바로가기</strong>");
				    					$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a").attr("href", artistUrl);
									}
				    				else {
										$("div#"+soundgramApi.leftmenudiv[i]).find(".arrow_right").attr("onclick","location.href='"+artistUrl+"'");
									}
				    			}
				    		}
				  		}

				  		// 부클릿 미리 셋팅..
				  		$.ajax({
		                    type : "POST",
		                    url : "api/booklet_info.php",
		                    data : value,
		                    dataType: "json",
							timeout       : 3000,
							retries       : 5,     //       <-------- Optional
							retryInterval : 3000,   //       <-------- Optional
		                    success: function(data) {
		                        // $("div#booklet_img_list").empty();

								// 부클릿 사이즈 미리 저장..
								soundgramApi.bookletSize = data.length;

		                        // $.each(data, function(al) {
		                        //     var makeListHTML = makeHTML(album_type, "bookletlist", data[al], soundgramApi.artistname);
		                        //     $("div#booklet_img_list").append(makeListHTML);
		                        // });

		                        // vertical_booklet();

								$.each(data, function(bo) {
									$("div#booklet_img_list").append(getHTMLListData("bo"));

									var DETAIL_HTML = "<div class='swiper-slide'>"
													+ "<div class='swiper-zoom-container'>"
													+ "<img src='media/booklet/"+soundgramApi.albumid+"/"+data[bo].photo+"' />"
													+ "</div>"
													+ "</div>";

									$("div#booklet_detail").append(DETAIL_HTML);
								});

								var complete = window.setInterval(function() {
									if(data.length==$("div#booklet_img_list > li").length) {
										window.clearInterval(complete);

										for(var bo=0; bo<$("div#booklet_img_list > li").length;bo++) {
											var imgSrc = "media/booklet/"+soundgramApi.albumid+"/"+data[bo].photo;
											
											$("div#booklet_img_list > li").eq(bo).children("img").attr("src",imgSrc).attr("class","swiper-lazy");
										}

										// $("div.vertical_booklet").removeClass("hidden");
										vertical_booklet();
										
										// list_effect("booklet");
									}
								}, 100);

								var _r = window.setTimeout(function() {
									if(data.length==$("div#booklet_img_list > li").length) {
										window.clearTimeout(_r);
									}
									else {
										window.clearInterval(complete);

										for(var bo=0; bo<$("div#booklet_img_list > li").length;bo++) {
											var imgSrc = "media/booklet/"+soundgramApi.albumid+"/"+data[bo].photo;
											
											$("div#booklet_img_list > li").eq(bo).children("img").attr("src",imgSrc).attr("class","swiper-lazy");
										}

										vertical_booklet();
									}
								}, 10000);
		                    }, 
		                    error: function(xhr, textStatus, errorThrown) {
		                        console.log(errorThrown);
		                    }
						});
						
						//리뷰에 크레딧, 싸인이미지 추가
						$("div.rv_deco").html("<h2>"+soundgramApi.artistname+"<br />팬 리뷰 페이지</h2><div class='rv_signimg2'></div>");

				  		var naver_url = '<?=$naver_url?>';
						$("a#naverIdLogin_loginButton").removeAttr("href");
						$("a#naverIdLogin_loginButton").attr("onclick", "window.open('"+naver_url+"','네이버로그인','width=480,height=600,scrollbar=no,status=no,menubar=no,toolbar=no')");

						// 21.08.09 intro, tracklist 커버이미지 추가
						$("div.list_albumcover").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_cover+"')"});
						$("div.intro_albumcover").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_cover+"')"});

						// 21.08.09 intro type, genre, title, artist,  추가
						// $("span.list_info").empty();
						// $("span.list_info").html(data[0].album_type+"<i></i><span id='albuminfo'>"+data[0].album_genre.split("_")[1]+"</span>");
						// $("h2.list_title").text(data[0].album_name);
				        // $("h3.list_artist").text(data[0].artist_name);
						// $("div.album_dt_l").empty();
						// $("div.album_dt_l").html("<span>발매사<b> "+soundgramApi.album_distributor+"</b></span><span>기획사<b> "+soundgramApi.album_company+"</b></span>");
						// $("div.album_dt_r").html("<span>발매일<b> "+soundgramApi.album_time+"</b>");

						$("div.album_dt_l > span > b").text(data[0].album_genre.split("_")[1]);
						$("div.album_dt_r > span > b").text(" "+soundgramApi.album_time.replace(/\-/gi,"."));
						$("span#albuminfo_p").text(data[0].album_type);
				    }
				    else {
				    	$("div#"+soundgramApi.albumdiv[0]+" > div.cover_img").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_cover+"')"});
				    	$("div.list_albumcover").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_cover+"')"});
				    	$("div.thanks_profile").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_artist_img+"')"});
				    	$("h1.cv_title").text(data[0].album_name);
				        $("h2.cv_artist").text(data[0].artist_name);
				        $("h4.play_artist").text(data[0].artist_name);
				        $("h3.cv_album").text(data[0].album_type);

				        $("h2.list_title").text(data[0].album_name);
				        $("h3.list_artist").text(data[0].artist_name);
				    }

				    $("div.list_info > strong").text(data[0].album_type);
					$("div.list_info > span#albuminfo").text(data[0].album_genre.split("_")[1]);
				    $("h2.ali_title").html(data[0].album_info_title.replace(/\n/gi,"<br>"));
				    $("p.ali_text").html(data[0].album_info.replace(/\n/gi,"<br>"));

				    if(is_navigator()=="app") {
				        if(soundgramApi.ostype == 1) {
                            Soundgram.hideProgress();
                        } else if(soundgramApi.ostype == 2) {
                            window.webkit.messageHandlers.Soundgram.postMessage('hideProgress');
                        }

						if($('#os-type').text() == 1) {
						 	Soundgram.hideProgress();
						} else if($('#os-type').text() == 2) {
						 	window.webkit.messageHandlers.test.postMessage('test');				
						}
						
						// 통합앱의 경우..
						if(soundgramApi.tot) {
							// 날개메뉴 인포 히든처리
							$(".logo").addClass("hidden");
							$("#_bchipdisc").removeClass("hidden");
						}
						
						// 설치가 처음이면 가이드 나오도록 기능 추가(210310) #210311 iOS에서도 나와야하므로 주석처리
						// console.log(isGuide);
						if(isGuide=="true") {
						 	$("div.overlay0").show();
						}
						else {
							if(soundgramApi.ostype==1) {
								Soundgram.setCookie();
							}

							noticePopupOnoff();
						}
					}
                  	
                    $("div.container > div#nc01_a").addClass("hidden");
                    
                    $("img#info_close").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_btn_close.png");
                    $("img#logoImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_img_logo.png");
                    $("img#siblImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_ic_review.png");
                    $("img#mailtoImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_ic_help.png");
                    $("img#sibImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_ic_site.png");

                    // goAuthNext();

					// var _lo = "";
					// _lo = window.setTimeout(function() {
					// 	if($(".ci_container").is(":visible")) {
					// 		window.clearTimeout(_lo);
					// 		goAuthNext();
					// 	}
					// }, 10000);
				}, 
		        error: function(xhr, textStatus, errorThrown) {
		        	console.log(errorThrown);
		        }
				
			});
			
		});
		
		function nlpopup(naver_url) {
			var popup = window.open(naver_url,'네이버로그인','width=480,height=720,scrollbar=no,status=no,menubar=no,toolbar=no');
		}

		// thanks to 팝업창 - 오운아(05/31)
		function tmf(){
			$("#tmf_popup").attr("style","display:block;");
		}	
		function tmfClose(){
			$("#tmf_popup").attr("style","display:none;");
		}
    </script>
    <script>
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
	</script>
	<script>
		// guide 화면 '이해했습니다' 버튼에 로직 추가. iOS만 동작 - 문상혁(03/12)
		function guideOkButtonClick() {
			if($('#os-type').text() == 1) {
				/*
					* Android *
					앱의 guide on/off 관련 변수를 false로 변경하면서 웹의 guideoff() 함수 호출해주시면 됩니다.
				*/
			} else if($('#os-type').text() == 2) {
				window.webkit.messageHandlers.test.postMessage('guide');
			}
		}
	</script>
</head>
<body>
	<!-- 통합앱 로딩화면 -->
	<div class="ci_container hidden">
		<div id="ci10" class="chip">
			<div class="chip_slide-div">
			<div class="chip_slide-wrap">
				<div class="ci10_loading">
					<!-- 210826 첫번째 이미지는 로딩되는 칩디스크에 따라 변경되야 합니다. -->
					<img class="ci10_chip" src="" alt="" />
					<!-- 210826 로딩 고정 이미지 -->
					<img class="ci10_cst" src="./images/ci10_loding_cst.png" alt="" />
				</div>
			</div>
			</div>
		</div>
	</div>

	<!-- Navigation -->
	<header id="pop_top" class="hidden">   
	<nav>
		<span id="member_close" class="close"></span>
	</nav>
	</header>

	<div class="overlay0" style="display:none">
		<div class="guide_wrap">    
			<div class="guide_stap1_wrap">
				<div class="guide_stap1_circle"></div>
				<div class="guide_img01_wrap">
					<img src="./images/ho02_touch.png" alt="네비게이션 메뉴 터치" class="guide_img01"/>
				</div>
          		<p>터치해서</br>전체 메뉴를 열어보세요!</p>
        	</div>
        	<div class="guide_stap2_wrap">
          <div class="guide_img02_wrap">
          <img
            src="./images/ho02_slide.png"
            alt="아티스트 소개와 앨범 메뉴들을 좌우로 밀어서 확인하세요!"
            class="guide_img02"
          /></div>
          <p>아티스트 소개와 앨범 메뉴들을</br>좌우로 밀어서 확인하세요!</p> 
          <div class="guide_stap3_wrap">
          		<button class="guide_ok" onclick="guideOkButtonClick();">OK! 이해했어요!</button>
        	</div>
		</div>
		<!-- <div class="guide_sh_wrap">
			<p>앨범 발매를</br>SNS에 공유하세요!</p>
			<div class="guide_sh_in">
				<div class="guide_stap3_circle"></div>
				<div class="guide_sh_img">
					<img src="images/ho02_touch02.png" alt="앨범 발매를 SNS에 공유하세요!">
				</div>
        	</div>
        </div>			 -->
    </div>
    </div>

	<div class="container_popup hidden">
		
	</div>

	<div class="container hidden">
		<div id="playerImage" style="display:none; position:absolute; top:50%; left:50%; width:100%; height:50%; background-repeat: no-repeat; background-size: cover; transform: translateX(-50%) translateY(-50%); z-index:200;"></div>
		<!-- 미니 플레이 eq바 -->
		<div id="mini_play_eq" class="hidden" style="z-index:220">
			<div style="padding:0 23.5px;">
				<div class="playbar">
					<dd id="miniplayerbar" class="bar_on" style="width: 0%"></dd>
				</div>
			</div>
			<div class="m_pl_info">
				<div class="m_pl_album" style="background-size: cover;"></div>
				<h3 class="m_pl_artist" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></h3>
				<div class="m_pl_btn_area">
					<!--버튼 비활성화 시 적용 클래스 뒤에 m_pl_offbtn 클래스 속성 추가-->
					<button type="button" class="m_pl_prevbtn"></button>
					<button type="button" class="m_pl_playbtn"></button>
					<button type="button" class="m_pl_nextbtn"></button>
				</div>
			</div>
		</div>

		<!-- 상단 메뉴 아이콘 -->
		<!-- <span id="openleftmenu" class="menu"></span> -->
		<div class="horizontal_swiper">
			<div id="swipe" class="swiper-wrapper">

			</div>
		</div>

		<span id="play_close" class="pclose" style="display:none"></span>

		<div class="like_heart hidden">
			<img src="" alt="like">
		</div>	

		<!-- 메인 공지 팝업 -->
		<div id="other_popup" style="display:none">
			<div class="popup_layer">

			</div>
			<div class="outer_popup">
				<div class="inner_popup">
					<div class="popup_imgarea">
						<img src="" style="width:100%;height:100%">
					</div>
					<div class="popup_toolbar">
						<div class="pop_toolbar_L" onclick="todaycloseWin();">
							1주일 동안 보지 않기
						</div>
						<div class="pop_toolbar_R" onclick="closeWin();">
							닫기
						</div>
					</div>
				</div>		
			</div>
		</div>

		<!-- 앨범정보 -->
		<div id="album_introd" class="hidden" style="z-index:230">
			<div class="ali_toolbar">
				<img src="" style="height:40px; margin-right:9px;">
			</div>
			<div class="ali_content">
				<div>
					<h2 class="ali_title"></p>
				</div>
				<div class="ali_swiper" style="margin:0; height: 70%">
					<p class="ali_text"></p>
				</div>
				<!-- <div style="position:fixed; background-color:#fff; opacity:0.9; bottom:0; left:0; width:100%; height:50px;"></div> -->
			</div>
		</div>

		<div class="all_boklet_pop" id="boklet_popup" style="display:none">
			<div class="boklet_popup">
				<div class="boklet_inner_popup">
					<div class="bok_toolbar">
						<img src="" style="height:40px; margin-right:9px;">
					</div>
					<div style="width:100%;height:100%">
						<div class="swiper-container boklet_popup_imgarea">
							<div id="booklet_detail" class="swiper-wrapper">
							</div>
						</div>
					</div>
				</div>		
			</div>
		</div>

		<div class="all_video_pop" id="video_popup" style="display:none">
			<div class="video_popup">
				<div class="video_inner_popup">
					<div class="vid_toolbar">
						<img src="" style="height:40px; margin-right:9px;">
					</div>
					<div class="video_popup_area">
						
					</div>
				</div>		
			</div>
		</div>

		<div class="all_review_pop" id="rv_popup" style="display:none">
			<div class="rv_popup">
				<div class="rv_inner_popup">
					<div class="rv_toolbar">
						<img src="" style="height:40px; margin-right:9px;">
					</div>
					<!-- <div class="rv_popup_imgarea">
						<img src="">
					</div> -->

					<div class="swiper-container rv_popup_imgarea">
						<div id="rv_detail" class="swiper-wrapper">
							<div class='swiper-slide'>
                        		<div id="rv_detail_zoom" class='swiper-zoom-container' data-swiper-zoom='5'>
                        			<img src="">
                        		</div>
                        	</div>
						</div>
					</div>
				</div>		
			</div>
		</div>
		<!-- to my fan 팝업S-->
		<div id="tmf_popup" class="overlay-container_wrap" style="display: none">
			<div id="overlaytmenu" class="overlay-container">
			<div class="tmf-content">
				<div class="tmf_wrap">
				<div class="tmf_header">
					<h2></h2>
					<span class="tmf_icon">
					<img
						src=""
						alt="to my fan"
					/>
					</span>
				</div>
				<div class="tmf_body">
					<div class="tmf_txt">
					<p>
						
					</p>
					</div>
				</div>
				<div class="tmf_footer">
					<div
					class="tmf_profile"
					></div>
					<!-- <div class="tmf_sign">
					<img
						src=""
						alt="싸인"
					/>
					</div> -->
				</div>
				</div>
			</div>
			<c3-overlay onclick="tmfClose()"
				><button class="hidden-button" aria-label="close"></button
			></c3-overlay>
			</div>
		</div>
		<!-- to my fan 팝업E-->

		<!-- 210512 신고눌렀을때 뜨는 팝업창 start-->
		<div id="report_popup" class="overlay-container_wrap" style="display: none;">
			<div id="overlaytmenu" class="overlay-container">
			<div class="overlay-content">
				<h2>신고하기</h2>
				<p class="report_mp">욕설 및 비방, 음란성 글 등</br>
				서비스에 부적합한 댓글로</br>
				신고하시겠습니까?</br>
				</p>
				<div class="report_btns">
				<button class="report_btn_c">취소</button>
				<button class="report_btn_r">신고하기</button>
				</div>
				<p class="report_line"></p>
				<p class="report_lastp">신고 글은 관리자 접수 후, 삭제 타당성</br> 여부를 확인한 뒤 삭제 진행됩니다.
				</p>
			</div>
			<c3-overlay
				><button class="hidden-button" aria-label="close"></button
			></c3-overlay>
			</div>
		</div>
		<!-- 신고눌렀을때 뜨는 팝업창 end-->
		<!-- 다른 사람 덧글 눌렀을때 뜨는 팝업창S -->
		<div id="addtionmenu"  style="display: none">
		<div class="amenu-container">
		<ul class="amenu-content">
			<!-- <li>
			<button class="amenu-item-button"></button>
			</li> -->
			<li>
			<button class="amenu-item-button amenu_report"></button>
			</li>
			<li>
			<button class="amenu-item-button amenu_cancel"></button>
			</li>
		</ul>
		<c3-overlay class="overlay_btn"
			><button class="hidden_amenu" aria-label="amenu_close"></button
		></c3-overlay>
		</div>
	</div>
		<!-- 다른 사람 덧글 눌렀을때 뜨는 팝업창E -->

		<!-- <span id="leftmenuswipe_close" class="close" style="display:none"></span> -->
		<div class="leftmenu_horizontal_swiper hidden">
			<div id="leftmenuswipe" class="swiper-wrapper">
				
			</div>
		</div>

		<div id="nc01_c" class="hidden">
			<div class="nfc_toparea">
				<div class="nfc_imgarea">
					<img src="./images/nc01_img_lock.png" alt="" height="140px">
				</div>
			</div>
			<div class="nfc_textarea" style="margin-top:-30px">
				<h1 class="nfc_titlehan">다른 기기에서<br>사용 중인 음반입니다.</h1>
				<p>새로운 기기로 등록을 원하시는 경우,<br>칩 디스크를 다시 태그해주세요. </p>
			</div>
			
			<div class="nfc_btnarea">
				<button class="btn_boraline">
					돌아가기 
				</button>
				<p id="os-type" style="display: none;"><?php echo($ostype); ?></p>
			</div>				
			<div class="nfc_footer">
				<img src="./images/nc01_img_logo.png" class="nfc_footer_logo">
				<p>음반 인증 관련 문의 soundgram.info@soundgram.co.kr</p>
			</div>
		</div>
	</div>
	<div id="toast"><div class="reveal"></div></div>
	<div id="imgch"></div>
</body>
</html>
