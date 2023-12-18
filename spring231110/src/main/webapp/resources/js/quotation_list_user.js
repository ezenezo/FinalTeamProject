let u_right = document.getElementById('u_right');



function handleClick_q(event, quotationNm) {
  event.preventDefault();


  u_right.innerHTML = "";

  postDataToServer_req("/quotation/user/" + quotationNm).then(result => {
    console.log(result);

    let list_request_all = Array.from(document.querySelectorAll('[id^="list_requset_"]'));
    list_request_all.forEach(e => {
      e.style.border = 'none';
    });

    result.forEach(rvo => {
      console.log('ID:', 'list_requset_' + rvo.requestNm);

      let list_request = document.getElementById('list_requset_' + rvo.quotationNm);

      list_request.style.border = '1px solid pink';

      let li = `공간<input type="text" value="${rvo.form}" id="subject_q"  name="form">`;
      li += `범위<input type="text" value="${rvo.categoryType}" id="subject_q" name="categoryType" >`;
      li += `범위<input type="text" value="${rvo.requestNm}" id="subject_q" name="requestNm" class="requestNm">`;
      li += `범위<input type="text" value="${rvo.requestId}" id="subject_q" name="requestId"}>`;
      li += `범위<input type="text" value="${rvo.keynumCom}" id="subject_q" name="keynum"}>`;
      li += `범위<input type="text" value="${rvo.rang}" id="subject_q" name="rang"}>`;
      li += `상태<input type="text" value="${rvo.status}" id="subject_q" name="status">`;
      li += `우편번호<input type="text" value="${rvo.zoneCode}" id="subject_q" name="zoneCode">`;
      li += `상세주소<input type="text" value="${rvo.address}" id="subject_q" name="address">`;
      li += `상세주소<input type="text" value="${rvo.detailAddress}" id="subject_q" name="detailAddress">`;
      li += `<input type="text" value="${rvo.extraAddress}" id="subject_q" name="extraAddress">`;
      li += `<input type="text" value="${rvo.squareMeter}" id="subject_q" name="squatMeter">`;
      li += `<input type="text" value="${rvo.aquareFootage}" id="subject_q" name="aquareFootage">`;
      li += `<input type="text" value="${rvo.wishBudget}" id="subject_q">`;
      li += `<input type="text" value="${rvo.requestOp}" id="subject_q" >`;
      li += `돈:<input type="text"  id="subject_q" name ="budget">`;
      li += `회사 요청사항:<input type="text"  id="subject_q" name ="requestOp">`;

      console.log(rvo.okTypeNo);
      console.log(rvo.okTypeYes);
      if (rvo.okTypeNo != true && rvo.okTypeYes != true) {
        li += `<button type="submit">결제하기</button>`;
        li += `<button type="button" id="cancel_r" onclick="cancel_btn()" >취소</button>`;
      }

      u_right.innerHTML += li;
    });

  })
}



async function postDataToServer_req(url) {
  try {
    const resp = await fetch(url);
    const result = await resp.json();
    return result;
  } catch (err) {
    console.error(err);
  }
}
function quo_user() {
  let reqNm = document.querySelector('.requestNm').value;
  postToServer_cancel(reqNm).then(result => {
    console.log(result);
    if (result == 1) {
      alert('취소 성공~!!');
      // 추가적인 처리 로직을 여기에 작성하세요
    }
  });
}



function quo_user(quotationNm) {

  var url = "/quotation/quotation_user?quotationNm=" + quotationNm;

  window.location.replace(url);
}

