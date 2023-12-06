window.onload=function(){
    slideOne();
    slideTwo();
};


let sliderOne=document.getElementById("slider-1");
let sliderTwo=document.getElementById("slider-2");
let displayValOne=document.getElementById("range1");
let displayValTwo=document.getElementById("range2");
let minGap=0;
let sliderTrack=document.querySelector(".slider-track");
let sliderMaxValue=document.getElementById("slider-1").max;


function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value + "㎡";

    fillColor();
    updateButtonColors(); // 버튼 색상 업데이트 함수 호출
}

function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = " - " + sliderTwo.value + "㎡";

    fillColor();
    updateButtonColors(); // 버튼 색상 업데이트 함수 호출
}

function fillColor(){
    percent1=(sliderOne.value/sliderMaxValue)*100;
    percent2=(sliderTwo.value/sliderMaxValue)*100;
    sliderTrack.style.background=`linear-gradient(to right,#dadae5 ${percent1}%,#3264fe ${percent1}%,#3264fe ${percent2}%,#dadae5 ${percent2}%)`;
  
};

document.addEventListener('DOMContentLoaded', function () {
    var portfolioMainImgs = document.querySelectorAll('.portfolioMainImg');

    portfolioMainImgs.forEach(function (img) {
      img.addEventListener('mouseover', function () {
        img.style.transform = 'scale(1.1)';
      });

      img.addEventListener('mouseout', function () {
        img.style.transform = 'scale(1)';
      });
    });
  });



//   --------------





function updateButtonColors() {
  
    const sliderValue1 = parseInt(document.getElementById("slider-1").value);
    const sliderValue2 = parseInt(document.getElementById("slider-2").value);
    console.log("sliderValue1"+sliderValue1);
    console.log("sliderValue2"+sliderValue2);

    // 버튼 엘리먼트들을 선택합니다.
    const buttons = document.querySelectorAll('.rangeFilterBtn');
    console.log("buttons", buttons);

    // 각 버튼에 대해 현재 슬라이더 범위에 따라 스타일을 업데이트합니다.
    buttons.forEach((button) => {
        const rangeValues = button.innerText.split('~').map(value => parseInt(value.replace('㎡','')));
        console.log("rangeValues", rangeValues);    
    
        if (sliderValue1 >= rangeValues[0] && sliderValue2 <= rangeValues[1]) {
            button.style.backgroundColor = '#3264fe'; // 파란색
            button.style.color = '#fff'; // 글자 색상 변경 등 추가적인 스타일 적용 가능
        } else {
            button.style.backgroundColor = ''; // 원래의 스타일로 돌아가게 설정
            button.style.color = ''; // 원래의 글자 색상으로 돌아가게 설정
        };
    });
};
// function updateButtonColors() {
//     let range = parseInt(sliderTwo.value) - parseInt(sliderOne.value);

//     // 이 예시에서는 각 버튼의 상한값을 배열로 정의하였습니다.
//     // 실제 상황에 맞게 수정해주세요.
//     const ranges = [33, 66, 99, 132, 165, 198, 231];

//     // 버튼 엘리먼트들을 선택합니다.
//     const buttons = document.querySelectorAll('.rangeFilterBtn');

//     // 각 버튼에 대해 범위에 따라 스타일을 업데이트합니다.
//     buttons.forEach((button, index) => {
//         if (range <= ranges[index]) {
//             button.style.backgroundColor = '#3264fe'; // 파란색
//             button.style.color = '#fff'; // 글자 색상 변경 등 추가적인 스타일 적용 가능
//         } else {
//             button.style.backgroundColor = ''; // 원래의 스타일로 돌아가게 설정
//             button.style.color = ''; // 원래의 글자 색상으로 돌아가게 설정
//         }
//     });
// }

// slideOne(), slideTwo() 함수 안에 아래의 코드를 추가하여 범위가 변경될 때마다 버튼 색상을 업데이트합니다.


