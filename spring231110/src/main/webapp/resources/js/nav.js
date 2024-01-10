/**
 * 
 */

 let profileImageUrl;
 
 function passDataToNav(fvoJson) {
    //이 .js안에서 가장 늦게 실행되는듯함...
    let fvojn = JSON.parse(fvoJson);
    // 이제 'fvo' 객체를 사용할 수 있다
    // 예: fvo.saveDir, fvo.uuid, fvo.fileName 등
    profileImageUrl =
    "http://localhost:8088/upload/" + //로컬용
    //"http://aj2002.cafe24.com/_javaweb/_java/fileUpload/" + //카페24배포용webapps
    fvojn.saveDir +
    "/" +
    fvojn.uuid +
    "_" +
    fvojn.fileName;

}

// window.onload = function() { //페이지 완전 이동시에만 동작함
//     updateUnreadMessagesCount();
//     setInterval(updateUnreadMessagesCount, 6000); // 6000ms = 6초
// };

// window.addEventListener('DOMContentLoaded', (event) => {
//     // getInfiniteChat2 함수를 600000ms  10분후에 실행
//     //바로 실행시 필요한 값을 다 받지못하고 실행하여 로그인시 에러발생 
//     // 현재 페이지 URL 확인
//     const currentPage = window.location.href;
//     // 특정 페이지인 경우에만 getInfiniteChat2 함수를 지연 실행
//     if (currentPage.includes('localhost:8088/member/login')||currentPage.includes('aj2002.cafe24.com/member/login')) {
//         setTimeout(function() {
//             getInfiniteChat2();
//         }, 600000);
//     }
    
// });

window.addEventListener('DOMContentLoaded', (event) => {

    // 전역 변수로 setInterval의 ID를 저장
    let intervalId = null;

    // 현재 페이지 URL 확인 및 처리 함수 실행
    function checkAndExecuteCurrentPage() {
        const currentPage = window.location.href;

        // 이미 설정된 지연 이 있으면 취소
        // if (intervalId) {
        //     clearTimeout(intervalId);
        // }

        // 특정 페이지인 경우 getInfiniteChat2 함수를 10분 지연 실행
        if (currentPage.includes('localhost:8088/member/login') || currentPage.includes('aj2002.cafe24.com/member/login') 
        || currentPage.includes('localhost:8088/member/companyRegister') || currentPage.includes('aj2002.cafe24.com/member/companyRegister')
        || currentPage.includes('localhost:8088/member/register)') || currentPage.includes('aj2002.cafe24.com/member/register')
        ) {
            setTimeout(function() {
                getInfiniteChat2();
            }, 6000000); // 100분 지연
        } else {
            getInfiniteChat2();
            // 그 외의 페이지에서는 5초 간격으로 인터벌 실행
            intervalId = setInterval(function() {
                getInfiniteChat2();
            }, 4500); // 4.5초 간격
        }
    }

    // 페이지 로드 시 현재 페이지 확인
    checkAndExecuteCurrentPage();

    // 페이지 변경 감지 시 처리
    function pageChanged() {
        // 현재 페이지 확인 및 필요한 함수 실행
        checkAndExecuteCurrentPage();
    }

    // History API 오버라이드
    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            pageChanged();
            return pushState.apply(history, arguments);
        };

        var replaceState = history.replaceState;
        history.replaceState = function(state) {
            pageChanged();
            return replaceState.apply(history, arguments);
        };
    })(window.history);

    // popstate 이벤트에 대한 처리
    window.addEventListener('popstate', pageChanged);
});


function getInfiniteChat2() {
    // setInterval(function () {
        // printChatList(chatData);
        //chatBoxFunction(currentUserID);
        getUnread11(idid);
        //getUnread2(currentUserID);
    // }, 4700); //4.7초마다 반복
}

// 서버로부터 안 읽은 메시지 수를 받아와 세션을 업데이트하는 함수
function updateUnreadMessagesCount() {
    // 현재 사용자의 ID를 사용해 서버에 요청
    // 예를 들어, 사용자 ID가 전역 변수 'userId'에 저장되어 있다고 가정
    fetch('/chaturl/updateUnreadCount?userId=' + idid)
        .then(response => response.text()) // JSON 대신 text로 응답을 받음
        .then(AllUnreadChat => {
            let unreadCount = parseInt(AllUnreadChat, 10); // 문자열을 정수로 변환
            
            // 필요한 경우 추가적인 동작 수행
            // jQuery 대신 순수 JavaScript 사용 예시
            let badge1 = document.getElementById('badge1');
            if (unreadCount > 0) {
                badge1.style.display = 'block'; // 또는 'inline', 'inline-block' 등 원하는 디스플레이 속성으로 설정
            } else {
                badge1.style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
        // .then(response => response.json())
        // .then(AllUnreadChat => {
        //     // 필요한 경우 추가적인 동작 수행
        // })
        // .catch(error => console.error('Error:', error));
}



// 읽지 않은 메시지 관련 함수
async function getUnread11(idid) {
    try {
        const url = "/chaturl/chatUnread";
        const chatData = { toID: idid }; //이렇게 해야 컨트롤러가 인식하기 시작함 //ChatDTO형식의 변수(db컬럼명)개념으로 인식하기 시작
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        const resp = await fetch(url, config);
        const result = await resp.text(); //isOk
        // return result;
        
        // updateBadgeVisibility(result); // DOM 업데이트 함수 호출

        if (result >= 1) {
           badge1.style.display = 'block';
        } else {
            // showUnread("총 안읽은 글개수 파악불가");
            badge1.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}