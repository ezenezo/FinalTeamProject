console.log("chat2.js진입");

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
    console.log("chatSubmitBtn 리스너 진입");
    const chatContent = document.getElementById("chatContent").value;
    chatData = {
        fromID: chatName, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함 //위의 내용 사라지고 다시 덮어쓰는듯
        toID: toID,
        chatContent: chatContent,
    };

    console.log("3 ", chatData);
    postComment(chatData).then((result) => {
        console.log("8 ", result);
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
        console.log("4는 ", chatData);
        const url = "/chaturl/chat2";
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        console.log("5는 ", config);
        const resp = await fetch(url, config);
        const result = await resp.json();
        // const result = await resp.text(); //isOk
        return result;
    } catch (error) {
        console.log(error);
    }
}

//채팅 리스트 출력 함수
function printChatList(chatData) {
    spreadChatListFromServer(chatData).then((result) => {
        console.log("printChatList 출력함수 진입");

        const ul = document.getElementById("chatList2");
        console.log("printChatListd의 result는 ", result);
        console.log("result.length는 " + result.length);
        //console.log("result.chatList는 " , result.chatList);
        //console.log("result.chatList.length는 " , result.chatList.length);
        if (result.length > 0) {
            //대소문자 꼭 맞춰야함 위 아래

            ul.innerText = "";
            let str = "";
            for (let chatdto of result) {
                let messageClass;
                let name1;
                let profileImageUrl;
                let defaultImageUrl = "/resources/img/profile_none.png"; // 기본 이미지 경로

                // filevo가 존재하면 정상적인 이미지 경로를, 그렇지 않으면 기본 이미지 경로를 사용
                if (chatdto.filevo) {
                    profileImageUrl = "http://localhost:8088/upload/" +
                    //"http://aj2002.cafe24.com/_javaweb/_java/fileUpload/" + //카페24배포용webapps
                        chatdto.filevo.saveDir + "/" +
                        chatdto.filevo.uuid + "_" +
                        chatdto.filevo.fileName;
                } else {
                    profileImageUrl = defaultImageUrl;
                }


                // let profileImageUrl =
                //     "http://localhost:8088/upload/" + //로컬용
                //     //"http://aj2002.cafe24.com/_javaweb/_java/fileUpload/" + //카페24배포용webapps
                //     chatdto.filevo.saveDir +
                //     "/" +
                //     chatdto.filevo.uuid +
                //     "_" +
                //     chatdto.filevo.fileName;
                // let defaultImageUrl = "/resources/img/anoyicon.png"; // 기본 이미지 경로

                console.log("profileImageUrl는" + profileImageUrl);
                console.log("defaultImageUrl는" + defaultImageUrl);
                

                let str = `<div class="row">`;

                // 시간 포맷 변경 (예: '15:30')
                let formattedTime = new Date(
                    chatdto.chatTime
                ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                if (chatdto.fromID == currentUserID) {
                    messageClass = "my-message";
                    name1 = "나";
                    str += `<div class="col-lg-12 ${messageClass}">`;
                    str += `<div class="media">`;
                    str += `<div class="message-time-left">${formattedTime}</div>`;
                    str += `<div class="message-content">${chatdto.chatContent}</div>`;
                    str += `</div>`; // media 닫기
                    str += `</div>`; // col-lg-12 닫기
                } else {
                    // 상대방 메시지일 때의 레이아웃
                    messageClass = "other-message";
                    name1 = chatdto.fromID;
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
            chatList.scrollTop = chatList.scrollHeight;
        } else {
            ul.innerText = "글이 없습니다.";
        }
    });
}

//채팅글 요청 함수
async function spreadChatListFromServer(chatData) {
    try {
        console.log("spreadChatListFromServer의 chatData는 ", chatData);
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
        console.log("spreadChatListFromServer의 result는 ", result);
        return result;
    } catch (error) {
        console.log("에러진입");
        console.log(error);
    }
}

// 읽지 않은 메시지 관련 함수
async function getUnread(currentUserID) {
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
        console.log("안읽은 글 개수는 " + result);
        if (result >= 1) {
            showUnread(result);
        } else {
            showUnread("");
        }
        console.log(" getUnread(currentUserID) 정상동작완료");
    } catch (error) {
        console.log(error);
    }
}

function showUnread(result) {
    console.log("showUnread(result)함수 진입 " + result);
    // $("#unread").html(result);
    document.getElementById("unread").innerHTML = result;
    console.log("showUnread(result)함수 탈출 " + result);
}

function getInfiniteChat() {
    setInterval(function () {
        printChatList(chatData);
        getUnread(currentUserID);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", (event) => {
    printChatList(chatData);
    getInfiniteChat();
    getUnread(currentUserID);
});
