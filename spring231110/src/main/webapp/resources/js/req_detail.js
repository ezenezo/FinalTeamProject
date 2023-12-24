    const alarm = document.getElementById('auth').value;
document.addEventListener('DOMContentLoaded', function() {
    
    const reqNm = document.getElementById('requestNm').value;
    
    console.log(reqNm);
    console.log(alarm);
    if(reqNm) { 
        getNav(reqNm);
    }
});

let reqNm =document.getElementById('requestNm').value;
console.log(reqNm);
function getNav(reqNm){
  spreadReqFromServer(reqNm).then(result =>{
 
      const ul = document.getElementById('nav_ul');
      if(result!=0){
          ul.innerHTML="";
          
           
              let li = `<li class="nav_li"><a href="/quotation/quotation_user?quotationNm=${result}"><span class="material-symbols-outlined">manage_search</span>견적서보기</li>`;
              li += `<li class="nav_li"><a href="/req/request_list?id=${alarm}"><span class="material-symbols-outlined">work_history</span>요청함으로 넘어가기</a></li>`;
              // if(cvo.writer == sesId){
              // }
              li+=`</li>`;
              ul.innerHTML += li;
          
      }else{

        spreadReqFromServer_cancel(reqNm).then(result1 =>{
          console.log(result1);
          
            if(!result1){
      let li = `<li class="nav_li"><a href="/req/detail/cancel_req_user/${reqNm}"><span class="material-symbols-outlined">cancel</span>요청 취소하기</a></li>`;

    li += `<li class="nav_li"><a href="/req/request_list?id=${alarm}"><span class="material-symbols-outlined">work_history</span>요청함으로 넘어가기</a></li>`;
      
    ul.innerHTML = li;
}
    
    else{

        

    let li = `<li class="nav_li"><a href="/req/request_list?id=${alarm}"><span class="material-symbols-outlined">work_history</span>요청함으로 넘어가기</a></li>`;
    
    ul.innerHTML = li;
}
    })
   
      }       
  })

}
async function spreadReqFromServer(reqNm){
  try{
      const resp = await fetch('/req/nav_get/'+reqNm);
      const result = await resp.json();
      return result;
  }catch(err){
      console.log(err);
  }
}

async function spreadReqFromServer_cancel(reqNm){
    try{
        const resp = await fetch('/status/cancel_get_user?requestNm='+reqNm);
        const result = await resp.json();
        return result;
    }catch(err){
        console.log(err);
    }
  }
  
  
  		 const ul = document.querySelector('.img_div');
 const file_img = document.getElementById('file_qvo').value;
     if(file_img==""){ ul.style.display="none";}
								    
let cancellation = document.getElementById('cancellation').value;
console.log(cancellation.length);
if(cancellation.length>0){
    let cancellation_div = document.getElementById('cancellation_div');
    cancellation_div.innerHTML += `<br><div style="color:orange">메이트가 요청서를 거절하였습니다.</div>`;
    cancellation_div.innerHTML += `<span class="label">메이트가 거절한 이유:</span> <br>
    <span class="value" style="font-weight: 700;">${cancellation}</span><br><br>`;
}

 
  
  