
getCommentList();

  document.getElementById('gosu_btn').addEventListener('click', () => {
    Swal.fire({
        title: '작성하신 요청서가 사라집니다.',
        text: "다른 페이지로 이동하면 다시 복구시킬 수 없습니다.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '나가기',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.value) {
             window.localStorage.clear();
             window.location.href = 'req/main';
        }
    })
});


window.addEventListener('beforeunload', (event) => {


       window.localStorage.clear();
});
/*
window.addEventListener('beforeunload', (event) => {
    event.preventDefault();

    event.returnValue = '페이지를 떠나시겠습니까?';
       window.localStorage.clear();
});

*/

function checkboxChangeHandler1(subject, image) {
    const checkbox = document.getElementById("checkbox1-" + subject);

    if (checkbox.checked) {
        applyImageStyles(image);
    } else {
        resetImageStyles(image);
    }
}

function checkboxChangeHandler2(subject, image) {
    const checkbox = document.getElementById("checkbox2-" + subject);

    if (checkbox.checked) {
        applyImageStyles(image);
    } else {
        resetImageStyles(image);
    }
}


function applyImageStyles(image) {
    image.style.border = '4px solid rgb(80, 119, 113)';
    image.style.filter = "none";
    image.style.padding = '0px';
    console.log('Border Applied:', image.style.border);
    console.log('Filter Applied:', image.style.filter);
}

function resetImageStyles(image) {
    image.style.borderBottom = '0px';
    image.style.borderLeft = '0px';
    image.style.borderTop = '0px';
    image.style.borderRight = '0px';
    image.style.filter = "";
    image.style.padding = '';
    image.style.transition = 'filter 0.5s cubic-bezier(.43, .41, .22, .91)';
}

document.body.addEventListener('change', function (e) {
    const checkboxes = document.querySelectorAll('.myCheckbox');
    checkboxes.forEach(function (checkbox) {
        const subject = checkbox.id.slice(9);
        const image = document.getElementById("image-" + subject);
        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
        console.log('Checkbox ID:', checkbox.id);
        console.log('Subject:', subject);
        console.log('Image Element:', image);

        if (checkbox.checked) {
            image.style.border = '4px solid rgb(80, 119, 113)';
            image.style.filter = "none";
            image.style.padding = '0px';
            console.log('Border Applied:', image.style.border);
            console.log('Filter Applied:', image.style.filter);
        } else {
            image.style.borderBottom = '0px';
            image.style.borderLeft = '0px';
            image.style.borderTop = '0px';
            image.style.borderRight = '0px';
            image.style.filter = "";
            image.style.padding = '';
            image.style.transition = 'filter 0.5s cubic-bezier(.43, .41, .22, .91)';
        }
    });


});

document.body.addEventListener('change', function (e) {
    const checkboxes = document.querySelectorAll('.myCheckbox1');
    checkboxes.forEach(function (checkbox) {
        const subject = checkbox.id.slice(9);
        const image = document.getElementById("image-" + subject);
        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
        console.log('Checkbox ID:', checkbox.id);
        console.log('Subject:', subject);
        console.log('Image Element:', image);

        if (checkbox.checked) {
            image.style.border = '4px solid rgb(80, 119, 113)';
            image.style.filter = "none";
            image.style.padding = '0px';
            console.log('Border Applied:', image.style.border);
            console.log('Filter Applied:', image.style.filter);
        } else {
            image.style.borderBottom = '0px';
            image.style.borderLeft = '0px';
            image.style.borderTop = '0px';
            image.style.borderRight = '0px';
            image.style.filter = "";
            image.style.padding = '';
            image.style.transition = 'filter 0.5s cubic-bezier(.43, .41, .22, .91)';
        }
    });



});

document.body.addEventListener('change', function (e) {
    const checkboxes = document.querySelectorAll('.myCheckbox2');
    checkboxes.forEach(function (checkbox) {
        const subject = checkbox.id.slice(9);
        const image = document.getElementById("image-" + subject);
        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
        console.log('Checkbox ID:', checkbox.id);
        console.log('Subject:', subject);
        console.log('Image Element:', image);

        if (checkbox.checked) {
            image.style.border = '4px solid rgb(80, 119, 113)';
            image.style.filter = "none";
            image.style.padding = '0px';
            console.log('Border Applied:', image.style.border);
            console.log('Filter Applied:', image.style.filter);
        } else {
            image.style.borderBottom = '0px';
            image.style.borderLeft = '0px';
            image.style.borderTop = '0px';
            image.style.borderRight = '0px';
            image.style.filter = "";
            image.style.padding = '';
            image.style.transition = 'filter 0.5s cubic-bezier(.43, .41, .22, .91)';
        }
    });


});



function clickCheck(target) {
    const targetChecked = target.checked;
    const wasChecked = target.checked;
    document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
        checkbox.checked = false;
    });
    target.checked = targetChecked;
}
function clickCheck1(target) {
    const targetChecked = target.checked;
    const wasChecked = target.checked;
    document.querySelectorAll('.myCheckbox1').forEach((checkbox) => {
        checkbox.checked = false;
    });
    target.checked = targetChecked;

}
function clickCheck2(target) {
    const targetChecked = target.checked;
    const wasChecked = target.checked;
    document.querySelectorAll('.myCheckbox2').forEach((checkbox) => {
        checkbox.checked = false;
    });
    target.checked = targetChecked;
}


// 체크값을 저장하는 함수
function storeCheckedValues() {
    var checkedValues = [];
    document.querySelectorAll('.myCheckbox:checked').forEach(function (checkbox) {
        checkedValues.push(checkbox.value);
    });
    sessionStorage.setItem('checkedValues', JSON.stringify(checkedValues));
}

function storeCheckedValues_1() {
    var checkedValues = [];
    document.querySelectorAll('.myCheckbox:checked').forEach(function (checkbox) {
        checkedValues.push(checkbox.value);
    });
    sessionStorage.setItem('checkedValues_1', JSON.stringify(checkedValues));
}

function storeCheckedValues_2_1() {
    var checkedValues = [];
    document.querySelectorAll('.myCheckbox1:checked').forEach(function (checkbox) {
        checkedValues.push(checkbox.value);
    });
    sessionStorage.setItem('checkedValues_2_1', JSON.stringify(checkedValues));
}

function storeCheckedValues_2_2() {
    var checkedValues = [];
    document.querySelectorAll('.myCheckbox2:checked').forEach(function (checkbox) {
        checkedValues.push(checkbox.value);
    });
    sessionStorage.setItem('checkedValues_2_2', JSON.stringify(checkedValues));
}

