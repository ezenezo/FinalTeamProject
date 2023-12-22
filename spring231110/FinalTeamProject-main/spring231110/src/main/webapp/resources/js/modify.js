let checkImgResult = document.getElementById('checkImgResult');

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
            Swal.fire("업로드 불가능한 파일입니다.");
            checkImgResult = false;
        }else{
            checkImgResult = true;
            //이미지 미리보기
            let reader = new FileReader();
            reader.onload = function(e){
                let img = document.querySelector('#imageBox').querySelector('img');
                img.setAttribute('src', e.target.result);
                document.querySelector('#imageBox').appendChild(img);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
})

//파일 선택 버튼 연동
document.getElementById('imageBox').addEventListener('click', ()=>{
    document.getElementById('file').click();
})

document.addEventListener('input', (e)=>{
    //이메일 합체
    if(e.target.classList.contains('email')){
        document.getElementById('email').value = document.getElementById('startEmail').value + '@' + document.querySelector('select').value;
    }
})

document.getElementById('lastEmail').style = 'display:none';

//이메일 주소 변경
document.querySelector('select').addEventListener('change', (e)=>{
    console.log(e.target.value);
    //이메일 직접입력창
    if(e.target.value=="직접입력"){
        document.getElementById('lastEmail').style = 'display:block';
        document.querySelector('select').style = 'display:none';
    }
    document.getElementById('email').value = document.getElementById('startEmail').value + '@' + document.querySelector('select').value;
})

//submit 차단 경우의 수
document.querySelector('.form').addEventListener("submit", (e)=>{
    //빈칸이 있을 때
    if(document.getElementById('startEmail').value == '' || document.getElementById('email').value.substring(document.getElementById('email').value.indexOf('@')+1) == '직접입력' ){
        Swal.fire({
            icon: "error",
            text: "빈칸이 없도록 작성해주십시오."
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