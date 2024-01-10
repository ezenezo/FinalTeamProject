console.log("findmap.js진입");
console.log("companyList----------1");
console.log(companyList);
console.log("companyList----------2");

//console.log("companyList의 값들: " , companyListJson);

var modal = document.getElementById("myModal");
var btn = document.getElementById("serviceButton"); // 버튼 참조
var btn2 = document.getElementById("nationwideButton");
var span = document.getElementsByClassName("close")[0];
var modalBackdrop = document.createElement("div");
modalBackdrop.classList.add("modal-backdrop");

// 모달 열기
btn.onclick = function () {
    modal.style.display = "block";
    document.body.appendChild(modalBackdrop);
};
//모달 열기
btn2.onclick = function () {
    modal.style.display = "block";
    document.body.appendChild(modalBackdrop);
};

// 모달 닫기
function closeModal() {
    // 모달 창 닫는 로직
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    // 모달 배경 제거
    var modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
        document.body.removeChild(modalBackdrop);
    }
}

span.onclick = closeModal;
window.onclick = function (event) {
    if (event.target == modalBackdrop) {
        closeModal();
    }
};

// 페이지 로드 완료 시 실행
window.onload = function () {
    var tooltip = document.getElementById("serviceTooltip");
    //tooltip.style.display = "block"; // 말풍선 표시
    // 말풍선 서서히 표시
    setTimeout(function () {
        tooltip.style.opacity = 1; // 투명도를 1로 변경하여 보이게 함
    }, 100); // 약간의 지연을 주어 CSS 전환 효과가 나타나도록 함

    // 6초 후 말풍선 서서히 숨기기
    setTimeout(function () {
        tooltip.style.opacity = 0; // 투명도를 0으로 변경하여 숨김
    }, 6000);

    // 6초 후 말풍선 숨기기
    // setTimeout(function () {
    //     tooltip.style.display = "none";
    // }, 6000);

    //'서비스' 탭을 기본적으로 활성화
    openTab(null, "Services"); // openTab 함수 호출 // '서비스' 탭 활성화

    // URL에서 해시값(#)을 추출합니다.
    var hash = window.location.hash.substring(1); // #을 제외한 나머지 문자열을 가져옵니다.
    console.log("hash는", hash);
    var decodedHash = decodeURIComponent(hash); // URL 디코딩
    console.log("decodedHash는", decodedHash);
    // 해시값에 따라 특정 동작을 수행합니다.
    if (decodedHash === "인천 전체") {
        selectRegion("인천");
    } else if (decodedHash === "서울 전체") {
        console.log("서울 디코드해시 진입");
        selectRegion("서울");
    } else if (decodedHash === "부산 전체") {
        console.log("부산 디코드해시 진입");
        selectRegion("부산");
    }
    // 다른 지역에 대한 처리도 여기에 추가할 수 있습니다.
};
function selectRegion(regionName) {
    var regionLinkSelector;
    switch (regionName) {
        case "서울":
            regionLinkSelector = "#subMenuSeoul .sub-menu-item a";
            break;
        case "인천":
            regionLinkSelector = "#subMenuIncheon .sub-menu-item a";
            break;
        case "부산":
            regionLinkSelector = "#subMenuBusan .sub-menu-item a";
            break;
        // 다른 지역에 대한 케이스도 여기에 추가할 수 있습니다.
        default:
            return; // 알 수 없는 지역 이름인 경우 함수 종료
    }

    var regionLink = document.querySelector(regionLinkSelector);
    if (regionLink) {
        regionLink.click(); // 클릭 이벤트 발생
    }
}
// function selectRegion(regionName) {
//     // 모달창을 열고 해당 지역을 선택하는 로직...
//     // 예를 들어, '인천 전체'에 해당하는 엘리먼트를 찾아 클릭 이벤트를 트리거합니다.
//     var regionElement = document.querySelector(`[data-city="${regionName}"]`);
//     if (regionElement) {
//         regionElement.click(); // 해당 엘리먼트를 프로그래매틱하게 클릭합니다.
//         // 해당 함수를 호출하여 '서울 전체'를 선택합니다.
//         selectSeoulEntire();
//     }
// }
// function selectSeoulEntire() {
//     // '서울 전체'에 해당하는 링크를 찾아 클릭합니다.
//     var seoulEntireLink = document.querySelector("#subMenuSeoul .sub-menu-item a");
//     if (seoulEntireLink) {
//         seoulEntireLink.click(); // 클릭 이벤트 발생
//     }
// }

