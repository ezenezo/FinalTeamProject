console.log("find.js진입");

let currentUserID = document.getElementById("chatName").value; //프린시펄 username부터 input으로 넘어온값
let let_toID;
// const toID = urlParams.get("toID"); // 'toID' 파라미터의 값을 가져옵니다.
let chatData = {
    fromID: currentUserID, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
    toID: "",
    chatContent: "",
};

//호출해서 등록
document.getElementById("findFcBtn").addEventListener("click", () => {
    console.log("findFcBtn 리스너 진입");
    adjustEmpListHeight(); //사원명단나오는칸 높이줄임

    // 현재 로그인한 사용자 ID를 전역 변수로 저장
    // let currentUserID = document.getElementById("username").value;
    // let empNm = document.getElementById("empNm").value;
    // console.log("empNm은 " + empNm);

    const findID = document.getElementById("findID").value;
    // console.log("1 " + document.getElementById("chatContent").value);
    // const chatName = document.getElementById("chatName").value;
    // console.log("2 " + document.getElementById("chatName").value);
    chatData = {
        // bno: bnoVal,
        toID: findID,
        // chatContent: chatContent, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
    };
    console.log("3 ", chatData);
    postComment(chatData).then((result) => {
        console.log("8번째 ", result);
        if (result.length > 0) {
            // alert("친구 ID가 조회는 됨");
        } else {
            alert("친구 조회 실패");
        }

        // printCommentList(bnoVal);
        //전체 채팅글 출력
        printChatFriendList(chatData);
        // document.getElementById("chatContent").value = "";
        // document.getElementById("chatContent").focus();
    });
});

