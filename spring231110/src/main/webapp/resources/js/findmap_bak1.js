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
    tooltip.style.display = "block"; // 말풍선 표시

    // 5초 후 말풍선 숨기기
    setTimeout(function () {
        tooltip.style.display = "none";
    }, 5000);

    //'서비스' 탭을 기본적으로 활성화
    openTab(null, "Services"); // openTab 함수 호출 // '서비스' 탭 활성화
};

function toggleSubMenu(menuId) {
    var subMenu = document.getElementById(menuId);
    if (subMenu.style.display === "none") {
        subMenu.style.display = "block";
    } else {
        subMenu.style.display = "none";
    }
}

document.getElementById("movingMenu").addEventListener("click", function () {
    this.classList.toggle("active");
    toggleSubMenu("subMenuMoving");
});
document.getElementById("cleaningMenu").addEventListener("click", function () {
    this.classList.toggle("active");
    toggleSubMenu("subMenuCleaning");
});

// document.getElementById("houseMovingMenu").addEventListener("click", function() {
// 	  var url = this.querySelector("a").getAttribute("href");
// 	  window.location.href = url; // 현재 창에서 해당 URL로 이동
// 	});

document.getElementById("seoulMenu").addEventListener("click", function () {
    this.classList.toggle("active");
    toggleSubMenu("subMenuSeoul");
});

document.getElementById("incheonMenu").addEventListener("click", function () {
    this.classList.toggle("active");
    toggleSubMenu("subMenuIncheon");
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

    var modalMenuItems = document.querySelectorAll(".modal ul li a");

    var serviceBtn = document.getElementById("serviceButton");
    var nationwideBtn = document.getElementById("nationwideButton");

    modalMenuItems.forEach(function (item) {
        item.addEventListener("click", function () {
            var activeTab =
                document.querySelector(".tablinks.active").textContent;

            if (activeTab === "서비스") {
                serviceBtn.textContent = this.textContent;
                serviceBtn.style.backgroundColor = "black";
                serviceBtn.style.color = "white";
            } else if (activeTab === "지역") {
                nationwideBtn.textContent = this.textContent;
                nationwideBtn.style.backgroundColor = "black";
                nationwideBtn.style.color = "white";
            }

            closeModal();
        });
    });
}

//지도생성
var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.5666805, 126.9784147),
    zoom: 10,
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

// 서울시청 마커 및 정보 창 설정
// var seoulCityhall = new naver.maps.LatLng(37.5666805, 126.9784147),
//     seoulMarker = new naver.maps.Marker({
//         map: map,
//         position: seoulCityhall,
//     });

// var seoulContentString = [
//     '<div class="iw_inner">',
//     "   <h3>서울특별시청</h3>",
//     "   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />",
//     '       <img src="' +
//         HOME_PATH +
//         '/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
//     "       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />",
//     '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
//     "   </p>",
//     "</div>",
// ].join("");

// var seoulInfowindow = new naver.maps.InfoWindow({
//     content: seoulContentString,
// });

// naver.maps.Event.addListener(seoulMarker, "click", function (e) {
//     if (seoulInfowindow.getMap()) {
//         seoulInfowindow.close();
//     } else {
//         seoulInfowindow.open(map, seoulMarker);
//     }
// });

