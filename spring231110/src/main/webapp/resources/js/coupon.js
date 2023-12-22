//쿠폰 받기 버튼
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('couponBtn')) {
        let coupon = e.target.closest('.coupon').querySelector('.couponImg').id;
        addCoupon(coupon);
    }
})

//선택한 쿠폰 내쿠폰으로 추가
function addCoupon(coupon) {
    if (coupon == 'img1') {
        let data = {
            couponNum: 5
        };
        postCoupon(data).then(result => {
        	if (result == 1) {// DB저장 성공시
            	Swal.fire({
           			icon: "success",
            		text: "쿠폰 받기 성공!"
          		});
             } else { // 결제완료 후 DB저장 실패시
             	Swal.fire({
           			icon: "error",
            		text: "이미 받은 쿠폰입니다."
          		});
             }
		});
    }
    else if (coupon == 'img2') {
        let data = {
            couponNum: 6
        };
        postCoupon(data).then(result => {
        	if (result == 1) {// DB저장 성공시
            	Swal.fire({
           			icon: "success",
            		text: "쿠폰 받기 성공!"
          		});
             } else { // 결제완료 후 DB저장 실패시
             	Swal.fire({
           			icon: "error",
            		text: "이미 받은 쿠폰입니다."
          		});
             }
		});
    }
    else if (coupon == 'img3') {
        let data = {
            couponNum: 7
        };
        postCoupon(data).then(result => {
        	if (result == 1) {// DB저장 성공시
            	Swal.fire({
           			icon: "success",
            		text: "쿠폰 받기 성공!"
          		});
             } else { // 결제완료 후 DB저장 실패시
             	Swal.fire({
           			icon: "error",
            		text: "이미 받은 쿠폰입니다."
          		});
             }
		});
    }else if (coupon == 'img4' || coupon == 'img5' || coupon == 'img6' || coupon == 'img7' || coupon == 'img8' || coupon == 'img9'){
        Swal.fire({
            icon: "error",
            text: "사용기한이 만료된 쿠폰입니다."
          });
    }

}

async function postCoupon(data, id) {
	var id = document.getElementById('id').value;
    try {
        const url = '/payment/insertCoupon?id='+id;
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