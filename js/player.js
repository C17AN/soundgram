function player_init() {
    // player.pause();
    // player.currentTime=0;

    $("dd#currTime").text("00:00");
    $("dd#endTime").text('00:00');
    $("dd.bar_on").css({width:"0%"});
    $("div.bar_btn").css({
        left:"-webkit-calc(0%)",
        left:"-moz-calc(0%)",
        left:"calc(0%)"
    });
    $("button.pl_pause").attr("class","pl_play");
}

function EventPlayer() {
    $("button.pl_play, button.m_pl_playbtn, button.pl_pause").click(function() {
        var album_type = soundgramApi.diskid.substring(0,1);
        var val = $("audio#playMusic").val();
        if(val=="") {
            if(album_type=="s") {
                val = $("ul.songlist > li:first").attr("value");
                var play_title = val.split("|")[1];
                var play_artist = val.split("|")[4];
                if(play_title.length>25) {
                    $("h1.play_title").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
                    // $("div.m_pl_artist").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
                    $("h3.m_pl_artist").text(play_title);
                }
                else {
                    $("h1.play_title").text(play_title);
                    $("h3.m_pl_artist").text(play_title);
                }
                $("h4.play_artist").text(play_artist);

                var songlike = window.setTimeout(function() {
                    window.clearTimeout(songlike);
                    $("dd#songlike_play div").eq(val.substring(0,val.indexOf("|"))-1).removeClass("hidden");
                },500);
            }
        }

        var playNumber = val.split("|")[0];
        var filename = val.split("|")[2];
        var lycic_file = val.split("|")[3];
        var player = document.getElementById("playMusic");
        var progress = document.querySelector("progress");
        var manualSeek = false;
        var bookletImgUrl = $("div#p_swipe > div").eq(playNumber).css("background-image").slice(4, -1).replace(/"/g, "");
        var arSplitUrl   = bookletImgUrl.split("/");    //   "/" 로 전체 url 을 나눈다
        var nArLength     = arSplitUrl.length;
        var arFileName         = arSplitUrl[nArLength-1];   // 나누어진 배열의 맨 끝이 파일명이다
        var imgFileName = arFileName.split(".")[0];
        var imgNumber = imgFileName.substring(imgFileName.length-2, imgFileName.length);
        if(parseInt(imgNumber)<10) imgNumber = parseInt(imgNumber.substring(imgNumber.length-1, imgNumber.length))-1;

        //  SLIDER
        var slider = $('.playbar').slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            step: 1,
            animate: false,
            slide: function(e, ui) {
                // manualSeek = true;
                var seekto = player.duration * (ui.value / 100);
                player.currentTime = player.duration * (ui.value / 100);
            },
            stop: function(e, ui) {
                // manualSeek = false;
                var seekto = player.duration * (ui.value / 100);
                player.currentTime = player.duration * (ui.value / 100);
            }
        });
        // $('.playbar').slider();
        // $(".draggable").draggable({
        //     axis: "x",
        //     containment: "parent",
        //     start: function(event, ui ) {
        //         var currentObj = $(".ui-draggable-dragging"); //현재 드래그 중인 엘리먼트 가져오기
        //         var newTime = (currentObj[0].offsetLeft / player.duration) * 100;
        //         player.currentTime = newTime;
        //     }
        // }).droppable({
        //     drop: function(event, ui) {
        //         currentObj = $(".ui-draggable-dragging"); //현재 드래그 중인 엘리먼트 가져오기
        //         var newTime = (currentObj[0].offsetLeft / player.duration) * 100;
        //         player.currentTime = newTime;
        //     }
        // });

        if(soundgramApi.diskid=="p0700") {
            if(player.currentTime==0) {
                const wave = new Wave()
                $("#equalizer").removeClass("hidden");
                wave.fromElement("playMusic", "equalizer", {
                    type: "flower",
                    stroke:2,
                    colors: ["#333333"]
                });
            
                $(".pl_lyc_line").children().empty();
                if(lycic_file.length>0) {
                    $("#playMusic").loadLrc(".lyric", "media/song/"+soundgramApi.albumid+"/"+lycic_file);
                    $(".pl_lyc_line").children().show();
                }
                else {
                    $(".pl_lyc_line").children().hide();
                }
            }
        }

        if(player.paused == true) {
            if(player.currentTime==0) {
                // player.setAttribute("src", "media/song/"+soundgramApi.albumid+"/"+playNumber+".m4a");
                player.setAttribute("src", "media/song/"+soundgramApi.albumid+"/"+filename);
                player.load();
                player.addEventListener("canplaythrough", function() {
                    if(player!="" || player!= null || typeof player!="undefined") {
                        player.play();
                        
                        $("button#plpa_btn").attr("class","pl_pause");
                        $("button.m_pl_playbtn").attr("class","m_pl_pausebtn");

                        if(album_type=="s") {
                            standard_musicbtn_change("play");
                        }
                    }
                });
            }
            else {
                playeqStopAndRunning("running");
                player.play();

                $("button#plpa_btn").attr("class","pl_pause");
                $("button.m_pl_playbtn").attr("class","m_pl_pausebtn");

                if(album_type=="s") {
                    standard_musicbtn_change("play");
                }
            }

            player.addEventListener("timeupdate", function() {
                var curr_minutes = Math.floor(player.currentTime / 60);
                var curr_seconds = Math.floor(player.currentTime % 60);
                if(curr_seconds<10) curr_seconds = "0"+curr_seconds;

                $("dd#currTime").text("0"+curr_minutes+":"+curr_seconds)

                if(player.duration>0) {
                    var end_minutes = Math.floor(player.duration / 60);
                    var end_seconds = Math.floor(player.duration % 60);
                    if(end_seconds<10) end_seconds = "0"+parseInt(end_seconds);

                    $("dd#endTime").text("0"+end_minutes + ':' + end_seconds);
                }

                // if (!manualSeek) {
                    var nt = player.currentTime * (100 / player.duration);
                    slider.slider('option', 'value', nt);
                // }

                // Soundgram.mem_musicplay(parseInt(playNumber), val.substring(val.indexOf("|")+1,val.length), player.currentTime);

                // var minusoption = 0;
                // if(player.currentTime>0) {
                //     progress.value = perofcompletion;
                // }

                // var perofcompletion = Math.floor(Math.floor(player.currentTime) / Math.floor(player.duration) * 100);
                // $("dd#playerbar").css({width:perofcompletion+"%"});
                // $("dd#miniplayerbar").css({width:perofcompletion+"%"});

                // if(perofcompletion<30) minusoption = 0;
                // else if(perofcompletion>30 && perofcompletion<100) minusoption = 6;
                // else minusoption = 12;

                // $("div.bar_btn").css({
                //     left:"-webkit-calc("+perofcompletion+"% - "+minusoption+"px)",
                //     left:"-moz-calc("+perofcompletion+"% - "+minusoption+"px)",
                //     left:"calc("+perofcompletion+"% - "+minusoption+"px)"
                // });
            }, false);

            // Soundgram.changeNotificationbar(val.substring(val.indexOf("|")+1,val.length), imgNumber);
        }
        else {
            pausebtn_click = true;
            playeqStopAndRunning("paused");

            $("button#plpa_btn").attr("class","pl_play");
            $("button.m_pl_pausebtn").attr("class","m_pl_playbtn");
            player.pause();

            if(album_type=="s") {
                standard_musicbtn_change("nav");
            }

            // Soundgram.changeNotificationbar(val.substring(val.indexOf("|")+1,val.length), imgNumber);
        }

        if(player.currentTime>0) {
            if(soundgramApi.ostype==1) {
                Soundgram.changeNotificationbar(val.split("|")[1], imgNumber, player.paused);
            }
            else {
                $("audio#playMusic").attr("title",val.split("|")[1]);
            }
        }
        else {
            if(soundgramApi.ostype==1) {
                Soundgram.changeNotificationbar(val.split("|")[1], imgNumber, false);
            }
            else {
                $("audio#playMusic").attr("title",val.split("|")[1]);
            }
        }

        player.addEventListener("pause", function() {
            if(player.currentTime>0) {
                if(player.paused) {
                    $("button#plpa_btn").attr("class","pl_play");
                    $("button.m_pl_playbtn").attr("class","m_pl_playbtn");

                    if(soundgramApi.ostype==1) {
                        Soundgram.changeNotificationbar(val.split("|")[1], imgNumber, true);
                    }
                    else {
                        $("audio#playMusic").attr("title",val.split("|")[1]);
                    }
                }
                else {
                    $("button#plpa_btn").attr("class","pl_pause");
                    $("button.m_pl_playbtn").attr("class","m_pl_pausebtn");

                    if(soundgramApi.ostype==1) {
                        Soundgram.changeNotificationbar(val.split("|")[1], imgNumber, false);
                    }
                    else {
                        $("audio#playMusic").attr("title",val.split("|")[1]);
                    }
                }
            }
        });

        player.addEventListener("ended", function() {
            player_init();
            playend();

            if(album_type=="s") {
                standard_musicbtn_change("nav");
            }
        });
    });

    $("dd.fl_right > button").click(function() {
        if($(this).attr("class")=="pl_repon") $(this).attr("class","pl_repone");
        else if($(this).attr("class")=="pl_repone") $(this).attr("class","pl_repoff");
        else $(this).attr("class","pl_repon");
    });

    var doubleclick = false;
    $("button.pl_pre, button.m_pl_prevbtn").click(function() {
        if(!doubleclick) {
            var idx = $("div#p_swipe > div[class*=-active]").index();
            idx = idx+1;

            if(idx<0) {
                idx = 3;
            }

            clickPrevPlay("button", idx);
            doubleclick = true;
        }
        else return false;

        var np_btn = window.setTimeout(function() {
            window.clearTimeout(np_btn);
            doubleclick = false;
        }, 500);

        // clickPrevPlay("button");
    });

    $("button.pl_nex, button.m_pl_nextbtn").click(function() {
        if(!doubleclick) {
            var idx = $("div#p_swipe > div[class*=-active]").index();
            idx = idx+1;

            if($("div#p_swipe > div").length-2<idx) {
                idx = 1;
            }

            clickNextPlay("button", idx);
            doubleclick = true;
        }
        else return false;

        var np_btn = window.setTimeout(function() {
            window.clearTimeout(np_btn);
            doubleclick = false;
        }, 500);

        // clickNextPlay("button");
    });
}

