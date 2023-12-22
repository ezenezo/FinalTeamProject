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
				<c:if test="${fvo ne null }">
					<img alt=""
						src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
						class="profileImg">
				</c:if>
				<c:if test="${fvo eq null }">
					<img alt="" src="../resources/img/profile_none.png"
						class="profileImg">
				</c:if>
				<div class="userInfo">
					<p class="userNm">${user.userNm }</p>
					<p class="email">${user.email }</p>
					<a href="/member/modify?id=${user.id }"><button type="button"
							class="modifyUserInfoBtn">설정</button></a>
				</div>
				<hr>
				<div class="subUser">
					<div class="iconBox">
						<i class="bi bi-heart" data-id="${user.id }"></i> <span>좋아요</span>
						<p>${heart }</p>
					</div>
					<div class="iconBox">
						<img alt="" src="../resources/img/free-icon-ticket-7937829.png"><span>내
							쿠폰</span>
						<p>${couponCount }</p>
					</div>
				</div>
			</div>

			<!-- 오른쪽 구역 -->
			<section>
				<nav class="mypageNav">
					<ul>
						<li>진행상황</li>
						<li>내가 쓴 리뷰</li>
						<li onclick="spreadCouponList(${user.id})">쿠폰함</li>
						<li onclick="spreadHeartList(${user.id})">좋아요</li>
					</ul>
				</nav>
				<div class="subMain">
					<!-- 결제하기 버튼 생성 -->
					<a href="/payment/orderResult?cno=-1&pno=41&qno=19"><button
							type="button">결제하기</button></a>
					<!-- 환불하기 버튼 -->
					<a href="#"><button type="button" onclick="cancelPay(${user.id})">환불받기</button></a>
					<!-- 쿠폰  버튼 생성 -->
					<a href="/payment/coupon"><button type="button">쿠폰 받기</button></a>
				</div>
			</section>
		</div>
	</sec:authorize>
	<jsp:include page="../common/footer.jsp"></jsp:include>

</body>
<link href="../resources/css/myPage.css" rel="stylesheet">
<script type="text/javascript" src="../resources/js/mypage.js"></script>
<script type="text/javascript" src="../resources/js/payment.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
	integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	crossorigin="anonymous"></script>
</html>