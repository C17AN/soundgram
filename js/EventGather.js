var slider = "";
function EventGather() {
    // 통합앱의 경우 체크하지 않음. 21.09.08
    if(!soundgramApi.tot) {
        uuidCheck();
        nfcCheck();
    }

    // 왼쪽 날개 메뉴 열기
    $("div.menu").click(function(e) {
        open_leftmenu();
    });

    // 왼쪽 날개 메뉴 접기
    $("span#closeleftmenu").click(function(e) {
        close_leftmenu();
    });

	// 210402 문상혁 추가 - ios 키보드 팝업시 미니플레이어 제거
	$('input#contents').focus(function() {
		console.log("input focused!!!!");
		if(soundgramApi.ostype == 2) {
			window.webkit.messageHandler.test.postMessage('type_start');
		}
	});

	$('input#contents').blur(function() {
		console.log("input blurred!!!");
		if(soundgramApi.ostype == 2) {
			window.webkit.messageHandler.test.postMessage('type_end');
		}
	});

    $("header[id*=me]").click(function(e) {
        e.stopPropagation();

        // Soundgram.mem_page(6);

        if($("nav").is(":visible")) {
            if(!$(e.target).hasClass("navClass")) { 
                close_leftmenu();       
            }
        }
    });

    $("ul.menu_main > a, ul.menu_main > a > li, ul.tb_menu > a").click(function(e) {
        e.stopPropagation();
        
        var idx = parseInt($(this).attr("id"));
        var album_type = soundgramApi.diskid.substring(0,1);
        if(album_type=="p") {
            leftmenuswipe_onoff("hide");
            close_leftmenu();
        }
        
        if(typeof horizontal_swiper=="undefined" || horizontal_swiper==null) {
            swiperSetting(idx);
        }
        else {
            // horizontal_swiper.slideTo(idx, 500, false);
            // // horizontal_swiper_st(idx);
            
            // if(album_type=="p") {
            //     if(leftmenuSwiper!="") leftmenuSwiper.destroy(true,false);

            //     $("ul.menu_main > a").each(function(i) {
            //         $("ul.menu_main > a").eq(i).children("li").attr("class","");
            //     });
            //     $("ul.menu_main > a").eq(idx).children("li").attr("class","over");
            //     $("ul.menu_sub > li").each(function() {
            //         $(this).attr("class", $(this).attr("class").replace("_over",""));
            //     });
            //     $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

            //     ptEffectDel(idx+1);
            // }

            gotoMainPageSlide(idx);
        }
    });

    $("div#mini_play_eq").click(function(e) {
        if(e.target.nodeName=="BUTTON") return false;

        $("div.horizontal_swiper").addClass("hidden");
        $("div#openleftmenu").hide();
        $("div#swipe > div").addClass("hidden");
        $("div#mini_play_eq").addClass("hidden");
        $("div#"+soundgramApi.premiumPlayer).removeClass("hidden");
        $("span#play_close").show();
        $("div#"+soundgramApi.premiumPlayer).css({top:"200px"});
        $("div#"+soundgramApi.premiumPlayer).animate({
            top:"0",
            opacity:"1"
        },500, function() {
            // $("div.play_eq1").removeClass("hidden");
            // $("div.play_eq2").removeClass("hidden");

            $("div.play_eq_ing").removeClass("hidden");

            var player = document.getElementById("playMusic");
            if(!player.paused) playeqStopAndRunning("running");
        });

        $(".ui-slider-handle").removeClass("hidden");
        $(".ui-slider-handle").css({"top":"-.4em"});
        $(".playbar").slider("enable");
    });

    $("span#play_close").click(function() {
        // $("div#play").addClass("hidden");
        // $("div#play").css({"top":"200px"});

        playeqStopAndRunning("paused");

        var imgUrl = $("div#p_swipe > div[class*=-active]").css("background-image");
        $("div.m_pl_album").css({"background-image":imgUrl});
        $("div#playerImage").css({"background-image":imgUrl});
        $("div#playerImage").css({"display":"block"});

        // $("div.play_eq1").addClass("hidden");
        // $("div.play_eq2").addClass("hidden");

        $("div.play_eq_ing").addClass("hidden");
        
        $("div.container").removeClass("hidden");
        $("div.horizontal_swiper").removeClass("hidden");
        tracklistRefresh();
        $("span#play_close").hide();
        $("div#openleftmenu").show();

        $("div#swipe > div").removeClass("hidden");
        // $("div#mini_play_eq").css({"height":"0px"});
        // $("div#mini_play_eq").removeClass("hidden");
        $(".playbar").slider("disable");

        // $("div#p_swipe > div.swiper-slide-active").css({
        //     "animation": "ScaleChangeSmall 0.4s",
        //     "animation-fill-mode": "both",
        //     "-webkit-animation": "ScaleChangeSmall 0.4s",
        //     "-webkit-animation-fill-mode": "both",
        //     "-webkit-animation-delay": "0.2s",
        //     "-webkit-animation-duration": "0.6s"
        // });

        // $("div.m_pl_album").css({
        //     "animation-name": "ScaleChangeSmall",
        //     "animation-duration": "1s",
        //     "animation-fill-mode": "both",
        //     "-webkit-animation-name": "ScaleChangeSmall",
        //     "-webkit-animation-duration": "1s",
        //     "-webkit-animation-fill-mode": "both"
        // });

        $("div#playerImage").css({
            "animation-name": "ScaleChangeSmall_2",
            "animation-duration": "1s",
            "animation-fill-mode": "both",
            "-webkit-animation-name": "ScaleChangeSmall_2",
            "-webkit-animation-duration": "1s",
            "-webkit-animation-fill-mode": "both"
        });
        
        var mpa = window.setTimeout(function() {
            window.clearTimeout(mpa);
            $("div#mini_play_eq").css({"height":"60px"});
            $("div#mini_play_eq").removeClass("hidden");
            // $("div.m_pl_album").css({"animation":""});
            $("div#playerImage").css({"animation":""});
            $("div#playerImage").css({"display":"none"});
            $("div#mini_play_eq").css({
                "animation": "bottomFadeIn 0.6s",
                "animation-fill-mode": "both",
                "-webkit-animation": "bottomFadeIn 0.6s",
                "-webkit-animation-fill-mode": "both",
                // "-webkit-animation-delay": "0.6s",
                "-webkit-animation-duration": "0.6s"
            });
        }, 750);    

        // var player_ss = window.setTimeout(function() {
        //     window.clearTimeout(player_ss);
            $("div#"+soundgramApi.premiumPlayer).addClass("hidden");
        // }, 100);

        // $("#play").animate({
        //     top:"200",
        //     opacity:"1"
        // },1000, function() {
        //     $("#play").addClass("hidden");
        // });
        
        $(".ui-slider-handle").addClass("hidden");
        $(".ui-slider-handle").css({"top":"-.3em"});

        // 2초후에 애니메이션 효과 제거
        var fla = window.setTimeout(function() {
            window.clearTimeout(fla);
            $("div#mini_play_eq").css({"animation":""});
            $("div.m_pl_album").css({"animation":""});
            $("div#playerImage").css({"animation":""});
            $("div#playerImage").css({"display":"none"});
            $("div#p_swipe div").each(function() {
                $(this).css({"animation":""});
            });
        }, 2000);
    });

    // $("span#albuminfo").click(function() {
    //     $("div.horizontal_swiper").addClass("hidden");
    //     $("div#album_introd").removeClass("hidden");
    //     // ali_vertical();
    // });

    $("button.pl_lyc").click(function() {
        var sUrl = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid;
        $("div.lyr_toolbar > img").attr("src",sUrl+"/images/"+soundgramApi.infomation+"_btn_close.png");
        $("span#play_close").hide();
        $("div.lyr_toolbar").removeClass("hidden");
        var val = $("audio#playMusic").val();
        var playNumber = val.split("|")[0];

        $("div#ly01").removeClass("hidden");
        $("div.lyr_content").eq(playNumber-1).removeClass("hidden");
        // $("div#ly01").css({
        //     "animation": "leftFadeIn 0.5s",
        //     "animation-fill-mode": "both",
        //     "-webkit-animation": "leftFadeIn 0.5s",
        //     "-webkit-animation-fill-mode": "both",
        //     "-webkit-animation-delay": "0.5s",
        //     "-webkit-animation-duration": "0.7s"
        // });

        // // 1초후에 애니메이션 효과 제거
        // var fla = window.setTimeout(function() {
        //     window.clearTimeout(fla);
        //     $("div#ly01").css({"animation":""});
        // }, 1000);
    });

    $("div.ali_toolbar > img").click(function() {
        $("div#openleftmenu").show();
        $("div.container").removeClass("hidden");
        $("div.horizontal_swiper").removeClass("hidden");
        $("div#swipe > div").removeClass("hidden");
        $("div#album_introd").css({
            "animation": "topFadeIn 0.5s",
            "animation-fill-mode": "both",
            "-webkit-animation": "topFadeIn 0.5s",
            "-webkit-animation-fill-mode": "both",
            "-webkit-animation-delay": "0.5s",
            "-webkit-animation-duration": "0.7s"
        });
        $("div#album_introd").addClass("hidden");

        // 1초후에 애니메이션 효과 제거
        var fla = window.setTimeout(function() {
            window.clearTimeout(fla);
            $("div#album_introd").css({"animation":""});
        }, 1000);
    });

    $("div.lyr_toolbar > img").click(function() {
        $("span#play_close").show();
        $("div#ly01").children("div").addClass("hidden");
        $("div#ly01").css({
            "animation": "rightFadeIn 0.5s",
            "animation-fill-mode": "both",
            "-webkit-animation": "rightFadeIn 0.5s",
            "-webkit-animation-fill-mode": "both",
            "-webkit-animation-delay": "0.5s",
            "-webkit-animation-duration": "0.7s"
        });
        $("div#ly01").addClass("hidden"); 
    });

    $("dd#songlike_play").click(function() {
        $("dd#songlike_play > div").each(function(idx) {
            if($("dd#songlike_play > div").eq(idx).is(":visible")==true) {
                if(soundgramApi.loginoutflag=="1") {
                    change_like("player", idx);
                }
                else {
                    showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
                }
            }
        });
    });

    $("div.bok_toolbar > img").click(function() {
        bd_swiper.zoom.out();
        bd_swiper.destroy(true, false);
        $("div#boklet_popup").hide();

        // $("div.boklet_inner_popup").css({"animation":""});
        // effect_fadeout("div.boklet_inner_popup");
        // var booklet_detail_close = window.setTimeout(function() {
        //     window.clearTimeout(booklet_detail_close);
        //     $("div#boklet_popup").hide();
        // }, 700);
    });

    $("div.vid_toolbar > img").click(function() {
        console.log("VIDEO CLOSE!!!!!");
        if(videoPlay!="") window.clearTimeout(videoPlay);

        $("div#video_popup").hide();
        player.stopVideo();

        if(soundgramApi.ostype==2) {
            window.webkit.messageHandlers.SoundgramVideo.postMessage("videoEnd");
        }
        else {
            // var musicPlayer = document.getElementById("playMusic");
            // if(pausebtn_click) {
            //     if(musicPlayer.currentTime>0) {
            //         // $("button#plpa_btn").attr("class","pl_pause");
            //         // $("button.m_pl_playbtn").attr("class","m_pl_pausebtn");
            //         var musicReplay = window.setTimeout(function() {
            //             window.clearTimeout(musicReplay)
            //             // musicPlayer.play();
                        
            //             $("button.m_pl_playbtn").click();
            //         }, 1000);
            //     }
            // }
        }

        // $("div.video_inner_popup").css({"animation":""});
        // effect_fadeout("div.video_inner_popup");
        // var video_detail_close = window.setTimeout(function() {
        //     window.clearTimeout(video_detail_close);
        //     $("div#video_popup").hide();
        // }, 700);
    });

    $("div.rv_toolbar > img").click(function() {
        $("div.rv_inner_popup").css({"animation":""});
        // effect_fadeout("div.rv_inner_popup");
        // var booklet_detail_close = window.setTimeout(function() {
        //     window.clearTimeout(booklet_detail_close);
            imgd_swiper.destroy(true,false);
            $("div#rv_popup").hide();
        // }, 700);
    });

    $("div.video_title").children().click(function(e) {
        if(e.target.nodeName=="SPAN") {
            // change_videolike($("div#"+soundgramApi.videoPopup).val());
            if(soundgramApi.loginoutflag=="1") {
                change_videolike($("div#"+soundgramApi.videoPopup).val());
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
    });

    $("span#newest, span#recomm").click(function(e) {
        var album_type = soundgramApi.diskid.substring(0,1);
        var rv = "";
        for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
            var lm = soundgramApi.leftmenudiv[i].substring(0,2);
            if(lm=="rv") {
                rv = soundgramApi.leftmenudiv[i];
            }
        }

        // if($("div.review_write").is(":visible")) {
        //     if(!$(e.target).hasClass("review_write")) { 
        //         WriteButtonClear(rv);       
        //     }
        // }

        rc_swiper.destroy(true, false);

        $("div#rclist").empty();
        $("div#rclist li").each(function(idx) {
            $(this).remove();
        });

        var album_type = soundgramApi.diskid.substring(0,1);
        var id = $("div#"+rv).attr("value");
        var value = jQuery.param({"type":"review", "id":id, "albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});
        $.ajax({
            type : "POST",
            url : "api/comment_info.php",
            data : value,
            dataType: "json",
            timeout       : 3000,
            retries       : 5,     //       <-------- Optional
            retryInterval : 3000,   //       <-------- Optional
            success: function(data) {
                reviewcommentdata = data;
                reviewcommentdata.splice(0,1);

                $("#r_toolbar").children("span").removeClass("toolbar_select");
                if($(e.target).attr("id")=="recomm") {
                    $("#r_toolbar > span#recomm").addClass("toolbar_select");

                    reviewcommentdata.sort(function(a,b) {
                        return parseInt(a.likeCount) < parseInt(b.likeCount) ? 1 : -1;
                    });
                }
                else {
                    $("#r_toolbar > span#newest").addClass("toolbar_select");

                    reviewcommentdata.sort(function(a,b) {
                        return a.org_comment_time < b.org_comment_time ? 1 : -1;
                    });
                }

                $.each(reviewcommentdata, function(al) {
                    var makeListHTML = makeHTML(album_type, "reviewcomment", reviewcommentdata[al], "");
                    $("div#rclist").append(makeListHTML);
                });
                
                rclistInterval = window.setInterval(function() {
                    if(reviewcommentdata.length == $("div#rclist > li").length) {
                        window.clearInterval(rclistInterval);
                        reviewCommentOrderChange(0);
                    }
                }, 100);      
            }, 
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });

    // 비디오 팝업 닫기
    $("div.vc_toolbar > img").click(function() {
        // console.log("video close!!!!!!!");
        // if(videoPlay!="") window.clearTimeout(videoPlay);
        // player.stopVideo();
        $("div.video_area").empty();

        if($("div#"+soundgramApi.videoPopup+" > div.review_write").is(":visible")) {
            $("div#"+soundgramApi.videoPopup+" > div.review_write").empty();
            $("div#"+soundgramApi.videoPopup+" > div.review_write").remove();
        }

        $("div#"+soundgramApi.videoPopup).addClass("hidden");
        // $("div.container").removeClass("hidden");
        // $("div.horizontal_swiper").removeClass("hidden");

        if(soundgramApi.ostype==2) {
            window.webkit.messageHandlers.SoundgramVideo.postMessage("videoEnd");
        }
        else {
            // var musicPlayer = document.getElementById("playMusic");
            // if(pausebtn_click) {
            //     if(musicPlayer.currentTime>0) {
            //         // $("button#plpa_btn").attr("class","pl_pause");
            //         // $("button.m_pl_playbtn").attr("class","m_pl_pausebtn");
            //         var musicReplay = window.setTimeout(function() {
            //             window.clearTimeout(musicReplay);
            //             // musicPlayer.play();

            //             // console.log("!!!");
            //             $("button.m_pl_playbtn").click();
            //         }, 1000);
            //     }
            // }
        }
        
        if(soundgramApi.diskid.substring(0,1)=="p") {
            if($("div#vclist > li").length>0) {
                vvc_swiper.destroy(true, false);
                vvc_swiper="";
                $("div#vclist").empty();
            }

            var album_type = soundgramApi.diskid.substring(0,1); // p:프리미엄, s:스탠다드
            var value = jQuery.param({"albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});

            if($("div#video_list > li").length>0) {
                vlist_swiper.destroy(true, false);
                vlist_swiper="";
                $("div#video_list").empty();
            }
            
            $.ajax({
                type : "POST",
                url : "api/video_info.php",
                data : value,
                dataType: "json",
                timeout       : 3000,
                retries       : 5,     //       <-------- Optional
                retryInterval : 3000,   //       <-------- Optional
                success: function(data) {
                    $.each(data, function(al) {
                        // var makeListHTML = makeHTML(album_type, "videolist", data[al], soundgramApi.artistname);
                        // $("div#video_list").append(makeListHTML);
                        
                        $("div#video_list").append(getHTMLListData("vi"));
                    });

                    var complete = window.setInterval(function() {
                        if(data.length==$("div#video_list > li").length) {
                            window.clearInterval(complete);

                            for(var al=0; al<$("div#video_list > li").length;al++) {
                                var id = data[al].id;
                                var title = data[al].videoName;
                                var videoid = data[al].video.substring(data[al].video.lastIndexOf("=")+1, data[al].video.length);
                                var viewcnt = data[al].viewcnt;
                                var likecnt = data[al].likecnt;
                                var replycnt = data[al].replycnt;

                                var likeonoff = "off";
                                if(data[al].likeonoff>0) likeonoff = "on";

                                $("div#video_list > li").eq(al).attr("value",id).attr("value2",videoid).attr("value3",likecnt);
                                $("div#video_list > li").eq(al).find(".videolist").attr("value",id).attr("value2",videoid).attr("value3",replycnt);
                                $("div#video_list > li").eq(al).find("#vlist2").attr("value",id).attr("value2",videoid).attr("value3",replycnt).css({"background-image":"url('https://img.youtube.com/vi/"+videoid+"/mqdefault.jpg')"});
                                $("div#video_list > li").eq(al).find("#vlist3").attr("value",id).attr("value2",videoid).attr("value3",replycnt);
                                $("div#video_list > li").eq(al).find("#vlist1").attr("value",id).attr("value2",videoid).attr("value3",replycnt).html("<span></span>"+title);
                                $("div#video_list > li").eq(al).find(".no_view").attr("value",viewcnt).html("조회수 "+likecnt_change(viewcnt));
                                $("div#video_list > li").eq(al).find("#videoLikeCnt_a").attr("value",id);
                                $("div#video_list > li").eq(al).find("#videoLikeCnt").attr("value",id).html("<span id='videoLikeCnt_span' value='"+id+"' class='"+likeonoff+"'></span>"+likecnt_change(likecnt));
                                $("div#video_list > li").eq(al).find("#videoReplyCount").attr("value",replycnt).html("<span></span>"+likecnt_change(replycnt));
                            }

                            //21.08.10 마지막 업데이트 날짜 추가
                            $("span.st_day").text(data[0].mtime);
                            $("div.container").removeClass("hidden");
                            $("div.horizontal_swiper").removeClass("hidden");
                            $("div.video").removeClass("hidden");
                            if(typeof vlist_swiper=="undefined" || vlist_swiper=="") {
                                vertical_video();
                            }
                            else {
                                vlist_swiper.slideTo(0,0,false);
                            }
                        
                            list_effect("video");
                        }
                    }, 100);
                }, 
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    });

    $("span.toolbar_write").click(function() {
        if(!soundgramApi.tot) {
            uuidCheck();
            nfcCheck();
        }

        var rv = "";
        for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
            var lm = soundgramApi.leftmenudiv[i].substring(0,2);
            if(lm=="rv") {
                rv = soundgramApi.leftmenudiv[i];
            }
        }

        if(soundgramApi.loginoutflag=="0") {
            // if(confirm("로그인이 필요한 서비스입니다.\n로그인을 하시겠습니까?")==true) {
            //     goLoginPage();
            // }
            // else {
            //     return;
            // }

            showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
        }
        else {
            var id = $("div#"+rv).attr("value");
            $("div#"+rv).append(WriteButtonMake(id, "review"));

            var _wb = window.setInterval(function (){
                if($("div.review_write").is(":visible")) {
                    window.clearInterval(_wb);

                    $("div.review_write").find("#contents").click();
                    $("div.review_write").find("#contents").focus().select();
                }
            },100);
        }
    });

    $("ul.menu_player").click(function () { // 21.02.25 마커 플레이 테스트를 위해 추가해둠
        if($("ul.menu_player > a > li").is(":hidden")) {
            return false;
        }
        
        if (soundgramApi.ostype == 1) {

        } else if (soundgramApi.ostype == 2) {
            window.webkit.messageHandlers.Soundgram.postMessage("MarkerPlayer");
            console.log("click marker player");
        }
    })

    $("ul.menu_sub > li").click(function() {
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

        if($(this).attr("id")=="me_sc") {
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
                timeout       : 3000,
                retries       : 5,     //       <-------- Optional
                retryInterval : 3000,   //       <-------- Optional
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
        else if($(this).attr("id")=="me_sn") {
            if($("div#snslist > li").length==0) {
                var value = jQuery.param({"albumid":soundgramApi.albumid});
                $.ajax({
                    type : "POST",
                    url : "api/sns.php",
                    data : value,
                    dataType: "json",
                    timeout       : 3000,
                    retries       : 5,     //       <-------- Optional
                    retryInterval : 3000,   //       <-------- Optional
                    success: function(data) {
                        snsSetting(data);
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }

            leftmenuswipe_onoff("show");
            leftmenuSwiperSetting(meidx);
            if(typeof sns_swiper=="undefined" || sns_swiper==null) {
                // sns_swiper_setting();
                snsSwiperSetting();
            }
        }
        else if($(this).attr("id")=="me_rv") {
            leftmenuswipe_onoff("show");
            leftmenuSwiperSetting(meidx);
            
            if($("div.review_info_btnbox").is(":visible")) {
                goReview();
            }
            else {
                goReviewComment();
            }
        }
    });

    // $("li.sub_01").click(function() {
    //     soundgramApi.lmactiveIndex=0;

    //     $("ul.menu_main > a").each(function(i) {
    //         $("ul.menu_main > a").eq(i).children("li").attr("class","");
    //     });

    //     $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

    //     $("ul.menu_sub > li").eq(0).attr("class","sub_01 over_s");

    //     if($("div#schedulelist > li").length>0) {
    //         schedule_swiper.destroy(true,false);
    //         $("div#schedulelist").empty();
    //     }
        
    //     var value = jQuery.param({"albumid":soundgramApi.albumid});
    //     $.ajax({
    //         type : "POST",
    //         url : "api/schedule.php",
    //         data : value,
    //         dataType: "json",
    //         success: function(data) {
    //             scheduleSetting(data);
    //             leftmenuswipe_onoff("show");
    //             leftmenuSwiperSetting("0");
    //             var _np = window.setTimeout(function() {
    //                 window.clearTimeout(_np);
    //                 schedule_vertical();
    //             },1000);
    //         }, 
    //         error: function(xhr, textStatus, errorThrown) {
    //             console.log(errorThrown);
    //         }
    //     });
    // });

    // $("li.sub_02").click(function() {
    //     soundgramApi.lmactiveIndex=1;

    //     $("ul.menu_main > a").each(function(i) {
    //         $("ul.menu_main > a").eq(i).children("li").attr("class","");
    //     });

    //     $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

    //     $("ul.menu_sub > li").eq(1).attr("class","sub_02 over_s");

    //     if($("div#snslist > li").length==0) {
    //         var value = jQuery.param({"albumid":soundgramApi.albumid});
    //         $.ajax({
    //             type : "POST",
    //             url : "api/sns.php",
    //             data : value,
    //             dataType: "json",
    //             success: function(data) {
    //                 snsSetting(data);
    //                 leftmenuswipe_onoff("show");
    //                 leftmenuSwiperSetting("1");
    //                 if(typeof sns_swiper=="undefined" || sns_swiper==null) {
    //                     sns_vertical();
    //                 }
    //             }, 
    //             error: function(xhr, textStatus, errorThrown) {
    //                 console.log(errorThrown);
    //             }
    //         });
    //     }
    //     else {
    //         leftmenuswipe_onoff("show");
    //         leftmenuSwiperSetting("1");
    //         if(typeof sns_swiper=="undefined" || sns_swiper==null) {
    //             sns_vertical();
    //         }
    //     }
    // });

    // $("li.sub_03").click(function() {
    //     soundgramApi.lmactiveIndex = 2;

    //     $("ul.menu_main > a").each(function(i) {
    //         $("ul.menu_main > a").eq(i).children("li").attr("class","");
    //     });

    //     $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");

    //     $("ul.menu_sub > li").eq(2).attr("class","sub_03 over_s");
    //     console.log($("div.review_info_btnbox").is(":visible"));
    //     if($("div.review_info_btnbox").is(":visible")) {

    //     // if($("div.review").children().length==0) {
    //         goReview();
    //     // }
    //     // else {
    //     //     reviewClose();
    //     //     reviewTitleScrollEffect("280", "51%", "66px", "remove");
    //     //     leftmenuswipe_onoff("show");
    //     //     leftmenuSwiperSetting("2");
    //     // }
    //     }
    //     else {
    //         goReviewComment();
    //     }
    // });

    $("span#leftmenuswipe_close").click(function() {
        leftmenuswipe_onoff("hide");
        // reviewTitleScrollEffect("280", "51%", "66px", "remove");
        if(soundgramApi.ostype==1) {
            Soundgram.resetWriteReview();
        }
        else {

        }
    });

    $("div.schedule > button.arrow_left").click(function() {
        var month = $("div.schedule > h2").attr("value");
        scheduleMove("minus");
    });

    $("div.schedule > button.arrow_right").click(function() {
        var now = new Date();
        var month = $("div.schedule > h2").attr("value");
        scheduleMove("plus");
    });

    $("img.review_info_btn").click(function(e) {
        var rv = "";
        for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
            var lm = soundgramApi.leftmenudiv[i].substring(0,2);
            if(lm=="rv") {
                rv = soundgramApi.leftmenudiv[i];
            }
        }

        if($("div.review_write").is(":visible")) {
            if(!$(e.target).hasClass("review_write")) { 
                WriteButtonClear(rv);       
            }
        }

        var imgSrc = $("img.review_info_btn").attr("src");
        var _fadein = "";
        var _fadeout = "";

        if(imgSrc.match("more")=="more") {
            if($("div#rclist > li").length>0) rc_swiper.destroy(true, false);

            // _fadein = "div#rv02 > div.review_content3";
            // _fadeout = "div#rv02 > div.review_content2";
            $("img.review_info_btn").attr("src",imgSrc.replace("more","reduce"));
            reviewTitleScrollEffect("280", "51%", "66px", "remove");

            $("div#"+rv+" > div.review_content3").removeClass("hidden");
            var tb = window.setTimeout(function() {
                window.clearTimeout(tb);
                $("div#"+rv+" > div.review_content3").css({"transition":"all .3s ease-in", "bottom":"0%"});

                var tfo = window.setTimeout(function() {
                    window.clearTimeout(tfo);

                    $("div#"+rv+" > div.review_content3").css({"transition":""});
                }, 300);
            }, 100);
        }
        else {
            goReviewComment();
        }
    });

    $("div[id*=rv] > div.page_title").click(function(e) {
        var targetid = $(e.target).attr("id");
        if(targetid=="review_dd" || targetid=="reviewLikeCnt") {
            var id = $(e.target).attr("value");
            // change_reviewlike(id);
            if(soundgramApi.loginoutflag=="1") {
                change_reviewlike(id);
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
    });

    //회원가입, 로그인 관련 START!!
    $("div#leftmenu_profile, h4#nick").click(function() {
        close_leftmenu();

        // $("div.container_popup").children("div").addClass("hidden");
        // $("div.container_popup").removeClass("hidden");
        // $("div.horizontal_swiper").addClass("hidden");
        // $("div.container").addClass("hidden");

        // if(soundgramApi.loginoutflag=="1") {
        //     $("div#"+soundgramApi.cuid+"_g").removeClass("hidden");
        //     $("input#profile_nick").val(soundgramApi.nick);
        //     $("input#profile_tel").val(soundgramApi.tel);

        //     effect("div#"+soundgramApi.cuid+"_g");
        // }
        // else {
        //     $("div#"+soundgramApi.cuid+"_a").removeClass("hidden");
        //     effect("div#"+soundgramApi.cuid+"_a");
        // }

        // $("header#pop_top").removeClass("hidden");
        // effect("header#pop_top");

        goLoginPage();
    });

    $("div#"+soundgramApi.cuid+"_a > div.mb_content > button.btn_boraline").click(function() {
        $("div#"+soundgramApi.cuid+"_a").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_b").removeClass("hidden");
        $("header#pop_top").removeClass("hidden");
        effect("div#"+soundgramApi.cuid+"_b");
        effect("header#pop_top");
    });

    $("div#"+soundgramApi.cuid+"_a > div.mb_content > button.btn_bora").click(function() {
        $("div#"+soundgramApi.cuid+"_a").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_c").removeClass("hidden");
        // $("div#member_input > input").eq(0).focus().select();
        // $("div#member_input > div").eq(0).addClass("hidden");
        $("header#pop_top").removeClass("hidden");
        
        effect("div#"+soundgramApi.cuid+"_c");
        effect("header#pop_top");
    });

    $("div#"+soundgramApi.cuid+"_b > div.mb_content > button.btn_bora").click(function() {
        var id = $("input#loginid").val();
        var password = $("input#loginpassword").val();
        
        if(id.length==0) {
            $("div#loginidalert").removeClass("hidden").text("아이디를 입력해주세요.");
            $("input#loginid").focus().select();
            return false;
        }

        if(password.length==0) {
            $("div#loginpassalert").removeClass("hidden").text("패스워드를 입력해주세요.");
            $("input#loginpassword").focus().select();
            return false;
        }
        // console.log(sha256(password));
        var value = jQuery.param({"id":id, "passwd":sha256(password), "uuid":soundgramApi.uuid, "type":"L", "albumid":soundgramApi.albumid});
        // console.log(value);
        $.ajax({
            type : "POST",
            url : "api/login.php",
            data : value,
            dataType: "json",
            timeout       : 3000,
            retries       : 5,     //       <-------- Optional
            retryInterval : 3000,   //       <-------- Optional
            success: function(data) {
                // console.log(data);
                var returnCode = data.returnCode;
                if(returnCode=="login_complete") {
                    loginComplete(data);
                }
                else loginError();
            }, 
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });

    $("input#loginid").keyup(function() {
        if($("div#loginidalert").is(":visible")) $("div#loginidalert").addClass("hidden");
    });

    $("input#loginpassword").keyup(function() {
        if($("div#loginpassalert").is(":visible")) $("div#loginpassalert").addClass("hidden");
    });
    
    $("div#member_input > input").keyup(function() {
        var idx = $(this).index();
        var id = $(this).attr("id");
        if(id=="id" || id=="nick") {
            var getCheck= /^[a-zA-Z0-9]/;
            if(getCheck.test($(this).val())) {
                $(this).val($(this).val().replace(/[^a-zA-Z0-9]/g,""));
            }

            if(id=="id") {
                $("div#member_input > div").eq(idx/2).text("6~20자의 공백 없는 영문+숫자로 입력하세요.");
            }
            else {
                $("div#member_input > div").eq(idx/2).text("한글 1~10자, 영문 2~20자, 숫자를 입력하세요. (조합 가능)");
            }
        }
        else if(id=="password_org") {
            var getCheck= /\s/;
            if(getCheck.test($(this).val)) {
                $(this).val($(this).val().replace(/\s/g,""));
            }
        }
        else if(id=="tel") {
            var getCheck= /^[0-9]*$/;
            if(!getCheck.test($(this).val())) {
                $(this).val($(this).val().replace(/[^0-9]/g,""));
            }
        }

        if($(this).val().length==$(this).attr("maxlength")) {
            // $(this).val($(this).val().substring(0, $(this).attr("maxlength")));
            return false;
        }
    });

    $("div#"+soundgramApi.cuid+"_c > div.mb_content > button.btn_bora").click(function() {
        // $("div#"+soundgramApi.cuid+"_b").animate({"padding":"20% 0 0 0"}, 400);

        var name = $("input#name").val();
        var id = $("input#id").val();
        var password_org = $("input#password_org").val();
        var password = $("input#password").val();
        var tel = $("input#tel").val();
        var nick = $("input#nick").val();

        var getCheck= /^[a-zA-Z0-9]{4,12}$/gi;
        var getPassCheck = /[~!@#$%^&*()_+|<>?:{}]/gi;

        if(name.length==0) {
            $("input#name").focus().select();
            $("div#member_input > div").eq(3).text("이름을 입력해주세요.");
            return;
        }

        if(id.length==0) {
            $("input#id").focus().select();
            return;
        }

        if(id.length<6 || id.length>20) {
            $("input#id").focus().select();
            return;   
        }

        if(!getCheck.test(id)) {
            $("input#id").val("").focus().select(); 
            return;
        }

        if(password_org.length==0) {
            $("input#password_org").focus().select();
            return;
        }

        if(!getPassCheck.test(password_org)) {
            $("input#password_org").val("");
            $("input#password").val("");

            $("input#password_org").focus().select();
            return;
        }

        if(password_org.length<8 || password_org.length>16) {
            $("input#password_org").focus().select();
            return;   
        }

        if(password.length==0) {
            $("input#password").focus().select();
            return;
        }

        if(tel.length==0) {
            $("input#tel").focus().select();
            return;
        }

        if(nick.length==0) {
            $("input#nick").focus().select();
            return;
        }

        goJoin(name, id, password, tel, nick, "0", "");
    });

    $("div.mb_title, div.alert, button#goJoin, button#temp_pass").click(function() {
        $("div#"+soundgramApi.cuid+"_c").animate({"padding":"20% 0 0 0"}, 400);
        $("div#"+soundgramApi.cuid+"_f").animate({"padding":"20% 0 0 0"}, 400);
    });

    // $("div.mb_title, div.alert, button#goJoin").click(function() {
    //     $("div#"+soundgramApi.cuid+"_b").animate({"padding":"20% 0 0 0"}, 400);
    // });

    $("div.container_popup").click(function(e) {
        if($("div#"+soundgramApi.cuid+"_c").is(":visible")) {
            if(e.target.className=="input_style" || e.target.className=="mb_form") return false;
            else {
                $("div#"+soundgramApi.cuid+"_c").animate({"padding":"20% 0 0 0"}, 400);
            }
        }
        else if($("div#"+soundgramApi.cuid+"_g").is(":visible")) {
            if(e.target.className=="input_style" || e.target.className=="mb_form") return false;
            else {
                $("div#"+soundgramApi.cuid+"_g").animate({"padding":"12% 0 0 0"}, 400);
            }
        }
        else if($("div#"+soundgramApi.cuid+"_f").is(":visible")) {
            if(e.target.className=="input_style" || e.target.className=="mb_form") return false;
            else {
                $("div#"+soundgramApi.cuid+"_f").animate({"padding":"20% 0 0 0"}, 400);
            }
        }
    });

    $("div#member_input > input").focusin(function() {
        $("div#member_input > div").each(function(idx) {
            if(!$("div#member_input > div").eq(idx).hasClass("hidden")) $("div#member_input > div").addClass("hidden");
        });

        // var idx = $("div#member_input > input:focus").index();
        var idx = $(this).index();
        if((idx>0&&idx<8) || idx==10) {
            var padding = (20-(idx*4))+"% 0 0 0";
            $("div#"+soundgramApi.cuid+"_c").animate({"padding":padding}, 400);
            $("div#member_input > div").eq(idx/2).removeClass("hidden");
        }
    });

    $("input#password").keyup(function() {
        var pwd1 = $("input#password_org").val();
        var pwd2 = $("input#password").val();

        if(pwd1==pwd2) {
            $("div#member_input > div").eq(3).addClass("hidden");
        }
        else {
            if($("input#password").val().length==0) {
                $("div#member_input > div").eq(3).text("비밀번호를 한번 더 입력해주세요.");
            }            
            else {
                $("div#member_input > div").eq(3).text("비밀번호가 맞지 않아요!");
            }
        }
    });

    $("div#"+soundgramApi.cuid+"_a > div.mb_content > ul > li > a").click(function() {
        var id = $(this).attr("id");
        // Soundgram.goSnsLogin(id);
        
        //카카오 로그인
        if(id=="kakao") {
            Kakao.Auth.login({
                success: function(authObj) {
                    // alert(JSON.stringify(authObj));
                    Kakao.API.request({
                        url : "/v2/user/me"
                        , success : function( res ) {
                                var id = "kk_"+res.id;
                                var name = res.properties.nickname;
                                var profile = res.properties.thumbnail_image;

                                goJoin(name, id, id, " ", name, "1", profile);
                        }, 
                        fail : function( error ) {
                            console.log( JSON.stringify( error ) );
                        }
                    });
                },
                fail: function(err) {
                    console.log(err);
                    alert(JSON.stringify(err))
                },
            });
        }
        else if(id=="apple") {
            AppleID.auth.init({
                clientId : '6KQ29YBG92',
                scope : 'email',
                redirectURI: 'https://disk.soundgram.co.kr/index.php',
                state : 'DE'
            });
            
            AppleID.auth.signIn();
        }
    });

    $("button#logout").click(function() {
        var sns = $("div#"+soundgramApi.cuid+"_g").attr("val");
        logout(sns);
    });

    $("button.btn_grayline").click(function() {
        showConfirm("dropout", "알림", "정말 탈퇴하시겠습니까?<br>탈퇴시 게시글이 모두 삭제됩니다.");
    });

    $("button#changenick").click(function() {
        var id = soundgramApi.user_id;
        var nick = $("input#profile_nick").val();

        changeCustInfo("user_nick", nick);
    });

    $("input#profile_tel").keyup(function() {
        console.log($(this).attr("maxlength"));
        if($(this).val().length==$(this).attr("maxlength")) {
            // $(this).val($(this).val().substring(0, $(this).attr("maxlength")));
            return false;
        }
    });

    $("button#changetel").click(function() {
        var id = soundgramApi.user_id;
        var tel = $("input#profile_tel").val();

        if(tel.length==0) {
            $("input#profile_tel").focus().select();
            return;
        }

        changeCustInfo("user_phone", tel);
    });

    $("button#camera").click(function(e) {
        e.preventDefault();
        $("#uploadImage").click();
    });

    $("span#member_close").click(function() {
        var album_type = soundgramApi.diskid.substring(0,1);
        if(album_type=="p") {
            $("div#member_input > div").each(function(idx) {
                if(!$("div#member_input > div").eq(idx).hasClass("hidden")) $("div#member_input > div").addClass("hidden");
            });

            $("div.container_popup").children().css({"animation":""});

            member_close();
        }
        else {
            $("div.container_popup").empty();
            $("header#pop_top").addClass("hidden");
            $("div.container_popup").addClass("hidden");
            $("div#service_info").removeClass("hidden");
            $("div.container").removeClass("hidden");
        }
    });

    $("button#srhidpass").click(function() {
        $("div.container_popup").children("div").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_e").removeClass("hidden");
        effect("div#"+soundgramApi.cuid+"_e");
    });

    $("button#srhid, button#temp_pass") .click(function() {
        var thisbutton = $(this).attr("id");
        if(thisbutton=="srhid") {
            var searchname = $("input#id_srhname").val();
            var searchtel = $("input#id_srhtel").val();

            if(searchname.length==0) {
                $("div#srhid_alert_name").removeClass("hidden").text("이름을 입력해주세요.");
                $("input#id_srhname").focus().select();
                return;
            }

            if(searchtel.length==0) {
                $("div#srhid_alert_tel").removeClass("hidden").text("휴대폰 번호를 입력해주세요.");
                $("input#id_srhtel").focus().select();
                return;
            }

            var value = jQuery.param({"name":searchname, "phone":searchtel});
            $.ajax({
                type : "POST",
                url : "api/findAccount.php",
                data : value,
                dataType: "json",
                timeout       : 3000,
                retries       : 5,     //       <-------- Optional
                retryInterval : 3000,   //       <-------- Optional
                success: function(data) {
                    if(data.returnCode=="notuser") {
                        findAccountErr();
                    }
                    else {
                        alert("회원님의 아이디는 "+data.account+" 입니다.");
                    }
                }, 
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
        else {
            var searchid = $("input#pass_srhid").val();
            var searchtel = $("input#pass_srhtel").val();

            if(searchid.length==0) {
                $("div#srhpass_alert_id").removeClass("hidden").text("아이디를 입력해주세요.");
                $("input#pass_srhid").focus().select();
                return;
            }

            if(searchtel.length==0) {
                $("div#srhpass_alert_tel").removeClass("hidden").text("휴대폰 번호를 입력해주세요.");
                $("input#pass_srhtel").focus().select();
                return;
            }

            var value = jQuery.param({"account":searchid, "phone":searchtel, "albumid":soundgramApi.albumid});
            $.ajax({
                type : "POST",
                url : "api/resetPassword_step1.php",
                data : value,
                dataType: "json",
                timeout       : 3000,
                retries       : 5,     //       <-------- Optional
                retryInterval : 3000,   //       <-------- Optional
                success: function(data) {
                    if(data.returnCode=="notuser") {
                        toast("회원정보가 존재하지 않습니다.");
                    }
                    else {
                        var password = data.password;
                        value = jQuery.param({"account":searchid, "password":sha256(password), "albumid":soundgramApi.albumid});
                        $.ajax({
                            type : "POST",
                            url : "api/resetPassword_step2.php",
                            data : value,
                            dataType: "json",
                            timeout       : 3000,
                            retries       : 5,     //       <-------- Optional
                            retryInterval : 3000,   //       <-------- Optional
                            success: function(data) {
                                showConfirm("login", "알림", "임시 비밀번호는 <strong>"+password+"</strong> 입니다. <br>로그인 페이지로 이동합니다.");
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
    });

    $("#accessterms").click(function() {
        $("div.container_popup").children("div").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_d").removeClass("hidden");
    });

    $("button#changepass").click(function() {
        $("div.container_popup").children("div").addClass("hidden");
        $("div#"+soundgramApi.cuid+"_f").removeClass("hidden");
        effect("div#"+soundgramApi.cuid+"_f");
    });

    $("button#newpasschange").click(function() {
        var id = soundgramApi.user_id;
        var password = $("input#inputcpass").val();
        var new_password = $("input#inputcnpass").val();

        if(password.length==0) {
            $("div#changepass").removeClass("hidden").text("비밀번호를 입력해주세요.");
            $("input#inputcpass").focus().select();
            return;
        }

        if(new_password.length==0) {
            $("div#changenewpass").removeClass("hidden").text("비밀번호를 입력해주세요.");
            $("input#inputcnpass").focus().select();
            return;
        }

        if(new_password.length<8 || new_password.length>16) {
            $("div#changenewpass").removeClass("hidden").html("비밀번호는 영문 소문자, <br>숫자를 조합하여 8~16자로 입력하세요.");
            $("input#inputcnpass").val("").focus().select();
            return;
        }

        if(password==new_password) {
            $("div#changenewpass").removeClass("hidden").text("같은 비밀번호는 사용할 수 없어요!");
            $("input#inputcnpass").val("").focus().select();
            return;
        }
        
        var value = jQuery.param({"id":id, "password":sha256(password), "chpassword":sha256(new_password), "albumid":soundgramApi.albumid});
        $.ajax({
            type : "POST",
            url : "api/passwordChange.php",
            data : value,
            dataType: "json",
            timeout       : 3000,
            retries       : 5,     //       <-------- Optional
            retryInterval : 3000,   //       <-------- Optional
            success: function(data) {
                if(data.returnCode=="success") {
                    // alert("비밀번호 변경이 완료되었습니다.\n다시 로그인 해주세요.");
                    // changePasswordComplete();

                    toast("비밀번호 변경이 완료되었습니다.");
                }
                else {
                    changePassErr();
                }
            }, 
            error: function(xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });

    $("input#inputcpass, input#inputcnpass").keyup(function() {
        $("div#changepass").addClass("hidden");
        $("div#changenewpass").addClass("hidden");
    });

    $("input#id_srhname, input#id_srhtel").keyup(function() {
        $("div#srhid_alert_name").addClass("hidden");
        $("div#srhid_alert_tel").addClass("hidden");
    });

    $("div#"+soundgramApi.cuid+"_f").focusin(function(e) {
        $("div#srhpass > div").each(function(idx) {
            if(!$("div#srhpass > div").eq(idx).hasClass("hidden")) $("div#srhpass > div").addClass("hidden");
        });

        var idx = $("div#srhpass > input:focus").index();
        if(idx==0||idx==2) {
            $("div#"+soundgramApi.cuid+"_f").animate({"padding":"1% 0 0 0"}, 400);
            $("div#srhpass > div").eq(idx/2).removeClass("hidden");
        }
    });

    $("div.mb_title, div.alert, button#temp_pass").click(function() {
        $("div#"+soundgramApi.cuid+"_f").animate({"padding":"20% 0 0 0"}, 400);
    });

    $("div#"+soundgramApi.cuid+"_g").focusin(function(e) {
        if($(e.target).nodeName=="INPUT") {
            $("div#"+soundgramApi.cuid+"_g").animate({"padding":"2% 0 0 0"}, 400);
        }
    });

    $("input#pass_srhid, input#pass_srhtel").keyup(function() {
        $("div#srhpass_alert_id").addClass("hidden");
        $("div#srhpass_alert_tel").addClass("hidden");
    });

    $("div.logo, span#infomation").click(function() {
        $("div.horizontal_swiper").addClass("hidden");

        if(soundgramApi.diskid.substring(0,1)=="p") {
            $("div.container_popup").addClass("hidden");
            $("div.leftmenu_horizontal_swiper").addClass("hidden");
            $("div#mini_play_eq").addClass("hidden");

            // $("div#in"+soundgramApi.tplImgNum).removeClass("hidden");
            // $("div#openleftmenu").hide();
            // effect("div#in"+soundgramApi.tplImgNum);

            $("div#"+soundgramApi.infomation).removeClass("hidden");
            $("div#"+soundgramApi.infomation+" > div.si_content").css({"padding":"20% 0 0 0"});

            $("div#openleftmenu").hide();
            effect("div#"+soundgramApi.infomation);
        }
        else {
            $("div#"+soundgramApi.infomation).removeClass("hidden");
        }
    });

    $("img#info_close").click(function() {
        var album_type = soundgramApi.diskid.substring(0,1);
        if(album_type=="p") {
            var player = document.getElementById("playMusic");
            if(player.currentTime>0) {
                var mpe = window.setTimeout(function() {
                    window.clearTimeout(mpe);
                    $("div#mini_play_eq").removeClass("hidden");
                }, 1000);
            }
        }

        $("div#"+soundgramApi.infomation).addClass("hidden");
        $("div.container").removeClass("hidden");
        if(soundgramApi.leftmenuon) {
            $("div.leftmenu_horizontal_swiper").removeClass("hidden");
        }
        else {
            $("div.horizontal_swiper").removeClass("hidden");    
        }
        
        $("div#openleftmenu").show();
    });
    //회원가입, 로그인 관련 END!!

    $("div#goTerms").click(function() {
        var album_type = soundgramApi.diskid.substring(0,1);
        var sUrl = "disk01/diskid/"+soundgramApi.diskid;

        $("div#service_info").addClass("hidden");
        $("div.container").addClass("hidden");
        $("header#pop_top").removeClass("hidden");
        
        if(album_type=="s") {
            $("div.container_popup").append(makeContainerPopup());

            $("span#member_close").attr("style","background-image:url("+sUrl+"/images/in"+soundgramApi.tplImgNum+"_btn_close.png)");
            $("header#pop_top").css({"height":"47px", "padding":"3.5px"});
            $("div#"+soundgramApi.cuid+"_d > div").eq(1).children("div").css({"height":"500px"});
            $("div#"+soundgramApi.cuid+"_d > div").eq(2).addClass("hidden");
            $("div#"+soundgramApi.cuid+"_d > div").eq(3).addClass("hidden");
        }
        
        $("div.container_popup").removeClass("hidden");
        $("div#"+soundgramApi.cuid+"_d").removeClass("hidden");
        effect("div#"+soundgramApi.cuid+"_d");
    });

    $("div#mailto").click(function() {
        if(soundgramApi.ostype==1) {
            Soundgram.mailto();
        }
        else {// 21.01.11 조유빈, iOS Mail 기능을 위해 추가
            window.webkit.messageHandlers.Soundgram.postMessage('mailTo');
        }
    });

    $("div.nfc_btnarea > button").click(function() {
        $("div.nfc_btnarea > button").click(function() {
            // Soundgram.gotoNFC();
            if(soundgramApi.ostype == 1) {
                Soundgram.gotoNFC();
            } else if(soundgramApi.ostype == 2) {
                window.webkit.messageHandlers.SoundgramNFC.postMessage("otherDevice");
            }
        })
    });

    $("button.guide_ok").click(function() {
        Soundgram.guide();
    });

    // $("div#ho02").click(function() {
    //     // if(soundgramApi.ostype==1) {
    //         var ho = "";
    //         for(var lt=0; lt<soundgramApi.albumdiv.length;lt++) {
    //             var lm = soundgramApi.albumdiv[lt].substring(0,2);
    //             if(lm=="ho") {
    //                 ho = soundgramApi.albumdiv[lt];
    //             }
    //         }
        
    //         var artist = soundgramApi.artistname;
    //         var album_name = soundgramApi.albumtitle;
    //         var downurl = soundgramApi.google_url;
    //         //var imgurl = soundgramApi.serverUrl+"/"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+ho+"_img_cover.jpg";
	// 		var imgurl = soundgramApi.serverUrl + "/media/album/" + soundgramApi.albumid + "/" + soundgramApi.share_img;

    //         // Soundgram.sharing(artist,album_name,downurl,imgurl);
	// 		let shareObj = {imagePath: imgurl, contents: `[칩디스크] ${artist}-${album_name}`, url: downurl};
	// 		if(soundgramApi.ostype == 2) window.webkit.messageHandlers.Soundgram.postMessage(shareObj);
    //         else window.open("http://www.facebook.com/sharer/sharer.php?u=" + downurl);
    //     // }
    // });

    // 공유하기 기능 추가 21.06.15
    $("div.cover_sh").click(function() {
        if(soundgramApi.ostype=="1") {
            var artist = soundgramApi.artistname;
            var album_name = soundgramApi.albumtitle;
            var downurl = "https://www.soundgram.co.kr:10443/dev/test_share/";
            var imgurl = soundgramApi.serverUrl + "/media/album/" + soundgramApi.albumid + "/" + soundgramApi.share_img;
            
            Soundgram.sharing(artist,album_name,downurl,imgurl);
        }
        else if(soundgramApi.ostype=="2") {

        }
    });

    // 대댓글 팝업 신고하기
    $("button.amenu_report").click(function() {
        var comment_id = $("div#addtionmenu").attr("value");
        console.log($("div#report_popup").text());
        $("div#addtionmenu").hide();

        if($("div#report_popup").text()=="신고") {
            $("div#report_popup").attr("value",comment_id);
            $("div#report_popup").show();
        }
        else {
            deleteComment(comment_id,soundgramApi.user_id);
        }
    });

    // 대댓글 팝업 끄기
    $("button.amenu_cancel").click(function() {
        $("div#addtionmenu").hide();
    });

    // 신고하기 팝업 종료
    $("button.report_btn_c").click(function() {
        $("div#report_popup").hide();
    });

    // 칩디스크로 돌아가기
    $("#_bchipdisc").click(function() {
        showConfirm('close', '칩디스크 선택 화면으로 돌아갈까요?<br>재생중인 음악은 중지됩니다.');
    });

}