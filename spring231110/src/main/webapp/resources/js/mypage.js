console.log("idVal>>{}",id);

//리뷰 리스트 가져오기
async function getReviewList(id) {
    try {
        const url = '/review/getReviewList/'+ id;
        const resp = await fetch(url);
        const result = await resp.json();
        console.log("result>>{}",result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//리뷰 뿌리기
function spreadReviewList(id) {
    getReviewList(id).then(result => {
        console.log(result);
        let html = document.getElementsByClassName('subMain')[0];
        html.innerHTML = '';
        if (result.length > 0) {
            let str = ``;
            for (let i = 0; i < result.length; i++) {
                let rdto = result[i];
                console.log("result[i]>>{}",result[i]);
                console.log("rdto.rvo.content>>{}",rdto.rvo.content);
                let content = rdto.rvo.content;
    
                content = content.replace(/<br>/g, ''); // <br> 태그 제거
                content = content.replace(/<p[^>]*>/g, ''); // <p> 태그 시작 부분 제거
                content = content.replace(/<\/p>/g, ''); // </p> 태그 제거
                content = content.replace(/<img[^>]*>/g, ''); // <img> 태그와 관련된 부분 제거
                content = content.replace(/\s+/g, ''); // 공백과 줄바꿈 제거
    
                // <p> 태그 사이의 줄바꿈 제거
                content = content.replace(/<\/p>\s*<p>/g, '</p><p>');
    
                console.log(content);
    
                str+=`<div class="review">`;
                str+=`<div class="rateStar">`;
                str+=`<div class="starmini">`;
                for (let j = 0; j < rdto.rvo.rate; j++) {
                    console.log("rdto.rvo.rate>>{}", rdto.rvo.rate);
                    str += `<svg style="width: 20px;
                    height: 20px;
                    flex: 0 0 auto;color: #f7f77e;" class="st2" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path class="st2"
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>`;
                }
                str+=`</div>`;
                str+=`<p style="margin-left: 40px;">업체 : ${rdto.rvo.comId}<span style="margin:0px 5px;color: rgb(234, 237, 239);">|</span> ${rdto.rvo.regDate}</p></div>`;
                str+=`<a href="/review/reviewDetail?rno=${rdto.rvo.rno}" style="width:100%;"><div class="review2col">`;
                str+=`<img class="reviewMainImg" src="/upload/${rdto.reviewMainImg.saveDir}/${rdto.reviewMainImg.saveDir.replace(/\\/g, '-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">`;
                str+=`<div class="reviewTitleBox">`;
                str+=`<p style="margin-left:10px;font-size: 18px;">${rdto.rvo.title}</p>`;
                str+=`<p style="width:590px; margin-left:10px; height: 100%; overflow: hidden;text-overflow: ellipsis;white-space: normal;
                word-wrap: break-word;
                display: -webkit-box;
                -webkit-line-clamp:1;
                -webkit-box-orient: vertical;font-weight:300">${content}</p>`;
                str+=`<div style="margin-top:5px;display: flex;
        justify-content: space-between;padding:0px 30px;" class="portfolioInfo2">`;
        str += `<p><span class="span1">주거형태</span><span class="span2">${rdto.rvo.form}</span></p>`;
        str += `<p><span class="span1">주거유형</span><span class="span2">${rdto.rvo.categoryType}</span></p>`;
        str += `<p><span class="span1">전용면적</span><span class="span2">${rdto.rvo.homeSize}</span></p></div>`;
      
                str+=`</div></div></div></a>`;
            
            }
            html.innerHTML += str;
        }
    })
}



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
                str += `<div class="likeDiv"><div class="flex"><img alt="" src="/upload/${list.mainImg.saveDir}/${list.mainImg.uuid}_th_${list.mainImg.fileName}">`;
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
        count = 0;
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
