<script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="js/sha256.min.js"></script>
<script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<script type="text/javascript">
    
	// 210524 SignInWithApple from iOS - 문상혁 추가
	// iOS에서 애플로그인 성공시 호출될 함수
	function signInWithApple(userIdentifier, fullName, email, uuid) {
		console.log(userIdentifier, fullName, email, uuid);
		if(fullName.length === 0) {
			// 로그인일 경우
			var value = jQuery.param({"id":userIdentifier, "passwd":sha256(''), "uuid":uuid, "type":"L", "albumid":albumid});
			console.log(value);
			$.ajax({
				type: "POST",
				url: "api/login.php",
				data: value,
				dataType: "json",
				success: (data) => {
					console.log(data);
					var returnCode = data.returnCode;
					if(returnCode == "login_complete") {
						if(isiplayer === "true") {
							if(ostype == 2) {
								window.webkit.messageHandlers.SoundgramLogin.postMessage(data.user_id);
							}
						}
						else {
							opener.loginComplete(data);
						}

						window.self.close();
						window.webkit.messageHandlers.SoundgramLogin.postMessage("windowClose");
					}
					else loginError();
				},
				error: (xhr, textStatus, errorThrown) => {
					console.log(errorThrown);
				}
			});
		} else {
			// 회원가입일 경우
			goJoin(fullName, userIdentifier, '', '', fullName, 4, 'default/profile_none.png');
		}
	}

	
	function getSNSUser(name, id, password, tel, nick, snstype, uuid, device_id, profile, albumid) {
        var rcode="";
        var value = jQuery.param({
            "name":name
            , "userid":id
            , "passwd":sha256(password)
            , "phone":tel
            , "nick":nick
            , "snstype":snstype
            , "uuid":uuid
            , "device_id":device_id
            , "profile":profile
            , "albumid":albumid
        });

        $.ajax({
            type : "POST",
            url : "api/getSNSUser.php",
            data : value,
            dataType: "json",
            success: function(data) {
                var returnCode = data.returnCode;
                if(returnCode=="join_complete") {
                    if(isiplayer=="true") {
                        // 210326 추가 ios 로그인팝업 닫기 - 문상혁
                        window.webkit.messageHandlers.SoundgramLogin.postMessage("windowClose");
                        window.webkit.messageHandlers.SoundgramLogin.postMessage(data.user_id);
                    }
                    else {
                        opener.loginComplete(data);
                    }
                    
                    window.self.close();
                }
                else {
                    var pageload = window.setInterval(function() {
                        if($("div.container_popup > div").length==7) {
                            window.clearInterval(pageload);
                            
                            $("div.container_popup").children().addClass("hidden");
                            $("div.container_popup > div#cu01_h").removeClass("hidden");
                        }
                    },100);
                }
            }, 
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        return rcode;
    }
</script>

<?php
    $albumid = $_REQUEST['albumid'];
    $device_id = $_REQUEST['device_id'];
    $uuid = $_REQUEST['uuid'];
    $diskpath = $_REQUEST['diskpath'];
    $diskid = $_REQUEST['diskid'];
    $isiplayer = $_REQUEST['isiplayer'];
    $hosturl = $_SERVER['HTTP_HOST'];
    $logintype = $_REQUEST['logintype'];
    $returnCode = $_REQUEST["code"]; // 서버로 부터 토큰을 발급받을 수 있는 코드를 받아옵니다.
    $state = $_REQUEST['state'];
    $ostype = $_REQUEST['ostype']==""?"":$_REQUEST["ostype"]; // 21.02.10 iOS에서 소셜로그인 버튼을 누르고 X(닫기)버튼을 누르면 member_close()가 안먹히는 이슈가 있어 추가(조유빈)
    
    $id=null;
    $name=null;
    $profile=null;
    $access_token=null;

    // $server_url = "http://disk.soundgram.co.kr";
    // if($hosturl=="devdisk.soundgram.co.kr") {
    //     $server_url = "https://devdisk.soundgram.co.kr";
    // }

    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
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
	define('NAVER_CALLBACK_URL', $server_url.'/login_popup.php?logintype=naver&albumid='.$albumid.'&device_id='.$device_id.'&uuid='.$uuid.'&isiplayer='.$isiplayer.'&diskpath='.$diskpath.'&diskid='.$diskid); // 네이버 로그인 접근토큰 요청 예제 
	$naver_state = md5(microtime() . mt_rand()); 
    $naver_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".NAVER_CLIENT_ID."&redirect_uri=".urlencode(NAVER_CALLBACK_URL)."&state=".$naver_state;
    
    if($logintype==null) {
        $param_arr = explode(',', $state);
        $logintype = $param_arr[0];
    }

    if($logintype!=null) {
        //카카오 로그인opener.member_close();
        if($logintype=="kakao") {
            // 추가 파라미터 받기
            $param_arr = explode(',', $state);
            $albumid = $param_arr[1];
            $device_id = $param_arr[2];
            $uuid = $param_arr[3];
            $isiplayer = $param_arr[4];
            $diskpath = $param_arr[5];
            $diskid = $param_arr[6];

            $restAPIKey = "797fe68608c7d6985dda52ca2ce769b3"; // 본인의 REST API KEY를 입력해주세요
            // $callbacURI = urlencode("https://".$hosturl."/login_popup.php?logintype=kakao&albumid=".$albumid."&device_id=".$device_id."&uuid=".$uuid."&isiplayer=".$isiplayer); // 본인의 Call Back URL을 입력해주세요
            $callbacURI = urlencode($server_url."/login_popup.php"); // 본인의 Call Back URL을 입력해주세요
            // API 요청 URL
            $returnUrl = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=".$restAPIKey."&redirect_uri=".$callbacURI."&code=".$returnCode;
        
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $returnUrl);
            curl_setopt($ch, CURLOPT_POST, $isPost);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            $headers = array();
            $loginResponse = curl_exec ($ch);
            $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close ($ch);

            // var_dump($loginResponse); // Kakao API 서버로 부터 받아온 값
            $access_token= json_decode($loginResponse)->access_token; //Access Token만 따로 뺌

            $app_url= "https://kapi.kakao.com/v2/user/me"; 
            $opts = array( CURLOPT_URL => $app_url, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_POST => true, CURLOPT_POSTFIELDS => false, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array( "Authorization: Bearer " . $access_token ) ); 
            $ch = curl_init(); curl_setopt_array($ch, $opts); 
            $result = curl_exec($ch); 
            curl_close($ch);

            $kakao_responseArr = json_decode($result, true);
            if($kakao_responseArr['id']) {
                $id = "kk_".$kakao_responseArr['id'];
                $name = $kakao_responseArr['properties']['nickname'];
                $profile = $kakao_responseArr['properties']['thumbnail_image'];

                // echo("<script>goJoin('".$name."','".$id."','".$id."',' ','".$name."','1','".$profile."');</script>");
?>
                <script type="text/javascript">
                    // 필수 파라미터 값
                    var albumid = '<?=$albumid?>';
                    var device_id = '<?=$device_id?>';
                    var uuid = '<?=$uuid?>';
                    var isiplayer = '<?=$isiplayer?>';

                    // SNS로그인 필수 파라미터값
                    var name = '<?=$name?>';
                    var id = '<?=$id?>';
                    var password = '<?=$id?>';
                    var tel = ' ';
                    var nick = '<?=$name?>';
                    var profile = '<?=$profile?>';
                    
                    // 회원가입인지 로그인인지 체크
                    getSNSUser(name, id, password, tel, nick, 1, uuid, device_id, profile, albumid);
                </script>
<?php
            }
        }
        // 네이버 로그인
        else if($logintype=="naver") {
            $naver_curl = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=".NAVER_CLIENT_ID."&client_secret=".NAVER_CLIENT_SECRET."&redirect_uri=".urlencode(NAVER_CALLBACK_URL)."&code=".$_GET['code']."&state=".$_GET['state']; 
            // 토큰값 가져오기 
            $is_post = false; 
            $ch = curl_init(); 
            curl_setopt($ch, CURLOPT_URL, $naver_curl); 
            curl_setopt($ch, CURLOPT_POST, $is_post); 
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
            $response = curl_exec ($ch); 
            $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE); 
            curl_close ($ch); 
            if($status_code == 200) { 
                $responseArr = json_decode($response, true); 
                // $_SESSION['naver_access_token'] = $responseArr['access_token']; 
                // $_SESSION['naver_refresh_token'] = $responseArr['refresh_token']; 
                // 토큰값으로 네이버 회원정보 가져오기 
                $access_token = $responseArr['access_token'];
                $me_headers = array( 'Content-Type: application/json', sprintf('Authorization: Bearer %s', $responseArr['access_token']) ); 
                $me_is_post = false; 
                $me_ch = curl_init(); 
                curl_setopt($me_ch, CURLOPT_URL, "https://openapi.naver.com/v1/nid/me"); 
                curl_setopt($me_ch, CURLOPT_POST, $me_is_post); 
                curl_setopt($me_ch, CURLOPT_HTTPHEADER, $me_headers); 
                curl_setopt($me_ch, CURLOPT_RETURNTRANSFER, true); 
                $me_response = curl_exec ($me_ch); 
                $me_status_code = curl_getinfo($me_ch, CURLINFO_HTTP_CODE); 
                curl_close ($me_ch); 
                $me_responseArr = json_decode($me_response, true); 
                if ($me_responseArr['response']['id']) { 
                    $id = 'nv_'.$me_responseArr['response']['id']; 
                    $name = $me_responseArr['response']['name']; // 이름 
                    $nickname = $me_responseArr['response']['nickname']==""?$name:$me_responseArr['response']['nickname']; // 닉네임 
                    $profile = $me_responseArr['response']['profile_image']; // 프로필 이미지
                    
                    // echo("<script language='text/javascript'>goJoin('".$nickname."','".$id."','".$id."',' ','".$nickname."','1','".$profile."');</script>");
?>
                    <script type="text/javascript">
                    // 필수 파라미터 값
                    var albumid = '<?=$albumid?>';
                    var device_id = '<?=$device_id?>';
                    var uuid = '<?=$uuid?>';
                    var isiplayer = '<?=$isiplayer?>';

                    // SNS로그인 필수 파라미터값
                    var name = '<?=$name?>';
                    var id = '<?=$id?>';
                    var password = '<?=$id?>';
                    var tel = ' ';
                    var nick = '<?=$name?>';
                    var profile = '<?=$profile?>';
                    
                    // 회원가입인지 로그인인지 체크
                    getSNSUser(name, id, password, tel, nick, 2, uuid, device_id, profile, albumid);
                </script>
<?php
                } 
                else { 
                    // 회원정보를 가져오지 못했습니다. 
                    $returnCode="1";
                } 
            } 
            else { 
                // 토큰값을 가져오지 못했습니다. 
                $returnCode="2";
            }
        }
        else if($logintype=="google") {
            $param_arr = explode(',', $state);
            $albumid = $param_arr[1];
            $device_id = $param_arr[2];
            $uuid = $param_arr[3];
            $isiplayer = $param_arr[4];
            $diskpath = $param_arr[5];
            $diskid = $param_arr[6];

            define('GOOGLE_CLIENT_ID', '328053066691-3jcqkuq4g8qr56af8jgh2g510rne7mnc.apps.googleusercontent.com');
            define('GOOGLE_CLIENT_SECRET', 'Kd11d0Z7kgXqKWBFkR43RjOX');
            define('GOOGLE_REDIRECT_URL', 'http://devdisk.soundgram.co.kr/login_popup.php');

            // Include Google API client library
            require_once 'google/vendor/autoload.php';
            
            //Make object of Google API Client for call Google API
            $google_client = new Google_Client();
            
            //Set the OAuth 2.0 Client ID
            $google_client->setClientId(GOOGLE_CLIENT_ID);
            
            //Set the OAuth 2.0 Client Secret key
            $google_client->setClientSecret(GOOGLE_CLIENT_SECRET);
            
            //Set the OAuth 2.0 Redirect URI
            $google_client->setRedirectUri(GOOGLE_REDIRECT_URL);
            
            $google_client->addScope('email');
            $google_client->addScope('profile');

            // authenticate code from Google OAuth Flow
            if (isset($_GET['code'])) {
                $token = $google_client->fetchAccessTokenWithAuthCode($_GET['code']);
                $google_client->setAccessToken($token['access_token']);
                
                // get profile info
                $google_oauth = new Google_Service_Oauth2($google_client);
                $google_account_info = $google_oauth->userinfo->get();
                $email =  $google_account_info->email;
                $id =  "g_".$google_account_info->id;
                $profile = $google_account_info->picture;
                $access_token = $token['access_token'];

?>
                <script type="text/javascript">
                    // 필수 파라미터 값
                    var albumid = '<?=$albumid?>';
                    var device_id = '<?=$device_id?>';
                    var uuid = '<?=$uuid?>';
                    var isiplayer = '<?=$isiplayer?>';

                    // SNS로그인 필수 파라미터값
                    var name = '<?=$name?>';
                    var id = '<?=$id?>';
                    var password = '<?=$id?>';
                    var tel = ' ';
                    var nick = '<?=$name?>';
                    var profile = '<?=$profile?>';
                    
                    // 회원가입인지 로그인인지 체크
                    getSNSUser(name, id, password, tel, nick, 5, uuid, device_id, profile, albumid);
                </script>
<?php
                
                // now you can use this profile info to create account in your website and make user logged in.
            } else {
                echo "<a href='".$google_client->createAuthUrl()."'>Google Login</a>";
            }
        }
    }
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
    <meta name="viewport" content="viewport-fit=cover, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="328053066691-3jcqkuq4g8qr56af8jgh2g510rne7mnc.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
    
    <link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400&display=swap" rel="stylesheet">
    <!-- <link rel="stylesheet" type="text/css" href="css/common.css"> -->
    <link rel="stylesheet" type="text/css" href="css/swiper-comm.css">
    <link rel="stylesheet" type="text/css" href="css/toast.css">

    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
    <!-- <script type="text/javascript" src="js/common.js"></script> -->
    <script type="text/javascript" src="js/component.js"></script>
    <script type="text/javascript" src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
    <!--<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>-->
    <script>
        let confirm = new ConfirmClass();
    </script>
    <script>
        function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
            console.log('statusChangeCallback');
            console.log(response);                   // The current login status of the person.
            if (response.status === 'connected') {   // Logged into your webpage and Facebook.
                testAPI();  
            } else {                                 // Not logged into your webpage or we are unable to tell.
                document.getElementById('status').innerHTML = 'Please log ' +
                'into this webpage.';
            }
        }


        function checkLoginState() {               // Called when a person is finished with the Login Button.
            FB.getLoginStatus(function(response) {   // See the onlogin handler
                statusChangeCallback(response);
            });
        }


        window.fbAsyncInit = function() {
            FB.init({
                appId      : '256432538625972',
                cookie     : true,                     // Enable cookies to allow the server to access the session.
                xfbml      : true,                     // Parse social plugins on this webpage.
                version    : '{api-version}'           // Use this Graph API version for this call.
            });


            FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
                statusChangeCallback(response);        // Returns the login status.
            });
        };

        function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
            });
        }

    </script>
    <script type="text/javascript">
        var albumid = '<?=$albumid?>';
        var device_id = '<?=$device_id?>';
        var uuid = '<?=$uuid?>';
        var diskpath = '<?=$diskpath?>';
        var diskid = '<?=$diskid?>';
        var isiplayer = '<?=$isiplayer?>';
        var ostype = '<?=$ostype?>';// 21.02.10 iOS에서 소셜로그인 버튼을 누르고 X(닫기)버튼을 누르면 member_close()가 안먹히는 이슈가 있어 추가(조유빈)
        var naver_state = '<?=$naver_state?>';
        var server_url = '<?=$server_url?>';

        // SNS로그인 필수 파라미터값
        var name = '<?=$name?>';
        var id = '<?=$id?>';
        var profile = '<?=$profile?>';
        var access_token = '<?=$access_token?>';
        
        $(document).ready(function(){
            //카카오 로그인 관련
        	Kakao.init("795b9d6967488b64c13ddff90785a421");
        	Kakao.isInitialized();

			// console.log("Kakao.isInitialized() :: " + Kakao.isInitialized());
            
            $('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/font.css"+'" >').prependTo("head");
			$('<link rel="stylesheet" type="text/css" href="'+diskpath+'/'+diskid+"/css/media_query.css"+'" >').prependTo("head");
            $('<link rel="stylesheet" type="text/css" href="/css/common.css">').prependTo("head");

            $("body").show();
        });

        $(window).load(function() {
            // var cuarr = ["a","b","c","d","e","f","g"];
			var cuarr = ["b","c","d","e","f","g","h"];
            for(var cu=0; cu<cuarr.length; cu++) {
                $("div.container_popup").append(getHTMLPageData("cu01_"+cuarr[cu]));

                // if(cu==0) {
                //     $("div#cu01_a > div.mb_content > button.btn_bora").children("img").attr("src",""+opener.soundgramApi.diskpath+"/"+opener.soundgramApi.diskid+"/images/cu01_ic_write.png");
                //     $("div#cu01_a > div.mb_content > button.btn_boraline").children("img").attr("src",""+opener.soundgramApi.diskpath+"/"+opener.soundgramApi.diskid+"/images/cu01_ic_login_color.png");
                // }
                // else if(cu==1) {
                if(cu==0) {
                    $("div#cu01_b > div.mb_content > button.btn_bora").children("img").attr("src","/images/cu01_ic_login_white.png");

                    var naver_url = '<?=$naver_url?>';
                    $("a#naverIdLogin_loginButton").attr("href", naver_url);
                }
                else if(cu==1) {
                    $("div#cu01_c > div.mb_content > button.btn_bora").children("img").attr("src","/images/cu01_ic_write.png");
                }
                else if(cu==2) {
                    $("div#cu01_d").addClass("hidden");
                }
                else if(cu==3) {
                    $("div#cu01_e > div.mb_content > button#srhid").children("img").attr("src","/images/cu01_ic_idcheck.png");
                    $("div#cu01_e > div.mb_content > button#temp_pass").children("img").attr("src","/images/cu01_ic_pwcheck.png");
                }
                else if(cu==4) {
                    $("div#cu01_f > div.mb_content > button.btn_bora").children("img").attr("src","/images/cu01_ic_write.png");
                }
                else if(cu==5) {
                    $("div#cu01_g > div.profile > button#camera > img").attr("src","/images/cu01_ic_photo.png");
                    $("div#cu01_g > div.mb_content > ul.mb_profile > li.nick > button#changenick > img").attr("src","/images/cu01_ic_write.png");
                    $("div#cu01_g > div.mb_content > ul.mb_profile > li.nick > button#changetel > img").attr("src","/images/cu01_ic_write.png");
                    $("div#cu01_g > div.mb_content > button#changepass > img").attr("src","/images/cu01_ic_write.png");
                    $("div#cu01_g > div.mb_content > button#logout > img").attr("src","/images/cu01_ic_logout.png");
					
					if(isiplayer == "true") {		// 210405 문상혁 추가 : iOS 뮤직 플레이어에서 열면 opner가 없어서 처리.
						$("button#changepass").hide();
					} else {
                    	if(opener.soundgramApi.snstype!="0") {
                        	$("button#changepass").hide();
                    	}
                    	else {
                        	$("button#changepass").show();
                    	}
					}

                }
            }
            
            // var makecu = window.setInterval(function() {
                // if($("div.container_popup > div").length==6) {
                    // window.clearInterval(makecu);
                    EventGather();
                    
                    if(isiplayer=="true") {
                        $("div.container_popup > div:nth-child(1)").removeClass("hidden");
                    }
                    else {
                        if(opener.soundgramApi.loginoutflag=="1") {
							let account = opener.soundgramApi.account.length > 20 
								? opener.soundgramApi.account.slice(20) + "..." 
								: opener.soundgramApi.account;
                            $("div.container_popup").children().addClass("hidden");
                            $("div#cu01_g").removeClass("hidden");
                            $("div.profile").css({"background-image":"url('"+opener.soundgramApi.profileimg+"')"});
                            $("li#profile_name").html("<span>이름</span>"+opener.soundgramApi.username);
                            $("li#profile_id").html("<span>ID</span>"+"<span>"+account+"</span>");
                            $("input#profile_nick").val(opener.soundgramApi.nick);
                            $("input#profile_tel").val(opener.soundgramApi.tel);
                            $("li#profile_regdate").html("<span>가입일</span>"+opener.soundgramApi.regdate);
                            
                            effect("div#cu01_g");
                        }
                        else {
                            $("div.container_popup > div:nth-child(1)").removeClass("hidden");

                        }
                    }

                    $("div.container_popup").removeClass("hidden");
            //     }
            // }, 100);
        });

        function getHTMLPageData(page) {
            var returnData = "";

            $.ajax({
                url: ""+diskpath + "/pages/"+page+".html"
                , type: "POST"
                , async: false
            }).done(function(data) {
                returnData = data;
            });

            return returnData;
        }

		function checkCameraAuth(auth) { // 카메라/앨범 권한 옵션을 기기에서 확인 후 카메라/앨범을 실행시키기 위함 - 상혁(03/15)
			if(auth == 1) {
				$('#uploadImage').click();
			} else {
				reutrn;
			}
		}
		
		function EventGather() {
            $("div#cu01_a > div.mb_content > button.btn_boraline").click(function() {
                $("div#cu01_a").addClass("hidden");
                $("div#cu01_b").removeClass("hidden");
                $("header#pop_top").removeClass("hidden");
                
                effect("div#cu01_b");
                effect("header#pop_top");
            });

            $("div#cu01_b > div.mb_content > button#join").click(function() {
                $("div#cu01_b").addClass("hidden");
                $("div#cu01_c").removeClass("hidden");
                // $("div#member_input > input").eq(0).focus().select();
                // $("div#member_input > div").eq(0).addClass("hidden");
                // $("header#pop_top").removeClass("hidden");
                
                effect("div#cu01_c");
                // effect("header#pop_top");
            });

            $("div#cu01_b > div.mb_content > button.btn_bora").click(function() {
                var id = $("input#loginid").val();
                var password = $("input#loginpassword").val();
                
                if(id.length==0) {
                    $("div#loginidalert").removeClass("hidden").text("아이디를 입력해주세요.");
                    $("input#loginid").focus().select();
                    return false;
                }

                if(password.length==0) {
                    $("div#loginpassalert").removeClass("hidden").text("패스워드를 입력해주세요.");
                    $("input#loginpassword").focus().select();
                    return false;
                }
                // console.log(sha256(password));
                var value = jQuery.param({"id":id, "passwd":sha256(password), "uuid":uuid, "type":"L", "albumid":albumid});
                // console.log(value);
                $.ajax({
                    type : "POST",
                    url : "api/login.php",
                    data : value,
                    dataType: "json",
                    success: function(data) {
                        // console.log(data);
                        var returnCode = data.returnCode;
                        if(returnCode=="login_complete") {
                            if(isiplayer=="true") {
								if(ostype == 2) {
                                	window.webkit.messageHandlers.SoundgramLogin.postMessage(data.user_id);
								}
                            }
                            else {
                                opener.loginComplete(data);
                            }
                            
                            window.self.close();
                        }
                        else loginError();
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            });

            $("input#loginid").keyup(function() {
                if($("div#loginidalert").is(":visible")) $("div#loginidalert").addClass("hidden");
            });

            $("input#loginpassword").keyup(function() {
                if($("div#loginpassalert").is(":visible")) $("div#loginpassalert").addClass("hidden");
            });
            
            $("div#member_input > input").keyup(function() {
                var cuid = $(this).parents("div:eq(2)").attr("id");
                var idx = $(this).index();
                var id = $(this).attr("id");
                if(id=="id" || id=="nick") {
                    var getCheck= /^[a-zA-Z0-9]/;
                    if(getCheck.test($(this).val())) {
                        $(this).val($(this).val().replace(/[^a-zA-Z0-9]/g,""));
                    }

                    if(id=="id") {
                        $("div#member_input > div").eq(idx/2).text("6~20자의 공백 없는 영문+숫자로 입력하세요.");
                    }
                    else {
                        if(cuid.split("_")[1]=="h") {
                            $(this).next().text("한글 1~10자, 영문 2~20자, 숫자를 입력하세요. (조합 가능)");
                        }
                        else {
                            $("div#member_input > div").eq(idx/2).text("한글 1~10자, 영문 2~20자, 숫자를 입력하세요. (조합 가능)");
                        }
                    }
                }
                else if(id=="password_org") {
                    var getCheck= /\s/;
                    if(getCheck.test($(this).val)) {
                        $(this).val($(this).val().replace(/\s/g,""));
                    }
                }
                else if(id=="tel" || id=="tel_sns") {
                    var getCheck= /^[0-9]*$/;
                    if(!getCheck.test($(this).val())) {
                        $(this).val($(this).val().replace(/[^0-9]/g,""));
                    }
                }

                if($(this).val().length==$(this).attr("maxlength")) {
                    // $(this).val($(this).val().substring(0, $(this).attr("maxlength")));
                    return false;
                }
            });

            $("div#sns_input > input").keyup(function() {
                var idx = $(this).index();
                var id = $(this).attr("id");
                if(id=="nick") {
                    $(this).next().text("한글 1~10자, 영문 2~20자, 숫자를 입력하세요. (조합 가능)");
                }
                else if(id=="tel_sns") {
                    var getCheck= /^[0-9]*$/;
                    if(!getCheck.test($(this).val())) {
                        $(this).val($(this).val().replace(/[^0-9]/g,""));
                    }
                }

                if($(this).val().length==$(this).attr("maxlength")) {
                    return false;
                }
            });

            $("div#cu01_c > div.mb_content > button.btn_bora").click(function() {
                // $("div#cu01_b").animate({"padding":"20% 0 0 0"}, 400);

                var name = $("input#name").val();
                var id = $("input#id").val();
                var password_org = $("input#password_org").val();
                var password = $("input#password").val();
                var tel = $("input#tel").val();
                var nick = $("input#nick").val();

                var getCheck= /^[a-zA-Z0-9]{4,12}$/gi;
                var getPassCheck = /[~!@#$%^&*()_+|<>?:{}]/gi;

                if(name.length==0) {
                    $("input#name").focus().select();
                    $("div#member_input > div").eq(3).text("이름을 입력해주세요.");
                    return;
                }

                if(id.length==0) {
                    $("input#id").focus().select();
                    return;
                }

                if(id.length<6 || id.length>20) {
                    $("input#id").focus().select();
                    return;   
                }

                if(!getCheck.test(id)) {
                    $("input#id").val("").focus().select(); 
                    return;
                }

                if(password_org.length==0) {
                    $("input#password_org").focus().select();
                    return;
                }

                if(!getPassCheck.test(password_org)) {
                    $("input#password_org").val("");
                    $("input#password").val("");

                    $("input#password_org").focus().select();
                    return;
                }

                if(password_org.length<8 || password_org.length>16) {
                    $("input#password_org").focus().select();
                    return;   
                }

                if(password.length==0) {
                    $("input#password").focus().select();
                    return;
                }

                if(tel.length==0) {
                    $("input#tel").focus().select();
                    return;
                }

                if(nick.length==0) {
                    $("input#nick").focus().select();
                    return;
                }

                goJoin(name, id, password, tel, nick, "0", "");
            });

            $("div.mb_title, div.alert, button#goJoin, button#temp_pass").click(function(e) {
                $("div#cu01_c").animate({"padding":"20% 0 0 0"}, 400);
                $("div#cu01_f").animate({"padding":"20% 0 0 0"}, 400);

                var cuid = $(this).parents("div:eq(1)").attr("id");
                if(cuid.split("_")[1]=="h") {
                    var nick = $("input#nick_sns").val();
                    var tel = $("input#tel_sns").val();
                    
                    if(nick.length==0) {
                        $("input#nick_sns").focus().select();
                        return;
                    }

                    if(tel.length==0) {
                        $("div#tel_alert").removeClass("hidden").text("휴대폰 번호를 입력해주세요.");
                        $("input#tel_sns").focus().select();
                        return;
                    }

                    if(tel.length<11) {
                        $("div#tel_alert").removeClass("hidden").text("휴대폰 번호를 입력해주세요.");
                        $("input#tel_sns").focus().select();
                        return;
                    }

                    var sns=id.split("_")[0];
                    var snstype = 1;                //카카오 로그인(기본)
                    if(sns=="nv") snstype=2;        //네이버 로그인
                    else if(sns=="g") snstype=5;    //구글로그인

                    var value = jQuery.param({
                        "name":name==""?nick:name
                        , "userid":id
                        , "passwd":sha256(id)
                        , "phone":tel
                        , "nick":nick
                        , "snstype":snstype
                        , "uuid":uuid
                        , "device_id":device_id
                        , "profile":profile
                        , "albumid":albumid
                        , "access_token":access_token
                    });

                    $.ajax({
                        type : "POST",
                        url : "api/join_sns.php",
                        data : value,
                        dataType: "json",
                        success: function(data) {
                            var returnCode = data.returnCode;
                            if(returnCode=="join_complete") {
                                if(isiplayer=="true") {
                                    // 210326 추가 ios 로그인팝업 닫기 - 문상혁
                                    window.webkit.messageHandlers.SoundgramLogin.postMessage("windowClose");
                                    window.webkit.messageHandlers.SoundgramLogin.postMessage(data.user_id);
                                }
                                else {
                                    opener.loginComplete(data);
                                }
                                
                                window.self.close();
                            }
                            else {
                                if(returnCode=="already_nick") {
                                    $("div#sns_input > div").eq(0).text("이미 사용 중인 닉네임입니다.").removeClass("hidden");
                                }
                                else if(returnCode=="already_phone") {
                                    $("div#sns_input > div").eq(1).text("이미 사용 중인 휴대폰번호입니다.").removeClass("hidden");
                                }
                            };
                        }, 
                        error: function(xhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                }
            });

            // $("div.mb_title, div.alert, button#goJoin").click(function() {
            //     $("div#cu01_b").animate({"padding":"20% 0 0 0"}, 400);
            // });

            $("div.container_popup").click(function(e) {
                if($("div#cu01_c").is(":visible")) {
                    if(e.target.className=="input_style" || e.target.className=="mb_form") return false;
                    else {
                        $("div#cu01_c").animate({"padding":"20% 0 0 0"}, 400);
                    }
                }
                else if($("div#cu01_g").is(":visible")) {
                    if(e.target.className=="input_style" || e.target.className=="mb_form") return false;
                    else {
                        $("div#cu01_g").animate({"padding":"12% 0 0 0"}, 400);
                    }
                }
                else if($("div#cu01_f").is(":visible")) {
                    if(e.target.className=="input_style" || e.target.className=="mb_form") return false;
                    else {
                        $("div#cu01_f").animate({"padding":"20% 0 0 0"}, 400);
                    }
                }
            });

            $("div#member_input > input").focusin(function(e) {
                $("div#member_input > div").each(function(idx) {
                    if(!$("div#member_input > div").eq(idx).hasClass("hidden")) $("div#member_input > div").addClass("hidden");
                });

                // var idx = $("div#member_input > input:focus").index();
                var idx = $(this).index();
                if((idx>0&&idx<8) || idx==10) {
                    var padding = (20-(idx*4))+"% 0 0 0";
                    $("div#cu01_c").animate({"padding":padding}, 400);
                    $("div#member_input > div").eq(idx/2).removeClass("hidden");
                }
            });

            $("div#sns_input > input").focusin(function(e) {
                $("div#sns_input > div").each(function(idx) {
                    if(!$("div#sns_input > div").eq(idx).hasClass("hidden")) $("div#sns_input > div").addClass("hidden");
                });

                // var idx = $("div#member_input > input:focus").index();
                var cuid = $(this).parents("div:eq(2)").attr("id");
                var idx = $(this).index();
                
                $(this).next().removeClass("hidden");
            });

            $("input#password").keyup(function() {
                var pwd1 = $("input#password_org").val();
                var pwd2 = $("input#password").val();

                if(pwd1==pwd2) {
                    $("div#member_input > div").eq(3).addClass("hidden");
                }
                else {
                    if($("input#password").val().length==0) {
                        $("div#member_input > div").eq(3).text("비밀번호를 한번 더 입력해주세요.");
                    }            
                    else {
                        $("div#member_input > div").eq(3).text("비밀번호가 맞지 않아요!");
                    }
                }
            });

            $("div#cu01_b > div.mb_content > ul > li > a").click(function() {
                var id = $(this).attr("id");
                
                //카카오 로그인
                if(id=="kakao") {
                    // Kakao.Auth.login({
                    //     success: function(authObj) {
                    //         // alert(JSON.stringify(authObj));
                    //         Kakao.API.request({
                    //             url : "/v2/user/me"
                    //             , success : function( res ) {
                    //                     var id = "kk_"+res.id;
                    //                     var name = res.properties.nickname;
                    //                     var profile = res.properties.thumbnail_image;

                    //                     opener.goJoin(name, id, id, " ", name, "1", profile);
                    //             }, 
                    //             fail : function( error ) {
                    //                 console.log( JSON.stringify( error ) );
                    //             }
                    //         });
                    //     },
                    //     fail: function(err) {
                    //         console.log(err);
                    //         alert(JSON.stringify(err))
                    //     },
                    // });

                    // redirectUri: 'https://devdisk.soundgram.co.kr/login_popup.php?logintype=kakao&albumid='+albumid+'&device_id='+device_id+'&uuid='+uuid+'&isiplayer='+isiplayer

                    var param = ["kakao",albumid,device_id,uuid,isiplayer];
                    var value = jQuery.param({"logintype":"kakao", "albumid":albumid, "device_id":device_id, "uuid":uuid, "isiplayer":isiplayer});
                    Kakao.Auth.authorize({
                        redirectUri: server_url+'/login_popup.php',
                        state: param.join(","),
                        throughTalk: false,
                    });
                }
                else if(id=="apple") {
					window.webkit.messageHandlers.SoundgramLogin.postMessage('signInWithApple');
					//AppleID.auth.init({
                    //    clientId : 'com.soundgramweb.signinqa',
                    //    scope : 'email',
                    //    redirectURI: 'https://devdisk.soundgram.co.kr/login_popup.php',
                    //    state : 'soundgramsignin'
                    //});
                    
                    //AppleID.auth.signIn();
                }
                else if(id=="google") {
                    var param = ["google",albumid,device_id,uuid,isiplayer,diskpath,diskid];

                    location.href
                    = "https://accounts.google.com/o/oauth2/auth?client_id="+
                        "328053066691-3jcqkuq4g8qr56af8jgh2g510rne7mnc.apps.googleusercontent.com"+
                        "&redirect_uri=http://devdisk.soundgram.co.kr/login_popup.php"+
                        "&state="+param.join(",")+ 
                        "&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email&approval_prompt=force&access_type=offline";
                }
                else if(id=="facebook") {
                    // checkLoginState();

                    FB.login(function(response) {
                        console.log(response.status);
                    }, {scope:"public_profile, email"});
                }
            });

            $("button#logout").click(function() {
                var sns = $("div#cu01_g").attr("val");
                opener.logout(sns);
                window.self.close();
            });

            $("button.btn_grayline").click(function() {
                showConfirm("dropout", "알림", "정말 탈퇴하시겠습니까?<br>탈퇴시 게시글이 모두 삭제됩니다.");
            });

            $("button#changenick").click(function() {
                var id = opener.soundgramApi.user_id;
                var nick = $("input#profile_nick").val();

                changeCustInfo("user_nick", nick);
            });

            $("input#profile_tel").keyup(function() {
                // console.log($(this).attr("maxlength"));
                // console.log($(this).val().length);
                if($(this).val().length==$(this).attr("maxlength")) {
                    // $(this).val($(this).val().substring(0, $(this).attr("maxlength")));
                    return false;
                }
            });

            $("button#changetel").click(function() {
                var id = opener.soundgramApi.user_id;
                var tel = $("input#profile_tel").val();

                //휴대폰을 입력하지 않을 경우..
                if(tel.length==0) {
                    $("input#profile_tel").focus().select();
                    return;
                }

                //휴대폰 자릿수가 11자리 이상일때만..
                if(tel.length<11) {
                    $("input#profile_tel").focus().select();
                    return;
                }

                changeCustInfo("user_phone", tel);
            });

            $("button#camera").click(function(e) {
                e.preventDefault();
				if (ostype == 2) {		// 권한 설정 여부 확인하기 위한 추가 로직 (03/15 문상혁)
					window.webkit.messageHandlers.SoundgramLogin.postMessage('checkCameraAuth');
				}
                else {
                    $("#uploadImage").click();
                }
            });

            // $("span#member_close").click(function() {
			// 	console.log("member_close");
            //     var album_type = diskid.substring(0,1);
            //     if(album_type=="p") {
            //         $("div#member_input > div").each(function(idx) {
            //             if(!$("div#member_input > div").eq(idx).hasClass("hidden")) $("div#member_input > div").addClass("hidden");
            //         });

            //         $("div.container_popup").children().css({"animation":""});
            //         if (ostype == 2) { // 21.02.10 iOS에서 소셜로그인 버튼을 누르고 X(닫기)버튼을 누르면 member_close()가 안먹히는 이슈가 있어 추가(조유빈)
            //             window.webkit.messageHandlers.SoundgramLogin.postMessage("windowClose");
            //         }
            //         opener.member_close();
            //     }
            //     else {
			// 		console.log("else case");
            //         $("div.container_popup").empty();
            //         $("header#pop_top").addClass("hidden");
            //         $("div.container_popup").addClass("hidden");
            //         $("div#service_info").removeClass("hidden");
            //         $("div.container").removeClass("hidden");
            //     }
			// 	window.self.close();
            // });

            $("button#srhidpass").click(function() {
                $("div.container_popup").children("div").addClass("hidden");
                $("div#cu01_e").removeClass("hidden");
                effect("div#cu01_e");
            });

            $("button#srhid, button#temp_pass") .click(function() {
                var thisbutton = $(this).attr("id");
                if(thisbutton=="srhid") {
                    var searchname = $("input#id_srhname").val();
                    var searchtel = $("input#id_srhtel").val();

                    if(searchname.length==0) {
                        $("div#srhid_alert_name").removeClass("hidden").text("이름을 입력해주세요.");
                        $("input#id_srhname").focus().select();
                        return;
                    }

                    if(searchtel.length==0) {
                        $("div#srhid_alert_tel").removeClass("hidden").text("휴대폰 번호를 입력해주세요.");
                        $("input#id_srhtel").focus().select();
                        return;
                    }

                    var value = jQuery.param({"name":searchname, "phone":searchtel});
                    $.ajax({
                        type : "POST",
                        url : "api/findAccount.php",
                        data : value,
                        dataType: "json",
                        success: function(data) {
                            if(data.returnCode=="notuser") {
                                findAccountErr();
                            }
                            else {
                                // alert("회원님의 아이디는 "+data.account+" 입니다.");
                                showConfirm2("회원님의 아이디는 "+data.account+" 입니다.");
                            }
                        }, 
                        error: function(xhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                }
                else {
                    var searchid = $("input#pass_srhid").val();
                    var searchtel = $("input#pass_srhtel").val();

                    if(searchid.length==0) {
                        $("div#srhpass_alert_id").removeClass("hidden").text("아이디를 입력해주세요.");
                        $("input#pass_srhid").focus().select();
                        return;
                    }

                    if(searchtel.length==0) {
                        $("div#srhpass_alert_tel").removeClass("hidden").text("휴대폰 번호를 입력해주세요.");
                        $("input#pass_srhtel").focus().select();
                        return;
                    }

                    var value = jQuery.param({"account":searchid, "phone":searchtel, "albumid":albumid});
                    $.ajax({
                        type : "POST",
                        url : "api/resetPassword_step1.php",
                        data : value,
                        dataType: "json",
                        success: function(data) {
                            if(data.returnCode=="notuser") {
                                toast("회원정보가 존재하지 않습니다.");
                            }
                            else {
                                var password = data.password;
                                value = jQuery.param({"account":searchid, "password":sha256(password), "albumid":albumid});
                                $.ajax({
                                    type : "POST",
                                    url : "api/resetPassword_step2.php",
                                    data : value,
                                    dataType: "json",
                                    success: function(data) {
                                        showConfirm("login", "알림", "임시 비밀번호는 <strong>"+password+"</strong> 입니다. <br>로그인 페이지로 이동합니다.");
                                    }, 
                                    error: function(xhr, textStatus, errorThrown) {
                                        console.log(errorThrown);
                                    }
                                });
                            }
                        }, 
                        error: function(xhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                }
            });

            $("#accessterms").click(function() {
                $("div.container_popup").children("div").addClass("hidden");
                $("div#cu01_d").removeClass("hidden");
            });

            $("button#changepass").click(function() {
                $("div.container_popup").children("div").addClass("hidden");
                $("div#cu01_f").removeClass("hidden");
                effect("div#cu01_f");
            });

            $("button#newpasschange").click(function() {
                var id = opener.soundgramApi.user_id;
                var password = $("input#inputcpass").val();
                var new_password = $("input#inputcnpass").val();

                if(password.length==0) {
                    $("div#changepass").removeClass("hidden").text("비밀번호를 입력해주세요.");
                    $("input#inputcpass").focus().select();
                    return;
                }

                if(new_password.length==0) {
                    $("div#changenewpass").removeClass("hidden").text("비밀번호를 입력해주세요.");
                    $("input#inputcnpass").focus().select();
                    return;
                }

                if(new_password.length<8 || new_password.length>16) {
                    $("div#changenewpass").removeClass("hidden").html("비밀번호는 영문 소문자, <br>숫자를 조합하여 8~16자로 입력하세요.");
                    $("input#inputcnpass").val("").focus().select();
                    return;
                }

                if(password==new_password) {
                    $("div#changenewpass").removeClass("hidden").text("같은 비밀번호는 사용할 수 없어요!");
                    $("input#inputcnpass").val("").focus().select();
                    return;
                }
                
                var value = jQuery.param({"id":id, "password":sha256(password), "chpassword":sha256(new_password), "albumid":albumid});
                $.ajax({
                    type : "POST",
                    url : "api/passwordChange.php",
                    data : value,
                    dataType: "json",
                    success: function(data) {
                        if(data.returnCode=="success") {
                            // alert("비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.");
                            // changePasswordComplete();

                            toast("비밀번호 변경이 완료되었습니다.");
                        }
                        else {
                            changePassErr();
                        }
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            });

            $("input#inputcpass, input#inputcnpass").keyup(function() {
                $("div#changepass").addClass("hidden");
                $("div#changenewpass").addClass("hidden");
            });

            $("input#id_srhname, input#id_srhtel").keyup(function() {
                $("div#srhid_alert_name").addClass("hidden");
                $("div#srhid_alert_tel").addClass("hidden");
            });

            $("div#cu01_f").focusin(function(e) {
                $("div#srhpass > div").each(function(idx) {
                    if(!$("div#srhpass > div").eq(idx).hasClass("hidden")) $("div#srhpass > div").addClass("hidden");
                });

                var idx = $("div#srhpass > input:focus").index();
                if(idx==0||idx==2) {
                    $("div#cu01_f").animate({"padding":"1% 0 0 0"}, 400);
                    $("div#srhpass > div").eq(idx/2).removeClass("hidden");
                }
            });

            $("div.mb_title, div.alert, button#temp_pass").click(function() {
                $("div#cu01_f").animate({"padding":"20% 0 0 0"}, 400);
            });

            $("div#cu01_g").focusin(function(e) {
                if($(e.target).nodeName=="INPUT") {
                    $("div#cu01_g").animate({"padding":"2% 0 0 0"}, 400);
                }
            });

            $("input#pass_srhid, input#pass_srhtel").keyup(function() {
                $("div#srhpass_alert_id").addClass("hidden");
                $("div#srhpass_alert_tel").addClass("hidden");
            });

            // $("header#pop_top").click(function() {
            //     window.self.close();
            // });

            $("span#member_close").click(function() {
                if (ostype == 2) { // 21.02.10 iOS에서 소셜로그인 버튼을 누르고 X(닫기)버튼을 누르면 member_close()가 안먹히는 이슈가 있어 추가(조유빈)
                    window.webkit.messageHandlers.SoundgramLogin.postMessage("windowClose");
                }
                
            	window.self.close();
            });
        }

        function goJoin(name, id, password, tel, nick, snstype, profile) {
            var value = jQuery.param({
                "name":name
                , "userid":id
                , "passwd":sha256(password)
                , "phone":tel
                , "nick":nick
                , "snstype":snstype
                , "uuid":uuid
                , "device_id":device_id
                , "profile":profile
                , "albumid":albumid
            });

            $.ajax({
                type : "POST",
                url : "api/join_device.php",
                data : value,
                dataType: "json",
                success: function(data) {
                    var returnCode = data.returnCode;
                    if(returnCode=="join_complete") {
                        if(isiplayer=="true") {
                            window.webkit.messageHandlers.SoundgramLogin.postMessage(data.user_id);
                        }
                        else {
                            opener.loginComplete(data);
                        }
                        
                        window.self.close();
                    }
                    else joinError(returnCode);
                }, 
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }

        var removeToast;
        function toast(string) {
            const toast = document.getElementById("toast");

            toast.classList.contains("reveal") ?
                (window.clearTimeout(removeToast), removeToast = window.setTimeout(function () {
                    document.getElementById("toast").classList.remove("reveal")
                }, 1000)) :
                removeToast = window.setTimeout(function () {
                    document.getElementById("toast").classList.remove("reveal")
                }, 1000)
            toast.classList.add("reveal"),
                toast.innerText = string
        }

        function changeCustInfo(type, val) {
            if(type=="user_nick") {
                if(opener.soundgramApi.nick==val) {
                    toast("변경사항이 없습니다");
                    return false;
                }
            }
            else if(type=="user_phone") {
                if(opener.soundgramApi.tel==val) {
                    toast("변경사항이 없습니다");
                    return false;
                }
            }

            var value = jQuery.param({"type":type, "user_id":opener.soundgramApi.user_id, "val":val});
            $.ajax({
                type : "POST",
                url : "api/custInfoUpdate.php",
                data : value,
                dataType: "json",
                success: function(data) {
                    if(data.returnCode=="already") {
                        if(type=="user_nick") {
                            // alert("이미 존재하는 닉네임입니다.");
                            showConfirm2("이미 존재하는 닉네임입니다.");
                        }
                        else if(type=="user_phone") {
                            // alert("이미 존재하는 휴대폰 번호입니다.");
                            showConfirm2("이미 존재하는 휴대폰 번호입니다.");
                        }
                    }
                    else {
                        changeComplete(type, data.val);
                    }
                }, 
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }

        function changeComplete(type, changeinfo) {
            var title = "";
            if(type=="user_nick") {
                title = "닉네임이";
                opener.soundgramApi.nick = changeinfo;
                // $("h4#nick").text(changeinfo);
                $("input#profile_nick").val(changeinfo);
            }
            else if(type=="user_phone") {
                title = "휴대폰 번호가";
                opener.soundgramApi.tel = changeinfo;
                $("input#profile_tel").val(changeinfo);
            }
            else if(type=="profile") {
                title = "프로필이"
        //        $(" div.profile").css({"background-image":"url('"+changeinfo+"')"});
                opener.soundgramApi.profileimg = "media/user/"+opener.soundgramApi.user_id+"/"+changeinfo;
                $("div#cu01_g > div.profile").css({"background-image":"url('media/user/"+opener.soundgramApi.user_id+"/"+changeinfo+"')"});
                $("div#leftmenu_profile").css({"background-image":"url('media/user/"+opener.soundgramApi.user_id+"/"+changeinfo+"')"});
            }

            toast(title+" 변경 되었습니다.")
        }

        function changePasswordComplete() {
            $("input:visible").val("").blur();
            $("div.container_popup").children("div").addClass("hidden");
            $("div#login_sns").removeClass("hidden");

            var sns = $("div#member_profile").attr("val");
            logout(sns);
        }

        function loginError() {
            $("input#loginpassword").val("");
            $("input#loginpassword").focus().select();
            $("div#loginpassalert").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
            return;
        }

        function joinError(type) {
            if(type=="already_id") $("div#member_input > div").eq(1).text("이미 사용중인 아이디입니다.").removeClass("hidden");
            else if(type=="already_phone") $("div#member_input > div").eq(4).removeClass("hidden");
            else if(type=="already_nick") $("div#member_input > div").eq(5).text("이미 사용 중인 닉네임입니다.").removeClass("hidden");
        }

        function findAccountErr() {
            $("div#srhid_alert_name").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
            $("input#id_srhname").val("").focus().select();
            $("input#id_srhtel").val("")
            return;
        }

        function resetPasswordErr() {
            $("div#srhpass_alert_id").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
            $("input#pass_srhid").val("").focus().select();
            $("input#pass_srhtel").val("");
            return;
        }

        function changePassErr() {
            $("div#changepass").removeClass("hidden").text("비밀번호가 맞지 않아요!");
            $("input#inputcpass").val("").focus().select();
            $("input#inputcnpass").val("")
            return;
        }

        var rc = "";
        function changeValue(obj, type, rv_id){
            var rv = "";
            
            var file_data;
            var form_data = new FormData();

            form_data.append("user_id", opener.soundgramApi.user_id);
            form_data.append("albumid", opener.soundgramApi.albumid);
            form_data.append("type", type);
            
            file_data = $("#uploadImage").prop("files")[0];
            if(file_data=="" || file_data==null) {
                return false;
            }

            if(file_data!="" || file_data!=null) {
                // return false;
                form_data.append("file", file_data);
            }
            
            $.ajax({
                url: "api/upload.php",
                data: form_data,
                dataType: "json",
                type: "POST",
                enctype: "multipart/form-data",
                contentType: false,
                processData: false,
                cache: false,
                success: function(data) {
                    if(data.returnCode=="success") {
                        if(type=="profile") {
                            // alert("프로필 사진이 변경 되었습니다.");
                            showConfirm2("프로필 사진이 변경 되었습니다.");
                            
                            $("div#cu01_g > div.profile").css({"background-image":"url('media/user/"+opener.soundgramApi.user_id+"/"+data.profile+"')"});
                            opener.changeComplete("profile",data.profile);
                            toast("프로필이 변경 되었습니다.");
                        }
                    }
                },
                error:function(request,status,error){
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }

        function showConfirm (type, title, content) {
            confirm.show({
                title: title,
                content: content,
                btns: [{
                    callback: function(instance){
                        // instance.close = false;
                        if(type=="login") {
                            // goLoginPage();
                            window.location.reload();
                        }
                        else if(type=="dropout") {
                            var sns = opener.soundgramApi.snstype;
                            if(sns!="0") {
                                // Soundgram.snsDropout("3");

                                //카카오톡 탈퇴시
                                if(sns==1) {
                                    if (!Kakao.Auth.getAccessToken()) {
                                        console.log('Not logged in.');
                                        return;
                                    }
                                    
                                    Kakao.API.request({
                                        url: '/v1/user/unlink',
                                        success: function(response) {
                                            opener.dropout();
                                            window.self.close();
                                        },
                                        fail: function(error) {
                                            console.log(error);
                                        },
                                    });
                                }
                                // 네이버 탈퇴시
                                else if(sns==2) {
                                    $.ajax({
                                        type : "POST",
                                        url : "oauth/naverDropout.php?access_token="+opener.soundgramApi.access_token,
                                        success: function(data) {
                                            // console.log(data);
                                            if(data=="0") {
                                                opener.dropout();
                                                window.self.close();
                                            }
                                        }
                                        , error: function(xhr, textStatus, errorThrown) {
                                            console.log(errorThrown);
                                        }
                                    });
                                }
                            }
                            else {
                                opener.dropout();
                                window.self.close();
                            }
                        }
                        else if(type=="close") {
                            opener.Soundgram._close();
                        }
                    }
                }, {
                text: '취소',
                    callback: function(){

                    }
                }],
                onShow: function(){
                
                }
            });
        }

        function showConfirm2 (content) {
            confirm.show({
                title: '알림',
                content: content,
                btns: [{
                    callback: function(instance){
                        
                    }
                }],
                onShow: function(){
                
                }
            });
        }

        function effect(_this) {
            $(_this).css({
                "animation": "rightFadeIn 0.4s",
                "animation-fill-mode": "both",
                "-webkit-animation": "rightFadeIn 0.4s",
                "-webkit-animation-fill-mode": "both",
                // "-webkit-animation-delay": "0.4s",
                "-webkit-animation-duration": "0.6s"
            });
        }
    </script>
</head>

<body style="display:none">
<header id="pop_top">   
	<nav>
		<span id="member_close" class="close"></span>
	</nav>
	</header>
    <div class="container_popup hidden">
		
    </div>
    <div id="toast"><div class="reveal"></div></div>
</body>
</html>
