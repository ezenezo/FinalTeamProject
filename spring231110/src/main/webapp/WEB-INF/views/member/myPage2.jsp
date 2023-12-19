<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
</head>
<body>
	<jsp:include page="../common/nav.jsp" />
	<section>
		<h1 class="title">마이페이지</h1>
		<sec:authorize access="isAuthenticated()">
			<sec:authentication property="principal.mvo" var="user" />
			<div id="userInfoBox">
				<div class="nameAndEmail">
					<c:if test="${fvo eq null}">
						<img alt="" src="../resources/img/익명프로필.png" class="profileImg">
					</c:if>
					<c:if test="${fvo ne null }">
						<img alt=""
							src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
							class="profileImg">
					</c:if>
					<div class="userInfo">
						<p class="userNm">${user.userNm }&nbsp;고객님</p>
						<p class="email">${user.email }</p>
					</div>
				</div>
				<button type="button" class="modifyUserInfoBtn">계정설정</button>
			</div>
			<div class="couponBox">
				<i class="bi bi-ticket-fill"></i>쿠폰함
			</div>
			<hr>
		</sec:authorize>
	</section>
</body>
<link href="../resources/css/myPage.css" rel="stylesheet">
</html>