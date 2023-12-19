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
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link rel="stylesheet" href="../resources/css/orderResult.css">
<!-- jQuery -->
<script type="text/javascript"
	src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script type="text/javascript"
	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../common/nav.jsp"></jsp:include>
	<div class="navBorder"></div>
	<h1 class="title">주문결제</h1>
	<div class="border"></div>
	<!-- 결제 전 확인할 정보들 -->
	<section>
		<!-- 왼쪽 주문 정보 확인 -->
		<div class="leftSection">
			<!-- 주소정보 -->
			<div>
				<h2 class="addressTitle">주소정보</h2>
				<div class="userInfo">
					<c:if test="${fvo ne null }">
						<img alt=""
							src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
							class="profileImg">
					</c:if>
					<c:if test="${fvo eq null }">
						<img alt="" src="../resources/img/profile_none.png"
							class="profileImg">
					</c:if>
					<div class="exceptImg">
						<p class="userNm bold" data-name="${mvo.userNm }">${mvo.userNm }님</p>
						<p class="seventeen">(${mvo.zoneCode }) ${mvo.address }
							${mvo.extraAddress } ${mvo.detailAddress }</p>
						<p class="email seventeen">${mvo.email }</p>
					</div>
				</div>
			</div>
			<div>
				<h2 class="portTitle">
					주문상품
					<p id="text">현재 페이지에서는 변경이 불가능합니다.</p>
				</h2>
				<p class="companyNm">
					<span class="material-symbols-outlined"> store </span>${pdto.pvo.userNm }</p>
				<div class="portInfo">
					<div class="portfolio">
						<img class="portfolioMainImg"
							src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">
						<div>
							<p class="portNm">${pdto.pvo.title }</p>
							<p class="portDetail">${pdto.pvo.homeType }/${pdto.pvo.familyType }/
								${pdto.pvo.homeStyle }</p>
						</div>
					</div>
					<div class="discountDiv">
						<p>최종가격</p>
						<div class="priceDiv">
							<p class="budget">${qvo.budget }원</p>
							<fmt:parseNumber var="discountPrice"
								value="${qvo.budget * (cvo.percent/100)}" integerOnly="true" />
							<span class="material-symbols-outlined"> trending_flat </span>
							<c:set var="price"
								value="${qvo.budget - cvo.discount - discountPrice }"></c:set>
							<p class="finalPrice" data-price="${price }" id="finalPrice">${price }원</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2 class="discountTitle">할인/포인트</h2>
				<div>
					<p class="couponDiscount">
						<span class="material-symbols-outlined"> local_activity </span>쿠폰할인
					</p>
					<div class="coupon">
						<input type="text" value="${cvo.couponNum }" hidden="hidden"
							id="coupon">
						<p class="discountCoupon">할인쿠폰</p>
						<p class="finalPrice">-${cvo.discount + discountPrice }</p>
						<p>원</p>
						<button type="button"
							onclick="popup(${mvo.id}, ${pdto.pvo.pno}, ${qvo.quotationNm})"
							class="couponChange">쿠폰변경</button>
					</div>
					<div>
						<div class="couponDiscount">
							<span class="material-symbols-outlined"> monetization_on </span>포인트
							<p id="text">최종금액의 1%가 적립됩니다.</p>
						</div>
						<div class="pointDiv">
							<p>사용 가능 포인트</p>
							<div class="pointBox">
								<input type="number" id="point" data-max="${mvo.point }"><span>원</span>
								<button type="button" id="allUseBtn">전액사용</button>
							</div>
							<p>사용가능</p>
							<p>${mvo.point }P</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2 class="payTitle" data-pg="0">결제방법</h2>
				<div class="payList">
					<div class="pay">
						<input type="radio" value="tosspay" name="pg" class="pg">
						<div class="center">
							<img alt="" src="../resources/img/toss.jpg" id="toss">토스페이
						</div>
					</div>
					<div class="pay">
						<input type="radio" value="smilepay" name="pg" class="pg">
						<div class="center">
							<img alt="" src="../resources/img/smilepay.JPG" id="smile">스마일페이
						</div>
					</div>
					<div class="pay">
						<input type="radio" value="kakaopay" name="pg" class="pg">
						<div class="center">
							<img alt="" src="../resources/img/kakaopay.png">카카오페이
						</div>
					</div>
					<div class="pay" id="normal">
						<input type="radio" value="html5_inicis" name="pg" class="pg">
						<div>일반결제</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 오른쪽 결제 금액 확인창 -->
		<div class="sticky">
			<h1 class="stickyTitle">결제 예정금액</h1>
			<div class="rightWon">
				<p>상품금액</p>
				<p class="bold">${qvo.budget}원</p>
			</div>
			<div class="rightWon">
				<p>쿠폰 할인금액</p>
				<p class="bold red">-${cvo.discount + discountPrice }원</p>
			</div>
			<div class="rightWon">
				<p>포인트 할인금액</p>
				<p class="bold red" id="pointDiscount">-0원</p>
			</div>
			<div class="rightWon final">
				<p class="red">합계</p>
				<p class="bold red finalPrice">${price }원</p>
			</div>
			<p class="agree">하기 필수약관을 확인하였으며 결제에 동의합니다.</p>
			<button type="button"
				onclick="requestPay(${mvo.id}, ${qvo.quotationNm}, ${cvo.couponNum })"
				class="payBtn">결제하기</button>
			<div class="agreeList">
				<p class="agreeTitle">개인정보 판매자 제공 동의</p>
				<p>어저구 스크롤</p>
			</div>
			<div>
				<p class="agreeTitle">개인정보 수집 및 이요 동의</p>
				<p>어저구 스크롤</p>
			</div>
			<div>
				<p class="agreeTitle">주문 상품정보 동의</p>
				<p>주문 상품의 상품명, 가격, 배송정보에 동의합니다.</p>
			</div>
		</div>
	</section>

	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
<script type="text/javascript">
	var IMP = window.IMP;
	IMP.init("imp13246533");
</script>
<script type="text/javascript" src="../resources/js/payment.js"></script>
<script type="text/javascript" src="../resources/js/orderResult.js"></script>
</html>