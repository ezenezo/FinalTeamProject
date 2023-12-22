console.log("pnoVal>>> ", pnoVal);
console.log("portfolioWriter>>> ", portfolioWriter);//포폴 작성자 아이디
const authId = document.getElementById("authId").value; //세션 아이디
console.log("authId>>> ", authId);//세션 아이디


//portfolio좋아요
async function likeQtyToServer(pno,id){
    try {
        const url = "/portfolio/portfolioLike/"+pno+"/"+id;
        const config = {
            method: "post"
        };
        const resp = await fetch(url, config);
        const result = await resp.text();       
        return result;
    } catch (error) {
        console.log(error)
    }
}

//portfolio좋아요 수 가져오기
async function likeQtyAreaInput(pno){
    try {
        console.log("여기오는지 111")
        const url = "/portfolio/likeQtyAreaInput/"+pno;   
        const resp = await fetch(url);
        const result = await resp.text();  
        console.log("result 222",result);  
        return result;
    } catch (error) {
        console.log(error);
    };
};

//삭제 함수
async function deletePortfolio(pno){
    try {
        const url="/portfolio/deletePortfolio/"+pno;
        const resp = await fetch(url);
        const result =resp.text();
        return result;
    } catch (error) {
        console.log(error);
    };
};
document.addEventListener("click", (e) => {
    if (e.target.id === 'heart') {
        let iconContainer = document.getElementById("iconContainer"); //아이콘 넣을 div
        if (portfolioWriter != authId) {
            likeQtyToServer(pnoVal, authId)
                .then(result => {
                    console.log("result>>" + result);
                    if (parseInt(result) > 0) {
                        iconContainer.innerHTML = `<svg id="heart" class="colorRed"
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-heart-fill"
                        viewBox="0 0 16 16">
                            <path id="heart" class="colorRed" fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                          </svg>`;

                    } else {
                        iconContainer.innerHTML = `<svg id="heart" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                         <path id="heart"
                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>`;
                    }
                    // likeQtyToServer가 완료된 후에 likeQtyAreaInput 실행
                    return likeQtyAreaInput(pnoVal);
                })
                .then(result => {
                    document.getElementById("likeQtyArea").innerText = result;
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }else if(e.target.id === 'delBtn'){
        deletePortfolio(pnoVal).then(result=>{
            if(result>0){
                alert("삭제되었습니다.");
                   // 삭제가 완료된 후에 이전 페이지로 이동
                window.history.back();
            }else{
                alert("삭제 실패");
            }
        })
    }
});

// 댓글----------------------------------------

  // textarea에 입력이 있을 때 이벤트를 감지하여 버튼을 표시하는 함수
  document.getElementById('cmtText').addEventListener('input', function() {
    // 입력된 내용이 있는지 체크
    if (this.value.trim() !== '') {
        // 내용이 있으면 버튼을 보이게 함
        document.getElementById('cmtPostBtn').style.display = 'block';
    } else {
        // 내용이 없으면 버튼을 숨김
        document.getElementById('cmtPostBtn').style.display = 'none';
    }
});

//댓글 등록 함수 보내는 함수
async function postComment(cmtData) {
    try {
        console.log("22222222222222 ");
        const url = "/comment/postcmt";
        const config = {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(cmtData)
        };
        console.log("여기오냐 ");
        const resp = await fetch(url, config);
        const result = await resp.text(); //isOk    
        console.log("result ",result);
        return result;

    } catch (error) {
        console.log(error)
    }

}

//댓글 등록 함수 호출해서 등록
document.getElementById("cmtPostBtn").addEventListener('click', () => {
    const cmtText = document.getElementById("cmtText").value;

    console.log("cmtText ",cmtText);
    console.log("authid ",authId);
 
    let cmtData = {
        pno: pnoVal,
        id: authId,
        content: cmtText
    }
    console.log("111111111111 ");
    console.log("cmtData>>> ", cmtData);
    postComment(cmtData).then(result => {
        if (result > 0) {
            alert('댓글 등록 완료');

        } else {
            alert('댓글 등록 실패');
        }
        //전체 댓글 출력
        printCommentList(pnoVal);
        document.getElementById("cmtText").value = '';
        document.getElementById("cmtText").focus();
       
        // commentCount(pnoVal).then(result=>{
        //     console.log("댓글 갱신>>{}",result);
        //     document.getElementById("cmtQtyArea").innerText=`${result}`;
        // } )
    })
})

//댓글 요청 함수
async function spreadCommentListFromServer(pno, page) {
    try {
        const url = "/comment/list/" + pno + '/' + page;
        const resp = await fetch(url);
        const result = await resp.json(); //리스트 받음
        console.log("댓글리스트js>>{}",result);
        return result;

    } catch (error) {
        console.log(error)
    }
}


 //댓글 리스트 출력 함수
 function printCommentList(pnoVal, page = 1) { //page=1인거는 처음 뿌릴 때는 무조검 첫페이지 뿌리라고 한거(옵셔널 값은 가장 마지막에 입력)
    spreadCommentListFromServer(pnoVal, page).then(result => {
        console.log(result); //result 는 PagingHandler ph(pgvo, totalCount, cmtList)

        const ul = document.getElementById("cmtListArea");
        if (result.cdtoList.length > 0) {

            //다시 댓글을 뿌릴 때 기존 값 삭제 1page 경우
            if (page == 1) {
                ul.innerText = "";
            }

            let str = '';
            for (let cdto of result.cdtoList) {
                str += ` <li style="border-bottom: 1px solid #eaebef; padding-bottom:20px;" class="list-group-item" data-cmtno="${cdto.cvo.cmtNo}" data-cmtwriterid="${cdto.cvo.id}" data-content="${cdto.cvo.content}">`;
                str += `<div class="cmtRow1">`; 
                str += `<div class="left1"><img src="/upload/${cdto.fvo.saveDir}/${cdto.fvo.uuid}_${cdto.fvo.fileName}" class="profileImg">`;
                if(cdto.cvo.id==portfolioWriter){
                    str += `<span class="badge rounded-pill text-bg-success">업체 : ${companyNm}</span>`;
                }else{
                    str+=`${cdto.cvo.id}<span style="margin-left:10px;color:rgb(221, 221, 221);">|</span>`;
                }
                str += `<span class="miniFont dateText">${cdto.cvo.regDate}</span></div>`;   
                if(cdto.cvo.id==authId){
                    str += `<div class="btn-group">
                    <button type="button" class="trigger" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg  id="cmtTrigger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                    </button>
                    <ul style="margin-left:20px;" class="dropdown-menu miniFont circleIcon">
                      <a class="dropdown-item modBtn">수정</a>
                      <hr class="dropdown-divider">
                      <a class="dropdown-item delBtn">삭제</a>                                 
                    </ul>
                    </div>`;
                }else{
                    str += `<div class="btn-group">
                    <button type="button" class="trigger" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg  id="cmtTrigger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                    </button>
                    <ul style="margin-left:20px;" class="dropdown-menu miniFont circleIcon">
                      <li><a class="dropdown-item" href="#">프로필보기</a></li> 
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">답글달기</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">1:1채팅</a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" href="#">신고</a></li>                                    
                    </ul>
                    </div>`;
                }                                         
                str += `</div>`;
                str += `<div class="cmtRow2">`;
                str += `<input type="text" id="content" value="${cdto.cvo.content}" class="modinput" disabled>`;
                str += `<button type="button" id="modPose" class="btn btn-primary position-relative searchBtn mag0 smallBtn modPostBtn" style="padding:0px; display: none; font-size:12px">수정</button>`;
                str += `</div>`;
                str += `<div class="cmtRow3 likeCnt miniFont">`;
                str += `<div class="likeCnt miniFont" id="iconContainer2">`;
                if(cdto.cvo.likeCheck){
                    str += `<svg class="colorRed heart2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path class="colorRed heart2" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>`;
                }else{
                    str +=`<svg class="heart2" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                     <path class="heart2"
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>`;
                }              
                str += `</div>좋아요`;
                str += `<div id="cmtLikeQtyArea">${cdto.cvo.likeQty}</div></div></li>`;                                  
                                               
            }
            ul.innerHTML += str;

            //댓글 페이징 코드
            let moreBtn = document.getElementById('moreBtn');
            console.log(moreBtn, result.pgvo.pageNo, result.endPage);
            //db에서 pgvo + list 같이 가져와야 값을 줄 수 있음.
            if (result.pgvo.pageNo < result.endPage) {
                moreBtn.style.visibility = 'visible'; //버튼 표시
                moreBtn.dataset.page = page + 1;
            } else {
                moreBtn.style.visibility = 'hidden'; //버튼 숨김
            }

        } else {
            ul.innerText = "댓글이 없습니다.";
        }
    })
}


//삭제 함수
async function commentRemove(cmtNo) {   
    console.log("삭제2단계");  
    console.log("cmtNo>>{}",cmtNo);  
    try {
        const url = "/comment/remove/"+cmtNo;
        const config = {
            method: "delete"
        };
        const resp = await fetch(url, config);
        const result = await resp.text();       
        return result;
    } catch (error) {
        console.log(error)
    }
}

//수정 함수
async function editCommentToServer(cmtDataMod) {
    console.log("여기2222");
    try {
        const url = "/comment/modify";
        const config = {
            method: 'put',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(cmtDataMod)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        console.log("result>>{}",result);
        return result;
    } catch (error) {
        console.log(error);
    }
}


//삭제,수정 함수 호출하여 댓글 삭제,수정
document.addEventListener('click', (e) => {
    console.log("클릭 이벤트 발생:", e.target); 

    //삭제
    if (e.target.classList.contains('delBtn')) {   
        console.log("삭제1단계");   
        let li = e.target.closest('.list-group-item');
        let cmtNo = li.dataset.cmtno;
        console.log("li>>{}",li);
        console.log("cmtNo>>{}",cmtNo);
    
       commentRemove(cmtNo).then(result => {
      
                if (result > 0) {
                    alert('댓글 삭제 성공');
    
                } else {
                    alert('댓글 삭제 실패');
                }
                console.log("result",result);
                location.reload();
                document.getElementById('cmtText').focus();
                commentCount(bnoVal).then(result=>{
                    console.log("댓글 갱신>>{}",result);
                    document.getElementById("cmtQtyArea").innerText=`${result}`;
                })
            })
       
        
    //수정
    } else if (e.target.classList.contains('modBtn')) {

        let li = e.target.closest('li');
        let contentInput = li.querySelector('#content');
        let modPostBtn = li.querySelector('#modPose');

        // input 태그 활성화
        contentInput.disabled = false;

        // modPostBtn 보이게 설정
        modPostBtn.style.display = 'inline-block';
        
        // 포커스 설정
        contentInput.focus();

        console.log("댓글 수정 직전입니다!");

    //수정 등록(modPostBtn)
    }else if(e.target.classList.contains('modPostBtn')){
        console.log("modPostBtn누른거 맞는지:", e.target); 

        let li = e.target.closest('li');
        let cmtNo=li.dataset.cmtno;
        let modcontent=li.querySelector('#content').value;
        console.log("li",li);
        console.log("cmtNo",cmtNo);
        console.log("modcontent",modcontent);

        let cmtDataMod = {
            cmtNo:cmtNo,
            content:modcontent
        };
        console.log(cmtDataMod);      
        editCommentToServer(cmtDataMod).then(result => {
            console.log("여기1111");
            if (result > 0) {
                alert('댓글 수정 성공');
            } else {
                alert('댓글 수정 실패');
            }
            printCommentList(pnoVal);
        })
    }else if (e.target.id == 'moreBtn') {
        printCommentList(pnoVal, parseInt(e.target.dataset.page));

    }else if(e.target.classList.contains('heart2')){
        console.log("클릭한게 hear2가 맞는지 확인:", e.target);
        let li = e.target.closest('li');
        let iconContainer2 = li.querySelector('#iconContainer2'); //아이콘 넣을 div
        let cmtNo = li.dataset.cmtno;
        let cmtWriterId = li.dataset.cmtwriterid; 
        console.log("li>>>{}",li);
        console.log("cmtNo>>>{}",cmtNo);
        console.log("cmtWriterId>>>{}",cmtWriterId);
         if(cmtWriterId!=authId){
            commentLikeQtyToServer(cmtNo,authId).then(result=>{
                if(parseInt(result)>0){
                    iconContainer2.innerHTML=`<svg class="colorRed heart2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path class="colorRed heart2" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>`;
                }else{
                    iconContainer2.innerHTML=`<svg class="heart2" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                     <path class="heart2"
                        d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>`;
                }
                likeCount(cmtNo).then(result=>{
                    let cmtLikeQtyArea = li.querySelector('#cmtLikeQtyArea');
                    cmtLikeQtyArea.innerText=`${result}`;

                })
            })
           
         }

    }

})


//comment좋아요
async function commentLikeQtyToServer(cmtNo,id){
    try {
        const url = "/comment/commentLike/"+cmtNo+"/"+id;
        const config = {
            method: "post"
        };
        const resp = await fetch(url, config);
        const result = await resp.text();       
        return result;
    } catch (error) {
        console.log(error)
    }
}

document.getElementById("heart").addEventListener("click",()=>{
    let iconContainer=document.getElementById("iconContainer"); //아이콘 넣을 div
   if(boardWriter!=authId){
       likeQtyToServer(bnoVal,authId).then(result=>{   
           if(parseInt(result)>0){
               iconContainer.innerHTML=`<svg id="heart" class="colorRed" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
               <path class="colorRed heart2" fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
             </svg>`;
           }else{
               iconContainer.innerHTML=`<svg id="heart" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
               fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path
                   d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
               </svg>`;
           }
        //    location.reload();
       })
   }
   })

   async function likeCount(cmtNo){
    try {
        const url='/comment/likeCount/'+cmtNo;
        const resp = await fetch(url);
        const result = await resp.text();
        console.log("result>>{}",result);
        return result;
    } catch (error) {
        console.log(error);
    }
   }