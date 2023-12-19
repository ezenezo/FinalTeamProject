console.log("js들어오긴하냐")
// $(document).ready(function () {
//     // 클릭한 topBtn에 대한 클래스를 추가하고 이전 별들의 클래스를 제거합니다.
//     $('.topBtn').click(function () {
//       $(this).addClass('clicked');
//       $(this).prevAll('.topBtn').removeClass('clicked');
//       $(this).nextAll('.topBtn').removeClass('clicked');
//     });
//   });
document.addEventListener('click', (e) => {
    let topBtn1 = document.querySelector('.topBtn1');
    let topBtn2 = document.querySelector('.topBtn2');
    let topBtn3 = document.querySelector('.topBtn3');

    if (e.target.classList.contains('topBtn1')) {
        topBtn1.classList.add('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.remove('clicked');
    } else if (e.target.classList.contains('topBtn2')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.add('clicked');
        topBtn3.classList.remove('clicked');
    } else if (e.target.classList.contains('topBtn3')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.add('clicked');
    }
});

let averageRate = document.getElementById("averageRate").value;
let averageRate2 = (averageRate / 5) * 100;

function starRate() {
    let star2 = document.querySelector('.Star2');
    star2.style.width = `${averageRate2}%`;
    console.log(averageRate2+"%");

    // // 숨겨야 할 별표의 수 계산
    // let starsToHide = 5 - Math.ceil(averageRate);

    // // 적절한 수의 별표를 숨김
    // let star1 = document.querySelector('.Star1');
    // let stars = star1.children;

    // for (let i = 0; i < starsToHide; i++) {
    //     stars[i].style.display = 'none';
    // }
}

// 함수 호출
starRate();
