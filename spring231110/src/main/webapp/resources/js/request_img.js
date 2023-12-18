

document.getElementById('trigger1').addEventListener('click', () => {
    document.getElementById('files1').click();
});

//이미지 제약조건
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
//이미지 비동기 관련
let selectedFiles = [];
let selectedFiles2 = [];
// 파일 미리보기 생성 함수
function createFilePreview() {
    console.log(selectedFiles);
    alert("아무거나");
    let div = document.getElementById('fileZone');
    div.innerHTML = "";
    let isOk = 1;
    let ul = `<ul class="list-group list-group-flush">`;

    selectedFiles.forEach((file, i) => {
        let validResult = fileValidation(file.name, file.size);
        isOk *= validResult;

        ul += `<li class="list-group-item d-flex justify-content-between align-items-start" class="img_file_${i}">`;
        ul += `<div class="ms-2 me-auto">`;
        ul += `<div class="upload_img_${i}" style="width: 500px; height: 500px; background-size: cover"></div><br>`;
        ul += `<div id="ok_no_${i}">${validResult ? '<div class="fw-bold">업로드 가능</div>' : '<div class="fw-bold text-danger">업로드 불가능</div>'}</div>`;
        ul += `<div>${file.name}</div>`;
        ul += `<span class="badge rounded-pill text-bg-${validResult ? 'success' : 'danger'}">${file.size}Bytes</span>`;
        ul += `<button type="button"  id="img_delete_${i}">삭제하기</button></li>`;
    });

    ul += `</ul>`;
    div.innerHTML = ul;
    for (let i = 0; i < selectedFiles.length; i++) {
        document.getElementById(`img_delete_${i}`).addEventListener('click', () => {
            console.log(selectedFiles);
            document.querySelector(`.upload_img_${i}`).remove();
            selectedFiles.splice(i, 1);
            console.log(selectedFiles);
            let ok_no = document.getElementById(`ok_no_${i}`);
            ok_no.innerHTML = '<div class="fw-bold text-danger">삭제된 파일</div>';

            // 파일 선택 필드의 값 초기화
            document.getElementById('files').value = '';
            alert('파일이 제거되었습니다. 필요한 경우 다시 파일을 선택해 주세요.');
        });
    }

    if (isOk == 0) {
        document.getElementById('regBtn').disabled = true;
    }
}

//파일 체인지(추가)

document.getElementById('files1').addEventListener('change', (e) => {
    Array.from(e.target.files).forEach(file => {
        selectedFiles.splice(-1);


        selectedFiles.push(file);
    });


    document.getElementById('regBtn').disabled = false;

    createFilePreview();
});


// 이미지 미리보기
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
                html: '이제, 고객님이 원하시는 스타일을 말씀해주세요!',
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

