var horizontal_swiper;
function swiperSetting(idx) {
    var album_type = soundgramApi.diskid.substring(0,1);
    var horizontal_idx = 0;
    horizontal_swiper = new Swiper('.horizontal_swiper', {
        preloadImages: true,
        // Enable lazy loading
        lazyLoading: true,
        // speed : 500,
        initialSlide : idx,
        // watchOverflow: true,
        noSwiping: true,
        noSwipingClass: "no-swiping",
        on:
        {
            init : function (){
                // console.log(idx);
                
                horizontal_swiper_st(parseInt(idx));
            },
        }
    });


    horizontal_swiper.on("slideChange", function() {
        if(album_type=="p"){
            // 통합앱의 경우 체크하지 않음 21.09.08
            if(!soundgramApi.tot) {
                uuidCheck();
                nfcCheck();
            }
        }

        horizontal_idx = this.activeIndex;
        horizontal_swiper_st(horizontal_idx);
    }).on("slideNextTransitionEnd", function() {
        if(album_type=="p") {
            if((horizontal_idx-1)>=0) {
                var divid = soundgramApi.albumdiv[horizontal_idx-1];
                // var divid_sub = divid.substring(0,2);
                // if(divid_sub=="aa") {
                    ptEffectDel(divid);
                // }
            }
        }
    }).on("slidePrevTransitionEnd", function() {
        if(album_type=="p") {
            // ptEffectDel(horizontal_swiper.activeIndex+1);

            var divid = soundgramApi.albumdiv[horizontal_idx+1];
            ptEffectDel(divid);
        }
    });
}

