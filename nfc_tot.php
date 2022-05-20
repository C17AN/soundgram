<?php
    $uuid = $_REQUEST['uuid'];
	  $ostype = $_REQUEST['ostype']==""?"0":$_REQUEST["ostype"];
	  $app_ver = $_REQUEST['app_ver'];
    $qa = $_REQUEST['qa']==""?"false":$_REQUEST["qa"];
	  $token = $_REQUEST['token'];
	  $isGuide = $_REQUEST['isGuide']==""?"false":$_REQUEST["isGuide"];
	  $pushMovingPage = $_REQUEST['pushMovingPage']==""?"none":$_REQUEST["pushMovingPage"];
    $tot_id = $_REQUEST['tot_id']==""?"1":$_REQUEST["tot_id"];
	  $hosturl = $_SERVER['HTTP_HOST'];
	  $server_url;
	
	  if(!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
        $server_url = "https";
    }
    else {
        $server_url = "http";
    }
    // Here append the common URL characters.
    $server_url .= "://";
    
    // Append the host(domain name, ip) to the URL.
    $server_url .= $_SERVER['HTTP_HOST'];
    
    // Append the requested resource location to the URL
    if(strpos(explode('/',$_SERVER['REQUEST_URI'])[1],".php")==false) {
      $server_url .= "/".explode('/',$_SERVER['REQUEST_URI'])[1];
      // echo $server_url;
    }
	
    define('NAVER_CLIENT_ID', 'jqs6fMhdlwDS46pHx3D2'); 
    define('NAVER_CLIENT_SECRET', 'Zm3osSz58L');  
    define('NAVER_CALLBACK_URL', $server_url.'/oauth/naverCallback.php?albumid='.$albumid.'&uuid='.$uuid); // 네이버 로그인 접근토큰 요청 예제 
    $naver_state = md5(microtime() . mt_rand()); 
    $naver_url = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".NAVER_CLIENT_ID."&redirect_uri=".urlencode(NAVER_CALLBACK_URL)."&state=".$naver_state;

    $ch = curl_init();
    // curl_setopt($ch, CURLOPT_URL, "https://devdisk.soundgram.co.kr/api/disk_info.php?albumid=".$albumid);
    curl_setopt($ch, CURLOPT_URL, $server_url."/api/disk_info_tot.php?tot_id=$tot_id");
    curl_setopt($ch, CURLOPT_POST, $isPost);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $headers = array();
    $Response = curl_exec ($ch);
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close ($ch);

    $diskpath= json_decode($Response)[0]->diskpath; //diskpath만 따로 뺌
    $diskid= json_decode($Response)[0]->diskid; //diskid만 따로 뺌
    $google_ver= json_decode($Response)[0]->google_ver; //google_ver만 따로 뺌
    $google_url= json_decode($Response)[0]->google_url; //google_url만 따로 뺌
    $apple_ver= json_decode($Response)[0]->apple_ver; //apple_ver만 따로 뺌
    $apple_url= json_decode($Response)[0]->apple_url; //apple_url만 따로 뺌
?>

