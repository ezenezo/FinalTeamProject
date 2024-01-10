
const preBtn1 = document.getElementById('prev1');
const nextBtn1 = document.getElementById('next1');
let currentIdx1 = 0;

console.log("메인js들어오는지")

async function slideImg(){
    console.log("메인js들어오는지2")
    try {
        const url='/common/slideImg';
        const resp=await fetch(url);
        const result=await resp.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

function slideImgPrint(){
    console.log("메인js들어오는지1")

    const slideWrapper = document.querySelector('.slide_wrapper');
    let str=``;
    str+=`<ul class="slides" id="slides1">`;
    slideImg().then(result=>{
        console.log("slideWrapper>>{} ",slideWrapper);

        for(let i=0;i<6;i++){
            console.log("메인js들어오는지3")
        let mainImg=result[i];
           
            str+=`<li><a class="imgAtag" href="/portfolio/portfolioDetail?pno=${mainImg.pno}">`;
            str+=`<img class="portfolioMainImg slideImg" src="/upload/${mainImg.saveDir}/${mainImg.saveDir.replace(/\\/g, '-')}_${mainImg.uuid}_${mainImg.fileName}">`;
            str+=`</a></li>`;
        }
        str+=`<li><a href="/portfolio/list"><div class="mainMoreBtn">`;
        str+=`<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        class="bi bi-arrow-right-circle-fill moreBtn"
        viewBox="0 0 16 16">
<path class="moreBtn"
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
</svg>
`;
        str+=`<p class="moreText">더보기</p>`;
        str+=`</div> </a></li></ul>`;
        str+=`<div class="controls">`;
        str+=`<div class="prev" id="prev1" onclick="preBtn()"></div>`;
        str+=`<div class="next" id="next1" onclick="nextBtn()">`;
        str+=`<span class="material-symbols-outlined"> arrow_forward_ios</span>`;
        str+=`</div></div>`;
        slideWrapper.innerHTML=str;
    })

}
slideImgPrint();



function moveSlideNext1(num) {
    const slides1 = document.getElementById('slides1');
    slides1.style.left = -num * 735 + 'px';
    currentIdx1 = num;
}
function moveSlidePrev1(num) {
    const slides1 = document.getElementById('slides1');
    slides1.style.left = num * 735 + 'px';
    currentIdx1 = num;
}
// nextBtn1.addEventListener('click', () => {
//     console.log("nextBtn>", nextBtn1);
//     if (currentIdx1 < 1) { //0이면
//         moveSlideNext1(currentIdx1 + 1);
//         console.log(currentIdx1);
//         document.getElementById('next1').innerHTML = ``;
//         document.getElementById('prev1').innerHTML = `<span class="material-symbols-outlined"> arrow_back_ios
//         </span>`;
//     }
// });
// preBtn1.addEventListener('click', () => {
//     console.log("preBtn>", preBtn1);
//     if (currentIdx1 > 0) { //1이면
//         moveSlidePrev1(currentIdx1 - 1);
//         console.log(currentIdx1);
//         document.getElementById('next1').innerHTML = `<span class="material-symbols-outlined">
//         arrow_forward_ios </span>`;
//         document.getElementById('prev1').innerHTML = ``;
//     }
// });
function nextBtn(){
    console.log("nextBtn>", nextBtn1);
    if (currentIdx1 < 1) { //0이면
        moveSlideNext1(currentIdx1 + 1);
        console.log(currentIdx1);
        document.getElementById('next1').innerHTML = ``;
        document.getElementById('prev1').innerHTML = `<span class="material-symbols-outlined"> arrow_back_ios
        </span>`;
    }
}
function preBtn(){
    console.log("preBtn>", preBtn1);
    if (currentIdx1 > 0) { //1이면
        moveSlidePrev1(currentIdx1 - 1);
        console.log(currentIdx1);
        document.getElementById('next1').innerHTML = `<span class="material-symbols-outlined">
        arrow_forward_ios </span>`;
        document.getElementById('prev1').innerHTML = ``;
    }

}

// -----------------------------------------

document.addEventListener('click', (e) => {
    let topBtn1 = document.querySelector('.topBtn1');
    let topBtn2 = document.querySelector('.topBtn2');
    let topBtn3 = document.querySelector('.topBtn3');
    let topBtn4 = document.querySelector('.topBtn4');

    if (e.target.classList.contains('topBtn1')) {
        topBtn1.classList.add('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.remove('clicked');
        topBtn4.classList.remove('clicked');
        sizeNum = 10;
        homeSizeList(sizeNum);
    } else if (e.target.classList.contains('topBtn2')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.add('clicked');
        topBtn3.classList.remove('clicked');
        topBtn4.classList.remove('clicked');
        sizeNum = 20;
        homeSizeList(sizeNum);
    } else if (e.target.classList.contains('topBtn3')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.add('clicked');
        topBtn4.classList.remove('clicked');
        sizeNum = 30;
        homeSizeList(sizeNum);
    }
    else if (e.target.classList.contains('topBtn4')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.remove('clicked');
        topBtn4.classList.add('clicked');
        sizeNum = 40;
        homeSizeList(sizeNum);
    }
});
//------------------------------------
let sizeNum = 10;

async function homeSizelistToServer(sizeNum) {
    try {
        const url = '/common/postList/' + sizeNum;
        const resp = await fetch(url);
        const result = resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

function homeSizeList(sizeNum) {
    homeSizelistToServer(sizeNum).then(result => {

        let str = '';

        // 최대 6개의 항목만 처리
        for (let i = 0; i < Math.min(result.length, 6); i++) {
            let pdto = result[i];

            str += `<div class="pdtoBox">`;
            str += `<a class="a1" href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}"><div class="overHiddenBox">`;

            if (pdto.mainImg) {
                str += `<img class="portfolioMainImg22" src="/upload/${pdto.mainImg.saveDir}/${pdto.mainImg.saveDir.replace(/\\/g, '-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">`;
            } else {
                // mainImg가 null인 경우에 대한 처리
                // 예를 들어, 대체 이미지를 표시하거나 다른 처리를 수행할 수 있습니다.
                str += `<span class="no-image">No Image</span>`;
            }
            str += `</div>`;

            str += `<p class="pdtoBoxTitle">${pdto.pvo.title}</p>`;
            str += `</a></div>`;
        }

        document.querySelector('.bodyContainer2').innerHTML = str;

    })
}
///----------------------------------------------------------------
async function reviewContainerData() {
    try {
        const url = '/review/printList';
        const resp = await fetch(url);
        const result = resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

function reviewPrint() {
    let reviewContainer = document.querySelector('.reviewContainer');
    let str = ``;
    reviewContainerData().then(result => {
        for (let i = 0; i < Math.min(result.length, 3); i++) {
            let rdto = result[i];
            let content = rdto.rvo.content;

            content = content.replace(/<br>/g, ''); // <br> 태그 제거
            content = content.replace(/<p[^>]*>/g, ''); // <p> 태그 시작 부분 제거
            content = content.replace(/<\/p>/g, ''); // </p> 태그 제거
            content = content.replace(/<img[^>]*>/g, ''); // <img> 태그와 관련된 부분 제거
            content = content.replace(/\s+/g, ''); // 공백과 줄바꿈 제거

            // <p> 태그 사이의 줄바꿈 제거
            content = content.replace(/<\/p>\s*<p>/g, '</p><p>');

            str += `<a href="/review/reviewDetail?rno=${rdto.rvo.rno}"><div class="reviewItem">`;
            str += `<img class="portfolioMainImg22" src="/upload/${rdto.reviewMainImg.saveDir}/${rdto.reviewMainImg.saveDir.replace(/\\/g, '-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">`;
            str += `<p style="font-size: 20px;
            line-height:28px;overflow: hidden;padding-bottom: 3px;text-overflow: ellipsis;white-space: normal;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp:1;
            -webkit-box-orient: vertical;
            height:25px;font-weight: 500;margin-bottom: 10px;">${rdto.rvo.title}</p>`;
            str += `<p style="width: 100%; height: 115px; overflow: hidden;padding-bottom: 3px;text-overflow: ellipsis;white-space: normal;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp:5;
            -webkit-box-orient: vertical;font-weight:300">${content}</p>`;
            str += `<div style="display:flex;justify-content: space-between" clacss="reviewRate">`;
            str += `<div style="width:110px; padding-top:10px;" class="starIcon">`;
            for (let j = 0; j < rdto.rvo.rate; j++) {
                console.log("rdto.rvo.rate>>{}", rdto.rvo.rate);
                str += `<svg style="width: 20px;
                height: 20px;
                flex: 0 0 auto;color: #f7f77e;" class="st2" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path class="st2"
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
            }

            str += `</div><p style="font-weight:300; margin-top: 10px;">${rdto.rvo.comName}</p>`;
            str += `</div></div></a>`;
        }
        reviewContainer.innerHTML = str;

    })

}

//    // 최대 6개의 항목만 처리
//    for (let i = 0; i < Math.min(result.length, 6); i++) {
//     let pdto = result[i];

//     str += `<div class="pdtoBox">`;
//     str += `<a class="a1" href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}"><div class="overHiddenBox">`;

//     if (pdto.mainImg) {
//         str += `<img class="portfolioMainImg" src="/upload/${pdto.mainImg.saveDir}/${pdto.mainImg.saveDir.replace(/\\/g, '-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">`;
//     } else {
//         // mainImg가 null인 경우에 대한 처리
//         // 예를 들어, 대체 이미지를 표시하거나 다른 처리를 수행할 수 있습니다.
//         str += `<span class="no-image">No Image</span>`;
//     }
//     str += `</div>`;

//     str += `<p class="pdtoBoxTitle">${pdto.pvo.title}</p>`;
//     str += `</a></div>`;
// }

// document.querySelector('.bodyContainer2').innerHTML = str;

// })