
let unreadMessages = {}; // 전역 변수로 사용자별 안 읽은 메시지 수 저장

// 현재 로그인한 사용자 ID를 전역 변수로 저장
let currentUserID = document.getElementById("chatName").value; //프린시펄 username부터 input으로 넘어온값

const chatName = document.getElementById("chatName").value;

// URL에서 toID 값을 가져오기
const urlParams = new URLSearchParams(window.location.search);
const toID = urlParams.get("toID"); // 'toID' 파라미터의 값을 가져옵니다.
// const toID = document.getElementById("toID").value;
const chatData = {
    fromID: chatName, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
    toID: toID,
    chatContent: "",
};

// 읽지 않은 메시지 관련 함수
async function getUnread1(currentUserID) {
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

        // updateBadgeVisibility(result); // DOM 업데이트 함수 호출

        if (result >= 1) {
            showUnread(result);
        } else {
            // showUnread("총 안읽은 글개수 파악불가");
        }

        // 서버에 안 읽은 메시지 수를 세션에 저장하도록 요청
        // await fetch('chaturl/updateUnreadCount', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ unreadCount: result })
        // });
    } catch (error) {
        console.log(error);
    }
}
// function updateBadgeVisibility(unreadCount) {
//     const badgeElement = document.getElementById("badge");
//     if (badgeElement) {
//         if (unreadCount > 0) {
//             badgeElement.style.display = 'inline'; // 빨간점 보이기
//         } else {
//             badgeElement.style.display = 'none'; // 빨간점 숨기기
//         }
//     }
// }

// 각 사원별 읽지 않은 메시지 관련 함수
async function getUnread2(currentUserID) {
    try {
        const url = "/chaturl/chatUnread2";
        const chatData = { toID: currentUserID }; //이렇게 해야 컨트롤러가 인식하기 시작함 //ChatDTO형식의 변수(db컬럼명)개념으로 인식하기 시작
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
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
    } catch (error) {
        console.log(error);
    }
}

function showUnread(result) {
    // $("#unread").html(result);
    document.getElementById("unread").innerHTML = result;
}
// function showUnread2(result) {
//     // $("#unread").html(result);

//     result.forEach((item) => {

//         document.querySelectorAll(".targClass").forEach((element) => {

//             // 여기서 chatData.fromID와 비교하는 로직을 수행
//             if (item.fromID == element.textContent) {
//                     "item.toID == element.textContent진입후 item.toID 는 ",
//                     item.toID
//                 );
//                     "item.fromID ==element.textContent진입후 item.count 는 ",
//                     item.count
//                 );
//                 document.getElementById("unread2").innerHTML = item.count;
//             }
//         });
//     });
// }

// function showUnread2(result) {
//     const unreadContainer = document.getElementById("unreadContainer"); // 이 컨테이너는 모든 사용자별 안읽은 메시지를 표시하기 위한 곳입니다.
//     unreadContainer.innerHTML = ""; // 기존 내용을 초기화

//     result.forEach((item) => {
//         // 각 사용자별 안 읽은 메시지 수를 표시할 div 생성

//         const userUnreadDiv = document.createElement("div");
//         userUnreadDiv.id = "unread_" + item.fromID; // 각 사용자별 고유 ID 부여
//         userUnreadDiv.innerText = `${item.fromID}로부터의 안 읽은 메시지 수: ${item.count}`;
//         unreadContainer.appendChild(userUnreadDiv);
//     });

// }

function getInfiniteChat() {
    setInterval(function () {
        // printChatList(chatData);
        chatBoxFunction(currentUserID);
        getUnread1(currentUserID);
        getUnread2(currentUserID);
    }, 3950000);
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
            chatBoxFunction(currentUserID);
            getUnread1(currentUserID);
            getUnread2(currentUserID);
            getInfiniteChat();
        }, 6000000); // 100분 지연
    } else {
        chatBoxFunction(currentUserID);
        getUnread1(currentUserID);
        getUnread2(currentUserID);
        getInfiniteChat();
    }
});

