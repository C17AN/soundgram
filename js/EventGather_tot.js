var slider = "";
function EventGather() {
    $("button#nfc_home").click(function() {
        // if(soundgramApi.ostype == 2) {
        //     window.webkit.messageHandlers.SoundgramNFC.postMessage("app_close");
        // }
        moving_nfc('1');
    });
    
    $("button#add_device").click(function() {
        moving_nfc('7');
    });
    
    $("button#app_start").click(function() {
        // if(soundgramApi.ostype == 1) {
        //     // Android //
        //     SoundgramNFC.reload();
        // } else if(soundgramApi.ostype == 2) {
        //     window.webkit.messageHandlers.SoundgramNFC.postMessage("gotoAlbum");
        // }
        
        _load("","Y");
    });
    
    $("button#f_auth").click(function(e) {
        var security_num = $("input#nfcno_1").val()+"-"+$("input#nfcno_2").val()+"-"+$("input#nfcno_3").val();
        updateNFC(security_num);
    });
    
    $("button#new_auth").click(function() {
        updateNFC("");
    });
    
    $("button#ios_auth").click(function() {
        window.webkit.messageHandlers.SoundgramNFC.postMessage("gotoNFC");
    });

    $("button#nfc_check").click(function(e) {
        soundgramApi.albumid = $("input#i_album_id").val();
        nfc_check_2();
    });

    $(".cb10_m02").click(function(e) {
        e.preventDefault();

        _load("","N");
    });

    
    $(".inform_tot").click(function() {
        $("#ncoll").delay(500).fadeOut("linear").empty();
        $(".slick-center").removeClass("before");
        $(".slick-center").addlass("new");
        $(".slick-slide").addClass("on");
    });
}