console.log("chat2.js진입");

let unreadMessages = {}; // 전역 변수로 사용자별 안 읽은 메시지 수 저장

// 현재 로그인한 사용자 ID를 전역 변수로 저장
let currentUserID = document.getElementById("chatName").value; //프린시펄 username부터 input으로 넘어온값

const chatName = document.getElementById("chatName").value;

// URL에서 toID 값을 가져오기
const urlParams = new URLSearchParams(window.location.search);
const toID = urlParams.get("toID"); // 'toID' 파라미터의 값을 가져옵니다.
// const toID = document.getElementById("toID").value;
// console.log("시작하자마자 toID는" + toID);
const chatData = {
    fromID: chatName, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
    toID: toID,
    chatContent: "",
};

// 읽지 않은 메시지 관련 함수
async function getUnread1(currentUserID) {
    try {
        console.log("비동기 getUnread 함수 진입");
        console.log("230줄의 currentUserID는", currentUserID);
        const url = "/chaturl/chatUnread";
        const chatData = { toID: currentUserID }; //이렇게 해야 컨트롤러가 인식하기 시작함 //ChatDTO형식의 변수(db컬럼명)개념으로 인식하기 시작
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        console.log("5는 ", config);
        const resp = await fetch(url, config);
        const result = await resp.text(); //isOk
        // return result;
        console.log("전체 안읽은 글 개수는 " + result);
        if (result >= 1) {
            showUnread(result);
        } else {
            // showUnread("총 안읽은 글개수 파악불가");
        }
        console.log(" getUnread(currentUserID) 정상동작완료");
    } catch (error) {
        console.log(error);
    }
}

// 각 사원별 읽지 않은 메시지 관련 함수
async function getUnread2(currentUserID) {
    try {
        console.log("비동기 getUnread2 함수 진입");
        console.log("getUnread2의 currentUserID는 ", currentUserID);
        const url = "/chaturl/chatUnread2";
        const chatData = { toID: currentUserID }; //이렇게 해야 컨트롤러가 인식하기 시작함 //ChatDTO형식의 변수(db컬럼명)개념으로 인식하기 시작
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        console.log("비동기 getUnread2의 5는 ", config);
        const resp = await fetch(url, config);
        // const result = await resp.text(); //isOk
        const result = await resp.json();
        // return result;
        console.log("각각 안읽은 글관련 데이터 ", result);

        // 결과를 unreadMessages 전역 변수에 저장
        unreadMessages = result.reduce((acc, item) => {
            acc[item.fromID] = item.count;
            return acc;
        }, {});

        if (result.length >= 1) {
            console.log(
                "getUnread2의 결과의 길이가 1이상 있음 " + result.length
            );
            // showUnread2(result);
        } else {
            // showUnread2("각각 안읽은 글개수 파악불가");
        }
        console.log(" getUnread2(currentUserID) 정상동작완료");
    } catch (error) {
        console.log(error);
    }
}

function showUnread(result) {
    console.log("showUnread(result)함수 진입 ", result);
    // $("#unread").html(result);
    document.getElementById("unread").innerHTML = result;
    console.log("showUnread(result)함수 탈출 ", result);
}
// function showUnread2(result) {
//     console.log("showUnread2(result)함수 진입 ", result);
//     // $("#unread").html(result);

//     console.log("currentUserID는 ", currentUserID);

//     console.log("showUnread2내에서 /chaturl/getBox 함수 진입");

//     result.forEach((item) => {
//         console.log("forEach내부의 currentUserID는 ", currentUserID);
//         console.log("item.fromID는 ", item.fromID);
//         console.log("item.count는 ", item.count);1로부터의
//         console.log("chatData.toID는 ", chatData.toID);
//         console.log("chatData는 ", chatData);

//         document.querySelectorAll(".targClass").forEach((element) => {
//             console.log("targClass는 ", element.textContent); // 혹은 element.innerText

//             // 여기서 chatData.fromID와 비교하는 로직을 수행
//             if (item.fromID == element.textContent) {
//                 console.log("item.fromID ==element.textContent진입");
//                 console.log(
//                     "item.toID == element.textContent진입후 item.toID 는 ",
//                     item.toID
//                 );
//                 console.log(
//                     "item.fromID ==element.textContent진입후 item.count 는 ",
//                     item.count
//                 );
//                 document.getElementById("unread2").innerHTML = item.count;
//             }
//         });
//     });
// }

