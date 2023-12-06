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
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.mvo" var="user" />
		<!-- 왼쪽 구역 프로필 -->
		<div class="main">
			<div id="userInfoBox">
				<c:if test="${fvo eq null}">
					<img alt="" src="../resources/img/익명프로필.png" class="profileImg">
				</c:if>
				<c:if test="${fvo ne null }">
					<img alt=""
						src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
						class="profileImg">
				</c:if>
				<div class="userInfo">
					<p class="userNm">${user.userNm }</p>
					<p class="email">${user.email }</p>
					<button type="button" class="modifyUserInfoBtn">설정</button>
				</div>
				<hr>
				<div class="subUser">
					<div class="iconBox">
						<i class="bi bi-heart"></i> <span>좋아요</span>
						<p>0</p>
					</div>
					<div class="iconBox">
						<img alt="" src="../resources/img/free-icon-ticket-7937829.png"><span>내
							쿠폰</span>
						<p>0</p>
					</div>
				</div>
			</div>

			<!-- 오른쪽 구역 -->
			<section>
				<nav class="mypageNav">
					<ul>
						<li>보낸 견적서</li>
						<li>받은 견적서</li>
						<li>쿠폰함</li>
						<li>좋아요</li>
					</ul>
				</nav>
				<div class="subMain"></div>
			</section>
		</div>
	</sec:authorize>
</body>
<link href="../resources/css/myPage.css" rel="stylesheet">
</html>