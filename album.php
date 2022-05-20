<?php
	echo $_SERVER['SERVER_PORT'];
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
        	// $("#uuid").val(guid());
        });

        function guid() {
			function s4() {
				return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
    </script>
</head>
<body>
	<form name="frm" id="frm" method="POST" action="index.php">
		<input type="hidden" name="uuid" id="uuid" value="9646eb8d-b560-857f-e5bc-412f0f4e5402" />
		<input type="hidden" name="ostype" id="ostype" value="0" />
		앨범ID : <input type="text" name="albumid" id="albumid" style="width:200px;height:30px"/>
		<button>전송</button>
	</form>
</body>
</html>
