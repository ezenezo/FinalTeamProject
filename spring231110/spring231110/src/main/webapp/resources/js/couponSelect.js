//쿠폰 기본값
var cno = -1;

//쿠폰 선택시 색 변화
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('coupon') && e.target.querySelector('span').id == 'none') {
        selectCancel();
        e.target.classList.remove('first');
        e.target.classList.add('green');
        e.target.querySelector('span').removeAttribute('id');
        //할인금액 반영
        console.log(document.getElementsByClassName('won')[0].dataset.price);
        document.getElementById('discount').dataset.price = e.target.querySelector('.won').dataset.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //최종금액
        document.getElementById('finalPrice').dataset.finalPrice = (document.getElementById('budget').dataset.budget - document.getElementById('discount').dataset.price.replace(/,/g, "")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        document.getElementById('finalPrice').innerText = '';
        //쿠폰번호값 넘기기
        document.getElementById('couponNum').value = e.target.dataset.index;
    } else if (e.target.closest('.coupon') != null && e.target.closest('.coupon').querySelector('span').id == 'none' && e.target.closest('.coupon').classList.contains('coupon')) {
        selectCancel();
        e.target.closest('.coupon').classList.remove('first');
        e.target.closest('.coupon').classList.add('green');
        e.target.closest('.coupon').querySelector('span').removeAttribute('id');
        //할인금액 반영
        console.log(document.getElementsByClassName('won')[0].dataset.price);
        document.getElementById('discount').dataset.price = e.target.closest('.coupon').querySelector('.won').dataset.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //최종금액
        document.getElementById('finalPrice').dataset.finalPrice = (document.getElementById('budget').dataset.budget - document.getElementById('discount').dataset.price.replace(/,/g, "")).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        document.getElementById('finalPrice').innerText = '';
        //쿠폰번호값 넘기기
        document.getElementById('couponNum').value = e.target.closest('.coupon').dataset.index;
    }   
})

//모든 선택 해제
function selectCancel() {
    var list = document.querySelector('#couponList').querySelectorAll('.coupon');
    for (i = 0; i < list.length; i++) {
        if (list[i].classList.contains('green')) {
            list[i].classList.remove('green');
            list[i].classList.add('first');
            list[i].querySelector('span').id = 'none';
        }
    }
}

//쿠폰 팝업 닫기
document.getElementById('closeBtn').addEventListener('click', () => {
    var cno = document.getElementById('couponNum').value;
    var pno = document.getElementById('pno').value;
    var qno = document.getElementById('qno').value;
    var finalPrice = document.getElementById('finalPrice').value;
    var id = document.getElementById('id').value;
    window.opener.location = "/payment/orderResult?cno="+cno+"&pno="+pno+"&qno="+qno+"&id="+id;
    window.close();
})