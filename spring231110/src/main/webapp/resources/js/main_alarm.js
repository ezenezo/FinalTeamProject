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



