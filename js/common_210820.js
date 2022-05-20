function reload() {
    location.reload();
}

function guideoff() {
    $("div.overlay0").hide();
}

function checkCameraAuth(auth) {
	console.log(auth);
	if(auth == 1) {
		console.log("oooo");
		$('#uploadImage').click();
	} else {
		console.log("noooo");
	}
}

function moving_nfc(type) {
    if(bodyload!=null) window.clearTimeout(bodyload);

    if(type>2) {
        if(security!=null) {
            var clear = window.setTimeout(function() {
                window.clearInterval(security); 
                
                $("div.nfc_textarea").empty();
                $("div.nfc_textarea").append(nfcPageSetting(type));
                $("div.container > div#nc01_a").removeClass("hidden");
            }, 2500);
        }
    }
    else {
        $("div.nfc_textarea").empty();
        $("div.nfc_textarea").append(nfcPageSetting(type));
        $("div.container > div#nc01_a").removeClass("hidden");
    }
}

function goAuthNext() {
    // $("img#info_close").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_btn_close.png");
    // $("img#logoImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_img_logo.png");
    // $("img#siblImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_ic_review.png");
    // $("img#mailtoImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_ic_help.png");
    // $("img#sibImg").attr("src", soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/in01_ic_site.png");

    $("div.container > div#nc01_a").empty();
    
    var bodyload = window.setTimeout(function() {
        window.clearTimeout(bodyload);
        $("body").show();
        
        // var body_child = window.setTimeout(function() {
        //     window.clearTimeout(body_child);

            if(soundgramApi.album_type=="p") {
                if($("div#other_popup").is(":hidden")) {
                    first_loading_animate();
                }
            }
            EventPlayer();
            EventGather()
            
            var idx = 0;
            var lm = soundgramApi.albumdiv[0].substring(0,2);
            if(lm=="aa") {
                idx = 1;
            }
            
            swiperSetting(idx);

            $("div.container > div.horizontal_swiper").removeClass("hidden");
            $("div#imgch").empty();
            $("div#imgch").remove();

            // 푸시가 왔을 경우 페이지 이동이 있는 경우..
            if(soundgramApi.pushMovingPage!="none") {
                pushMoving(soundgramApi.pushMovingPage);
            }
        // }, 200);
        // swiperSetting(0);
    }, 300);
}

function getPageidx(idx) {
    $("body").show();

    // Soundgram.getNoticePopupClose();
    if(idx=="none") idx="0";
    swiperSetting(idx);
    // Soundgram.getMusic();
}

function getMusicPlay(valueofclick, currtime) {
    open_play(valueofclick);
	var playmusic = window.setTimeout(function() {
        var player = document.getElementById("playMusic");
        player.currentTime = currtime;
    },500);
}

function noticePopupOnoff() {
    var value = jQuery.param({"albumid":soundgramApi.albumid, "artist_id":soundgramApi.artistid});
    $.ajax({
        type : "POST",
        url : "api/getNotice.php",
        data : value,
        dataType: "json",
        success: function(data) {
			console.log(data);
            var returnCode = ""; 
            if(data.length>0) returnCode = data[0].returnCode;
            else returnCode = data.returnCode;

            if(returnCode=="complete") {
                $("div.overlay0").empty();
                $("div.overlay0").append(makePromotionPopup());

                var url = "media/popup/"+soundgramApi.albumid+"/"+data[0].id+"/"+data[0].popup_img;
                $("img.guide_img01").attr("src", url);

				// 210611 문상혁 - 임시로 이벤트 핸들러 부착
				$("img.guide_img01").on("click", () => {
					window.open(data[0].popup_url, "", "_blank");
				});

                cookiedata = document.cookie; 
                if ( cookiedata.indexOf("noticeCookie=done") < 0 ){ 
                    // document.getElementById('overlay0').style.display = "block";    //  팝업창 아이디
                    $("div.overlay0").show();
                } else {
                    // document.getElementById('overlay0').style.display = "none";    // 팝업창 아이디
                    $("div.overlay0").hide();
                }
            }
            else {
                var album_type = soundgramApi.diskid.substring(0,1);
                if(album_type=="p") first_loading_animate();
            }
        }
    });
}

