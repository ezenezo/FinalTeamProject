<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
		<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

			<!DOCTYPE html>
			<html>

			<head>
				<meta charset="UTF-8">
				<title>Insert title here</title>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
				<link href="<c:url value='/resources/css/index_all.css'/>" rel="stylesheet" type="text/css">

				<link href="<c:url value='/resources/css/quo_user.css'/>" rel="stylesheet" type="text/css">
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

								<ul class="quo_div">
									<c:forEach items="${list }" var="qvo">


										<input type="hidden" value="${qvo.quotationNm}" id="quotationNm">

										<input type="hidden" value="${qvo.pno}" id="pno">

										<div class="subject">${company}메이트의견적서</div>
										<div class="quo_user_total_1">

											<div class="quo_user_div">
												<span class="span_teg">형태:</span>${qvo.form}
											</div>
											<div class="quo_user_div">
												<span class="span_teg">유형:</span>${qvo.categoryType}
											</div>
											<div class="quo_user_div">
												<span class="span_teg">범위:</span>${qvo.rang}
											</div>
											<div class="quo_user_div">
												<span class="span_teg">상태:</span>${qvo.status}
											</div>


										</div>

										<div class="quo_user_total_2">

											<div class="quo_user_div">
												<span class="span_teg">우편번호: </span>${qvo.zoneCode}
											</div>
											<div class="quo_user_div">
												<span class="span_teg">주소:</span>${qvo.address}
											</div>

											<div class="quo_user_div">
												<span class="span_teg">상세주소:</span>${qvo.detailAddress}
											</div>


										</div>
										<div class="quo_user_div">
											<span class="span_teg">참고사항:</span>${qvo.extraAddress}
										</div>

										<div class="quo_user_total_3">

											<div class="quo_user_div">
												<span class="span_teg">평수:</span>${qvo.aquareFootage}평
											</div>
											<div class="quo_user_div">
												<span class="span_teg">제곱미터:</span>${qvo.squareMeter}m<sup>2</sup>
											</div>
											<div class="quo_user_div">
												<span class="span_teg">견적서 등록날짜:</span>${qvo.reqAt}
											</div>
											<div class="quo_user_div">
												<span class="span_teg">총액:</span>${qvo.budget}원
											</div>
										</div>

										<div id="btn_div_ok"></div>


										<script type="text/javascript">
											let btn_div = document.getElementById('btn_div_ok');
											btn_div.innerHTML = '';
											if (${ qvo.okTypeNo }== 0 && ${ qvo.okTypeYes }== 0) {
												let pno = document.getElementById('pno').value;
												let qno = document.getElementById('quotationNm').value;
												btn_div.innerHTML += `<a href="/payment/checkPay?pno=${qvo.pno}&qno=${qvo.quotationNm}&id=${authEmail}"><button type="button">결제하기</button></a>`;
												btn_div.innerHTML += `<button type="button" onclick="cancelPay(${authEmail}, ${qvo.quotationNm})">환불받기</button>`;
											}
										</script>


									</c:forEach>

								</ul>


							</div>
						</div>


					</form>

					<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
					<script src="/resources/js/quotation_user.js"></script>
					<script type="text/javascript" src="../resources/js/payment.js"></script>
					<script src="https://code.jquery.com/jquery-3.3.1.min.js"
						integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
						crossorigin="anonymous"></script>
			</body>

			</html>