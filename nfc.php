<?php
    $uuid = $_POST['uuid'];
    $albumid = $_POST['albumid'];
    $ostype = $_POST['ostype'];
    $app_ver = $_POST['app_ver'];
    $qa = $_REQUEST['qa']==""?"false":$_REQUEST['qa'];
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
    <link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400&display=swap" rel="stylesheet">
    
    <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="js/nfc_common.js"></script>
    <script type="text/javascript" src="js/SoundgramApi.js"></script>
    <script type="text/javascript" src="js/component.js"></script>
    <script>
        let confirm = new ConfirmClass();
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
            // soundgramApi.SOUNDGRAM_Initialize();

            // soundgramApi.uuid = '<?=$uuid?>';
            // soundgramApi.albumid = '<?=$albumid?>';
            // soundgramApi.ostype = '<?=$ostype?>';
            // var app_ver = '<?=$app_ver?>';
            // var qa = '<?=$qa?>';
            // // if(soundgramApi.ostype==2) {
            // //     qa = "true";
            // // }

            // // console.log(soundgramApi.uuid);
            // // console.log(soundgramApi.albumid);
            // // console.log(soundgramApi.ostype);
            // // console.log(app_ver);

            // addDeviceInfo(app_ver,qa);
        });

        $(window).load(function() {
            soundgramApi.SOUNDGRAM_Initialize();

            soundgramApi.uuid = '<?=$uuid?>';
            soundgramApi.albumid = '<?=$albumid?>';
            soundgramApi.ostype = '<?=$ostype?>';
            var app_ver = '<?=$app_ver?>';
            var qa = '<?=$qa?>';
            
            addDeviceInfo(app_ver,qa);
        })
    </script>
</head>

<body>
    <div class="container" style="display: none">
		<div id="nc01_a">
        <div class="nfc_toparea">
            <div class="nfc_imgarea">
                <img src="" alt="">
            </div>
        </div>
        <div class="nfc_textarea">
        </div>
        <div class='nfc_input' style="display:none">
            <input id='nfcno_1' type='text' maxlength='4'></input>
            <input id='nfcno_2' type='text' maxlength='4'></input>
            <input id='nfcno_3' type='text' maxlength='4'></input>
        </div>
        <div class="nfc_btnarea" style="display:none">
        </div>
        <div class="nfc_footer">
            <img src="images/nc01_img_logo.png" class="nfc_footer_logo">
            <p>인증 문의 soundgram.info@soundgram.co.kr</p>
        </div>
    </div>
    </div>
</body>
</html>
