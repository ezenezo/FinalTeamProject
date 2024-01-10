
// 평수 버튼 함수

window.onload = function () {
    resetStart();
    slideOne();
    slideTwo();
};  

let sliderOne = document.getElementById("sliderOneVal").value;
let sliderTwo = document.getElementById("sliderTwoVal").value;


sliderOne = document.getElementById("slider-1");
sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 1;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

document.getElementById('selectFilter').innerHTML=``;
function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value + "㎡";

    fillColor();
    updateButtonColors(); // 버튼 색상 업데이트 함수 호출

    if(sliderOne.value != 1 || sliderTwo.value != 232){
        let selectFilter = document.getElementById('selectFilter');
        let existingrangeTag = selectFilter.querySelector('.rangeTags');
        if (!existingrangeTag) {     // rangeTags 클래스를 가진 요소가 없으면 추가
            selectFilter.innerHTML +=
                `<div class="selectFilterDiv rangeTags">
                    <button class="selectFilterBtn" type="button">
                        ${sliderOne.value}㎡-${sliderTwo.value}㎡
                        <div class="essential1Left" id="essential1Left">
                            <span style="color:white;" class="material-symbols-outlined selectLiDelRange"> cancel </span>
                        </div>
                    </button>
                </div>`;
        }else {
            // rangeTags 클래스를 가진 요소가 이미 있으면 업데이트
            existingrangeTag.innerHTML = `<button class="selectFilterBtn" type="button">
            ${sliderOne.value}㎡-${sliderTwo.value}㎡
            <div class="essential1Left" id="essential1Left">
                <span style="color:white;" class="material-symbols-outlined selectLiDelRange"> cancel </span>
            </div>
        </button>`;
        }
        reset();
        filterList();

    }
    
    
}

function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = " - " + sliderTwo.value + "㎡";

    fillColor();
    updateButtonColors(); // 버튼 색상 업데이트 함수 호출
    if(sliderOne.value != 1 || sliderTwo.value != 232){
        let selectFilter = document.getElementById('selectFilter');
        let existingrangeTag = selectFilter.querySelector('.rangeTags');
        if (!existingrangeTag) {     // rangeTags 클래스를 가진 요소가 없으면 추가
            selectFilter.innerHTML +=
                `<div class="selectFilterDiv rangeTags">
                    <button class="selectFilterBtn" type="button">
                        ${sliderOne.value}㎡-${sliderTwo.value}㎡
                        <div class="essential1Left" id="essential1Left">
                            <span style="color:white;" class="material-symbols-outlined selectLiDelRange"> cancel </span>
                        </div>
                    </button>
                </div>`;
        }else {
            // rangeTags 클래스를 가진 요소가 이미 있으면 업데이트
            existingrangeTag.innerHTML = `<button class="selectFilterBtn" type="button">
            ${sliderOne.value}㎡-${sliderTwo.value}㎡
            <div class="essential1Left" id="essential1Left">
                <span style="color:white;" class="material-symbols-outlined selectLiDelRange"> cancel </span>
            </div>
        </button>`;
        }
        reset();
        filterList();

    }
   
}

function fillColor() {
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right,#dadae5 ${percent1}%,rgb(197,245,255) ${percent1}%,rgb(197,245,255) ${percent2}%,#dadae5 ${percent2}%)`;

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

// -----------------------------------------
// 필터
let order = document.getElementById("order").value;
let homeTypeSh = document.getElementById("homeTypeSh").value;
let roomCntSh = document.getElementById("roomCntSh").value;
let familyTypeSh = document.getElementById("familyTypeSh").value;
let homeStyleSh = document.getElementById("homeStyleSh").value;



let selectLi0 = order;
let selectLi2 = homeTypeSh;
let selectLi3 = roomCntSh;
let selectLi4 = familyTypeSh;
let selectLi5 = homeStyleSh;

 //검색 데이터 서버로 보내기
async function filterListToServer(filterData) {
    try {
        console.log("homeTypeSh>>{}", filterData.homeTypeSh);
        console.log("filterData>>{}", filterData);
        const url = '/portfolio/postList';
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(filterData)
        }

        const resp = await fetch(url, config);
        const result = await resp.json();
        console.log("포폴리스트result>>{}", result);
        return result;
    } catch (error) {
        console.log(error)
    }
}

