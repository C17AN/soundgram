<?php
	$albumid = $_REQUEST['albumid'];
	// $albumdiv = $_REQUEST['albumdiv'];
	// $albumleft = $_REQUEST['albumleft'];
	// $package = $_REQUEST['package'];
	$uuid = $_REQUEST['uuid'];
	$ostype = $_REQUEST['ostype'];
	$app_ver = $_REQUEST['app_ver'];
	$isGuide = $_REQUEST['isGuide']==""?"false":$_REQUEST["isGuide"];;
	$hosturl = $_SERVER['HTTP_HOST'];
	
	define('NAVER_CLIENT_ID', 'jqs6fMhdlwDS46pHx3D2'); 
	define('NAVER_CLIENT_SECRET', 'Zm3osSz58L');  
	define('NAVER_CALLBACK_URL', 'http://'.$hosturl.'/oauth/naverCallback.php?albumid='.$albumid.'&uuid='.$uuid); // 네이버 로그인 접근토큰 요청 예제 
	$naver_state = md5(microtime() . mt_rand()); 
	$naver_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".NAVER_CLIENT_ID."&redirect_uri=".urlencode(NAVER_CALLBACK_URL)."&state=".$naver_state;

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://devdisk.soundgram.co.kr/api/disk_info.php?albumid=".$albumid);
	curl_setopt($ch, CURLOPT_POST, $isPost);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$headers = array();
	$Response = curl_exec ($ch);
	$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close ($ch);

	$diskpath= json_decode($Response)[0]->diskpath; //diskpath만 따로 뺌
	$diskid= json_decode($Response)[0]->diskid; //diskid만 따로 뺌
