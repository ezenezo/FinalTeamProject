let lastMessagechatID = null; // 마지막 메시지의 chatID를 저장할 변수
let lastMessagechatRead = null; // 마지막 메시지의 chatRead를 저장할 변수

// 현재 로그인한 사용자 ID를 전역 변수로 저장
let currentUserID = document.getElementById("chatName").value; //프린시펄 username부터 input으로 넘어온값

const chatName = document.getElementById("chatName").value;

// URL에서 toID 값을 가져오기
const urlParams = new URLSearchParams(window.location.search);
const toID = urlParams.get("toID"); // 'toID' 파라미터의 값을 가져옵니다.
let chatData = {
    fromID: chatName, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
    toID: toID,
    chatContent: "",
};
//호출해서 등록
document.getElementById("chatSubmitBtn").addEventListener("click", () => {
    const chatContent = document.getElementById("chatContent").value;
    chatData = {
        fromID: chatName, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함 //위의 내용 사라지고 다시 덮어쓰는듯
        toID: toID,
        chatContent: chatContent,
    };

    postComment(chatData).then((result) => {
        if (result > 0) {
            //alert("채팅글 insert 완료");
        } else {
            alert("채팅 insert 실패");
        }

        // printCommentList(bnoVal);
        //1:1 채팅글 출력
        printChatList(chatData);
        document.getElementById("chatContent").value = "";
        document.getElementById("chatContent").focus();
    });
});

// 보내는 함수
async function postComment(chatData) {
    try {
        const url = "/chaturl/chat2";
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        // const result = await resp.text(); //isOk
        return result;
    } catch (error) {
        console.log(error);
    }
}