function closeAllSubMenus() {
    // 모든 서브메뉴를 숨깁니다.
    var subMenus = document.querySelectorAll(".subMenu");
    subMenus.forEach(function (menu) {
        menu.style.display = "none";
    });
}
function toggleSubMenu(event, menuId) {
    closeAllSubMenus(); // 먼저 모든 서브메뉴를 닫습니다.
    console.log("toggleSubMenu진입");
    event.stopPropagation();
    console.log("menuId는 " + menuId);
    var subMenu = document.getElementById(menuId);
    console.log("subMenu는 ", subMenu);
    console.log("subMenu.style.display는 ", subMenu.style.display);
    // subMenu.style.display = "block";
    if (subMenu.style.display === "none") {
        console.log("subMenu.style.display 는 none 이라 block ");
        subMenu.style.display = "block";
    } else {
        console.log("subMenu.style.display 는 none 쪽으로 진입");
        subMenu.style.display = "none";
    }
}

document.getElementById("movingMenu").addEventListener("click", function () {
    this.classList.toggle("active");
    toggleSubMenu("subMenuMoving");
    console.log("toggleSubMenu subMenuMoving 지나침");
});
document.getElementById("cleaningMenu").addEventListener("click", function () {
    this.classList.toggle("active");
    toggleSubMenu("subMenuCleaning");
    console.log("toggleSubMenu subMenuCleaning 지나침");
});

document
    .getElementById("seoulMenu")
    .addEventListener("click", function (event) {
        console.log("(seoulMenu).addEventListener 진입");
        this.classList.toggle("active");
        toggleSubMenu(event, "subMenuSeoul");
        console.log("toggleSubMenu subMenuSeoul 지나침");
    });

document
    .getElementById("incheonMenu")
    .addEventListener("click", function (event) {
        console.log("(incheonMenu).addEventListener 진입");
        this.classList.toggle("active");
        toggleSubMenu(event, "subMenuIncheon");
        console.log("toggleSubMenu subMenuIncheon 지나침");
    });

document
    .getElementById("busanMenu")
    .addEventListener("click", function (event) {
        console.log("(busanMenu).addEventListener 진입");
        this.classList.toggle("active");
        toggleSubMenu(event, "subMenuBusan");
        console.log("toggleSubMenu subMenuIncheon 지나침");
    });

document
    .getElementById("nationwideButton")
    .addEventListener("click", function () {
        this.classList.toggle("active");
        console.log("(nationwideButton).addEventListener 진입");
        toggleSubMenu("nationwideButton");
        console.log("nationwideButton 지나침");
    });

var nationwideBtn = document.getElementById("nationwideButton");

// '전국' 버튼 이벤트 리스너
nationwideBtn.onclick = function () {
    modal.style.display = "block";
    document.body.appendChild(modalBackdrop);

    // '지역' 탭 활성화
    openTab(null, "Locations");
};

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // 모든 탭 컨텐츠 숨기기
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // 모든 탭 링크의 active 클래스 제거
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // 클릭된 탭과 관련된 컨텐츠 보이기 및 활성 클래스 추가
    document.getElementById(tabName).style.display = "block";
    if (evt) evt.currentTarget.classList.add("active"); // evt가 있을 경우에만 클래스 추가

    // 해당 탭에 active 클래스 추가
    for (i = 0; i < tablinks.length; i++) {
        if (
            tablinks[i].textContent ===
            (tabName === "Services" ? "서비스" : "지역")
        ) {
            tablinks[i].classList.add("active");
        }
    }

    //전국 버튼용으로 시작해서 다 다시 정의...////////////////////////////////////////////////////S
    //모달 창 내의 모든 하위 메뉴 아이템에 대한 선택자

    var modalMenuItems = document.querySelectorAll(".modal ul li ul li a");
    var serviceBtn = document.getElementById("serviceButton");
    var nationwideBtn = document.getElementById("nationwideButton");

    modalMenuItems.forEach(function (item) {
        item.addEventListener("click", function () {
            var activeTab =
                document.querySelector(".tablinks.active").textContent;

            // 아이콘 생성
            var icon = document.createElement("i");
            icon.className = "bi bi-chevron-down"; // Bootstrap 아이콘 클래스 설정
            icon.style.color = "white"; // 아이콘 색상 설정

            // 공백 텍스트 노드 생성
            var space = document.createTextNode(" ");

            if (activeTab === "서비스") {
                serviceBtn.textContent = this.textContent; // 텍스트 설정
                serviceBtn.appendChild(space); // 공백 추가
                serviceBtn.appendChild(icon); // 아이콘 추가
                serviceBtn.style.backgroundColor = "black";
                serviceBtn.style.color = "white"; // 텍스트 색상 설정
            } else if (activeTab === "지역") {
                nationwideBtn.textContent = this.textContent; // 텍스트 설정
                nationwideBtn.appendChild(space); // 공백 추가
                nationwideBtn.appendChild(icon); // 아이콘 추가
                nationwideBtn.style.backgroundColor = "black";
                nationwideBtn.style.color = "white"; // 텍스트 색상 설정
            }

            closeModal();
        });
    });
}