function playend() {
    var player = document.getElementById("playMusic");
    
    if($("dd.fl_right > button").attr("class")=="pl_repon") {
        $("button.pl_nex").click();
    }
    else if($("dd.fl_right > button").attr("class")=="pl_repone") {
        var playnow = window.setTimeout(function() {
            window.clearTimeout(playnow);
            $("button.pl_play").click();
        }, 500);
        
    }
    else {
        playeqStopAndRunning("paused");
    }
}

function clickNextPlay(type, idx) {
    // alert(idx + " / " + $("div#p_swipe > div").eq(idx).css("background-image"));

    if(type!="swiper") {
        if(player_swiper!=null) {
            if(idx!=null) player_swiper.slideTo(idx, 500, false);
            else player_swiper.slideNext(500, false);

            player_swiper.pagination.update();
            player_swiper.update();
        }
    }

    var player = document.getElementById("playMusic");
    player_init();

    player.pause();
    player.currentTime = 0;

    var playlist_num = $("ul.songlist > li").length;
    var val = $("audio#playMusic").val();
    var playNumber = val.split("|")[0];
    var nextPlayNumber = 0;
    if(playNumber < playlist_num) {
        nextPlayNumber = parseInt(playNumber);
    }
    else if(playNumber == playlist_num) {
        nextPlayNumber = 0;
    }

    $("audio#playMusic").val("");
    $("audio#playMusic").val($("ul.songlist > li").eq(nextPlayNumber).attr("value"));
    
    $("dd#songlike_play").children("div").addClass("hidden");
    $("dd#songlike_play > div").eq(nextPlayNumber).removeClass("hidden");

    var nextVal = $("ul.songlist > li").eq(nextPlayNumber).attr("value");
    var play_title = nextVal.split("|")[1];
    var play_artist = nextVal.split("|")[4];
    if(play_title.length>25) {
        $("h1.play_title").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
        // $("div.m_pl_artist").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
        $("h3.m_pl_artist").text(play_title);
    }
    else {
        $("h1.play_title").text(play_title);
        $("h3.m_pl_artist").text(play_title);
    }
    $("h4.play_artist").text(play_artist)

	// console.log(play_title);

    $("div.m_pl_album").css({"background-image":$("div#p_swipe > div").eq(nextPlayNumber+1).css("background-image")});
    playeqStopAndRunning("running");

    $("button.pl_play").click();
}