//채팅글 요청 함수
async function spreadChatListFromServer(chatData) {
    try {
        const url = "/chaturl/list2/";
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        const resp = await fetch(url, config);
        const result = await resp.json(); //리스트 받음
        // const result = await resp.text(); //리스트 받음
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 읽지 않은 메시지 관련 함수
async function getUnread(currentUserID) {
    try {
        const url = "/chaturl/chatUnread";
        const chatData = { toID: currentUserID }; //이렇게 해야 컨트롤러가 인식하기 시작함 //ChatDTO형식의 변수(db컬럼명)개념으로 인식하기 시작
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
        if (result >= 1) {
            showUnread(result);
        } else {
            showUnread("");
        }
    } catch (error) {
        console.log(error);
    }
}

function showUnread(result) {
    // $("#unread").html(result);
    document.getElementById("unread").innerHTML = result;
}

function getInfiniteChat() {
    setInterval(function () {
        printChatList(chatData);
        getUnread(currentUserID);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", (event) => {
    const currentPage = window.location.href;
    // 특정 페이지인 경우 100분 지연 실행
    if (
        currentPage.includes('localhost:8088/member/login') || currentPage.includes('aj2002.cafe24.com/member/login') 
        || currentPage.includes('localhost:8088/member/companyRegister') || currentPage.includes('aj2002.cafe24.com/member/companyRegister')
        || currentPage.includes('localhost:8088/member/register)') || currentPage.includes('aj2002.cafe24.com/member/register')
    ) {
        setTimeout(function () {
            printChatList(chatData);
            getInfiniteChat();
            getUnread(currentUserID);
        }, 6000000); // 100분 지연
    } else {
        printChatList(chatData);
        getInfiniteChat();
        getUnread(currentUserID);
    }
});

// 두 날짜가 다른 날짜인지 확인하는 함수
function isDateDifferent(date1, date2) {
    return (
        date1.getFullYear() !== date2.getFullYear() ||
        date1.getMonth() !== date2.getMonth() ||
        date1.getDate() !== date2.getDate()
    );
}

let lastMessageChatRead = 0;
function isNewMessage(newMessages) {
    // 새 메시지가 있는지 확인
    if (newMessages.length === 0) {
        return false;
    }

    const latestMessagechatID = newMessages[newMessages.length - 1].chatID; // 예시로 id 사용
    const latestMessageChatRead = newMessages[newMessages.length - 1].chatRead;
    if (
        lastMessagechatID !== latestMessagechatID ||
        lastMessageChatRead !== latestMessageChatRead
    ) {
        // if (lastMessagechatID !== latestMessagechatID) {
        lastMessagechatID = latestMessagechatID; // 마지막 메시지 ID 업데이트
        lastMessageChatRead = latestMessageChatRead;
        return true;
    }
    return false;
}

function printChatList(chatData) {
    spreadChatListFromServer(chatData).then((result) => {
        if (isNewMessage(result)) {
            // 새 메시지가 있을 경우에만 DOM 업데이트
            updateChatListDOM(result);
        }
    });
}

function updateChatListDOM(result) {

    const ul = document.getElementById("chatList2");

    // 이전 채팅의 날짜를 저장하는 변수
    let prevDate = null;
    if (result.length > 0) {
        //대소문자 꼭 맞춰야함 위 아래

        ul.innerText = "";
        let str = "";
        for (let chatdto of result) {
            let messageClass;
            let name1;
            let profileImageUrl;
            let defaultImageUrl = "/resources/img/profile_none.png"; // 기본 이미지 경로

            // 날짜를 가져오기 (년, 월, 일)-------------------------231221S
            const chatDate = new Date(chatdto.chatTime);
            const chatYear = chatDate.getFullYear();
            const chatMonth = chatDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
            const chatDay = chatDate.getDate();
            const chatDayOfWeek = chatDate.toLocaleDateString("ko-KR", {
                weekday: "long",
            }); // 추가: 요일
            // 날짜를 가져오기 (년, 월, 일)-------------------------231221E
            // filevo가 존재하면 정상적인 이미지 경로를, 그렇지 않으면 기본 이미지 경로를 사용
            if (chatdto.filevo) {
                profileImageUrl =
                    "http://localhost:8088/upload/" +
                    //"http://aj2002.cafe24.com/_javaweb/_java/fileUpload/" + //카페24배포용webapps
                    chatdto.filevo.saveDir +
                    "/" +
                    chatdto.filevo.uuid +
                    "_" +
                    chatdto.filevo.fileName;
            } else {
                profileImageUrl = defaultImageUrl;
            }

            let str = `<div class="row">`;

            // 시간 포맷 변경 (예: '15:30')
            let formattedTime = new Date(chatdto.chatTime).toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }
            );
            chatdto.chatContent = chatdto.chatContent.replace(/\n/g, "<br>"); //줄바꿈 테스트중
            if (chatdto.fromID == currentUserID) {
                messageClass = "my-message";

                name1 = "나";
                // 날짜가 변경된 경우에만 날짜 정보를 출력231221-------------S
                if (!prevDate || isDateDifferent(prevDate, chatDate)) {
                    str += `<div class="row date-divider  date-container text-center"><span class="material-symbols-outlined"> calendar_month</span> ${chatYear}년 ${chatMonth}월 ${chatDay}일 ${chatDayOfWeek}</div>`;
                    prevDate = chatDate;
                    prevDayOfWeek = chatDayOfWeek;
                }
                // 날짜가 변경된 경우에만 날짜 정보를 출력231221-------------E
                str += `<div class="col-lg-12 ${messageClass}">`;
                str += `<div class="media">`;
                // 231221 전경환 -------------S
                if (chatdto.chatRead === 0) {
                    str += `<div class="message-read1">1&nbsp;</div>`; // chatRead가 0이면 1로 표시
                } else if (chatdto.chatRead === 1) {
                    str += `<div class="message-read1"></div>`; // chatRead가 1이면 아무것도 표시하지 않음
                }
                // 231221 전경환 -------------E
                str += `<div class="message-time-left">${formattedTime}</div>`;
                str += `<div class="message-content">${chatdto.chatContent}</div>`;
                str += `</div>`; // media 닫기
                str += `</div>`; // col-lg-12 닫기
            } else {
                // 상대방 메시지일 때의 레이아웃
                messageClass = "other-message";
                name1 = chatdto.fromID;
                // 날짜가 변경된 경우에만 날짜 정보를 출력231221-------------S
                if (!prevDate || isDateDifferent(prevDate, chatDate)) {
                    str += `<div class="row date-divider  date-container text-center"><span class="material-symbols-outlined"> calendar_month</span> ${chatYear}년 ${chatMonth}월 ${chatDay}일 ${chatDayOfWeek}</div>`;
                    prevDate = chatDate;
                    prevDayOfWeek = chatDayOfWeek;
                }
                // 날짜가 변경된 경우에만 날짜 정보를 출력231221-------------E
                str += `<div class="col-lg-12 ${messageClass}">`;
                str += `<div class="media">`;

                // 이미지
                //str += `<img class="media-object img-circle" src="${profileImageUrl}" alt="">`; // 프로필 이미지 URL 사용
                // 이미지 with onerror 이벤트
                str += `<img class="media-object img-circle" src="${profileImageUrl}" onerror="this.onerror=null; this.src='${defaultImageUrl}'" alt="">`;

                // 오른쪽 컨테이너 (ID와 채팅 내용, 시간 포함)
                str += `<div class="right-container">`;
                str += `<div class="user-id">${name1}</div>`; // ID 표시
                str += `<div class="message-with-time">`; // 메시지와 시간을 위한 컨테이너
                str += `<div class="message-content">${chatdto.chatContent}</div>`; // 채팅 내용 표시

                str += `<div class="message-time-right">${formattedTime}</div>`; // 시간 표시
                str += `</div>`; // message-with-time 닫기
                str += `</div>`; // right-container 닫기

                str += `</div>`; // media 닫기
                str += `</div>`; // col-lg-12 닫기
            }

            str += `</div>`;
            ul.innerHTML += str;
        }
        ul.innerHTML += str;

        const chatList = document.getElementById("chatList2");
        // chatList.scrollTop = chatList.scrollHeight;
        // 스크롤을 최하단으로 이동하는 부분을 setTimeout으로 감싸줍니다.
        setTimeout(() => {
            const chatList = document.getElementById("chatList2");
            chatList.scrollTop = chatList.scrollHeight;
        }, 30); // 0.03초(아주약간) 지연시간을 주어, 브라우저가 DOM 업데이트를 완료할 수 있도록....
    } else {
        ul.innerText = "글이 없습니다.";
    }
}