<?php
    // 통합앱용 파라미터 추가 21.12.01
	$tot = $_REQUEST['tot']==""?false:$_REQUEST["tot"];
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>

    <link rel="stylesheet" type="text/css" href="css/nfc_payment.css" >
    
    <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="js/nfc_common.js"></script>
    <script type="text/javascript" src="js/SoundgramApi.js"></script>
    <script type="text/javascript" src="js/component.js"></script>
    
    <script>
        let confirm = new ConfirmClass();
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
            var splash = document.getElementById("splash");
            var tot = '<?=$tot?>';
            if(tot) {
                $("#splash_file").attr("src","intro_tot.mp4");
            }
            else {
                $("#splash_file").attr("src","intro_mp4.mp4");
            }

            splash.load();
            splash.addEventListener("canplaythrough", function() {
                splash.play();
                var np = window.setInterval(function() {
                    if(splash.currentTime>0) {
                        window.clearInterval(np);
                        $("div.splash_container").show();
                    }
                },100);
            });

            splash.addEventListener("ended", function() {
                // 21.01.08 iOS에서 SoundgramAgree 객체를 확인하지 못하는 문제와 iOS에서의 핸들링을 위해 try-catch 구문으로 iOS처리도 할 수 있도록 수정했습니다.(조유빈)
                try {
                    SoundgramSplash.goMain();
                } catch (e) {
                    window.webkit.messageHandlers.SoundgramSplash.postMessage('goMain');
                }

            });
        });
        

        function showConfirm (type, title, content) {
            confirm.show({
                title: title,
                content: content,
                btns: [{
                    callback: function(instance){
                        if(type=="close") {
                            // 21.01.08 iOS에서 SoundgramAgree 객체를 확인하지 못하는 문제와 iOS에서의 핸들링을 위해 try-catch 구문으로 iOS처리도 할 수 있도록 수정했습니다.(조유빈)
                            try {
                                SoundgramSplash._close();
                            } catch (e) {
                                window.webkit.messageHandlers.SoundgramSplash.postMessage('close');
                            }

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
    </script>
</head>

<body>
<div class="splash_container" style="display:none">
    <video id="splash" preload="metadata" style="width:100%;height:100%;">
        <source id="splash_file" src="" type="video/mp4"></source>
    </video>
</div>
</body>
</html>
