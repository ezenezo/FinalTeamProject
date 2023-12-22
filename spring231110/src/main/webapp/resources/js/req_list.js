
async function req_list_ing(quotationNm) {


    
        try {
            console.log(id);
            const url = '/req/req_list?id=' + id;
            const resp = await fetch(url);
            const result = await resp.json();
            return result;
    
        } catch (error) {
            console.log(error);
        }
    }
async function getCommentList_2_1(checkedValue) {
//확인여부
let quotationNms = document.querySelectorAll('.quo_click'); 

quotationNms.forEach(quotationInput => {
    if (result && result.length > 0) {
        cards.innerHTML = '<h2>원하시는 공사 범위를 선택해주세요.</h2><br><div class="box_card"></div>';

        result.forEach((rvo) => {

            let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
            li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}" style="height: 100px; line-height: 30px;">`;
            li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox1" name="subject"`;
            li += `  value="${rvo.subject}" id="checkbox-${rvo.subject}" onclick="clickCheck1(this)">`;
            li += `   </div> </div ></div> </label ></li >`;
            cards.querySelector('.box_card').innerHTML += li;
        });
        let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_2()">확인</button></div>';
        cards.innerHTML += btnBox;


   



    }
});

}