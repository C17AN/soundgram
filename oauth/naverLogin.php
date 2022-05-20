<html lang="ko">
<head>
<script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
</head>
<body>
<div id="naverIdLogin"></div>
<script>
	var naverLogin = new naver.LoginWithNaverId(
		{
			clientId: "jqs6fMhdlwDS46pHx3D2",
			callbackUrl: "oauth/naverCallback.php",
			isPopup: false,
			callbackHandle: true,
			loginButton: {color: "green", type: 2, height: 60}
		}
	);

	naverLogin.init();
</script>
</body>
</html>
