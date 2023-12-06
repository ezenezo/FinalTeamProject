document.getElementById('eye1').addEventListener('click', (e)=>{
    //비밀번호 보기
    if(e.target.classList.contains('bi-eye-fill')){
        e.target.classList.toggle('bi-eye-fill');
        e.target.classList.toggle('bi-eye-slash-fill');
        e.target.closest('.mb-3').querySelector('input').type = 'password';
    }else{ //비밀번호 가리기
        e.target.classList.toggle('bi-eye-fill');
        e.target.classList.toggle('bi-eye-slash-fill');
        e.target.closest('.mb-3').querySelector('input').type = 'text';
    }
})