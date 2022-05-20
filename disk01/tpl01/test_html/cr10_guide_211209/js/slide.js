console.clear();

// animation on scroll
AOS.init({
  //once:true,
  // duration: 800,
  duration: 600,
  easing: "ease",
});

// 3차 visual stroy slick 적용
$(function () {
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
      $("#cp01").css({
        "background-image": `url(../인트로화면/images/intro_wave_apng.png?id=${Math.floor(
          Math.random() * 100000
        )})`,
      });
    });
});
// .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
/* 자바스크립트
    if (currentSlide !== nextSlide) {
        document.querySelectorAll('.slick-center + .slick-cloned').forEach((next) => {
            // timeout required or Slick will overwrite the classes
            setTimeout(() => next.classList.add('slick-current', 'slick-center'));
        });
    }
    */
// IE 호환성을 고려한 제이쿼리
// if (currentSlide !== nextSlide) {
//   $(".slick-center + .slick-cloned").each(function (index, node) {
//     var $node = $(node);

//     setTimeout(function () {
//       $node.addClass("slick-current");
//       $node.addClass("slick-center");
//     });
//   });
// }
// 이 코드는 slick infinite 가 맨끝에서 다시 처음으로 돌아가거나 할때 트랜지션이 적용되기 위한 코드입니다.
// 커스텀 슬라이드

// 슬라이트 현재 카운터 텍스트 변경시 배경 apng 재시작
// $(".current").on("propertychange change", function () {
//   debugger;
//   $("body").css({ "background-image": "url(../images/wave_640.png)" });
// });
