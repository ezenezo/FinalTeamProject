
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

    let result_budget = document.getElementById('result_budget');


    const bud = document.getElementById('bud');

    var digits = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    var units = ['', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조', '천조'];
    console.log("bud는" + bud);
    if (bud != null) {

        bud.addEventListener('input', (event) => {
            console.log("여기에 들어오니");

            console.log("  convertBudget if문 진입 ");
            if (bud.value)
                var numStr = "" + bud.value;
            var numLen = numStr.length;

            result_budget.innerHTML = '';

            for (var i = 0; i < numLen; i++) {

                var digit = parseInt(numStr.charAt(i));
                console.log("여기는 digit입니다." + digit);
                var unit = units[numLen - i - 1];
                console.log("여기는 유닛입니다." + unit);
                if (i === numLen - 1 && digit === 1 && numLen !== 1) {
                    console.log("  convertBudget for문 에 if1 문 진입 ");
                    result_budget.innerHTML += '일';
                } else if (digit !== 0) {
                    console.log("  convertBudget for문 에 if2 문 진입 ");
                    result_budget.innerHTML += digits[digit] + unit;
                } else if (i === numLen - 5) {
                    console.log("  convertBudget for문 에 if3 문 진입 ");
                    result_budget.innerHTML += '만';
                }


            }

            if (numLen > 0) {
                result_budget.innerHTML += '원';

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



