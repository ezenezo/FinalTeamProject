<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">
<link href="<c:url value='/resources/css/qutation.css'/>"
	rel="stylesheet" type="text/css">

<link href="<c:url value='/resources/css/req_detail.css'/>"
	rel="stylesheet" type="text/css">
</head>
<body>
	<jsp:include page="../common/nav.jsp" />

	<sec:authentication property="principal.mvo.id" var="authEmail" />

	<div class="total">
		<div class="subject">보낸 요청</div>

		<div class="content">


	

			<ul>

				<li><img alt="그림 없당" src="/upload/${qvo.flist.saveDir.replace("\\", "/")}/${qvo.flist.uuid}_${qvo.flist.fileName}">
					<input type="text" value="${qvo.rvo.requestNm}" id="requestNm_"
					name="requestNm"> <a
					href="/req/request_detil?requestNm=${qvo.rvo.requestNm}">
						${qvo.rvo.requestId}<br> ${qvo.rvo.form}<br>
						${qvo.rvo.categoryType}<br> ${qvo.rvo.address}
				</a></li>

			</ul>
		</div>
	</div>

	<script src="/resources/js/quotation_list.js"></script>
	<jsp:include page="../common/footer.jsp" />
</body>
</html>
