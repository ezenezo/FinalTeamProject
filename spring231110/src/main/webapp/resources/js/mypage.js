//좋아요 리스트 가져오기
async function getHeartList(id) {
    try {
        const url = '/member/heart?id=' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//좋아요 뿌리기
function spreadHeartList(id) {
    getHeartList(id).then(result => {
        console.log(result);
        let html = document.getElementsByClassName('subMain')[0];
        html.innerHTML = '';
        if (result.length > 0) {
            for (let list of result) {
                let str = ``;
                str += `<div class="likeDiv"><div class="flex"><img alt="" src="/upload/${list.mainImg.saveDir}/${list.mainImg.uuid}_${list.mainImg.fileName}">`;
                str += `<div class="portfolioInfo"><div class="mainInfo"><h3>${list.pvo.title}</h3><span>${list.pvo.userNm} 업체</span></div>`;
                str += `<p>${list.pvo.homeStyle} / ${list.pvo.familyType}</p></div></div><i class="bi bi-heart-fill" data-id="${id}" data-pno="${list.pvo.pno}"></i></div>`;
                html.innerHTML += str;
            }
        }
    })
}

//쿠폰 리스트 가져오기
async function getCouponList(id) {
    try {
        const url = '/payment/couponList?id=' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//쿠폰 뿌리기
function spreadCouponList(id) {
    getCouponList(id).then(result => {
        console.log(result);
        let html = document.getElementsByClassName('subMain')[0];
        html.innerHTML = '';
        html.innerHTML += `<div class="tableBorder"></div><table class="tbl_col"><thead><tr><th class="cno">번호</th><th class="name">쿠폰명</th>
        <th class="discountAmount">할인금액(%)</th><th class="expire">제한일</th></tr></thead><tbody id="insert"></tbody></table>`;
        let count = 1;
        if (result.length > 0) {
            for (let list of result) {
                let str = ``;
                str += `<tr class="tr"><td>${list.couponNum}</td><td class="tal">${list.name}</td>`;
                if(list.percent>0){
                    str += `<td>${list.percent}%</td>`;
                }else{
                    str += `<td>${list.discount}원</td>`;
                }
                str += `<td>${list.expire}까지</td></tr>`;
                document.getElementById('insert').innerHTML += str;
                count += 1;
            }
        }
        html.innerHTML += `<div class="countCoupon">총 사용 가능한 쿠폰<p>${count}</p></div>`;
    })
}

//화면 클릭 메소드
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('bi-heart-fill')) {
        heartCancel(e.target.dataset.id, e.target.dataset.pno);
        e.target.classList.remove('bi-heart-fill');
        e.target.classList.add('bi-heart');
    } else if (e.target.classList.contains('bi-heart')) {
        heartAdd(e.target.dataset.id, e.target.dataset.pno);
        e.target.classList.remove('bi-heart');
        e.target.classList.add('bi-heart-fill');
    }
})

//좋아요 취소
async function heartCancel(id, pno) {
    try {
        const url = '/member/heartCancel/' + id + '/' + pno;
        const config = {
            method: 'post',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//좋아요 다시 추가
async function heartAdd(id, pno) {
    try {
        const url = '/member/heartAdd/' + id + '/' + pno;
        const config = {
            method: 'post',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}