//지도생성
var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.4502798, 126.702815),
    zoom: 13,
});
// 투명한 이미지 URL
var transparentIconUrl =
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// 마커 옵션에서 투명한 아이콘으로 초기화
var markerOptions = {
    position: new naver.maps.LatLng(37.5666805, 126.9784147),
    map: map,
    icon: {
        url: transparentIconUrl, // 초기에는 투명한 아이콘
        size: new naver.maps.Size(50, 50),
    },
};
var marker = new naver.maps.Marker(markerOptions);

var HOME_PATH = window.HOME_PATH || ".";

////////////////////////////////////////////////////////////////////////////////////////////////////
// 인천의 구청 위치 및 인테리어 업체 정보
// var locations = [
//     {
//         name: "Modern Interiors",
//         lat: 37.4736,
//         lng: 126.6204,
//         address: "인천 중구 중앙로 123",
//         phone: "032-123-4567",
//         profilequotepage: "http://www.moderninteriors.com",
//         //image: HOME_PATH + "/img/interior1.jpg",
//         image: "data:image/png;base64,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",
//     },
//     {
//         name: "Classic Designs",
//         lat: 37.4488,
//         lng: 126.7415,
//         address: "인천 남동구 구월동 456",
//         phone: "032-456-7890",
//         profilequotepage: "http://www.classicdesigns.com",
//         //image: HOME_PATH + "/img/interior2.jpg",
//         image: "https://mblogthumb-phinf.pstatic.net/MjAyMDAxMTRfMjk2/MDAxNTc4OTczMjI0ODUw.oMpj8SDd3OwxqVkUiHFJjPhYUpVnGMoUntjjI-dgGq4g.sUYD7LtJiNfBKcZ1E0u2cqnQtj1ZnIfr6kyEFH3zkAEg.JPEG.sjdesign7/%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EB%A1%9C%EA%B3%A0%EC%A0%9C%EC%9E%91.jpg?type=w800",
//     },
//     {
//         name: "Urban Styles",
//         lat: 37.4101,
//         lng: 126.6883,
//         address: "인천 연수구 송도동 789",
//         phone: "032-789-0123",
//         profilequotepage: "http://www.urbanstyles.com",
//         //image: HOME_PATH + "/img/interior3.jpg",
//         //image: "http://localhost:8088/upload/2023/11/07/3599fc18-bc34-4315-b153-8379710f4621_th_vans.jpg",
//         image: "http://localhost:8088/upload/ezen.png",
//     },
// ];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 마커 확대/축소 및 이미지 토글 함수
function toggleMarker(marker, isExpanded) {
    var iconUrl = isExpanded
        ? "https://assets.cdn.soomgo.com/images/map/graphic-object-map-marker-active@2x.png?webp=1"
        : transparentIconUrl; // 기본 아이콘 URL

    marker.setIcon({
        url: iconUrl,
        size: new naver.maps.Size(40, 50), // 기본 마커보다 약간 큰 아이콘 크기
        origin: new naver.maps.Point(20, 25), // 이미지 중심을 origin으로 설정
        anchor: new naver.maps.Point(20, 50), // 이미지 하단 중앙을 앵커로 설정
    });
}

var data = companyList;

