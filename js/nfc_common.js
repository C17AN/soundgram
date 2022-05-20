var nfc_connect_time = new Array();

function addDeviceInfo(app_ver,qa) {
    var value = jQuery.param({"ostype":soundgramApi.ostype, "app_ver":app_ver, "uuid":soundgramApi.uuid, "albumid":soundgramApi.albumid, "nfckeyid":soundgramApi.nfckeyid});
    $.ajax({
        type: "POST"
        , url : "api/versionCheck.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
            if(data.returnCode=="newver" && qa=="false") {
                appUpdate(data.store_url); // 여기에 오타가 있었어서 수정했습니다. (원본: data.stroe_url)
            }
            else {
                value = 
                jQuery.param({"ostype":soundgramApi.ostype
                            , "app_ver":app_ver
                            , "uuid":soundgramApi.uuid
                            , "tot_id":"0"
                            , "albumid":soundgramApi.albumid
                });
                
                $.ajax({
                    type: "POST"
                    , url : "api/add_device_info_tot.php"
                    , data: value
                    , dataType: "json"
                    , success: function(data) {
                        soundgramApi.device_app_id = data.device_app_id;
                        
                        value 
                        = jQuery.param({"ostype":soundgramApi.ostype
                                    , "app_ver":app_ver
                                    , "uuid":soundgramApi.uuid
                                    , "device_app_id":soundgramApi.device_app_id
                                    , "albumid":soundgramApi.albumid
                                    , "nfckeyid": soundgramApi.nfckeyid
                        });
                        $.ajax({
                            type: "POST"
                            , url : "api/add_device_info.php"
                            , data: value
                            , dataType: "json"
                            , success: function(data) {
                                // console.log(data);
                                var device_id = data.device_id;
                                soundgramApi.device_id = device_id;
                                value = jQuery.param({"device_id":device_id, "albumid":soundgramApi.albumid});
                                // console.log(soundgramApi.albumid);
                                $.ajax({
                                    type: "POST"
                                    , url : "api/album_info.php"
                                    , data: value
                                    , dataType: "json"
                                    , success: function(data) {
                                        // console.log(data);
                                        var gotoAlbum = false;
                                        // console.log(data.returnCode);
                                        if(data.returnCode=="nfc") {
                                            if(data.nfckey_id=="0") {
                                                // console.log("to nfc");
                                                moving_nfc("1");
                                            }
                                            else {
                                                gotoAlbum = true;
                                            }
                                        }
                                        else {
                                            gotoAlbum = true;
                                        }

                                        if(gotoAlbum) {
                                            //SoundgramNFC.gotoAlbum();
                                            if(soundgramApi.ostype == 1) {
                                                SoundgramNFC.gotoAlbum();
                                            } else if(soundgramApi.ostype == 2) {
                                                window.webkit.messageHandlers.SoundgramNFC.postMessage("gotoAlbum");
                                            }
                                        }
                                    }
                                    , error: function(xhr, textStatus, errorThrown) {
                                        console.log(errorThrown);
                                    }
                                });
                            }
                            , error: function(xhr, textStatus, errorThrown) {
                                console.log(errorThrown);
                            }
                        });
                    }
                });
            }
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function nfc_check(nfckey) {
    nfc_connect_time.push(getTimeStamp());
    soundgramApi.nfckey = nfckey;

    var value = jQuery.param({"albumid":soundgramApi.albumid, "nfckey":nfckey});
    $.ajax({
        type: "POST"
        , url : "api/nfc_check.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
            alert(data.returnMsg);
            
            nfc_connect_time.push(getTimeStamp());
            moving_nfc(data.returnCode);
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function moving_nfc(type) {
    $("div.container").show();

    if(type>2) {
        if(security!=null) {
            var clear = window.setTimeout(function() {
                window.clearInterval(security);

                $("div.nfc_textarea").empty();
                $("div.nfc_textarea").append(nfcPageSetting(type));
            }, 2500);
        }
    }
    else {
        $("div.nfc_textarea").empty();
        $("div.nfc_textarea").append(nfcPageSetting(type));
    }
}

var security = "";
function nfcPageSetting(type) {
    $("div.nfc_input").hide();

    var HTML = "";
    if(type==1) {
        $("div.nfc_imgarea > img").attr("src", "images/nc01_img_start.png");
        $("div.nfc_imgarea > img").css({"height":"160px", "padding-top":"10px"});

        var p_html 
        = "<p><b>칩디스크를 스마트폰 후면 중앙에<br />완전히 붙여 태그하세요.</b></p><p>태그 위치는 기종 마다 다를 수 있습니다.</p>"
        + "<p><span class='nfc_strong'>※ NFC 기능 : 설정 > 연결 > NFC > 기본 모드</span><br />"
        + "<span class='nfc_strong'>※ 범퍼 케이스나 그립톡은 태그에 방해가 될 수 있으니</br>주의하세요.</span></p>";

        if(soundgramApi.ostype==2) {
            p_html 
            = "<p><strong>칩디스크</strong>를 스마트폰으로 <br>태그할 준비가 되셨나요?</p>"
            + "<p><span class='nfc_strong'>※ NFC 기능 : 아이폰 X 이하는 제어 센터에서 설정,</span><br />"
            + "<span class='nfc_strong'>아이폰XS 이상은 별도 설정이 필요 없습니다. </span><br />"
            + "<span class='nfc_strong'> ※ 범퍼 케이스나 그립톡은</span><br />"
            + "<span class='nfc_strong'>태그에 방해가 될 수 있으니 주의하세요.</span></p>";
        }

        HTML
            = "<h1 class='nfc_title'>start</h1>"
            + p_html;
    }
    else if(type==2) {
        nfc_connect_time.push(getTimeStamp());

        $("div.nfc_imgarea > img").attr("src", "images/nc01_img_verify_00.png");
        $("div.nfc_imgarea > img").css({"height":"170px"});

        var cnt = 0;
        var cnt2 = "";
        security = window.setInterval(function() {
            if(cnt<12) {
                if(cnt<10) cnt2 = "0"+cnt;
                else cnt2 = cnt;

                $("div.nfc_imgarea > img").attr("src", "images/nc01_img_verify_"+cnt2+".png");
                cnt++;
            }
            else {
                window.clearInterval(security);
            }
        }, 200);

        HTML
        = "<h1 class='nfc_title'>security</h1>"
        + "<p>칩디스크를 확인 중 입니다.<br />잠시만 기다려주세요.</p>";
    }
    else if(type>2 && type<7) {
        $("div.nfc_imgarea > img").attr("src","");
        $("div.nfc_imgarea > img").attr("src", "images/nc01_img_lock.png");
        $("div.nfc_imgarea > img").css({"height":"140px"});
        $("div.nfc_textarea").css({"margin-top":"-30px"});

        // 첫인증일 경우
        if(type==3) {
            // $("div.nfc_toparea").css({"height":"45%"});

            // for(var i=0; i<nfc_connect_time.length;i++) {
            //     if(i==0) {
            //         $("div.nfc_imgarea").append("<p style='font-size: 10px !important;line-height: 100%;'>nfc connect 시작 : " + nfc_connect_time[i]);
            //     }
            //     else if(i==1) {
            //         $("div.nfc_imgarea").append("<p style='font-size: 10px !important;line-height: 100%;'>nfc connect 완료 : " + nfc_connect_time[i]);
            //     }
            //     else {
            //         $("div.nfc_imgarea").append("<p style='font-size: 10px !important;line-height: 100%;'>서버 통신 완료 : " + nfc_connect_time[i]);
            //     }
            // }

            $("input#nfcno_1").val("");
            $("input#nfcno_2").val("");
            $("input#nfcno_3").val("");

            HTML
            = "<h1 class='nfc_title'>security</h1><p>음반 박스 안에 있는<br>인증 번호 12자리를 입력해주세요.</p>";

            $("div.nfc_input").show();

            $("input#nfcno_1").focus();
            $("input:visible").keyup(function(e) {
                if($(this).val().length>4) {
                    $(this).val($(this).val().substring(0,4));
                }

                if($(this).val().length==4) {
                    var num = parseInt($(this).attr("id").split("_")[1]);
                    if(num<3) {
                        num = num+1;
                    }

                    $(this).blur();
                    $("input#nfcno_"+num).focus();
                }
            });
        }
        // 구매인증 이력이 있을 경우
        else if(type==4) {
            HTML
                = "<h1 class='nfc_titlehan'>칩디스크 인증 이력이 있습니다.<br />신규 기기로 등록하시겠습니까?</h1>"
                + "<p>등록 후에는 기존 기기에서<br />앨범 어플리케이션 사용이 불가하며,<br />다음 실행부터는 이 화면이 표시되지 않습니다.</p>";
        }
        // 구매인증에 실패했을 경우
        else if(type==5) {
            HTML
                = "<h1 class='nfc_titlehan'>구매 인증에 실패했습니다.</h1>"
                + "<p>칩 디스크를 다시 태그해주세요.</p>";
        }
        // 다른 기기에서 사용중인 경우
        else if(type==6) {
            HTML
                = "h1 class='nfc_titlehan'>다른 기기에서 사용 중</h1>"
                + "<p>신규 기기 등록을 원하시는 경우,<br />칩디스크를 다시 태그해주세요.</p>";
        }
    }
    else if(type>6) {
        $("div.nfc_imgarea > img").attr("src","");
        $("div.nfc_imgarea > img").attr("src", "images/nc01_img_success.png");
        $("div.nfc_imgarea > img").css({"height":"120px", "padding-top":"50px"});

        if(type==7) {
            HTML
                = "<h1 class='nfc_title'>welcome</h1>"
                + "<p><b>구매 인증이 완료되었습니다.</b></br>이제 사운드그램 앨범을 즐겨보세요!</p>";
        }
        else if(type==8) {
            HTML
                = "<h1 class='nfc_title'>welcome</h1>"
                + "<p><b>기기 인증이 완료되었습니다.</b></br>이제 사운드그램 앨범을 즐겨보세요!</p>";
        }
    }

    $("div.nfc_btnarea").empty();
    // if(type>2) {
        var btn_html = makeNFCButton(type);
        if(btn_html!="") {
            $("div.nfc_btnarea").append(btn_html);
            $("div.nfc_btnarea").show();
        }
    // }

    // $("button#app_start").click(function() {
    //     $("div.container > div#nc01_a").addClass("hidden");
    //     goAuthNext();
    // });

    $("button#app_close").click(function() {
        // Soundgram.app_close();
        if(soundgramApi.ostype == 2) {
            window.webkit.messageHandlers.SoundgramNFC.postMessage("app_close");
        }
        moving_nfc('1');
    });

    $("button#add_device").click(function() {
        moving_nfc('7');
    });

    $("button#app_start").click(function() {
        // SoundgramNFC.updateNFC();
        // SoundgramNFC.gotoAlbum();
        if(soundgramApi.ostype == 1) {
            // Android //
            SoundgramNFC.gotoAlbum();
        } else if(soundgramApi.ostype == 2) {
            window.webkit.messageHandlers.SoundgramNFC.postMessage("gotoAlbum");
        }
    });

    $("button#nfc_start").click(function() {
        // Soundgram.app_close();
        moving_nfc('2');
    });

    $("button#f_auth").click(function(e) {
        var security_num = $("input#nfcno_1").val()+"-"+$("input#nfcno_2").val()+"-"+$("input#nfcno_3").val();
        updateNFC(security_num);
    });

    $("button#new_auth").click(function() {
        // SoundgramNFC.newAuth();
        updateNFC("");
    });

    $("button#ios_auth").click(function() {
        window.webkit.messageHandlers.SoundgramNFC.postMessage("gotoNFC");
    });

    return HTML;
}

function makeNFCButton(type) {
    var HTML = "<button id='app_close' class='btn_boraline'>돌아가기</button>";

    if(type==1) {
        if(soundgramApi.ostype==2) {
            HTML = "<button id='ios_auth' class='btn_bora'>시작!</button>";    
        }
        else {
            HTML = "";
        }
    }
    else if(type==3) {
        HTML = "<button id='f_auth' class='btn_bora'>인증하기</button>";
    }
    else if(type==4) {
        HTML
            = "<button id='app_close' class='btn_boraline' style='float: left; display: inline-block'>돌아가기</button>"
            + "<button id='new_auth' class='btn_bora' style='float: right;  display: inline-block'>신규등록</button>"
    }
    else if(type>6) {
        HTML = "<button id='app_start' class='btn_bora'>시작하기</button>";
    }

    return HTML;
}

function updateNFC(security_num) {
    $("button#f_auth").prop("disabled",true);

    var value = jQuery.param({"device_id":soundgramApi.device_id, "albumid":soundgramApi.albumid, "nfckey":soundgramApi.nfckey, "security_num":security_num});
    $.ajax({
        type: "POST"
        , url : "api/update_nfc.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
            // $("button#f_auth").prop("disabled",false);
            moving_nfc(data.returnCode);
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function appUpdate (url) {
    confirm.show({
        title: "업데이트 알림",
        content: "최신버전이 나왔습니다.<br/>업데이트를 위해 스토어로 이동해주세요.",
        btns: [{
            callback: function(instance){
                // window.location.href = url; // 21.02.04 iOS 앱 강제 업데이트를 위해 코드 수정(조유빈)
                // 안드로이드일 경우에만 앱 강제종료
                if(soundgramApi.ostype==1) {
                    window.location.href = url; // 21.02.04 iOS 앱 강제 업데이트를 위해 코드 수정(조유빈)
                    SoundgramNFC._close();
                } else if (soundgramApi.ostype == 2) { // 21.02.04 iOS 앱 강제 업데이트를 위해 코드 수정(조유빈)
                    var resp = {
                        'updateUrl':url
                    }
                    window.webkit.messageHandlers.SoundgramAppUpdate.postMessage(resp);
                }
            }
        }],
        onShow: function(){

        }
    });
}

function showConfirm (type, title, content) {
    confirm.show({
        title: title,
        content: content,
        btns: [{
            callback: function(instance){
                if(type=="close") {
                    // 안드로이드일 경우에만 앱 강제종료
                    if(soundgramApi.ostype==1) {
                        SoundgramNFC._close();
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

function getTimeStamp() { 
    var d = new Date(); 
    var s = leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' + leadingZeros(d.getDate(), 2) + ' ' + leadingZeros(d.getHours(), 2) + ':' + leadingZeros(d.getMinutes(), 2) + ':' + leadingZeros(d.getSeconds(), 2) + "." + (d.getMilliseconds()/1000).toFixed(3).slice(2,5); 
    return s; 
} 

function leadingZeros(n, digits) { 
    var zero = ''; 
    n = n.toString(); 
    if (n.length < digits) { 
        for (i = 0; i < digits - n.length; i++) zero += '0'; 
    } 
    
    return zero + n; 
}