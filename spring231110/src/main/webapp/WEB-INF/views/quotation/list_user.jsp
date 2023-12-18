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
<link href="<c:url value='/resources/css/qutation.css'/>"
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
				<div class="p_left">
					<ul>
						<c:forEach items="${list }" var="qvo">
							<a href="#" onclick="handleClick_q(event,${qvo.quotationNm})">
								<li class="list_requset" id="list_requset_${qvo.quotationNm}"><input
									type="hidden" value="${qvo.quotationNm}" id="quotationNm"
									class="quo_click"> ${qvo.quotationNm}<br>
									${qvo.form}<br> ${qvo.categoryType}<br>
									${qvo.address}</li>
							</a>
						</c:forEach>

						<c:forEach items="${list_read }" var="qvo">
							<a href="#" onclick="handleClick_q(event,${qvo.quotationNm})">
								<li class="list_requset_read"
								id="list_requset_${qvo.quotationNm}"><input type="hidden"
									value="${qvo.quotationNm}" id="quotationNm" class="quo_click">
									${qvo.quotationNm}<br> ${qvo.form}<br>
									${qvo.categoryType}<br> ${qvo.address}</li>
							</a>
						</c:forEach>
					</ul>


				</div>

				<div class="p_right">


					<ul id="u_right"></ul>


				</div>
			</div>
		</div>
	</form>


	<script src="/resources/js/quotation_list_user.js"></script>
	<jsp:include page="../common/footer.jsp" />
</body>
</html>