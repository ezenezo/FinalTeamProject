<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="../resources/css/couponSelect.css" rel="stylesheet">
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>
<body>
	<div class="mainTitle">쿠폰할인 적용</div>
	<section>
		<h3>${pdto.pvo.title }</h3>
		<div class="imgBox">
			<img class="portfolioMainImg"
				src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">
			<p class="style">${pdto.pvo.homeType }/${pdto.pvo.familyType }/
				${pdto.pvo.homeStyle }</p>
		</div>

		<div class="grayBox">
			<div>
				<p class="spanP">할인 적용 전</p>
				<p data-budget=${qvo.budget } id="budget">${qvo.budget }원</p>
			</div>
			-
			<div>
				<p class="spanP red">할인 금액</p>
				<p class="red bold" id="discount" data-price="0"></p>
			</div>
			=
			<div>
				<p class="spanP">쿠폰 적용가</p>
				<p class="bold" data-finalPrice="${qvo.budget }" id="finalPrice">${qvo.budget }</p>
			</div>
		</div>

		<div id="couponList">
			<c:if test="${coupon eq null}">
				<div class="noCoupon">적용 가능한 쿠폰이 없습니다.</div>
			</c:if>
			<c:forEach var="c" items="${coupon }">
				<div class="coupon first bold" data-index="${c.couponNum }">
					<span class="material-symbols-outlined" id="none">
						check_circle </span>
					<c:if test="${c.percent ne 0 }">
						<fmt:parseNumber var="discountPrice"
							value="${qvo.budget * (c.percent/100)}" integerOnly="true" />
						<p class="won" data-price="${discountPrice }">${discountPrice }원(${c.percent }%)</p>
					</c:if>
					<c:if test="${c.discount ne 0 }">
						<p class="won" data-price="${c.discount }">${c.discount }원</p>
					</c:if>
					<p class="wonSpan">할인 쿠폰 적용가능</p>
				</div>
			</c:forEach>
			<div class="buttonBox">
				<button type="button" id="closeBtn">적용하기</button>
			</div>
		</div>

		<!-- 주문 확인창으로 넘길 데이터 -->
		<!-- 쿠폰번호 -->
		<input type="text" hidden="hidden" id="couponNum" value="0">
		<!-- 포트폴리오번호 -->
		<input type="text" hidden="hidden" id="pno" value="${pdto.pvo.pno }">
		<!-- 견적서번호 -->
		<input type="text" hidden="hidden" id="qno" value=${qvo.quotationNm }>
		<!-- 최종가격 -->
		<input type="text" hidden="hidden" id="finalPrice" value="${qvo.budget }">
	</section>
</body>
<script type="text/javascript" src="../resources/js/couponSelect.js"></script>
</html>