




let quNm = document.getElementById('quotationNm').value;
console.log(quNm);
<<<<<<< HEAD
function cancel_btn() {


=======
function cancel_btn(quotationNm) {
>>>>>>> b966bafc157ce2891b208444bc840799ad24fbd4
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
<<<<<<< HEAD
            quotationNmServer();
=======
            var url = "/quotation/quotation_user_cancle?quotationNm=" + quotationNm;

            window.location.replace(url);
>>>>>>> b966bafc157ce2891b208444bc840799ad24fbd4
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