// // 체크값을 불러오는 함수
// function loadCheckedValues() {
//     var checkedValues = JSON.parse(sessionStorage.getItem('checkedValues'));
//     if (checkedValues && checkedValues.length > 0) {
//         checkedValues.forEach(function(value) {
//             var checkbox = document.querySelector('.myCheckbox[value="' + value + '"]');
//             if (checkbox) checkbox.checked = true;
//         });
//     }
// }

// function loadCheckedValues_1() {
//     var checkedValues = JSON.parse(sessionStorage.getItem('checkedValues_1'));
//     if (checkedValues && checkedValues.length > 0) {
//         checkedValues.forEach(function(value) {
//             var checkbox = document.querySelector('.myCheckbox[value="' + value + '"]');
//             if (checkbox) checkbox.checked = true;
//         });
//     }
// }

// submit_btn 함수
async function submit_btn() {
    console.log("제발들어와라");
    var subjects = [];
    $('.myCheckbox:checked').each(function () {
        subjects.push($(this).val());
    });
    let checkedValue = null;
    document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValue = checkbox.value;
        }
    });

    if (checkedValue) {
        console.log('선택된 체크박스의 값2: ', checkedValue);
        await spreadCommentFromServer_1(checkedValue);
    
        store(checkedValue);
        storeCheckedValues();  // 체크값을 저장합니다.

        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
        console.log('제ㄹ: ', checkedValue);
    } else {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 선택해주세요.',
        }).then((result) => {
            if (result.isConfirmed) { }
        });
    }

    getCommentList_1(checkedValue);
}
async function submit_btn_2() {

    let checkedValue1 = '';
    let checkedValue2 = '';
    var subjects = [];
    $('.myCheckbox1:checked').each(function () {
        subjects.push($(this).val());
    });
    var subjects2 = [];
    $('.myCheckbox2:checked').each(function () {
        subjects2.push($(this).val());
    });

    document.querySelectorAll('.myCheckbox1').forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValue1 = checkbox.value;
        }
    });
    document.querySelectorAll('.myCheckbox2').forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValue2 = checkbox.value;
        }
    });
    console.log("체크된 마이박스" + checkedValue1);
    console.log("체크된 마이박스2" + checkedValue2);

    if (checkedValue1 != '' && checkedValue2 != '') {
        console.log('선택된 체크박스의 값1zz: ', checkedValue1);
        console.log('선택된 체크박스의 값2zz: ', checkedValue2);
        await spreadCommentFromServer_2(checkedValue1);
        await spreadCommentFromServer_2_2(checkedValue2);
        store_2_1(checkedValue1);
        store_2_2(checkedValue2);

        getCommentList_3();


    } else {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 선택해주세요.',
        }).then((result) => {
            if (result.isConfirmed) { }
        });
    }
}




async function submit_btn_1() {
    var subjects = [];
    $('.myCheckbox:checked').each(function () {
        subjects.push($(this).val());
    });
    let checkedValue = null;
    document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValue = checkbox.value;
        }
    });



    if (checkedValue) {
        console.log('선택된 체크박스의 값2: ', checkedValue);
        await spreadCommentFromServer_2(checkedValue);

        store_1(checkedValue);
        storeCheckedValues_1();

        getCommentList_2_1(checkedValue);

        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
        console.log('제ㄹ: ', checkedValue);
    } else {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 선택해주세요.',
        }).then((result) => {
            if (result.isConfirmed) { }
        });
    }
}

async function submit_btn_5_1() {
    var subjects = [];
    $('.myCheckboxNull:checked').each(function () {
        subjects.push($(this).val());
    });
    let checkedValue = null;
    document.querySelectorAll('.myCheckboxNull').forEach((checkbox) => {
        if (checkbox.checked) {
            checkedValue = checkbox.value;
        }
    });



    if (checkedValue) {
        console.log('선택된 체크박스의 값2: ', checkedValue);
        await spreadCommentFromServer_1(checkedValue);

        store_5_1(checkedValue);

        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
        console.log('제ㄹ: ', checkedValue);
    }
}

async function submit_btn_3() {


    var subjects = [];
    $('#sample6_postcode, #sample6_address, #sample6_detailAddress, #sample6_extraAddress').each(function () {
        subjects.push($(this).val());
    });


    console.log(subjects);
    let code = document.getElementById('sample6_postcode');
    let adress = document.getElementById('sample6_addres');
    if (subjects[0] != '' && subjects[1] != '') {
        console.log('선택된 체크박스의 값2: ', subjects);


        store_3(subjects);
        getCommentList_4();

    } else {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 작성해주세요.',
        }).then((result) => {
            if (result.isConfirmed) { }
        });
    }
}

async function submit_btn_4() {

    var subjects = [];
    $('#sample6_postcode, #sample6_address, #sample6_detailAddress').each(function () {
        subjects.push($(this).val());
    });



    console.log(subjects);


    if (subjects) {
        console.log('선택된 체크박스의 값2: ', subjects);


        store_3(subjects);




    } else {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 선택해주세요.',
        }).then((result) => {
            if (result.isConfirmed) { }
        });
    }
}
async function submit_btn_5() {

    var subjects = [];
    $('#leftInput, #rightInput, #bud, #comment').each(function () {
        subjects.push($(this).val());
    });



    console.log(subjects);

    let left = document.getElementById('leftInput').value;
    let right = document.getElementById('rightInput').value;
    let bud = document.getElementById('bud').value;
    if (left != '' && right != '' && bud != '') {
        if (subjects) {
            console.log('선택된 체크박스의 값2: ', subjects);


            store_4(subjects);




        } else {
            console.log('선택된 체크박스가 없습니다.');
            Swal.fire({
                icon: 'warning',
                title: '필수 항목을 선택해주세요.',
            }).then((result) => {
                if (result.isConfirmed) { }
            });
        }



        var subjects1 = [];
        $('.myCheckboxNull:checked').each(function () {
            subjects1.push($(this).val());
        });
        let checkedValue1 = null;
        document.querySelectorAll('.myCheckboxNull').forEach((checkbox) => {
            if (checkbox.checked) {
                checkedValue1 = checkbox.value;
            }
        });



        if (checkedValue1) {
            console.log('선택된 체크박스의 값2: ', checkedValue1);


            store_5_1(checkedValue1);

            const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
            console.log('제ㄹ: ', checkedValue1);
        } else {
            console.log('선택된 체크박스의 값2: ', checkedValue1);


            store_5_1('');

            const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
            console.log('제ㄹ: ', checkedValue1);
            final_req();
        }
    } else {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 작성해주세요.',
        }).then((result) => {
            if (result.isConfirmed) {

             getCommentList_4();
             }
        });
    }

   // sendDataToControllers();
  

}