function filterList(){
    selectLi3 = selectLi3.replace('개','');
    let filterData={
        order:selectLi0,
        homeTypeSh:selectLi2,
        roomCntSh:selectLi3,
        familyTypeSh:selectLi4,
        homeStyleSh:selectLi5,
        sliderOneVal:sliderOne.value,
        sliderTwoVal:sliderTwo.value,
       
    }
    filterListToServer(filterData).then(result=>{
        let str='';
        console.log('result'+result);
        for(let pdto of result){
            str+=`<div class="pdtoBox">`;
            str+=`<a class="a1" href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}&homeStyle=${selectLi5}"><div class="overHiddenBox">`;

            if (pdto.mainImg) {
                str += `<img class="portfolioMainImg" src="/upload/${pdto.mainImg.saveDir}/${pdto.mainImg.saveDir.replace(/\\/g,'-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">`;
        
            } else {
                // mainImg가 null인 경우에 대한 처리
                // 예를 들어, 대체 이미지를 표시하거나 다른 처리를 수행할 수 있습니다.
                str += `<span class="no-image">No Image</span>`;
            }
            str += `</div>`;

           str+=`<p class="pdtoBoxTitle">${pdto.pvo.title}</p>`;
            str+=`<p class="pdtoBoxTitle pdtoTitle2th">${pdto.pvo.userNm}</p>`;
            str+=`<p class="pdtoBoxTitle pdtoTitle3th">`;
            str+=`<span>좋아요${pdto.pvo.likeQty} </span><span>조회수${pdto.pvo.readQty}</span>`;
            str+=`</p></a></div>`;
        }
     
        document.querySelector('.bodyContainer2').innerHTML=str;
    })
}

function boxadd(filterName,delNum){
    let selectFilter = document.getElementById('selectFilter');
    selectFilter.innerHTML +=
                    `<div class="selectFilterDiv liTags0">
                        <button class="selectFilterBtn" type="button">
                            ${filterName}
                            <div class="essential1Left" id="essential1Left">
                                <span style="color:white;" class="material-symbols-outlined selectLiDel${delNum}"> cancel </span>
                            </div>
                        </button>
                    </div>`;
}