// infowindow를 forEach 루프 바깥에서 정의
var infowindow = new naver.maps.InfoWindow({
    disableAnchor: true, // 꼬리 없애기
    pixelOffset: new naver.maps.Point(0, -26),
    backgroundColor: "transparent", // 배경색 투명
    borderColor: "transparent", // 테두리 색상 투명
    borderWidth: 0, // 테두리 두께 없음
    disableAnchor: true, // 꼬리 숨기기
});

// 디비에서 가져온 데이터 배열을 반복하여 각 위치에 마커 추가
data.forEach(function (location) {
    var marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(location.lat, location.lng),
        title: location.name,

        isExpanded: false, // 마커의 확대 상태를 추적하는 속성 추가
    });

    console.log("findmap.js의 디비에서 가져온 로케이션 관련", location);

    if (
        location.profileQuotepage &&
        typeof location.profileQuotepage === "string" &&
        !location.profileQuotepage.startsWith("http://") &&
        !location.profileQuotepage.startsWith("https://")
    ) {
        location.profileQuotepage = "http://" + location.profileQuotepage;
    }

    //디비에서 가져온 업체 마커 클릭 이벤트 리스너
    var isIconVisible = false; // 아이콘 표시 여부 추적을 위한 변수
    naver.maps.Event.addListener(marker, "click", function () {
        console.log("디비에서 가져온 업체 마커가 클릭 됨");

        var contentString = [
            '<div class="iw_inner" style="padding: 10px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);">',
            "   <h3 style='margin-top: 0; color: #333;'>" +
                (location.userNm || "이름 없음") +
                "</h3>",
            "   <p style='margin-bottom: 10px; color: #555;'>" +
                (location.address || "주소 정보 없음") +
                "<br />",
            '       <img src="http://localhost:8088/upload/' + //로컬용
            //'       <img src="http://aj2002.cafe24.com/_javaweb/_java/fileUpload/' + //카페24배포용webapps
                location.saveDir +
                "/" +
                location.uuid +
                "_" +
                location.fileName +
                '" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-top: 8px;" alt="' +
                (location.userNm || "") +
                '" class="thumb" /><br />',
            "       <span style='color: #777;'>" +
                (location.phone || "") + //"전화번호 없음"부분 일단 뺌
                "</span><br />",
            '       <a href="' +
                "http://localhost:8088/member/companyInfo?id=" +
                (location.id || "#") +
                '" target="_blank" style="text-decoration: none; color: #1a73e8; hover: text-decoration: underline;">' +
                ("시공사례" || "시공사례 링크 없음") +
                "</a>",
            "   </p>",
            "</div>",
        ].join("");

        // 선택한 업체의 상세 정보를 포함하는 이미지 URL
        var profileImageUrl =
            "http://localhost:8088/upload/" + //로컬용
            //"http://aj2002.cafe24.com/_javaweb/_java/fileUpload/" + //카페24배포용webapps
            location.saveDir +
            "/" +
            location.uuid +
            "_" +
            location.fileName;

        if (!marker.isExpanded) {
            // 새로운 아이콘으로 변경
            createCustomIcon(profileImageUrl, marker);

            // infowindow에 컨텐츠 설정 및 열기
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        } else {
            // 축소 상태일 때 기본 마커 아이콘으로 변경
            marker.setIcon(null);
            console.log("infowindow.close()진입직전");
            // infowindow 닫기
            infowindow.close();
            console.log("infowindow.close()탈출직후");
        }
        //isExpanded = !isExpanded; // 상태 토글
        marker.isExpanded = !marker.isExpanded; // 상태 토글
    });
});
//////////////////////////////231211추가S/////////////////////////////////////////////////////////////////
// document.querySelectorAll(".modal-item").forEach(function (item) {
//     item.addEventListener("click", function (event) {
//         console.log("전국 관련 클릭 확인1");
//         console.log(
//             ".modal-item의 event.target.textContent는 " +
//                 event.target.textContent
//         );

//         let textContent = event.target.textContent.trim();

//         if (textContent === "전국") {
//             console.log("전국용 클릭 확인2");
//             // 지도 중심을 새로운 위도와 경도로 설정
//             let lati = 36.691;
//             let longi = 128.14884;
//             map.setCenter(new naver.maps.LatLng(lati, longi));
//             map.setZoom(8);
//             // 모달 창 닫기
//             closeModal();

//             // 전국 버튼의 스타일 변경
//             var nationwideButton = document.getElementById("nationwideButton");
//             nationwideButton.style.backgroundColor = "black";
//             nationwideButton.style.color = "white";