async function postCommentToServer(choice) {
    try {
        const url = '/req/requestStart';
        const config = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(choice)
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}
async function spreadCommentFromServer_2_2(checkedValue) {
    console.log("체크값 가져오기" + checkedValue);
    try {
        const resp = await fetch('/req/req2_2/' + encodeURIComponent(checkedValue));
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function spreadCommentFromServer_2(checkedValue) {
    console.log("체크값 가져오기" + checkedValue);
    try {
        const resp = await fetch('/req/req2/' + encodeURIComponent(checkedValue));
        
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function spreadCommentFromServer_1(checkedValue) {
    console.log("체크값 가져오기" + checkedValue);
    try {
        const resp = await fetch('/req/' + encodeURIComponent(checkedValue));
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function spreadCommentFromServer_1_2(stringValue2) {
    console.log("체크값 가져오기" +stringValue2);
    try {
        const resp = await fetch('/req/' + encodeURIComponent(stringValue2));
        console.log("체크값 가져오기zzzzzzzzzzzz" +resp);
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}
async function getCommentList_2_1(checkedValue) {
    try {
        const result = await spreadCommentFromServer_2(checkedValue);

        const card_img = document.getElementById('card__image');
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        const choice_2 = document.getElementById('choice_2');
        const cards = document.getElementById('cards');
        const choice_3 = document.getElementById('choice_3');
        const choice_4 = document.getElementById('choice_4');
        choice_3.style = '';
        choice_4.style = '';
        mainmenu.style = '';
        form_choice.style = '';
        cards.style.display = 'block';
        choice_2.style.color = '#006400';


        if (result && result.length > 0) {
            cards.innerHTML = '<h2>원하시는 공사 범위를 선택해주세요.</h2><br><div class="box_card"></div>';

            result.forEach((rvo) => {

                let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
                li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}" style="height: 100px; line-height: 30px;">`;
                li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox1" name="subject"`;
                li += `  value="${rvo.subject}" id="checkbox-${rvo.subject}" onclick="clickCheck1(this)">`;
                li += `   </div> </div ></div> </label ></li >`;
                cards.querySelector('.box_card').innerHTML += li;
            });
            let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_2()">확인</button></div>';
            cards.innerHTML += btnBox;


            storeCheckedValues_2_1();
            await getCommentList_2_2();
            loadStoredOptions_2_1();



        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function final_req() {
    console.log("마지막 버튼 눌림");
    try {
        const card_img = document.getElementById('card__image');
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        const choice_2 = document.getElementById('choice_2');
        const choice_3 = document.getElementById('choice_3');
        const choice_4 = document.getElementById('choice_4');
        const cards = document.getElementById('cards');

        mainmenu.style = '';
        form_choice.style = '';
        cards.style.display = 'block';
        choice_2.style = '';
        choice_3.style.color = '';
        choice_4.style.color = '#006400';
        const hover_menu1 = document.getElementById('hover_menu1');
        const hover_menu2 = document.getElementById('hover_menu2');
        const hover_menu3 = document.getElementById('hover_menu3');
        const hover_menu4 = document.getElementById('hover_menu4');
        const hover_menu5 = document.getElementById('hover_menu5');
        hover_menu5.style.backgroundColor = 'rgb(245, 247, 250)';
        hover_menu1.style = '';
        hover_menu3.style = '';
        hover_menu2.style = '';
        hover_menu4.style = '';
        cards.innerHTML = '';

        
    var storedOptions = localStorage.getItem('selectedOptionsStore');
    var storedOptions_1 = localStorage.getItem('selectedOptionsStore_1');
    var latestOptions, latestOptions_1, latestOptions_2_1,latestOptions_2_2,latestOptions_3,latestOptions_4;
    if(storedOptions !== null) {
        var parsedOptions = JSON.parse(storedOptions);
        latestOptions = parsedOptions.slice(-1);
    } else {
        latestOptions = "필수항목을 입력해주세요.";
    }
    if(storedOptions_1 !== null){
        var parsedOptions_1 = JSON.parse(storedOptions_1);
        latestOptions_1 = parsedOptions_1.slice(-1);
    } else {
        latestOptions_1 = "필수항목을 입력해주세요.";
    }

    var storedOptions_2_1 = localStorage.getItem('selectedOptionsStore_2_1');
    if(storedOptions_2_1 !== null){
        var parsedOptions_2_1 = JSON.parse(storedOptions_2_1);
        latestOptions_2_1 = parsedOptions_2_1.slice(-1);
    } else {
        latestOptions_2_1 = "필수항목을 입력해주세요.";
    }


    var storedOptions_2_2 = localStorage.getItem('selectedOptionsStore_2_2');
    if(storedOptions_2_2 !== null){
        var parsedOptions_2_2 = JSON.parse(storedOptions_2_2);
        latestOptions_2_2 = parsedOptions_2_2.slice(-1);
    } else {
        latestOptions_2_2 = "필수항목을 입력해주세요.";
    }
    var storedOptions_3 = localStorage.getItem('selectedOptionsStore_3');
if (storedOptions_3 !== null) {
  var parsedOptions_3 = JSON.parse(storedOptions_3);
  var latestOptions_3 = [];
  if (parsedOptions_3.length >= 4) {
    latestOptions_3.push(parsedOptions_3[parsedOptions_3.length - 4]);
    latestOptions_3.push(parsedOptions_3[parsedOptions_3.length - 3]);
    latestOptions_3.push(parsedOptions_3[parsedOptions_3.length - 2]);
    latestOptions_3.push(parsedOptions_3[parsedOptions_3.length - 1]);
    console.log("zzzzzzz" + latestOptions_3);
  } 
} else {
    latestOptions_3 = ["필수항목을 입력해주세요.","필수항목을 입력해주세요.","공백(선택항목)","공백(선택항목)"];
}
    var storedOptions_4 = localStorage.getItem('selectedOptionsStore_4');
    if (storedOptions_4 !== null) {
      var parsedOptions_4 = JSON.parse(storedOptions_4);
      var latestOptions_4 = [];
      if (parsedOptions_4.length >= 4) {
        latestOptions_4.push(parsedOptions_4[parsedOptions_4.length - 4]);
        latestOptions_4.push(parsedOptions_4[parsedOptions_4.length - 3]);
        latestOptions_4.push(parsedOptions_4[parsedOptions_4.length - 2]);
        latestOptions_4.push(parsedOptions_4[parsedOptions_4.length - 1]);
        console.log("zzzzzzz"+latestOptions_4);
      }
        
      
    } else {
      latestOptions_4 = ["필수항목을 입력해주세요.","필수항목을 입력해주세요.","필수항목을 입력해주세요.","공백(선택항목)"];
    }



            let tr = '';
            
            tr += `<li id="li_final"><input value="${latestOptions}" id="form" readonly="readonly" name ="latestOptions"class="optionfinal"><button type="button" onclick="getCommentList()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_1}" id="categoryType" readonly="readonly" name ="latestOptions_1"class="optionfinal"><button type="button" onclick="handleClick()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_2_1}" id="rang" readonly="readonly"name ="latestOptions_2_1" class="optionfinal"><button type="button" onclick="getCommentList_2_1()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_2_2}" id="status" readonly="readonly" name ="latestOptions_2_2"class="optionfinal"><button type="button" onclick="getCommentList_2_1()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;

            tr += `<li id="li_final"><input value="${latestOptions_3[0]}" id="zoneCode" class="optionfinal" name ="latestOptions_3_1" readonly="readonly"><button type="button" onclick="getCommentList_3()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_3[1]}" id="adress" class="optionfinal" name ="latestOptions_3_2"readonly="readonly"><button type="button" onclick="getCommentList_3()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_3[2]}" id="detailAddress" readonly="readonly" name ="latestOptions_3_3"class=""><button type="button" onclick="getCommentList_3()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_3[3]}" id="extraAddress" readonly="readonly" name ="latestOptions_3_4"class=""><button type="button" onclick="getCommentList_3()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            
             tr += `<li id="li_final"><input value="${latestOptions_4[0]}" id="squareFootage" readonly="readonly" name ="latestOptions_4_1" class="optionfinal"><button type="button" onclick="getCommentList_4()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_4[1]}" id="squareMeter" readonly="readonly" name ="latestOptions_4_2"class="optionfinal"><button type="button" onclick="getCommentList_4()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_4[2]}" id="ishBudget" readonly="readonly"name ="latestOptions_4_3" class="optionfinal"><button type="button" onclick="getCommentList_4()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
            tr += `<li id="li_final"><input value="${latestOptions_4[3]}" id="requestOp"  readonly="readonly"name ="latestOptions_4_4"class=""><button type="button" onclick="getCommentList_4()"><span class="material-symbols-outlined" >contract_edit</span></button></li>`;
        
            cards.innerHTML += tr;

            let btnBox = '<div class="btn_box"><button type="submit" class="ok_btn" id="final_submit"  onsubmit="return final_submit()">확인</button></div>';
            cards.innerHTML += btnBox;
            unit();
            console.log("unit 다음");
            convertBudget();
            checkNumber_counter();


            let myCheckboxNull = document.getElementById('myCheckboxNull');
            let bud = document.getElementById('bud');
            let result_budget = document.getElementById('result_budget');

            if (myCheckboxNull && bud && result_budget) {
                myCheckboxNull.addEventListener('change', function () {
                    if (this.checked) {
                        bud.value = '협의결정';
                        bud.readOnly = true;
                        bud.style.backgroundColor = "#80808021";
                        result_budget.innerText = '협의 후 결정';
                    } else {
                        bud.value = '';
                        bud.readOnly = false;
                        bud.style.backgroundColor = "rgb(128 128 128 / 0%)";
                        result_budget.innerText = '';
                    }
                });
            } else {
                console.log('One or more elements could not be found.');
            }
        
    } catch (error) {
        console.error('An error occurred:', error);
    }

    loadStoredOptions_4();
    loadStoredOptions_5_1();
}

document.querySelector('form').addEventListener('submit', function (e) {
    try {
        // 조건 검사
        let optionValues = document.querySelectorAll('.optionfinal');

        let hasEmptyValue = false;

        optionValues.forEach(function (option) {
            if (option.value.trim() === "필수항목을 입력해주세요." || option.value.trim() === '') {
                hasEmptyValue = true;
                option.style.color = "red";
            }
        });

        if (hasEmptyValue) {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                title: '유형을 고르려면, <br> 공간을 먼저 골라주셔야 합니다.',
            });
            // 조건이 충족되지 않았으므로 제출을 중단합니다.
            return false;
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }

    return true; // 조건이 충족되었으면 폼을 제출하도록 true 반환
});

async function getCommentList_4(checkedValue) {
    try {
        const result = await spreadCommentFromServer_2(checkedValue);

        const card_img = document.getElementById('card__image');
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        const choice_2 = document.getElementById('choice_2');
        const choice_3 = document.getElementById('choice_3');
        const choice_4 = document.getElementById('choice_4');
        const cards = document.getElementById('cards');

        mainmenu.style = '';
        form_choice.style = '';
        cards.style.display = 'block';
        choice_2.style = '';
        choice_3.style.color = '';
        choice_4.style.color = '#006400';
        const hover_menu1 = document.getElementById('hover_menu1');
        const hover_menu2 = document.getElementById('hover_menu2');
        const hover_menu3 = document.getElementById('hover_menu3');
        const hover_menu4 = document.getElementById('hover_menu4');
        const hover_menu5 = document.getElementById('hover_menu5');
        hover_menu5.style.backgroundColor = 'rgb(245, 247, 250)';
        hover_menu1.style = '';
        hover_menu3.style = '';
        hover_menu2.style = '';
        hover_menu4.style = '';
        cards.innerHTML = '';

        let tr = '';
        tr += `<h2 class="main_sub">공간의 면적을 입력해주세요.</h2><br><div class="last_box"><div class="last_box_inner"><br><br>
            <div class="user_input"><input style="width: 200px;" id="leftInput" name="area" type="text" align="right" value=""  onkeypress='return checkNumber(event)' ></div>
            <div class="unit">평</div><span class="material-symbols-outlined">arrow_range</span>
            <div class="auto_input"><input style="width: 200px;" id="rightInput" type="text" align="right" value=""   onkeypress='return checkNumber(event)'></div>
            <div class="unit">㎡</div>
        </div></div>
        <h2 class="main_sub">희망하는 예산을 입력해주세요.</h2><br><div class="budget_box"><div class="budget_inner">
            <input style="width: 250px; margin-bottom: 0px !important;" id="bud" name="area"   maxlength="12" type="text" onkeypress='return checkNumber(event)'> <div color="#ff7631" class="sc-7683fa06-0 eAkweW" id="result_budget">영<div class="unit" id="unitId"></div>
            </div></div>
        
            <div class="unit_money">만원</div>
   
        </div>
        <label for="myCheckboxNull"><div class="exp_1">·협의 후 결정을 원하시면 클릭해주세요 <input type="checkbox" class="myCheckboxNull" name="subject" value="nullValue" id="myCheckboxNull" ></div>
       </div>
       </label>
          <div><h2 class="main_sub">추가 전달 내용을 적어주세요.<div class="sc-7683fa06-0 kuxWUg">(선택)</h2></div></div><div class="budget_box_cho"><div class="budget_inner_option">
       <textarea placeholder="원하시는 인테리어에 대한 상세설명이나 참고해야 할 사항이 있다면 작성해주세요. 사전 컨설팅 시 도움이 됩니다." maxlength="200" class="sc-1952d657-10 bTUUoF" id="comment"></textarea>
        </div>
       
        </div>
         <div class="sc-ef390a2d-0 donOnO" ><div color="#ff7631" class="sc-7683fa06-0 eAkweW">&nbsp;</div><div color="#7a7a7c" class="sc-7683fa06-0 kTtyyx" id="counter">/ 200자</div></div>
        `;

        cards.innerHTML += tr;

        let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_5()">확인</button></div>';
        cards.innerHTML += btnBox;
        unit();
        console.log("unit 다음");
        convertBudget();
        checkNumber_counter();


        let myCheckboxNull = document.getElementById('myCheckboxNull');
        let bud = document.getElementById('bud');
        let result_budget = document.getElementById('result_budget');

        myCheckboxNull.addEventListener('change', function () {

            
            if (this.checked) {
                bud.value = '협의결정';
                bud.readOnly = true;
                bud.style.backgroundColor = "#80808021";
                result_budget.innerText = '협의 후 결정';

            } else {
                bud.value = '';
                bud.readOnly = false;
                bud.style.backgroundColor = "rgb(128 128 128 / 0%)";
                result_budget.innerText = '';
            }
        });



    } catch (error) {
        console.error('An error occurred:', error);
    }

    loadStoredOptions_4();
    loadStoredOptions_5_1();

}


function checkNumber_counter(event) {
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
}


function checkNumber(event) {
    if (event.key === '.'
        || event.key === '-'
        || event.key >= 0 && event.key <= 9) {
        return true;
    }

    return false;
}
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


let leftInput;
let rightInput;

const calculateForLeft = () => {
    const inputValue = parseFloat(rightInput.value);
    if (!isNaN(inputValue)) {
        const convertedValue = (inputValue * 0.3025).toFixed(2);
        leftInput.value = convertedValue;
    } else {
        leftInput.value = "";
    }
};

const calculateForRight = () => {
    const inputValue = parseFloat(leftInput.value);
    if (!isNaN(inputValue)) {
        const convertedValue = (inputValue * 3.3057).toFixed(2);
        rightInput.value = convertedValue;
    } else {
        rightInput.value = "";
    }
};

function unit() {
    leftInput = document.getElementById("leftInput");
    rightInput = document.getElementById("rightInput");
    if (rightInput !== null) {
        rightInput.addEventListener("input", calculateForLeft);
    }
    
    if (leftInput !== null) {
        leftInput.addEventListener("input", calculateForRight);
    }
    
}
async function getCommentList_3(checkedValue) {
    try {
        const result = await spreadCommentFromServer_2(checkedValue);

        const card_img = document.getElementById('card__image');
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        const choice_2 = document.getElementById('choice_2');
        const choice_3 = document.getElementById('choice_3');
        const choice_4 = document.getElementById('choice_4');
        const cards = document.getElementById('cards');

        mainmenu.style = '';
        form_choice.style = '';
        cards.style.display = 'block';
        choice_2.style = '';
        choice_3.style.color = '#006400';
        choice_4.style = '';
        const hover_menu1 = document.getElementById('hover_menu1');
        const hover_menu2 = document.getElementById('hover_menu2');
        const hover_menu3 = document.getElementById('hover_menu3');
        const hover_menu4 = document.getElementById('hover_menu4');
        const hover_menu5 = document.getElementById('hover_menu5');
        hover_menu4.style.backgroundColor = 'rgb(245, 247, 250)';
        hover_menu1.style = '';
        hover_menu3.style = '';
        hover_menu2.style = '';
        hover_menu5.style = '';
        cards.innerHTML = '';


        let tr = '';
        tr += `<h2 class="main_sub">주소를  입력해주세요.</h2><br><br><div class="adress_api">
                <div class="address_box">  <input type="text" id="sample6_postcode" placeholder="우편번호" >
                  <input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"  class="address_btn"></div>
                  <input type="text" id="sample6_address" placeholder="주소">
                  <input type="text" id="sample6_detailAddress" placeholder="상세주소">
                 <input type="text" id="sample6_extraAddress" placeholder="참고항목">

                </div>`;
        tr += `<div class="exp">·정교한 견적을 제공하기 위해 공사 현장 실측이 필요할 수 있습니다.</div>`;
        cards.innerHTML += tr;


        // btn_box 추가
        let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_3()">확인</button></div>';
        cards.innerHTML += btnBox;
        loadStoredOptions_3();
        //storeCheckedValues_1();
    }
    catch (error) {
        console.error('An error occurred:', error);
    }

}
async function getCommentList_2_2(checkedValue) {
    const result = await spreadCommentFromServer_2_2(checkedValue);

    const card_img = document.getElementById('card__image');
    const mainmenu = document.getElementById('mainmenu_text');
    const form_choice = document.getElementById('form_choice');
    const choice_2 = document.getElementById('choice_2');
    const choice_3 = document.getElementById('choice_3');
    const choice_4 = document.getElementById('choice_4');
    const hover_menu1 = document.getElementById('hover_menu1');
    const hover_menu2 = document.getElementById('hover_menu2');
    const hover_menu3 = document.getElementById('hover_menu3');
    const hover_menu4 = document.getElementById('hover_menu4');
    const hover_menu5 = document.getElementById('hover_menu5');
    hover_menu3.style.backgroundColor = 'rgb(245, 247, 250)';
    hover_menu1.style = '';
    hover_menu4.style = '';
    hover_menu2.style = '';
    choice_3.style = '';
    choice_4.style = '';
    mainmenu.style = '';
    form_choice.style = '';
    hover_menu5.style = '';
    const cards = document.getElementById('cards');
    cards.style.gridTemplateColumns = 'repeat(3,0.5fr)';
    choice_2.style.color = '#006400';


    if (result && result.length > 0) {

        cards.innerHTML += '<h2>원하시는 공사 상태를 선택해주세요.</h2><br><div class="box_card2"></div>';

        result.forEach(rvo => {
            //  checkboxChangeHandler2();

            let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;

            li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}" style="height: 100px; line-height: 30px;">`;
            li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox2" name="subject"`;
            li += `  value="${rvo.subject}" id="checkbox-${rvo.subject}" onclick="clickCheck2(this)">`;
            li += `   </div> </div ></div> </label ></li >`;


            cards.querySelector('.box_card2').innerHTML += li;
        });


        let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_2()">확인</button></div>';
        cards.innerHTML += btnBox;


        storeCheckedValues_2_2();
        await loadStoredOptions_2_2();


    }
}

function getCommentList_1(checkedValue) {
    let checkedValue1 = '';
    var storedValue1 = localStorage.getItem('selectedOptionsStore');

    if (storedValue1) {
        checkedValue1 = storedValue1;
    }
    if (checkedValue1 === null || checkedValue1 === '') {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title: '유형을 고르려면, <br> 공간을 먼저 골라주셔야 합니다.',
        }).then((result) => {
            if (result.isConfirmed) {
                getCommentList();
            }
        });
        return; // 함수 종료
    }

    spreadCommentFromServer_1(checkedValue).then(result => {

        const cards = document.getElementById('cards');
        cards.style.gridTemplateColumns = 'repeat(4,0.5fr)';
        cards.style.gridTemplateRows = 'minmax(1px, 30px);';
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        const choice_2 = document.getElementById('choice_2');
        const choice_3 = document.getElementById('choice_3');
        const choice_4 = document.getElementById('choice_4');
        choice_3.style = '';
        choice_4.style = '';
        cards.style.display = 'grid';
        choice_2
        choice_2.style = '';
        mainmenu.style = '';
        form_choice.style = '';
        form_choice.style.color = '#006400';



        const hover_menu1 = document.getElementById('hover_menu1');
        const hover_menu2 = document.getElementById('hover_menu2');
        const hover_menu3 = document.getElementById('hover_menu3');
        const hover_menu4 = document.getElementById('hover_menu4');
        const hover_menu5 = document.getElementById('hover_menu5');   
        const card__image = document.querySelectorAll('.card__image');
        
        hover_menu2.style.backgroundColor = 'rgb(245, 247, 250)';
        hover_menu1.style = '';
        hover_menu3.style = '';
        hover_menu4.style = '';
        hover_menu5.style = '';
    
        card__image.style='';
        if (result && result.length > 0) {
            cards.innerHTML = '';
          
            result.forEach(rvo => {
                console.log("아니왜??"+result.length);
                if(checkedValue=='상업공간'){
                  
                    let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
                    li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}" style="height: 150px; !important" ></div>`;
                    li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
                    li += `  value = "${rvo.subject}" id = "checkbox-${rvo.subject}" onclick = "clickCheck(this)"  >`
                    li += `    </div ></div> </label ></li >`
                    cards.innerHTML += li;
                
                }else{
                let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
                li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}"></div>`;
                li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
                li += `  value = "${rvo.subject}" id = "checkbox-${rvo.subject}" onclick = "clickCheck(this)"  >`
                li += `    </div ></div> </label ></li >`
                cards.innerHTML += li;

                }
            });

            // btn_box 추가
            let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_1()">확인</button></div>';
            cards.innerHTML += btnBox;

            loadStoredOptions_1();
            storeCheckedValues_1();
            return true;
        }
    });
}   



function handleClick() {
    var storedValue2 = localStorage.getItem('selectedOptionsStore');

    if (storedValue2 === null || storedValue2 === '') {
        console.log('선택된 체크박스가 없습니다.');
        Swal.fire({
            icon: 'warning',
            title:`유형을 고르려면, <br> 공간을 먼저 골라주셔야 합니다.`
        }).then((result) => {
            if (result.isConfirmed) {
                getCommentList();
            }
        });
        return; // 함수 종료
    }

    var arrayValue2;

    try {
        arrayValue2 = JSON.parse(storedValue2);
    } catch (error) {
        console.error('JSON 파싱 오류:', error);
        return; // 함수 종료
    }

    if (!Array.isArray(arrayValue2) || arrayValue2.length === 0) {
        console.error('유효하지 않거나 빈 배열:', arrayValue2);
        return; // 함수 종료
    }

    var latestOption = arrayValue2[arrayValue2.length - 1];
    console.log("마지막 값:", latestOption);

    spreadCommentFromServer_1_2(latestOption).then(result => {
        const cards = document.getElementById('cards');
        cards.style.gridTemplateColumns = 'repeat(4, 0.5fr)';
        cards.style.gridTemplateRows = 'minmax(1px, 30px);';
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        const choice_2 = document.getElementById('choice_2');
        const choice_3 = document.getElementById('choice_3');
        const choice_4 = document.getElementById('choice_4');
        choice_3.style = '';
        choice_4.style = '';
        cards.style.display = 'grid';
        choice_2
        choice_2.style = '';
        mainmenu.style = '';
        form_choice.style = '';
        form_choice.style.color = '#006400';

        const hover_menu1 = document.getElementById('hover_menu1');
        const hover_menu2 = document.getElementById('hover_menu2');
        const hover_menu3 = document.getElementById('hover_menu3');
        const hover_menu4 = document.getElementById('hover_menu4');
        const hover_menu5 = document.getElementById('hover_menu5');
        const card__image = document.querySelectorAll('.card__image');

        hover_menu2.style.backgroundColor = 'rgb(245, 247, 250)';
        hover_menu1.style = '';
        hover_menu3.style = '';
        hover_menu4.style = '';
        hover_menu5.style = '';

        card__image.style = '';
        if (result && result.length > 0) {
            cards.innerHTML = '';
            console.log("제발부탁이야제발" + result.length);
            result.forEach(rvo => {
                if (result.length ==8) {
                    let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
                    li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}" style="height: 150px; !important" ></div>`;
                    li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
                    li += `  value="${rvo.subject}" id="checkbox-${rvo.subject}" onclick="clickCheck(this)"  >`
                    li += `    </div ></div> </label ></li >`
                    cards.innerHTML += li;
                } else if(result.length==4){
                    let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
                    li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}"></div>`;
                    li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
                    li += `  value="${rvo.subject}" id="checkbox-${rvo.subject}" onclick="clickCheck(this)"  >`
                    li += `    </div ></div> </label ></li >`
                    cards.innerHTML += li;
                }
            });

            // btn_box 추가
            let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn_1" onclick="submit_btn_1()">확인</button></div>';
            cards.innerHTML += btnBox;

            loadStoredOptions_1();
            storeCheckedValues_1();
            return true;
        }
    });
}

async function getCommentList() {

    let result = await spreadCommentFromServer();
    const cards = document.getElementById('cards');
    cards.style.gridTemplateColumns = 'repeat(2,0.5fr)';
    cards.style.gridTemplateRows = 'none';
    const mainmenu = document.getElementById('mainmenu_text');
    const hover_menu1 = document.getElementById('hover_menu1');
    const hover_menu2 = document.getElementById('hover_menu2');
    const hover_menu3 = document.getElementById('hover_menu3');
    const hover_menu4 = document.getElementById('hover_menu4');
    const hover_menu5 = document.getElementById('hover_menu5');
    hover_menu1.style.backgroundColor = 'rgb(245, 247, 250)';
    hover_menu2.style = '';
    hover_menu3.style = '';
    hover_menu4.style = '';

    const form_choice = document.getElementById('form_choice');
    const choice_4 = document.getElementById('choice_4');
    const choice_3 = document.getElementById('choice_3');
    choice_3.style = '';
    form_choice.style = '';
    const choice_2 = document.getElementById('choice_2');
    choice_2.style = '';
    choice_4.style = '';
    mainmenu.style.color = '#006400';
    cards.style.display = 'grid';
    mainmenu.style.setProperty('color', '#006400', 'important');


    if (result && result.length > 0) {
        cards.innerHTML = '';
        result.forEach(rvo => {
            let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
            li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}"></div>`;
            li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
            li += `  value = "${rvo.subject}" id = "checkbox-${rvo.subject}" onclick = "clickCheck(this)" >`
            li += `    </div ></div> </label ></li >`
            cards.innerHTML += li;
        });

        // btn_box 추가
        let btnBox = '<div class="btn_box"><button type="button" class="ok_btn" id="ok_btn" onclick="submit_btn()">확인</button></div>';
        cards.innerHTML += btnBox;

        loadStoredOptions();

        // 체크박스의 체크 상태를 저장합니다.
        storeCheckedValues();

    }
}

async function spreadCommentFromServer(checkedValue) {


    try {
        const resp = await fetch('/req/mainCategory');
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}




document.getElementById('mainmenu').addEventListener('click', async function () {
    await getCommentList();
})




// 저장
var DataC = {};

function store() {
    let selectedOptions = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        selectedOptions.push(checkboxes[i].value);
    }
    localStorage.setItem('selectedOptionsStore', JSON.stringify(selectedOptions));


    DataC['store'] = selectedOptions;
}

function store_1() {
    let selectedOptions = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        selectedOptions.push(checkboxes[i].value);
    }
    localStorage.setItem('selectedOptionsStore_1', JSON.stringify(selectedOptions));

    DataC['store']= selectedOptions;
}

