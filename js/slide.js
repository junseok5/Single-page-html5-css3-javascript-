var x = window.innerWidth;
var slider = document.getElementById("slider");
var slideArray = slider.getElementsByTagName("li");
var slideMax = slideArray.length - 1;
var curSlideNo = 0;

// 슬라이드 양 옆으로 이동 버튼 받아오기
var slideLeft = document.getElementById("left");
var slideRight = document.getElementById("right");

// slide bottom buttons 중앙 정렬
var slideBottomButton = document.getElementById("slideBottomButtonWrapper");
var slideBottomArray = slideBottomButton.getElementsByTagName("div");

// 화면 크기 조절에 따른 슬라이드 이미지 위치 재조정
$(window).resize(function(){
     x = window.innerWidth;
     for (i = 0; i <= slideMax; i++) {
       if (i === curSlideNo) continue;
       else slideArray[i].style.left = x + "px";
     }
}).resize();

// 5초마다 왼쪽으로 자동 슬라이드
setInterval("changeSlideLeft()", 5000);

// 슬라이드 위치 정의, 첫 번째 사진만 표시
for (i = 0; i <= slideMax; i++){
  if(i == curSlideNo) {
    slideArray[i].style.left = 0;
    slideBottomArray[i].style.backgroundColor = '#fff'; // 첫번째 슬라이드 동그란 버튼을 흰색으로 지정
  }
  else {
    slideArray[i].style.left = x + "px";
    slideBottomArray[i].style.backgroundColor = '#A6A6A6';  // 나머지 슬라이드 동그란 버튼을 회색으로 지정
  }
}

// 왼쪽, 오른쪽 아이콘 클릭 시
slideLeft.addEventListener('click', function(){
  changeSlideLeft();
}, false);
slideRight.addEventListener('click', function(){
  changeSlideRight();
}, false);

var aniStart = false; // 슬라이딩 중이라면 true 아니면 false
var next = 1;
var target = 0;

// 왼쪽 슬라이드 시작
var changeSlideLeft = function(){
  if(aniStart === true) return;
  next = curSlideNo + 1;
  if(next > slideMax) next = 0;
  // x = window.innerWidth;
  aniStart = true;
  leftSliding();
}

// 오른쪽 슬라이드 시작
var changeSlideRight = function(){
  if(aniStart === true) return;
  next = curSlideNo - 1;
  if(next < 0) next = slideMax;
  // x = window.innerWidth;
  slideArray[next].style.left = -x + "px";  // 모든 사진들의 위치가 브라우저 오른쪽 밖으로 정의되어 있는데 왼쪽에서 오른쪽으로 슬라이드를 하기위해서는 next 슬라이드를 브라우저 왼쪽 밖으로 옮겨줘야 한다.
  aniStart = true;
  rightSliding();
}

// 왼쪽으로 슬라이드 수행
function leftSliding(){
  var curX = parseInt(slideArray[curSlideNo].style.left, 10);
  var nextX = parseInt(slideArray[next].style.left, 10);
  var newCurX = curX - 10;
  var newNextX = nextX - 10;
  if (newNextX <= 0) {  // next slide가 도착하였을 시
    slideArray[curSlideNo].style.left = x + "px";
    slideArray[next].style.left = 0;
    slideBottomArray[curSlideNo].style.backgroundColor = '#A6A6A6';
    slideBottomArray[next].style.backgroundColor = '#fff';  // 도착한 슬라이드 동그란 버튼 흰색으로 바꾸기
    curSlideNo = curSlideNo + 1;
    if (curSlideNo > slideMax) curSlideNo = 0;  // 현재 슬라이드 숫자가 마지막 슬라이드 보다 클 시 다시 첫 슬라이드로 지정
    aniStart = false;
    return;
  }
  slideArray[curSlideNo].style.left = newCurX + "px";
  slideArray[next].style.left = newNextX + "px";
  setTimeout(function(){
    leftSliding();
  },1);
}

// 오른쪽으로 슬라이드 수행
function rightSliding(){
  var curX = parseInt(slideArray[curSlideNo].style.left, 10);
  var nextX = parseInt(slideArray[next].style.left, 10);
  var newCurX = curX + 10;
  var newNextX = nextX + 10;
  if (newNextX >= 0) {
    slideArray[curSlideNo].style.left = x + "px";
    slideArray[next].style.left = 0;
    slideBottomArray[curSlideNo].style.backgroundColor = '#A6A6A6';
    slideBottomArray[next].style.backgroundColor = '#fff';
    curSlideNo = curSlideNo - 1;
    if (curSlideNo < 0) curSlideNo = slideMax;
    aniStart = false;
    return;
  }
  slideArray[curSlideNo].style.left = newCurX + "px";
  slideArray[next].style.left = newNextX + "px";
  setTimeout(function(){
    rightSliding();
  },1);
}

// bottom button에 대한 슬라이딩 수행 함수
function changeButtonSliding() {
  if(aniStart === true) return;
  if (curSlideNo > target) { // Right Sliding
    next = curSlideNo - 1;
    aniStart = true;
    slideArray[next].style.left = -x + "px";
    buttonRightSliding();
  }
  else if (curSlideNo < target) { // Left Sliding
    next = curSlideNo + 1;
    aniStart = true;
    buttonLeftSliding();
  }
  else if (curSlideNo === target){
    return;
  }
}

// bottom button right sliding
function buttonRightSliding(){
  var curX = parseInt(slideArray[curSlideNo].style.left, 10);
  var nextX = parseInt(slideArray[next].style.left, 10);
  var newCurX = curX + 35;
  var newNextX = nextX + 35;
  if (newNextX >= 0) {
    slideArray[curSlideNo].style.left = x + "px";
    slideArray[next].style.left = 0;
    slideBottomArray[curSlideNo].style.backgroundColor = '#A6A6A6';
    slideBottomArray[next].style.backgroundColor = '#fff';
    curSlideNo = curSlideNo - 1;
    //if (curSlideNo < 0) curSlideNo = slideMax;
    aniStart = false;
    changeButtonSliding();
    return;
  }
  slideArray[curSlideNo].style.left = newCurX + "px";
  slideArray[next].style.left = newNextX + "px";
  setTimeout(function(){
    buttonRightSliding();
  },1);
}

// bottom button left sliding
function buttonLeftSliding() {
  var curX = parseInt(slideArray[curSlideNo].style.left, 10);
  var nextX = parseInt(slideArray[next].style.left, 10);
  var newCurX = curX - 35;
  var newNextX = nextX - 35;
  if (newNextX <= 0) {  // next slide가 도착하였을 시
    slideArray[curSlideNo].style.left = x + "px";
    slideArray[next].style.left = 0;
    slideBottomArray[curSlideNo].style.backgroundColor = '#A6A6A6';
    slideBottomArray[next].style.backgroundColor = '#fff';  // 도착한 슬라이드 동그란 버튼 흰색으로 바꾸기
    curSlideNo = curSlideNo + 1;
    //if (curSlideNo > slideMax) curSlideNo = 0;  // 현재 슬라이드 숫자가 마지막 슬라이드 보다 클 시 다시 첫 슬라이드로 지정
    aniStart = false;
    changeButtonSliding();
    return;
  }
  slideArray[curSlideNo].style.left = newCurX + "px";
  slideArray[next].style.left = newNextX + "px";
  setTimeout(function(){
    buttonLeftSliding();
  },1);
}

// 슬라이드 밑의 동그란 버튼들을 클릭했을 때 그에 맞는 슬라이딩 함수
function bottomButtonSliding(btNum){
  target = btNum;
  changeButtonSliding();
}
