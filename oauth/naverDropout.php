<?php 
	// NAVER LOGIN 
	define('NAVER_CLIENT_ID', 'jqs6fMhdlwDS46pHx3D2'); 
	define('NAVER_CLIENT_SECRET', 'Zm3osSz58L'); 
	define('NAVER_CALLBACK_URL', 'https://devdisk.soundgram.co.kr/oauth/naverDropout.php'); 

	$access_token = $REQUEST['access_token']; 

	// 네이버 접근 토큰 삭제 
	$naver_curl = "https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=".NAVER_CLIENT_ID."&client_secret=".NAVER_CLIENT_SECRET."&access_token=".urlencode($access_token)."&service_provider=NAVER"; 
	$is_post = false; 
	$ch = curl_init(); 
	curl_setopt($ch, CURLOPT_URL, $naver_curl); 
	curl_setopt($ch, CURLOPT_POST, $is_post); 
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
	$me_response = curl_exec ($ch); 
	$mr_status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close ($ch); 
	if($mr_status_code == 200) { 
		echo $me_responseArr;
		$me_responseArr = json_decode($me_response, true); 
		// 멤버 DB에서 회원을 탈퇴해주고 로그아웃(세션, 쿠키 삭제) 
		if ($me_responseArr['result'] != 'success') { 
			// 오류가 발생하였습니다. 네이버 내정보->보안설정->외부 사이트 연결에서 해당앱을 삭제하여 주십시오
			echo "1";
		}
		else {
			// 탈퇴 성공시
			echo "0";
		}
	} else { 
		// 오류가 발생하였습니다. 네이버 내정보->보안설정->외부 사이트 연결에서 해당앱을 삭제하여 주십시오. 
		echo "2";
	}
?>