var nc = false;
var vbInterval = "";
var gacnt = 0;
function horizontal_swiper_st(idx) {
    soundgramApi.leftmenuon=false;
    soundgramApi.activeIndex = idx;

    var effect_timer = 0;
    if(!nc) {
        effect_timer = 200;
        nc = true;
    }
    else {
        effect_timer = 100;
    }

    if(soundgramApi.diskid.substring(0,1)=="p") {
        $("ul.menu_main > a").each(function(i) {
            $("ul.menu_main > a").eq(i).children("li").attr("class","");
        });
        $("ul.menu_main > a").eq(idx).children("li").attr("class","over");

        $("ul.menu_sub > li").each(function() {
            $(this).attr("class", $(this).attr("class").replace("_over",""));
        });
        $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");
    }
    else {
        $("ul.tb_menu > a").each(function(i) {
            $("ul.tb_menu > a").eq(i).children("li").attr("class",$("ul.tb_menu > a").eq(i).children("li").attr("class").replace("_on","_off"));
        });
        $("ul.tb_menu > a").eq(idx).children("li").attr("class",$("ul.tb_menu > a").eq(idx).children("li").attr("class").replace("_off","_on"));
    }

    // if(idx > 0) {

    var album_type = soundgramApi.diskid.substring(0,1); // p:프리미엄, s:스탠다드
    var divid = $("div#swipe > div").eq(idx).attr("id");
    var divid_sub = divid.substring(0,2);
    var value = jQuery.param({"albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});
    var player = document.getElementById("playMusic");
    
    if(divid_sub!="ho") {
        if(album_type=="p") {
            pageTitleEffect(divid);
        }

        var loading = window.setTimeout(function() {
            window.clearTimeout(loading);
            if(divid_sub=="al") {
                if($("ul.songlist > li").length>0) {
                    playlist_swiper.destroy(true, false);
                    
                    // if(typeof player_swiper!="undefined") player_swiper.destory(true, false);
                    
                    $("ul.songlist").empty();
                    // $("div#p_swipe").empty();
                    $("dd#songlike_play").empty();
                }
                // else {
                //     $("div.vertical_playlist").removeClass("hidden");
                //     if(typeof playlist_swiper=="undefined" || playlist_swiper=="") {
                //         vertical_playlist();
                //     }
                //     if(album_type=="p") list_effect("playlist");
                // }

                var ps = false;
                if($("div#p_swipe > div").length>0) ps=true;

                $.ajax({
                    type : "POST",
                    url : "api/song_info.php",
                    data : value,
                    dataType: "json",
                    timeout       : 3000,
                    retries       : 5,     //       <-------- Optional
                    retryInterval : 3000,   //       <-------- Optional
                    success: function(data) {
                        $("ul.songlist").empty();
                        $.each(data, function(al) {
                            // var makeListHTML = makeHTML(album_type, "songlist", data[al], soundgramApi.artistname);
                            // $("ul.songlist").append(makeListHTML);

                            $("ul.songlist").append(getHTMLListData("al"));
                            if(!ps) $("div#p_swipe").prepend("<div class='play_img swiper-slide' style='background-image:url(media/booklet/"+soundgramApi.albumid+"/"+data[al].photo_file_path+")'></div>")
                            
                            if(player.currentTime==0) ;
                            else {
                                var val = $("audio#playMusic").val();
                                var songlike = window.setTimeout(function() {
                                    window.clearTimeout(songlike);
                                    $("dd#songlike_play div").eq(val.substring(0,val.indexOf("|"))-1).removeClass("hidden");
                                },500);
                            }
                        });

                        var complete = window.setInterval(function() {
                            if(data.length==$("ul.songlist > li").length) {
                                window.clearInterval(complete);

                                for(var al=0; al<$("ul.songlist > li").length;al++) {
                                    var id = data[al].id;
                                    var order = data[al].order;
                                    var likecnt = data[al].likecnt;
                                    var title = data[al].title;
                                    var filename = data[al].song_file_mp3;
                                    var lyric_file = data[al].lyric_file_lrc;
                                    var lyric = data[al].lyric;
                                    var artist = data[al].song_artist;
                                    var likeonoff = "off";

                                    if(data[al].likeonoff!=0) likeonoff="on";

                                    if(order.length<2) order = "0"+order;

                                    var likecntfork = likecnt_change(likecnt)
                                    var param = data[al].order+"|"+data[al].title.replace(/\'/g,"&#39;")+"|"+filename+"|"+lyric_file+"|"+artist

                                    var isTitle = "";
                                    if(data[al].isTitle=="1") isTitle = "<strong class='titlebox'></strong>";

                                    var song_song_html 
                                    = "<span value='"+param+"' class='title'></span><h3 value='"+param+"' style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+isTitle+title+"</h3>"
                                    + "<h4 value='"+param+"' style='white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>"+artist+"</h4>";

                                    $("ul.songlist > li").eq(al).attr("value",param).attr("value2",id);
                                    $("ul.songlist > li").eq(al).find(".song_no").text(order);
                                    $("ul.songlist > li").eq(al).find("#songlike_playlist").attr("value",likecnt).attr("value2",order).attr("value3",id).html("<span class='"+likeonoff+"'></span>"+likecntfork);
                                    $("ul.songlist > li").eq(al).find("#song_a").attr("value",param);
                                    $("ul.songlist > li").eq(al).find(".song_song").attr("value",param).html(song_song_html);

                                    var LyricHTML   = "<div class='lyr_content hidden'>"
                                                    + "<h2 class='lyr_title'>"+title
                                                    + "</h2>"
                                                    + "<p class='lyr_text'>"+lyric.replace(/\n/gi, "<br>")
                                                    + "</div>"
                                    if(album_type=="p") {
                                        + "<div style='position:fixed; background-color:#fff; opacity: 0.9; bottom:0; left:0; width:100%; height:50px;'></div>"
                                        + "</div>"
                                    }
                                    
                                    $("div#ly01").append(LyricHTML);    

                                    var SongLike    = "<div class='no_like hidden'><span class='"+likeonoff+"'></span>"+likecntfork+"</div>"
                                    $("dd#songlike_play").append(SongLike); 
                                }

                                $("div.vertical_playlist").removeClass("hidden");
                                vertical_playlist();
                                
                                if(album_type=="p") list_effect("playlist");
                            }
                        }, 100);
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
            else if(divid_sub=="pl") {
                if(album_type=="s") {
                    if(typeof player_swiper=="undefined" || player_swiper=="") {
                        if($("ul.songlist > li").length==0) {
                            $.ajax({
                                type : "POST",
                                url : "api/song_info.php",
                                data : value,
                                dataType: "json",
                                timeout       : 3000,
                                retries       : 5,     //       <-------- Optional
                                retryInterval : 3000,   //       <-------- Optional
                                success: function(data) {
                                    $("ul.songlist").empty();
                                    $.each(data, function(al) {
                                        var makeListHTML = makeHTML(album_type, "songlist", data[al], soundgramApi.artistname);
                                        $("ul.songlist").append(makeListHTML);
                                        $("div#p_swipe").prepend("<div class='play_img swiper-slide' style='background-image:url(media/booklet/"+soundgramApi.albumid+"/"+data[al].photo_file_path+")'></div>")
                                    });

                                    $("div.vertical_playlist").removeClass("hidden");
                                    if(typeof playlist_swiper=="undefined" || playlist_swiper=="") {
                                        vertical_playlist();
                                    }
                                    if(album_type=="p") list_effect("playlist");
                                }, 
                                error: function(xhr, textStatus, errorThrown) {
                                    console.log(errorThrown);
                                }
                            });
                        }
                        else {
                            $("div.vertical_playlist").removeClass("hidden");
                            if(typeof playlist_swiper=="undefined" || playlist_swiper=="") {
                                vertical_playlist();
                            }
                            if(album_type=="p") list_effect("playlist");
                        }

                        var np = window.setTimeout(function() {
                            window.clearTimeout(np);
                            var val = $("ul.songlist > li:first").attr("value");
                            musicSetting(val);
                        },500);
                    }
                }
            }
            else if(divid_sub=="bo") {
                $("div.vertical_booklet").removeClass("hidden");
                list_effect("booklet");

                // if(typeof vbooklet_swiper.length=="undefined") {
                //     vbooklet_swiper.destroy(true,false);
                //     $("div#booklet_img_list").empty();
                // }

                // $.ajax({
                //     type : "POST",
                //     url : "api/booklet_info.php",
                //     data : value,
                //     dataType: "json",
                //     success: function(data) {
                //         // $("div#booklet_img_list").empty();

                //         // 21.08.09 부클릿 total 추가
                //         $("span.st_num").text(data.length);

                //         // $.each(data, function(al) {
                //         //     var makeListHTML = makeHTML(album_type, "bookletlist", data[al], soundgramApi.artistname);
                //         //     $("div#booklet_img_list").append(makeListHTML);
                //         // });

                //         // $("div.vertical_booklet").removeClass("hidden");
                //         // vertical_booklet();
                        
                //         // list_effect("booklet");

                //         $.each(data, function(bo) {
                //             $("div#booklet_img_list").append(getHTMLListData("bo"));

                //             DETAIL_HTML = "<div class='swiper-slide'>"
                //                         + "<div class='swiper-zoom-container'>"
                //                         + "<img src='media/booklet/"+soundgramApi.albumid+"/"+data[bo].photo+"' />"
                //                         + "</div>"
                //                         + "</div>";

                //             $("div#booklet_detail").append(DETAIL_HTML);
                //         });

                //         var complete = window.setInterval(function() {
                //             if(data.length==$("div#booklet_img_list > li").length) {
                //                 window.clearInterval(complete);

                //                 for(var bo=0; bo<$("div#booklet_img_list > li").length;bo++) {
                //                     var imgSrc = "media/booklet/"+soundgramApi.albumid+"/"+data[bo].photo;
                                    
                //                     $("div#booklet_img_list > li").eq(bo).children("img").attr("src",imgSrc);
                //                 }

                //                 $("div.vertical_booklet").removeClass("hidden");
                //                 vertical_booklet();
                                
                //                 // list_effect("booklet");
                //             }
                //         }, 100);
                //     }, 
                //     error: function(xhr, textStatus, errorThrown) {
                //         console.log(errorThrown);
                //     }
                // });
                // // }
                // // else {
                // //     $("div.booklet_img").removeClass("hidden");
                // //     list_effect("booklet");
                // // }
            }
            else if(divid_sub=="vi") {
                if($("div#video_list > li").length>0) {
                    vlist_swiper.destroy(true, false);
                    vlist_swiper = "";
                    
                    $("div#video_list").empty();
                }
                // else {
                //     $("div.video").removeClass("hidden");
                //     list_effect("video");
                // }

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
            else if(divid_sub=="th") {
                if($("div#thanks_list > li").length==0) {
                    $.ajax({
                        type : "POST",
                        url : "api/thanksto.php",
                        data : value,
                        dataType: "json",
                        timeout       : 3000,
                        retries       : 5,     //       <-------- Optional
                        retryInterval : 3000,   //       <-------- Optional
                        success: function(data) {
                            $("div#thanks_list").empty();
                            $.each(data, function(al) {
                                // var makeListHTML = makeHTML(album_type, "thankstolist", data[al], soundgramApi.artistname);
                                // $("div#thanks_list").append(makeListHTML);

                                $("div#thanks_list").append(getHTMLListData("th"));

                                if(data.length==1) {
                                    $("div#thanks_list > li > div > div.more").remove();
                                    $("div#thanks_list > li").eq(0).find("#toggle_text").css({"display":"none"});
                                    $("div#thanks_list > li").eq(0).find("#toggle_text1").css({"display":"block"});
                                }
                            });

                            var complete = window.setInterval(function() {
                                if(data.length==$("div#thanks_list > li").length) {
                                    window.clearInterval(complete);

                                    for(var al=0; al<$("div#thanks_list > li").length;al++) {
                                        var photo = data[al].photo;
                                        if(typeof photo == "undefined" || photo==null || photo=="") photo = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/gn"+soundgramApi.tplImgNum+"_img_profile_df.png";

                                        var author = data[al].author;
                                        var toggle = data[al].contents.substring(0,100).replace(/\n/gi,"<br>");
                                        var toggle1 = data[al].contents.replace(/\n/gi,"<br>");
                                        var fanmessage = data[al].fanmessage.replace(/\n/gi,"<br>");
                                        
                                        $("div#thanks_list > li").eq(al).find(".profile").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+photo+"')"});
                                        $("div#thanks_list > li").eq(al).find("#subject").text(author);
                                        $("div#thanks_list > li").eq(al).find("#toggle_text").html(toggle);
                                        $("div#thanks_list > li").eq(al).find("#toggle_text1").html(toggle1);
                                        
                                        if(fanmessage.length>0) {
                                            $("div#thanks_list > li").eq(al).find(".btn_tmf").removeClass("hidden");
                                            $("div#thanks_list > li").eq(al).find(".btn_tmf").attr("photo", photo);
                                            $("div#thanks_list > li").eq(al).find(".btn_tmf").attr("author", author);
                                            $("div#thanks_list > li").eq(al).find(".btn_tmf").attr("fm", fanmessage);
                                            $("div#thanks_list > li").eq(al).find(".img_tmf").attr("photo", photo);
                                            $("div#thanks_list > li").eq(al).find(".img_tmf").attr("author", author);
                                            $("div#thanks_list > li").eq(al).find(".img_tmf").attr("fm", fanmessage);
                                        }
                                    }
                                    
                                    $("div.thanks").removeClass("hidden");
                                    if(typeof thanks_swiper=="undefined" || thanks_swiper=="") {
                                        vertical_thanksto();
                                    }
                                    else {
                                        thanks_swiper.slideTo(0,0,false);
                                    }
                                
                                    list_effect("thanks");
                                }
                            }, 100);
                        }, 
                        error: function(xhr, textStatus, errorThrown) {
                            console.log(errorThrown);
                        }
                    });
                }
                else {
                    $("div.thanks").removeClass("hidden");
                    list_effect("thanks");
                }
            }
            else if(divid_sub=="st") {
                $.ajax({
                    type : "POST",
                    url : "api/thanksto.php",
                    data : value,
                    dataType: "json",
                    timeout       : 3000,
                    retries       : 5,     //       <-------- Optional
                    retryInterval : 3000,   //       <-------- Optional
                    success: function(data) {
                        $("div.thanks_contants").empty();
                        $.each(data, function(al) {
                            var makeListHTML = makeHTML(album_type, "thankstolist", data[al], soundgramApi.artistname);
                            $("div.thanks_contants").append(makeListHTML);
                        });

                        if(typeof sthanksto_swiper=="undefined" || sthanksto_swiper=="") {
                            sthanksto_vertical();
                        }
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
            else if(divid_sub=="ga") {
                if($("div.gallary > div").length==0) {
                    // gacnt++;
                    // if(gacnt==1) {
                        $.ajax({
                            type : "POST",
                            url : "api/video_info.php",
                            data : value,
                            dataType: "json",
                            timeout       : 3000,
                            retries       : 5,     //       <-------- Optional
                            retryInterval : 3000,   //       <-------- Optional
                            success: function(data) {
                                $("div.gallary").empty();
                                $.each(data, function(al) {
                                    var makeListHTML = makeHTML(album_type, "videolist", data[al], soundgramApi.artistname);
                                    $("div.gallary").append(makeListHTML);
                                });

                                $.ajax({
                                    type : "POST",
                                    url : "api/booklet_info.php",
                                    data : value,
                                    dataType: "json",
                                    timeout       : 3000,
                                    retries       : 5,     //       <-------- Optional
                                    retryInterval : 3000,   //       <-------- Optional
                                    success: function(data) {
                                        if($("div.gallary > div.booklet").length>0) {
                                            for(var i=0; i<$("div.gallary > div.booklet").length;i++) {
                                                $("div.gallary > div.booklet").remove();
                                            }
                                        }
                                        
                                        $.each(data, function(al) {
                                            var makeListHTML = makeHTML(album_type, "bookletlist", data[al], soundgramApi.artistname);
                                            $("div.gallary").append(makeListHTML);
                                        });

                                        // var cl = window.setTimeout(function() {
                                        //     window.clearTimeout(cl);
                                        //     if(typeof vvb_swiper=="undefined" || vvb_swiper=="") {
                                        //         vertical_vb();
                                        //     }
                                        // },300)

                                        if(typeof vvb_swiper=="undefined" || vvb_swiper=="") {
                                            // vbInterval = window.setInterval(function() {
                                            //     if(data.length == $("div.gallary > div.booklet").length) {
                                                    // window.clearInterval(vbInterval);
                                                    $("div.gallary > div.booklet").eq($("div.gallary > div.booklet").length-1).children("img").load(function() {
                                                        $("div.vertical_vb").removeClass("hidden");
                                                        vertical_vb();
                                                    });
                                            //     }
                                            // }, 100);
                                        }
                                    }, 
                                    error: function(xhr, textStatus, errorThrown) {
                                        console.log(errorThrown);
                                    }
                                });
                            }, 
                            error: function(xhr, textStatus, errorThrown) {
                                console.log(errorThrown);
                            }
                        });
                    // }
                }
                // list_effect("gallary");
            }
            else if(divid_sub=="aa") {
                if(soundgramApi.diskid=="p0700") {
                    $("div.artist").empty();
                    $("div.artist").html(soundgramApi.album_artist_info);
                }
                
                $("div.artist").removeClass("hidden");
                if(album_type=="p") list_effect("artist");
            }
            else if(divid_sub=="ab") {
                // if($("div.al_info_scr").is(":visible")) {
                    $("div.al_info_scr").removeClass("hidden");
                // }
                // else {
                    $("div.album").removeClass("hidden");
                // }
                
                if(album_type=="p") {
                    list_effect("album");
                    if($("div.al_info_scr").is(":visible")) {
                        window.addEventListener("scroll", function () {
                            console.log("스크롤 동작");
                            parallax(window.pageYOffset / 100);
                        });
                    
                        window.addEventListener("touchmove", function () {
                            console.log(window.pageYOffset || document.documentElement.scrollTop);
                            parallax(window.pageYOffset / 100);
                        });
                    
                        window.addEventListener("gesturechange", function () {
                            parallax(window.pageYOffset / 100);
                        });
                    
                        
                            var _e = document.getElementsByClassName("parallax");
                            var _i = 0;
                            var _l = _e.length;
                            var _v = [];
                            var _path = "polygon(0 0, 100% 0%, 50% 100%, 0% 100%)";

                            function parallax(scroll) {
                                console.log(_l);
                                for (_i = 0; _i < _l; _i++) {
                                    _v[_i] = _e[_i].className.replace(/[^-\d]+([-\d]+)/gm, "$1");
                                    _e[_i].style.top = scroll * _v[_i] + "%";

                                    console.log(_l+" / "+_v[_i] + " / " + _e[_i].style.top);
                                }
                            }
                    
                        // 211103 스크롤 위아래 방향에 따라 커버 이미지 사이즈 변경
                        const inner = document.querySelector(".intro_albumcover");
                        var beforePosition = document.documentElement.scrollTop;
                    
                        document.addEventListener("scroll", function () {
                            var afterPosition = document.documentElement.scrollTop;
                    
                            if (afterPosition > 50) {
                            if (beforePosition < afterPosition) {
                                // 스크롤 위로
                                inner.style.backgroundSize = "120%";
                            } else {
                                // 스크롤 아래로
                                inner.style.backgroundSize = "95%";
                            }
                            } else {
                            // 평상 시
                            inner.style.backgroundSize = "100%";
                            }
                            beforePosition = afterPosition;
                        });
                    }
                }
            }
            else if(divid_sub=="ac") {
                if(soundgramApi.diskid=="p0700") {
                    $("div.credit").empty();
                    $("div.credit").html(soundgramApi.album_credit_info);
                }
                
                $("div.credit").removeClass("hidden");
                if(album_type=="p") list_effect("credit");
            }
        },effect_timer);

        var loading_clear = window.setTimeout(function() {
            window.clearTimeout(loading_clear);
            // $("div#"+divid).loadingView({'state':false});
        },effect_timer);
    }
    else {
        if(soundgramApi.diskid.substring(0,1)=="p") {
            $("div.page_title > h1").addClass("hidden");
            $("div.list_albumcover").addClass("hidden");
            $("div.list_albuminfo").hide();

            first_loading_animate();
        }
    }
}

function pageTitleEffect(type) {
    var time = 0;
    var al = "";
    for(var i=0; i<soundgramApi.albumdiv.length;i++) {
        var lm = soundgramApi.albumdiv[i].substring(0,2);
        if(lm=="al") {
            al = soundgramApi.albumdiv[i];
        }
    }

    if(type==al) {
        ptEffect2(type);
        ptEffect1(type);
    }
    else {
        ptEffect1(type);
    }
}

function ptEffect1(type) {
    var titleimg = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/"+type+"_img_title.png";
    
    $("div#"+type+" > div.page_title > h1 > img").attr("src",titleimg);
    $("div#"+type+" > div.page_title > h1").css({
        "animation": "topFadeIn 0.5s",
        "animation-fill-mode": "both",
        "-webkit-animation": "topFadeIn 0.5s",
        "-webkit-animation-fill-mode": "both",
        "-webkit-animation-delay": "0.5s",
        "-webkit-animation-duration": "0.7s"
    });
    $("div#"+type+" > div.page_title > h1").removeClass("hidden");
}

function ptEffect2(type) {
    $("div#"+type+" > div.page_title > div.list_albumcover").removeClass("hidden");
    $("div#"+type+" > div.page_title > div.list_albumcover").css({
        "animation": "topFadeIn 0.4s",
        "animation-fill-mode": "both",
        "-webkit-animation": "topFadeIn 0.4s",
        "-webkit-animation-fill-mode": "both",
        "-webkit-animation-delay": "0.4s",
        "-webkit-animation-duration": "0.6s"
    });

    $("div#"+type+" > div.page_title > div.list_albuminfo").show();
    $("div#"+type+" > div.page_title > div.list_albuminfo").css({
        "animation": "topFadeIn 0.4s",
        "animation-fill-mode": "both",
        "-webkit-animation": "topFadeIn 0.4s",
        "-webkit-animation-fill-mode": "both",
        "-webkit-animation-delay": "0.4s",
        "-webkit-animation-duration": "0.6s"
    });
}

// function ptEffectDel(idx) {
//     $("div#swipe > div").eq(idx).find("h1").css({"animation":""});
//     if(idx==1) {
//         $("div#playlist > div.page_title > div.list_albumcover").css({"animation":""});
//         $("div#playlist > div.page_title > div.list_albuminfo").css({"animation":""});
//         $("ul.songlist > li").each(function(idx) {
//             $("ul.songlist > li").eq(idx).css({"animation":""});
//         });
//         $("div.vertical_playlist").addClass("hidden");
//     }
//     else if(idx==2) {
//         $("div#booklet_img_list li").each(function(idx) {
//             $(this).css({"animation":""});
//         });
//         $("div.booklet_img").addClass("hidden");
//     }
//     else if(idx==3) {
//         $("div#video_list li").each(function(idx) {
//             $(this).css({"animation":""});
//         });
//         $("div.video").addClass("hidden");
//     }
//     else if(idx==4) {
//         $("div#thanks_list li").each(function(idx) {
//             $(this).css({"animation":""});
//         });
//         $("div.thanks").addClass("hidden");
//     }
// }

function ptEffectDel(divid) {
    var divid_sub = divid.substring(0,2);
    if(divid_sub=="aa" || divid_sub=="ab" || divid_sub=="ac") {
        $("div#swipe > div#"+divid+" > div:nth-child(2)").css({"animation":""});
        $("div#swipe > div#"+divid+" > div:nth-child(2)").addClass("hidden");
    }
    else {
        $("div#swipe > div#"+divid).find("h1").css({"animation":""});

        if(divid_sub=="al") {
            $("div#playlist > div.page_title > div.list_albumcover").css({"animation":""});
            $("div#playlist > div.page_title > div.list_albuminfo").css({"animation":""});
            $("ul.songlist > li").each(function(idx) {
                $("ul.songlist > li").eq(idx).css({"animation":""});
            });
            $("div.vertical_playlist").addClass("hidden");
        }
        else if(divid_sub=="bo") {
            $("div#booklet_img_list li").each(function(idx) {
                $(this).css({"animation":""});
            });
            $("div.booklet_img").addClass("hidden");
        }
        else if(divid_sub=="vi") {
            $("div#video_list li").each(function(idx) {
                $(this).css({"animation":""});
            });
            $("div.video").addClass("hidden");
        }
        else if(divid_sub=="th") {
            $("div#thanks_list li").each(function(idx) {
                $(this).css({"animation":""});
            });
            $("div.thanks").addClass("hidden");
        }
    }
}

function resizePlaylist() {
    $("ul.songlist > li").each(function(idx) {
        // console.log($("ul.songlist > li").eq(idx).outerHeight(true));
        $("ul.songlist > li").eq(idx).height($("ul.songlist > li").eq(idx).height());
        if(idx==$("ul.songlist > li").length-1) {
            $("ul.songlist > li").eq(idx).height($("ul.songlist > li").eq(idx).height()*3);
        }
    });
}

var playlist_swiper;
function vertical_playlist() {
    playlist_swiper = new Swiper('.vertical_playlist', {
        direction: 'vertical',
        freeMode: true,
        // freeModeSticky: true,
        // keyboardControl: true,
        // preloadImages: true,
        slidesPerView: 'auto',
        // lazyLoading: true,
        preventClicks: true,
        preventClicksPropagation: true,
        speed: 500,
        scrollbar :
        {
            el: '.playlist_scollbar',
            hide: true,
            dragSize: 'auto',
        },
        on :
        {
            init: function() {
                resizePlaylist();
            }
        },
    });

    // playlist_swiper.allowTouchMove(touch);

    playlist_swiper.update();
    playlist_swiper.on("click", function() {
        playlist_swiper.on("touchMove", function() {
            return false;
        });

        if(event.target.parentElement.nodeName=="A") {
            return false;
        }

        var etp = event.target.parentElement;
        var et = event.target;
        // if(event.target.nodeName=="DIV" || event.target.nodeName=="SPAN") {
        if($(etp).attr("id")=="songlike_playlist" || $(et).attr("id")=="songlike_playlist") {
            var element = event.target.parentElement;
            var idx = parseInt($(element).attr("value2"))-1;
            if($(et).attr("id")=="songlike_playlist") {
                idx = parseInt($(et).attr("value2"))-1;
            }

            if(soundgramApi.loginoutflag=="1") {
                change_like("songlist", idx);
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
        else {
            var valueofclick = $(event.target).attr("value");
            
            if(typeof(valueofclick)!="undefined") {
                // 아이폰일때..
                if(soundgramApi.ostype==2) {
                    var song = {
                        'songIndex':valueofclick.split("|")[0]
                    }

                    window.webkit.messageHandlers.SoundgramPlayer.postMessage(song);
                }
                // 안드로이드일때..
                else {
                    open_play(valueofclick);
                }
            }
        }

        if(event.target.id=="albuminfo") {
            $("span#openleftmenu").hide();
            $("div#swipe > div").addClass("hidden");
            $("div#album_introd").removeClass("hidden");
            $("div#album_introd").css({
                "animation": "topFadeIn 0.5s",
                "animation-fill-mode": "both",
                "-webkit-animation": "topFadeIn 0.5s",
                "-webkit-animation-fill-mode": "both",
                "-webkit-animation-delay": "0.5s",
                "-webkit-animation-duration": "0.7s"
            });
        }
    });

    $("div.playlist_scollbar").removeClass("hidden");
    playlist_swiper.scrollbar.updateSize();
}

var Booklet_totalHeight = 0;
function resizeBookletSwiper() {
    // var totalHeight = 0;
    // $("div#booklet_img_list > li").each(function(idx) {
    //     $("div#booklet_img_list > li").eq(idx).height($("div#booklet_img_list > li").eq(idx).children("img").height());
    //     // if(idx==$("div#booklet_img_list > li").length-1) {
    //     //     var org_h = $("div#booklet_img_list > li").eq(idx).children("img").height();
    //     //     var new_h = org_h + (org_h/5);

    //     //     // alert(idx+" : "+org_h+" / "+new_h);
    //     //     $("div#booklet_img_list > li").eq(idx).height(new_h);
    //     // }
    // });

    var org_h = $("div#booklet_img_list > li:last-child").children("img").height();
    var new_h = org_h + (org_h/5);
    
    $("div#booklet_img_list li:last-child").height(new_h);
}

var vbooklet_swiper = "";
function vertical_booklet() {
    vbooklet_swiper = new Swiper ('.vertical_booklet', {
        direction: 'vertical',
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
        // freeModeSticky: true,
        spaceBetween: 10,
        // initialSlide : 0,
        slidesPerView:'auto',
        setWrapperSize: true,
        // threshold:100,
        // watchSlidesVisibility: true,
        // touchMoveStopPropagation: true,
        preventClicks: true,
        preventClicksPropagation: true,
        autoHeight: true,
        observer: true,
        observerParents: true,
        // initialSlide : idx,
        speed: 500,
        zoom: false,
        on : 
        {
            init: function() {
                console.log("initialized!");
                // resizeBookletSwiper();
            },
            imagesReady: function (swiper) {
                console.log("images ready!");
                // resizeBookletSwiper();
                // resize();

                goAuthNext();
            },
        },
        scrollbar : 
        {
            el: '.booklet_scollbar',
            hide: true,
            dragSize: 'auto',
        },
    });

    vbooklet_swiper.update();

    vbooklet_swiper.on("click", function() {
        vbooklet_swiper.on("touchMove", function() {
            return false;
        });

        var sUrl = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid;
        $("div.bok_toolbar > img").attr("src", sUrl+"/images/"+soundgramApi.infomation+"_btn_close.png");

        // effect("div.boklet_inner_popup");
        $("div.all_boklet_pop").show();

        // console.log(this.activeIndex);
        // booklet_detail_swiper($(e.target.parentElement).index());
        booklet_detail_swiper(this.clickedIndex);
    });
    // .on("touchMove", function(e) {
    //     // console.log($("div#booklet_img_list").position().top);
    //     var bil = $("div#booklet_img_list").position().top;
    //     var titleHeight = 232;
    //     console.log(titleHeight+bil);
    //     if((titleHeight+bil)>=62) {
    //         titleHeight = titleHeight+bil;
    //         $("div#booklet_pagetitle").css({"height":titleHeight});
    //     }
    // });

    $("div.booklet_scollbar").removeClass("hidden");
    vbooklet_swiper.scrollbar.updateSize();
}

var bd_swiper = "";
function booklet_detail_swiper(idx) {
    bd_swiper = new Swiper('.boklet_popup_imgarea', {
        preloadImages: true,
        // lazyLoading: true,
        centeredSlides: true,
        // slidesPerView: 'auto',
        initialSlide : idx,
        speed: 500,
        spaceBetween : 20,
        loop: true,
        preventClicks: true,
        preventClicksPropagation: true,
        // zoom: {
        //     maxRatio: 5,
        // },
        zoom:true,
        on: {
            init: function() {}
        }
    });
}

function resizeVideoListSwiper() {
    if($("div#video_list > li").length<4) {
        $("div.video").css({"height":"80%"})
    }

    $("div#video_list > li").each(function(idx) {
        $("div#video_list > li").eq(idx).height($("div#video_list > li").eq(idx).children("div").height());
        $("div#video_list > li").eq(idx).children("div.videolist").children("h3#vlist1").css({"width":$("div#video_list > li").eq(idx).width()+"px"});

        if(idx==$("div#video_list > li").length-1) {
            // $("div#video_list li:last-child").height($("div#video_list li:last-child").height()*3);

            // console.log($("div.video").height());
        }
    });

    // $("div#video_list li:last-child").height($("div#video_list li:last-child").height()+150);
}

var videocomment = "";
var pausebtn_click = false;
var vlist_swiper;
var vvc_onoff = false;
var videoPlay = "";
function vertical_video() {
    $("div.video_scollbar").removeClass("hidden");
    vlist_swiper = new Swiper('.vertical_video', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // freeModeSticky: true,
        autoHeight: true,
        roundLengths: true,
        // spaceBetween : 30,
        preventClicks: true,
        preventClicksPropagation: true,
        scrollbar :
        {
            el: '.video_scollbar',
            hide: true,
            dragSize: 'auto',
        },
        on: {
            init: function() {
                // resizeVideoListSwiper();
            },
            reachEnd: function () {
                vlist_swiper.mousewheel.disable();
            }
        }
    });

    vlist_swiper.update();
    vlist_swiper.on("click", function() {
        // vlist_swiper.on("touchMove", function() {
        //     return false;
        // });

        if(event.target.nodeName=="SPAN" || event.target.nodeName=="A" || event.target.nodeName=="DD") {
            if(typeof $(event.target).attr("id")=="undefined" || $(event.target).attr("id")=="videoReplyCount") {
                return false;
            }

            var id = $(event.target).attr("value");
            // change_videolike(id);

            if(soundgramApi.loginoutflag=="1") {
                change_videolike(id);
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
        // 비디오 코멘트 열때(비디오 Start)
        else if(event.target.id=="vlist1" || event.target.id=="vlist2" || event.target.id=="vlist3") {
            // if(!vvc_onoff) {
            //     vvc_onoff = true;
            // }
            // else {
            //     return false;
            // }
            
            $("div#"+soundgramApi.videoPopup).removeClass("hidden");
            
            var sUrl = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid;
            $("div.vc_toolbar > img").attr("src", sUrl+"/images/"+soundgramApi.infomation+"_btn_close.png");

            $("div#vclist").children().remove();
            $("div#vclist").empty();

            var id = $(event.target).attr("value");
            var videoid = $(event.target).attr("value2");
            var videoCommentLikeCnt = $(event.target).attr("value3");

            videoCommentListToolbarMake(id, videoid, videoCommentLikeCnt);
            videoCommentListSetting(false, id, videoid, "comment_time");
            // Soundgram.addView(id, "0", "0", videoid, videoCommentLikeCnt);

            // window.clearTimeout(videocomment);
            // videocomment = window.setTimeout(function() {
            //     videoCommentOrderSetting("0", id, videoid, videoCommentLikeCnt);
            // }, 1000);

            

            // 음악 재생중이면 음악 재생중지하고 유튜브 재생
            if(soundgramApi.ostype=="2") {
                window.webkit.messageHandlers.SoundgramVideo.postMessage("videoStart");
            }
            else {
                var musicPlayer = document.getElementById("playMusic");
                if(!musicPlayer.paused) {
                    pausebtn_click = false;

                    $("button.pl_pause").click();
                    
                    // $("button.pl_pause").attr("class","pl_play");
                    // $("button.m_pl_pausebtn").attr("class","m_pl_playbtn");
                    // musicPlayer.pause();
                }
            }

//             $("#player").hide();
//             videoPlay = window.setTimeout(function() {
//                 window.clearTimeout(videoPlay);
//                 // vvc_onoff = false;
// //                $("#player").attr("src", $("#player").attr("src").replace("CUSTOM_ID", videoid));
//                 player.loadVideoById(videoid);
//             }, 1000);

//             player.addEventListener("onStateChange", function(event) {
//                 if(event.data==YT.PlayerState.ENDED) {
//                     $("#player").show();
//                     player.loadVideoById(videoid);
//                 }
//             });
            
            $("div.video_area").empty();
            $("div.video_area").append("<div id='player'><iframe width='100%' height='100%' src='https://www.youtube.com/embed/"+videoid+"' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>");
            
            // var HTML = "<div id='bgndVideo' class='player' data-property={videoURL:'http://youtu.be/"+videoid+"',containment:'div.video_area'}></div>";
            // $("div.video_area").append(HTML);

            // $("#bgndVideo").YTPlayer();
        }
    });

    $("div.video_scollbar").removeClass("hidden");
    vlist_swiper.scrollbar.updateSize();
}

var vvc_swiper = "";
function vertical_videocomment() {
    $("div#vclist > li").each(function(idx) {
        if(idx>0) {
            $("div#vclist > li").eq(idx).height($("div#vclist > li").eq(idx).children("div").outerHeight(true));
        }
    });

    $("div#vclist > li").eq(0).height($("div#vclist > li").eq(0).outerHeight(true));
    
    if($("div#vclist > li").length>2) {
        $("div#vclist li:last-child").height($("div#vclist li:last-child").height()+100);
    }
    
    vvc_swiper = new Swiper ('.vvc_swiper', {
        direction: 'vertical',
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
        slidesPerView: 'auto',
        preventClicks: true,
        preventClicksPropagation: true,
//        lazyLoading: true,
        // setWrapperSize: true,
        speed: 500,
        scrollbar : 
        {
            el: '.videocomment_scollbar',
            hide: true,
            dragSize: 'auto',
//            draggable: false,
        },
    });

    vvc_swiper.on("click", function() {
        if($("div.review_write").is(":visible")) {
            if(!$(event.target).hasClass("review_write")) { 
                WriteButtonClear(soundgramApi.videoPopup);       
            }
        }

        var ptarget = $(event.target).parent();
        var id = $("div.video_title").attr("value");
        var videoid = $("div.video_title").attr("value2");
        var album_type = soundgramApi.diskid.substring(0,1);

        if(ptarget.attr("id")=="vlike_a" || ptarget.attr("id")=="vlike_dd") {
            // change_videolike(id);
            if(soundgramApi.loginoutflag=="1") {
                change_videolike(id);
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
        else if(ptarget.attr("id")=="vclike_a" || ptarget.attr("id")=="videoCommentLikeCnt") {
            // change_videocommentlike($(event.target).attr("value"));
            if(soundgramApi.loginoutflag=="1") {
                change_videocommentlike($(event.target).attr("value"));
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
        else if(ptarget.attr("class")=="review_toolbar") {
            var target = $(event.target).attr("id");
            // if(target!="newest" || target!="recomm") {
            if(typeof target=="undefined") {
                if(soundgramApi.loginoutflag=="0") {
                    var sl = window.setTimeout(function() {
                        window.clearTimeout(sl);
                        // if(confirm("로그인이 필요한 서비스입니다.\n로그인을 하시겠습니까?")==true) {
                        //     goLoginPage();
                        // }
                        // else {
                        //     return;
                        // }
                        
                        showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
                    }, 300);
                }
                else {
                    var id = ptarget.attr("value");
                    $("div#"+soundgramApi.videoPopup).append(WriteButtonMake(id, "video"));

                    var _wb = window.setInterval(function (){
                        if($("div.review_write").is(":visible")) {
                            window.clearInterval(_wb);

                            $("div.review_write").find("#contents").click();
                            $("div.review_write").find("#contents").focus().select();
                        }
                    },100);
                    
                }
            }
            else {
                // var vco = window.setTimeout(function() {
                //     window.clearTimeout(vco);
                vvc_swiper.destroy();
                $("div.vvc_swiper").css({"width":"100%", "height":"70%"});
                $("div#vclist li").each(function(idx) {
                    if(idx>0) {
                        $(this).remove();
                    }
                });

                var album_type = soundgramApi.diskid.substring(0,1);
                var value = jQuery.param({"type":"video", "id":id, "albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});
                $.ajax({
                    type : "POST",
                    url : "api/comment_info.php",
                    data : value,
                    dataType: "json",
                    timeout       : 3000,
                    retries       : 5,     //       <-------- Optional
                    retryInterval : 3000,   //       <-------- Optional
                    success: function(data) {
                        // var title = data[0].title;
                        // var viewCount = data[0].viewCount;
                        // var rv_id = data[0].rv_id;
                        // var videoLikeCount = data[0].videoLikeCount;
                        // var videoReplyCnt = data[0].videoReplyCnt;
                        // var vlonoff = data[0].likeonoff;

                        // $("div.review_toolbar").attr("value", id);
                        // $("div.review_toolbar").attr("value2", videoid);
                        // $("div.video_title > h3").text(title);
                        // $("div.video_title > dd.no_view").html("조회수 "+likecnt_change(viewCount));
                        // $("div#video_list > li").each(function(index) {
                        //     if($("div#video_list > li").eq(index).attr("value")==rv_id) {
                        //         $("div#video_list > li").eq(index).find(".no_view").html("조회수 "+likecnt_change(viewCount));
                        //     }
                        // });

                        // var videolikeonoff = "off";
                        // if(vlonoff>0) videolikeonoff = "on";
                        // $("div.video_title > a > dd.no_like").html("<span class='"+videolikeonoff+"'></span>"+likecnt_change(videoLikeCount));
                        // $("div#"+soundgramApi.videoPopup).val(rv_id);
                        // $("div.review_toolbar").attr("value", rv_id);

                        vclistdata = data;
                        vclistdata.splice(0,1);
                        
                        if(target=="recomm") {
                            $("div#video_toolbar > span#newest").css({"display":"inline-block"});
                            $("div#video_toolbar > span#recomm").css({"display":""});
                            
                            $("div#video_toolbar > span#newest").removeClass("toolbar_select");
                            $("div#video_toolbar > span#recomm").addClass("toolbar_select");

                            vclistdata.sort(function(a,b) {
                                return parseInt(a.likeCount) < parseInt(b.likeCount) ? 1 : -1;
                            });
                        }
                        else {
                            $("div#video_toolbar > span#recomm").css({"display":"inline-block"});
                            $("div#video_toolbar > span#newest").css({"display":""});
                            
                            $("div#video_toolbar > span#recomm").removeClass("toolbar_select");
                            $("div#video_toolbar > span#newest").addClass("toolbar_select");

                            vclistdata.sort(function(a,b) {
                                return a.org_comment_time < b.org_comment_time ? 1 : -1;
                            });
                        }

                        $.each(vclistdata, function(al) {
                            var makeListHTML = makeHTML(album_type, "vclist", vclistdata[al], soundgramApi.artistname);
                            $("div#vclist").append(makeListHTML);
                        });
                        
                        var vclistInterval = window.setInterval(function() {
                            if(vclistdata.length == $("div#vclist > li").length-1) {
                                window.clearInterval(vclistInterval);
                                videoCommentOrderChange(0);
                            }
                        }, 100);
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
        }
        else if($(event.target).attr("class")=="rv_imgbox") {
            $("div#rv_detail_zoom > img").attr("src","");
            $("div#rv_detail_zoom > img").attr("src", $(event.target).css("background-image").slice(4, -1).replace(/"/g, ""));
            reimg_detail_swiper();

            $("div.all_review_pop").show();
            // effect("div.rv_inner_popup");
        }
    });

    vvc_swiper.update();
}

var imgd_swiper = "";
function reimg_detail_swiper() {
    imgd_swiper = new Swiper('.rv_popup_imgarea', {
        preloadImages: true,
        lazyLoading: true,
        centeredSlides: true,
        // slidesPerView: 'auto',
        // initialSlide : idx,
        speed: 500,
        spaceBetween : 20,
        zoom: {
            maxRatio: 5,
        },
        on: {
            init: function() {}
        }
    });
}

function resizeVBSwiper() {
    var totalHeight = 0;
    $("div.gallary > div.video").each(function(idx) {
        $("div.gallary > div.video").eq(idx).height($("div.gallary > div.video").eq(idx).children("h3").height() + $("div.gallary > div.video").eq(idx).children("div").height());
    });

    $("div.gallary > div.booklet").each(function(idx) {
        $("div.gallary > div.booklet").eq(idx).height($("div.gallary > div.booklet").eq(idx).children("img").outerHeight(true));
    });

    $("div.gallary > div:last-child").height($("div.gallary > div:last-child").height()+180);

    window.setTimeout(function() {
        $("div.gallary > div.video").eq($("div.gallary > div.video").length-1).css({"margin-bottom":"20px"});
    },1000);
}

var vvb_swiper = "";
function vertical_vb() {
    vvb_swiper = new Swiper ('.vertical_vb', {
        direction: 'vertical',
        preloadImages: true,
        freeMode: true,
        // freeModeSticky: true,
        spaceBetween: 10,
        // initialSlide : 0,
        slidesPerView:'auto',
        // setWrapperSize: true,
        preventClicks: true,
        preventClicksPropagation: true,
        roundLengths: true,
        // autoHeight: true,
        speed: 500,
        scrollbar : 
        {
            el: '.vb_scollbar',
            hide: true,
            dragSize: 'auto',
        },
        on : 
        {
            init: function () {
                resizeVBSwiper();
                // resize();
            },
        },
    });

    vvb_swiper.update();
    vvb_swiper.on("click", function() {
        var album_type = soundgramApi.diskid.substring(0,1);

        vvb_swiper.on("touchMove", function() {
            return false;
        });

        
        if(event.target.id=="vlist1" || event.target.id=="vlist2" || event.target.id=="vlist3" || event.target.id=="vlist4") {
            var id = $(event.target).attr("value");
            var videoid = $(event.target).attr("value2");
            
            // 음악 재생중이면 음악 재생중지하고 유튜브 재생
            var musicPlayer = document.getElementById("playMusic");
            if(!musicPlayer.paused) {
                pausebtn_click = false;
                
                $("button.pl_pause").attr("class","pl_play");

                if(soundgramApi.ostype==1) {
                    musicPlayer.pause();
                }
            }

            // player.loadVideoById(videoid);
            // player.addEventListener("onStateChange", function(event) {
            //     if(event.data==YT.PlayerState.ENDED) {
            //         player.loadVideoById(videoid);
            //     }
            // });

            var sUrl = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid;
            $("div.vid_toolbar > img").attr("src", sUrl+"/images/"+soundgramApi.infomation+"_btn_close.png");

            // var videoPlay = window.setTimeout(function() {
            //     window.clearTimeout(videoPlay);
                $("div.all_video_pop").show();
            // }, 1000);

            // Soundgram.youtube(videoid);
        }
        else {
            $("div.all_boklet_pop").show();
            
            var sUrl = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid;
            // $("div.bok_toolbar > img").attr("src", sUrl+"/images/in01_btn_close.png");

            if(album_type=="p") $("div.bok_toolbar > img").attr("src", sUrl+"/images/"+soundgramApi.lmortab+"_btn_close.png");
            else $("div.bok_toolbar > img").attr("src", sUrl+"/images/"+soundgramApi.infomation+"_btn_close.png");

            booklet_detail_swiper($(event.target.parentElement).index()-$("div.gallary > div.video").length);
            // effect("div.boklet_inner_popup");
        }
    });

    $("div.vb_scollbar").removeClass("hidden");
    vvb_swiper.scrollbar.updateSize();
}

function resizeThanksSwiper() {
    $("div#thanks_list > li").each(function(idx) {
//        $("div#thanks_list > li").eq(idx).height($("div#thanks_list > li").eq(idx).children("div").height());

        var totalHeight = 0;
        $("div#thanks_list > li").eq(idx).children().children(":not(:hidden)").each(function() {
            totalHeight = totalHeight + $(this).outerHeight(true);
        });
        $("div#thanks_list > li").eq(idx).height(totalHeight);

        if(idx==$("div#thanks_list > li").length-1) {
            $("div#thanks_list > li").eq(idx).height($("div#thanks_list > li").eq(idx).height()+100);
        }
    });
}

var thanks_swiper;
function vertical_thanksto() {
    $("div.thanks_scollbar").removeClass("hidden");
    thanks_swiper = new Swiper('.vertical_thanksto', {
        direction: 'vertical',
        slidesPerView:'auto',
        spaceBetween: 10,
        freeMode: true,
        preventClicks: true,
        preventClicksPropagation: true,
        // setWrapperSize: true,
        roundLengths: true,
        scrollbar : 
        {
            el: '.thanks_scollbar',
            hide: true,
        },
        on: {
            init: function() {
                resizeThanksSwiper();
            }
        }
    });

    thanks_swiper.update();
//    thanks_swiper.scrollbar.updateSize();

    thanks_swiper.on("click", function() {
        if(event.target.className=="more") {
            $(event.target).attr("class","thk_close");
            var idx = $(event.target.parentElement.parentElement).index();

            $("div#thanks_list > li").eq(idx).find("#toggle_text").css({"display":"none"});
            $("div#thanks_list > li").eq(idx).find("#toggle_text1").css({"display":"block"});
        }
        else if(event.target.className=="thk_close") {
            $(event.target).attr("class","more");
            var idx = $(event.target.parentElement.parentElement).index();

            $("div#thanks_list > li").eq(idx).find("#toggle_text1").css({"display":"none"});
            $("div#thanks_list > li").eq(idx).find("#toggle_text").css({"display":"block"});
        }
        else if(event.target.className=="btn_tmf" || event.target.className=="img_tmf") {
            var photo = $(event.target).attr("photo");
            var author = $(event.target).attr("author");
            var fanmessage = $(event.target).attr("fm");
            var tmf_path = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/to_my_fan.png";
            var tmf_sign = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/tmf_sign_01.png";
            
            $("div.tmf_header > h2").text(author);
            $("div.tmf_txt > p").html(fanmessage);
            $("span.tmf_icon > img").attr("src",tmf_path);
            $("div.tmf_sign > img").attr("src",tmf_sign);
            $("div.tmf_profile").css({"background-image":"url('media/album/"+soundgramApi.albumid+"/"+photo+"')"});
        }

        resizeThanksSwiper();
        thanks_swiper.update();
//        thanks_swiper.scrollbar.updateSize();
    });

    $("div.thanks_scollbar").removeClass("hidden");
    thanks_swiper.scrollbar.updateSize();
}

function setContainerHeight (source, target, multiplier) {
    target.height( source.height() * multiplier );
}

var leftmenuSwiper = "";
function leftmenuSwiperSetting(idx) {
    soundgramApi.leftmenuon=true;
    soundgramApi.lmactiveIndex = idx;
    leftmenuSwiper = new Swiper('.leftmenu_horizontal_swiper', {
        // Disable preloading of all images
        preloadImages: true,
        // Enable lazy loading
        lazyLoading: true,
        speed : 500,
        initialSlide : idx,
        noSwipingClass: "sns_list",
        on : 
        {
            init : function() {
                $("ul.sns_list > a").each(function(idx) {
                    if(idx%2) {
                        $("ul.sns_list > a").eq(idx).children("div").attr("class","style_b");
                    }

                    if(idx==$("ul.sns_list > a").length-1) {
                        $("ul.sns_list > a").eq(idx).children("div").removeClass("mg_zero");
                        $("ul.sns_list > a").eq(idx).children("div").addClass("mg_zero");   
                    }
                });
            }
        }
    });

    leftmenuSwiper.on("touchMove", function(e) {
        // 댓글관련 하단 팝업이 떠있을 경우 히든처리
        if($("div#addtionmenu").is(":visible")) {
            $("div#addtionmenu").hide();
        }

        // 신고하기 팝업이 떠있을 경우 히든처리
        if($("div#report_popup").is(":visible")) {
            $("div#report_popup").hide();
        }
    });

    leftmenuSwiper.on("slideChange", function(e) {
        // 댓글관련 하단 팝업이 떠있을 경우 히든처리
        if($("div#addtionmenu").is(":visible")) {
            $("div#addtionmenu").hide();
        }

        // 신고하기 팝업이 떠있을 경우 히든처리
        if($("div#report_popup").is(":visible")) {
            $("div#report_popup").hide();
        }

        $("ul.menu_main > a").each(function(i) {
            $("ul.menu_main > a").eq(i).children("li").attr("class","");
        });

        $("ul.menu_sub > li").each(function() {
            $(this).attr("class", $(this).attr("class").replace("_over",""));
        });

        $("ul.menu_sub > li[class*=over_s]").removeClass("over_s");
        
        $("ul.menu_sub > li").eq(this.activeIndex).attr("class", $("ul.menu_sub > li").eq(this.activeIndex).attr("class").replace($("ul.menu_sub > li").eq(this.activeIndex).attr("class"),$("ul.menu_sub > li").eq(this.activeIndex).attr("class")+"_over"));
        $("ul.menu_sub > li").eq(this.activeIndex).addClass("over_s");
        var li_id = $("ul.menu_sub > li[class*=over_s]").attr("id");
        var rv = "";
        for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
            var lm = soundgramApi.leftmenudiv[i].substring(0,2);
            if(lm=="rv") {
                rv = soundgramApi.leftmenudiv[i];
            }
        }

        if($("div#"+rv+" > div.review_write").is(":visible")) {
            WriteButtonClear(rv);
        }

        if(li_id=="me_sc") {
            // $("ul.menu_sub > li").eq(0).attr("class","sub_01 over_s");
            if($("div#schedulelist > li").length>0) {
                if($("div#schedulelist > li").eq(0).children("div").attr("class")=="empty") ;
                else {
                    schedule_swiper.destory(true,false);
                    $("div#schedulelist").empty();
                    $("div.sche_list").empty();
                }
            }

            var value = jQuery.param({"albumid":soundgramApi.albumid});
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

                    var _t = 1;
                    if(data.length>0) {
                        _t = 1000;
                    }

                    var _np = window.setTimeout(function() {
                        window.clearTimeout(_np);
                        schedule_vertical();
                    },_t);
                }, 
                error: function(xhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
        else if(li_id=="me_sn") {
            // $("ul.menu_sub > li").eq(1).attr("class","sub_02 over_s");

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
                        leftmenuswipe_onoff("show");
                        if(typeof sns_swiper=="undefined" || sns_swiper==null) {
                            // sns_swiper_setting();
                            snsSwiperSetting();
                        }
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }
            
            $("ul.sns_list > a").each(function(idx) {
                if(idx%2) {
                    $("ul.sns_list > a").eq(idx).children("div").attr("class","style_b");
                }

                if(idx==$("ul.sns_list > a").length-1) {
                    $("ul.sns_list > a").eq(idx).children("div").removeClass("mg_zero");
                    $("ul.sns_list > a").eq(idx).children("div").addClass("mg_zero");   
                }
            });

            reviewClose();
        }
        else if(li_id=="me_rv") {
            // $("ul.menu_sub > li").eq(2).attr("class","sub_03 over_s");
            // if($("div.review").children().length==0) {
                // console.log(soundgramApi.user_id+"/"+soundgramApi.device_id);
                if($("div.review_info_btnbox").is(":visible")) {
                    goReview();
                }
                else {
                    goReviewComment();
                }
            // }
            // else {
            //     reviewClose();
            //     reviewTitleScrollEffect("280", "51%", "66px", "remove");
            //     leftmenuswipe_onoff("show");
            // }
        }
    });
}

var player_swiper;
function player_vertical() {
    var album_type = soundgramApi.diskid.substring(0,1); // p:프리미엄, s:스탠다드
    if(album_type=="p") {
        player_swiper = new Swiper('.player_swiper', {
            direction: 'vertical',
            // lazy: true,
            preloadImages: true,
            updateOnImagesReady: true,
            // lazyLoading: true,
            centeredSlides: true,
            slidesPerView: '1',
            speed : 500,
            loop: true,
            imagesReady: function (swiper) {
                console.log("images ready!");
                // resizeBookletSwiper();
                // resize();
                
            },
            // pagination: {
            //     el: '.player_pagination',
            //     clickable: false,
            // },
        });
    }
    else {
        player_swiper = new Swiper('.player_swiper', {
            direction: 'vertical',
            preloadImages: true,
            lazyLoading: true,
            centeredSlides: true,
            slidesPerView: '1',
            // spaceBetween: 10,
            speed : 500,
            loop: true,
        });
    }

    player_swiper.on("slideNextTransitionEnd", function() {
        clickNextPlay("swiper", this.activeIndex);
    });

    player_swiper.on("slidePrevTransitionEnd", function() {
        clickPrevPlay("swiper", this.activeIndex);
    });

    if(album_type=="p") player_swiper.pagination.update();
    player_swiper.update();
}

var ali_swiper;
function ali_vertical() {
    ali_swiper = new Swiper('.ali_swiper', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        on: {
            init : function() {
                var totalHeight = $("div.thanks_contants > p").outerHeight(true);
                $("div#ali-wrapper > div").height(totalHeight);
            }
        }
    });

    ali_swiper.update();
}

var sthanksto_swiper;
function sthanksto_vertical() {
    sthanksto_swiper = new Swiper('.sthanksto_swiper', {
        direction: 'vertical',
        slidesPerView: '1',
        freeMode: true,
        on: {
            init : function() {
                var totalHeight = $("div#sthanksto-wrapper > div > p").outerHeight(true);
                $("div#sthanksto-wrapper > div").height(totalHeight*1.6);
            }
        }
    });

    // sthanksto_swiper.update();
}

function resizeThanksSwiper() {
    $("div#thanks_list > li").each(function(idx) {
//        $("div#thanks_list > li").eq(idx).height($("div#thanks_list > li").eq(idx).children("div").height());

        var totalHeight = 0;
        $("div#thanks_list > li").eq(idx).children().children(":not(:hidden)").each(function() {
            totalHeight = totalHeight + $(this).outerHeight(true);
        });
        $("div#thanks_list > li").eq(idx).height(totalHeight);
    });

    $("div#thanks_list li:last-child").height($("div#thanks_list li:last-child").height()+100);
}

function resizeScheduleSwiper() {
    $("div#schedulelist > li").each(function(idx) {
        $("div#schedulelist > li").eq(idx).height($("div#schedulelist > li").eq(idx).children("div").outerHeight(true));
    });

   $("div#schedulelist li:last-child").height($("div#schedulelist li:last-child").height()*2);
}

var schedule_swiper = null;
function schedule_vertical() {
    schedule_swiper = new Swiper('.schedule_swiper', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // setWrapperSize: true,
        // loop:true,
        scrollbar : 
        {
            el: '.schedulelist_scollbar',
            hide: true,
        },
        on: {
            init: function() {
                resizeScheduleSwiper();
            }
        }
    });

    schedule_swiper.update();
}

function resizeSnsSwiper(direction) {
    if(direction=="horizontal") {
        $("div#snslist > div").each(function(idx) {
            // console.log($("div#snslist > span").eq(idx).children("a").children("img").outerWidth(true));
            $("div#snslist > div").eq(idx).width($("div#snslist > div").eq(idx).children("a").children("img").outerWidth(true));
        });
    }
    else {
        var sl = window.setInterval(function() {
            if($("div#snslist > li").length>0) {
                window.clearInterval(sl);

                $("div#snslist > li").each(function(idx) {
                    $("div#snslist > li").eq(idx).height($("div#snslist > li").eq(idx).children("a").children("div").outerHeight(true));
                });
            
                $("div#snslist li:last-child").height($("div#snslist li:last-child").height()*2);
            }
        }, 100);
    }
}
var sns_swiper = null;
function sns_swiper_setting(swiperClass, dir) {
    sns_swiper = new Swiper(swiperClass, {
        direction: dir,
        slidesPerView: 'auto',
        freeMode: true,
        // setWrapperSize: true,
        // loop:true,
        scrollbar : 
        {
            el: '.sns_scollbar',
            hide: true,
        },
        on: {
            init: function() {
                resizeSnsSwiper(dir);
            }
        }
    });

    sns_swiper.update();
}

var review_swiper = null;
function vertical_review() {
    review_swiper = new Swiper ('.review_swiper', {
        direction: 'vertical',
        freeMode: true,
        slidesPerView: 'auto',
        speed: 500,
        scrollbar :
        {
            el: '.review_scollbar',
            hide: true,
            dragSize: 'auto',
//            draggable: false,
        },
        on: {
            init : function() {
                var totalHeight = $("p#review_txt").outerHeight(true);
                $("div#_review > p").height(totalHeight);
            }
        }
    });
}

function resizeReviewComment() {
//    var totalHeight = 0;
    $("div#rclist > li").each(function(idx) {
        $("div#rclist > li").eq(idx).height($("div#rclist > li").eq(idx).children("div").outerHeight(true));
//        totalHeight = totalHeight + $("div#rclist > li").eq(idx).children("div").outerHeight(true);
    //    console.log($("div#rclist > li").eq(idx).children("div").outerHeight(true));
    });

    $("div#rclist li:last-child").height($("div#rclist li:last-child").height()*4);
}

var rc_swiper = null;
function vertical_reviewcomment() {
    rc_swiper = new Swiper ('.reviewcomment_swiper', {
        direction: 'vertical',
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
        slidesPerView: 'auto',
        preventClicks: true,
        preventClicksPropagation: true,
        resizeObserver: true,
//        spaceBetween: 40,
        lazyLoading: true,
        // setWrapperSize: true,
        // autoHeight: true,
        speed: 500,
        scrollbar : 
        {
            el: '.reviewcomment_scollbar',
            hide: true,
            dragSize: 'auto',
//            draggable: false,
        },
        on: {
            init: function() {
                resizeReviewComment();
            }
        }
    });

//    $(".review_scollbar").height(totalHeight);
//    rc_swiper.scrollbar.updateSize();
    rc_swiper.update();
    rc_swiper.on("click", function() {
        // if($("div.review_write").is(":visible")) {
        //     var rv = "";
        //     for(var i=0; i<soundgramApi.leftmenudiv.length; i++) {
        //         var lm = soundgramApi.leftmenudiv[i].substring(0,2);
        //         if(lm=="rv") {
        //             rv = soundgramApi.leftmenudiv[i];
        //         }
        //     }

        //     if(!$(event.target).hasClass("review_write")) { 
        //         WriteButtonClear(rv);       
        //     }
        // }

        rc_swiper.on("touchMove", function() {
            return false;
        });
        
        var _et = $(event.target);
        var ptarget = $(event.target).parent();
        if(ptarget.attr("id")=="rclike_a" || ptarget.attr("id")=="reviewCommentLikeCnt") {
            // change_reviewcommentlike($(event.target).attr("value"));
            if(soundgramApi.loginoutflag=="1") {
                change_reviewcommentlike($(event.target).attr("value"));
            }
            else {
                showConfirm("login", "알림", "로그인이 필요한 서비스입니다.<br>로그인을 하시겠습니까?");
            }
        }
        else if($(event.target).attr("class")=="rv_imgbox") {
            // $("div.rv_popup_imgarea > img").attr("src", $(event.target).css("background-image").slice(4, -1).replace(/"/g, ""));
            // $("div.all_review_pop").show();
            // effect("div.rv_inner_popup");

            $("div#rv_detail_zoom > img").attr("src","");
            $("div#rv_detail_zoom > img").attr("src", $(event.target).css("background-image").slice(4, -1).replace(/"/g, ""));
            reimg_detail_swiper();

            $("div.all_review_pop").show();
        }
        // 220422 답글버튼 닫히고 열리게
        else if(_et.attr("class")=="rv_reply") {
            var _id = _et.attr("value");
            var _cnt = _et.attr("value2");
                
            _et.parent().parent().parent().toggleClass("r_block");

            if(_cnt>0) {
                var value = jQuery.param({"like_type":"6", "ref_comment_id":_id, "albumid":soundgramApi.albumid, "userid":soundgramApi.user_id, "device_id":soundgramApi.device_id});
                // console.log(value);
                $.ajax({
                    type : "POST",
                    url : "api/ref_comment_info.php",
                    data : value,
                    dataType: "json",
                    timeout       : 3000,
                    retries       : 5,     //       <-------- Optional
                    retryInterval : 3000,   //       <-------- Optional
                    success: function(data) {
                        if(data.length>0) {
                            _et.parent().parent().children(".r_rv_block").children().not(".r_contents").not(".btn_write").empty();
                            $.each(data, function(al) {
                                var makeListHTML = makeHTML(soundgramApi.diskid.substring(0,1), "refcomment", data[al], "");
                                _et.parent().parent().children(".r_rv_block").append(makeListHTML);
                            });
                        }
                    }, 
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(errorThrown);
                    }
                });
            }

            resizeReviewComment();
            rc_swiper.update();
        }

        
        event.preventDefault();
    }).on("slideChange", function() {
//        $("div#review > div.page_title").css({"height":"20px"});
        // if(rc_swiper.activeIndex>0) {
        if($("div.reviewcomment_scollbar").is(":visible")) {
            if(rc_swiper.activeIndex>0) {
                reviewTitleScrollEffect("66", "0", "50px", "add");
            }
            else {
                reviewTitleScrollEffect(0, "51%", "66px", "remove");    
            }
        }
        else {
            reviewTitleScrollEffect(0, "51%", "66px", "remove");
        }
    });
}

var sh_swiper = null;
function sns_horizontal() {
    sh_swiper = new Swiper ('.sns_horizontal', {
        direction: 'horizontal',
        freeMode: true,
        preloadImages: true,
        updateOnImagesReady: true,
        slidesPerView: 'auto',
        preventClicks: true,
        preventClicksPropagation: true,
        lazyLoading: true,
        speed: 500,
    });
}