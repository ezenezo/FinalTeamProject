//input값 제한
var max = document.getElementById('point').dataset.max;
max = Number(max);
var price = document.getElementById('finalPrice').dataset.price;
price = Number(price);
document.getElementById('point').addEventListener('input', (e)=>{
    if(/\D/.test(e.target.value)){
        e.target.value = e.target.value.replace(/\D/g, '');
        alert('숫자만 입력가능합니다.');
    }
    if(e.target.value == ""){
    	e.target.value = 0;
    }
    //최종가격 포인트 제한
    if(e.target.value > price){
    	e.target.value = price-1;
    	alert((price-1)+'까지만 사용 가능합니다.');
    }
    //포인트 최대 제한
    else if(e.target.value > max){
        e.target.value = max;
        alert(max+'까지만 사용 가능합니다.');
    }
    //오른쪽 포인트 할인 가격 변경
    document.getElementById('pointDiscount').innerText = `-${e.target.value}원`;
    //최종가격 변경
    document.getElementById('finalPrice').dataset.price = price - e.target.value;
    let p = (price - e.target.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('finalPrice').innerText = `${p}원`;
    //결제예정 최종금액 변경
    document.querySelector('.final').querySelector('.finalPrice').innerText = `${p}원`;
});


//전액사용 버튼
document.getElementById('allUseBtn').addEventListener('click', (e)=>{
	if(max != 0 && price>0 && max>price){
		document.getElementById('point').value = price;
		let p = max.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		//오른쪽 포인트 할인 가격 변경
    	document.getElementById('pointDiscount').innerText = `-${p}원`;
    	//최종가격 변경
    	document.getElementById('finalPrice').dataset.price = 0;
    	//결제예정 최종금액 변경
    	document.querySelector('.final').querySelector('.finalPrice').innerText = `0원`;
	}else if(max != 0 && price>0 && max<price){
		document.getElementById('point').value = max;	
		let p = max.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		//오른쪽 포인트 할인 가격 변경
    	document.getElementById('pointDiscount').innerText = `-${p}원`;
    	//최종가격 변경
    	document.getElementById('finalPrice').dataset.price = price - max;
    	let ppp = (price - max).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	document.getElementById('finalPrice').innerText = `${ppp}원`;
    	//결제예정 최종금액 변경
    	let pp = (price - max).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    	document.querySelector('.final').querySelector('.finalPrice').innerText = `${pp}원`;
	}
})