// 페이지가 로드될 때 실행되는 이벤트 리스너를 등록합니다.
document.addEventListener('DOMContentLoaded', function () {

    // ulTag num5ul의 자식 li 요소들을 가져옵니다.
    let liTags0 = document.querySelectorAll('.ulTag.num0ul li');
    let liTags2 = document.querySelectorAll('.ulTag.num2ul li');
    let liTags3 = document.querySelectorAll('.ulTag.num3ul li');
    let liTags4 = document.querySelectorAll('.ulTag.num4ul li');
    let liTags5 = document.querySelectorAll('.ulTag.num5ul li');
    console.log("liTags0>>", liTags0);
    console.log("liTags2>>", liTags2);
    console.log("liTags3>>", liTags3);
    console.log("liTags4>>", liTags4);
    console.log("liTags5>>", liTags5);

    // 각 li 요소에 클릭 이벤트 리스너를 추가합니다.
    liTags0.forEach(function (li) {
        li.addEventListener('click', function () {
            // 클릭된 li의 텍스트를 가져와서 출력합니다.
            selectLi0 = li.textContent;
            console.log('선택된 스타일0:', selectLi0);

            let selectFilter = document.getElementById('selectFilter');
            let existingLiTags0 = selectFilter.querySelector('.liTags0');
            //   let resetTag = selectFilter.querySelector('.reset');
            if (!existingLiTags0) {     // liTags0 클래스를 가진 요소가 없으면 추가

                selectFilter.innerHTML +=
                    `<div class="selectFilterDiv liTags0">
                        <button class="selectFilterBtn" type="button">
                            ${selectLi0}
                            <div class="essential1Left" id="essential1Left">
                                <span style="color:white;" class="material-symbols-outlined selectLiDel0"> cancel </span>
                            </div>
                        </button>
                    </div>`;
            } else {
                // liTags0 클래스를 가진 요소가 이미 있으면 업데이트
                existingLiTags0.innerHTML = `<button class="selectFilterBtn" type="button">
                ${selectLi0}
                <div class="essential1Left" id="essential1Left">
                    <span style="color:white;" class="material-symbols-outlined selectLiDel0"> cancel </span>
                </div>
            </button>`;
            }
            reset();
            filterList();

            // 여기서 가져온 텍스트를 다른 곳에 활용할 수 있습니다.
            // 예를 들어, 선택된 스타일을 서버로 전송하거나 다른 동작을 수행할 수 있습니다.
        });
    });

    // 각 li 요소에 클릭 이벤트 리스너를 추가합니다.
    liTags2.forEach(function (li) {
        li.addEventListener('click', function () {
            // 클릭된 li의 텍스트를 가져와서 출력합니다.
            selectLi2 = li.textContent;
            console.log('선택된 스타일2:', selectLi2);

            let selectFilter = document.getElementById('selectFilter');
            let existingLiTags2 = selectFilter.querySelector('.liTags2');
            if (!existingLiTags2) {

                selectFilter.innerHTML +=
                    `<div class="selectFilterDiv liTags2">
                      <button class="selectFilterBtn" type="button">
                          ${selectLi2}
                          <div class="essential1Left" id="essential1Left">
                              <span style="color:white;" class="material-symbols-outlined selectLiDel2"> cancel </span>
                          </div>
                      </button>
                  </div>`;
            } else {

                existingLiTags2.innerHTML = `<button class="selectFilterBtn" type="button">
              ${selectLi2}
              <div class="essential1Left" id="essential1Left">
                  <span style="color:white;" class="material-symbols-outlined selectLiDel2"> cancel </span>
              </div>
          </button>`;
            }
            reset();
            filterList();
        });
    });

    // 각 li 요소에 클릭 이벤트 리스너를 추가합니다.
    liTags3.forEach(function (li) {
        li.addEventListener('click', function () {
            // 클릭된 li의 텍스트를 가져와서 출력합니다.
            selectLi3 = li.textContent;
            console.log('선택된 스타일3:', selectLi3);

            let selectFilter = document.getElementById('selectFilter');
            let existingLiTags3 = selectFilter.querySelector('.liTags3');
            if (!existingLiTags3) {     // liTags0 클래스를 가진 요소가 없으면 추가

                selectFilter.innerHTML +=
                    `<div class="selectFilterDiv liTags3">
                      <button class="selectFilterBtn" type="button">
                          ${selectLi3}
                          <div class="essential1Left" id="essential1Left">
                              <span style="color:white;" class="material-symbols-outlined selectLiDel3"> cancel </span>
                          </div>
                      </button>
                  </div>`;
            } else {
                // liTags0 클래스를 가진 요소가 이미 있으면 업데이트
                existingLiTags3.innerHTML = `<button class="selectFilterBtn" type="button">
              ${selectLi3}
              <div class="essential1Left" id="essential1Left">
                  <span style="color:white;" class="material-symbols-outlined selectLiDel3"> cancel </span>
              </div>
          </button>`;
            }
            reset();
            filterList();

            // 여기서 가져온 텍스트를 다른 곳에 활용할 수 있습니다.
            // 예를 들어, 선택된 스타일을 서버로 전송하거나 다른 동작을 수행할 수 있습니다.
        });
    });

    // 각 li 요소에 클릭 이벤트 리스너를 추가합니다.
    liTags4.forEach(function (li) {
        li.addEventListener('click', function () {
            // 클릭된 li의 텍스트를 가져와서 출력합니다.
            selectLi4 = li.textContent;
            console.log('선택된 스타일4:', selectLi4);

            let selectFilter = document.getElementById('selectFilter');
            let existingLiTags4 = selectFilter.querySelector('.liTags4');
            if (!existingLiTags4) {

                selectFilter.innerHTML +=
                    `<div class="selectFilterDiv liTags4">
                      <button class="selectFilterBtn" type="button">
                          ${selectLi4}
                          <div class="essential1Left" id="essential1Left">
                              <span style="color:white;" class="material-symbols-outlined selectLiDel4"> cancel </span>
                          </div>
                      </button>
                  </div>`;
            } else {

                existingLiTags4.innerHTML = `<button class="selectFilterBtn" type="button">
              ${selectLi4}
              <div class="essential1Left" id="essential1Left">
                  <span style="color:white;" class="material-symbols-outlined selectLiDel4"> cancel </span>
              </div>
          </button>`;
            }
            reset();
            filterList();

            // 여기서 가져온 텍스트를 다른 곳에 활용할 수 있습니다.
            // 예를 들어, 선택된 스타일을 서버로 전송하거나 다른 동작을 수행할 수 있습니다.
        });
    });

    // 각 li 요소에 클릭 이벤트 리스너를 추가합니다.
    liTags5.forEach(function (li) {
        li.addEventListener('click', function () {
            // 클릭된 li의 텍스트를 가져와서 출력합니다.
            selectLi5 = li.textContent;
            console.log('선택된 스타일5:', selectLi5);

            let selectFilter = document.getElementById('selectFilter');
            let existingLiTags5 = selectFilter.querySelector('.liTags5');
            if (!existingLiTags5) {

                selectFilter.innerHTML +=
                    `<div class="selectFilterDiv liTags5">
                      <button class="selectFilterBtn" type="button">
                          ${selectLi5}
                          <div class="essential1Left" id="essential1Left">
                              <span style="color:white;" class="material-symbols-outlined selectLiDel5"> cancel </span>
                          </div>
                      </button>
                  </div>`;
            } else {

                existingLiTags5.innerHTML = `<button class="selectFilterBtn" type="button">
              ${selectLi5}
              <div class="essential1Left" id="essential1Left">
                  <span style="color:white;" class="material-symbols-outlined selectLiDel5"> cancel </span>
              </div>
          </button>`;
            }
            reset();
            filterList();

        });
    });


});
function reset() {
    let resetTag = selectFilter.querySelector('.reset');

    // reset 태그를 추가 또는 제거
    if (selectFilter.querySelector('.selectFilterDiv')) {
        // selectFilter 안에 어떠한 html 요소가 있다면 reset 요소를 추가
        if (!resetTag) {
            const resetElement = document.createElement('p');
            resetElement.className = 'reset';
            resetElement.textContent = '초기화';

            // selectFilter의 자식 요소 중 맨 뒤에 추가
            selectFilter.appendChild(resetElement);
        } else {
            resetTag.remove();

            const resetElement = document.createElement('p');
            resetElement.className = 'reset';
            resetElement.textContent = '초기화';

            selectFilter.appendChild(resetElement);

        }
    } else {
        // selectFilter 안에 어떠한 html 요소가 없다면 reset 요소를 제거
        if (resetTag) {
            resetTag.remove();
        }
    }
}

