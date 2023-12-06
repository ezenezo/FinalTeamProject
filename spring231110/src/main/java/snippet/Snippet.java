getCommentList();

document.body.addEventListener('change', function (e) {
    const checkboxes = document.querySelectorAll('.myCheckbox');
    checkboxes.forEach(function (checkbox) {
        const subject = checkbox.id.slice(9);
        const image = document.getElementById("image-" + subject);
        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");

        if (checkbox.checked) {
            image.style.border = '4px solid rgb(80, 119, 113)';
            image.style.filter = "none";
            image.style.padding = '0px';
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
    document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
        checkbox.checked = false;
    });
    target.checked = targetChecked;
}

function submit_btn() {
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
        spreadCommentFromServer_1(checkedValue);
        getCommentList_1(checkedValue);
        store(checkedValue);
        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
    } else {
        Swal.fire({
            icon: 'warning',
            title: '필수 항목을 선택해주세요.',
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });
    }
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

async function spreadCommentFromServer_1(checkedValue) {
    try {
        const resp = await fetch('/req/' + checkedValue);
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

function getCommentList_1(checkedValue) {
    spreadCommentFromServer_1(checkedValue).then(result => {
        const cards = document.getElementById('cards');
        cards.style.gridTemplateColumns = 'repeat(4,0.5fr)';
        cards.style.gridTemplateRows = 'minmax(1px, 30px);';
        const mainmenu = document.getElementById('mainmenu_text');
        const form_choice = document.getElementById('form_choice');
        mainmenu.style = '';
        form_choice.style = '';
        form_choice.style.color = '#006400';
        form_choice.style.backgroundColor = 'rgb(245, 247, 250)';

        const ul = document.createElement('ul');
        ul.classList.add('cards');

        if (result.length > 0) {
            cards.innerHTML = '';

            result.forEach(rvo => {
                let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;

                li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}"></div>`;
                li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
                li += `  value = "${rvo.subject}" id = "checkbox-${rvo.subject}" onclick = "clickCheck(this)" >`
                li += `    </div >	</div > </label >	</li >`

                cards.innerHTML += li;
            });

            loadStoredOptions();
        }
    });
}

async function spreadCommentFromServer() {
    const cards = document.getElementById('cards');
    cards.style.gridTemplateColumns = 'repeat(2,0.5fr)';
    cards.style.gridTemplateRows = 'none';
    const mainmenu = document.getElementById('mainmenu_text');
    const form_choice = document.getElementById('form_choice');
    form_choice.style = '';
    mainmenu.style.color = '#006400';
    mainmenu.style.setProperty('color', '#006400', 'important');
    mainmenu.style.backgroundColor = 'rgb(245, 247, 250)';

    try {
        const resp = await fetch('/req/mainCategory');
        const result = await resp.json();
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function getCommentList() {
    let result = await spreadCommentFromServer();
    const ul = document.createElement('ul');
    ul.classList.add('cards');
    loadStoredOptions();
    if (result.length > 0) {
        cards.innerHTML = '';

        result.forEach(rvo => {
            let li = `<li class="cards__item"><input type="hidden" value="${rvo.subject}" id="subject">`;
            li += `<label><div class="card"><div class="card__image card__image--${rvo.subject}" id="image-${rvo.subject}"></div>`;
            li += `<div class="card__content">  <div class="card__title">${rvo.subject}</div>  <input type="checkbox" class="myCheckbox" name="subject"`;
            li += `  value = "${rvo.subject}" id = "checkbox-${rvo.subject}" onclick = "clickCheck(this)" >`
            li += `    </div >	</div > </label >	</li >`
            cards.innerHTML += li;
        });

        loadStoredOptions();
    }
}

document.getElementById('mainmenu').addEventListener('click', async function () {
    await getCommentList();
})

function store() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        selectedOptions.push(checkboxes[i].value);
    }

    var storedOptionsString = localStorage.getItem('selectedOptions');
    var storedOptions = storedOptionsString ? JSON.parse(storedOptionsString) : [];
    storedOptions = storedOptions.concat(selectedOptions);
    storedOptions = Array.from(new Set(storedOptions));
    localStorage.setItem('selectedOptions', JSON.stringify(storedOptions));
}

document.addEventListener('DOMContentLoaded', function () {
    loadStoredOptions();
});

document.getElementById('form_choice').addEventListener('click', function () {
    loadStoredOptions();
});

function loadStoredOptions() {
    var storedOptions = localStorage.getItem('selectedOptions');
    if (storedOptions) {
        var parsedOptions = JSON.parse(storedOptions);

        document.querySelectorAll('.myCheckbox').forEach((checkbox) => {
            checkbox.checked = false;
        });

        parsedOptions.forEach((value) => {
            var checkbox = document.getElementById('checkbox-' + value);
            if (checkbox) {
                checkbox.checked = true;
                if (checkbox.checked) {
                    const checkboxes = document.querySelectorAll('.myCheckbox');
                    checkboxes.forEach(function (checkbox) {
                        const subject = checkbox.id.slice(9);
                        const image = document.getElementById("image-" + subject);
                        const checkboxes_choice = document.querySelectorAll("input[type='checkbox']");
                        image.style.border = '4px solid rgb(80, 119, 113)';
                        image.style.filter = "none";
                        image.style.padding = '0px';
                    });
                } else {
                    const image = document.getElementById("image-" + value);
                    image.style.borderBottom = '0px';
                    image.style.borderLeft = '0px';
                    image.style.borderTop = '0px';
                    image.style.borderRight = '0px';
                    image.style.filter = "";
                    image.style.padding = '';
                    image.style.transition = 'filter 0.5s cubic-bezier(.43, .41, .22, .91)';
                }
            }
        });
    }
}
