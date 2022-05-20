<?php
    
?>

<!doctype html>
<html lang="ko" class="os_windows chrome pc version_75_0_3770_100 effect_enabled">
<head>
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height">
	<meta charset="utf-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="referrer" content="always">
    <title>SoundGram</title>

    <link rel="stylesheet" type="text/css" href="css/nfc_payment.css" >
    
    <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="js/nfc_common.js"></script>
    <script type="text/javascript" src="js/SoundgramApi.js"></script>
    <script type="text/javascript" src="js/component.js"></script>
    
    <script>
        let confirm = new ConfirmClass();
    </script>
</head>

<body>
<div class="splash_container">
    <canvas id="myCanvas" width="100%" height="100%"></canvas>
</div>

<script type="text/javascript">
        // It is assumed you know how to add a canvas and correctly size it.
        var canvas = document.getElementById("myCanvas"); // get the canvas from the page
        var ctx = canvas.getContext("2d");
        var videoContainer; // object to hold video and associated info

        // $(document).ready(function(){
            var video = document.createElement("video"); // create a video element
            video.src = "intro_mp4.mp4"; 
            // the video will now begin to load.
            // As some additional info is needed we will place the video in a
            // containing object for convenience
            video.autoPlay = false; // ensure that the video does not auto play
            video.loop = true; // set the video to loop.
            videoContainer = {  // we will add properties as needed
                video : video,
                ready : false,   
            };

            video.oncanplaythrough = readyToPlayVideo; // set the event to the play function that
            // can be found below
        // });

        function readyToPlayVideo(event){ // this is a referance to the video
            // the video may not match the canvas size so find a scale to fit
            videoContainer.scale = Math.min(
                                canvas.width / this.videoWidth, 
                                canvas.height / this.videoHeight); 
            videoContainer.ready = true;
            // the video can be played so hand it off to the display function
            requestAnimationFrame(updateCanvas);
        }

        function updateCanvas(){
            ctx.clearRect(0,0,canvas.width,canvas.height); // Though not always needed 
                                                            // you may get bad pixels from 
                                                            // previous videos so clear to be
                                                            // safe
            // only draw if loaded and ready
            if(videoContainer !== undefined && videoContainer.ready){ 
                // find the top left of the video on the canvas
                var scale = videoContainer.scale;
                var vidH = videoContainer.video.videoHeight;
                var vidW = videoContainer.video.videoWidth;
                var top = canvas.height / 2 - (vidH /2 ) * scale;
                var left = canvas.width / 2 - (vidW /2 ) * scale;
                // now just draw the video the correct size
                ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
                if(videoContainer.video.paused){ // if not playing show the paused screen 
                    drawPayIcon();
                }
            }
            // all done for display 
            // request the next frame in 1/60th of a second
            requestAnimationFrame(updateCanvas);
        }

        function drawPayIcon(){
            ctx.fillStyle = "black";  // darken display
            ctx.globalAlpha = 0.5;
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.fillStyle = "#DDD"; // colour of play icon
            ctx.globalAlpha = 0.75; // partly transparent
            ctx.beginPath(); // create the path for the icon
            var size = (canvas.height / 2) * 0.5;  // the size of the icon
            ctx.moveTo(canvas.width/2 + size/2, canvas.height / 2); // start at the pointy end
            ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 + size);
            ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 - size);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1; // restore alpha
        }    

        function showConfirm (type, title, content) {
            confirm.show({
                title: title,
                content: content,
                btns: [{
                    callback: function(instance){
                        if(type=="close") {
                            // 21.01.08 iOS에서 SoundgramAgree 객체를 확인하지 못하는 문제와 iOS에서의 핸들링을 위해 try-catch 구문으로 iOS처리도 할 수 있도록 수정했습니다.(조유빈)
                            try {
                                SoundgramSplash._close();
                            } catch (e) {
                                window.webkit.messageHandlers.SoundgramSplash.postMessage('close');
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
    </script>
</body>
</html>
