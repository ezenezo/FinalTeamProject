




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
var ul = document.querySelector('.gride_qvo');
setInterval(function() {
  var firstChild = ul.firstElementChild;
  ul.appendChild(firstChild);
}, 2000);