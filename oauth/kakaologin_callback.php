<?php
	$returnCode = $_GET["code"]; // 서버로 부터 토큰을 발급받을 수 있는 코드를 받아옵니다.
 	$restAPIKey = "797fe68608c7d6985dda52ca2ce769b3"; // 본인의 REST API KEY를 입력해주세요
	$callbacURI = urlencode("oauth/kakaologin_callback.php"); // 본인의 Call Back URL을 입력해주세요
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
	$accessToken= json_decode($loginResponse)->access_token; //Access Token만 따로 뺌

	$app_url= "https://kapi.kakao.com/v2/user/me"; 
	$opts = array( CURLOPT_URL => $app_url, CURLOPT_SSL_VERIFYPEER => false, CURLOPT_POST => true, CURLOPT_POSTFIELDS => false, CURLOPT_RETURNTRANSFER => true, CURLOPT_HTTPHEADER => array( "Authorization: Bearer " . $accessToken ) ); 
	$ch = curl_init(); curl_setopt_array($ch, $opts); 
	$result = curl_exec($ch); 
	curl_close($ch);

	return response($result);
?>
