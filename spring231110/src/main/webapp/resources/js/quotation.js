
console.log("들어옴");

 convertBudget();
 
 
 
    $(document).ready(function () {
        $('#counter').html("<div style='color:#ff7631' class='sc-7683fa06-0 kTtyyx'>0</div> / <div style='color:#7a7a7c' class='sc-7683fa06-0 kTtyyx'>200자</div>");

        $('#comment').on('input', function () {
            var content = $(this).val();
            $('#counter').html("<div style='color:#ff7631' class='sc-7683fa06-0 kTtyyx'>" + content.length + "</div> / <div style='color:#7a7a7c' class='sc-7683fa06-0 kTtyyx'>200자</div>");

            if (content.length > 200) {
                $(this).val(content.substring(0, 200));
                $('#counter').html("<div style='color:#ff7631' class='sc-7683fa06-0 kTtyyx'>200</div> / <div style='color:#7a7a7c' class='sc-7683fa06-0 kTtyyx'>200자</div>");
            }
        });
    });
    
    
    function convertBudget() {

        const result_budget = document.getElementById('result_budget');
        const bud = document.getElementById('bud');
    
        if (bud != null) {
            bud.addEventListener('input', (event) => {
                if (bud.value) {
                    const numberUnits = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
                    const tenUnits = ["", "십", "백", "천"];
                    const thousandUnits = ["", "만", "억", "조", "경", "해"];
    
        
                    function chunkAtEnd(value = "", n = 1) {
                      const result = [];
    
                      for (let end = value.length; end > 0; end -= n) {
                        result.push(value.substring(Math.max(0, end - n), end));
                      }
    
                      return result;
                    }
    
                    let number = bud.value;
                    let chunks = chunkAtEnd(number, 4);
                    let answer = '';
    
                    chunks.forEach((chunk, chunkIndex) => {
                      let result = '';
                      [...chunk].reverse().forEach((digit, index) => {
                        let numberUnit = numberUnits[digit];
                        if (digit !== '0') numberUnit += tenUnits[index];
                        result = numberUnit + result;
                      });
                      if (result !== '') answer = result + thousandUnits[chunkIndex] + answer;
                    });
    
                    result_budget.innerHTML = answer + '원';
                }
            });
        }
    }
    

window.onload = function () {
    convertBudget();
};


var commentInput = document.getElementById('comment');
let counter =document.getElementById('counter');
commentInput.addEventListener('input', function() {
counter.style.visibility='visible';
});

document.querySelector('.form').addEventListener("submit", (e) => {
    console.log("Form submitted");

    let bud = document.getElementById('bud').value;
    console.log("Value of bud:", bud);

    if (bud === 'false' || bud === "") {
        console.log("Condition not met. Preventing form submission.");

        Swal.fire({
            icon: 'warning',
            title: '예산은 계약서에서 필요 작성 요소입니다.',
        }).then(() => {
          
        });

        e.preventDefault();
    } else {
            e.preventDefault();
        Swal.fire({
            title: '견적서를 고객님께 전달하겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#11a441a8',
            cancelButtonColor: 'rgb(108 86 86)',
            confirmButtonText: '전송',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '고객님께 성공적으로 <br>견적서가 전송되었습니다.',
                    icon:"success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                     document.querySelector('form').submit();
                }, 2100);
            }
        });

    

    }
});