document.addEventListener("click", (e) => {
    // 클릭된 요소가 selectLi0Del 클래스를 가진 요소인지 확인
    if (e.target.classList.contains('selectLiDel0')) {
        selectLi0 = '';
        // 클릭된 요소의 부모 중에서 가장 가까운 selectFilterDiv 클래스를 가진 요소를 찾음
        let parent = e.target.closest('.selectFilterDiv');
        // selectFilterDiv 클래스를 가진 부모를 찾았을 경우
        if (parent) {
            // 부모 요소와 그 자식 요소를 모두 삭제
            parent.remove();
             // 삭제 후 초기화 텍스트 업데이트
             filterList();
             reset();
        }
    }else if(e.target.classList.contains('selectLiDel2')){
        selectLi2 = '';       
        let parent = e.target.closest('.selectFilterDiv');
        if (parent) {
            parent.remove();
            filterList();
            reset();
        }
    }else if(e.target.classList.contains('selectLiDel3')){
        selectLi3 = '';       
        let parent = e.target.closest('.selectFilterDiv');
        if (parent) {
            parent.remove();
            filterList();
            reset();
        }
    }else if(e.target.classList.contains('selectLiDel4')){
        selectLi4 = '';       
        let parent = e.target.closest('.selectFilterDiv');
        if (parent) {
            parent.remove();
            filterList();
            reset();
        }
    }else if(e.target.classList.contains('selectLiDel5')){
        selectLi5 = '';       
        let parent = e.target.closest('.selectFilterDiv');
        if (parent) {
            parent.remove();
            filterList();
            reset();
        }
    }else if(e.target.classList.contains('selectLiDelRange')){
        sliderOne.value=1;
        sliderTwo.value=232;
        fillColor();
        updateButtonColors();
        displayValOne.textContent = sliderOne.value + "㎡";
    displayValTwo.textContent = " - " + sliderTwo.value + "㎡";
        
        let parent = e.target.closest('.selectFilterDiv');
        if (parent) {
            parent.remove();
            filterList();
            reset();
        }
    }else if(e.target.classList.contains('reset')){
      
        location.reload();
        resetStart();
        fillColor();
        updateButtonColors();
    }
});

function resetStart(){
    selectLi0='';
    selectLi2='';
    selectLi3='';
    selectLi4='';
    selectLi5='';
    sliderOne.value=1;
    sliderTwo.value=232;
    
    document.getElementById('selectFilter').innerHTML='';
    filterList();
}
// ------
function updateButtonColors() {

    const sliderValue1 = parseInt(document.getElementById("slider-1").value);
    const sliderValue2 = parseInt(document.getElementById("slider-2").value);
    console.log("sliderValue1" + sliderValue1); //1
    console.log("sliderValue2" + sliderValue2); //232

    // 버튼 엘리먼트들을 선택합니다.
    const buttons = document.querySelectorAll('.rangeBtn');
    console.log("buttons", buttons);

    // 각 버튼에 대해 현재 슬라이더 범위에 따라 스타일을 업데이트합니다.
    buttons.forEach((button) => {
        const rangeValues = button.innerText.split('~').map(value => parseInt(value.replace('㎡', '')));
        console.log("rangeValues", rangeValues);
        console.log("rangeValues[0]", rangeValues[0]);
        console.log("rangeValues[1]", rangeValues[1]);
        if (rangeValues[1] == undefined) {
            rangeValues[1] = 232;
        }
        // 1 >= 1 && 232 <=33
        if (sliderValue1 <= rangeValues[0] && sliderValue2 >= rangeValues[1]) {
            button.style.backgroundColor = 'rgb(53, 197, 240)'; // 파란색
            button.style.color = '#fff'; // 글자 색상 변경 등 추가적인 스타일 적용 가능
        } else {

            button.style.backgroundColor = ''; // 원래의 스타일로 돌아가게 설정
            button.style.color = ''; // 원래의 글자 색상으로 돌아가게 설정
        };
    });
};


