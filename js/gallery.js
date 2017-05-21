var gallery = document.getElementsByClassName('galleryImg');
var pop_gallery = document.getElementById('pop_gallery');
var pop_gallery_img = document.getElementsByClassName('pop_galleryImg');

var modalImgNum = 0;
var modalDelChk = [false, false, false, false, false ,false];
var modalLength = modalDelChk.length;

//localStorage.clear();

// 삭제된 이미지 localStorage를 통해 보이지 않는다.
(function DeletedImg() {
  for (var i = 0; i < modalLength; i++) {
    if (localStorage.getItem('ModalDelImg'+i)) {
      gallery[i].style.display = 'none';
      modalDelChk[i] = true;
    }
  }
})();

// gallery 이미지 삭제
function galleryDel(id) {
  gallery[id].style.display = 'none';
  modalDelChk[id] = true;
  localStorage.setItem('ModalDelImg'+id, true);
}

// gallery 이미지 클릭 시 모달창 띄우기
function galleryModalOpen(id) {
  modalImgNum = id;
  pop_gallery.style.visibility = 'visible';
  pop_gallery_img[id].style.visibility = 'visible';
}

// 모달창 클릭 시 닫기
function galleryModalClose() {
  pop_gallery.style.visibility = 'hidden';
  pop_gallery_img[modalImgNum].style.visibility = 'hidden';
}

// 모달창 사진 Right Slide
function modalRightSlide() {
  pop_gallery_img[modalImgNum].style.visibility = 'hidden';
  if (++modalImgNum > modalLength - 1) {
    modalImgNum = 0;
  }
  modalIsDel_Right();
  pop_gallery_img[modalImgNum].style.visibility = 'visible';
}

// 모달창 사진 Left Slide
function modalLeftSlide() {
  pop_gallery_img[modalImgNum].style.visibility = 'hidden';
  if (--modalImgNum < 0) {
    modalImgNum = modalLength - 1;
  }
  if (modalDelChk[modalImgNum]) {
    --modalImgNum;
  }
  modalIsDel_Left();
  pop_gallery_img[modalImgNum].style.visibility = 'visible';
}

/* 현재 모달 이미지가 삭제 된 이미지인지 아닌지 확인하여
 삭제 된 사진이면 그 다음 슬라이드 숫자를 반환 */
function modalIsDel_Right() {
  var count = 0;
  while (modalDelChk[modalImgNum]) {
    if (count === modalLength) break; // count가 3일 시 사진이 모두 삭제 된 경우임, 무한 루프 방지
    modalImgNum++;
    count++;
    if (modalImgNum > modalLength - 1) {
      modalImgNum = 0;
    }
  }
}
function modalIsDel_Left() {
  var count = 0;
  while (modalDelChk[modalImgNum]) {
    if (count === modalLength) break;
    modalImgNum--;
    count++;
    if (modalImgNum < 0) {
      modalImgNum = modalLength - 1;
    }
  }
}
