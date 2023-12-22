



spreadStatusList(id);


//황지영_진행사항
function spreadStatusList(id) {
    console.log(userRole);

    getStatusList(id).then(result => {
        console.log(result);
        document.querySelector('.subMain').innerHTML = '';

        let html = document.getElementsByClassName('subMain')[0];
        html.innerHTML = '';
        html.innerHTML += `<div class="tableBorder"></div><table class="tbl_col"><thead><tr><th class="rno">번호</th><th class="form/categoryType">형태/유형</th>
                      <th class="company">시공할 메이트</th><th class="ing">진행상황</th><th class="req">요청서서보기</th><th class="req">견적서서보기</th></tr></thead><tbody id="insert"></tbody></table>`;
        count = 0;
        if (result.length > 0) {
            for (let list of result) {

                if (userRole == "ROLE_COM") {
                    let str = ``;
                    str += `<tr class="tr"><td>${list.requestNmStatus}</td><td class="tal">${list.form}/${list.categoryType}</td><td class="tal">${list.companyName}</td>`;
                    if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {


                        str += `<td >${list.companyName}님께서 견적서를 보냈습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >결제가 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >시공이 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >환불이 완료되었습니다.</td>`;
                    } else if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && list.quotationCancel) {

                        str += `<td >고객님께서 거래를 취소하였습니다.</td>`;
                    } else if (!list.requestOk && !list.paymentOk && !list.completed && !list.refund && list.requestCancel && !list.quotationCancel) {

                        str += `<td >${list.companyName}님께서 요청서를 거절하였습니다.</td>`;
                    } else {
                        str += `<td >요청서를 고객님께서 보냈습니다.</td>`;
                    }
                    str += `<td ><a href="http://localhost:8088/quotation/quotation_user?requestNm=${list.requestNm}"><button type="button" class="status_btn">요청서보기</button></a></td>`;

                    if (list.quotationNm > 0) {
                        str += `<td ><a href="http://localhost:8088/quotation/quotation_user?quotationNm=${list.quotationNm}"><button type="button"  class="status_btn">견적서보기</button></a></td>`;

                    } else {
                        str += `<td ></td>`;

                    }
                    document.getElementById('insert').innerHTML += str;
                    count += 1;
                } else {

                    let str = ``;
                    str += `<tr class="tr"><td>${list.requestNmStatus}</td><td class="tal">${list.form}/${list.categoryType}</td><td class="tal">${list.companyName}</td>`;
                    if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {


                        str += `<td >메이트가 견적서를 보냈습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >결제가 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >시공이 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >환불이 완료되었습니다.</td>`;
                    } else if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && list.quotationCancel) {

                        str += `<td >고객님께서 거래를 취소하였습니다.</td>`;
                    } else if (!list.requestOk && !list.paymentOk && !list.completed && !list.refund && list.requestCancel && !list.quotationCancel) {

                        str += `<td >메이트가 요청서를 거절하였습니다.</td>`;
                    } else {
                        str += `<td >요청서를 메이트에게 보냈습니다.</td>`;
                    }
                    str += `<td ><a href="http://localhost:8088/quotation/quotation_user?requestNm=${list.requestNm}"><button type="button" class="status_btn">요청서보기</button></a></td>`;

                    if (list.quotationNm > 0) {
                        str += `<td ><a href="http://localhost:8088/quotation/quotation_user?quotationNm=${list.quotationNm}"><button type="button"  class="status_btn">견적서보기</button></a></td>`;

                    } else {
                        str += `<td ></td>`;

                    }
                    document.getElementById('insert').innerHTML += str;
                    count += 1;

                }
            }
        }

    })
}





