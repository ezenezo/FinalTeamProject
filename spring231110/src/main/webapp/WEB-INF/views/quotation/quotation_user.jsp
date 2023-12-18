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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">

<link href="<c:url value='/resources/css/quo_user'/>"
	rel="stylesheet" type="text/css">
<title>견적확인하기</title>
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
			
					<ul class="quo_div">
						<c:forEach items="${list }" var="qvo">
						
								<input type="text" value="${qvo.quotationNm}" id="quotationNm"> 
									<input type="hidden" value="${qvo.quotationNm}" id="quotationNm"> 
									${company}<br>
									${qvo.form}<br> ${qvo.categoryType}<br>
									${qvo.address}
									
									<button type="button" onclick="">결제하기</button>
									
								<button type="button" onclick="cancel_btn()">거래취소</button>
					
						</c:forEach>

					</ul>

			
			</div>
		</div>


	</form>
	
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
	<script src="/resources/js/quotation_user.js"></script>
</body>
</html>