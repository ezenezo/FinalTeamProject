//submit 차단 경우의 수
document.querySelector('.form').addEventListener("submit", (e)=>{
    //빈칸이 있을 때
    if(document.getElementById('email').value == '' || document.getElementById('id').value == '' ){
        alert('빈칸이 없도록 작성해주십시오.');
        e.preventDefault();
    }
})
