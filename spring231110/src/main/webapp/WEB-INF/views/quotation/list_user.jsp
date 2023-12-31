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

<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">
<link href="<c:url value='/resources/css/qutation_user.css'/>"
	rel="stylesheet" type="text/css">


</head>
<body>

	<jsp:include page="../common/nav.jsp" />

	<sec:authentication property="principal.mvo.id" var="authEmail" />
	<%-- <input type="text" value="${authEmail}" id="user_id" name="requestId"> --%>
	<form action="/quotation/req_ok" method="post">
		<div class="total">
			<div class="subject">받은 견적</div>
			<nav></nav>
			<div class="content">

				<ul class="gride_qvo">
				
					<c:forEach items="${list }" var="qvo">
					
					
						<li class="list_requset" id="list_requset_${qvo.quotationNm}">
						<input id="checked_ok_${qvo.quotationNm}" type="text" value="${qvo.checked }">
						<div class="checked_div_${qvo.quotationNm}" ></div>
							<input type="hidden" value="${qvo.quotationNm}" id="quotationNm"
							class="quo_click"> 
							 메이트 : ${qvo.userNm}<br>
							${qvo.form}<br>
							${qvo.categoryType}<br> ${qvo.address}

							<button type="button" onclick="quo_user(`${qvo.quotationNm}`)">견적서
								보러가기</button>
						</li>



					</c:forEach>

				</ul>


			</div>
		</div>


	</form>



	<script src="/resources/js/quotation_list_user.js"></script>

</body>
</html>