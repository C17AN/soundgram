var soundgramApi = (function() {
    var api = {};

    api.SOUNDGRAM_Initialize = (function() {
        console.log("Init!");

        api.nick = "로그인 / 회원가입";
        api.tel = "";
        api.loginoutflag = "0";
        api.user_id = "";
        api.device_id = "";
        api.device_app_id = "";
        api.account = "";
        api.diskpath = "";
        api.diskid = "";
        api.album_type = "";
        api.albumdiv = new Array();
        api.leftmenudiv = new Array();
        api.lmortab = "";
        api.cuid = "";
        api.premiumPlayer = "";
        api.videoPopup = "";
        api.lyricPopup = "";
        api.infomation = "";
        api.albumtitle = "";
        api.artistid = "";
        api.artistname = "";
        api.albumid = "";
        api.singer = "";
        api.package = "";
        api.nfc = "false";
        api.uuid = "";
        api.ostype = "";
        api.activeIndex = 0;
        api.lmactiveIndex = 0;
        api.google_url = "";
        api.apple_url = "";
        api.nfckey = "";
        api.nfckeyid = "0";
        api.app_ver = "";
        api.naver_state = "";
        api.leftmenuon = false;
        api.profileimg = "";
        api.username = "";
        api.regdate = "";
        api.imp = false;
        api.snstype = "";
        api.category = "";
        api.album_genre = "";
        api.album_info_title = "";
        api.album_info = "";
        api.token = "";
        api.pushMovingPage = "";
        api.serverUrl = "";
		api.share_img = "";
		api.share_title = "";
        api.access_token = "";
        api.album_distributor = "";
        api.album_company = "";
        api.album_artist_info = "";
        api.album_intro_info = "";
        api.album_credit_info = "";
        api.album_time = "";
        api.tot = false;
        api.isGuide = false;
        api.tot_id = "";
        api.qa = "false";
        api.bookletSize = 0;
        api.tplImgNum = "01";
        api.retries = 5;

        return true;
    });

    return api;
})();
