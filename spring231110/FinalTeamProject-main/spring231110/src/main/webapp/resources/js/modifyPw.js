const checkPwResult = document.getElementById('checkPwResult');
const reg = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$"); //비밀번호 정규 표현식

checkPwResult.value = false;

//submit 차단 경우의 수
document.querySelector('.form').addEventListener("submit", (e)=>{
    //비밀번호 정규표현식에서 true를 받지 못했을 때
    if(checkPwResult.value == 'false' || checkPwResult.value == '') {
        alert("비밀번호는 최소 8 자, 문자와 숫자가 포함되어야 합니다.");
        e.preventDefault();
    }
    //입력받은 두 비밀번호가 일치하지 않을 때
    else if(document.getElementById('pw').value != document.getElementById('pw2').value){
        alert('비밀번호가 일치하지 않습니다.');
        e.preventDefault();
    }
    //그 외 빈칸이 있을 때
    else if(document.getElementById('pw').value == '' || document.getElementById('pw2').value == '' ){
        alert('빈칸이 없도록 작성해주십시오.');
        e.preventDefault();
    }
})

//비밀번호 정규 표현식 확인
document.getElementById('pw').addEventListener('input', ()=>{
    let pw = document.getElementsByClassName('password')[0];
    let pwOk = document.getElementsByClassName('passwordOk')[0];
    if(!reg.test(document.getElementById('pw').value)){
        pw.classList.add('block');
        pw.classList.remove('none');
        pwOk.classList.remove('block');
        pwOk.classList.add('none');
        checkPwResult.value = false;
    }else{
        pw.classList.add('none');
        pw.classList.remove('block');
        pwOk.classList.remove('none');
        pwOk.classList.add('block');
        checkPwResult.value = true;
    }
})

//비밀번호 일치 확인
document.getElementById('pwCheck').addEventListener('input', ()=>{
    let pwCk = document.getElementsByClassName('passwordCheck')[0];
    let pwOkCk = document.getElementsByClassName('passwordCheckOk')[0];
    if(document.getElementById('pw').value == document.getElementById('pwCheck').value){ //비밀번호가 일치하면
        pwCk.classList.add('none');
        pwCk.classList.remove('block');
        pwOkCk.classList.remove('none');
        pwOkCk.classList.add('block');
        checkPwOkResult.value = true;
    }else{//일치하지 않으면
        pwCk.classList.add('block');
        pwCk.classList.remove('none');
        pwOkCk.classList.remove('block');
        pwOkCk.classList.add('none');
        checkPwOkResult.value = false;
    }
})

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

document.getElementById('eye2').addEventListener('click', (e)=>{
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
