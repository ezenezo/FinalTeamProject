//아코디언 누르면 내용이 보이고 숨겨지게
document.addEventListener('click', (e)=>{
    if(e.target.closest('accordion_title') || e.target.classList.contains('accordion_title') || e.target.classList.contains('accordion_left'
        || e.target.classList.contains('expand'))){
        if(e.target.closest('.accordion-item').querySelector('.accordion_body').style.display == 'block'){
            e.target.closest('.accordion-item').querySelector('.accordion_body').style = 'display:none';
            e.target.closest('.accordion-item').querySelector('.accordion_left').style = 'font-weight: 400';
        }else{
            e.target.closest('.accordion-item').querySelector('.accordion_left').style = 'font-weight: 700';
            e.target.closest('.accordion-item').querySelector('.accordion_body').style = 'display:block';
        }
    }
})

//qna 리스트 가져오기
async function getCommentList(value){
    try {
        const url = '/customer/list?searchValue='+value;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//qna 뿌리기
function spreadServiceList(value){ 
    getCommentList(value).then(result=>{
        let html = document.getElementsByClassName('accordion')[0];
        html.innerHTML = '';
        if(result.length>0){
            for(let cvo of result){
                let str = ``;
                str += `<div class="accordion-item"><div class="accordion_title"><div class="accordion_left"><span class="material-symbols-outlined"> question_mark </span>`;
                str += `${cvo.title}</div><div class="accordion_right"><span class="material-symbols-outlined expand"> expand_more </span></div></div>`;
				str += `<div class="accordion_body">${cvo.content}</div></div>`;	
                html.innerHTML += str;
            }
        }
    })
}

document.addEventListener('click', (e)=>{
    //태그에 해당하는 qna 뿌리기
    if(e.target.id == 'search'){
        let value = e.target.value;
        spreadServiceList(value);
    }
    else if(e.target.closest('#question1')){
    	let value = '취소/환불';
    	spreadServiceList2(value, 0);
    }
    else if(e.target.closest('#question2')){
    	let value = '로그인/회원정보';
    	spreadServiceList2(value, 3);
    }
    else if(e.target.closest('#question3')){
    	let value = '주문/결제';
    	spreadServiceList2(value, 1);
    }
    else if(e.target.closest('#question4')){
    	let value = '서비스/기타';
    	spreadServiceList2(value, 1);
    }
})

//qna 뿌림 + 해당하는 버튼 누르기
function spreadServiceList2(value, i){ 
    getCommentList(value).then(result=>{
    let html = document.getElementsByClassName('accordion')[0];
    html.innerHTML = '';
    if(result.length>0){
        for(let cvo of result){
            let str = ``;
            str += `<div class="accordion-item"><div class="accordion_title"><div class="accordion_left"><span class="material-symbols-outlined"> question_mark </span>`;
            str += `${cvo.title}</div><div class="accordion_right"><span class="material-symbols-outlined expand"> expand_more </span></div></div>`;
            str += `<div class="accordion_body">${cvo.content}</div></div>`;	
            html.innerHTML += str;
        }
        document.querySelector('.accordion').getElementsByClassName('accordion_title')[i].scrollIntoView();
        document.querySelector('.accordion').getElementsByClassName('accordion_body')[i].style = 'display: block';
        document.querySelector('.accordion').getElementsByClassName('accordion_title')[i].style = 'font-weight: 700';
    }
    })
}