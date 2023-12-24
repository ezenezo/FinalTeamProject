<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">
<link href="<c:url value='/resources/css/req_list.css'/>"
	rel="stylesheet" type="text/css">
</head>
<body>
	<jsp:include page="../common/nav.jsp" />

	<sec:authentication property="principal.mvo.id" var="authEmail" />
	<input value="${authEmail}" id="authId" type="hidden">
	<script src="/resources/js/req_list.js"></script>

	<div class="total">
		<div class="subject">보낸 요청</div>

		<div class="content">

			<nav>

				<nav class="req_list_nav">
					<ul>
						<li class="li_1"><a class="li_1_a"
							onclick="getReqList(authId)">전체</a></li>
						<li class="li_2"><a class="li_2_a"
							onclick="getReqList_1(authId)">거래진행중</a></li>
						<li class="li_6"><a onclick="getReqList_5(authId)">미승인</a></li>
						<li class="li_3"><a onclick="getReqList_2(authId)">시공중</a></li>
						<li class="li_4"><a onclick="getReqList_3(authId)">시공완료</a></li>
						<li class="li_5"><a onclick="getReqList_4(authId)">시공취소</a></li>

					</ul>
				</nav>

			</nav>
			<ul id="req_list_ul">



			</ul>
		</div>
	</div>


	<jsp:include page="../common/footer.jsp" />



</body>
</html>