function clickPrevPlay(type, idx) {
    if(type!="swiper") {
        if(player_swiper!=null) {
            if(idx!=null) player_swiper.slideTo(idx, 500, false);
            else player_swiper.slidePrev(500, false);

            player_swiper.pagination.update();
            player_swiper.update();
        }
    }

    var player = document.getElementById("playMusic");
    player_init();

    player.pause();
    player.currentTime = 0;

    var playlist_num = $("ul.songlist > li").length;
    var val = $("audio#playMusic").val();
    var playNumber = val.split("|")[0];
    var prevPlayNumber = playNumber-1;
    
    if(prevPlayNumber < 1) {
        prevPlayNumber = parseInt(playlist_num)-1;
    }
    else {
        prevPlayNumber--;    
    }

    $("audio#playMusic").val("");
    $("audio#playMusic").val($("ul.songlist > li").eq(prevPlayNumber).attr("value"));

    $("dd#songlike_play").children("div").addClass("hidden");
    $("dd#songlike_play > div").eq(prevPlayNumber).removeClass("hidden");

    var prevVal = $("ul.songlist > li").eq(prevPlayNumber).attr("value");
    var play_title = prevVal.split("|")[1];
    var play_artist = prevVal.split("|")[4];
    if(play_title.length>25) {
        $("h1.play_title").html("<marquee behavior='altemate'>"+play_title+"</marquee>");
        $("h3.m_pl_artist").text(play_title);
    }
    else {
        $("h1.play_title").text(play_title);
        $("h3.m_pl_artist").text(play_title);
    }
    $("h4.play_artist").text(play_artist);

    $("div.m_pl_album").css({"background-image":$("div#p_swipe > div").eq(prevPlayNumber+1).css("background-image")});
    playeqStopAndRunning("running");

    $("button.pl_play").click();
}
