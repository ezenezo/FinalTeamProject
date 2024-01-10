
let authId =document.getElementById('authId').value; 
getReqList(authId);
console.log(authId);
function getReqList(authId){
  spreadReqFromServer(authId).then(result =>{
    let li_1 = document.querySelector('.li_1 a');
    li_1.style = "background-color: #1e5c1e; color: white;";
    let li_2 = document.querySelector('.li_2 a');
    li_2.style = "";
    let li_3 = document.querySelector('.li_3 a');
    li_3.style = "";
    let li_4 = document.querySelector('.li_4 a');
    li_4.style = "";
    let li_5 = document.querySelector('.li_5 a');
    li_5.style = "";

    let li_6 = document.querySelector('.li_6 a');
    li_6.style = "";
      console.log(result);
      const ul = document.getElementById('req_list_ul');
      if(result.length > 0){
          ul.innerHTML="";
          for(let qvo of result){
           
              let li = `<li class="req_li"><input type="hidden" value="${qvo.requestNmStatus}" id="requestNm_"> `;
              li+= `<a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">`;
              li+= `	<div class="info" style="margin-bottom: 10px;"><span class="material-symbols-outlined" style="margin-right: 10px;"> fmd_bad </span>${qvo.form}/${qvo.categoryType}</div>`;
              li+= `<span class="title" style="font-weight: 500; margin-right: 5px; width: 70px;">시공업체</span>${qvo.companyName}<br>`;
              li+= `<div style="color: gray; font-size: 15px;">${qvo.formattedReqAt}`;
              li+= `</div><div class="btn_box"><button class="list_btn">자세히보기</button></div>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          }
      }else{
          let li = `<li>요청서가 없습니다.</li>`;
          ul.innerHTML = li;
      }       
  })

}
async function spreadReqFromServer(authId){
  try{
      const resp = await fetch('/req/request_list/'+authId);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}

function getReqList_1(authId){
  spreadReqFromServer_1(authId).then(result =>{
   
    let li_2 = document.querySelector('.li_2 a');
    li_2.style = "background-color: #1e5c1e; color: white;";
    let li_1 = document.querySelector('.li_1 a');
    li_1.style = "";
    let li_3 = document.querySelector('.li_3 a');
    li_3.style = "";
    let li_4 = document.querySelector('.li_4 a');
    li_4.style = "";
    let li_5 = document.querySelector('.li_5 a');
    li_5.style = "";

    let li_6 = document.querySelector('.li_6 a');
    li_6.style = "";
      console.log(result);
      const ul = document.getElementById('req_list_ul');
      if(result.length > 0){
          ul.innerHTML="";
          for(let qvo of result){
            let li = `<li class="req_li"><input type="hidden" value="${qvo.requestNmStatus}" id="requestNm_"> `;
            li+= `<a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">`;
            li+= `	<div class="info" style="margin-bottom: 10px;"><span class="material-symbols-outlined" style="margin-right: 10px;"> fmd_bad </span>${qvo.form}/${qvo.categoryType}</div>`;
            li+= `<span class="title" style="font-weight: 500; margin-right: 5px; width: 70px;">시공업체</span>${qvo.companyName}<br>`;
            li+= `<div style="color: gray; font-size: 15px;">${qvo.formattedReqAt}`;
            li+= `</div><div class="btn_box"><button class="list_btn">자세히보기</button></div>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          }
      }else{
          let li = `<li>거래 진행 중인 요청서가 없습니다.</li>`;
          ul.innerHTML = li;
      }       
  })

}
async function spreadReqFromServer_1(authId){
  try{
      const resp = await fetch('/req/request_list_ing/'+authId);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}
function getReqList_2(authId){
  spreadReqFromServer_2(authId).then(result =>{
   
    let li_2 = document.querySelector('.li_2 a');
    li_2.style = "";
    let li_1 = document.querySelector('.li_1 a');
    li_1.style = "";
    let li_3 = document.querySelector('.li_3 a');
    li_3.style = "background-color: #1e5c1e; color: white;";
    let li_4 = document.querySelector('.li_4 a');
    li_4.style = "";
    let li_5 = document.querySelector('.li_5 a');
    li_5.style = "";

    let li_6 = document.querySelector('.li_6 a');
    li_6.style = "";
      console.log(result);
      const ul = document.getElementById('req_list_ul');
      if(result.length > 0){
          ul.innerHTML="";
          for(let qvo of result){
            let li = `<li class="req_li"><input type="hidden" value="${qvo.requestNmStatus}" id="requestNm_"> `;
            li+= `<a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">`;
            li+= `	<div class="info" style="margin-bottom: 10px;"><span class="material-symbols-outlined" style="margin-right: 10px;"> fmd_bad </span>${qvo.form}/${qvo.categoryType}</div>`;
            li+= `<span class="title" style="font-weight: 500; margin-right: 5px; width: 70px;">시공업체</span>${qvo.companyName}<br>`;
            li+= `<div style="color: gray; font-size: 15px;">${qvo.formattedReqAt}`;
            li+= `</div><div class="btn_box"><button class="list_btn">자세히보기</button></div>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          }
      }else{
          let li = `<li>시공 중인 요청서가 없습니다.</li>`;
          ul.innerHTML = li;
      }       
  })

}
async function spreadReqFromServer_2(authId){
  try{
      const resp = await fetch('/req/request_list_start/'+authId);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}
function getReqList_3(authId){
  spreadReqFromServer_3(authId).then(result =>{
   
    let li_2 = document.querySelector('.li_1 a');
    li_2.style = "";
    let li_1 = document.querySelector('.li_2 a');
    li_1.style = "";
    let li_3 = document.querySelector('.li_3 a');
    li_3.style = "";
    let li_4 = document.querySelector('.li_4 a');
    li_4.style = "background-color: #1e5c1e; color: white;";
    let li_5 = document.querySelector('.li_5 a');
    li_5.style = "";

    let li_6 = document.querySelector('.li_6 a');
    li_6.style = "";
      console.log(result);
      const ul = document.getElementById('req_list_ul');
      if(result.length > 0){
          ul.innerHTML="";
          for(let qvo of result){
            let li = `<li class="req_li"><input type="hidden" value="${qvo.requestNmStatus}" id="requestNm_"> `;
            li+= `<a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">`;
            li+= `	<div class="info" style="margin-bottom: 10px;"><span class="material-symbols-outlined" style="margin-right: 10px;"> fmd_bad </span>${qvo.form}/${qvo.categoryType}</div>`;
            li+= `<span class="title" style="font-weight: 500; margin-right: 5px; width: 70px;">시공업체</span>${qvo.companyName}<br>`;
            li+= `<div style="color: gray; font-size: 15px;">${qvo.formattedReqAt}`;
            li+= `</div><div class="btn_box"><button class="list_btn">자세히보기</button></div>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          }
      }else{
          let li = `<li>시공완료된 요청서가 없습니다.</li>`;
          ul.innerHTML = li;
      }       
  })

}
async function spreadReqFromServer_3(authId){
  try{
      const resp = await fetch('/req/request_list_completed_1/'+authId);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}
function getReqList_4(authId){
  spreadReqFromServer_4(authId).then(result =>{
   
    let li_2 = document.querySelector('.li_1 a');
    li_2.style = "";
    let li_1 = document.querySelector('.li_2 a');
    li_1.style = "";
    let li_3 = document.querySelector('.li_3 a');
    li_3.style = "";
    let li_4 = document.querySelector('.li_4 a');
    li_4.style = "";
    let li_5 = document.querySelector('.li_5 a');
    li_5.style = "background-color: #1e5c1e; color: white;";

    let li_6 = document.querySelector('.li_6 a');
    li_6.style = "";
      console.log(result);
      const ul = document.getElementById('req_list_ul');
      if(result.length > 0){
          ul.innerHTML="";
          for(let qvo of result){
            let li = `<li class="req_li"><input type="hidden" value="${qvo.requestNmStatus}" id="requestNm_"> `;
            li+= `<a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">`;
            li+= `	<div class="info" style="margin-bottom: 10px;"><span class="material-symbols-outlined" style="margin-right: 10px;"> fmd_bad </span>${qvo.form}/${qvo.categoryType}</div>`;
            li+= `<span class="title" style="font-weight: 500; margin-right: 5px; width: 70px;">시공업체</span>${qvo.companyName}<br>`;
            li+= `<div style="color: gray; font-size: 15px;">${qvo.formattedReqAt}`;
            li+= `</div><div class="btn_box"><button class="list_btn">자세히보기</button></div>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          }
      }else{
          let li = `<li>거래 취소된 요청서가 없습니다.</li>`;
          ul.innerHTML = li;
      }       
  })

}
async function spreadReqFromServer_4(authId){
  try{
      const resp = await fetch('/req/request_list_cancel/'+authId);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}
function getReqList_5(authId){
  spreadReqFromServer_5(authId).then(result =>{
   
    let li_2 = document.querySelector('.li_1 a');
    li_2.style = "";
    let li_1 = document.querySelector('.li_2 a');
    li_1.style = "";
    let li_3 = document.querySelector('.li_3 a');
    li_3.style = "";
    let li_4 = document.querySelector('.li_4 a');
    li_4.style = "";
    let li_5 = document.querySelector('.li_5 a');
    li_5.style = "";

    let li_6 = document.querySelector('.li_6 a');
    li_6.style = "background-color: #1e5c1e; color: white;";
      console.log(result);
      const ul = document.getElementById('req_list_ul');
      if(result.length > 0){
          ul.innerHTML="";
          for(let qvo of result){
            let li = `<li class="req_li"><input type="hidden" value="${qvo.requestNmStatus}" id="requestNm_"> `;
            li+= `<a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">`;
            li+= `	<div class="info" style="margin-bottom: 10px;"><span class="material-symbols-outlined" style="margin-right: 10px;"> fmd_bad </span>${qvo.form}/${qvo.categoryType}</div>`;
            li+= `<span class="title" style="font-weight: 500; margin-right: 5px; width: 70px;">시공업체</span>${qvo.companyName}<br>`;
            li+= `<div style="color: gray; font-size: 15px;">${qvo.formattedReqAt}`;
            li+= `</div><div class="btn_box"><button class="list_btn">자세히보기</button></div>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          }
      }else{
          let li = `<li>미승인된 요청서가 없습니다.</li>`;
          ul.innerHTML = li;
      }       
  })

}
async function spreadReqFromServer_5(authId){
  try{
      const resp = await fetch('/req/request_request_no/'+authId);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}
