<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">

<link href="<c:url value='/resources/css/quo_user.css'/>"
	rel="stylesheet" type="text/css">
<title>견적확인하기</title>
</head>
<body>
	<jsp:include page="../common/nav.jsp" />

	<sec:authentication property="principal.mvo.id" var="authEmail" />
	<%-- <input type="text" value="${authEmail}" id="user_id" name="requestId"> --%>
	<form action="/quotation/req_ok" method="post">
		<div class="total">

			<nav></nav>
			<div class="content">
<<<<<<< HEAD

				<ul class="quo_div">
					<c:forEach items="${list }" var="qvo">

						
						<input type="text" value="${qvo.quotationNm}" id="quotationNm">


=======

				<ul class="quo_div">
					<c:forEach items="${list }" var="qvo">

						<%-- <input type="number" value="${qvo.quotationNm}" id="quotationNm" hidden="hidden"> --%>
>>>>>>> b966bafc157ce2891b208444bc840799ad24fbd4

						<div class="subject">${company}메이트의견적서</div>
						<div class="quo_user_total_1">

							<div class="quo_user_div">
								<span class="span_teg">형태:</span>${qvo.form}</div>
							<div class="quo_user_div">
								<span class="span_teg">유형:</span>${qvo.categoryType}</div>
							<div class="quo_user_div">
								<span class="span_teg">범위:</span>${qvo.rang}</div>
							<div class="quo_user_div">
								<span class="span_teg">상태:</span>${qvo.status}</div>


						</div>

						<div class="quo_user_total_2">

							<div class="quo_user_div">
								<span class="span_teg">우편번호: </span>${qvo.zoneCode}</div>
							<div class="quo_user_div">
								<span class="span_teg">주소:</span>${qvo.address}</div>

							<div class="quo_user_div">
								<span class="span_teg">상세주소:</span>${qvo.detailAddress}</div>


						</div>
						<div class="quo_user_div">
							<span class="span_teg">참고사항:</span>${qvo.extraAddress}</div>

						<div class="quo_user_total_3">

							<div class="quo_user_div">
								<span class="span_teg">평수:</span>${qvo.aquareFootage}평</div>
							<div class="quo_user_div">
								<span class="span_teg">제곱미터:</span>${qvo.squareMeter}m<sup>2</sup></div>
							<div class="quo_user_div">
								<span class="span_teg">견적서 등록날짜:</span>${qvo.reqAt}</div>
							<div class="quo_user_div">
								<span class="span_teg">총액:</span>${qvo.budget}원</div>
						</div>
<<<<<<< HEAD
						
							<div id="btn_div_ok"></div>

			
						<script type="text/javascript">
						let btn_div =document.getElementById('btn_div_ok');
						btn_div.innerHTML='';
						if (${ qvo.okTypeNo }== 0 && ${ qvo.okTypeYes }== 0) {
						    btn_div.innerHTML+=  `<button type="button" onclick="">결제하기</button>`
						    
						    btn_div.innerHTML+=   ` <button type="button" onclick="cancel_btn()">거래취소</button>`
						    
								
						}
</script>
				
						
					</c:forEach>

				</ul>


=======

						<script type="text/javascript">
									if(${qvo.approveOk}==1){
										<div class="quo_user_div">
										<span class="span_teg"> 결제 완료되었습니다.</div>
										}
						</script>
						<button type="button" onclick="">결제하기</button>
						<button type="button" onclick="cancel_btn(${qvo.quotationNm})">거래취소</button>

					</c:forEach>

				</ul>


>>>>>>> b966bafc157ce2891b208444bc840799ad24fbd4
			</div>
		</div>


	</form>

	<script
		src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
	<script src="/resources/js/quotation_user.js"></script>
</body>
</html>