//infowindow.open(map, marker);/////////////////////////////////////////////////////////////////////
// 인천시청 마커 및 정보 창 설정
// var incheonCityhall = new naver.maps.LatLng(37.4561, 126.7052),
//     incheonMarker = new naver.maps.Marker({
//         map: map,
//         position: incheonCityhall,
//     });
// var incheonContentString = [
//     '<div class="iw_inner">',
//     "   <h3>인천광역시청</h3>",
//     "   <p>인천광역시 중구 태평로1가 31 | 서울광역시 중구 세종대로 110 서울특별시청<br />",
//     '       <img src="' +
//         HOME_PATH +
//         '/img/example/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br />',
//     "       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />",
//     '       <a href="http://www.seoul.go.kr" target="_blank">www.incheon.go.kr/</a>',
//     "   </p>",
//     "</div>",
// ].join("");
// var incheonInfowindow = new naver.maps.InfoWindow({
//     content: incheonContentString,
// });
// naver.maps.Event.addListener(incheonMarker, "click", function (e) {
//     if (incheonInfowindow.getMap()) {
//         incheonInfowindow.close();
//     } else {
//         incheonInfowindow.open(map, incheonMarker);
//     }
// });
////////////////////////////////////////////////////////////////////////////////////////////////////
// 인천의 구청 위치 및 인테리어 업체 정보
var locations = [
    {
        name: "Modern Interiors",
        lat: 37.4736,
        lng: 126.6204,
        address: "인천 중구 중앙로 123",
        phone: "032-123-4567",
        profilequotepage: "http://www.moderninteriors.com",
        //image: HOME_PATH + "/img/interior1.jpg",
        image: "data:image/png;base64,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",
    },
    {
        name: "Classic Designs",
        lat: 37.4488,
        lng: 126.7415,
        address: "인천 남동구 구월동 456",
        phone: "032-456-7890",
        profilequotepage: "http://www.classicdesigns.com",
        //image: HOME_PATH + "/img/interior2.jpg",
        image: "https://mblogthumb-phinf.pstatic.net/MjAyMDAxMTRfMjk2/MDAxNTc4OTczMjI0ODUw.oMpj8SDd3OwxqVkUiHFJjPhYUpVnGMoUntjjI-dgGq4g.sUYD7LtJiNfBKcZ1E0u2cqnQtj1ZnIfr6kyEFH3zkAEg.JPEG.sjdesign7/%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4%EB%A1%9C%EA%B3%A0%EC%A0%9C%EC%9E%91.jpg?type=w800",
    },
    {
        name: "Urban Styles",
        lat: 37.4101,
        lng: 126.6883,
        address: "인천 연수구 송도동 789",
        phone: "032-789-0123",
        profilequotepage: "http://www.urbanstyles.com",
        //image: HOME_PATH + "/img/interior3.jpg",
        //image: "http://localhost:8088/upload/2023/11/07/3599fc18-bc34-4315-b153-8379710f4621_th_vans.jpg",
        image: "http://localhost:8088/upload/ezen.png",
    },
    // 추가 구청 및 업체 정보...
];

var CustomImageUrl =
    "https://assets.cdn.soomgo.com/images/map/graphic-object-map-marker-default@2x.png?webp=1"; // 사용자 정의 이미지 URL