function setCookie( name, value, expiredays ) { 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(name){
    name = new RegExp(name + '=([^;]*)');
    return name.test(document.cookie) ? unescape(RegExp.$1) : '';
}

function closeWin() { 
    // document.getElementById('other_popup').style.display = "none";
    $("div.overlay0").hide();
    var album_type = soundgramApi.diskid.substring(0,1);
    if(album_type=="p") first_loading_animate();
}

function todaycloseWin() {
    setCookie( "noticeCookie", "done" , 7 ); 
    // document.getElementById('other_popup').style.display = "none";
    $("div.overlay0").hide();
    var album_type = soundgramApi.diskid.substring(0,1);

    if(album_type=="p") first_loading_animate();

    if(soundgramApi.ostype==1) {
        Soundgram.setCookie()
    }
}

function is_navigator() {
	var result = "";
	var broswerInfo = navigator.userAgent;
	if(broswerInfo.indexOf("APP_Soundgram_Android")>-1){
		result="app";
	} else if(broswerInfo.indexOf("iphone")>-1 || broswerInfo.indexOf("ipad") || broswerInfo.indexOf("ipod")>-1) {
		result="app";
	} else {
		result="web";
	}

	return result;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function first_loading_animate() {
    // var ho = soundgramApi.albumdiv[0];
    var ho = "";
    for(var lt=0; lt<soundgramApi.albumdiv.length;lt++) {
        var lm = soundgramApi.albumdiv[lt].substring(0,2);
        if(lm=="ho") {
            ho = soundgramApi.albumdiv[lt];
        }
    }

    $("h1.cover_title > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+ho+"_img_title_album.png");
    $("h2.cover_artist > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+ho+"_img_title_artist.png");
    $("div.cover_img2 > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+ho+"_img_effect_1.png");
    $("div.cover_img3 > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+ho+"_img_effect_2.png");

    $("div#"+ho).children().removeClass("hidden");

    // $("div#"+ho).children().each(function(idx) {
    //     if(idx>0) {
    //         var animDelay = " 0."+idx+"s";
    //         var animDuration = " 0."+(idx+2)+"s";
    //         var anim = "indexBottomFadeIn";
    //         if(idx>2) anim = "rightFadeIn";

    //         $("div#"+ho).children().removeClass("hidden");
    //         $("div#"+ho).children().eq(idx).css({
    //             "animation": anim + animDelay,
    //             "animation-fill-mode": "both",
    //             "-webkit-animation": anim + animDelay,
    //             "-webkit-animation-fill-mode": "both",
    //             // "-webkit-animation-delay": animDelay,
    //             "-webkit-animation-duration": animDuration
    //         });
    //     }
    // });

	// // 1.5초후에 애니메이션 효과 제거
	// var fla = window.setTimeout(function() {
    //     window.clearTimeout(fla);
    //     $("div#"+ho).children().each(function(idx) {
    //         $("div#"+ho).children().eq(idx).css({"animation":""});
    //     });
    // }, 1500);
}

function open_leftmenu() {
    // 댓글관련 하단 팝업이 떠있을 경우 히든처리
    if($("div#addtionmenu").is(":visible")) {
        $("div#addtionmenu").hide();
    }

    // 신고하기 팝업이 떠있을 경우 히든처리
    if($("div#report_popup").is(":visible")) {
        $("div#report_popup").hide();
    }

    $("header#"+soundgramApi.lmortab+" > nav").css({"left":"-240px"})
	$("header#"+soundgramApi.lmortab).removeClass("hidden");
	$("header#"+soundgramApi.lmortab+" > nav").animate({
		left:"0",
		opacity:"1"
    },300);

    var nick = $("h4#nick").text();
    if(nick!=soundgramApi.nick) {
        $("h4#nick").text(soundgramApi.nick);
    }
    
    if(soundgramApi.ostype==2) {
        window.webkit.messageHandlers.test.postMessage("nav_on");
    }
}

function close_leftmenu() {
	$("header#"+soundgramApi.lmortab+" > nav").animate({
		left:"-240",
		opacity:"0"
	},300, function() {
		$("header#"+soundgramApi.lmortab).addClass("hidden");
    });
    
    if(soundgramApi.ostype==2) {
        window.webkit.messageHandlers.test.postMessage("nav_off");
    }
}

function list_effect(type) {
    var delaysec = 0.2;
    var durationsec = 0.4;
    var divid = "ul.songlist";
    if(type=="booklet") divid="div#booklet_img_list";
    else if(type=="video") divid="div#video_list";
    else if(type=="thanks") divid="div#thanks_list";
    else if(type=="artist") divid="div.artist";
    else if(type=="album") divid="div.album";
    else if(type=="credit") divid="div.credit";

    if(type=="artist" || type=="album" || type=="credit") {
        $(divid).css({
            "animation": "rightFadeIn "+delaysec+"s",
            "animation-fill-mode": "both",
            "-webkit-animation": "rightFadeIn "+delaysec+"s",
            "-webkit-animation-fill-mode": "both",
            "-webkit-animation-delay": delaysec+"s",
            "-webkit-animation-duration": durationsec+"s"
        });
    }
    else {
        $(divid).removeClass("hidden");
        $(divid+" > li").each(function(idx) {
            if(idx>0) {
                delaysec = delaysec+0.1;
                durationsec = durationsec+0.1
            }

            $(divid+" > li").eq(idx).css({
                "animation": "rightFadeIn "+delaysec+"s",
                "animation-fill-mode": "both",
                "-webkit-animation": "rightFadeIn "+delaysec+"s",
                "-webkit-animation-fill-mode": "both",
                "-webkit-animation-delay": delaysec+"s",
                "-webkit-animation-duration": durationsec+"s"
            });
        });
    }
}

function open_play(valueofclick) {
    if(soundgramApi.diskid.substring(0,1)=="p") {
        $("div#mini_play_eq").addClass("hidden");
        $("div.menu").hide();
        // $("div#p_swipe > div").addClass("hidden");
        $("div#"+soundgramApi.premiumPlayer).removeClass("hidden");
        
        if($("span#play_close").is(":hidden")) $("span#play_close").show();

        if(!$("div.play_eq1").is(":visible")) {
            // $("div.play_eq1").removeClass("hidden");
            // $("div.play_eq2").removeClass("hidden");
            playeqStopAndRunning("running");
        }
    }
    else {
        horizontal_swiper.slideTo(2,1000,false);
    }
    
    musicSetting(valueofclick);
    var np = window.setTimeout(function() {
        window.clearTimeout(np);

        var player = document.getElementById("playMusic");
        player_init();

        if(player.currentTime>0) {
            $(".playbar").slider("destroy");

            player.pause();
            player.currentTime = 0;
        }

        $("button.pl_play").click();
    },300);
}

function musicSetting(valueofclick) {
    var album_type = soundgramApi.diskid.substring(0,1);
    var play_title = valueofclick.split("|")[1];

    if(byteCheck(play_title)>=24) {
        $("h1.play_title").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
        // $("div.m_pl_artist").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
        $("h3.m_pl_artist").text(play_title);
    }
    else {
        $("h1.play_title").text(play_title);
        $("h3.m_pl_artist").text(play_title);
    }
    
    $("audio#playMusic").val(valueofclick);
    if(album_type=="p") {
        $("div#"+soundgramApi.premiumPlayer).animate({
            top:"0",
            opacity:"1"
        },500);

        var np = window.setTimeout(function() {
            window.clearTimeout(np);
            // $("div.play_eq1").removeClass("hidden");
            // $("div.play_eq2").removeClass("hidden");
            $("div.play_eq_ing").removeClass("hidden");
            playeqStopAndRunning("running");
        },510);
    }

    if(typeof player_swiper=="undefined" || player_swiper==null) {
        player_vertical();    
    }
    else if(player_swiper!=null) {
        // console.log(valueofclick.substring(0,valueofclick.indexOf("|")));
        player_swiper.slideTo(valueofclick.substring(0,valueofclick.indexOf("|")), 500, false);
    }

    $("dd#songlike_play").children("div").addClass("hidden");
    var songlike = window.setTimeout(function() {
        window.clearTimeout(songlike);
        $("dd#songlike_play div").eq(valueofclick.substring(0,valueofclick.indexOf("|"))-1).removeClass("hidden");
    },500);

    $(".ui-slider-handle").removeClass("hidden");
    $(".ui-slider-handle").css({"top":"-.4em"});
}

function leftmenuswipe_onoff(type) {
    // 댓글관련 하단 팝업이 떠있을 경우 히든처리
    if($("div#addtionmenu").is(":visible")) {
        $("div#addtionmenu").hide();
    }

    // 신고하기 팝업이 떠있을 경우 히든처리
    if($("div#report_popup").is(":visible")) {
        $("div#report_popup").hide();
    }

    if(type=="hide") {
        $("div.leftmenu_horizontal_swiper").addClass("hidden");
        $("div.container").removeClass("hidden");
        $("div.horizontal_swiper").removeClass("hidden");
        // $("span#leftmenuswipe_close").hide();
        $("span#openleftmenu").show();
        
        $("div#schedulelist").empty();
        reviewClose();

        var player = document.getElementById("playMusic");
        if(player.currentTime>0) {
            $("div#mini_play_eq").removeClass("hidden");
        }
    }
    else {
        for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
            var titleimg = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.leftmenudiv[i]+"_img_title.png";
            $("div#leftmenuswipe > div#"+soundgramApi.leftmenudiv[i]+" > div.page_title > h1 > img").attr("src",titleimg);

            if(soundgramApi.leftmenudiv[i].substring(0,2)=="rv") {
                $("div.review_info > img").attr("src", ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.leftmenudiv[i]+"_btn_reduce.png");
                $("div.rv_write_snb > a > img").attr("src", ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.leftmenudiv[i]+"_btn_close.png");
                $("span.toolbar_write > img").attr("src", ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.leftmenudiv[i]+"_ic_write.png");
            }
        }
        
        $("div#leftmenuswipe > div > div.page_title > h1").removeClass("hidden");
        $("div.container").removeClass("hidden");
        $("div.leftmenu_horizontal_swiper").removeClass("hidden");
        $("div.horizontal_swiper").addClass("hidden");
        $("span#openleftmenu").show();
        // $("div#mini_play_eq").addClass("hidden");
        // $("span#leftmenuswipe_close").show();

        schedulelist();
    }
}

function reviewClose() {
    var rv = "";
    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        if(lm=="rv") {
            rv = soundgramApi.leftmenudiv[i];
        }
    }

    var imgSrc = $("img.review_info_btn").attr("src");
    $("img.review_info_btn").attr("src",imgSrc.replace("more","reduce"));

    // reviewTitleScrollEffect("280", "51%", "66px", "remove");

    // $("div#review > div.review_content3").removeClass("hidden");
    // $("div#review > div.review_content2").addClass("hidden");

    // $("div#review > div.review_content3").css({"animation":""});
    // $("div#review > div.review_content2").css({"animation":""});

    $("div#"+rv+" > div.review_content3").removeClass("hidden");
    $("div#"+rv+" > div.review_content3").css({"bottom":"0%"});
}

function schedulelist() {
    if($("div#schedulelist > li").length==0) {
        var now = new Date();
        var year= now.getFullYear();
        var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
        var thismonth = year+""+mon;

        $("div.schedule > h2").html(year+". <strong>"+mon+"</strong>");
        $("div.schedule > h2").attr("year",year);
        $("div.schedule > h2").attr("value",now.getMonth()+1);
        $("div#_schedulelist > li").each(function(idx) {
            if(thismonth==$("div#_schedulelist > li").eq(idx).attr("value")) {
                $("div#schedulelist").append($("div#_schedulelist > li").eq(idx).clone());
                var _t = 1000;
                if($("div#schedulelist > li:first > div").attr("class")=="empty") {
                    _t = 100;
                }

                var delaysec = 0.3;
                var durationsec = 0.5;

                $("div#schedulelist").loadingView({'state':true, 'imageStyle':"position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"});
                var ss = window.setTimeout(function(){
                    $("div#schedulelist").loadingView({'state':false});

                    window.clearTimeout(ss);
                    $("div#schedulelist > li").each(function(idx) {
                        $("div#schedulelist > li").eq(idx).removeClass("hidden");
                        if(idx>0) {
                            delaysec = delaysec+0.1;
                            durationsec = durationsec+0.2
                        }

                        $("div#schedulelist > li").eq(idx).css({
                           "animation": "rightFadeIn "+delaysec+"s",
                           "animation-fill-mode": "both",
                           "-webkit-animation": "rightFadeIn "+delaysec+"s",
                           "-webkit-animation-fill-mode": "both",
                           "-webkit-animation-delay": delaysec+"s",
                           "-webkit-animation-duration": durationsec+"s"
                        });
                    });
                }, _t);
            }
        });
    }
}

function scheduleMove(type) {
    var value = jQuery.param({"albumid":soundgramApi.albumid});
    $.ajax({
        type : "POST",
        url : "api/schedule.php",
        data : value,
        dataType: "json",
        success: function(data) {
            // console.log(data);
            scheduleSetting(data);
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

    var now = new Date();
    var year= $("div.schedule > h2").attr("year");
    var mon = $("div.schedule > h2").attr("value");
    var move_mon = "";
    if(type=="minus") {
        if((mon-1)==0) {
            year = year-1;
            move_mon = 12;
            $("div.schedule > h2").attr("value",move_mon);
        }
        else {
            move_mon = (parseInt(mon)-1)>9 ? ''+(parseInt(mon)-1) : '0'+(parseInt(mon)-1);
            $("div.schedule > h2").attr("value",parseInt(mon)-1);
        }
    }
    else {
        if(mon==12) {
            year = parseInt(year)+1;
            move_mon = "01";
            $("div.schedule > h2").attr("value",move_mon);
        }
        else {
            move_mon = (parseInt(mon)+1)>9 ? ''+(parseInt(mon)+1) : '0'+(parseInt(mon)+1);
            $("div.schedule > h2").attr("value",parseInt(mon)+1);
        }
    }

    $("div.schedule > h2").attr("year", year);

    var lastmonth = year+""+move_mon;

    $("div#schedulelist").children().remove();
    $("div#schedulelist").empty();
    $("div.schedule_swiper").children("span").remove();

    $("div.schedule > h2").html(year+". <strong>"+move_mon+"</strong>");
    
    $("div#schedulelist").loadingView({'state':true, 'imageStyle':"position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"});
    $("div#_schedulelist > li").each(function(idx) {
        // $("div#schedulelist > div").eq(idx).addClass("hidden");
        
        if(lastmonth==$("div#_schedulelist > li").eq(idx).attr("value")) {
            $("div#schedulelist").append($("div#_schedulelist > li").eq(idx).clone());

            var _t = 1000;
            if($("div#schedulelist > li:first > div").attr("class")=="empty") {
                _t = 1;
            }
            
            var ss = window.setTimeout(function(){
                window.clearTimeout(ss);
                resizeScheduleSwiper();
                schedule_swiper.scrollbar.updateSize();
                schedule_swiper.update();

                $("div#schedulelist > li").each(function(idx) {
                    var delaysec = 0.3;
                    var durationsec = 0.5;

                    $("div#schedulelist > li").eq(idx).removeClass("hidden");
                    if(idx>0) {
                        delaysec = delaysec+0.1;
                        durationsec = durationsec+0.2
                    }

                    $("div#schedulelist > li").eq(idx).css({
                       "animation": "rightFadeIn "+delaysec+"s",
                       "animation-fill-mode": "both",
                       "-webkit-animation": "rightFadeIn "+delaysec+"s",
                       "-webkit-animation-fill-mode": "both",
                       "-webkit-animation-delay": delaysec+"s",
                       "-webkit-animation-duration": durationsec+"s"
                    });
                });
            },_t);
        }
        // else {
        
        // }
    });

    var ss2 = window.setTimeout(function() {
        window.clearTimeout(ss2);

        if($("div#schedulelist > li").length==0) {
            var sc = "";
            for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
                var lm = soundgramApi.leftmenudiv[i].substring(0,2);
                if(lm=="sc") {
                    sc = soundgramApi.leftmenudiv[i];
                }
            }

            var HTML    
            = "<li class='swiper-slide' value='"+lastmonth+"'>"
            + "<div class='empty'>"
            + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+sc+"_img_empty.png' alt='No schedule'>"
            + "<p style='color:#454545'>등록된 스케줄이 없습니다.</p>"
            + "</div>"
            + "</li>";

            $("div#schedulelist").append(HTML);    
        }

        $("div#schedulelist").loadingView({'state':false});
    }, 100);
}

function dayofweek(type, date) {
    var week;
    if(type=="eng") week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    else week = ['일', '월', '화', '수', '목', '금', '토'];

    var dayOfWeek = week[new Date(date).getDay()];
    return dayOfWeek;
}

function schedule_effect() {
    $("header#"+soundgramApi.lmortab).removeClass("hidden");
    $("header#"+soundgramApi.lmortab+" > nav").animate({
        left:"0",
        opacity:"1"
    },300);
}

function memberjoin_check() {

}

function effect(_this) {
    $(_this).css({
        "animation": "rightFadeIn 0.4s",
        "animation-fill-mode": "both",
        "-webkit-animation": "rightFadeIn 0.4s",
        "-webkit-animation-fill-mode": "both",
        // "-webkit-animation-delay": "0.4s",
        "-webkit-animation-duration": "0.6s"
    });
}

function effect_fadeout(_this) {
    $(_this).css({
        "animation": "leftFadeOut 0.4s",
        "animation-fill-mode": "both",
        "-webkit-animation": "leftFadeOut 0.4s",
        "-webkit-animation-fill-mode": "both",
        // "-webkit-animation-delay": "0.4s",
        "-webkit-animation-duration": "0.6s"
    });
}

function effect_topfadeout(_this) {
    $(_this).css({
        "animation": "ReviewTopFadeOut 0.4s",
        "animation-fill-mode": "both",
        "-webkit-animation": "ReviewTopFadeOut 0.4s",
        "-webkit-animation-fill-mode": "both",
        // "-webkit-animation-delay": "0.4s",
        "-webkit-animation-duration": "0.6s"
    });   
}

function effect_topfadein(_this) {
    $(_this).css({
        "animation": "ReviewTopFadeIn 0.4s",
        "animation-fill-mode": "both",
        "-webkit-animation": "ReviewTopFadeIn 0.4s",
        "-webkit-animation-fill-mode": "both",
        // "-webkit-animation-delay": "0.4s",
        "-webkit-animation-duration": "0.6s"
    });   
}

function goLoginPage() {
    // $("div.container").addClass("hidden");
    // $("div.container_popup").children().addClass("hidden");
    // $("div.container_popup").removeClass("hidden");
    // $("div#"+soundgramApi.cuid+"_a").removeClass("hidden");
    // $("header#pop_top").removeClass("hidden");

    var w = $("div.container").width(); 
    var h = $("div.container").height();
    var param = "width="+w+",height="+h+",scrollbar=no,status=no,menubar=no,toolbar=no";

    var loginurl = soundgramApi.serverUrl+"/login_popup.php?albumid="+soundgramApi.albumid+"&device_id="+soundgramApi.device_id+"&uuid="+soundgramApi.uuid+"&diskpath="+soundgramApi.diskpath+"&diskid="+soundgramApi.diskid+"&isiplayer=false&ostype="+soundgramApi.ostype;
	// console.log(loginurl);
	window.open(loginurl,'로그인',param);
}

function profile_detail(user) {
    var profilepath = "user/"+soundgramApi.user_id+"/"+user.profile;
    var profile = "media/"+profilepath;

    if(user.profile=="default/profile_none.png") {
        // profilepath = user.profile;
        profile = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/gn01_img_profile_df.png";
    }

    if(user.profile.indexOf("http")!=-1) {
        profile = user.profile;
    }

    soundgramApi.profileimg = profile;

    // 왼쪽 날개메뉴
    $("div#leftmenu_profile").css({"background-image":"url('"+profile+"')"});
    $("h4#nick").empty();
    $("h4#nick").text(soundgramApi.nick);
	// 프로필 정보
    // $("div#"+soundgramApi.cuid+"_g").attr("val",user.snstype);
    // $("div#"+soundgramApi.cuid+"_g > div.profile").css({"background-image":"url('"+profile+"')"});
    $("li#profile_name").html("<span>이름</span>"+user.name);
    $("li#profile_id").html("<span>ID</span>"+user.account);
    // $("input#profile_nick").val(soundgramApi.nick);
    // $("input#profile_tel").val(soundgramApi.tel);
    $("li#profile_regdate").html("<span>가입일</span>"+user.regdate);
}

function member_close() {
    var album_type = soundgramApi.diskid.substring(0,1);
    var showPlayer = true;
    $("input:visible").val("").blur();
    
    if($("div#"+soundgramApi.cuid+"_a").is(":visible") || $("div#"+soundgramApi.cuid+"_g").is(":visible")) {
        $("header#pop_top").addClass("hidden");
        $("div.container_popup").children("div").addClass("hidden");
        $("div.container_popup").addClass("hidden");
        $("div.container").removeClass("hidden");
        $("div.horizontal_swiper").removeClass("hidden");
    }
    else if($("div#"+soundgramApi.cuid+"_f").is(":visible")) {
        $("div.container_popup").children("div").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_g").removeClass("hidden");
        effect("div#"+soundgramApi.cuid+"_g");
    }
    else if($("div#"+soundgramApi.cuid+"_d").is(":visible")) {
        if(album_type=="s") {
            $("header#pop_top").addClass("hidden");
            $("div.container_popup").addClass("hidden");
            $("div#"+soundgramApi.cuid+"_d").addClass("hidden");

            $("div.container").removeClass("hidden");
            $("div#service_info").removeClass("hidden");
            
            effect("div#service_info");   
        }
        else {
            showPlayer = false;
            $("header#pop_top").addClass("hidden");
            $("div.container_popup").children("div").addClass("hidden");
            $("div.container_popup").addClass("hidden");
            // $("div#"+soundgramApi.cuid+"_a").removeClass("hidden");
            // effect("div#"+soundgramApi.cuid+"_a");

            $("div.container").removeClass("hidden");
            $("div.horizontal_swiper").removeClass("hidden");
        }
    }
    else {
        $("div.container_popup").children("div").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_a").removeClass("hidden");
        effect("div#"+soundgramApi.cuid+"_a");
    }

    if(showPlayer) {
        var player = document.getElementById("playMusic");
        if(player.currentTime>0) {
            var mpe = window.setTimeout(function() {
                window.clearTimeout(mpe);
                $("div#mini_play_eq").removeClass("hidden");
            }, 1000);
        }
    }
}

function change_like(type, idx) {
    var pl = "";
    for(var i=0; i<soundgramApi.albumdiv.length; i++) {
        var lm = soundgramApi.albumdiv[i].substring(0,2);
        if(lm=="pl") {
            pl = soundgramApi.albumdiv[i];
        }
    }

    var id = $("ul.songlist > li").eq(idx).find("#songlike_playlist").attr("value3");
    if(typeof id=="undefined") {
        return false;
    }

    var like = "-1";
    var likecnt = parseInt($("ul.songlist > li").eq(idx).find("#songlike_playlist").attr("value"));
    if($("dd#songlike_play > div").eq(idx).children("span").hasClass("off")) {
        like = "1";
        likecnt = likecnt + 1;
    }
    else {
        likecnt = likecnt - 1;
    }

    // console.log(idx+"/"+id+"/"+soundgramApi.device_id+"/"+soundgramApi.user_id);
    var value = jQuery.param({"type":"song", "like":like, "avr":soundgramApi.albumid, "id":id, "device_id":soundgramApi.device_id, "user_id":soundgramApi.user_id});
    $.ajax({
        type : "POST",
        data : value,
        url : "api/like_update.php",
        dataType: "json",
        success: function(data) {
            var likeonoff = $("dd#songlike_play > div").eq(idx).children("span").attr("class");
            var likeclass = "off";
            if(likeonoff=="off") {
                likeclass = "on";
                if(type=="player") {
                    $("div.like_heart").removeClass("hidden");
                    // var cnt = 1;
                    // var cnt2 = "";
                    // var heart = window.setInterval(function() {
                    //     if(cnt<15) {
                    //         if(cnt<10) cnt2 = "0"+cnt;
                    //         else cnt2 = cnt;

                            var plnum = pl;
                            if(soundgramApi.diskid.substring(0,1)=="p") plnum = soundgramApi.premiumPlayer;

                    //         $("div.like_heart > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+plnum+"_img_like_"+cnt2+".png");
                    //         cnt++;
                    //     }
                    //     else {
                    //         window.clearInterval(heart);
                    //         $("div.like_heart").addClass("hidden");
                    //     }
                    // }, 50);

                    $("div.like_heart > img").attr("src",""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+plnum+"_img_like.png");
                }
            }
            else {
                likeclass = "off";
            }

            var likecntfork = likecnt_change(likecnt);
            $("ul.songlist > li").eq(idx).find("#songlike_playlist").attr("value",likecnt);
            $("ul.songlist > li").eq(idx).find("#songlike_playlist").html("<span class='"+likeclass+"'></span>"+likecntfork);
            $("dd#songlike_play > div").eq(idx).html("<span class='"+likeclass+"'></span>"+likecntfork);
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function likecnt_change(likecnt) {
    var likecntfork = 0;

    if(likecnt>=1000) {
        likecntfork = likecnt / 1000;
        likecntfork = likecntfork.toFixed(1) + "k";
    }
    // else if(likecnt>=100 && likecnt<1000) {
    //     likecntfork = likecnt / 1000;
    //     likecntfork = likecntfork.toFixed(1);   
    // }
    else likecntfork = likecnt;

    return likecntfork;
}

function change_videolike(videoNo) {
    var like = "-1";
    var idx = 0;

    $("div#video_list > li").each(function(index) {
        if($("div#video_list > li").eq(index).attr("value")==videoNo) {
            idx = index;
            return false;
        }
    });

    var likecnt = parseInt($("div#video_list > li").eq(idx).attr("value3"));
    if($("div#video_list > li").eq(idx).find("#videoLikeCnt").children("span").hasClass("off")) {
        like = "1";
        likecnt = likecnt + 1;

    }
    else {
        likecnt = likecnt - 1;
    }

    var value = jQuery.param({"type":"video", "like":like, "avr":soundgramApi.albumid, "id":videoNo, "device_id":soundgramApi.device_id, "user_id":soundgramApi.user_id});
    $.ajax({
        type : "POST",
        data : value,
        url : "api/like_update.php",
        dataType: "json",
        success: function(data) {
            var likeonoff = $("div#video_list > li").eq(idx).find("#videoLikeCnt").children("span").attr("class");
            var likeclass = "off";
            if(likeonoff=="off") {
                likeclass = "on";
            }
            else {
                likeclass = "off";
            }

            $("div#video_list > li").eq(idx).attr("value3",likecnt);
            $("div#video_list > li").eq(idx).find("#videoLikeCnt").html("<span id='videoLikeCnt_span' class='"+likeclass+"' value='"+videoNo+"'></span>"+likecnt_change(likecnt));
            $("div.video_title > a > dd.no_like").html("<span class='"+likeclass+"'></span>"+likecnt_change(likecnt));
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function change_videocommentlike(commentNo) {
    var thisidx = 0;
    $("div#vclist > li").each(function(idx) {
        if($("div#vclist > li").eq(idx).find("dd.no_like").attr("value")==commentNo) {
            thisidx = idx;
        }
    });

    var like = "-1";
    var likecnt = parseInt($("div#vclist > li").eq(thisidx).attr("value"));
    if($("div#vclist > li").eq(thisidx).find("#videoCommentLikeCnt").children("span").hasClass("off")) {
        like = "1";
        likecnt = likecnt + 1;

    }
    else {
        likecnt = likecnt - 1;
    }

    var value = jQuery.param({"type":"videocomment", "like":like, "avr":soundgramApi.albumid, "id":commentNo, "device_id":soundgramApi.device_id, "user_id":soundgramApi.user_id});
    $.ajax({
        type : "POST",
        data : value,
        url : "api/like_update.php",
        dataType: "json",
        success: function(data) {
            var vidxlike = 0;
            var likeonoff = $("div#vclist > li").eq(thisidx).find("#videoCommentLikeCnt").children("span").attr("class");
            var likeclass = "off";
            if(likeonoff=="off") {
                likeclass = "on";
                vidxlike = 1;
            }
            else {
                likeclass = "off";
                vidxlike = 0;
            }

            $("div#vclist > li").eq(thisidx).attr("value",likecnt);
            $("div#vclist > li").eq(thisidx).find("#videoCommentLikeCnt").html("<span class='"+likeclass+"' value='"+commentNo+"'></span>"+likecnt_change(likecnt));

            $.each(vclistdata, function(vidx) {
                if(vclistdata[vidx].id==commentNo) {
                    vclistdata[vidx].videocommentlikeonoff = vidxlike;
                    vclistdata[vidx].likeCount = likecnt;
                }
            });
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function videoCommentOrderSetting(order, id, videoid, videoReplyCnt) {
    var idx = 0;

    $("div#video_toolbar > span#newest").css({"display":"inline-block"});
    $("div#video_toolbar > span#recomm").css({"display":""});
    
    $("div#video_toolbar > span#newest").removeClass("toolbar_select");
    $("div#video_toolbar > span#recomm").addClass("toolbar_select");

    $("dd#vReplyCnt").attr("value", videoReplyCnt);
    $("dd#vReplyCnt").html("<span></span>"+videoReplyCnt);
    $("div#video_list > li").each(function(index) {
        if($("div#video_list > li").eq(index).attr("value")==id) {
            idx = index;
            return false;
        }
    });

    $("div#video_list > li").eq(idx).children("div.videolist").attr("value3", videoReplyCnt);
    $("div#video_list > li").eq(idx).children("div.videolist").children("h3#vlist1").attr("value3", videoReplyCnt);
    $("div#video_list > li").eq(idx).children("div.videolist").children("div#vlist2").attr("value3", videoReplyCnt);
    $("div#video_list > li").eq(idx).children("div.videolist").children("dd#videoReplyCount").attr("value", videoReplyCnt);
    $("div#video_list > li").eq(idx).children("div.videolist").children("dd#videoReplyCount").html("<span></span>"+likecnt_change(videoReplyCnt));

    // $("div#video_toolbar > span#newest").removeClass("toolbar_select");
    // $("div#video_toolbar > span#recomm").removeClass("toolbar_select");

    // if(order=="0") $("div#video_toolbar > span#newest").attr("class","toolbar_select");
    // else $("div#video_toolbar > span#recomm").attr("class","toolbar_select");
                
    $("div.horizontal_swiper").addClass("hidden");
    // $("div#vd02").removeClass("hidden");
    // effect("div#vd02");

    videoCommentOrderChange(100);
}

var videoComment = "";
function videoCommentOrderChange(time) {
    // $("div.review_content2").loadingView({'state':true, 'imageStyle':"position:absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);"});
    if(videoComment!=null) window.clearTimeout(videoComment);
    videoComment = window.setTimeout(function() {
        // $("div#vclist").parent().addClass("swiper-container");
        // $("div#vclist > li").each(function(idx) {
        //     $("div#vclist > li").eq(idx).removeClass("hidden");
        // });
        $("div.videocomment_scollbar").removeClass("hidden");
        
        // if(typeof vvc_swiper!="undefined" || vvc_swiper!=null) {
            $("div.vvc_swiper").css({"width":"100%", "height":"70%"});
            vertical_videocomment();
        // }
        // $("div.review_content2").loadingView({'state':false});
        vvc_swiper.scrollbar.updateSize();
    }, time);
}

function change_reviewlike(reviewNo) {
    var like = "-1";
    var likecnt = parseInt($("span#reviewLikeCnt").attr("value2"));
    if($("span#reviewLikeCnt").hasClass("off")) {
        like = "1";
        likecnt = likecnt + 1;

    }
    else {
        likecnt = likecnt - 1;
    }

    var value = jQuery.param({"type":"review", "like":like, "avr":soundgramApi.albumid, "id":reviewNo, "device_id":soundgramApi.device_id, "user_id":soundgramApi.user_id});
    $.ajax({
        type : "POST",
        data : value,
        url : "api/like_update.php",
        dataType: "json",
        success: function(data) {
            var likeonoff = $("span#reviewLikeCnt").attr("class");
            var likeclass = "off";
            if(likeonoff=="off") {
                likeclass = "on";
            }
            else {
                likeclass = "off";
            }

            $("dd#review_dd").html("<span id='reviewLikeCnt' class='"+likeclass+"' value='"+reviewNo+"' value2='"+likecnt+"'></span>"+likecnt_change(likecnt));
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function change_reviewcommentlike(commentNo) {
    var thisidx = 0;
    $("div#rclist > li").each(function(idx) {
        if($("div#rclist > li").eq(idx).find("dd.no_like").attr("value")==commentNo) {
            thisidx = idx;
        }
    });

    var like = "-1";
    var likecnt = parseInt($("div#rclist > li").eq(thisidx).attr("value"));
    if($("div#rclist > li").eq(thisidx).find("#reviewCommentLikeCnt").children("span").hasClass("off")) {
        like = "1";
        likecnt = likecnt + 1;
    }
    else {
        likecnt = likecnt - 1;
    }
    
    var value = jQuery.param({"type":"reviewcomment", "like":like, "avr":soundgramApi.albumid, "id":commentNo, "device_id":soundgramApi.device_id, "user_id":soundgramApi.user_id});
    $.ajax({
        type : "POST",
        data : value,
        url : "api/like_update.php",
        dataType: "json",
        success: function(data) {
            var rclike = 0;
            var likeonoff = $("div#rclist > li").eq(thisidx).find("#reviewCommentLikeCnt").children("span").attr("class");
            var likeclass = "off";
            if(likeonoff=="off") {
                likeclass = "on";
                rclike = 1;
            }
            else {
                likeclass = "off";
                rclike = 0;
            }

            $("div#rclist > li").eq(thisidx).attr("value",likecnt);
            $("div#rclist > li").eq(thisidx).find("#reviewCommentLikeCnt").html("<span class='"+likeclass+"' value='"+commentNo+"'></span>"+likecnt_change(likecnt));

            $.each(reviewcommentdata, function(rcidx) {
                if(reviewcommentdata[rcidx].id==commentNo) {
                    // reviewcommentdata[rcidx].likeonoff = rclike;
                    reviewcommentdata[rcidx].likeCount = likecnt;
                }
            });
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function reviewCommentOrderSetting(order, page, makereivew) {
    $("h5#r_toolbar > span#recomm").removeClass("toolbar_select");
    $("h5#r_toolbar > span#newest").removeClass("toolbar_select");

    if(order=="0") $("h5#r_toolbar > span#recomm").attr("class","toolbar_select");
    else $("h5#r_toolbar > span#newest").attr("class","toolbar_select");

    // $("div#rclist").children().remove();
    // $("div#rclist").empty();

    // Soundgram.getReviewList(order, "0", makereivew);
            
    reviewCommentOrderChange(100);
}

// function reviewCommentOrderChange() {
    // var review_ss = window.setTimeout(function() {
        // window.clearTimeout(review_ss);
        // $("div#rclist").parent().addClass("swiper-container");
        // $("div#rclist > li").each(function(idx) {
        //     $("div#rclist > li").eq(idx).removeClass("hidden");
        // });

        // $("div#rclist").each(function(idx) {
        //     $(this).removeClass("hidden");
        // });
        // $("div.review_content2").loadingView({'state':true, 'imageStyle':"position:absolute; top: 20%; left: 50%; transform: translate(-50%, -50%);"});
        
        // $("div.reviewcomment_scollbar").removeClass("hidden");
        // $("div.review_content2").loadingView({'state':false});
        // if(typeof rc_swiper!="undefined" || rc_swiper!=null) {
        //     rc_swiper.scrollbar.updateSize();
        // }
    // },1500);
// }

var reviewComment = "";
function reviewCommentOrderChange(time) {
    // $("div.review_content2").loadingView({'state':true, 'imageStyle':"position:absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);"});
    if(reviewComment!=null) window.clearTimeout(reviewComment);
    reviewComment = window.setTimeout(function() {
        // $("div#vclist").parent().addClass("swiper-container");
        // $("div#vclist > li").each(function(idx) {
        //     $("div#vclist > li").eq(idx).removeClass("hidden");
        // });
        $("div.reviewcomment_scollbar").removeClass("hidden");
        // if(typeof rc_swiper!="undefined" || rc_swiper!=null) {
            $("div.rc_swiper").css({"width":"100%", "height":"70%"});
            vertical_reviewcomment();
        // }
        // $("div.review_content2").loadingView({'state':false});
        rc_swiper.scrollbar.updateSize();
    }, time);
}

function empty_check() {
    var sc = "";
    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        if(lm=="sc") {
            sc = soundgramApi.leftmenudiv[i];
        }
    }

    var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var thismonth = year+""+mon;

    var monthArray = [];
    for(var i=1; i<=(now.getMonth()+1); i++) {
        var month = i>9?''+i:"0"+i;
        monthArray.push(year+""+month);
    }

    var dataMonthArray = [];
    $("div#_schedulelist > li").each(function(idx) {
        dataMonthArray.push($("div#_schedulelist > li").eq(idx).attr("value"));
    });
    
    var uniqueMonth = [];
    $.each(dataMonthArray, function(key, value) { 
        if($.inArray(value, uniqueMonth) === -1) uniqueMonth.push(value); 
    });

    var notUseMonth = [];
    $.each(monthArray, function(key, value) { 
        if($.inArray(value, uniqueMonth) === -1) notUseMonth.push(value); 
    });

    $.each(notUseMonth, function(key, value) {
        var HTML    = "<li class='swiper-slide hidden' value='"+value+"'>"
                    + "<div class='empty'>"
                    + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+sc+"_img_empty.png' alt='No schedule'>"
                    + "<p style='color:#454545'>등록된 스케줄이 없습니다.</p>"
                    + "</div>"
                    + "</li>";
        $("div#_schedulelist").append(HTML);
    });    
}

function shuffleRandom(n){
    var ar = new Array();
    var temp;
    var rnum;
   
    //전달받은 매개변수 n만큼 배열 생성 ( 1~n )
    for(var i=1; i<=n; i++){
        ar.push(i);
    }

    //값을 서로 섞기
    for(var i=0; i< ar.length ; i++)
    {
        rnum = Math.floor(Math.random() *n); //난수발생
        temp = ar[i];
        ar[i] = ar[rnum];
        ar[rnum] = temp;
    }

    return ar;
}

function playeqStopAndRunning(type) {
    // $("div.play_eq1").clearQueue().stop();
    // $("div.play_eq2").clearQueue().stop();

    // $("div.play_eq1").css({"animation-play-state": type});
    // $("div.play_eq2").css({"animation-play-state": type});

    $("div.play_eq_ing").clearQueue().stop();
    $("div.play_eq_ing").css({"animation-play-state": type});
}

function videoCommentListToolbarMake(id, videoid, videoReplyCnt) {
    var vi = "";
    for(var i=0; i<soundgramApi.albumdiv.length; i++) {
        var lm = soundgramApi.albumdiv[i].substring(0,2);
        if(lm=="vi") {
            vi = soundgramApi.albumdiv[i];
        }
    }

    var HTML = "";
    HTML =  "<li id='_vcToolbar' class='swiper-slide'> "
         +  "<div class='video_title'> "
         +  "<h3 style='margin-bottom:8px; color:black'></h3> "
         +  "<dd class='no_view'></dd> "
         +  "<a id='vlike_a' href='#'><dd id='vlike_dd' class='no_like'></dd></a> "
         +  "<dd id='vReplyCnt' value='"+videoReplyCnt+"' class='no_comment'><span></span>"+likecnt_change(videoReplyCnt)+"</dd> "
         +  "<div class='clear'></div> "
         +  "</div> "
         +  "<div id='video_toolbar' class='review_toolbar'> "
         +  "<span id='recomm' class='toolbar_select'>추천순</span> "
         +  "<span id='newest' class=''>최신순</span> "
         +  "<span class='toolbar_write'><img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+vi+"_ic_write.png' class='toolbar_write_icon'>글쓰기</span> "
         +  "</div> "
         +  "</li> ";

    $("div#vclist").prepend(HTML);
    $("div.video_title").attr("value",id);
    $("div.video_title").attr("value2",videoid);
}

var vclistInterval = "";
var vclistdata = null;
function videoCommentListSetting(reload, id, videoid, order) {
    var album_type = soundgramApi.diskid.substring(0,1);
    var value = jQuery.param({"type":"video", "id":id, "albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});
    $.ajax({
        type : "POST",
        url : "api/comment_info.php",
        data : value,
        dataType: "json",
        success: function(data) {
            $("div#vclist li").each(function(idx) {
                if(idx>0) {
                    $(this).remove();
                }
            });

            var title = data[0].title;
            var viewCount = data[0].viewCount;
            var rv_id = data[0].rv_id;
            var videoLikeCount = data[0].videoLikeCount;
            var videoReplyCnt = data[0].videoReplyCnt;
            var vlonoff = data[0].likeonoff;

            $("div.review_toolbar").attr("value", id);
            $("div.review_toolbar").attr("value2", videoid);
            
            $("div.video_title > h3").text(title);
            if(byteCheck(title)>35) {
                $("div.video_title > h3").html("<marquee behavior='altemate'>"+title+"</marquee>");
            }
            
            $("div.video_title > dd.no_view").html("조회수 "+likecnt_change(viewCount));
            $("div#video_list > li").each(function(index) {
                if($("div#video_list > li").eq(index).attr("value")==rv_id) {
                    $("div#video_list > li").eq(index).find(".no_view").html("조회수 "+likecnt_change(viewCount));
                }
            });

            var videolikeonoff = "off";
            if(vlonoff>0) videolikeonoff = "on";
            $("div.video_title > a > dd.no_like").html("<span class='"+videolikeonoff+"'></span>"+likecnt_change(videoLikeCount));
            $("div#"+soundgramApi.videoPopup).val(rv_id);
            $("div.review_toolbar").attr("value", rv_id);

            vclistdata = data;
            vclistdata.splice(0,1);
            if(vclistdata.length>0) {
                $("div.empty_rv").remove();

                $.each(vclistdata, function(al) {
                    var makeListHTML = makeHTML(album_type, "vclist", vclistdata[al], soundgramApi.artistname);
                    $("div#vclist").append(makeListHTML);
                });
            }
            else {
                $("div#vclist").append(empty_re());

            }

            if(reload=="true") {
                vvc_swiper.destroy(true, false);
                videoCommentOrderChange();
            }

            vclistInterval = window.setInterval(function() {
                if(vclistdata.length == $("div#vclist > li").length-1) {
                    window.clearInterval(vclistInterval);
                    videoCommentOrderSetting("0", id, videoid, videoReplyCnt);
                }
            }, 100);
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function reviewTitleScrollEffect(h, review_h, mt, type) {
    var rv = "";
    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        if(lm=="rv") {
            rv = soundgramApi.leftmenudiv[i];
        }
    }

    if(h>0) {
        $("div#"+rv+" > div.page_title").css({height:h});
    }
    else {
        $("div#"+rv+" > div.page_title").css({height:""});
    }

    $("div#"+rv+" > div.page_title").animate({
        opacity:"1"
    }, 100, function() {
        $("div.review").css({"height":review_h, "margin-top":mt});
        $("div.review").each(function(idx) {
            if(type=="remove") {
                // $(this).removeClass("hidden");
                // $(this).children("h2").show();
                // $(this).children(".fl_right").show();
                $(this).children(".rv_deco").show();
                $(this).children(".rv_info").css({"bottom":"-6px"});
            }
            else if(type=="add") {
                // $(this).addClass("hidden");
                // $(this).children("h2").hide();
                // $(this).children(".fl_right").hide();
                $(this).children(".rv_deco").hide();
                $(this).children(".rv_info").css({"bottom":"0px"});
            }
        });
    });
}

var smc = "";
function standard_musicbtn_change(gubun) {
    if(smc!=null) window.clearInterval(smc);
    if(gubun=="nav") {
        $("li[class*=tb_pl_o]").css({"background-image":""});

        // $("li.tb_pl_on").css({"background-image":"url("+"diskid/"+diskid+"/images/tb01_btn_play_on_3@.png"});
        // $("li.tb_pl_off").css({"background-image":"url("+"diskid/"+diskid+"/images/tb01_btn_play_off_3@.png"});
    }
    else {
        $("li[class*=tb_pl_o]").css({"background-image":""});
        $("li[class*=tb_pl_on]").css({"background-image":"url("+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.lmortab+"_btn_playing_on01_3@.png"});
        $("li[class*=tb_pl_off]").css({"background-image":"url("+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.lmortab+"_btn_playing_off01_3@.png"});

        var smcnum = 0;
        smc = window.setInterval(function() {
            if(smcnum==3) {
                smcnum = 0;
            }
            else {
                smcnum++;
                $("li[class*=tb_pl_on]").css({"background-image":"url("+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.lmortab+"_btn_playing_on0"+smcnum+"_3@.png"});
                $("li[class*=tb_pl_off]").css({"background-image":"url("+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+soundgramApi.lmortab+"_btn_playing_off0"+smcnum+"_3@.png"});
            }
        }, 150);
    }
}

function scheduleSetting(schedule) {
    var album_type = soundgramApi.diskid.substring(0,1);
    var schedulelistdata = schedule;
    if(schedulelistdata.length>0) {
        schedulelistdata.sort(function(a,b) {
            return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
        });

        $("div#_schedulelist").empty();
        $.each(schedulelistdata, function(al) {
            var makeListHTML = makeHTML(album_type, "schedulelist", schedulelistdata[al], "");
            $("div#_schedulelist").append(makeListHTML);
        });
    }

    empty_check();
}

function snsSetting(sns) {
    var album_type = soundgramApi.diskid.substring(0,1);
    var snslistdata = sns;
    var twitter_url = "";
    var direction = "sns_vertical";
    if($("div.sns_horizontal").is(":visible")) {
        direction = "sns_horizontal";
    }

    $.each(snslistdata, function(al) {
        var makeListHTML = makeHTML(album_type, direction, snslistdata[al], "");
        $("div#snslist").append(makeListHTML);

        if(snslistdata[al].snsName=="Twitter") {
            twitter_url = snslistdata[al].snsUrl;
        }
    });

    var tw = window.setInterval(function() {
        if(twitter_url!="") {
            window.clearInterval(tw);

            $("div.sns_bar_icon > img").attr("src",soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/sn02_ic_twt_1.png");
            $("div.sns_bar > h3").html(soundgramApi.artistname+"의 공식 트위터</br><span>실시간 소식을 확인하세요!</span>");
            $("a.twitter-timeline").attr("href",twitter_url+"?ref_src=twsrc%5Etfw");
            $("div.sn_block").append("<script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>");
        }
    },100);
}

function snsSwiperSetting() {
    var swiperClass = ".sns_vertical";
    var direction = "vertical";
    if($("div.sns_horizontal").is(":visible")) {
        swiperClass = ".sns_horizontal";
        direction = "horizontal";
    }
    
    sns_swiper_setting(swiperClass, direction);
}

function reviewSetting(data) {
    var album_type = soundgramApi.diskid.substring(0,1);
    var reviewdata = data;
    $.each(reviewdata, function(al) {
        var makeListHTML = makeHTML(album_type, "review", reviewdata[al], "");
        $("div.review").append(makeListHTML);
    });
}

var rclistInterval =  null;
var reviewcommentdata = null;
function reviewCommentSetting(data) {
    $("div.empty_rv").remove();

    var album_type = soundgramApi.diskid.substring(0,1);
    var rv = "";
    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        if(lm=="rv") {
            rv = soundgramApi.leftmenudiv[i];
        }
    }
    
    $("div#"+rv).attr("value",data[0].id);
    
    if($("div.review_info_btnbox").is(":visible")) {
        $("dd#reviewReplayCount").attr("value",data[0].videoReplyCnt);
        $("dd#reviewReplayCount").html("<span></span>"+likecnt_change(data[0].videoReplyCnt));
    }

    reviewcommentdata = data;
    reviewcommentdata.splice(0,1);
    
    $.each(reviewcommentdata, function(al) {
        var makeListHTML = makeHTML(album_type, "reviewcomment", reviewcommentdata[al], "");
        $("div#rclist").append(makeListHTML);
    });

    if(reviewcommentdata.length>0) {
        rclistInterval = window.setInterval(function() {
            // console.log(reviewcommentdata.length+"/"+$("div#rclist > li").length);
            if(reviewcommentdata.length == $("div#rclist > li").length) {
                window.clearInterval(rclistInterval);
                reviewCommentOrderSetting("0", "0", "true");
            }
        }, 100);
    }
    else {
        reviewCommentOrderSetting("0", "0", "true");
    }
}

function reviewLoad(reviewcomment) {
    rclistInterval = window.setInterval(function() {
        if(reviewcomment.reviewcommentlist.length == $("div#rclist > li").length) {
            window.clearInterval(rclistInterval);
            reviewCommentOrderChange(100);
        }
    }, 100);
}

function goJoin(name, id, password, tel, nick, snstype, profile) {
	var value = jQuery.param({
        "name":name
        , "userid":id
        , "passwd":sha256(password)
        , "phone":tel
        , "nick":nick
        , "snstype":snstype
        , "uuid":soundgramApi.uuid
        , "device_id":soundgramApi.device_id
        , "profile":profile
        , "albumid":soundgramApi.albumid
    });

    $.ajax({
        type : "POST",
        url : "api/join_device.php",
        data : value,
        dataType: "json",
        success: function(data) {
            var returnCode = data.returnCode;
            if(returnCode=="join_complete") {
                loginComplete(data);
            }
            else joinError(returnCode);
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function loginComplete(user) {
    $("input:visible").val("").blur();
    $("header#pop_top").addClass("hidden");
    $("div.container_popup").children("div").addClass("hidden");
    $("div.container_popup").addClass("hidden");
    $("div.container").removeClass("hidden");
    
    //왼쪽 날개메뉴 하단메뉴가 있을 경우 메인화면 뜨지않도록 수정
    if($("div#leftmenuswipe").is(":hidden")) {
        $("div.horizontal_swiper").removeClass("hidden");
    }
    
    if(user.snstype!="0") {
        $("button#changepass").hide();
    }
    else {
        $("button#changepass").show();
    }
    
    soundgramApi.snstype = user.snstype;
    soundgramApi.profileimg = user.profile;
    soundgramApi.nick = user.nick;
    soundgramApi.tel = user.tel;
    soundgramApi.user_id = user.user_id;
    soundgramApi.device_id = user.device_id;
    soundgramApi.account = user.account;
    soundgramApi.username = user.name;
    soundgramApi.regdate = user.regdate;
    soundgramApi.loginoutflag = "1";
    soundgramApi.access_token = user.access_token;

    reSwiper();

    var lc = window.setTimeout(function() {
        window.clearTimeout(lc);
        profile_detail(user);
        toast("로그인이 완료되었습니다.");
    },1000);
}

function changeCustInfo(type, val) {
    var value = jQuery.param({"type":type, "user_id":soundgramApi.user_id, "val":val});
    $.ajax({
        type : "POST",
        url : "api/custInfoUpdate.php",
        data : value,
        dataType: "json",
        success: function(data) {
            if(data.returnCode=="already") {
                if(type=="user_nick") alert("이미 존재하는 닉네임입니다.");
                else if(type=="user_phone") alert("이미 존재하는 핸드폰 번호입니다.");
            }
            else {
                changeComplete(type, data.val);
            }
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function changeComplete(type, changeinfo) {
    var title = "";
    if(type=="user_nick") {
        title = "닉네임이";
        soundgramApi.nick = changeinfo;
        $("h4#nick").text(changeinfo);
        $("input#profile_nick").val(changeinfo);
        toast(title+" 변경 되었습니다.");
    }
    else if(type=="user_phone") {
        title = "핸드폰 번호가";
        soundgramApi.tel = changeinfo;
        $("input#profile_tel").val(changeinfo);
        toast(title+" 변경 되었습니다.");
    }
    else if(type=="profile") {
        // title = "프로필이"
//        $(" div.profile").css({"background-image":"url('"+changeinfo+"')"});
        // $("div#"+soundgramApi.cuid+"_g > div.profile").css({"background-image":"url('media/user/"+soundgramApi.user_id+"/"+changeinfo+"')"});
        soundgramApi.profileimg = "media/user/"+soundgramApi.user_id+"/"+changeinfo;
        $("div#leftmenu_profile").css({"background-image":"url('media/user/"+soundgramApi.user_id+"/"+changeinfo+"')"});
    }

    
}

function changePasswordComplete() {
    $("input:visible").val("").blur();
    $("div.container_popup").children("div").addClass("hidden");
    $("div#login_sns").removeClass("hidden");

    var sns = $("div#member_profile").attr("val");
    logout(sns);
}

function loginError() {
    $("input#loginpassword").val("");
    $("input#loginpassword").focus().select();
    $("div#loginpassalert").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
    return;
}

function joinError(type) {
    if(type=="already_id") $("div#member_input > div").eq(1).text("이미 사용중인 아이디입니다.").removeClass("hidden");
    else if(type=="already_phone") $("div#member_input > div").eq(4).removeClass("hidden");
    else if(type=="already_nick") $("div#member_input > div").eq(5).text("이미 사용 중인 닉네임입니다.").removeClass("hidden");
}

function findAccountErr() {
    $("div#srhid_alert_name").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
    $("input#id_srhname").val("").focus().select();
    $("input#id_srhtel").val("")
    return;
}

function resetPasswordErr() {
    $("div#srhpass_alert_id").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
    $("input#pass_srhid").val("").focus().select();
    $("input#pass_srhtel").val("");
    return;
}

function changePassErr() {
    $("div#changepass").removeClass("hidden").text("비밀번호가 맞지 않아요!");
    $("input#inputcpass").val("").focus().select();
    $("input#inputcnpass").val("")
    return;
}


function logout(snstype) {
    console.log(snstype);
    var value = jQuery.param({"uuid":soundgramApi.uuid, "albumid":soundgramApi.albumid});
    $.ajax({
        type : "POST",
        url : "api/logout.php",
        data : value,
        dataType: "json",
        success: function(data) {
            member_close();

            soundgramApi.nick = "로그인 / 회원가입";
            soundgramApi.tel = "";
            soundgramApi.user_id = "";
            soundgramApi.account = "";
            soundgramApi.loginoutflag = "0";
            
            var user = new Object();
            user.nick = "";
            user.tel = "";
            user.account = "";
            user.profile = "default/profile_none.png";
            user.snstype = snstype;
            user.regdate = "";

            reSwiper();
            
            profile_detail(user);
            toast("로그아웃 되었습니다.");
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

var removeToast;
function toast(string) {
    const toast = document.getElementById("toast");

    toast.classList.contains("reveal") ?
        (window.clearTimeout(removeToast), removeToast = window.setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1000)) :
        removeToast = window.setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1000)
    toast.classList.add("reveal"),
        toast.innerText = string
}

var rc = "";
function changeValue(obj, type, rv_id){
    var rv = "";
    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        if(lm=="rv") {
            rv = soundgramApi.leftmenudiv[i];
        }
    }

    var file_data;
    var form_data = new FormData();
    form_data.append("user_id", soundgramApi.user_id);
    form_data.append("albumid", soundgramApi.albumid);
    form_data.append("type", type);
    
    if(type=="video") {
        file_data = $("#rv_uploadImage").prop("files")[0];
        var contents = $("div#"+soundgramApi.videoPopup+" > div.review_write > input#contents").val();
        if(contents.length==0) {
            alert("댓글을 입력해주세요.");
            return;
        }
        else if(contents.length>200) {
            alert("제한된 글자 수를 초과했습니다.");
            return;
        }

        form_data.append("contents_id", rv_id);
        form_data.append("contents", contents);
    }
    else if(type=="review") {
        file_data = $("#rv_uploadImage").prop("files")[0];
        var contents = $("div#"+rv+" > div.review_write > input#contents").val();
        if(contents.length==0) {
            alert("댓글을 입력해주세요.");
            return;
        }
        else if(contents.length>200) {
            alert("제한된 글자 수를 초과했습니다.");
            return;
        }

        form_data.append("contents_id", rv_id);
        form_data.append("contents", contents);
    }
    else {
		console.log("profile change button clicked");
        file_data = $("#uploadImage").prop("files")[0];
        if(file_data=="" || file_data==null) {
            return false;
        }
    }

    if(file_data!="" || file_data!=null) {
        // return false;
        form_data.append("file", file_data);
    }
    
    $.ajax({
        url: "api/upload.php",
        data: form_data,
        dataType: "json",
        type: "POST",
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        cache: false,
        success: function(data) {
            // console.log(data);
            if(data.returnCode=="success") {
                if(type=="profile") {
                    alert("프로필 사진이 변경 되었습니다.");
                    changeComplete("profile", data.profile);
                }
                else if(type=="video") {
                    WriteButtonClear(soundgramApi.videoPopup);
                    if(typeof vvc_swiper!="undefined" || vvc_swiper!="") {
                        vvc_swiper.destroy(true, false);
                    }

                    var id = $("div.review_toolbar").attr("value");
                    var videoid = $("div.review_toolbar").attr("value2");

                    videoCommentListSetting(false, id, videoid, "comment_time");
                }
                else if(type=="review") {
                    var rv = "";
                    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
                        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
                        if(lm=="rv") {
                            rv = soundgramApi.leftmenudiv[i];
                        }
                    }

                    WriteButtonClear(rv);

                    // if(typeof rc_swiper!="undefined" || rc_swiper!="") {
                    //     rc_swiper.destroy(true, false);
                    // }
                    
                    if($("div#rclist > li").length>0) {
                        rc_swiper.destroy(true, false);
                        $("div#rclist li").each(function(idx) {
                            $(this).remove();
                        });
                    }                  

                    // var album_type = soundgramApi.diskid.substring(0,1);
                    // var id = $("div#"+rv).attr("value");

                    // var value = jQuery.param({"type":"review", "id":id, "albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "deivce_id":soundgramApi.device_id});
                    // $.ajax({
                    //     type : "POST",
                    //     url : "api/comment_info.php",
                    //     data : value,
                    //     dataType: "json",
                    //     success: function(data) {
                    //         $("div#rclist li").each(function(idx) {
                    //             $(this).remove();
                    //         });

                    //         console.log(data);
                            
                    //         reviewCommentSetting(data);
                    //     }, 
                    //     error: function(xhr, textStatus, errorThrown) {
                    //         console.log(errorThrown);
                    //     }
                    // });

                    goReviewComment();
                }
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function pullDownInput() {
	$('div.review_write').css("bottom", "0px");
}

function WriteButtonMake(rv_id , type) {
    if($("div.review_write").is(":visible")) {
        $("div.review_write").empty();
        $("div.review_write").remove();
    }

    var bottom = "0px";
    if($("div#mini_play_eq").is(":visible") && type=="review") {
        bottom = "60px";
    }
    else if(soundgramApi.imp==true && type=="review") {
        bottom = "65px";
    }

    var HTML = "";
    HTML
    = "<div class='review_write' style='bottom:"+bottom+"'>"
    // + "<button class='btn_photo' onClick='$(\"#rv_uploadImage\").click()'></button>"
    + "<input id='rv_uploadImage' name='rv_uploadImage' type='file' style='display:none'/>"
    + "<input id='contents' placeholder='댓글을 입력해 주세요.' style='width:72%' />"
    + "<button id='inputComment' class='btn_write' onClick='javascript:changeValue(this, \""+type+"\", \""+rv_id+"\");'></button>"
    + "</div>"
	if(soundgramApi.ostype == 2) {
		HTML =
		HTML + "<script> $('#contents').focus(() => { console.log('focus'); window.webkit.messageHandlers.test.postMessage('type_start'); }); \n"
		+ "$('#contents').blur(() => { console.log('blur'); window.webkit.messageHandlers.test.postMessage('type_end');  }); </script>";
	}
    return HTML;
}

function WriteButtonClear(divid) {
    if($("div#"+divid+" > div.review_write").is(":visible")) {
        $("div#"+divid+" > div.review_write").empty();
        $("div#"+divid+" > div.review_write").remove();
	
		if(soundgramApi.ostype == 2) {
			window.webkit.messageHandlers.test.postMessage("type_end");
		}
    }
}

function uuidCheck() {
    var value = jQuery.param({"uuid":soundgramApi.uuid, "user_id":soundgramApi.user_id, "albumid":soundgramApi.albumid});
    $.ajax({
        type : "POST",
        url : "api/uuidCheck.php",
        data : value,
        dataType: "json",
        success: function(data) {
            var returnCode = data.returnCode;
            if(returnCode=="notuser") {
                $.ajax({
                    type : "POST",
                    url : "api/logout.php",
                    data : value,
                    dataType: "json",
                    success: function(data) {
                        if(soundgramApi.loginoutflag!="0") {
                            member_close();

                            soundgramApi.nick = "로그인 / 회원가입";
                            soundgramApi.tel = "";
                            soundgramApi.user_id = "";
                            soundgramApi.account = "";
                            soundgramApi.loginoutflag = "0";
                            
                            var user = new Object();
                            user.nick = "";
                            user.tel = "";
                            user.account = "";
                            user.profile = "default/profile_none.png";
                            user.snstype = "";
                            user.regdate = "";
                            
                            profile_detail(user);
                            toast("다른기기에서 로그인이 되었습니다.\n로그인을 다시 시도해주세요.");
                        }
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function dropout() {
    var userid = soundgramApi.user_id;
    // var sns = $("div#"+soundgramApi.cuid+"_g").attr("val");
    // var value = jQuery.param({"userid":userid, "sns":sns, "albumid":soundgramApi.albumid});
    var sns = soundgramApi.snstype;
    console.log(sns);
    var value = jQuery.param({"userid":userid, "albumid":soundgramApi.albumid});
    $.ajax({
        type : "POST",
        url : "api/dropout.php",
        data : value,
        dataType: "json",
        success: function(data) {
            if(data.returnCode=="success") {
                // if(sns!="0") {
                //     // Soundgram.snsDropout("3");

                //     //카카오톡 탈퇴시
                //     if(sns==1) {
                //         // if (!Kakao.Auth.getAccessToken()) {
                //         //     console.log('Not logged in.');
                //         //     return;
                //         // }
                        
                //         // Kakao.Auth.logout(function() {
                //         //     console.log(Kakao.Auth.getAccessToken());

                //             Kakao.API.request({
                //                 url: '/v1/user/unlink',
                //                 success: function(response) {
                //                     console.log(response);
                //                 },
                //                 fail: function(error) {
                //                     console.log(error);
                //                 },
                //             });
                //         // });
                //     }
                //     // 네이버 탈퇴시
                //     else if(sns==2) {
                //         $.ajax({
                //             type : "GET",
                //             url : "oauth/naverDropout.php?naver_state="+soundgramApi.naver_state,
                //             success: function(data) {
                //                 console.log(data)
                //             }
                //             , error: function(xhr, textStatus, errorThrown) {
                //                 console.log(errorThrown);
                //             }
                //         });
                //     }
                // } 

                member_close();

                soundgramApi.nick = "로그인 / 회원가입";
                soundgramApi.tel = "";
                soundgramApi.user_id = "";
                soundgramApi.account = "";
                soundgramApi.loginoutflag = "0";
                soundgramApi.nfckeyid = data.nfckeyid;
                
                var user = new Object();
                user.nick = "";
                user.tel = "";
                user.account = "";
                user.profile = "default/profile_none.png";
                user.snstype = sns;
                user.regdate = "";
                
                profile_detail(user);
                toast("탈퇴가 완료되었습니다.");

                addDeviceInfo();
            }
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function addDeviceInfo() {
    if(soundgramApi.album_type=="s") {
        $("div.video_popup_area").append("<div id='player'></div>");
    }

    var value = jQuery.param({"ostype":soundgramApi.ostype
                            , "app_ver":soundgramApi.app_ver
                            , "uuid":soundgramApi.uuid
                            , "albumid":soundgramApi.albumid
                            , "nfckeyid": soundgramApi.nfckeyid
                            , "token": soundgramApi.token
                });
    $.ajax({
        type: "POST"
        , url : "api/add_device_info.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
            soundgramApi.device_id = data.device_id;

            // $.ajax({
            //     type : "POST",
            //     url : "api/booklet_info.php",
            //     data : value,
            //     dataType: "json",
            //     success: function(data) {
            //         $.each(data, function(al) {
            //             $("div#imgch").append("<img src='media/booklet/"+soundgramApi.albumid+"/"+data[al].photo+"'/>");
            //         });
            //     }, 
            //     error: function(xhr, textStatus, errorThrown) {
            //         console.log(errorThrown);
            //     }
            // });
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function goReview() {
    if($("div#rclist > li").length>0) {
        rc_swiper.destroy(true,false);
        $("div#rclist").empty();
    }

    var value = jQuery.param({"albumid":soundgramApi.albumid, "user_id":soundgramApi.user_id, "device_id":soundgramApi.device_id});
    $.ajax({
        type : "POST",
        url : "api/review.php",
        data : value,
        dataType: "json",
        success: function(data) {
            $("div.review").empty();
            $("div#_review").empty();

            reviewSetting(data);
            
            reviewClose();
            reviewTitleScrollEffect(0, "51%", "66px", "remove");
            // leftmenuswipe_onoff("show");
            // leftmenuSwiperSetting($("ul.menu_sub > li[class*=over_s]").index());
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function goReviewComment() {
    var rv = "";
    for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        if(lm=="rv") {
            rv = soundgramApi.leftmenudiv[i];
        }
    }

    if($("div#rclist > li").length>0) {
        rc_swiper.destroy(true,false);
        $("div#rclist li").each(function(idx) {
            if(idx>0) {
                $(this).remove();
            }
        });
    }

    var imgSrc = $("img.review_info_btn").attr("src");
    var replyCount = $("dd#reviewReplayCount").attr("value");
    // if($("div#rclist > li").length==0) {
        var album_type = soundgramApi.diskid.substring(0,1);
        var id = $("div#"+rv).attr("value");
        
        // console.log(id);
        // console.log(soundgramApi.albumid);
        // console.log(soundgramApi.user_id);
        // console.log(soundgramApi.device_id);
        var value = jQuery.param({"type":"review", "id":id, "albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});
        $.ajax({
            type : "POST",
            url : "api/comment_info.php",
            data : value,
            dataType: "json",
            success: function(data) {
                if($("div#rclist > li").length>0) {
                    $("div#rclist li").each(function(idx) {
                        $(this).remove();
                    });
                }

                if(data.length>0) {
                    $("div#"+rv).attr("value",data[0].id);
                    $("button#rvInputComment").attr("onclick","javascript:changeValue(this, 'review', '"+data[0].id+"');");

                    reviewTitleScrollEffect(0, "51%", "66px", "remove");
                    // leftmenuswipe_onoff("show");
                    // leftmenuSwiperSetting($("ul.menu_sub > li[class*=over_s]").index());
                    
                    if(data.length>1) {
                        reviewCommentSetting(data);
                    }
                    else {
                        $("div#rclist").append(empty_re());
                        reviewCommentOrderSetting("0", "0", "true");
                    }
                }
                
                $("img.review_info_btn").attr("src",imgSrc.replace("reduce","more"));
    
                $("div#"+rv+" > div.review_content3").removeClass("hidden");
                var tb = window.setTimeout(function() {
                    window.clearTimeout(tb);
                    $("div#"+rv+" > div.review_content3").css({"transition":"all .3s ease-in", "bottom":"100%"});

                    var tfo = window.setTimeout(function() {
                        window.clearTimeout(tfo);

                        $("div#"+rv+" > div.review_content3").css({"transition":""});
                        $("div#"+rv+" > div.review_content3").addClass("hidden");
                    }, 300);
                }, 100);  
            }, 
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    // }
    // else {
    //     $("img.review_info_btn").attr("src",imgSrc.replace("reduce","more"));
    
    //     $("div#"+rv+" > div.review_content3").removeClass("hidden");
    //     var tb = window.setTimeout(function() {
    //         window.clearTimeout(tb);
    //         $("div#"+rv+" > div.review_content3").css({"transition":"all .3s ease-in", "bottom":"100%"});

    //         var tfo = window.setTimeout(function() {
    //             window.clearTimeout(tfo);

    //             $("div#"+rv+" > div.review_content3").css({"transition":""});
    //             $("div#"+rv+" > div.review_content3").addClass("hidden");
    //         }, 300);
    //     }, 100);  
    // }
}

function reSwiper() {
    if(soundgramApi.activeIndex>0) {
        horizontal_swiper_st(soundgramApi.activeIndex);
    }

    if($("div.leftmenu_horizontal_swiper").is(":visible")) {
        if(soundgramApi.lmactiveIndex==2){
            if(rc_swiper!=null) {
                rc_swiper.destroy(true,false);
                $("div#rclist").empty();
            }

            if($("div.review_info_btnbox").is(":visible")) {
                goReview();
            }
            else {
                goReviewComment();
            }
        }
    }

    if($("div.container > div[id*=vd]").is(":visible")) {
        vvc_swiper.destroy(true,false);

        var id = $("div.review_toolbar").attr("value");
        var videoid = $("div.review_toolbar").attr("value2");
        videoCommentListSetting(false, id, videoid, "comment_time");
    }
}

function resize(obj) {
    obj.style.height="1px";
    obj.style.height=(12+obj.scrollHeight)+"px";
}

function zeroPad(num) {
    return num < 10 ? "0" + num : num;
}

function formatTime(time) {
    return zeroPad(~~(time/60))+':'+zeroPad(~~(time % 60));
}

function showConfirm (type, title, content) {
    confirm.show({
        title: title,
        content: content,
        btns: [{
            callback: function(instance){
                // instance.close = false;
                if(type=="login") {
                    goLoginPage();
                }
                else if(type=="dropout") {
                    dropout();
                }
                else if(type=="close") {
                    Soundgram._close();
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

function nfcCheck() {
    if(soundgramApi.ostype=="0") return false;

    value = jQuery.param({"device_id":soundgramApi.device_id, "albumid":soundgramApi.albumid});
    $.ajax({
        type: "POST"
        , url : "api/album_info.php"
        , data: value
        , dataType: "json"
        , success: function(data) {
			// console.log(data);
            var gotoAlbum = false;
            if(data.returnCode=="nfc") {
                if(data.nfckey_id=="0") {
                    $("div.container_popup").children("div").addClass("hidden");
                    $("div.container_popup").addClass("hidden");
                    $("div.container").children("div").addClass("hidden");

                    $("div#nc01_c").removeClass("hidden");
                }
            }
        }
        , error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

/**
 * 바이트수 반환  
 * 
 * @param el : tag jquery object
 * @returns {Number}
 */
function byteCheck(el){
    var codeByte = 0;
    for (var idx = 0; idx < el.length; idx++) {
        var oneChar = escape(el.charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}

function empty_re() {
    $("div.empty_rv").remove();

    var HTML = "";
    HTML 
    = "<div class='empty_rv' style='padding:15% 0'>"
    + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/empty_review.png' alt='No schedule' >"
    + "<p style='color:#454545'>첫 댓글을 등록해주세요.</p>"
    + "</div>"

    return HTML;
}

// 리뷰 페이지 타이틀 높이 구하기
function getReviewTitleHeight() {
    var maxHeight = Math.max.apply(null, $("div.container").map(function (){ return $(this).height(); }).get());
    var titleheight = 240;
    if(maxHeight>=812 && maxHeight<=845) {
        titleheight = 260;
    }

    return titleheight;
}

function gotoMainPageSlide(idx) {
    var album_type = soundgramApi.diskid.substring(0,1);

    //메인페이지 전체 효과제거
    for(var i=0; i<soundgramApi.albumdiv.length;i++) {
        ptEffectDel(soundgramApi.albumdiv[i]);
    }

    if(horizontal_swiper!="") {
        horizontal_swiper.destroy(true,false);
    }

    // horizontal_swiper.slideTo(idx, 500, false);
    swiperSetting(idx);
    
    if(album_type=="p") {
        if(leftmenuSwiper!="") leftmenuSwiper.destroy(true,false);

        $("ul.menu_main > a").each(function(i) {
            $("ul.menu_main > a").eq(i).children("li").attr("class","");
        });
        $("ul.menu_main > a").eq(idx).children("li").attr("class","over");
        $("ul.menu_sub > li").each(function() {
            $(this).attr("class", $(this).attr("class").replace("_over",""));
        });
        $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

        // ptEffectDel(idx+1);
    }
}

// iOS 전용 트랙리스트 리프레쉬(네이티브 로그인 포함)
function tracklistRefresh(device_id, albumid, ilogin) {
    // 네이티브 플레이어에서 로그인을 하게되었을 경우에만 수행
    if(ilogin=="true") {
        var value = jQuery.param({"device_id": device_id, "albumid": albumid});
        $.ajax({
            type : "POST",
            url : "api/ilogin.php",
            data : value,
            dataType: "json",
            success: function(data) {
                var returnCode = data.returnCode;
                if(returnCode=="login_complete") {
                    soundgramApi.nick = data.nick;
                    soundgramApi.tel = data.tel;
                    soundgramApi.user_id = data.user_id;
                    soundgramApi.device_id = data.device_id;
                    soundgramApi.account = data.account;
                    soundgramApi.username = data.name;
                    soundgramApi.regdate = data.regdate;
                    soundgramApi.loginoutflag = "1";

                    var lc = window.setTimeout(function() {
                        window.clearTimeout(lc);
                        profile_detail(data);
                        
                        var rf = window.setTimeout(function() {
                            window.clearTimeout(rf);
                            horizontal_swiper_st(horizontal_swiper.activeIndex);
                        },200);        
                    },500);
                }
                
            }, 
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }
    else if(horizontal_swiper.activeIndex==1) {
        horizontal_swiper_st(horizontal_swiper.activeIndex);
    }
}

function gotoSch() {
    if(leftmenuSwiper!="") leftmenuSwiper.destroy(true,false);

    $("ul.menu_main > a").each(function(i) {
        $("ul.menu_main > a").eq(i).children("li").attr("class","");
    });

    $("ul.menu_sub > li").each(function() {
        $(this).attr("class", $(this).attr("class").replace("_over",""));
    });
    
    $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

    $(this).attr("class", $(this).attr("class").replace($(this).attr("class"),$(this).attr("class")+"_over"));
    $(this).addClass("over_s");
    var meidx = $(this).index();
    var value = jQuery.param({"albumid":soundgramApi.albumid});   

    if($("div#schedulelist > li").length>0) {
        if($("div#schedulelist > li").eq(0).children("div").attr("class")=="empty") ;
        else {
            schedule_swiper.destroy(true,false);
            $("div#schedulelist").empty();
        }
    }

    $.ajax({
        type : "POST",
        url : "api/schedule.php",
        data : value,
        dataType: "json",
        success: function(data) {
            scheduleSetting(data);
            leftmenuswipe_onoff("show");
            leftmenuSwiperSetting(meidx);
            var _np = window.setTimeout(function() {
                window.clearTimeout(_np);
                schedule_vertical();
            },1000);
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function gotoSch() {
    if(leftmenuSwiper!="") leftmenuSwiper.destroy(true,false);

    $("ul.menu_main > a").each(function(i) {
        $("ul.menu_main > a").eq(i).children("li").attr("class","");
    });

    $("ul.menu_sub > li").each(function() {
        $(this).attr("class", $(this).attr("class").replace("_over",""));
    });
    
    $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

    $(this).attr("class", $(this).attr("class").replace($(this).attr("class"),$(this).attr("class")+"_over"));
    $(this).addClass("over_s");
    var meidx = $(this).index();
    var value = jQuery.param({"albumid":soundgramApi.albumid});   

    if($("div#schedulelist > li").length>0) {
        if($("div#schedulelist > li").eq(0).children("div").attr("class")=="empty") ;
        else {
            schedule_swiper.destroy(true,false);
            $("div#schedulelist").empty();
        }
    }

    $.ajax({
        type : "POST",
        url : "api/schedule.php",
        data : value,
        dataType: "json",
        success: function(data) {
            scheduleSetting(data);
            leftmenuswipe_onoff("show");
            leftmenuSwiperSetting(meidx);
            var _np = window.setTimeout(function() {
                window.clearTimeout(_np);
                schedule_vertical();
            },1000);
        }, 
        error: function(xhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

// 푸시 선택시 페이지 이동..
function pushMoving(page) {
    console.log(page);
	// 스케줄의 경우..
    if(page=="Sch") {
        if(soundgramApi.leftmenudiv[0].substring(0,2)=="sc") {
            $("ul.menu_sub > li:first").click();
        }
        else {
            var idx =0;
            if(soundgramApi.albumdiv[0].substring(0,2)=="aa") {
                cnt = 1;
            }

            gotoMainPageSlide(idx);
        }
    }
    else {
        leftmenuswipe_onoff("hide");

        var idx = 0;
        for(var i=0; i<soundgramApi.albumdiv.length; i++) {
            if(soundgramApi.albumdiv[i].substring(0,2)==page) {
                idx = i; 
            }
        }

        gotoMainPageSlide(idx);
    }
}

// 아이폰이 미니플레이어가 올라왔을때 호출
function i_Miniplayer(np) {
    soundgramApi.imp = np;
}

function big_comment(comment_id, user_id) {
    var _f = "댓글 답글 쓰기";
    var _s = "신고";
    var _t = "취소";

    if(user_id==soundgramApi.user_id) {
        _f = "수정";
        _s = "삭제";
    }

    $("div#addtionmenu").attr("value",comment_id);
    $("ul.amenu-content > li:nth-child(1) > button").text(_f);
    $("ul.amenu-content > li:nth-child(2) > button").text(_s);
    $("ul.amenu-content > li:nth-child(3) > button").text(_t);
    $("div#addtionmenu").show();
}

function playMusic() {
    $("button.pl_play").click();
}

function pauseMusic() {
    $("button.pl_pause").click();
}

function nextMusic() {
    clickNextPlay("button");
}

function prevMusic() {
    clickPrevPlay("button");
}

