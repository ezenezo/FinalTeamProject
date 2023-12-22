console.log("rnoVal>>> ", rnoVal);
console.log("reviewWriter>>> ", reviewWriter);//작성자 아이디
const authId = document.getElementById("authId").value; //세션 아이디
console.log("authId>>> ", authId);//작성자 아이디


//삭제 함수
async function deleteReview(rno){
    try {
        const url="/review/deleteReview/"+rno;
        const resp = await fetch(url);
        const result =resp.text();
        return result;
    } catch (error) {
        console.log(error);
    };
};
document.addEventListener("click", (e) => {
    if(e.target.id === 'delBtn'){
        deleteReview(rnoVal).then(result=>{
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

function starRate(){
    let starBox = document.querySelector('.starBox');
    let str=``;
    for (let j = 0; j < rate; j++) {
        str += `<svg style="width: 20px;
        height: 20px;
        flex: 0 0 auto;color: #f7f77e;" class="st2" xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path class="st2"
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
    }
    starBox.innerHTML=str;
}


   