// 각 위치에 마커와 정보 창 추가
locations.forEach(function (location) {
    var marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(location.lat, location.lng),
        title: location.name,
        // icon: {
        //     url: CustomImageUrl, // 사용자 정의 이미지 URL 적용
        //     size: new naver.maps.Size(20, 40), // 크기 조정
        //     scaledSize: new naver.maps.Size(20, 40), // 크기 조정
        //     origin: new naver.maps.Point(0, 0), // 이미지의 원점 지정
        //     anchor: new naver.maps.Point(20, 20), // 마커 위치에 이미지 매핑 지정
        // },
    });
    console.log("하드코딩 로케이션 관련", location);
    var contentString = [
        '<div class="iw_inner">',
        "   <h3>" + location.name + "</h3>",
        "   <p>" + location.address + "<br />",
        '       <img src="' +
            location.image +
            '" width="55" height="55" alt="' +
            location.name +
            '" class="thumb" /><br />',
        "       " + location.phone + "<br />",
        '       <a href="' +
            location.profilequotepage +
            '" target="_blank">' +
            location.profilequotepage +
            "</a>",
        "   </p>",
        "</div>",
    ].join("");

    var infowindow = new naver.maps.InfoWindow({
        content: contentString,
    });

    // 하드코딩 마커 클릭 이벤트 리스너
    var isIconVisible = false; // 아이콘 표시 여부 추적을 위한 변수
    naver.maps.Event.addListener(marker, "click", function () {
        console.log("하드코딩 업체 마커가 클릭 됨");
        // 프로필 이미지 URL을 인자로 전달
        createCustomIcon(location.image, marker);

        // if (isIconVisible) {
        //     // 이미지 아이콘이 이미 표시된 경우, 아이콘 제거
        //     marker.setIcon(null); // 아이콘 제거
        //     isIconVisible = false;
        // } else {
        //     // 이미지 아이콘이 표시되지 않은 경우, 아이콘 설정  /를 맨앞에 붙이면 애플리케이션의 루트기준 절대경로
        //     marker.setIcon({
        //         url: "/resources/img/bigmark.jpg",
        //         size: new naver.maps.Size(50, 50),
        //     });
        //     isIconVisible = true;
        // }

        // 정보 창 토글
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    // 이미지 클릭 이벤트 리스너
    naver.maps.Event.addListener(infowindow, "domready", function () {
        var img = document.querySelector(".iw_inner img");
        console.log("이미지가 클릭 안됨");
        if (img) {
            console.log("이미지가 클릭됨");
            img.addEventListener("click", function () {
                infowindow.close();
            });
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
var data = companyList;

// 디비에서 가져온 데이터 배열을 반복하여 각 위치에 마커 추가
data.forEach(function (location) {
    var marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(location.lat, location.lng),
        title: location.name,
        // icon: {
        //     url: CustomImageUrl, // 사용자 정의 이미지 URL 적용
        //     size: new naver.maps.Size(20, 40), // 크기 조정
        //     scaledSize: new naver.maps.Size(20, 40), // 크기 조정
        //     origin: new naver.maps.Point(0, 0), // 이미지의 원점 지정
        //     anchor: new naver.maps.Point(20, 20), // 마커 위치에 이미지 매핑 지정
        // },
    });
    console.log("디비에서 가져온 로케이션 관련", location);
    //fileName: "사진4.png";
    // filetype:0
    // id:ㄴㅁㄷㅇㄹㄴㅁㄹㅇ"
    // keynum:0
    // lat:37.533
    // lng:126.7
    // phone:"033-3333-3333"
    // profileQuotepage: "www.naver.com"
    // rateAverage: 0
    // reviewCount: 0
    // saveDir: "ㄴㅁㄷㅇㄹㄴㅁㄹㅇ"
    // userNm: "회사2"
    // uuid:~~~~~~~~~~~

    //원하는 상태 ==>image: "http://localhost:8088/upload/1231313_ezen.png",

    // URL이 'http://' 또는 'https://'로 시작하는지 확인하고, 아닐 경우 추가합니다.
    if (
        location.profileQuotepage &&
        typeof location.profileQuotepage === "string" &&
        !location.profileQuotepage.startsWith("http://") &&
        !location.profileQuotepage.startsWith("https://")
    ) {
        location.profileQuotepage = "http://" + location.profileQuotepage;
    }

    // var contentString = [
    //     '<div class="iw_inner">',
    //     "   <h3>" + (location.userNm || "") + "</h3>",
    //     "   <p>" + (location.address || "") + "<br />",
    //     '       <img src="http://localhost:8088/upload/' +
    //     '       <img src="http://aj2002.cafe24.com/_javaweb/_java/fileUpload/' + //카페24용 //카페24배포용webapps
    //         location.saveDir +
    //         "/" +
    //         location.uuid +
    //         "_" +
    //         location.fileName +
    //         '" width="55" height="55" alt="' +
    //         (location.userNm || "") +
    //         '" class="thumb" /><br />',
    //     "       " + (location.phone || "") + "<br />",
    //     '       <a href="' +
    //         (location.profileQuotepage || "") +
    //         '" target="_blank">' +
    //         (location.profileQuotepage || "") +
    //         "</a>",
    //     "   </p>",
    //     "</div>",
    // ].join("");
    var contentString = [
        '<div class="iw_inner" style="padding: 10px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);">',
        "   <h3 style='margin-top: 0; color: #333;'>" +
            (location.userNm || "이름 없음") +
            "</h3>",
        "   <p style='margin-bottom: 10px; color: #555;'>" +
            (location.address || "주소 정보 없음") +
            "<br />",
        '       <img src="http://localhost:8088/upload/' +
            location.saveDir +
            "/" +
            location.uuid +
            "_" +
            location.fileName +
            '" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-top: 8px;" alt="' +
            (location.userNm || "") +
            '" class="thumb" /><br />',
        "       <span style='color: #777;'>" +
            (location.phone || "전화번호 없음") +
            "</span><br />",
        '       <a href="' +
            (location.profileQuotepage || "#") +
            '" target="_blank" style="text-decoration: none; color: #1a73e8; hover: text-decoration: underline;">' +
            (location.profileQuotepage || "프로필 링크 없음") +
            "</a>",
        "   </p>",
        "</div>",
    ].join("");

    var infowindow = new naver.maps.InfoWindow({
        content: contentString,
    });

    //디비에서 가져온 업체 마커 클릭 이벤트 리스너
    var isIconVisible = false; // 아이콘 표시 여부 추적을 위한 변수
    naver.maps.Event.addListener(marker, "click", function () {
        console.log("디비에서 가져온 업체 마커가 클릭 됨");
        // if (isIconVisible) {
        //     // 이미지 아이콘이 이미 표시된 경우, 아이콘 제거
        //     marker.setIcon(null); // 아이콘 제거
        //     isIconVisible = false;
        // } else {
        //     // 이미지 아이콘이 표시되지 않은 경우, 아이콘 설정  /를 맨앞에 붙이면 애플리케이션의 루트기준 절대경로
        //     marker.setIcon({
        //         url: "/resources/img/bigmark.jpg",
        //         size: new naver.maps.Size(50, 50),
        //     });
        //     isIconVisible = true;
        // }

        // 정보 창 토글
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    // 이미지 클릭 이벤트 리스너
    naver.maps.Event.addListener(infowindow, "domready", function () {
        var img = document.querySelector(".iw_inner img");
        console.log("이미지가 클릭 안됨");
        if (img) {
            console.log("이미지가 클릭됨");
            img.addEventListener("click", function () {
                infowindow.close();
            });
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".modal ul li ul li a").forEach(function (item) {
    item.addEventListener("click", function (event) {
        console.log("모달 내부 클릭 확인");
        console.log("event.target.textContent는 " + event.target.textContent);

        if (event.target.textContent === "인천 전체") {
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
        } else if (event.target.textContent === "서울 전체") {
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
function createCustomIcon(profileImageUrl, marker) {
    var customIconUrl =
        "https://assets.cdn.soomgo.com/images/map/graphic-object-map-marker-active@2x.png?webp=1";
    var imageSize = new naver.maps.Size(32, 64);

    var canvas = document.createElement("canvas");
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    var context = canvas.getContext("2d");

    var iconImage = new Image();
    iconImage.crossOrigin = "anonymous"; // CORS 정책 준수
    iconImage.src = customIconUrl;
    iconImage.onload = function () {
        context.drawImage(iconImage, 0, 0, imageSize.width, imageSize.height);

        var profileImage = new Image();
        profileImage.crossOrigin = "anonymous"; // CORS 정책 준수
        profileImage.src = profileImageUrl;
        profileImage.onload = function () {
            var profileSize = 32;
            var profileX = (imageSize.width - profileSize) / 2;
            var profileY = (imageSize.height - profileSize) / 2;
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
                    imageSize.height / 2
                ),
            });
        };
    };
}