// 누가누가 나한테 메시지 보냈나 //내가 아직 확인 못한 메시지 확인용

async function chatBoxFunction(currentUserID) {
    try {

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
            for (let chatdto of result) {
                //let name1;
                let unreadCount = unreadMessages[chatdto.fromID] || 0; // 안 읽은 메시지 수

                let defaultImageUrl = "/resources/img/profile_none.png"; // 기본 이미지 경로

                // 시간 형식 변경
                let chatTime = new Date(chatdto.chatTime);
                let formattedDate = chatTime.toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });
                let userIdToShow;
                if (chatdto.fromID == currentUserID) {
                    userIdToShow = chatdto.toID;
                } else {
                    userIdToShow = chatdto.fromID;
                }

                // userIdToShow를 기반으로 사진 URL 설정
                let imgurl = await getProfileImageUrlpost(userIdToShow);
                let profileImageUrl2 = "http://localhost:8088/upload/" + imgurl;
                //let profileImageUrl2 ="http://aj2002.cafe24.com/_javaweb/_java/fileUpload/" + imgurl; //카페24배포용webapps

                let chatLink =
                    chatdto.fromID == currentUserID
                        ? `chat2?toID=${chatdto.toID}&fromID=${currentUserID}`
                        : `chat2?toID=${chatdto.fromID}&fromID=${currentUserID}`;

                str += `<tr onclick="location.href='${chatLink}'" style="color: white;">`;
                str += `    <td style="width: 40px; height: 40px;">`;
                /////////////////////////////////////////////////////////////
                str += `<img id="icon1" class="media-object img-circle" src="${profileImageUrl2}" onerror="this.onerror=null; this.src='${defaultImageUrl}'" alt="">`;
                //////////////////////////////////////////////////////////////
                // str += `        <span id="icon1" class="material-symbols-outlined">person</span>`; // 사람 아이콘
                str += `    </td>`;
                str += `    <td style="width: 370px;">`;
                str += `        <div class="smallmesbox">`;

                if (chatdto.fromID == currentUserID) {
                    str += `        <h5 class='targClass'>${chatdto.toID}&nbsp;</h5>`;
                } else {
                    str += `        <h5 class='targClass'>${chatdto.fromID}&nbsp;</h5>`;
                }

                if (unreadCount != 0) {
                    str += `   <div><span id="unread2" class="label label-info">  ${unreadCount}</span></div>`;
                }
                str += `        </div>`;
                str += `        <p style="height: 30px; width: 400px; display: flex; margin: 0px 0px 0px 7px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${chatdto.chatContent}</p>`; // 채팅 내용
                str += `    </td>`;
                str += `    <td style="text-align: center;">`; // 날짜 및 알림
                str += `        ${formattedDate}`;
                // if (unreadCount != 0) {
                //     str += `        <span id="unread2" class="label label-info">${unreadCount}</span>${formattedDate}`;
                // } else {
                //     str += `        ${formattedDate}`;
                // }
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

// 사용자 ID에 따라 프로필 이미지 URL을 반환하는 함수 (GET 방식)
// async function getProfileImageUrlget(userId) {
//     try {
//         const response = await fetch(`/getProfileImage?userId=${userId}`);
//         if (!response.ok) {
//             throw new Error("Network response was not ok.");
//         }
//         const data = await response.json();
//         return data.imageUrl; // 서버에서 'imageUrl' 필드로 이미지 경로를 보내준다고 가정
//     } catch (error) {
//         return "/resources/img/profile_none.png"; // 에러 발생시 기본 이미지
//     }
// }

// 사용자 ID에 따라 프로필 이미지 URL을 반환하는 함수 (POST 방식)
async function getProfileImageUrlpost(userId) {
    try {
        const response = await fetch("/chaturl/getProfileImagepost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ toID: userId }),
        });
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const imageUrl = await response.text(); // 응답을 텍스트로 받음
        return imageUrl; // 서버에서 직접 문자열로 이미지 경로를 반환
    } catch (error) {
        return "/resources/img/profile_none.png"; // 에러 발생시 기본 이미지
    }
}