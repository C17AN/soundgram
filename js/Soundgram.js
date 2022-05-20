function reload() {
    location.reload();
}

function getFileCheck(result) {
	alert(result);
}

function check_nfc(nfc) {
    soundgramApi.nfc = nfc;
}

function getDiskid(diskid, albumdiv, package) {
    soundgramApi.diskid = diskid;
    soundgramApi.albumdiv = albumdiv;
    soundgramApi.package = package;
}

function getNetworkCheck(result) {
	if(result=="NONE") {
		alert("네트워크 상태가 불안정합니다.");
	}
}

function move_page(idx) {
	horizontal_swiper.slideTo(idx,300,false);
}

function dataSetting(album, song, booklet, video, thanksto) {
    var album_type = soundgramApi.diskid.substring(0,1);

    $("div.si_footer").html("<p>Version "+album.version+"</p>")

    if(album_type=="p") {
        $("h2.list_title").text(album.albumtitle);
        $("h3.list_artist").text(album.artistname);
        $("h4.play_artist").text(album.artistname);
    }
    else {
        $("h1.cv_title").text(album.albumtitle);
        $("h2.cv_artist").text(album.artistname);
        $("h4.play_artist").text(album.artistname);
        $("h3.cv_album").text(album.albumtype);
    }

    $("p.ali_title").html(album.albuminfotitle.replace(/\n/gi,"<br>"));
    $("p.ali_text").html(album.albuminfo.replace(/\n/gi,"<br>"));

    $("ul.songlist").empty();

    var rnum = shuffleRandom(9);
    var songlistdata = song.songlist;
    $.each(songlistdata, function(al) {
        var makeListHTML = makeHTML("songlist", songlistdata[al], album.artistname);
        $("ul.songlist").append(makeListHTML);

        var num = rnum[al];
        var imgURL = booklet.bookletlist[num].photo;
        $("div#p_swipe").prepend("<div class='play_img swiper-slide' style='background-image:url("+imgURL+")'></div>")
    });

//    var rnum = shuffleRandom(6);
//    $("div#p_swipe > div").each(function(idx) {
//        if(idx<songlistdata.length) {
////            var num = rnum[idx]>9?""+rnum[idx]:"0"+rnum[idx];
//            var num = rnum[idx];
//            var imgURL = booklet.bookletlist[num].photo;
//            $("div#p_swipe > div").eq(idx).css({"background-image":"url("+imgURL+")"});
//        }
//    });

    var videolistdata = video.videolist;
    $.each(videolistdata, function(al) {
        var makeListHTML = makeHTML("videolist", videolistdata[al], "");
        if(album_type=="p") $("div#video_list").append(makeListHTML);
        else $("div.gallary").append(makeListHTML);
    });

    var bookletlistdata = booklet.bookletlist;
    $.each(bookletlistdata, function(al) {
        var makeListHTML = makeHTML("bookletlist", bookletlistdata[al], "");
        if(album_type=="p") $("div#booklet_img_list").append(makeListHTML);
        else $("div.gallary").append(makeListHTML);
    });

    var thankstolistdata = thanksto.thankstolist;
    $.each(thankstolistdata, function(al) {
        var makeListHTML = makeHTML("thankstolist", thankstolistdata[al], "");
        if(album_type=="p") $("div#thanks_list").append(makeListHTML);
        else $("div.thanks_contants").append(makeListHTML);
    });

    if(album_type=="s") {
        musicSetting("1|"+songlistdata[0].title);
    }
}

function songlistSetting(song, booklet) {
    $("ul.songlist").empty();

    var songlistdata = song.songlist;
    $.each(songlistdata, function(al) {
        var makeListHTML = makeHTML("songlist", songlistdata[al], "신현희와 김루트");
        $("ul.songlist").append(makeListHTML);
        $("div#p_swipe").prepend("<div class='play_img swiper-slide'></div>")
    });

    if(album_type=="s") {
        musicSetting("1|"+songlistdata[0].title);
    }
}

function scheduleSetting(schedule) {
    var schedulelistdata = schedule.schedulelist;
    schedulelistdata.sort(function(a,b) {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });

    $.each(schedulelistdata, function(al) {
        var makeListHTML = makeHTML("schedulelist", schedulelistdata[al], "");
        $("div#_schedulelist").append(makeListHTML);
    });

    empty_check();
}

function snsSetting(sns) {
    var snslistdata = sns.snslist;
    $.each(snslistdata, function(al) {
        var makeListHTML = makeHTML("snslist", snslistdata[al], "");
        $("div#snslist").append(makeListHTML);
    });
}

