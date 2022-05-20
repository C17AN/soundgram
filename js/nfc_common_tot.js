var security = "";
function moving_nfc(type) {
    $("div.nfc_container").children("div").not(".si_toolbar").not(".nfc_footer").addClass("hidden");

    if(type==2) {
        var imgSrc = $("#nc10_b").find("img").attr("src");
        
        $("#nc10_b").find("img").attr("src", "");
        $("#nc10_b").find("img").attr("src", imgSrc);
    }
    
    nfcPageSetting(type);
}

function nfc_check_1(nfckey) {
    soundgramApi.nfckey = nfckey;
    var value = jQuery.param({"nfckey":nfckey});
    
    $.ajax({
        type: "POST"
        , url : "api/nfc_check_tot_1.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
            if(data.returnCode=="multiple") {
                $("div.nfc_container").children("div").not(".si_toolbar").not(".nfc_footer").addClass("hidden");
                $("div.nfc_container > div#nc10_f").removeClass("hidden");
            }
            else {
                soundgramApi.albumid="";
                nfc_check_2();
            }
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function nfc_check_2() {
    var value = jQuery.param({
        "nfckey":soundgramApi.nfckey, 
        "device_app_id":soundgramApi.device_app_id, 
        "album_id":soundgramApi.albumid, 
        "uuid":soundgramApi.uuid, 
        "ostype":soundgramApi.ostype, 
        "app_ver":soundgramApi.app_ver
    });

    // alert(soundgramApi.nfckey+"\n"+soundgramApi.device_app_id+"\n"+soundgramApi.albumid+"\n"+soundgramApi.uuid+"\n"+soundgramApi.ostype+"\n"+soundgramApi.app_ver);

    $.ajax({
        type: "POST"
        , url : "api/nfc_check_tot_2.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
            soundgramApi.album_id = data.returnMsg;

            moving_nfc(data.returnCode);
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function nfcPageSetting(type) {
    // 시큐리티 초기화
    if(type!=2) {
        window.clearTimeout(security);
        security = "";
    }

    var pageNum = 5;
    if(type<3) {
        pageNum = type;
    }
    else if(type>3 && type<7) {
        pageNum = 3;
    }
    else if(type>6 && type<10) {
        pageNum = 4;
    }
    else if(type==10) {
        pageNum = 3;
    }

    // $("div.nfc_container").children("div").not(".si_toolbar").hide();
    $("div.nfc_container > div").eq(pageNum).removeClass("hidden");
    
    // 첫인증일 경우
    if(type==3) {
        $("input#nfcno_1").val("");
        $("input#nfcno_2").val("");
        $("input#nfcno_3").val("");
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
    // 4: 구매인증 이력이 있을 경우
    // 5: 구매인증에 실패했을 경우()
    // 6: 다른 기기에서 사용중인 경우
    else if(type==4 || type==5 || type==6) {
        $("div.nfc_container > div:nth-child("+(pageNum+1)+")").children("div").not(".nfc_toparea").addClass("hidden");

        var child_num = 2;
        var child_button_num = 3;
        if(type==5) {
            child_num = 4;
            child_button_num = 5;
        }
        else if(type==6) {
            child_num = 6;
            child_button_num = 7;
        }
        else if(type==10) {
            child_num = 8;
            child_button_num = 9;
        }

        $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:nth-child("+child_num+")").removeClass("hidden");
        $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:nth-child("+child_button_num+")").removeClass("hidden");
    }
    else if(type>6 && type<10) {
        if(type==7) {
            $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:nth-child(2)").show();
        }
        else if(type==8) {
            $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:nth-child(3)").show();
        }

        $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:last-child").show();
    }
    else if(type==10) {
        $("div.nfc_container > div:nth-child("+(pageNum+1)+")").children("div").not(".nfc_toparea").addClass("hidden");
        $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:nth-child(8)").removeClass("hidden");
        $("div.nfc_container > div:nth-child("+(pageNum+1)+") > div:nth-child(9)").removeClass("hidden");
    }
}

function updateNFC(security_num) {
    $("button#f_auth").prop("disabled",true);

    var value = jQuery.param({
        "uuid":soundgramApi.uuid, 
        "device_app_id":soundgramApi.device_app_id, 
        "app_ver":soundgramApi.app_ver, 
        "ostype":soundgramApi.ostype, 
        "album_id":soundgramApi.album_id, 
        "nfckey":soundgramApi.nfckey, 
        "security_num":security_num
    });
    $.ajax({
        type: "POST"
        , url : "api/update_nfc_tot.php"
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