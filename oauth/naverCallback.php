<?php
	$albumid = $_REQUEST['albumid'];
	$uuid = $_REQUEST['uuid'];
	$returnCode="0";

	// NAVER LOGIN 
	define('NAVER_CLIENT_ID', 'jqs6fMhdlwDS46pHx3D2'); 
	define('NAVER_CLIENT_SECRET', 'Zm3osSz58L'); 
	define('NAVER_CALLBACK_URL', 'http://disk.soundgram.co.kr:10080/oauth/naverCallback.php'); 
	// if ($_SESSION['naver_state'] != $_GET['state']) {
	// 	// 오류가 발생하였습니다. 잘못된 경로로 접근 하신것 같습니다. 
	// } 

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
			// 회원아이디(naver_ 접두사에 네이버 아이디를 붙여줌) 
			$mb_uid = 'nv_'.$me_responseArr['response']['id']; 
			// 회원가입 DB에서 회원이 있으면(이미 가입되어 있다면) 토큰을 업데이트 하고 로그인함 
			// if (회원정보가 있다면) { // 멤버 DB에 토큰값 업데이트 
			// 	$responseArr['access_token'] // 로그인 
			// } 
			// // 회원정보가 없다면 회원가입 
			// else { // 회원아이디 $mb_uid 
				$mb_name = $me_responseArr['response']['name']; // 이름 
				$mb_nickname = $me_responseArr['response']['nickname']==""?$mb_name:$me_responseArr['response']['nickname']; // 닉네임 
				// $mb_email = $me_responseArr['response']['email']; // 이메일 
				// $mb_gender = $me_responseArr['response']['gender']; // 성별 F: 여성, M: 남성, U: 확인불가 
				// $mb_age = $me_responseArr['response']['age']; // 연령대 
				// $mb_birthday = $me_responseArr['response']['birthday']; // 생일(MM-DD 형식) 
				$mb_profile_image = $me_responseArr['response']['profile_image']; // 프로필 이미지 
				// 멤버 DB에 토큰과 회원정보를 넣고 로그인 
			// } 
		} else { 
			// 회원정보를 가져오지 못했습니다. 
			$returnCode="1";
		} 
	} 
	else { 
		// 토큰값을 가져오지 못했습니다. 
		$returnCode="2";
	}
?>

<!DOCTYPE html>
<html lang="kr">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>NaverLoginSDK</title>
</head>

<body>
	<!-- (1) LoginWithNaverId Javscript SDK -->
	<script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript" src="../js/sha256.min.js"></script>
	<script type="text/javascript" src="../js/common.js"></script>
    <script type="text/javascript" src="../js/SoundgramApi.js"></script>
	<script>
		$(document).ready(function () {
			var albumid = '<?=$albumid?>';
			var uuid = '<?=$uuid?>';
			var id = '<?=$mb_uid?>';
			var name = '<?=$mb_nickname?>';
			var nick = '<?=$mb_nickname?>';
			var profileImage = '<?=$mb_profile_image?>';

			window.opener.goJoin(name, id, id, "", nick, "2", profileImage);
			window.self.close();
			
			// var value = jQuery.param({"name":name, "userid":id, "passwd":sha256(id), "phone":"", "nick":nick, "snstype":2, "profile":profileImage, "uuid":uuid});
	        // $.ajax({
	        //     type : "POST",
	        //     url : "../api/join_device.php",
	        //     data : value,
	        //     dataType: "json",
	        //     success: function(data) {
	        //     	var returnCode = data.returnCode;
	        
	        //     	if(returnCode=="join_complete") {
		    //             window.opener.loginComplete(data);
		    //         }
		    //         else window.opener.joinError(returnCode);
            
		    //         self.close();
	        //     },
	        //     error: function(xhr, textStatus, errorThrown) {
	        //         console.log(errorThrown);
	        //     }
	        // });
            // try {
            //     window.opener.goJoin(name, id, id, "", nick, "2", profileImage);
            //     self.close();
            // } catch (e) {
                // var value = jQuery.param({"name":name, "userid":id, "passwd":sha256(id), "phone":"", "nick":nick, "snstype":2, "profile":profileImage, "uuid":uuid});
                // $.ajax({
                //     type : "POST",
                //     url : "../api/join_device.php",
                //     data : value,
                //     dataType: "json",
                //     success: function(data) {
                //         var returnCode = data.returnCode;

                //         if(returnCode=="join_complete") {
                //             loginComplete(data);
                //         }
                //         else joinError(returnCode);

                //         self.close();
                //     },
                //     error: function(xhr, textStatus, errorThrown) {
                //         console.log(errorThrown);
                //     }
                // });
            // }
		});
	</script>
</body>

</html>
