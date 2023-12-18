const userId = document.getElementById("alarm_id").value;
       const currentPage = window.location.href;
let alarm_count = 0;
const badge = document.getElementById("badge");

if (parseInt(alarm_count)) {
    badge.style.visibility = "visible";
} else {
    badge.style.visibility = "hidden";
}

console.log("여기 들어옴" + userId);

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