function store_2_1() {
    let selectedOptions = [];
    var checkboxes = document.querySelectorAll('input.myCheckbox1:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        selectedOptions.push(checkboxes[i].value);
    }
    localStorage.setItem('selectedOptionsStore_2_1', JSON.stringify(selectedOptions));

    DataC['store'] = selectedOptions;
}

function store_2_2() {
    let selectedOptions = [];
    var checkboxes = document.querySelectorAll('input.myCheckbox2:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        selectedOptions.push(checkboxes[i].value);
    }
    localStorage.setItem('selectedOptionsStore_2_2', JSON.stringify(selectedOptions));


    DataC['store'] = selectedOptions;
}

function store_3() {
    var subjects = [];
    $('#sample6_postcode, #sample6_address, #sample6_detailAddress, #sample6_extraAddress').each(function () {
        subjects.push($(this).val());
    });
    localStorage.setItem('selectedOptionsStore_3', JSON.stringify(subjects));

    DataC['store'] = subjects;
}

function store_4() {
    var subjects = [];
    $('#leftInput, #rightInput, #bud, #comment').each(function () {
        subjects.push($(this).val());
    });
    localStorage.setItem('selectedOptionsStore_4', JSON.stringify(subjects));

    DataC['store'] = subjects;
}

function store_5_1() {
    let selectedOptions = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let result_budget = document.getElementById('result_budget').value;
    let selectedOptions_1 = [];

    for (var i = 0; i < checkboxes.length; i++) {
        selectedOptions.push(checkboxes[i].value);
    }
    selectedOptions_1.push(result_budget);

    console.log("선택된 옵션zzz: " + selectedOptions.join(", "));
    console.log("선택된 옵션zzz: " + selectedOptions_1.join(", "));
    localStorage.setItem('selectedOptionsStore_5_1', JSON.stringify(selectedOptions));
    localStorage.setItem('selectedOptionsStore_5_1_2', JSON.stringify(selectedOptions_1));
}



