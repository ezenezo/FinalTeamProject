let u_right = document.getElementById('u_right');
let u_left = document.getElementById('u_left');


let authEmail = document.getElementById('authIdValue').value;
console.log("아이디값 가져오기" + authEmail);




async function handleClick_q(event, requestNm) {
  try {
    const rightDivElements = Array.from(document.querySelectorAll('[id^="right_div_"]'));
    rightDivElements.forEach(element => {
      element.removeAttribute('style');
    });

    event.preventDefault();

    u_right.innerHTML = "";

    const result = await postDataToServer_req(`/quotation/${requestNm}`);
    console.log(result);

    const listRequestAll = Array.from(document.querySelectorAll('[id^="list_requset_"]'));
    listRequestAll.forEach(element => {
      element.style.border = '';
      element.removeAttribute('style');
    });

    if (result && result.rvo) {
      const rvo = result.rvo;
      const fvo = result.flist;
      const fileImg = result.file_img;
      const mvo = result.mvo;
      const readAfter = document.getElementById(`read_after_${rvo.requestNm}`);
      console.log('ID:', `list_requset_${rvo.requestNm}`);

      const listRequest = document.getElementById(`list_requset_${rvo.requestNm}`);
      const notBadge = document.getElementById(`not_badge_${rvo.requestNm}`);
      listRequest.style.border = '3px solid rgb(202, 215, 191)';
      listRequest.style.backgroundColor = 'white';
      if (notBadge) {
        notBadge.innerText = `확인중`;
      }
      if (userRole == "ROLE_COM") {
        postDataToServer_al("/quotation/alarm/" + userId);
      } else {
        postDataToServer_al("/quotation/alarm_user/" + userId);
      }


      let li = `<div id="right_div_${rvo.requestNm}" class="right_div">`;
      li += `<div class="title_right">`;
      li += `<div><img alt="그림 없당" src="${fileImg ? `/upload/${fileImg.saveDir.replace(/\\/g, '/')}/${fileImg.uuid}_${fileImg.fileName}` : '../../../resources/img/profile_none.png'}" class="p_img"></div>`;
      li += `<div class="user_info">`;
      li += `<div class="user_id">${rvo.requestId}님의 요청서</div>`;
      li += `<div class="user_email"><span class="material-symbols-outlined">mail</span>${mvo.email}</div>`;
      li += `<a href="/chaturl/chat2?toID=${rvo.requestId}&fromID=${rvo.keynumCom}"><button type="button" class="chat_url">채팅하기</button></a></div>`;
      li += `</div>`;

      li += `<div class="right_detile"><div class="b_div_right"><div class="form_detiail"><div class="value_row_form">${rvo.form} </div>|<div class="value_row_cate">${rvo.categoryType}</div></div>`;
      li += `<div class="value_row"><span class="label"></span> <span class="value"><input value="${rvo.requestNm}" type="hidden" class="requestNm" name="requestNm"></span></div>`;
      li += `<div class="value_row"><span class="label">요청업체 : </span> <span class="value">${rvo.keynumCom}</span></div>`;
      li += `<div class="value_row"><span class="label">범위   : </span> <span class="value">${rvo.extent}</span></div>`;
      li += `<div class="value_row"><span class="label">상태   :</span> <span class="value">${rvo.status}</span></div></div>`;
      li += `<div class="b_div_right"><div class="value_row"><span class="label">우편번호:</span> <span class="value">${rvo.zoneCode}</span></div>`;
      li += `<div class="value_row"><span class="label">주소:</span> <span class="value">${rvo.address}</span></div>`;
      li += `<div class="value_row"><span class="label">상세주소:</span> <span class="value">${rvo.detailAddress}</span></div>`;
      li += `<div class="value_row">참조주소:${rvo.extraAddress}</div></div>`;
      li += `<div class="b_div_right"><div class="value_row">제곱미터:${rvo.squareMeter}m<sup>2</sup></div>`;
      li += `<div class="value_row">평수:${rvo.squareFootage}평</div>`;
      if (`${rvo.wishBudget}` == "협의결정") {
        li += `<div class="value_row">희망비용:${rvo.wishBudget}</div>`;
      } else {
        li += `<div class="value_row">희망비용:${rvo.wishBudget}원</div>`;
      }
      li += `<div class="value_row">요청사항:${rvo.requestOp}</div></div>`;

      if (fvo) {
        li += `<div class="">${rvo.requestId}님의 추구하는 인테리어 분위기 </div>`;
        let filePath = `/upload/${fvo.saveDir.replace(/\\/g, '/')}/${fvo.uuid}_${fvo.fileName}`;
        
        console.log(filePath);
        li += `<li><div><img alt="그림 없당" src="${filePath}"></div></li>`;
      } else {
          
      }

      if (rvo.okTypeNo != true && rvo.okTypeYes != true) {
        li += `<div class="btn_box"><button type="button" class="btn" id="btn" onclick="ok_btn(${rvo.requestNm})"><span>승인</span></button>`;
        li += `<button type="button" id="cancel_r" onclick="cancel_btn()" class="btn" id="btn" >반려</button></div>`;
        li += `</ul></div>`;
      } else if (rvo.okTypeNo != true && rvo.okTypeYes == true) {
        const resultSvo = await postDataToServer_req(`/status/payment/${requestNm}`);
        const completed_req = await postDataToServer_req(`/status/completed_req/${requestNm}`);
        if (resultSvo) {
        
         if(completed_req){
          li += ``;
          
         }else{
          li += `<div class="btn_box"><button type="button" class="btn" id="btn" onclick="modify(${rvo.requestNm})" style="width: 180px;"><span>견적서수정</span></button>`;
          li += `<div class="btn_box"><button type="button" class="btn" id="btn" onclick="completed(${rvo.requestNm},authEmail)" style="width: 180px;"><span>시공완료</span></button>`; 
        }

        } else {
          li += `<div class="btn_box"><button type="button" class="btn" id="btn" onclick="modify(${rvo.requestNm})" style="width: 180px;"><span>견적서수정</span></button>`;
        }
      }
      u_right.innerHTML += li;
      const user_id = document.querySelector('.user_id');
      if (rvo.okTypeNo) {
        user_id.innerText += "(거래취소)";
      }

      setTimeout(function () {
        const elements = document.getElementById(`right_div_${rvo.requestNm}`);
        elements.style.opacity = '1';
      }, 100);
    } else {

    }
  } catch (error) {
 
  }
}



