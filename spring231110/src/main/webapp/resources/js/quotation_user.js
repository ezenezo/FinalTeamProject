




let quNm = document.getElementById('quotationNm').value;



console.log(quNm);
function cancel_btn() {


    Swal.fire({
        title: '견적서를 거절하시면 다시 복구할 수 없습니다.',
        // text: "다른 페이지로 이동하면 다시 복구시킬 수 없습니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '거절',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.isConfirmed) {
            quotationNmServer();
            Swal.fire({
                title: '견적서가 취소되었습니다.',

                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });

            setTimeout(function () {
                window.location.reload(true);
            }, 2100);
        }
    });

}




async function quotationNmServer() {
    try {
        const url = '/quotation/quotation_user_cancle';
        const config = {
            method: 'put',
            body: JSON.stringify({
                quotationNm: document.getElementById('quotationNm').value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (err) {
        console.log(err);
    }
}


let requestNm = document.getElementById('requestNm').value;
let quotationNm = document.getElementById('quotationNm').value;
let payment = document.getElementById('payment').value;
let requestId = document.getElementById('requestId').value;
let authEmail = document.getElementById('authEmail').value;
let completed = document.getElementById('completed').value;
let quotation_cancel = document.getElementById('quotationCancel').value;
let request_cancel = document.getElementById('requestCancel').value;
let pno = document.getElementById('pno').value;
let refund = document.getElementById('refund').value;
console.log("payment" + payment);
let nav = document.querySelector('.nav');


if (payment == 'true') {
    if (refund == 'true') {

        nav.innerHTML = '';
        nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex; color:orange">환불된 견적서입니다.</li>`
        nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex;"><a href="/req/request_detil?requestNm=${requestNm}"><span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;">request_page</span>나의 요청서보기</a></li>`
        nav.innerHTML += `<li class="nav_li"  id="icon_id"><a href="/quotation/list_user?id=${requestId}"><span class="material-symbols-outlined"  style="margin-right: 10px;"> restore_page </span>나의 요청함보기</a></li>`;

    }

    else {


        if (completed == 'true') {
            nav.innerHTML = '';
            nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex; color:green">시공이 완료된 견적서입니다.</li>`
            nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex;"><a href="/req/request_detil?requestNm=${requestNm}"><span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;">request_page</span>나의 요청서보기</a></li>`

            nav.innerHTML += `<li class="nav_li"  id="icon_id"><a href="/quotation/list_user?id=${requestId}"><span class="material-symbols-outlined"  style="margin-right: 10px;"> restore_page </span>나의 요청함보기</a></li>`;


        } else {

            nav.innerHTML = '';

            nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex;"><a href="/req/request_detil?requestNm=${requestNm}"><span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;">request_page</span>나의 요청서보기</a></li>`

            nav.innerHTML += `<li class="nav_li"  id="icon_id"><a href="/quotation/list_user?id=${requestId}"><span class="material-symbols-outlined"  style="margin-right: 10px;"> restore_page </span>나의 요청함보기</a></li>`;

            nav.innerHTML += `<li class="nav_li" id="icon_id">
            <a href="javascript:void(0);" onclick="cancelPay('${authEmail}', ${quotationNm})">
                <span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;">cancel</span>
                환불받기
            </a>
        </li>`;

        }

    }

}

else {



    nav.innerHTML = '';
    nav.innerHTML += `<li class="nav_li"  id="icon_id"><a href="/quotation/list_user?id=${requestId}"><span class="material-symbols-outlined"  style="margin-right: 10px;"> restore_page </span>나의 요청함보기</a></li>`;
    nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex;"><a href="/req/request_detil?requestNm=${requestNm}"><span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;">request_page</span>나의 요청서보기</a></li>`
    nav.innerHTML += `<li class="nav_li"  id="icon_id"><a href="/payment/checkPay?pno=${pno}&qno=${quotationNm}&id=${authEmail}"><span class="material-symbols-outlined"  style="margin-right: 10px;">credit_card</span>결제하기</a></li>`;

    nav.innerHTML += `<li class="nav_li" id="icon_id"><a href="javascript:void(0);" onclick="cancel_btn()"><span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;" id="icon_id">cancel</span>거래 거절하기</a></li>`



    if (quotation_cancel == 'true') {

        nav.innerHTML = '';
        nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex; color:orange">고객님께서 거절한 견적서입니다.</li>`
        nav.innerHTML += `<li class="nav_li"  id="icon_id" style="display: flex;"><a href="/req/request_detil?requestNm=${requestNm}"><span class="material-symbols-outlined" id="icon_id" style="margin-right: 10px;">request_page</span>나의 요청서보기</a></li>`
        nav.innerHTML += `<li class="nav_li"  id="icon_id"><a href="/quotation/list_user?id=${requestId}"><span class="material-symbols-outlined"  style="margin-right: 10px;"> restore_page </span>나의 요청함보기</a></li>`;

    }

}