//jgh231201추가
/*document.getElementById('form_choice').addEventListener('click', function () {
    getCommentList_1();
    loadStoredOptions_1();
});
*/
//jgh
function loadStoredOptions() {
    var storedOptions = localStorage.getItem('selectedOptionsStore');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
            checkbox.checked = false;
        });

        var latestOptions = parsedOptions.slice(-1);

        //document.getElementById('li_final').innerText = latestOptions;

        latestOptions.forEach((value) => {
            var checkbox = document.getElementById('checkbox-' + value);
            if (checkbox) {
                checkbox.checked = true;
                if (checkbox.checked) {

                    const subject = checkbox.id.slice(9);
                    const image = document.getElementById("image-" + subject);
                    image.style.border = '4px solid rgb(80, 119, 113)';
                    image.style.filter = "none";
                    image.style.padding = '0px';
                    console.log('Border Applied:', image.style.border);
                    console.log('Filter Applied:', image.style.filter);
                }
            }
        });
    }

}

function loadStoredOptions_5_1() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_5_1');
    console.log("저장한 5_1 : " + storedOptions)
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        var latestOptions = parsedOptions.slice(-1);

        latestOptions.forEach((value) => {
            var checkbox = document.getElementById('myCheckboxNull');


            let bud = document.getElementById('bud');
            let result_budget = document.getElementById('result_budget');
            if (checkbox) {
                checkbox.checked = true;

                if (checkbox.checked) {
                    bud.value = '협의결정';
                    bud.readOnly = true;
                    bud.style.backgroundColor = "#80808021";
                    result_budget.innerText = '협의 후 결정';
                }
            } else {


            }
        });
    }
}

