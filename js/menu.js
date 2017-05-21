var menuIconWrapper = document.getElementsByClassName('MenuIconWrapper');

// Menu 아이콘 클릭 시 애니메이션
function menuAnimation() {
    menuIconWrapper[0].classList.toggle("change");
}

// 메뉴 목록 클릭 시 스크롤바 이동
function menuMoveTo(item) {
  document.getElementById(item).scrollIntoView();
}
