<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

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
	<%-- <input type="text" value="${authEmail}" id="user_id" name="uestId"> --%>

	<div class="total">

		<div class="content">


			<ul class="quo_div">
				<c:forEach items="${list }" var="qvo">
					<div class="subject">${company}메이트의견적서<div
							style="display: flex; color: gray; font-size: 30px;">
							<fmt:formatDate value="${qvo.regAt}" pattern="yyyy-MM-dd" />
						</div>
					</div>
					<nav class="quo_nav">
						<ul class="nav"
							style="display: flex; justify-content: space-evenly;">


						</ul>
					</nav>

					<input type="hidden" value="${qvo.quotationNm}" id="quotationNm">
					<input type="hidden" value="${qvo.requestNm}" id="requestNm">
					<input type="hidden" value="${qvo.requestId}" id="requestId">
					<input type="hidden" value="${qvo.pno}" id="pno">
					<input type="hidden" value="${qvo.refund}" id="refund">
					<input type="hidden" value="${completed}" id="completed">
					<input type="hidden" value="${authEmail}" id="authEmail">
					<input type="hidden" value="${qvo.paymentOk}" id="payment">
					<input type="hidden" value="${qvo.okTypeNo}" id="ok_type_no">
					<input type="hidden" value="${qvo.quotationCancel}" id="quotationCancel">
					<input type="hidden" value="${qvo.requestCancel}" id="requestCancel">
					<div class="total_div" style="line-height: 60px; font-size: 16px;">
						<div class="quo_user_total_1">

							<div class="quo_user_div">
								<span class="span_teg">형태:</span>${qvo.form}</div>
							<div class="quo_user_div">
								<span class="span_teg">유형:</span>${qvo.categoryType}</div>
							<div class="quo_user_div">
								<span class="span_teg">범위:</span>${qvo.extent}</div>
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



							<div class="quo_user_div">
								<span class="span_teg">참고사항:</span>${qvo.extraAddress}</div>
						</div>
						<div class="quo_user_total_3">

							<div class="quo_user_div">
								<span class="span_teg">평수:</span>${qvo.squareFootage}평</div>
							<div class="quo_user_div">
								<span class="span_teg">제곱미터:</span>${qvo.squareMeter}m<sup>2</sup>
							</div>

							<div class="quo_user_div">
								<span class="span_teg">총액:</span>${qvo.budget}원</div>
							<div class="quo_user_div">
								<span class="span_teg">메이트 요청사항:</span>${qvo.requestOp}</div>
						</div>
					</div>



					<script type="text/javascript">
						
					</script>

				</c:forEach>

			</ul>
		</div>





	</div>




	<script type="text/javascript">
		
	</script>
	<script
		src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>

	<script type="text/javascript" src="../resources/js/payment.js"></script>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

	<script src="/resources/js/quotation_user.js"></script>
</body>
</html>