var rclistInterval =  null;
var reviewcommentdata = null;
function reviewSetting(reload, makereview, replyCount, review, reviewcomment) {
    $("div#rclist li").each(function(idx) {
        $(this).remove();
    });

    if(makereview=="false") {
        $("div.review").empty();
        var reviewdata = review.reviewlist;
        $.each(reviewdata, function(al) {
            var makeListHTML = makeHTML("review", reviewdata[al], "");
            $("div.review").append(makeListHTML);
        });
    }

    reviewcommentdata = reviewcomment.reviewcommentlist;
    $.each(reviewcommentdata, function(al) {
        var makeListHTML = makeHTML("reviewcomment", reviewcommentdata[al], "");
        $("div#rclist").append(makeListHTML);
    });

    if(reload=="true") {
        rc_swiper.destroy(true, false);
//        vertical_reviewcomment();
//        var rl = window.setTimeout(function() {
//            window.clearTimeout(rl);
//            reviewCommentOrderChange(100);
//        },500);
    }

    rclistInterval = window.setInterval(function() {
        if(reviewcommentdata.length == $("div#rclist > li").length) {
            window.clearInterval(rclistInterval);
            reviewCommentOrderSetting("0", "0", "true", replyCount);
        }
    }, 100);
}

function reviewLoad(reviewcomment) {
    rclistInterval = window.setInterval(function() {
        if(reviewcomment.reviewcommentlist.length == $("div#rclist > li").length) {
            window.clearInterval(rclistInterval);
            reviewCommentOrderChange(100);
        }
    }, 100);
}

function loginComplete(user) {
    $("input:visible").val("").blur();
    $("header#pop_top").addClass("hidden");
    $("div.container_popup").children("div").addClass("hidden");
    $("div.container_popup").addClass("hidden");
    $("div.container").removeClass("hidden");
    $("div.horizontal_swiper").removeClass("hidden");

    if(user.snstype!="0") {
        $("button#changepass").hide();
    }
    else {
        $("button#changepass").show();
    }

    soundgramApi.nick = user.nick;
    soundgramApi.tel = user.tel;
    soundgramApi.id = user.id;
    soundgramApi.account = user.userid;
    soundgramApi.loginoutflag = "1";

    var lc = window.setTimeout(function() {
        window.clearTimeout(lc);
        profile_detail(user);
    },1000)
}

function logout(user) {
    member_close();

    soundgramApi.nick = user.nick;
    soundgramApi.tel = user.tel;
    soundgramApi.id = user.id;
    soundgramApi.account = user.userid;
    soundgramApi.loginoutflag = "0";
    profile_detail(user);
}

function joinError(type) {
    if(type=="already_id") $("div#member_input > div").eq(1).text("이미 사용중인 아이디입니다.").removeClass("hidden");
    else if(type=="already_phone") $("div#member_input > div").eq(4).removeClass("hidden");
    else if(type=="already_nick") $("div#member_input > div").eq(5).text("이미 사용 중인 닉네임입니다.").removeClass("hidden");
}

function changeComplete(type, changeinfo) {
    if(type=="nick") {
        soundgramApi.nick = changeinfo;
        $("h4#nick").text(changeinfo);
        $("input#profile_nick").val(changeinfo);
    }
    else if(type=="phone") {
        soundgramApi.tel = changeinfo;
        $("input#profile_tel").val(changeinfo);
    }
    else if(type=="profile") {
//        $(" div.profile").css({"background-image":"url('"+changeinfo+"')"});
        $("div#cu01_g > div.profile").css({"background-image":"url('"+changeinfo+"')"});
        $("div#leftmenu_profile").css({"background-image":"url('"+changeinfo+"')"});
    }
}

function loginError() {
    $("input#loginpassword").val("");
    $("input#loginpassword").focus().select();
    $("div#loginpassalert").removeClass("hidden").text("회원이 아니거나 정보를 잘못 입력하셨습니다.");
    return;
}

function changePasswordComplete(user) {
    $("input:visible").val("").blur();
    $("div.container_popup").children("div").addClass("hidden");
    $("div#login_sns").removeClass("hidden");

//    effect("div#login_sns");
//    profile_detail(user, "0");

    var sns = $("div#member_profile").attr("val");
    Soundgram.goLogout(sns);
}

function changePassErr() {
    $("div#changepass").removeClass("hidden").text("비밀번호가 맞지 않아요!");
    $("input#inputcpass").val("").focus().select();
    $("input#inputcnpass").val("")
    return;all_boklet_pop
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

var vclistInterval = "";
var vclistdata = null;
function videoCommentListSetting(reload, vcl, id, videoid, videoReplyCnt) {
    $("div#vclist li").each(function(idx) {
        if(idx>0) {
            $(this).remove();
        }
    });

    vclistdata = vcl.vclist;
    $.each(vclistdata, function(al) {
        var makeListHTML = makeHTML("vclist", vclistdata[al], "");
        $("div#vclist").append(makeListHTML);
    });

    if(reload=="true") {
        vvc_swiper.destroy(true, false);
//        var rl = window.setTimeout(function() {
//            window.clearTimeout(rl);
            videoCommentOrderChange();
//        }, 500);
    }

    vclistInterval = window.setInterval(function() {
        if(vclistdata.length == $("div#vclist > li").length-1) {
            window.clearInterval(vclistInterval);
            videoCommentOrderSetting("0", id, videoid, videoReplyCnt);
        }
    }, 100);
}

function resetReview(type) {
    if(type=="rv") {
        rc_swiper.destroy(true, false);
    }
    else {
        vvc_swiper.destroy(true, false);
    }
}

function load_nfc(nfc_tf) {
    soundgramApi.nfc = nfc_tf;
}