//         }
//     });
// });

// document.querySelectorAll(".modal ul li").forEach(function (item) {
//     item.addEventListener("click", function (event) {

// document.querySelectorAll(".modal ul li a").forEach(function (item) {
//     item.addEventListener("click", function (event) {
//         console.log("모달 내부 클릭 확인");
//         // 현재 이벤트가 발생한 a 태그의 텍스트 내용을 가져옵니다.
//         let textContent = event.currentTarget.textContent.trim();
//         console.log("textContent는", textContent);
//         if (textContent === "전국") {
//             console.log("전국용 클릭 확인");
//             // 지도 중심을 새로운 위도와 경도로 설정
//             let lati = 36.691;
//             let longi = 128.14884;
//             map.setCenter(new naver.maps.LatLng(lati, longi));
//             map.setZoom(7);
//             // 모달 창 닫기
//             closeModal();
//         }
//     });
// });

// document.querySelectorAll(".modal ul li").forEach(function (item) {
//     item.addEventListener("click", function (event) {
//         console.log("모달 내부 클릭 확인");
//         // 이벤트가 발생한 요소에서 가장 가까운 a 태그를 찾습니다.
//         let link = event.target.closest('a');
//         console.log("link는", link);
//         if (link) {
//             let textContent = link.textContent.trim();
//             console.log("textContent는", textContent);
//             if (textContent === "전국") {
//                 console.log("전국용 클릭 확인");
//                 // 여기에 필요한 동작을 추가합니다.
//                 // 지도 중심을 새로운 위도와 경도로 설정
//                 let lati = 36.691;
//                 let longi = 128.14884;
//                 map.setCenter(new naver.maps.LatLng(lati, longi));
//                 map.setZoom(7);
//                 // 모달 창 닫기
//                 closeModal();
//             }
//         }
//     });
// });

document.querySelectorAll(".modal ul li").forEach(function (item) {
    item.addEventListener("click", function (event) {
        console.log("모달 내부 클릭 확인");

        // 클릭된 li 요소를 찾습니다.
        let listItem = event.target.closest("li");
        if (listItem) {
            // li 요소 내부의 첫 번째 a 태그를 찾습니다.
            let link = listItem.querySelector("a");
            if (link) {
                let textContent = link.textContent.trim();
                console.log("textContent는", textContent);
                if (textContent === "전국") {
                    console.log("전국용 클릭 확인");
                    // 여기에 필요한 동작을 추가합니다.
                    let lati = 36.0;
                    let longi = 128.14884;
                    map.setCenter(new naver.maps.LatLng(lati, longi));
                    map.setZoom(7);
                    // 모달 창 닫기
                    closeModal();

                    // '전국' 버튼의 텍스트와 스타일 변경
                    var nationwideButton =
                        document.getElementById("nationwideButton");
                    nationwideButton.textContent = "전국"; // 텍스트 변경

                    // 아이콘 추가
                    var icon = document.createElement("i");
                    icon.className = "bi bi-chevron-down"; // 예: Bootstrap 아이콘 사용
                    icon.style.color = "white"; // 아이콘 색상 설정

                    // 공백 텍스트 노드 생성
                    var space = document.createTextNode(" ");

                    // 버튼에 아이콘 추가
                    nationwideButton.appendChild(space); // 공백 추가
                    nationwideButton.appendChild(icon); // 아이콘 추가

                    nationwideButton.style.backgroundColor = "black"; // 배경색 변경
                    nationwideButton.style.color = "white"; // 글자색 변경
                }
            } else {
                console.log("a 태그가 없습니다.");
            }
        } else {
            console.log("li 요소가 없습니다.");
        }
    });
});

