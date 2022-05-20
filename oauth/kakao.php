<?php
    
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width">
        <meta charset="utf-8">
        <meta name="format-detection" content="telephone=no">
        <meta name="referrer" content="always">
        <title>SoundGram</title>
        <link rel="stylesheet" type="text/css" href="css/nfc_payment.css">
        <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
        <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
        <script type="text/javascript">
                $(document).ready(function(){
                        //카카오 로그인 관련
                        Kakao.init("795b9d6967488b64c13ddff90785a421");
                        Kakao.isInitialized();

                        console.log("Kakao.isInitialized() :: " + Kakao.isInitialized());

                        Kakao.Auth.login({
                                success: function(authObj) {
                                    console.log(JSON.stringify(authObj));
                                    Kakao.API.request({
                                    url : "/v2/user/me"
                                    , success : function( res ) {
                                            console.log(res);

                                            // res.id;
                                            // res.properties.nickname;
                                            // res.properties.profile_image;
                                            // res.properties.thumbnail_image;
                                    }, 
                                    fail : function( error ) {
                                        console.log( JSON.stringify( error ) );
                                    }
                                    });
                                },
                                fail: function(err) {
                                    alert(JSON.stringify(err))
                                },
                            });
                });
        </script>
</head>

<body>

</body>
</html>