<link rel="stylesheet" type="text/css" href="css/common_tot.css">
<link rel="stylesheet" type="text/css" href="css/nfc_payment_tot.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/main.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/media_query.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/font.css">
<link rel="stylesheet" type="text/css" href="<?=$diskpath?>/<?=$diskid?>/css/album.css">

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
    <meta name="viewport" content="viewport-fit=cover, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
	  <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>

    <!-- <link rel="stylesheet" type="text/css" href="css/nfc_payment.css" > -->
    <link rel="stylesheet" type="text/css" href="css/swiper.css">
    <link rel="stylesheet" type="text/css" href="css/swiper-comm.css">
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/toast.css">
    
    <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
    <script type="text/javascript" src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script type="text/javascript" src="js/swiper-setting.js"></script>
    <script type="text/javascript" src="js/SoundgramApi.js"></script>
    <script type="text/javascript" src="js/Soundgram.js"></script>
    <script type="text/javascript" src="js/loadingView.js"></script>
    <script type="text/javascript" src="js/EventGather_tot.js"></script>
    <script type="text/javascript" src="js/common_tot.js"></script>
    <script type="text/javascript" src="js/nfc_common_tot.js"></script>
    <script type="text/javascript" src="js/component.js"></script>
	  <script type="text/javascript" src="js/sha256.min.js"></script>
	  <script type="text/javascript" src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
    <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
	  <script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
    <!--210826 slick 슬라이드 (cr10칩디스크 돌아가는 기능) -->
    <script src="js/slick.min.js"></script>
    <link rel="stylesheet" href="css/slick-theme.min.css" />
    <link rel="stylesheet" href="css/slick.min.css" />
    <!--210826 AOS 플러그인 (올라오는 것등의 움직임 효과)-->
    <link href="css/aos.css" rel="stylesheet" />
    <script src="js/aos.js"></script>
    <script>
        let confirm = new ConfirmClass();
    </script>
    <script type="text/javascript">
        $(document).ready(function(){
          //로딩이미지
          $("div.splash_container").show();
          //카카오 로그인 관련
          Kakao.init("795b9d6967488b64c13ddff90785a421");
          Kakao.isInitialized();

          console.log("Kakao.isInitialized() :: " + Kakao.isInitialized());
          soundgramApi.SOUNDGRAM_Initialize();

          var app_ver = '<?=$app_ver?>';
          var qa = '<?=$qa?>';
          var isGuide = '<?=$isGuide?>';
          soundgramApi.isGuide = '<?=$isGuide?>';
          soundgramApi.tot_id = '<?=$tot_id?>';
          soundgramApi.diskpath = '<?=$diskpath?>';
          soundgramApi.diskid = '<?=$diskid?>';
          soundgramApi.uuid = '<?=$uuid?>';
          soundgramApi.token = '<?=$token?>';
          soundgramApi.ostype = '<?=$ostype?>';
          soundgramApi.google_url = '<?=$google_url?>';
          soundgramApi.apple_url = '<?=$apple_url?>';
          soundgramApi.app_ver = app_ver;
          soundgramApi.qa = qa;
          soundgramApi.tplImgNum = "10";
          
          if(soundgramApi.uuid.length==0) {
            // const getUUID = (
            // service='https://api.ipify.org/?format=json',
            // key='ip'
            // ) => { 
            //   return new Promise(
            //     (resolve, reject) => {
            //     fetch(service)
            //     .then((r) => r.json())
            //     .then((j) => {
            //       let r = /\D+/g
            //       let h = String(
            //         window.navigator.userAgent.replace(r, ''
            //         ) * j[key].replace(r, '')
            //       ).replace(r, '').replace('0', '').split('')
            //       let g = () => Math.floor(h.shift() * 0x10000)
            //       resolve(g() + g() + '-' + g() + '-' + g() + '-' + 
            //           g() + '-' + g() + g() + g())
            //     }).catch((e) => reject('failed to create UUID'))
            //     }
            //   )
            // }

            // // Excute it
            // getUUID().then((d) => soundgramApi.uuid=d).catch((e) => soundgramApi.uuid="9646eb8d-b560-857f-e5bc-412f0f4e5402")

            soundgramApi.uuid= "655360-65536-393216-393216-58982432768065536";
          }

          var _gu = window.setInterval(function() {
            if(soundgramApi.uuid.length>0) {
              window.clearInterval(_gu);
              // console.log(soundgramApi.uuid);

              if(soundgramApi.ostype==0) {
                var value = jQuery.param({"ostype":soundgramApi.ostype, "app_ver":app_ver, "uuid":soundgramApi.uuid, "tot_id":soundgramApi.tot_id, "token":soundgramApi.token});
                $.ajax({
                    type: "POST"
                    , url : "api/add_device_info_tot.php"
                    , data: value
                    , dataType: "json"
                    , success: function(data) {
                        soundgramApi.device_app_id = data.device_app_id;
                        // 페이지 로드
                        _load();
                    }
                    , error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
              }
            }
            else {
              return false;
            }
          },100);
          
          // 디바이스 아이디 추가 및 갱신
          if(soundgramApi.ostype==0) {
            // _load();
          }
          else {
            addDeviceInfo(app_ver,qa);
          }
        });

        $(window).load(function() {
            
        });
    </script>
</head>

<body>
  <div class="overlay_tot" style="display:none"></div>
  <div class="overlay_tot inform_tot" id="ncoll" style="display:none">
  </div>
  <div id="toast"><div class="reveal"></div></div>
  <div class="splash_container" style="display:none">
      <img src="images/back_to_tot.png" style="width:100%;height:100%"/>
  </div>
  <p id="os-type" style="display: none;"><?php echo($ostype); ?></p>
</body>
</html>