// function showUnread2(result) {
//     console.log("showUnread2(result)함수 진입 ", result);

//     const unreadContainer = document.getElementById("unreadContainer"); // 이 컨테이너는 모든 사용자별 안읽은 메시지를 표시하기 위한 곳입니다.
//     unreadContainer.innerHTML = ""; // 기존 내용을 초기화

//     result.forEach((item) => {
//         // 각 사용자별 안 읽은 메시지 수를 표시할 div 생성

//         const userUnreadDiv = document.createElement("div");
//         userUnreadDiv.id = "unread_" + item.fromID; // 각 사용자별 고유 ID 부여
//         userUnreadDiv.innerText = `${item.fromID}로부터의 안 읽은 메시지 수: ${item.count}`;
//         unreadContainer.appendChild(userUnreadDiv);
//     });

//     console.log("showUnread2(result)함수 탈출 ", result);
// }

function getInfiniteChat() {
    setInterval(function () {
        // printChatList(chatData);
        chatBoxFunction(currentUserID);
        getUnread1(currentUserID);
        getUnread2(currentUserID);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", (event) => {
    chatBoxFunction(currentUserID);
    getUnread1(currentUserID);
    getUnread2(currentUserID);
    getInfiniteChat();
});

// 누가누가 나한테 메시지 보냈나 //내가 아직 확인 못한 메시지 확인용

async function chatBoxFunction(currentUserID) {
    try {
        console.log("비동기 chatBoxFunction 함수 진입");
        console.log("172줄의 currentUserID는", currentUserID);

        await getUnread2(currentUserID);

        const url = "/chaturl/getBox"; //아직 안만든듯231119 23시59분 chatBox--->getBox
        const chatData = { toID: currentUserID }; //이렇게 해야 컨트롤러가 인식하기 시작함 //ChatDTO형식의 변수(db컬럼명)개념으로 인식하기 시작
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        console.log("5는 ", config);
        const resp = await fetch(url, config);
        const result = await resp.json(); //isOk

        const u = document.getElementById("boxTable");
        if (result.length > 0) {
            //대소문자 꼭 맞춰야함 위 아래

            //다시 댓글을 뿌릴 때 기존 값 삭제 1page 경우
            // if (page == 1) {
            //     ul.innerText = "";
            // }
            u.innerText = "";
            let str = "";
            console.log("chatBoxFunction의 내부 result는 " + result);
            for (let chatdto of result) {
                let name1;
                //아래 ||는 null을 대비해서 0을 쓴 것
                let unreadCount = unreadMessages[chatdto.fromID] || 0; // 해당 발신자의 안 읽은 메시지 수를 가져옴
                if (chatdto.fromID == currentUserID) {
                    name1 = "나";
                } else {
                    name1 = chatdto.fromID;
                }

                if (chatdto.fromID == currentUserID) {
                    str += `<tr onclick="location.href='chat2?toID=${chatdto.toID}&fromID=${currentUserID}'">`;
                } else {
                    str += `<tr onclick="location.href='chat2?toID=${chatdto.fromID}&fromID=${currentUserID}'">`;
                }
                str += `    <td style="width: 150px;">`;
                if (chatdto.fromID == currentUserID) {
                    str += `        <h5 class='targClass'>${chatdto.toID}</h5>`;
                } else {
                    str += `        <h5 class='targClass'>${chatdto.fromID}</h5>`;
                }
                str += `    </td>`;
                str += `    <td>`;
                str += `        <h5>${chatdto.chatContent}</h5>`;
                str += `    </td>`;
                str += `    <td>`;
                if (unreadCount != 0) {
                    str += `        <div class="pull-right"><span id="unread2" class="label label-info">${unreadCount}</span>${chatdto.chatTime}</div>`;
                } else {
                    str += `        <div class="pull-right">${chatdto.chatTime}</div>`;
                }
                str += `    </td>`;
                str += `</tr>`;
            }
            u.innerHTML += str;

            const boxTable = document.getElementById("boxTable");
            boxTable.scrollTop = boxTable.scrollHeight;
        } else {
            u.innerText = "메시지가 없습니다.";
        }
        // getUnread2(currentUserID);
    } catch (error) {
        console.log(error);
    }
}
