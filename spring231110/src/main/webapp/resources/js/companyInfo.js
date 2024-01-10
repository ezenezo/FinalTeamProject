console.log("js들어오긴하냐")

document.addEventListener('click', (e) => {
    let topBtn1 = document.querySelector('.topBtn1');
    let topBtn2 = document.querySelector('.topBtn2');
    let topBtn3 = document.querySelector('.topBtn3');

    if (e.target.classList.contains('topBtn1')) {
        topBtn1.classList.add('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.remove('clicked');
    } else if (e.target.classList.contains('topBtn2')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.add('clicked');
        topBtn3.classList.remove('clicked');
    } else if (e.target.classList.contains('topBtn3')) {
        topBtn1.classList.remove('clicked');
        topBtn2.classList.remove('clicked');
        topBtn3.classList.add('clicked');
    }else if(e.target.classList.contains('moreBtn')){
        reviewPrint(comId, parseInt(e.target.dataset.page));

    }
});

let averageRate = document.getElementById("averageRate").value;
let averageRate2 = (averageRate / 5) * 100;

function starRate() {
    let star2 = document.querySelector('.Star2');
    star2.style.width = `${averageRate2}%`;
    console.log(averageRate2+"%");

}

// 함수 호출
starRate();
// -------------------------------
async function companyInfoReviewData(id,page) {
    console.log("들어오는지확인3");
    try {
        const url = '/review/printListCompanyInfo/'+id + '/' + page;
        const resp = await fetch(url);
        const result = resp.json();
        console.log("리뷰 result>>{}", result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

function reviewPrint(id,page = 1) {
    console.log("들어오는지확인1");
    let reviewContainer = document.querySelector('.reviewBottom');

    companyInfoReviewData(id,page).then(result => {
        console.log("들어오는지확인2");
        console.log("result>>{}이거확인",result); //result 는 PagingHandler ph(pgvo, totalCount, rdtoList)
        if (result.rdtoList.length > 0) {
             //다시 댓글을 뿌릴 때 기존 값 삭제 1page 경우
             if (page == 1) {
                reviewContainer.innerText = "";
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

            str+=`<div style="margin-bottom:30px;"class="review">`;
            str+=`<div class="rateStar">`;
            str+=`<div class="starmini" style="width:270px;">`;
            for (let j = 0; j < rdto.rvo.rate; j++) {
                console.log("rdto.rvo.rate>>{}", rdto.rvo.rate);
                str += `<svg style="width: 20px;padding:16px 0;
                height: 20px;
                flex: 0 0 auto;color: #f7f77e;" class="st2" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path class="st2"
                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>`;
            }
            str+=`</div>`;
            str+=`<p style="padding-left:40px;">${rdto.rvo.id}<span style="margin:0px 5px;color: rgb(234, 237, 239);">|</span> ${rdto.rvo.regDate}</p></div>`;
            str+=`<a href="/review/reviewDetail?rno=${rdto.rvo.rno}" style="width:100%;"><div class="review2col">`;
            str+=`<img class="reviewMainImg" style="width: 270px;
            height: 106px;
            border-radius: 15px;" src="/upload/${rdto.reviewMainImg.saveDir}/${rdto.reviewMainImg.saveDir.replace(/\\/g, '-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">`;
            str+=`<div class="reviewTitleBox">`;
            str+=`<p style="margin-left:10px;font-size: 18px;">${rdto.rvo.title}</p>`;
            str+=`<p style="width:590px; margin-left:10px; height: 100%; overflow: hidden;text-overflow: ellipsis;white-space: normal;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;font-weight:300">${content}</p>`;
            str+=`<div style="margin-top:5px;display: flex;
	justify-content: space-between;padding:0px 30px;" class="portfolioInfo">`;
            str+=`<p><span class="span1">주거형태</span><span class="span2">주거형태</span></p>`;
            str+=`<p><span class="span1">주거형태</span><span class="span2">주거형태</span></p>`;
            str+=`<p><span class="span1">주거형태</span><span class="span2">주거형태</span></p></div>`;
            str+=`</div></div></div></a>`;
        
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


