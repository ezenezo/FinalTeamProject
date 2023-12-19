
/*슬라이드*/
const swiper = new Swiper('.swiper', {
  //슬라이드 무한 루프
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // 화살표 생성
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.addEventListener("DOMContentLoaded", function () {
  var lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      // 스크롤 아래로 이동 중
      document.getElementById("headerContainer").style.opacity = "0";
      document.getElementById("mainText").style.opacity ="0";
      document.getElementById("secText").style.opacity="1";
    } else {
      // 스크롤 위로 이동 중
      document.getElementById("headerContainer").style.opacity = "1";
      document.getElementById("mainText").style.opacity ="1"
      document.getElementById("secText").style.opacity="0";
    }
    lastScrollTop = currentScrollTop;
  });
});





/*img text hover효과*/
document.addEventListener('mouseover', () => {
  for (let i = 1; i <= 11; i++) {
    const boxLink = document.querySelector(`.box${i}`);
    const tHover = document.querySelector(`#tHover${i}`);
    const a = document.querySelector(`#a${i}`);
    const b = document.querySelector(`#b${i}`);


    // 마우스가 올라가면
    boxLink.addEventListener('mouseover', () => {
      tHover.style.display = "block";
      if (i == 1 || i == 8) {
        tHover.style.bottom = "20px";
        tHover.style.right = "30px";
        tHover.style.float = "right";
      } else if (i == 5) {
        a.style.bottom = "190px";
        b.style.bottom = "170px";
        tHover.style.bottom = "20px";
        tHover.style.left = "20px";
      } else if (i == 6) {
        a.style.bottom = "210px";
        b.style.bottom = "190px";
        tHover.style.bottom = "20px";
        tHover.style.left = "20px";
      } else if (i == 11) {
        a.style.bottom = "90px";
        b.style.bottom = "70px";
        tHover.style.bottom = "20px";
        tHover.style.left = "20px";
      } else if (i == 4 || i == 7 || i == 10) {
        const tx = document.querySelector(`#tx`);
        const blue = document.querySelector(`#blue`);
        tx.style.color = "white";
        blue.style.display = 'block'
      } else {
        a.style.bottom = "110px";
        b.style.bottom = "90px";
        tHover.style.bottom = "20px";
        tHover.style.left = "20px";
      }
      // 마우스가 벗어나면
      boxLink.addEventListener('mouseout', () => {
        tHover.style.display = "none";
        a.style.bottom = "40px";
        b.style.bottom = "20px";
      });
    });
  }

})

