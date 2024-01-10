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

quotationNms.forEach(quotationInput => {
  let quotationNm = quotationInput.value;
  let checked = document.getElementById(`checked_ok_${quotationNm}`).value;
  console.log(checked);

 
let checkedDiv = document.querySelector(`.checked_div_${quotationNm}`);
console.log(checkedDiv);

if (checkedDiv) {
  if (checked=='true') {
    console.log("여기들어옴");
    checkedDiv.innerHTML = `<div style="color:green">확인한 견적<div>`;
  } else {
    checkedDiv.innerHTML = `<div style="color:orange">미확인 견적<div>`;
  }
} else {
  console.error(`ID가 checked_div_${quotationNm}인 요소를 찾을 수 없습니다.`);
}
})