function loadStoredOptions_5_1_2() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_5_1_2');
    console.log("저장한 5_1 : " + storedOptions)
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        var latestOptions = parsedOptions.slice(-1);

        latestOptions.forEach((value) => {
            let result_budget = document.getElementById('result_budget');


            let convertedValue = convertBudget(value);


            result_budget.innerText = convertedValue;
        });
    }
}



function loadStoredOptions_2_1() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_2_1');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);


        var latestOptions = parsedOptions.slice(-1);
        console.log("마지막 옵션" + latestOptions);

        latestOptions.forEach((value) => {
            var checkbox = document.getElementById('checkbox-' + value);
            if (checkbox) {
                checkbox.checked = true;
                if (checkbox.checked) {

                    const subject = checkbox.id.slice(9);
                    const image = document.getElementById("image-" + subject);
                    image.style.border = '4px solid rgb(80, 119, 113)';
                    image.style.filter = "none";
                    image.style.padding = '0px';
                    console.log('Border Applied:', image.style.border);
                    console.log('Filter Applied:', image.style.filter);
                }
            }
        });
    }
}
/*function loadStoredOptions_2_2() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_2_2');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        document.querySelectorAll('.myCheckbox2').forEach((checkbox) => {
            checkbox.checked = false;
        });

        console.log("저장된 옵션좀 보장" + storedsOptions)
        var latestOptions = parsedOptions.slice(-1);


        latestOptions.forEach((value) => {
            var checkbox = document.getElementById('checkbox-' + value);
            if (checkbox) {
                checkbox.checked = true;
                if (checkbox.checked) {

                    const subject = checkbox.id.slice(9);
                    const image = document.getElementById("image-" + subject);
                    image.style.border = '4px solid rgb(80, 119, 113)';
                    image.style.filter = "none";
                    image.style.padding = '0px';
                    console.log('Border Applied:', image.style.border);
                    console.log('Filter Applied:', image.style.filter);
                }
            }
        });
    }
}*/
function loadStoredOptions_1() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_1');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
            checkbox.checked = false;
        });


        var latestOptions = parsedOptions.slice(-1);


        latestOptions.forEach((value) => {
            var checkbox = document.getElementById('checkbox-' + value);
            if (checkbox) {
                checkbox.checked = true;
                if (checkbox.checked) {
                    // Apply styles as needed
                    const subject = checkbox.id.slice(9);
                    const image = document.getElementById("image-" + subject);
                    image.style.border = '4px solid rgb(80, 119, 113)';
                    image.style.filter = "none";
                    image.style.padding = '0px';
                    console.log('Border Applied:', image.style.border);
                    console.log('Filter Applied:', image.style.filter);
                }
            }
        });
    }
}
function loadStoredOptions_2_2() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_2_2');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        document.querySelectorAll('.myCheckbox2').forEach((checkbox) => {
            checkbox.checked = false;
        });

        console.log("저장된 옵션좀 보장" + storedOptions)
        var latestOptions = parsedOptions.slice(-1);


        latestOptions.forEach((value) => {
            var checkbox = document.getElementById('checkbox-' + value);
            if (checkbox) {
                checkbox.checked = true;
                if (checkbox.checked) {

                    const subject = checkbox.id.slice(9);
                    const image = document.getElementById("image-" + subject);
                    image.style.border = '4px solid rgb(80, 119, 113)';
                    image.style.filter = "none";
                    image.style.padding = '0px';
                    console.log('Border Applied:', image.style.border);
                    console.log('Filter Applied:', image.style.filter);
                }
            }
        });
    }
}
function loadStoredOptions_3() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_3');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);


        var latestOptions = parsedOptions.slice(-4);

        console.log("저장된 옵션좀 보장" + latestOptions)


        let sample6_postcode = document.getElementById('sample6_postcode');
        let sample6_address = document.getElementById('sample6_address');
        let sample6_detailAddress = document.getElementById('sample6_detailAddress');
        let extraAddress = document.getElementById('sample6_extraAddress');

        sample6_postcode.value += latestOptions[0];
        sample6_address.value += latestOptions[1];
        sample6_detailAddress.value += latestOptions[2];

        extraAddress.value += latestOptions[3];


    }
}
function loadStoredOptions_4() {
    var storedOptions = localStorage.getItem('selectedOptionsStore_4');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);


        var latestOptions = parsedOptions.slice(-4);

        console.log("저장된 옵션좀 보장4" + latestOptions)

        let leftInput = document.getElementById('leftInput');
        let rightInput = document.getElementById('rightInput');
        let bud = document.getElementById('bud');
        let comment = document.getElementById('comment');
        let result_budget = document.getElementById('result_budget');
        unit();
        convertBudget();
        leftInput.value = latestOptions[0];
        rightInput.value = latestOptions[1];
        bud.value = latestOptions[2];
        result_budget.innerText = convertToKorean(latestOptions[2]);
        comment.value = latestOptions[3];



    }
}
function convertToKorean(value) {
    var digits = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    var units = ['', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조', '천조'];

    var numStr = "" + value;
    var numLen = numStr.length;
    var result = '';

    for (var i = 0; i < numLen; i++) {
        var digit = parseInt(numStr.charAt(i));
        var unit = units[numLen - i - 1];
        if (i === numLen - 1 && digit === 1 && numLen !== 1) {
            result += '일';
        } else if (digit !== 0) {
            result += digits[digit] + unit;
        } else if (i === numLen - 5) {
            result += '만';
        }
    }

    if (numLen > 0) {
        result += '원';
    }

    return result;
}

async function postDataToServer(data, url) {
    try {
        const config = {
            method: "post",
            headers: {
                'content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (err) {
        console.log(err);
    }
}




async function sendDataToControllers() {
    let user_id = document.getElementById('user_id').value;
    console.log("user_id를 부려라" + user_id);

    await postDataToServer(DataC['store'], DataC['store_1'], DataC['store_2_1'],DataC['store_2_2'],DataC['store_3'],DataC['store_4'],"/req/store/" + user_id);
   
}