/////////////////////231211추가E////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".modal ul li ul li a").forEach(function (item) {
    item.addEventListener("click", function (event) {
        console.log("모달 내부 클릭 확인");
        console.log("event.target.textContent는 " + event.target.textContent);
        let city = event.target.closest("li").getAttribute("data-city");
        let district = event.target.textContent.trim();
        console.log("city는", city);
        console.log("district는", district);
        if (
            event.target.textContent === "인천 전체" ||
            event.target.textContent === "인천"
        ) {
            console.log("인천 전체 클릭 확인");
            // 지도 중심을 새로운 위도와 경도로 설정
            let lati = 37.4561;
            let longi = 126.7052;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            // 모달 창 닫기
            closeModal();
        } else if (event.target.textContent === "남동구") {
            let lati = 37.4472449;
            let longi = 126.7314534;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            // 모달 창 닫기
            closeModal();
        } else if (event.target.textContent === "연수구") {
            let lati = 37.4101597;
            let longi = 126.6783087;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            // 모달 창 닫기
            closeModal();
        } else if (event.target.textContent === "미추홀구") {
            let lati = 37.4634703;
            let longi = 126.6502865;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            // 모달 창 닫기
            closeModal();
        } else if (
            event.target.textContent === "서울 전체" ||
            event.target.textContent === "서울"
        ) {
            let lati = 37.5666612;
            let longi = 126.9783785;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            // 모달 창 닫기
            closeModal();
        } else if (event.target.textContent === "강남구") {
            let lati = 37.5175066;
            let longi = 127.0473753;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        } else if (event.target.textContent === "강서구") {
            let lati = 37.5509103;
            let longi = 126.8495742;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        } else if (event.target.textContent === "구로구") {
            let lati = 37.4954703;
            let longi = 126.8876391;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        } else if (event.target.textContent === "노원구") {
            let lati = 37.6540782;
            let longi = 127.0566045;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        } else if (event.target.textContent === "전국") {
            console.log("else if 전국 버튼 진입 ");
            let lati = 36.6540782;
            let longi = 128.0566045;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(5);
            closeModal();

            // 전국 버튼의 텍스트와 스타일 변경
            var nationwideButton = document.getElementById("nationwideButton"); // 버튼의 ID를 가정함
            nationwideButton.textContent = "전국"; // 텍스트 변경
            nationwideButton.style.backgroundColor = "black"; // 배경색 변경
            nationwideButton.style.color = "white"; // 글자색 변경
        } else {
            //
        }

        if (city === "인천" && district === "동구") {
            // 인천의 동구에 대한 처리
        } else if (city === "부산" && district === "동구") {
            // 부산의 동구에 대한 처리
            let lati = 35.129335;
            let longi = 129.0454233;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        } else if (city === "부산" && district === "남구") {
            // 부산의 남구에 대한 처리
            let lati = 35.1364076;
            let longi = 129.0843734;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        } else if (city === "부산" && district === "부산 전체") {
            // 부산의 남구에 대한 처리
            let lati = 35.179665;
            let longi = 129.0747635;
            map.setCenter(new naver.maps.LatLng(lati, longi));
            map.setZoom(15);
            closeModal();
        }
    });
});

var btn = document.getElementById("serviceButton");
btn.onclick = function () {
    modal.style.display = "block";
    document.body.appendChild(modalBackdrop);
    openTab(null, "Services"); // '서비스' 탭을 명시적으로 활성화
};

//새로운 마커 생성
// 새로운 마커 생성
function createCustomIcon(profileImageUrl, marker) {
    var customIconUrl =
        "https://assets.cdn.soomgo.com/images/map/graphic-object-map-marker-active@2x.png?webp=1";
    var imageSize = new naver.maps.Size(32, 64); // 마커 이미지 크기

    var canvas = document.createElement("canvas");
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    var context = canvas.getContext("2d");

    var iconImage = new Image();
    iconImage.crossOrigin = "anonymous";
    iconImage.src = customIconUrl;
    iconImage.onload = function () {
        context.drawImage(iconImage, 0, 0, imageSize.width, imageSize.height);

        var profileImage = new Image();
        profileImage.crossOrigin = "anonymous";
        profileImage.src = profileImageUrl;
        profileImage.onload = function () {
            var profileSize = 28; // 이미지의 크기를 더 크게 조절
            var profileX = (imageSize.width - profileSize) / 2;
            var profileY = 10; // 이미지를 위쪽으로 이동

            context.beginPath();
            context.arc(
                profileX + profileSize / 2,
                profileY + profileSize / 2,
                profileSize / 2,
                0,
                2 * Math.PI,
                false
            );
            context.clip();

            context.drawImage(
                profileImage,
                profileX,
                profileY,
                profileSize,
                profileSize
            );

            marker.setIcon({
                url: canvas.toDataURL(),
                size: imageSize,
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(
                    imageSize.width / 2,
                    imageSize.height
                ),
            });
        };
    };
}
