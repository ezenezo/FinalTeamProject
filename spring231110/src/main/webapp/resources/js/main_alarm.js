const userId = document.getElementById("alarm_id").value;
const userRole = document.getElementById("userRole").value;

let alarm_count = 0;

const badge = document.getElementById("badge");

if (parseInt(alarm_count)) {
    badge.style.visibility = "visible";
} else {
    badge.style.visibility = "hidden";
}

console.log("여기 들어옴" + userId);
console.log("여기 들어옴" + userRole);

async function postDataToServer_al(url) {
    try {
        const config = {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
        };

        const resp = await fetch(url, config);

        if (resp.status === 500) {

            return;
        }

        const result = await resp.text();

        alarm_count = parseInt(result);

        if (alarm_count > 0) {
            badge.style.visibility = "visible";
        } else if (result == 0) {
            badge.style.visibility = "hidden";
        }
    } catch (err) {

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

        if (resp.status === 500) {

            return;
        }

        const result = await resp.text();

        alarm_count = parseInt(result);

        if (alarm_count > 0) {
            badge.style.visibility = "visible";
        } else if (result == 0) {
            badge.style.visibility = "hidden";
        }
    } catch (err) {

    }
}


// 특정 페이지인 경우 getInfiniteChat2 함수를 10분 지연 실행
if (currentPage.includes('localhost:8088/member/login') || currentPage.includes('aj2002.cafe24.com/member/login') || currentPage.includes('localhost:8088/index')) {
    setTimeout(function () {
        postDataToServer_al("/quotation/alarm/" + userId);
        postDataToServer_al("/quotation/alarm_user/" + userId);


        setTimeout(function () {
            window.location.href = "/req/main";
        }, 600000); // 10분 지연
    }, 5000000000000000000);
}

