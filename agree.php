<?php
    $ostype = $_REQUEST['ostype']==""?"1":$_REQUEST["ostype"];
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>

    <link rel="stylesheet" type="text/css" href="css/nfc_payment.css" >
    
    <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="js/component.js"></script>
    <script>
        let confirm = new ConfirmClass();
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
            var ostype = '<?=$ostype?>';
            if(ostype==2) {
                $("dr#app").remove();
            }

            $("button#agree").click(function() {
                // 21.01.08 iOS에서 SoundgramAgree 객체를 확인하지 못하는 문제와 iOS에서의 핸들링을 위해 try-catch 구문으로 iOS처리도 할 수 있도록 수정했습니다.(조유빈)
                try {
                    if(ostype==1) {
                        SoundgramAgree.goAgree();
                    } else if (ostype == 2) {
                        window.webkit.messageHandlers.SoundgramAgree.postMessage('goAgree');
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        });

        function app_init(uuid, albumid, totid) {
            value = jQuery.param({"uuid":uuid, "albumid":albumid, "totid":totid});
            $.ajax({
                type: "POST"
                , url : "api/app_init.php"
                , data: value
                , dataType: "json"
                , success: function(data) {
                    var ostype = '<?=$ostype?>';
                    if(ostype=="2") {
                        try {
                            window.webkit.messageHandlers.SoundgramAgree.postMessage('app_init');
                        } catch (e) {
                            console.log(e);
                        }
                        alert(data.returnCode);
                    }
                }
                , error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }

        function notAgree (title, content) {
            confirm.show({
                title: title,
                content: content,
                btns: [{
                    callback: function(instance){
                        // 21.01.08 iOS에서 SoundgramAgree 객체를 확인하지 못하는 문제와 iOS에서의 핸들링을 위해 try-catch 구문으로 iOS처리도 할 수 있도록 수정했습니다.(조유빈)
                        try {
                            SoundgramAgree.permissionetting();
                            SoundgramAgree._close();
                        } catch (e) {
                            window.webkit.messageHandlers.SoundgramAgree.postMessage('permissionSetting');
                            window.webkit.messageHandlers.SoundgramAgree.postMessage('close');
                        }

                    }
                }],
                onShow: function(){
                
                }
            });
        }

        function close (title, content) {
            confirm.show({
                title: title,
                content: content,
                btns: [{
                    callback: function(instance){
                        // 21.01.08 iOS에서 SoundgramAgree 객체를 확인하지 못하는 문제와 iOS에서의 핸들링을 위해 try-catch 구문으로 iOS처리도 할 수 있도록 수정했습니다.(조유빈)
                        try {
                            SoundgramAgree._close();
                        } catch (e) {
                            window.webkit.messageHandlers.SoundgramAgree.postMessage('close');
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
<div class="popup_bg">
    <div id="access">
        <h2>앱 접근권한 안내</h1>
        <p>APP 사용을 위해 아래 접근권한을 사용하고 있습니다.</p>
        <div class="access_contents">
            <dr id="cam">
                <dd class="img_1">
                </dd>
                <dd>
                <h3>사진/카메라 (필수)</h3>
                    <p>영상 / 리뷰 댓글 작성 시 촬영 및 파일 업로드</p>
                </dd>
            </dr>
            <dr id="app">
                <dd span class="img_2">
                </dd>
                <dd><h3>기기 및 앱 기록 (필수)</h3>
                    <p>앱 오류 시 수정 지원</p>
                </dd>
            </dr>           
        </div>
        <div class="access_info">
            <p>* 접근권한 변경 방법<br>
      &nbsp;&nbsp; 설정 > 구매 음반 앱 > 권한 ON/OFF
            </p>
            <p>* 권한이 거부될 경우, 기능이 정상 <br>
&nbsp;&nbsp; 작동하지 않을 수 있습니다. 
            </p>
        </div>
        <div class="nfc_btnarea">
            <button id="agree" class="btn_bora">
                확 인 
            </button>
        </div>
    </div>
</div>
</body>
</html>