// 보내는 함수
async function postComment(chatData) {
    try {
        console.log("4는 ", chatData);
        const url = "/chaturl/find";
        const config = {
            method: "post",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(chatData),
        };
        console.log("5는 ", config);
        const resp = await fetch(url, config);
        // const result = await resp.text(); //isOk
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//사원id 검색 리스트 출력 함수
function printChatFriendList(printchatData) {
    // spreadChatListFromServer(chatData).then((result) => {
    postComment(printchatData).then((result) => {
        //한번더 같은 함수 씀 이번엔 안에 데이터까지 확인하려고
        console.log("printChatFriendList 출력함수 진입");

        const ul = document.getElementById("friendResult");
        console.log("result는 ", result);
        console.log("printChatFriendList의 result.length는 ", result.length);
        //console.log("result.chatList는 " , result.chatList);
        //console.log("result.chatList.length는 " , result.chatList.length);
        if (result.length > 0) {
            //대소문자 꼭 맞춰야함 위 아래
            let_toID = result[0].id;
            chatData = {
                // bno: bnoVal,
                toID: result[0].id,
                // chatContent: chatContent, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
            };

            ul.innerText = "";
            let str = "";
            for (let chatdto of result) {
                // let name1;
                // if (chatdto.fromID == currentUserID) {
                //     name1 = "나";
                // } else {
                //     name1 = chatdto.fromID;
                // }

                // str += `<thead>`;
                // str += `<tr>`;
                // str += `<th><h5 style="color: black; margin: 2px; width:70px">검색결과</h5></th>`;
                // str += `</tr>`;
                // str += `</head>`;
                // str += `<tbody>`;
                // str += `<tr>`;
                // str += `<td style="text-align: center;">`;
                str += `<div style="display: flex; align-items: left;">`;
                str += `<h5 style="color: black; margin: 2px; width:60px">검색결과</h5>`; //변경추가
                str += `<h5 style="margin: 2px; width:30px"> ${chatdto.id} </h5><br>`;
                str += `</div>`; // 새로운 div 종료
                str += `<div>`; // 버튼을 위한 새로운 div 시작
                // str += `<a href="/chaturl/chat2?toID=${chatdto.id}&fromID=${currentUserID}" class="btn btn-primary" style="padding:1px; height:25px;">`;
                str += `<div id = "chatstartbtn" class="btn btn-primary" style="padding:1px; height:25px;">채팅시작<div>`;
                // str += `채팅시작`;
                str += `</div>`;
                str += `</div>`;
                // str += `</td>`;
                // str += `</tr>`;
                // str += `</tbody>`;

                //     <tbody>
                // 	<c:forEach items="${list }" var="bvo">
                // 		<tr>

                // 			<th><a href="/board/detail?bno=${bvo.bno}">${bvo.bno }</a></th>
                // 			<td><a href="/board/detail?bno=${bvo.bno}">${bvo.writer }</a></td>
                // 			<td><a href="/board/detail?bno=${bvo.bno}">${bvo.title }</a></td>
                // 			<td><a href="/board/detail?bno=${bvo.bno}">${bvo.readCount }</a></td>
                // 			<td><a href="/board/detail?bno=${bvo.bno}">${bvo.cmtQty }</a></td>
                // 			<td><a href="/board/detail?bno=${bvo.bno}">${bvo.hasFile }</a></td>

                // 		</tr>
                // 	</c:forEach>
                // </tbody>
            }
            ul.innerHTML += str;

            // const chatList = document.getElementById("chatList");
            // chatList.scrollTop = chatList.scrollHeight;
        } else {
            ul.innerText = "없습니다.";
        }
    });
}

// 요청 함수
async function spreadChatListFromServer(chatData) {
    try {
        const url = "/chaturl/find";
        const resp = await fetch(url);
        const result = await resp.json(); //리스트 받음
        console.log("spreadChatListFromServer result는 ", result);
        return result;
    } catch (error) {
        console.log("에러진입");
        console.log(error);
    }
}

// function getInfiniteChat() {
//     setInterval(function () {
//         printChatList();
//     }, 2500);
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//     getInfiniteChat();
// });

function getInfiniteChat() {
    setInterval(function () {
        console.log("getInfiniteChat setInterval의 chatData ", chatData);
        printChatList(chatData);
    }, 3000);

    setInterval(function () {
        getUnread(currentUserID);
    }, 4000);
}

// 읽지 안은 메시지 관련 함수
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

document.addEventListener("DOMContentLoaded", (event) => {
    // 페이지가 완전히 로드된 후 currentUserID 값을 설정
    currentUserID = document.getElementById("chatName").value;
    console.log(
        "//페이지가 완전히 로드된 후 currentUserID 값을 다시 설정한 값은 " +
            currentUserID
    );
    getInfiniteChat();
    getUnread(currentUserID);
    printEmpList();
});

//23-11-22추가
//사원 리스트 출력 함수
function printEmpList() {
    //파라미터가 필요는 없을듯
    spreadEmpListFromServer().then((result) => {
        console.log("printEmpList 출력함수 진입");

        const empList = document.getElementById("empList");
        console.log("printEmpList의 result는 ", result);
        console.log(
            "spreadEmpListFromServer의 result.length는 ",
            result.length
        );
        //console.log("result.chatList는 " , result.chatList);
        //console.log("result.chatList.length는 " , result.chatList.length);
        if (result.length > 0) {
            //대소문자 꼭 맞춰야함 위 아래

            //다시 댓글을 뿌릴 때 기존 값 삭제 1page 경우
            // if (page == 1) {
            //     ul.innerText = "";
            // }
            empList.innerText = "";
            let str = "";
            for (let emp of result) {
                let name1;
                if (emp.id == currentUserID) {
                    // name1 = "나";
                    name1 = emp.id;
                } else {
                    name1 = emp.id;
                }

                // str += `<div class="row">`;
                // str += `<div class="col-lg-12">`;
                // str += `<div class="media" >`;
                // str += `<div><a class="pull-left" href="#">`;
                // str += `<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt="">`;

                // str += `<span class="media-heading">`;
                // str += `사원아이디: ${name1}  <span class="small pull-rigth style="left-right: 30px;">사원이름:  ${emp.empNm}</span>`;
                // str += `</span>`;

                // str += `</a></div>`;
                // str += `<div class="media-body" style="float: center">`;

                // str += `<div style="text-align: left;">생년월일 ${emp.empBirth}</div>`;
                // str += `</div>`;
                // str += `</div>`;
                // str += `</div>`;
                // str += `</div>`;

                str += `<div class="row" style="width:95%; height:10%; margin-left:10px">`;
                str += `  <div class="col-lg-12" style="width:95%;">`;
                str += `    <div class="media" style="width:95%; display: flex; align-items: center;">`;
                str += `      <div style="flex-shrink: 0;">`;
                str += `        <a href="/chaturl/chat2?toID=${emp.id}&fromID=${currentUserID}" class="pull-left">`;
                str += `          <img class="media-object img-circle" style="width: 30px; height: 30px;" src="/resources/img/anoyicon.png" alt="">`;
                str += `        </a>`;
                str += `      </div>`;

                str += `      <div style="flex-grow: 1; padding-left: 10px;">`;
                str += `        <div>`;
                str += `          <a href="/chaturl/chat2?toID=${emp.id}&fromID=${currentUserID}" class="pull-left"><span class="media-heading">ID: ${emp.id} </span></a>`;
                str += `        </div>`;
                str += `        <div style="text-align: left;">`;
                str += `          <span class="small"><br> 이름: ${emp.empNm} </span><br>`;
                str += `          <span class="small" style="margin-left: 0px;"> 생년월일 ${emp.empBirth}</span>`;
                str += `        </div>`;
                str += `      </div>`;
                str += `    </div>`;
                str += `  </div>`;
                str += `</div>`;
            }
            empList.innerHTML += str;

            // empList.scrollTop = empList.scrollHeight;
            empList.scrollTop = 0;

            //str += `</ul>`;

            // //댓글 페이징 코드
            // let moreBtn = document.getElementById('moreBtn');
            // console.log(moreBtn, result.pgvo.pageNo, result.endPage);
            // //db에서 pgvo + list 같이 가져와야 값을 줄 수 있음.
            // if (result.pgvo.pageNo < result.endPage) {
            //     moreBtn.style.visibility = 'visible'; //버튼 표시
            //     moreBtn.dataset.page = page + 1;
            // } else {
            //     moreBtn.style.visibility = 'hidden'; //버튼 숨김
            // }
        } else {
            empList.innerText = "내용이 없습니다.";
        }
    });
}

//모든 사원리스트 요청 함수
async function spreadEmpListFromServer() {
    try {
        const url = "/chaturl/selectAllMemberforChat/";
        const config = {
            method: "get",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(),
        };
        const resp = await fetch(url, config);
        const result = await resp.json(); //리스트 받음
        // const result = await resp.text(); //리스트 받음
        console.log("spreadEmpListFromServer의 result는 ", result);
        return result;
    } catch (error) {
        console.log("에러진입");
        console.log(error);
    }
}

// 검색 버튼 클릭 시 empList의 높이 변경
function adjustEmpListHeight() {
    var empList = document.getElementById("empList");
    empList.style.height = "500px";
}
// 검색 버튼 이벤트 리스너 추가
// document.getElementById('findFcBtn').addEventListener('click', adjustEmpListHeight);

//우측에 채팅내용 출력 함수
function printChatList(chatData) {
    spreadChatListFromServer2(chatData).then((result) => {
        console.log("printChatList 출력함수 진입");

        const ul = document.getElementById("chatList2");
        console.log("printChatList 의 result는 ", result);
        console.log("result.length는 ", result.length);
        //console.log("result.chatList는 " , result.chatList);
        //console.log("result.chatList.length는 " , result.chatList.length);
        if (result.length > 0) {
            //대소문자 꼭 맞춰야함 위 아래

            ul.innerText = "";
            let str = "";
            for (let chatdto of result) {
                let name1;
                if (chatdto.fromID == currentUserID) {
                    name1 = "나";
                } else {
                    name1 = chatdto.fromID;
                }

                str += `<div class="row">`;
                str += `<div class="col-lg-12">`;
                str += `<div class="media" >`;
                str += `<div><a class="pull-left" href="#">`;
                str += `<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt="">`;

                str += `<span class="media-heading">`;
                str += `${name1}  <span class="small pull-rigth style="left-right: 30px;">  ${chatdto.chatTime}</span>`;
                str += `</span>`;

                str += `</a></div>`;
                str += `<div class="media-body" style="float: center">`;

                str += `<div style="text-align: left;">${chatdto.chatContent}</div>`;
                str += `</div>`;
                str += `</div>`;
                str += `</div>`;
                str += `</div>`;
            }
            ul.innerHTML += str;

            const chatList = document.getElementById("chatList2");
            chatList.scrollTop = chatList.scrollHeight;

            //str += `</ul>`;

            // //댓글 페이징 코드
            // let moreBtn = document.getElementById('moreBtn');
            // console.log(moreBtn, result.pgvo.pageNo, result.endPage);
            // //db에서 pgvo + list 같이 가져와야 값을 줄 수 있음.
            // if (result.pgvo.pageNo < result.endPage) {
            //     moreBtn.style.visibility = 'visible'; //버튼 표시
            //     moreBtn.dataset.page = page + 1;
            // } else {
            //     moreBtn.style.visibility = 'hidden'; //버튼 숨김
            // }
        } else {
            ul.innerText = "글이 없습니다.";
        }
    });
}

//채팅글 요청 함수
async function spreadChatListFromServer2(chatData) {
    try {
        console.log("spreadChatListFromServer2의 chatData는 ", chatData);
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
        console.log("spreadChatListFromServer2의 result는 ", result);
        return result;
    } catch (error) {
        console.log("에러진입");
        console.log(error);
    }
}

//이벤트 위임은 상위 요소에 이벤트 리스너를 추가하고,
//이벤트가 발생했을 때 타겟 요소가 관심 대상인지 확인하는 방법
// 동적으로 생성되는 요소에도 효과적
document.body.addEventListener("click", function (e) {
    if (e.target && e.target.id === "chatstartbtn") {
        // 여기에 'chatstartbtn' 클릭 시의 로직을 작성하세요.
        //우측 채팅시작함수 등록
        // document
        //     .getElementById("chatstartbtn")
        //     .addEventListener("click", () => {
        console.log("chatstartbtn 리스너 진입");
        adjustEmpListHeight(); //사원명단나오는칸 높이줄임

        // const findID = document.getElementById("findID").value;

        chatData = {
            fromID: currentUserID,
            toID: let_toID,
            // chatContent: chatContent, //여기 왼쪽 단어가 중요함 디비 컬럼이랑 맞춰야함
        };
        console.log("chatstartbtn의 chatData ", chatData);
        postComment(chatData).then((result) => {
            console.log("8번째 ", result);
            if (result.length > 0) {
                // alert("chatstartbtn의 '친구 ID가' 조회는 됨");
            } else {
                alert("chatstartbtn의 '친구 조회' 실패");
            }

            // printCommentList(bnoVal);
            //전체 채팅글 출력
            printChatList(chatData);
            // document.getElementById("chatContent").value = "";
            // document.getElementById("chatContent").focus();
        });
        // });
    }
});
// document.body.addEventListener("click", function (e) {
//     if (e.target && e.target.id === "chatstartbtn") {
//         // 여기에 'chatstartbtn' 클릭 시의 로직을 작성하세요.
//         console.log("chatstartbtn 리스너 진입");
//         adjustEmpListHeight(); //사원명단나오는칸 높이줄임
//         // 기타 로직...
//     }
// });