//진행사항 리스트 가져오기_황지영
//회사로 로그인할 떄
async function getStatusList_com(id) {
    console.log("여기들어오지마ㄷㅈㅈㄷㄷㄹㅈㄱ");
    try {
        console.log(id);
        const url = '/status2/status?id=' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


/*
//사용자가 로그인 할 경우
async function getStatusList(id) {

    console.log("여기들어오지마");
    try {
console.log(id);
        const url = '/status/status?id=' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}


async function getStatusList_com(id) {
    try {
        const url = '/status/com/' + id; // URL에 ID를 포함
        const config = {
            method: 'get',
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
*/


//황지영_진행사항
function spreadStatusList(id) {
    console.log(userRole);
    if (userRole == "ROLE_COM") {
        getStatusList_com(id).then(result => {
            console.log(result);
            document.querySelector('.subMain').innerHTML = '';

            let html = document.getElementsByClassName('subMain')[0];
            html.innerHTML = '';
            html.innerHTML += `<div class="tableBorder"></div><table class="tbl_col"><thead><tr><th class="rno">번호</th><th class="form/categoryType">형태/유형</th>
                          <th class="company">시공할 메이트</th><th class="ing">진행상황</th><th class="req">요청서서보기</th><th class="req">견적서서보기</th></tr></thead><tbody id="insert"></tbody></table>`;
            count = 0;
            if (result.length > 0) {
                for (let list of result) {
                    let str = ``;
                    str += `<tr class="tr"><td>${list.requestNmStatus}</td><td class="tal">${list.form}/${list.categoryType}</td><td class="tal">${list.companyName}</td>`;
                    if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {


                        str += `<td >${list.companyName}님께서 견적서를 보냈습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >결제가 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >시공이 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >환불이 완료되었습니다.</td>`;
                    } else if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && list.quotationCancel) {

                        str += `<td >고객님께서 거래를 취소하였습니다.</td>`;
                    } else if (!list.requestOk && !list.paymentOk && !list.completed && !list.refund && list.requestCancel && !list.quotationCancel) {

                        str += `<td >${list.companyName}님께서 요청서를 거절하였습니다.</td>`;
                    } else {
                        str += `<td >요청서를 고객님께서 보냈습니다.</td>`;
                    }
                    str += `<td ><a href="http://localhost:8088/quotation/quotation_user?requestNm=${list.requestNm}"><button type="button" class="status_btn">요청서보기</button></a></td>`;

                    if (list.quotationNm > 0) {
                        str += `<td ><a href="http://localhost:8088/quotation/quotation_user?quotationNm=${list.quotationNm}"><button type="button"  class="status_btn">견적서보기</button></a></td>`;

                    } else {
                        str += `<td ></td>`;

                    }
                    document.getElementById('insert').innerHTML += str;
                    count += 1;
                }
            }

        })
    }

    else if (userRole == "ROLE_USER") {
        getStatusList(id).then(result => {

            document.querySelector('.subMain').innerHTML = '';

            let html = document.getElementsByClassName('subMain')[0];
            html.innerHTML = '';
            html.innerHTML += `<div class="tableBorder"></div><table class="tbl_col"><thead><tr><th class="rno">번호</th><th class="form/categoryType">형태/유형</th>
                <th class="company">시공할 메이트</th><th class="ing">진행상황</th><th class="req">요청서서보기</th><th class="req">견적서서보기</th></tr></thead><tbody id="insert"></tbody></table>`;
            count = 0;
            if (result.length > 0) {
                for (let list of result) {
                    let str = ``;
                    str += `<tr class="tr"><td>${list.requestNmStatus}</td><td class="tal">${list.form}/${list.categoryType}</td><td class="tal">${list.companyName}</td>`;
                    if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {


                        str += `<td >메이트가 견적서를 보냈습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >결제가 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && list.completed && !list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >시공이 완료되었습니다.</td>`;
                    } else if (list.requestOk && list.paymentOk && !list.completed && list.refund && !list.requestCancel && !list.quotationCancel) {

                        str += `<td >환불이 완료되었습니다.</td>`;
                    } else if (list.requestOk && !list.paymentOk && !list.completed && !list.refund && !list.requestCancel && list.quotationCancel) {

                        str += `<td >고객님께서 거래를 취소하였습니다.</td>`;
                    } else if (!list.requestOk && !list.paymentOk && !list.completed && !list.refund && list.requestCancel && !list.quotationCancel) {

                        str += `<td >메이트가 요청서를 거절하였습니다.</td>`;
                    } else {
                        str += `<td >요청서를 메이트에게 보냈습니다.</td>`;
                    }
                    str += `<td ><a href="http://localhost:8088/quotation/quotation_user?requestNm=${list.requestNm}"><button type="button" class="status_btn">요청서보기</button></a></td>`;

                    if (list.quotationNm > 0) {
                        str += `<td ><a href="http://localhost:8088/quotation/quotation_user?quotationNm=${list.quotationNm}"><button type="button"  class="status_btn">견적서보기</button></a></td>`;

                    } else {
                        str += `<td ></td>`;

                    }
                    document.getElementById('insert').innerHTML += str;
                    count += 1;
                }
            }

        })
    }



}


//진행사항 리스트 가져오기_황지영
//회사로 로그인할 떄
async function getStatusList_com(id) {
    console.log("여기들어오지마ㄷㅈㅈㄷㄷㄹㅈㄱ");
    try {
        console.log(id);
        const url = '/status/' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
//사용자가 로그인 할 경우
async function getStatusList(id) {

    console.log("여기들어오지마");
    try {
        console.log(id);
        const url = '/status/sts?id=' + id;
        const resp = await fetch(url);
        const result = await resp.json();
        return result;

    } catch (error) {
        console.log(error);
    }
}

/*
async function getStatusList_com(id) {
    try {
        const url = '/status/com/' + id; // URL에 ID를 포함
        const config = {
            method: 'get',
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
*/