/*function left_list() {
  const uLeft = document.getElementById("u_left");

  postDataToServer_left("/quotation/left/" + authEmail).then(result => {
    console.log("값가져오기" + result);


    Array.from(uLeft.children).forEach(child => {
      child.style.opacity = 0;
      child.style.visibility = "hidden";
      child.style.transition = "opacity 0.5s ease-out"; // 트랜지션 효과 추가
    });

   
    uLeft.innerHTML = '';

    result.forEach(rvo => {
      let li = document.createElement("li");
      li.className = "list_requset";
      li.id = "list_requset_" + rvo.requestNm;

      li.innerHTML += `<a href="#" onclick="handleClick_q(event, ${rvo.requestNm})">`;
      li.innerHTML += `  <span class="not_badge"></span>`;
      li.innerHTML += `  <input type="hidden" value="${rvo.requestNm}" id="requestNm" class="quo_click">`;
      li.innerHTML += `  ${rvo.requestId}<br>${rvo.form}<br>${rvo.categoryType}<br>${rvo.address}</a>`;

      uLeft.appendChild(li);

      li.style.opacity = 1;
      li.style.visibility = "visible";
    });
  });

  postDataToServer_left("/quotation/left/read/" + authEmail).then(result => {
    console.log("값가져오기" + result);

    // 현재 보여지는 요소들을 투명하게 만들고 숨기기
    Array.from(uLeft.children).forEach(child => {
      child.style.opacity = 0;
      child.style.visibility = "hidden";
      child.style.transition = "opacity 0.5s ease-out"; // 트랜지션 효과 추가
    });

    result.forEach(rvo => {
      let li = document.createElement("li");
      li.className = "list_requset";
      li.id = "list_requset_" + rvo.requestNm;
    
      li.innerHTML += `<a href="#" onclick="handleClick_q(event, ${rvo.requestNm})">`;
      li.innerHTML += `  <input type="hidden" value="${rvo.requestNm}" id="requestNm" class="quo_click">`;
      li.innerHTML += `  ${rvo.requestId}<br>${rvo.form}<br>${rvo.categoryType}<br>${rvo.address}</a>`;
    
    
      li.style.height = '0';
      uLeft.appendChild(li);
    
    
      getComputedStyle(li).height;
    
 
      li.style.height = '';
      li.style.transition = 'height 0.5s';
    
      // 새로운 요소를 투명에서 불투명으로 만들기 (페이드 인)
      li.style.opacity = 1;
      li.style.visibility = "visible";
    });
  });
}  ) 
} 



function left_list() {
  const uLeft = document.getElementById("u_left");

  postDataToServer_left("/quotation/left/" + authEmail).then(result => {
    console.log("값가져오기" + result);

    // 현재 보여지는 요소들을 투명하게 만들고 숨기기
    Array.from(uLeft.children).forEach(child => {
      child.style.opacity = 0;
      child.style.visibility = "hidden";
      child.style.transition = "opacity 0.5s ease-out"; // 트랜지션 효과 추가
    });

    // 모든 자식 요소들 삭제
    uLeft.innerHTML = '';

    result.forEach(rvo => {
      let li = document.createElement("li");
      li.className = "list_requset";
      li.id = "list_requset_" + rvo.requestNm;

      li.innerHTML += `<a href="#" onclick="handleClick_q(event, ${rvo.requestNm})">`;
      li.innerHTML += `  <span class="not_badge"></span>`;
      li.innerHTML += `  <input type="hidden" value="${rvo.requestNm}" id="requestNm" class="quo_click">`;
      li.innerHTML += `  ${rvo.requestId}<br>${rvo.form}<br>${rvo.categoryType}<br>${rvo.address}</a>`;

      uLeft.appendChild(li);

      // 새로운 요소를 투명에서 불투명으로 만들기 (페이드 인)
      li.style.opacity = 1;
      li.style.visibility = "visible";
    });
  });

  postDataToServer_left("/quotation/left/read/" + authEmail).then(result => {
    console.log("값가져오기" + result);

    Array.from(uLeft.children).forEach(child => {
      child.style.opacity = 0;
      child.style.visibility = "hidden";
      child.style.transition = "opacity 0.5s ease-out"; // 트랜지션 효과 추가
    });

    result.forEach(rvo => {
      let li = document.createElement("li");
      li.className = "list_requset";
      li.id = "list_requset_" + rvo.requestNm;

      li.innerHTML += `<a href="#" onclick="handleClick_q(event, ${rvo.requestNm})">`;
      li.innerHTML += `  <span class="not_badge"></span>`;
      li.innerHTML += `  <input type="hidden" value="${rvo.requestNm}" id="requestNm" class="quo_click">`;
      li.innerHTML += `  ${rvo.requestId}<br>${rvo.form}<br>${rvo.categoryType}<br>${rvo.address}</a>`;

      uLeft.appendChild(li);

      li.style.opacity = 1;
      li.style.visibility = "visible";
    });
  });
}


  setInterval(function () {
   left_list();
  }, 3000);

async function postDataToServer_left(url) {
  try {
    const resp = await fetch(url);
    const result = await resp.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
*/




