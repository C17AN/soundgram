// 스크롤 움직이면서 내용 text 부분이 올라오는 효과
window.addEventListener("scroll", function () {
  console.log("스크롤 동작");
  parallax(window.pageYOffset / 100);
});

window.addEventListener("touchmove", function () {
  parallax(window.pageYOffset / 100);
});

window.addEventListener("gesturechange", function () {
  parallax(window.pageYOffset / 100);
});

document.addEventListener("scroll", function () {
  console.log("스크롤 동작");
  parallax(window.pageYOffset / 100);
});

document.addEventListener("touchmove", function () {
  parallax(window.pageYOffset / 100);
});

document.addEventListener("gesturechange", function () {
  parallax(window.pageYOffset / 100);
});

var e = document.getElementsByClassName("parallax");
var i = 0;
var l = e.length;
// var o = []; // offset for each element
var v = [];
// var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var path = "polygon(0 0, 100% 0%, 50% 100%, 0% 100%)";

function parallax(scroll) {
  // console.log("Scrolled: " + scroll);
  for (i = 0; i < l; i++) {
    v[i] = e[i].className.replace(/[^-\d]+([-\d]+)/gm, "$1");
    // console.log("class value: " + v);
    e[i].style.top = scroll * v[i] + "%";
  }
  document.getElementsByClassName("intro_albumcover").style.backgroundSize =
    "120%";
}

// 스크롤 위아래 방향에 따라 커버 이미지 사이즈 변경
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
