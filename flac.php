<?php
    
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>
    
    <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
            var player = document.getElementById("flacaudio");
            player.setAttribute("src", "media/song/587/1.flac");
            player.load();
            player.addEventListener("canplaythrough", function() {
                if(player!="" || player!= null || typeof player!="undefined") {
                    player.play();
                }
            });
        });
    </script>
</head>

<body>
<audio id="flacaudio" controls preload="metadata"></audio>
</body>
</html>
