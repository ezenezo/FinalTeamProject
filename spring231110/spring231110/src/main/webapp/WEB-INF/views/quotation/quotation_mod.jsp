<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>견적서 작성하기</title>
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
	<form action="/quotation/modify_submit" method="post">
	
		<div class="total">

			<div class="content">
				<ul class="quo_div">
			
						<input type="hidden" value="${qvo.requestId}" id="reqID"
							name="requestId">
						<input type="hidden" value="${qvo.pno}" id="pno" name="pno">
						<input type="hidden" value="${qvo.requestNm}" id="reqID"
							name="requestNm">
									<input type="hidden" value="${qvo.keynum}" id="reqID"
							name="keynum">
						<div class="subject">${qvo.requestId }님의견적서</div>
						<div class="quo_user_total_1">
							<div class="quo_user_div">
								<span class="span_teg">형태:</span> <input name="form"
									value="${qvo.form}">
							</div>
							<div class="quo_user_div">
								<span class="span_teg">유형:</span> <input name="categoryType"
									value="${qvo.categoryType}">
							</div>
							<div class="quo_user_div">
								<span class="span_teg">범위:</span> <input name="rang"
									value="${qvo.rang}">
							</div>
							<div class="quo_user_div">
								<span class="span_teg">상태:</span> <input name="status"
									value="${qvo.status}">
							</div>

							<div class="quo_user_total_2">
								<div class="quo_user_div">
									<span class="span_teg">우편번호:</span> <input name="zoneCode"
										value="${qvo.zoneCode}">
								</div>
								<div class="quo_user_div">
									<span class="span_teg">주소:</span> <input name="address"
										value="${qvo.address}">
								</div>
								<div class="quo_user_div">
									<span class="span_teg">상세주소:</span> <input name="detailAddress"
										value="${qvo.detailAddress}">
								</div>
							</div>

							<div class="quo_user_div">
								<span class="span_teg">참고사항:</span> <input name="extraAddress"
									value="${qvo.extraAddress}">
							</div>

							<div class="quo_user_total_3">
								<div class="quo_user_div">
									<span class="span_teg">평수:</span> <input name="aquareFootage"
										value="${qvo.aquareFootage}">평
								</div>
								<div class="quo_user_div">
									<span class="span_teg">제곱미터:</span> <input name="squareMeter"
										value="${qvo.squareMeter}">m²
								</div>

								<div class="quo_user_div">
									<span class="span_teg">총액:</span> <input
										style="width: 250px; margin-bottom: 0px !important;" id="bud"
										name="budget" maxlength="12" type="text"
										onkeypress='return checkNumber(event)'value="${qvo.budget}">
									<div color="#ff7631" class="sc-7683fa06-0 eAkweW"
										id="result_budget">
									
										<div class="unit" id="unitId" ></div>
									</div>
								</div>


								<div class="quo_user_div">
									<span class="span_teg"> <textarea maxlength="200"
											placeholder="고객님께 추가로 요청한 코멘트를 작성해주세요" name="requestOp"
											id="comment" value="${qvo.requestOp}">${qvo.requestOp}</textarea>
									</span>
									<div class="sc-ef390a2d-0 donOnO">
										<div color="#ff7631" class="sc-7683fa06-0 eAkweW">&nbsp;</div>
										<div color="#7a7a7c" class="sc-7683fa06-0 kTtyyx" id="counter"  style="visibility: hidden;">/
											200자</div>
									</div>
								</div>
							</div>
						</div>
			
				</ul>
			</div>

			<button type="submit" onclick="">견적서보내기</button>
			<button type="button" onclick="cancel_btn()">거래취소</button>

		</div>
	</form>
	<script type="text/javascript">
		
	</script>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
	<script src="/resources/js/quotation.js"></script>
</body>
</html>
