const joinBtn = document.getElementsByClassName('joinBtn')[0];
let checkImgResult = document.getElementById('checkImgResult');

//submit 차단 경우의 수
document.querySelector('.form').addEventListener("submit", (e)=>{
    //빈칸이 있을 때
    if(document.getElementById('userNm').value == '' || document.getElementById('email').value == '' ){
        Swal.fire({
            icon: "error",
            text: "빈칸이 없도록 작성해주십시오."
          });
        e.preventDefault();
    }
    //필수 동의 항목을 동의하지 않았을 때
    else if(document.getElementById('checkAll').checked == false){
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
}
function modalOpen2(){
    modal2.classList.add('block');
    modal2.classList.remove('none');
    body.classList.add('black');
}

//모달창 닫기
function modalExit(){
    modal.classList.remove('block');
    modal.classList.add('none');
    body.classList.remove('black');
}
function modalExit2(){
    modal2.classList.remove('block');
    modal2.classList.add('none');
    body.classList.remove('black');
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

//전체 동의 체크 + 체크해제
document.getElementById('checkAll').addEventListener('click', (e)=>{
    //체크값이 true
    if(e.target.checked == true){ 
        agree1Check.checked = true;
        agree2Check.checked = true;
    }else{ 
        //false
        agree1Check.checked = false;
        agree2Check.checked = false;
    }
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