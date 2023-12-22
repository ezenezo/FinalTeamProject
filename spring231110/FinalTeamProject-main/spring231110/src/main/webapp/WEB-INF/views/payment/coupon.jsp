<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="../resources/css/coupon.css" rel="stylesheet">
<!-- sweetAlert -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
</head>
<body>
	<jsp:include page="../common/nav.jsp" />
	<div class="border"></div>
	<div class="body">
		<section>
			<div class="title">coupon</div>
			<div class="subTitle">이달의 쿠폰 게시판입니다.</div>
			<div class="couponList">
				<div class="coupon">
					<div class="couponImg" id="img1"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img2"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img3"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img4"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img5"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img6"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img7"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img8"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
				<div class="coupon">
					<div class="couponImg" id="img9"></div>
					<button class="couponBtn">쿠폰받기</button>
				</div>
			</div>
		</section>
	</div>
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.mvo" var="user" />
		<input type="text" hidden="hidden" value="${user.id }" id="id">
	</sec:authorize>
	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
<script type="text/javascript" src="../resources/js/coupon.js"></script>
</html>