function cancel_btn() {
  let reqNm = document.querySelector('.requestNm').value;


  Swal.fire({
  title: '요청서를 거절하시면<br> 다시 복구할 수 없습니다.',
  // text: "다른 페이지로 이동하면 다시 복구시킬 수 없습니다.",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '거절',
  cancelButtonText: '취소'
  }).then((result) => {
  if (result.value) {
  postToServer_cancel(reqNm).then(result => {
  console.log(result);
  if (result == 1) {
  
        Swal.fire({
          title: '요청서가 취소되었습니다.',
  
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
  
        setTimeout(function () {
          cancellation_reason(reqNm)
        }, 2100);
      }
    });
  }
  })
  }
function cancellation_reason(reqNm) {

  var url = "/req/cancellation_reason?requestNm=" + reqNm;

  window.location.replace(url);
}
function cancellation_reason(reqNm) {

  var url = "/req/cancellation_reason?requestNm=" + reqNm;

  window.location.replace(url);
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

function ok_btn(requestNm) {

  var url = "/quotation/quotation?requestNm=" + requestNm;

  window.location.replace(url);
}


function modify(requestNm) {

  var url = "/quotation/modify?requestNm=" + requestNm;

  window.location.replace(url);
}

function completed(requestNm,keynumCom) {
  Swal.fire({
      title: '시공이 완료되었습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#11a441a8',
      cancelButtonColor: 'rgb(108 86 86)',
      confirmButtonText: '전송',
      cancelButtonText: '취소'
  }).then((result) => {
      if (result.isConfirmed) {
        
          Swal.fire({
              title: '시공 완료 처리되었습니다.',
              icon:"success",
              timer: 2000,
              showConfirmButton: false,
          });

          setTimeout(() => {
            var url = "/quotation/completed?requestNm=" + requestNm + "&keynumCom=" +keynumCom;


        window.location.replace(url);
          }, 2100);
      }
  });
}


async function postToServer_cancel(reqNm, cancellationReason) {
  try {
    const url = "/quotation/cancel/" + reqNm;
    const config = {
      method: "post",
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ reason: cancellationReason }) // 취소 사유를 body에 추가
    };

    const resp = await fetch(url, config);
    const result = await resp.text(); //isOk
    return result;
  } catch (err) {
    console.log(err);
  }
}

/*
async function ok_btn(requestNm) {
  try {
    const url = "/quotation/quotation/" +requestNm;
    const config = {
      method: "post",
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },

    };

    const resp = await fetch(url, config);
    const result = await resp.text(); //isOk
    return result;
  } catch (err) {
    console.log(err);
  }
}


*/
let source = new EventSource("/list?id=" + authEmail);

source.addEventListener('message', function (event) {
  let data = JSON.parse(event.data);
  console.log(data);

}, false);

source.addEventListener('error', function (event) {
  if (event.target.readyState === EventSource.CLOSED) {
    console.log('EventSource closed');
  } else if (event.target.readyState === EventSource.CONNECTING) {
    console.log('EventSource reconnecting');
  } else {
    console.error('EventSource error:', event);
  }
}, false);