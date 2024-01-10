async function allReviewList(page) {
    console.log("들어오는지확인3");
    try {
        const url = '/review/allReviewListMore/' + page;
        const resp = await fetch(url);
        const result = resp.json();
        console.log("리뷰 result>>{}", result);
        return result;
    } catch (error) {
        console.log(error);
    }
}


function reviewPrint(page = 1) {
    console.log("들어오는지확인1");

    allReviewList(page).then(result => {
        console.log("들어오는지확인2");
        console.log("result>>{}이거확인", result); //result 는 PagingHandler ph(pgvo, totalCount, rdtoList)
        let reviewContainer = document.querySelector('.box2');
        if (result.rdtoList.length > 0) {
            //다시 댓글을 뿌릴 때 기존 값 삭제 1page 경우
            if (page == 1) {
                reviewContainer.innerHTML = `<p class="totalCountP">총 <span>${result.totalCount}</span>개의 고개 후기</p>`;
            }

            let str = ``;
            for (let i = 0; i < result.rdtoList.length; i++) {
                let rdto = result.rdtoList[i];
                let content = rdto.rvo.content;

                content = content.replace(/<br>/g, ''); // <br> 태그 제거
                content = content.replace(/<p[^>]*>/g, ''); // <p> 태그 시작 부분 제거
                content = content.replace(/<\/p>/g, ''); // </p> 태그 제거
                content = content.replace(/<img[^>]*>/g, ''); // <img> 태그와 관련된 부분 제거
                content = content.replace(/\s+/g, ''); // 공백과 줄바꿈 제거

                // <p> 태그 사이의 줄바꿈 제거
                content = content.replace(/<\/p>\s*<p>/g, '</p><p>');

                console.log(content);

                str+=`<a href="/review/reviewDetail?rno=${rdto.rvo.rno}">`;
                str += `<div class="review">`;
                str += `<img class="reviewMainImg" style="width: 235px;
            height: 175px;
            border-radius: 15px;" src="/upload/${rdto.reviewMainImg.saveDir}/${rdto.reviewMainImg.saveDir.replace(/\\/g, '-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">`;
                str += `<div class="reviewTitleBox">`;
                str += `<div class="starmini">`;
                for (let j = 0; j < rdto.rvo.rate; j++) {
                    console.log("rdto.rvo.rate>>{}", rdto.rvo.rate);
                    str += `<svg style="width: 20px;margin-top:3px;
                height: 20px;
                flex: 0 0 auto;color: #f7f77e;" class="st2" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path class="st2"
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
                }
                str += `</div><p class="idBox">${rdto.rvo.id}<span style="margin:0px 5px;color: rgb(234, 237, 239);">|</span> ${rdto.rvo.regDate}</p>`;
                str += `<p class="title" style="font-size: 18px;">${rdto.rvo.title}</p>`;
                str += `<p class="content">${content}</p>`;
                str += `<div class="portfolioInfo">`;
                str += `<p><span class="span1">주거형태</span><span class="span2">${rdto.rvo.form}</span></p>`;
                str += `<p><span class="span1">주거유형</span><span class="span2">${rdto.rvo.categoryType}</span></p>`;
                str += `<p><span class="span1">전용면적</span><span class="span2">${rdto.rvo.homeSize}</span></p></div>`;
                str += ``;
               
                str += `</div></div></div></a>`;
            }
            reviewContainer.innerHTML += str;

            //댓글 페이징 코드
            let moreBtn = document.getElementById('moreBtn');
            console.log(moreBtn, result.pgvo.pageNo, result.endPage);
            //db에서 pgvo + list 같이 가져와야 값을 줄 수 있음.
            if (result.pgvo.pageNo < result.endPage) {
                moreBtn.style.visibility = 'visible'; //버튼 표시
                moreBtn.dataset.page = page + 1;
            } else {
                moreBtn.style.visibility = 'hidden'; //버튼 숨김
            }

        }

    })

}

document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('moreBtn')){
        reviewPrint(parseInt(e.target.dataset.page));
    }
})