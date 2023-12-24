const sliderWrap = document.querySelector(".slider_wrap");
const sliderImg = sliderWrap.querySelector(".slider_img");             // 보여지는 영역
const sliderInner = sliderWrap.querySelector(".slider_inner");         // 움직이는 영역
const slider = sliderWrap.querySelectorAll(".slider");                  // 개별 이미지
const sliderBtn = sliderWrap.querySelectorAll(".slider_btn a");        // 버튼 

let currentIndex = 0;                                                   // 현재 보이는 이미지
let sliderCount = slider.length;                                        // 이미지 갯수
let sliderWidth = slider[0].clientWidth;                                // 이미지 가로값 구하기
let moving;

// 이미지 이동시키기
function gotoSlider(num) {
    sliderInner.style.transition = "all 400ms";
    sliderInner.style.transform = "translateX(" + -sliderWidth * num + "px)";
    currentIndex = num;
}

// 버튼을 클릭했을 때
sliderBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let prevIndex = (currentIndex + (sliderCount - 1)) % sliderCount;
        let nextIndex = (currentIndex + 1) % sliderCount;

        if (btn.classList.contains("prev")) {
            gotoSlider(prevIndex);
        } else {
            gotoSlider(nextIndex);
        }
    });
});

//자동이동

function move(){
	moving = setTimeout(() => requestAnimationFrame(move), 3000);
	let nextIndex = (currentIndex + 1) % sliderCount;
    gotoSlider(nextIndex);
}

setTimeout(() => requestAnimationFrame(move), 3000);
