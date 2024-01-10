document.getElementById('trigger1').addEventListener('click', () => {
    document.getElementById('files1').click();
});
let fileZone = document.getElementById('fileZone');
const regExp = new RegExp("\.(exe|sh|bat|js|msi|dll)$");
const regExpImg = new RegExp("\.(jpg|jpeg|png|gif)$");
const maxSize = 1024 * 1024 * 20;

function fileValidation(fileName, fileSize) {
    if (!regExpImg.test(fileName)) {
        return 0;
    } else if (regExp.test(fileName)) {
        return 0;
    } else if (fileSize > maxSize) {
        return 0;
    } else {
        return 1;
    }
}

let selectedFiles = [];

function createFilePreview() {

    let div = document.getElementById('fileZone');

    div.innerHTML = "";
  
    let isOk = 1;
    let ul = ``;

    selectedFiles.forEach((file, i) => {
        let validResult = fileValidation(file.name, file.size);
        isOk *= validResult;
        let btn_div = document.getElementById('btn_div');
        btn_div.innerHTML='';
        ul.innerHTML='';
        ul += `<div class="upload_img_${i}" style="width: 500px; height: 500px; background-size: cover" id="img_div_id" style="text-align: center;"></div><br>`;
       // explain.innerHTML += `<div id="ok_no_${i}" style="text-align: center;>${validResult ? '<div class="fw-bold">업로드 가능</div>' : '<div class="fw-bold text-danger">업로드 불가능</div>'}</div>`;
        btn_div.innerHTML += `	<button type="button" id="trigger${i}" class="modify_btn">수정하기</button>`;
    });

    ul += `</ul>`;
    div.innerHTML = ul;

    selectedFiles.forEach((file, i) => {
        document.getElementById(`trigger${i}`).addEventListener('click', () => {
            document.getElementById('files1').click();
         
        });
    });
    
    if (isOk == 0) {
        document.getElementById('regBtn').disabled = true;
        document.getElementById('regBtn').style.backgroundColor='gray';
        Swal.fire({
            title: '잘못된 형식의 파일입니다.',
          
                text:`다른 이미지 파일 부탁드립니다.`,
            icon: 'warning',
          
     
        });
    }else{
        document.getElementById('regBtn').style.backgroundColor='';
    }
}

let fileInput = document.getElementById('files1');

document.getElementById('files1').addEventListener('change', (e) => {
    if (e.target.files.length === 0) { 
        return;
    }
    Array.from(e.target.files).forEach(file => {
        selectedFiles.splice(-1);
        selectedFiles.push(file);
        fileInput.addEventListener('change', function(e) {
            if (this.files.length == 0) {
                e.preventDefault();
            }
        });
    });

    document.getElementById('regBtn').disabled = false;
    createFilePreview();
});

function setThumbnail(event) {
    const fileObj = document.getElementById('files1').files;
    for (let i = 0; i < fileObj.length; i++) {
        var reader = new FileReader();

        reader.onload = function (event) {
            var img = document.createElement("img");
            img.setAttribute("src", event.target.result);
            document.querySelector(`.upload_img_${i}`).appendChild(img);
        };

        console.log(fileObj[i]);

        reader.readAsDataURL(fileObj[i]);
    }
}

document.querySelector('form').addEventListener('submit', img_submit);
function img_submit(e) {

    e.preventDefault();
    Swal.fire({
        title: '요청서를 업체에 보내시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '네, 요청합니다',
        cancelButtonText: '아니오, 취소합니다',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '요청서를 업체에 보냈습니다.<br>감사합니다.',
               
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });

            setTimeout(function () {
                document.querySelector('form').submit();
            }, 2100);
        }
    });
}





function back(){
    Swal.fire({
        title: '요청서를 업체에 <br>이미지를 안 보내시나요?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '네, 나가겠습니다',
        cancelButtonText: '아니오, 첨부하겠습니다.',
    }).then((result) => {
        if (result.isConfirmed) {
            var url = "/common/main";
  
            window.location.replace(url);
        }
    });
}