?>



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
	<link rel="stylesheet" type="text/css" href="css/swiper-comm.css">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
	<!-- <link rel="stylesheet" type="text/css" href="css/zoom.css"> -->

	<!-- <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css"> -->
	
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400&display=swap" rel="stylesheet">

	<!-- <link rel="stylesheet" type="text/css" href="css/nfc_payment.css"> -->
	<link rel="stylesheet" type="text/css" href="css/toast.css">
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
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
	<!-- <script type="text/javascript" src="js/directive.js?v=1"></script> -->
    <script type="text/javascript" src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
    <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
	<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
    <!-- <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script> -->
	<script>
    	let confirm = new ConfirmClass();
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
			//카카오 로그인 관련
        	Kakao.init("795b9d6967488b64c13ddff90785a421");
        	Kakao.isInitialized();

			console.log("Kakao.isInitialized() :: " + Kakao.isInitialized());
			
        	soundgramApi.SOUNDGRAM_Initialize();
			// soundgramApi.albumid=getParameterByName("albumid");
			// soundgramApi.package=getParameterByName("package");
			soundgramApi.albumid='<?=$albumid?>';
			soundgramApi.package='<?=$package?>';
			soundgramApi.uuid='<?=$uuid?>';
			soundgramApi.ostype='<?=$ostype?>';
			soundgramApi.app_ver='<?=$app_ver?>';
			soundgramApi.naver_state='<?=$naver_state?>';
			
			var diskpath = "";
			var diskid = "";
			var album_type = "";
			var artistUrl = "";
			var app_ver ='<?=$app_ver?>';
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
		        success: function(data) {
		        	diskpath = data[0].diskpath;
		        	diskid = data[0].diskid;
		        	artistUrl = data[0].artist_url;
		        	album_type = diskid.substring(0,1);

		        	soundgramApi.diskpath=diskpath;
					soundgramApi.diskid=diskid;
					soundgramApi.album_type=album_type;
					soundgramApi.artistid=data[0].artist_id;
					soundgramApi.artistname=data[0].artist_name;
					soundgramApi.albumdiv = new Array();
					soundgramApi.leftmenudiv = new Array();
					soundgramApi.google_url = data[0].google_url;
					soundgramApi.apple_url = data[0].apple_url;

		        	noticePopupOnoff();
					$('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/album.css"+'" >').prependTo("head");
					$('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/font.css"+'" >').prependTo("head");
					$('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/media_query.css"+'" >').prependTo("head");
					$('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/main.css"+'" >').prependTo("head");
					$('<link rel="stylesheet" type="text/css" href="css/nfc_payment.css"'+' >').prependTo("head");
					$('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/common.css"+'" >').prependTo("head");
					$("div.si_footer").html("<p>Version "+app_ver+"</p>")

		        	addDeviceInfo();

					// var albumdiv = getParameterByName("albumdiv");
					// var albumdiv = '<?=$albumdiv?>';
					var albumdiv = data[0].category;
		            var a_div = albumdiv.split(",");
		            var ltclass = "tb_menu";
		            for(var i=0; i<a_div.length;i++) {
		                // $("div#swipe").append(makeMainPages(a_div[i], diskid));

		                var lm = "";
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
			            // 	var cuarr = ["a","b","c","d","e","f","g"];
			            // 	for(var cu=0; cu<7; cu++) {
			            // 		$("div.container_popup").append(getHTMLPageData(a_div[i]+"_"+cuarr[cu]));

			            // 		if(cu==0) {
			            // 			$("div#"+a_div[i]+"_a > div.mb_content > button.btn_bora").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_write.png");
			            // 			$("div#"+a_div[i]+"_a > div.mb_content > button.btn_boraline").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_login_color.png");
			            // 		}
			            // 		else if(cu==1) {
			            // 			$("div#"+a_div[i]+"_b > div.mb_content > button.btn_bora").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_login_white.png");
			            // 		}
			            // 		else if(cu==2) {
			            // 			$("div#"+a_div[i]+"_c > div.mb_content > button.btn_bora").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_write.png");
			            // 		}
			            // 		else if(cu==3) {
									$("div.container_popup").append(getHTMLPageData("cu01_d"));
			            			$("div#cu01_d").addClass("hidden");
			            // 		}
			            // 		else if(cu==4) {
			            // 			$("div#"+a_div[i]+"_e > div.mb_content > button#srhid").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_idcheck.png");
			            // 			$("div#"+a_div[i]+"_e > div.mb_content > button#temp_pass").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_pwcheck.png");
			            // 		}
			            // 		else if(cu==5) {
			            // 			$("div#"+a_div[i]+"_f > div.mb_content > button.btn_bora").children("img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_write.png");
			            // 		}
			            // 		else if(cu==6) {
			            // 			$("div#"+a_div[i]+"_g > div.profile > button#camera > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_photo.png");
			            // 			$("div#"+a_div[i]+"_g > div.mb_content > ul.mb_profile > li.nick > button#changenick > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_write.png");
			            // 			$("div#"+a_div[i]+"_g > div.mb_content > ul.mb_profile > li.nick > button#changetel > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_write.png");
			            // 			$("div#"+a_div[i]+"_g > div.mb_content > button#changepass > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_write.png");
			            // 			$("div#"+a_div[i]+"_g > div.mb_content > button#logout > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+a_div[i]+"_ic_logout.png");
			            // 		}
			            // 	}

			            	soundgramApi.cuid = a_div[i];
			            }
			            else if(lm=="nc") {

			            }
			            else if(lm=="ho" || lm=="al" || lm=="pl" || lm=="ga" || lm=="bo" || lm=="vi" || lm=="th" || lm=="st") {
		                	if(album_type=="p") {
		                		if(lm=="pl") {
									$("div.container").append(getHTMLPageData(a_div[i]));
									soundgramApi.premiumPlayer = a_div[i];
		                		}
		                		else {
		                			$("div#swipe").append(getHTMLPageData(a_div[i]));
		                			soundgramApi.albumdiv.push(a_div[i]);
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

				    	if(ltclass=="menu_main") {
				    		var title = "cover";
				    		if(lm=="al") title = "track list";
				    		else if(lm=="bo") title = "gallery";
				    		else if(lm=="vi") title = "video";
				    		else if(lm=="th") title = "thanks to";

				    		$("ul."+ltclass).append("<a id='"+lt+"'><li id='"+lt+"' class=''>"+title+"</li></a>")
				    	}
				    	else {
				    		$("ul."+ltclass).append("<a id='"+lt+"'><li id='"+lt+"' class='tb_"+lm+"_off'></li></a>")
				    	}
				    }
					
					//LEFT MENU BOTTOM(스케줄, SNS, 리뷰)
					for(var lt2=0; lt2<soundgramApi.leftmenudiv.length; lt2++) {
						// console.log(soundgramApi.leftmenudiv[lt2]);
						var lmb = soundgramApi.leftmenudiv[lt2].substring(0,2);
						var title = "";
						if(lmb=="sc") title = "SCHEDULE";
						else if(lmb=="sn") title = "SNS";
						else if(lmb=="rv") title = "REVIEW";

						$("ul.menu_sub").append("<li id='me_"+lmb+"' class='sub_0"+(lt2+1)+"'>"+title+"</li>");
					}

				    if(album_type=="p") {
				    	var value = jQuery.param({"uuid":soundgramApi.uuid, "albumid":soundgramApi.albumid});
				        $.ajax({
				            type : "POST",
				            url : "api/autologin.php",
				            data : value,
				            dataType: "json",
				            success: function(data) {
				                var returnCode = data.returnCode;
				                if(returnCode=="loginerr") {
				                	toast("비정상적인 접근입니다.");
				                }
				                else if(returnCode=="login_complete") {
				                    loginComplete(data);
				                }
				            }, 
				            error: function(xhr, textStatus, errorThrown) {
				                console.log(errorThrown);
				            }
				        });

					    // $("div#"+soundgramApi.albumdiv[0]+" > div.cover_img1").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+data[0].album_cover+"')"});
				        $("h2.list_title").text(data[0].album_name);
				        $("h3.list_artist").text(data[0].artist_name);
				        $("h4.play_artist").text(data[0].artist_name);

				        $("div.ali_toolbar > img").attr("src", ""+diskpath+"/"+diskid+"/images/cu01_btn_close.png");
				    	$("div.rv_toolbar > img").attr("src", ""+diskpath+"/"+diskid+"/images/rv02_btn_close.png");

				    	for(var i=0; i<soundgramApi.leftmenudiv.length;i++) {
				    		var lm = soundgramApi.leftmenudiv[i].substring(0,2);
				    		if(lm=="sn") {
				    			if(artistUrl==null || artistUrl=="") {
				    				// $("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a > h2").html(soundgramApi.artistname+"<br>Official Social Network Service");
									$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a").remove();
									$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns").append(soundgramApi.artistname+"<h2><br>Official Social Network Service</h2>");
				    			}
				    			else {
				    				$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a > h2").html(soundgramApi.artistname+"<br>공식홈페이지 <strong>바로가기</strong>");
				    				$("div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > div.sns > a").attr("href", artistUrl);
				    			}
				    		}
				  		}

				  		// 부클릿 미리 셋팅..
				  		$.ajax({
		                    type : "POST",
		                    url : "api/booklet_info.php",
		                    data : value,
		                    dataType: "json",
		                    success: function(data) {
		                        // $("div#booklet_img_list").empty();
		                        $.each(data, function(al) {
		                            var makeListHTML = makeHTML(album_type, "bookletlist", data[al], soundgramApi.artistname);
		                            $("div#booklet_img_list").append(makeListHTML);
		                        });

		                        vertical_booklet();
		                    }, 
		                    error: function(xhr, textStatus, errorThrown) {
		                        console.log(errorThrown);
		                    }
						});
						
						//리뷰에 크레딧, 싸인이미지 추가
						$("div.rv_deco").html("<h2>"+soundgramApi.artistname+"<br />팬 리뷰 페이지</h2><div class='rv_signimg2'></div>");

				  		// var kakao_key = "797fe68608c7d6985dda52ca2ce769b3";
				  		// var redirect_uri = "oauth/kakaologin_callback.php" 
		      //           $("#kakao").attr("href","https://kauth.kakao.com/oauth/authorize?response_type=code&client_id="+kakao_key+"&redirect_uri="+redirect_uri);

		    //             Kakao.Auth.createLoginButton({
						// 	container: '#kakao',
						// 	success: function(authObj) {
						// 	  Kakao.API.request({
						// 	    url: '/v2/user/me',
						// 	    success: function(res) {
						// 	      console.log(JSON.stringify(res))
						// 	    },
						// 	    fail: function(error) {
						// 	      console.log(
						// 	        'login success, but failed to request user information: ' +
						// 	          JSON.stringify(error)
						// 	      )
						// 	    },
						// 	  })
						// 	},
						// 	fail: function(err) {
						// 	  console.log('failed to login: ' + JSON.stringify(err))
						// 	},
						// });

						//네이버 로그인 관련
			   //      	var naverLogin = new naver.LoginWithNaverId(
						// 	{
						// 		clientId: "jqs6fMhdlwDS46pHx3D2",
						// 		callbackUrl: "http://disk.soundgram.co.kr/oauth/naverCallback.php",
						// 		isPopup: true,
						// 		callbackHandle: true,
						// 		// loginButton: {color: "green", type: 2, height: 60}
						// 	}
						// );

						// naverLogin.init();

						var naver_url = '<?=$naver_url?>';
						// if (soundgramApi.ostype == 2) { // 21.01.08 iOS를 다시 원래대로 수정
						// 	$("a#naverIdLogin_loginButton").removeAttr("href");
						// 	$("a#naverIdLogin_loginButton").attr("onclick", nlpopup(naver_url));
						// 	// $("a#naverIdLogin_loginButton").attr("href", naver_url);
                        // } else {
							// $("a#naverIdLogin_loginButton").attr("href", naver_url);
							$("a#naverIdLogin_loginButton").removeAttr("href");
							$("a#naverIdLogin_loginButton").attr("onclick", "window.open('"+naver_url+"','네이버로그인','width=480,height=600,scrollbar=no,status=no,menubar=no,toolbar=no')");
                        // }

						// $("a#naverIdLogin_loginButton").click(function() {
						// 	if(soundgramApi.ostype == 2) {
						// 		window.webkit.messageHandlers.test.postMessage($('a#naverIdLoginButton').attr('href'));
						// 	}
						// });
						//console.log($("div#leftmenuswipe > div").length);
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
						
						// 설치가 처음이면 가이드 나오도록 기능 추가(210310) #210311 iOS에서도 나와야하므로 주석처리
						 if(isGuide=="true") {
						 	$("div.overlay0").show();
						 }
					}

				    // if(soundgramApi.ostype=="0") nfc=false;

				    // window.setTimeout(function() {
					  //   if(nfc) {
				   //          $("div.container").children().addClass("hidden");
							// $("body").show();

				   //          moving_nfc(1);
				   //      }
				   //      else {
				        	$("div.container > div#nc01_a").addClass("hidden");
				        	
				        	goAuthNext(album_type, diskid);
				        // }
				    // },1000);
		        }, 
		        error: function(xhr, textStatus, errorThrown) {
		        	console.log(errorThrown);
		        }
			});
		});
		
		function nlpopup(naver_url) {
			var popup = window.open(naver_url,'네이버로그인','width=480,height=720,scrollbar=no,status=no,menubar=no,toolbar=no');
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
	<!-- <script>
		// 2. This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	  	// 3. This function creates an <iframe> (and YouTube player)
	  	//    after the API code downloads.
	  	var player;
		function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
				height: '200',
				width: '360',
				videoId: 'CUSTOM_ID',
				playerVars : {
					'enablejsapi': 0,
					'controls': 2, //플레이어 컨드롤러 표시여부
					'rel': 0, //연관동영상 표시여부
					'modestbranding' : 1,
					'playsinline' : 1,
					'showinfo' :0,
				},
				events: {
					'onReady' : onPlayerReady,
					'onStateChange': onPlayerStateChange
				}
			});
		}

	  	// 4. The API will call this function when the video player is ready.
		function onPlayerReady(event) {
			// event.target.playVideo();
		}

		// 5. The API calls this function when the player's state changes.
		//    The function indicates that when playing a video (state=1),
		//    the player should play for six seconds and then stop.
		var done = false;
		function onPlayerStateChange(event) {
			if(event.data==-1) {
				$("#player").hide();
			}
			else if(event.data == YT.PlayerState.PLAYING && !done) {
				// setTimeout(stopVideo, 6000);
				$("#player").show();
				done = true;
			}
			else {
				done = false;
			}
		}
		function stopVideo() {		
			player.stopVideo();
		}
	</script> -->
</head>
<body style="display:none">
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
					<img src="images/ho02_touch.png" alt="네비게이션 메뉴 터치" class="guide_img01"/>
				</div>
          		<p>터치해서</br>전체 메뉴를 열어보세요!</p>
        	</div>
        	<div class="guide_stap2_wrap">
				<div class="guide_stap2_circle"></div>
				<div class="guide_img02_wrap">
					<img src="images/ho02_slide.png" alt="왼쪽으로 밀어서 트랙리스트 보기" class="guide_img02"/>
				</div>
          		<p>왼쪽으로 밀면</br>앨범 트랙 리스트가 보여요! </p> 
        	</div>
        	<div class="guide_stap3_wrap">
          		<button class="guide_ok" onclick="guideOkButtonClick();">OK! 이해했어요!</button>
        	</div>
      	</div>
    </div>

	<div class="container_popup hidden">
		
	</div>

	<div class="container">
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
					<button class="m_pl_prevbtn"></button>
					<button class="m_pl_playbtn"></button>
					<button class="m_pl_nextbtn"></button>
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

		<!-- <span id="leftmenuswipe_close" class="close" style="display:none"></span> -->
		<div class="leftmenu_horizontal_swiper hidden">
			<div id="leftmenuswipe" class="swiper-wrapper">
				
			</div>
		</div>

		<div id="nc01_c" class="hidden">
			<div class="nfc_toparea">
				<div class="nfc_imgarea">
					<img src="images/nc01_img_lock.png" alt="" height="140px">
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
				<img src="images/nc01_img_logo.png" class="nfc_footer_logo">
				<p>음반 인증 관련 문의 soundgram.info@soundgram.co.kr</p>
			</div>
		</div>
	</div>
	<div id="toast"><div class="reveal"></div></div>
	<div id="imgch"></div>
</body>
</html>
