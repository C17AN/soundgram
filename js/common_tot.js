function addDeviceInfo(app_ver, qa) {
  var value = jQuery.param({"ostype":soundgramApi.ostype, "app_ver":app_ver, "uuid":soundgramApi.uuid, "tot_id":soundgramApi.tot_id, "token":soundgramApi.token});
  // 현재 version check는 사용할 수 없음 21.09.08
  $.ajax({
      type: "POST"
      , url : "api/versionCheck_tot.php"
      , data: value
      , dataType: "json"
      , success: function(data) {
          if(data.returnCode=="newver" && qa=="false") {
              appUpdate(data.store_url); // 여기에 오타가 있었어서 수정했습니다. (원본: data.stroe_url)
          }
          else {
              $.ajax({
                  type: "POST"
                  , url : "api/add_device_info_tot.php"
                  , data: value
                  , dataType: "json"
                  , success: function(data) {
                      // console.log(data);
                      soundgramApi.device_app_id = data.device_app_id;

                      // 자동로그인
                      // _autologin();

                      // 페이지 로드
                      _load("","N");
                  }
                  , error: function(xhr, textStatus, errorThrown) {
                      console.log(errorThrown);
                  }
              });
          }
      }
      , error: function(xhr, textStatus, errorThrown) {
          console.log(errorThrown);
      }
  });
}

