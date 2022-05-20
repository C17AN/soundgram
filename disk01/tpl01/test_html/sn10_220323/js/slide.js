console.clear();

// animation on scroll
AOS.init({
  //once:true,
  duration: 50,
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
      $("#cr10").css({
        "background-image": `url(../images/cr10_wave_apng.png?id=${Math.floor(
          Math.random() * 100000
        )})`,
      });
    });
});

