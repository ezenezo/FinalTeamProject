const joinBtn = document.getElementsByClassName('joinBtn')[0];
let checkIdResult = document.getElementById('checkIdResult');
let checkPwResult = document.getElementById('checkPwResult');
let checkPwOkResult = document.getElementById('checkPwOkResult');
let checkImgResult = document.getElementById('checkImgResult');
const reg = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$"); //비밀번호 정규 표현식

checkIdResult.value = false;
checkPwResult.value = false;

//아이디 중복확인 버튼 click
document.getElementById('checkId').addEventListener('click', ()=>{
    let id = document.getElementById('id').value;
    if(id != ''){
        let userId = {
            id: id
        };

        postId(userId).then(result=>{
            if(result>0){
                Swal.fire({
                    icon: "success",
                    text: "사용 가능한 아이디입니다."
                  });
                checkIdResult.value = true;
            }else{
                Swal.fire({
                    icon: "error",
                    text: "이미 존재하는 아이디입니다."
                  });
                  checkIdResult.value = false;
                }
            })
        }else{
            Swal.fire({
                icon: "warning",
                text: "아이디를 입력해주세요."
              });
        checkIdResult.value = false;
    }
})

//controller에서 아이디 중복확인 체크
//중복된 아이디가 없다면 1 return
async function postId(userId){
    try {
        const url = '/member/checkId';
        const config = {
            method: 'post',
            headers:{
                'content-type':'application/json; charset=utf-8'
            },
            body:JSON.stringify(userId)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//submit 차단 경우의 수
document.querySelector('.form').addEventListener("submit", (e)=>{
    //아이디 중복체크에서 true를 받지 못했을 때
    if(checkIdResult.value == 'false'){
        Swal.fire({
            icon: "error",
            text: "아이디 중복체크를 확인해주세요."
          });
        e.preventDefault();
    }
    //비밀번호 정규표현식에서 true를 받지 못했을 때
    else if(checkPwResult.value == 'false' || checkPwResult.value == '') {
        Swal.fire({
            icon: "error",
            text: "비밀번호는 최소 8 자, 문자와 숫자가 포함되어야 합니다."
          });
        e.preventDefault();
    }
    //비밀번호가 일치하지 않을 때
    else if(checkPwOkResult.value == 'false' || checkPwOkResult.value == '') {
        Swal.fire({
            icon: "error",
            text: "비밀번호가 일치하지 않습니다."
          });
        e.preventDefault();
    }
    //그 외 빈칸이 있을 때
    else if(document.getElementById('userNm').value == '' || document.getElementById('email').value == '' ){
        Swal.fire({
            icon: "error",
            text: "빈칸이 없도록 작성해주십시오."
          });
        e.preventDefault();
    }
    //필수 동의 항목을 동의하지 않았을 때
    else if(document.getElementById('agree1Check').checked == false || 
        document.getElementById('agree2Check').checked == false){
        Swal.fire({
            icon: "error",
            text: "필수 항목을 동의하지 않으셨습니다."
          });
        e.preventDefault();
    }
    //첨부파일이 정규표현식에 위반될 때
    else if(checkImgResult.value == 'false'){
        Swal.fire({
            icon: "error",
            text: "업로드 불가능한 파일입니다."
          });
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


//실행 파일, 이미지 파일에 대한 정규표현식
const regExp = new RegExp("\.(exe|sh|bat|js|msi|dll)$"); //실행 파일 막기
const regExpImg = new RegExp("\.(jpg|jpeg|png|gif)$"); //이미지 파일 받기
const maxSize = 1024 * 1024 * 20;

function fileValidation(fileName, fileSize){
    if(!regExpImg.test(fileName)){ //이미지 파일이 아니면
        return 0;
    }else if(regExp.test(fileName)){ //실행 파일이라면
        return 0;
    }else if(fileSize > maxSize){
        return 0;
    }else{
        return 1;
    }
}

//이미지파일 확인
document.addEventListener('change', (e)=>{
    if(e.target.id == 'file'){
        const fileObj = document.getElementById('file').files;
        console.log(fileObj);
        let validResult = fileValidation(fileObj[0].name, fileObj[0].size); //0 또는 1로 리턴됨
        if(validResult == 0){
            alert('업로드 불가능한 파일입니다.');
            checkImgResult = false;
        }else{
            checkImgResult = true;
        }
    }
})

const modal = document.getElementsByClassName('modal')[0];
const modal2 = document.getElementById('agree2');
const body = document.querySelector('body');

//전문보기 모달창 열기
function modalOpen(){
    modal.classList.add('block');
    modal.classList.remove('none');
    body.classList.add('black');
    document.getElementsByClassName('total_nav')[0].style = 'display: none';
    window.scrollTo(0,0);
}
function modalOpen2(){
    modal2.classList.add('block');
    modal2.classList.remove('none');
    body.classList.add('black');
    document.getElementsByClassName('total_nav')[0].style = 'display: none';
    window.scrollTo(0,0);
}

//모달창 닫기
function modalExit(){
    modal.classList.remove('block');
    modal.classList.add('none');
    body.classList.remove('black');
    document.getElementsByClassName('total_nav')[0].style = 'display: flex';
}
function modalExit2(){
    modal2.classList.remove('block');
    modal2.classList.add('none');
    body.classList.remove('black');
    document.getElementsByClassName('total_nav')[0].style = 'display: flex';
}

let agree1Check = document.getElementById('agree1Check');
let agree2Check = document.getElementById('agree2Check');

//이용약관 동의 버튼을 누르면 체크박스가 눌림
document.getElementsByClassName('agree1Btn')[0].addEventListener('click', ()=>{
    agree1Check.checked = true;
})
document.getElementsByClassName('agree2Btn')[0].addEventListener('click', ()=>{
    agree2Check.checked = true;
})

//파일 선택 버튼 연동
document.getElementById('selectFile').addEventListener('click', ()=>{
    document.getElementById('file').click();
})

//전문보기를 누르지않고 체크버튼을 누르려 했다면
document.getElementById('agree1Check').addEventListener('click', ()=>{
    console.log(agree1Check.checked);
    if(agree1Check.checked == true){    
        Swal.fire("전문보기를 눌러 확인 후 체크해주십시오.");
        agree1Check.checked = false;
    }
})
document.getElementById('agree2Check').addEventListener('click', ()=>{
    if(agree2Check.checked == true){
        Swal.fire("전문보기를 눌러 확인 후 체크해주십시오.");
        agree2Check.checked = false;
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
