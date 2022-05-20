<?php
	$restAPIKey = "797fe68608c7d6985dda52ca2ce769b3"; // 본인의 REST API KEY를 입력해주세요
 	$callbacURI = urlencode("oauth/kakaologin_callback.php"); // 본인의 Call Back URL을 입력해주세요
 	
 	$authURI = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=".$restAPIKey."&redirect_uri=".$callbacURI;
?>
<!DOCTYPE html>
<html lang="kr">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script type="text/javascript" src="js/sha256.min.js"></script>
	<script type="text/javascript">
        $(document).ready(function(){
        	window.location.href = '<?= $authURI ?>';
        });
	</script>
</head>

<body>
</body>
</html>
