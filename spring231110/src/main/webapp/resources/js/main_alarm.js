const userId = document.getElementById("alarm_id").value;
const userRole = document.getElementById("userRole").value;
const currentPage = window.location.href;
let alarm_count = 0;

const badge = document.getElementById("badge");

if (parseInt(alarm_count)) {
    badge.style.visibility = "visible";
} else {
    badge.style.visibility = "hidden";
}

console.log("여기 들어옴" + userId);
console.log("여기 들어옴" + userRole);
window.onload = function () {
    if (userRole == "ROLE_COM") {
        postDataToServer_al("/quotation/alarm/" + userId);

    } else {
        postDataToServer_al("/quotation/alarm_user/" + userId);

    }


};

if (userRole == "ROLE_COM") {
    intervalId = setInterval(function () {
        postDataToServer_al("/quotation/alarm/" + userId);
    }, 3100);
} else {
    intervalId = setInterval(function () {
        postDataToServer_al("/quotation/alarm_user/" + userId);
    }, 3100);
}


async function postDataToServer_al(url) {
    try {
        const config = {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
        };

        const resp = await fetch(url, config);
        const result = await resp.text();

        alarm_count = parseInt(result);
        console.log("제발 들어와" + result);

        if (alarm_count > 0) {
            badge.style.visibility = "visible";

        } else if (result == 0) {
            badge.style.visibility = "hidden";
        }
    } catch (err) {
        console.log(err);
    }
}



async function postDataToServer_al_user(url) {
    try {
        const config = {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
        };

        const resp = await fetch(url, config);
        const result = await resp.text();

        alarm_count = parseInt(result);
        console.log("제발 들어와" + result);

        if (alarm_count > 0) {
            badge.style.visibility = "visible";
        } else if (result == 0) {
            badge.style.visibility = "hidden";
        }
    } catch (err) {
        console.log(err);
    }
}


// 특정 페이지인 경우 getInfiniteChat2 함수를 10분 지연 실행
if (currentPage.includes('localhost:8088/member/login') || currentPage.includes('aj2002.cafe24.com/member/login')) {
    setTimeout(function () {
        postDataToServer_al("/quotation/alarm/" + userId);
        postDataToServer_al("/quotation/alarm_user/" + userId);
    }, 600000); // 10분 지연
} 
