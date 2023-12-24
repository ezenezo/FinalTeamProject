//merchant_uid 생성용
var today = new Date();
var hours = today.getHours(); // 시
var minutes = today.getMinutes();  // 분
var seconds = today.getSeconds();  // 초
var milliseconds = today.getMilliseconds();
var makeMerchantUid = hours + minutes + seconds + milliseconds;

//결제방법
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pg')) {
        document.getElementsByClassName('payTitle')[0].dataset.pg = e.target.value;
    }
})

//일반결제
function requestPay(id, quotationNm, couponNum) {
    //결제가격
    var price = document.getElementById('finalPrice').dataset.price;
    //구매자 이름
    var name = document.getElementsByClassName('userNm')[0].dataset.name;
    //사용 포인트
    var point = document.getElementById('point').value;
    //결제요청
    IMP.request_pay({
        pg: document.getElementsByClassName('payTitle')[0].dataset.pg,
        pay_method: 'card',
        merchant_uid: "IMP" + makeMerchantUid,
        name: '결제테스트',
        amount: price,
        buyer_name: name
    }, function (rsp) { // callback
        if (rsp.success) { //결제 성공시
            //결제 성공시 DB저장 요청
            console.log(rsp);
            let data = {
                pg: document.getElementsByClassName('payTitle')[0].dataset.pg,
                payMethod: rsp.pay_method,
                merchantUid: rsp.merchant_uid,
                amount: price,
                userName: name,
                name: '결제테스트',
                userId: id,
                quotationNm: quotationNm,
                couponNum: couponNum,
                point: point
            };
            console.log(data);
            insertPay(data).then(result => {
                if (result == 1) {// DB저장 성공시
                    location.href = "/payment/alert?id=" + id;
                } else { // 결제완료 후 DB저장 실패시
                    alert('db저장 실패');
                }
            })
        } else {
            console.log(rsp);
            alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
        }
    });
}

//쿠폰 팝업
function popup(id, pno, quotationNm) {
    window.open("/payment/couponSelect?id=" + id + "&pno=" + pno + "&quotationNm=" + quotationNm, "쿠폰", "width=500, height=700, top=150, left=200");
}

//쿠폰 리스트 가져오기
async function getCoupon(id) {
    try {
        const url = '/payment/couponList?id=' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//결제 정보 저장
async function insertPay(data) {
    try {
        const url = '/payment/insertPay';
        const config = {
            method: 'post',
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//환불요청
function cancelPay(id, quotationNm) {
    getPayment(quotationNm).then(result => {
        console.log(result.merchantUid);
        if (result.merchantUid == null) {
            Swal.fire({
                icon: "error",
                text: "결제 내역이 존재하지 않습니다."
            });
            return;
        }
        jQuery.ajax({
            "url": "/payment/refund?id=" + id, // 예: http://www.myservice.com/payments/cancel
            "type": "POST",
            "contentType": "application/json",
            "data": JSON.stringify({
                "merchantUid": result.merchantUid, // 주문번호
                "cancel_request_amount": result.amount, // 환불금액
                "reason": "테스트 결제 환불", // 환불사유
                "refund_holder": "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
                "refund_bank": "88", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
                "refund_account": "56211105948400" // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
            }),
            "dataType": "json"
        });
        Swal.fire({
            icon: "success",
            text: "환불이 완료되었습니다."
        });
    });
};

//결제 정보 가져오기
async function getPayment(quotationNm) {
    try {
        const url = '/payment/getPayment?quotationNm=' + quotationNm;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}