var _ap = false;
var album_lst  = "";
function _load(loginout,_newcall) {
  $("div.container").empty();
  $("div.nfc_container").empty();
  
  // $("body").css({"background":"#000"});
  $("body").children("div").not(".overlay_tot").not("#ncoll").not(".splash_container").not("#toast").remove();
  $("body").append("<div class='container hidden'></div><div class='nfc_container hidden'></div>");
  
  var app_type = is_navigator();
  var value = jQuery.param({"device_app_id":soundgramApi.device_app_id, "tot_id":soundgramApi.tot_id});
  
  $.ajax({
      type : "POST",
      url : "api/artist_info_tot.php",
      data : value,
      dataType: "json",
      success: function(data) {
        // console.log(data);

        // data[0][0] : 카테고리
        // data[1][0] : 앨범 전체(소유 앨범 제외)
        // data[2][0] : 소유 앨범
        album_lst = data[1][0];
        var usealbum_lst = data[2][0];
        
        // DB에서 불러온 값(현재는 존재하지않음) 21.08.31
        var albumdiv = data[0][0][0].category;
        // var albumdiv = "ct10,cl10,cr10,cs10,ci10,cb10,in10";
        var a_div = albumdiv.split(",");
        
        for(var i=0; i<a_div.length;i++) {
          var lm = "";
          if(a_div[i]!="-") {
            lm = a_div[i].substring(0,2);
          }

          if(lm=="ct") {
            $("div.container").before(getHTMLPageData("pages", a_div[i]).replace(/images/gi,""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images"));
          }
          else if(lm=="cl" || lm=="cr" || lm=="cs") {
            $("div.container").append(getHTMLPageData("pages", a_div[i]).replace(/images/gi,""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images"));
          }
          else if(lm=="cb" || lm=="in") {
            $("div.container").after(getHTMLPageData("pages", a_div[i]).replace(/images/gi,""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images"));
          }
          else if(lm=="cu") {
            soundgramApi.cuid = a_div[i];
          }
          else if(lm=="ap") {
            _ap = true;
          }
        }

        var _nfcpage = ["nc10_top","nc10_a_tot","nc10_b_tot","nc10_c_tot","nc10_d_tot","nc10_e_tot","nc10_f_tot","nc10_bottom"];
        for(var _n=0; _n<_nfcpage.length; _n++) {
          $("div.nfc_container").append(getHTMLPageData("pages", _nfcpage[_n]).replace(/images/gi,""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images"));

          // $.map($("div.nfc_container > div[id*=nc]").find("img"), function(el){ 
          //   // console.log(el.src)
          //   el.src = el.src.replace(/images/gi,""+diskpath+"/"+diskid+"/images"); 
          // });

          // NFC 초기화면
          if(_n==1) {
            var _ctype = "i";
            if(app_type=="web" || app_type=="a_app") {
              _ctype = "a";
            }

            $("div#nc10_a").append(getHTMLPageData("nfc", "nc_a_"+_ctype).replace(/images/gi,""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images"));
          }
        }

        var _f = window.setInterval(function() {
          if($("div.container > div").length==3) {
            window.clearInterval(_f);

            $("div.container").removeClass("hidden");
            $("div.splash_container").hide();
            $("div.splash_container").remove();

            if(app_type!="web") {
              if(soundgramApi.ostype == 1) {
                // SoundgramNFC.hideProgress();
              } else if(soundgramApi.ostype == 2) {
                window.webkit.messageHandlers.Soundgram.postMessage('hideProgress');
            }

            if($('#os-type').text() == 1) {
              SoundgramNFC.hideProgress();
            } else if($('#os-type').text() == 2) {
              window.webkit.messageHandlers.test.postMessage('test');				
            }
            
            // 설치가 처음이면 가이드 나오도록 기능 추가(210310) #210311 iOS에서도 나와야하므로 주석처리
            // console.log(isGuide);
            if(soundgramApi.isGuide=="true") {
              $("div.overlay0").show();
            }
            else {
              if(soundgramApi.ostype==1) {
                SoundgramNFC.setCookie();
              }

              // noticePopupOnoff();
            }
          }
            
            // 홈(cr), 목록(cl) 페이지 생성 START
            var uacnt = usealbum_lst.length;
            var _uacnt = 4;
            if(uacnt>12) {
              _uacnt = Math.ceil(uacnt/3);
            }
            for(var _u=0; _u<_uacnt;_u++) {
              $("div.chip_get_wrap").append(cl_empty());
            }

            if(uacnt>2) {
              $.each(usealbum_lst, function(al) {
                $("div.chip_slide-slider").append(
                  cr_lst(usealbum_lst[al].album_id,usealbum_lst[al].chip_img,usealbum_lst[al].album_name,usealbum_lst[al].artist_name)
                );
              });
            }
            else {
              $.each(usealbum_lst, function(al) {
                $("div.chip_slide-slider").append(
                  cr_lst(usealbum_lst[al].album_id,usealbum_lst[al].chip_img,usealbum_lst[al].album_name,usealbum_lst[al].artist_name)
                );
              });

              for(var ac=0; ac<3-uacnt; ac++) {
                $("div.chip_slide-slider").append(cr_empty());
              }
            }

            var _cl = 1;
            $.each(usealbum_lst, function(al) {
              if(al>0 && al%3==0) {
                _cl++;
              }
              
              var _linum = 0;
              if(al<3) {
                _linum = al+1;
              }
              else {
                _linum = al-2;
              }

              $("div.chip_get_wrap > ul:nth-child("+_cl+") > li:nth-child("+_linum+") > a").attr("href","javascript:moveAlbum("+usealbum_lst[al].album_id+")").attr("id",usealbum_lst[al].album_id);
              $("div.chip_get_wrap > ul:nth-child("+_cl+") > li:nth-child("+_linum+") > a > img").attr("src","media/album/"+usealbum_lst[al].album_id+"/"+usealbum_lst[al].chip_img+"");
            });
            // 홈(cr), 목록(cl) 페이지 생성 END

            // 판매(cs) 페이지 생성 START
            var acnt = album_lst.length;
            $.each(album_lst, function(al) {
              $("ul.chip_recent").append(
                // cs_lst(album_lst[al].album_id, album_lst[al].album_type, album_lst[al].album_name, album_lst[al].artist_name, album_lst[al].album_time.replace(/\-/gi,"."), album_lst[al].shop_url, album_lst[al].chip_img)
                cs_lst(album_lst[al].album_id, album_lst[al].album_type, album_lst[al].album_name, album_lst[al].artist_name, album_lst[al].album_time.replace(/\-/gi,"."), album_lst[al].shop_url, album_lst[al].chip_img)
              );
            });
            // 판매(cs) 페이지 생성 END

            // 인포 버전 변경
            $("p[class*=_version]").html("Version <b>"+soundgramApi.app_ver+"</b>");

            $("div.container > div:nth-child(2)").removeClass("hidden");

            // 로그인/회원가입 -> 정보수정으로 텍스트 변환
            $("div#toast").removeClass("hidden");

            if(soundgramApi.loginoutflag=="1" && loginout=="login") {
              $("div#in10").find(".si_bora_btn").html("정보수정 <img id='sibImg' src='images/cu10_ic_login_white.png' class='si_btnimg_s' />");
              toast("로그인이 완료되었습니다.");
            }
            else if(loginout=="logout") {
              toast("로그아웃 되었습니다.");
            }
            else if(loginout=="dropout") {
              toast("탈퇴가 완료되었습니다.");
            }

            // 칩디스크 초기 로딩
            aos_init();
            EventGather();
            _autologin();

            if(soundgramApi.isGuide=="true") {
              $(".overlay_tot").empty();
              $(".overlay_tot").append(isGuide_step1());
              $(".overlay_tot").show();
            }

            // NFC 신규등록시 출력
            if(_newcall=="Y") {
              var HTML
              = "<div class='inform_tot_wrap'><div class='inform_tot_txt'><img src='images/inform_tot_txt01.png' alt='New Collection'></div></div>";

              $("#ncoll").append(HTML);
              $("#ncoll").show();
              $(".slick-center").addClass("before");
            }
            else {
              $("#ncoll").empty();
              $("#ncoll").hide();

              $(".slick-center").removeClass("before");
              $(".slick-center").addClass("new");
              $(".slick-slide").addClass("on");
            }
          }
        }, 100);
      }
  });
}

// 페이지 생성
function getHTMLPageData(type, page) {
    var returnData = "";

    $.ajax({
        url: ""+soundgramApi.diskpath + "/"+type+"/"+page+".html"
        , type: "POST"
        , async: false
    }).done(function(data) {
      returnData = data;
    });

    return returnData;
}

function cr_empty() {
    var HTML
    = "<div class='slider-item'>"
    + "<a href='javascript:moveNFC()' class='block'>"
    + "<div class='img-box block'>"
    + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/cr10_tag_chip.png' alt='' />"
    + "</div>"
    + "</a>"
    + "<div class='chip_slide-desc-list none'>"
    + "<h1 class='chip_slide-desc-tt'>"
    + "구매한 칩디스크를 인증해보세요!"
    + "</h1>"
    + "<p class='chip_slide-desc'></p>"
    + "</div>"
    + "</div>"

    return HTML;
}

function cr_lst(album_id, chip_img, albumtitle, artist) {
    var HTML
    = "<div class='slider-item'>"
    + "<a href='javascript:moveAlbum("+album_id+")' id='"+album_id+"' class='block'>"
    + "<div class='img-box block'>"
    + "<img src='media/album/"+album_id+"/"+chip_img+"' alt='' />"
    + "</div>"
    + "</a>"
    + "<div class='chip_slide-desc-list'>"
    + "<h1 class='chip_slide-desc-tt'>"+albumtitle+"</h1>"
    + "<p class='chip_slide-desc'>"+artist+"</p>"
    + "</div>"
    + "</div>"

    return HTML;
} 

function cl_empty() {
    var HTML
    = "<ul class='chip_get'>"
    + "<li class='chip_get_li'>"
    + "<a href='#' id='' class='block'>"
    + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/cl10_empty.png' alt='' />"
    + "</a>"
    + "</li>"
    + "<li class='chip_get_li'>"
    + "<a href='#' id='' class='block'>"
    + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/cl10_empty.png' alt='' />"
    + "</a>"
    + "</li>"
    + "<li class='chip_get_li'>"
    + "<a href='#' id='' class='block'>"
    + "<img src='"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/cl10_empty.png' alt='' />"
    + "</a>"
    + "</li>"
    + "</ul>"

    return HTML;
}

function cs_lst(album_id, album_type, album_name, artist_name, album_time, shop_url, chip_img) {
    var HTML = 
    "<li class='chip_recent_li'>"
    + "<div class='chip_recent_left'>"
    + "<span class='chip_r_info'>"
    + "[<span class='ch_info'>"+album_type+"</span>]"
    + "</span>"
    + "<h3 class='chip_r_tit'>"+album_name+"</h3>"
    + "<h4 class='chip_r_artist'>"+artist_name+"</h4>"
    + "<div class='chip_r_bt'>"
    + "<span class='chip_r_rday'>"+album_time+"</span>"
    + "<a href='"+shop_url+"'>Buy</a>"
    + "</div>"
    + "</div>"
    + "<div class='chip_recent_right'>"
    + "<img src='media/album/"+album_id+"/"+chip_img+"' />"
    + "</div>"
    + "</li>"

    return HTML;
}

function isGuide_step1() {
  var HTML
  = "<div class='guide_wrap'>"
  + "<div class='guide_tot01_wrap'>"
  + "<div class='guide_tot01_circle guide_circle'></div>"
  + "<p><b>로그인</b>이나 <b>도움</b>이 필요할 때 눌러주세요!</p>"
  + "</div>"
  + "<div class='guide_tot02_wrap'>"
  + "<div class='guide_tot02_circle guide_circle'></div>"
  + "<p>인증한 <b>앨범 목록</b>을</br> 한 눈에 확인하세요!</p>"
  + "</div>"
  + "<div class='guide_tot03_wrap'>"
  + "<div class='guide_tot03_img'>"
  + "<img src='images/cr10_touch_m.png' alt='' class='guide_img03'/>"
  + "</div>"
  + "<p>"
  + "<b>앨범을 인증</b>하면<br />"
  + "이곳에 <b>등록</b>됩니다."
  + "</p>"
  + "<div class='guide_tot_btn'>"
  + "<button class='guide_tot_next' type='button' onClick='javascript:isGuide_step2();'>다음으로..</button>"
  + "</div>"
  + "</div>"
  + "<div class='guide_tot04_wrap'>"
  + "<p>구매한 <b>칩디스크</b>를</br>바로<b>인증</b>해요!</p>"
  + "<div class='guide_tot04_circle guide_circle'></div>"
  + "</div>"
  + "</div>";

  return HTML;
}

function isGuide_step2() {
  var HTML
  = "<div class='guide_wrap'>"
  + "<div class='guide_tot05_wrap'>"
  + "<div class='guide_tot05_circle guide_circle'></div>"
  + "<p><b>인증된 앨범</b>을<br>하나씩 <b>확인</b>하세요!</p>"
  + "</div>"
  + "<div class='guide_tot05_1_wrap'>"
  + "<div class='guide_tot05_img'>"
  + "<img src='images/cr10_slide.png' alt='' class='guide_img05'/>"
  + "</div>"
  + "<p>"
  + "<b>좌우로 스와이프</b>하여<br />"
  + "내가 <b>인증한 앨범들</b>을 손 쉽게 찾아봐요!"
  + "</p>"
  + "<div class='guide_tot_btn'>"
  + "<button class='guide_tot_next' type='button' onClick='javascript:guideOkButtonClick();'>OK! 이해했어요!</button>"
  + "</div>"
  + "</div>"
  + "<div class='guide_buttom_wrap'>"
  + "<div class='guide_tot06_wrap'>"
  + "<p><b>홈 화면</b>으로</br> 이동합니다.</p>"
  + "<div class='guide_tot06_circle guide_circle'></div>"
  + "</div>"
  + "</div>"
  + "<div class='guide_tot07_wrap'>"
  + "<p><b>마커를 찍어</b></br>내 가수의</br><b>히든영상</b>을<br>확인하세요!</p>"
  + "<div class='guide_tot07_circle guide_circle'></div>"
  + "</div>"
  + "</div>";

  $(".overlay_tot").empty();
  $(".overlay_tot").append(HTML);
}

// guide 화면 '이해했습니다' 버튼에 로직 추가. iOS만 동작 - 문상혁(03/12)
function guideOkButtonClick() {
  if(soundgramApi.ostype=="1") {
    /*
      * Android *
      앱의 guide on/off 관련 변수를 false로 변경하면서 웹의 guideoff() 함수 호출해주시면 됩니다.
    */

    SoundgramNFC.guide();
  } 
  else if(soundgramApi.ostype=="2") {
    window.webkit.messageHandlers.test.postMessage('guide');
    
    $(".overlay_tot").empty();
    $(".overlay_tot").hide();
  }
}

function guideoff() {
  soundgramApi.isGuide = "false";

  $(".overlay_tot").empty();
  $(".overlay_tot").hide();
}

function moveMenu(idx) {
    $("ul.ct10_menu > li").children("a").attr("class","");
    $("ul.ct10_menu > li").eq(idx).children("a").attr("class","on");

    $("div.container").children("div").addClass("hidden");
    $("div.container > div").eq(idx).removeClass("hidden");
}

function moveInfo() {
    $("body").children("div").addClass("hidden");
    $("div[id*=in]").removeClass("hidden");
}

function moveNFC() {
  if(is_navigator()!="web") {
    if(soundgramApi.ostype==1) {
      SoundgramNFC.NFCPAGE_ONOFF(true);
    }
    else {
	    // window.webkit.messageHandlers.SoundgramNFC.postMessage("gotoNFC");
    }
  }

  $("body").children("div").addClass("hidden");
  $("div.container").addClass("hidden");
  $("div.nfc_container > div#nc10_a").removeClass("hidden");
  $("div.nfc_container > div:first-child").removeClass("hidden");
  $("div.nfc_container > div:last-child").removeClass("hidden");
  $("div.nfc_container").removeClass("hidden");
}

function moveAR() {
  if(soundgramApi.ostype==1) {
    // showConfirm2("준비중입니다.");
    SoundgramNFC.markerPlayer();
  }
  else {
    window.webkit.messageHandlers.Soundgram.postMessage('MarkerPlayer');
  }
}

function moveAlbum(album_id) {
    if(is_navigator()=="web") {
      // console.log(album_id+"/"+soundgramApi.uuid+"/"+_ap);
      if(!_ap) {
        window.location.href = "/index.php?albumid="+album_id+"&uuid="+soundgramApi.uuid+"&tot=true";
      }
      else {
        alert("준비중입니다!");
      }
    }
    else {
      if(soundgramApi.ostype=="1") {
        SoundgramNFC.gotoAlbum(album_id);
      }
      else {
        window.webkit.messageHandlers.Soundgram.postMessage({"gotoAlbum": album_id});
      }
    }
}

function lj_popup() {
    var w = $("div.container").width(); 
    var h = $("div.container").height();
    var param = "width="+w+",height="+h+",scrollbar=no,status=no,menubar=no,toolbar=no";

    var loginurl = soundgramApi.serverUrl+"/login_popup_tot.php?device_app_id="+soundgramApi.device_app_id+"&tot_id="+soundgramApi.tot_id+"&uuid="+soundgramApi.uuid+"&diskpath="+soundgramApi.diskpath+"&diskid="+soundgramApi.diskid+"&isiplayer=false&ostype="+soundgramApi.ostype;
    // console.log(loginurl);
    window.open(loginurl,'로그인',param);
}

function back_home() {
    if(is_navigator()!="web") {
      if(soundgramApi.ostype==1) {
        SoundgramNFC.NFCPAGE_ONOFF(false);
      }
      else {
        
      }
    }

    $("body > div[class*=in]").addClass("hidden");
    $("body > div.nfc_container").children("div").addClass("hidden");
    $("body > div.nfc_container").addClass("hidden");
    
    $("body > div[class*=ct]").removeClass("hidden");
    $("body > div[class*=cb]").removeClass("hidden");
    $("body > div.container").removeClass("hidden");
}

function is_navigator() {
    var result = "web";
    // var broswerInfo = navigator.userAgent;
    // if(broswerInfo.indexOf("APP_Soundgram_Android")>-1){
    //   result="a_app";
    // } 
    // else if(broswerInfo.indexOf("iphone")>-1 || broswerInfo.indexOf("ipad")>-1 || broswerInfo.indexOf("ipod")>-1) {
    //   result="i_app";
    // }

    if(soundgramApi.ostype=="1") {
      result = "a_app";
    }
    else if(soundgramApi.ostype=="2") {
      result = "i_app";
    }

    return result;
}

function appUpdate (url) {
  confirm.show({
      title: "업데이트 알림",
      content: "최신버전이 나왔습니다.<br/>업데이트를 위해 스토어로 이동해주세요.",
      btns: [{
          callback: function(instance){
              window.location.href = url;
              // 안드로이드일 경우에만 앱 강제종료
              if(soundgramApi.ostype==1) {
                  // window.location.href = url;
                  SoundgramNFC._close();
              } 
              else if (soundgramApi.ostype == 2) { // 21.02.04 iOS 앱 강제 업데이트를 위해 코드 수정(조유빈)
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

function showConfirm2 (content) {
  confirm.show({
      title: "알림",
      content: content,
      btns: [{
          callback: function(instance){
              
          }
      }],
      onShow: function(){

      }
  });
}

function aos_init() {
    AOS.init({
      //once:true,
      duration: 800,
      easing: "ease",
    });
    
    $(".chip_slide-slider")
    .on("init", function (event, slick) {
      $(this).prepend(
        '<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>'
      );
      $(".current").text(slick.currentSlide + 1);
      $(".total").text(slick.slideCount);
    })
    .slick({
      draggable: true,
      arrows: false,
      adaptiveHeight: true,
      centerMode: true,
      centerPadding: "20vw",
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $(".current").text(nextSlide + 1);
      if (currentSlide !== nextSlide) {
        $(".slick-center + .slick-cloned").each(function (index, node) {
          var $node = $(node);

          setTimeout(function () {
            $node.addClass("slick-current");
            $node.addClass("slick-center");
          });
        });
      }
    })
    .on("beforeChange", function (event, slick, currentSlide) {
      var img = new Image();
      img.src = window.location.protocol+"//"+window.location.hostname+"/"+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/cr10_wave_apng.png";
      img.onload = function() {
        $("#cr10").css({
          "background-image": `url(`+img.src+`?id=${Math.floor(
            Math.random() * 100000
          )})`,
        });
      }

      img.onerror = function() {
        // $("#cr10").css({
        //   "background-image": `url(../images/cr10_wave_apng.png?id=${Math.floor(
        //     Math.random() * 100000
        //   )})`,
        // });
      }
    });
}

function _autologin() {
  var value = jQuery.param({"device_app_id":soundgramApi.device_app_id});
  $.ajax({
    type : "POST",
    url : "api/autologin_tot.php",
    data : value,
    dataType: "json",
    success: function(data) {
      var returnCode = data.returnCode;
      if(returnCode=="loginerr") {
        toast("비정상적인 접근입니다.");
      }
      else if(returnCode=="login_complete") {
        loginComplete(data, "_autologin");
      }
    }, 
    error: function(xhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}

function loginComplete(user, logintype) {
  var profilepath = "user/"+user.user_id+"/"+user.profile;
  var profile = "media/"+profilepath;

  if(user.profile=="default/profile_none.png") {
      // profilepath = user.profile;
      profile = ""+soundgramApi.diskpath+"/"+soundgramApi.diskid+"/images/gn"+soundgramApi.tplImgNum+"_img_profile_df.png";
  }

  if(user.profile.indexOf("http")!=-1) {
      profile = user.profile;
  }

  soundgramApi.snstype = user.snstype;
  soundgramApi.profileimg = profile;
  soundgramApi.nick = user.nick;
  soundgramApi.tel = user.tel;
  soundgramApi.user_id = user.user_id;
  // soundgramApi.device_id = user.device_id;
  soundgramApi.account = user.account;
  soundgramApi.username = user.name;
  soundgramApi.regdate = user.regdate;
  soundgramApi.loginoutflag = "1";
  soundgramApi.access_token = user.access_token;

  if(logintype=="_login") {
    // var lc = window.setTimeout(function() {
    //     window.clearTimeout(lc);
    //     // profile_detail(user);
    //     // toast("로그인이 완료되었습니다.");
    // },300);

    _load("login","N");
  }
  else {
    $("div#in10").find(".si_bora_btn").html("정보수정 <img id='sibImg' src='images/cu10_ic_login_white.png' class='si_btnimg_s' />");
    $("div#toast").removeClass("hidden");
    toast("로그인이 완료되었습니다.");
  }
}

function logout(snstype) {
  var value = jQuery.param({"device_app_id":soundgramApi.device_app_id});
  $.ajax({
      type : "POST",
      url : "api/logout_tot.php",
      data : value,
      dataType: "json",
      success: function(data) {
        soundgramApi.nick = "로그인 / 회원가입";
        soundgramApi.tel = "";
        soundgramApi.user_id = "";
        soundgramApi.account = "";
        soundgramApi.loginoutflag = "0";
        
        _load("logout","N");
      }, 
      error: function(xhr, textStatus, errorThrown) {
          console.log(errorThrown);
      }
  });
}

function dropout() {
  var userid = soundgramApi.user_id;
  var sns = soundgramApi.snstype;
  var device_app_id = soundgramApi.device_app_id;
  // console.log(sns);
  var value = jQuery.param({"userid":userid, "device_app_id":device_app_id});
  $.ajax({
      type : "POST",
      url : "api/dropout_tot.php",
      data : value,
      dataType: "json",
      success: function(data) {
          if(data.returnCode=="success") {
              soundgramApi.nick = "로그인 / 회원가입";
              soundgramApi.tel = "";
              soundgramApi.user_id = "";
              soundgramApi.account = "";
              soundgramApi.loginoutflag = "0";
              
              _load("dropout","N");
          }
      }, 
      error: function(xhr, textStatus, errorThrown) {
          console.log(errorThrown);
      }
  });
}

function changeorder() {
  var selOrder = document.getElementById("selOrder").options[document.getElementById("selOrder").selectedIndex].value;
  // alert(selOrder);

  if(selOrder=="recent") {
    album_lst.sort(function(a,b) {
        return a.album_time < b.album_time ? 1 : -1;
    });
  }
  else {
    album_lst.sort(function(a,b) {
          return a.artist_name > b.artist_name ? 1 : -1;
      });
  }

  $("ul.chip_recent").empty();
  $.each(album_lst, function(al) {
    $("ul.chip_recent").append(
      cs_lst(album_lst[al].album_id, album_lst[al].album_type, album_lst[al].album_name, album_lst[al].artist_name, album_lst[al].album_time.replace(/\-/gi,"."), album_lst[al].shop_url, album_lst[al].chip_img)
    );
  });
}

function info_menu(_in) {
  if(_in==1) {
    var store_url = soundgramApi.google_url;
    if(soundgramApi.ostype == 2) {
      store_url=soundgramApi.apple_url;
    }
    
    location.href = store_url;
  }
  else if(_in==2) {
    if(soundgramApi.ostype==1) {
      SoundgramNFC.mailto();
    }
    else {// 21.01.11 조유빈, iOS Mail 기능을 위해 추가
        window.webkit.messageHandlers.Soundgram.postMessage('mailTo');
    }
  }
  else {
    window.open("/terms.html");
  }
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
