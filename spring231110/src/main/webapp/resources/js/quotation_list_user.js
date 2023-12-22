let u_right = document.getElementById('u_right');





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


//확인여부
let quotationNms = document.querySelectorAll('.quo_click'); 

quotationNms.forEach(quotationNm => {
  let checked = Boolean(document.getElementById(`checked_ok_${quotationNm.value}`).value);
  if (checked) {
    console.log("여기들어옴");
    document.querySelector(`#list_requset_${quotationNm.value} .checked_div`).innerHTML=`확인한 견적서`;
  } else {
    document.querySelector(`#list_requset_${quotationNm.value} .checked_div`).innerHTML=`미확인 견적서`;
  }
});
