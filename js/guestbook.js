var commentNum = 0; // 방명록의 번호

// 작성자, 방명록 내용 받아와서 등록
function receiveComment() {
  var writer = document.getElementsByName('writer');
  var comment = document.getElementsByName('comment');
  var view = document.getElementById('commentView');
  // 공백으로 제출 시 경고
  if (!writer.item(0).value === '' || comment.item(0).value === '') {
    return alert('내용을 입력하세요');
  }
  view.innerHTML +=
  `
  <table class="addWrapper">
    <tr>
      <td class="addWriter">작성자 : ` + writer.item(0).value  + `</td>
      <td class="addComment">` + comment.item(0).value + `</td>
    </tr>
    <tr>
      <td colspan="2" id="replyView` + commentNum + `" class="addReply">
        <input type="button" value="답글 등록하기" onclick="addReply(` + commentNum + `)">
      </td>
    </tr>
  </table>
  `;
  // input 값 비워주기
  writer.item(0).value = '';
  comment.item(0).value = '';
  commentNum++;
}

// 답글 달기
function addReply(num) {
  var reply = prompt('답글 내용을 입력하세요');
  var replyView = document.getElementById('replyView' + num);
  replyView.style.textAlign = 'center';
  replyView.style.color = '#C9FFC3';
  replyView.innerHTML = '';

  if (ValidUrl(reply)) {  // 답글이 URL 인지 아닌지 검사
    replyView.style.margin = '0 auto';
    replyView.innerHTML =
    `
    답글 :
    <div class="openGraphProtocol">
      <div class="OGPimg">
        <img class="icon i` + num + `" />
      </div>
      <div class="OGPinfo">
        <p class="title t` + num + `"></p>
        <p class="description d` + num + `"></p>
        <a href="" class="url u` + num + `" target="_blank"></a>
      </div>
    </div>
    `;
    openGraphProtocol(reply, num);
  } else {
    replyView.innerHTML = '답글 : ' + reply;
  }
}

// Open Graph Protocol
function openGraphProtocol(url, num) {
  var urlEncoded = encodeURIComponent(url);
  var apiKey = '590cafcb8b6f408624347743';

  // The entire request is just a simple get request with optional query parameters
  var requestUrl = 'http://opengraph.io/api/1.0/site/' + urlEncoded ;

  // If the apiKey is set then we build the URL like this!
  if(apiKey){
    requestUrl = 'https://opengraph.io/api/1.0/site/' + urlEncoded + '?app_id=' + apiKey;
  }

  // open graph request
  $.getJSON(requestUrl, function( json ) {
    // Throw the object in the console to see what it looks like!
    console.log('json', json);
    // Update the HTML elements!
    console.log(json.hybridGraph);
    document.getElementsByClassName('t' + num)[0].innerHTML = json.hybridGraph.title;
    document.getElementsByClassName('d' + num)[0].innerHTML = json.hybridGraph.description;
    document.getElementsByClassName('i' + num)[0].setAttribute('src', json.hybridGraph.image);
    document.getElementsByClassName('u' + num)[0].setAttribute('href', json.hybridGraph.url);
    document.getElementsByClassName('u' + num)[0].innerHTML = json.hybridGraph.url;
  });
}

// URL 유효성 검사
function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // 프로토콜
  '((([a-z\d](([a-z\d-]*[a-z\d])|([ㄱ-힣]))*)\.)+[a-z]{2,}|'+ // 도메인명 <-이부분만 수정됨
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // 아이피
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // 포트번호
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // 쿼리스트링
  '(\\#[-a-z\\d_]*)?$','i'); // 해쉬테그들
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}
