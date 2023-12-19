<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>PortfolioDetail Page</title>
<link rel="stylesheet" href="../resources/css/companyInfo.css">
<!-- TUI 에디터 CSS CDN -->
<!-- <link rel="stylesheet"
	href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
 -->
</head>
<body class="companyInfoBody">
	<jsp:include page="../common/nav.jsp"></jsp:include>

	<div class="box">
		<div class="box2">
			<div class="mainImgBox">
				<img class="portfolioMainImg"
					src="/upload/${fn:replace(profileImg.saveDir,'\\','/')}/${profileImg.uuid}_${profileImg.fileName}">

			</div>
			<div class="btnBox">
				<button class="topBtn topBtn1 clicked" type="button">업체정보</button>
				<button class="topBtn topBtn2" type="button">시공사례(${cdto.cvo.portfolioCount})</button>
				<button class="topBtn topBtn3" type="button">업체후기(${cdto.cvo.reviewCount})</button>
			</div>

			<h3 class="infoTitle">기본 정보</h3>
			<ul class="basic">
				<li><p class="spantitle">상호명</p>
					<p class="spaninfo">${cdto.mvo.userNm}</p></li>
				<li><p class="spantitle">이메일</p>
					<p>${cdto.mvo.email}</p></li>
				<li><p class="spantitle">대표전화</p>
					<p>${cdto.cvo.phone}</p></li>
				<li><p class="spantitle">주소</p>
					<p>${cdto.mvo.address}</p></li>
			</ul>

			<h3 class="infoTitle">다양한 시공사례</h3>


			<div class="portfolioList6">
				<c:forEach items="${cdto.pdtoList}" var="pdto" begin="0" end="5">
					<div class="pdtoBox">
						<a href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}"> <img
							class="portfolioMainImg"
							src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">

						</a>
						<p class="pdtoBoxTitle boldText">${pdto.pvo.title}</p>
						<p class="pdtoBoxTitle">
							<span>${pdto.pvo.homeSize} 평 / </span><span>${pdto.pvo.homeType}</span>
						</p>
					</div>

				</c:forEach>
			</div>
			<a class="moreA" href="#"><button class="morePortofolioBtn"
					type="button">시공사례 더보기</button></a>

			<div class="reviewBox">
				<div class="rateAverage">
					<div class="rate">
						<div class="starBox">
							<div class="Star1">
								<svg class="st1" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st1"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>

								<svg class="st1" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st1"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>

								<svg class="st1" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st1"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>

								<svg class="st1" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st1"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
								<svg class="st1" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st1"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>


							</div>
							<div class="Star2">
								<svg class="st2" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st2"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
								<svg class="st2" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st2"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
								<svg class="st2" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st2"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
								<svg class="st2" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st2"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
								<svg class="st2" xmlns="http://www.w3.org/2000/svg"
									fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="st2"
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>


							</div>
						</div>
						<input type="hidden" id="averageRate"
							value="${cdto.cvo.rateAverage}">
						<p class="font16">
							${Math.round(cdto.cvo.rateAverage * 100) / 100} <span
								class="grayFont">/ 5</span>
						</p>
					</div>
					<p>
						총 <span class="greenText">${cdto.cvo.reviewCount}명</span>의 고객님이
						평가에 참여했습니다.
					</p>
				</div>
			</div>

			<h3 class="infoTitle">전체 후기(${cdto.cvo.reviewCount})</h3>

			<div class="reviewBottom">
				<c:forEach items="${cdto.rdtoList}" var="rdto" begin="0" end="2">
					<div class="review">
						<div class="rateStar">
							<div class="starmini">
							
								
							</div>
							<p>${rdto.rvo.id}|${rdto.rvo.regDate}</p>

						</div>

						<div class="review2col">
							<div class="imgDiv">
								<img class="reviewMainImg"
									src="/upload/${rdto.reviewMainImg.saveDir}/${fn:replace(rdto.reviewMainImg.saveDir,'\\','-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">

							</div>

							<div class="reviewTitleBox">

								<div>
									<p>${rdto.rvo.title}</p>
								</div>
								<div>

									<div class="portfolioInfo">
										<p>
											<span class="span1">주거형태</span><span class="span2">${pdto.pvo.homeType}</span>
										</p>
										<p>
											<span class="span1">전용면적</span><span class="span2">${pdto.pvo.homeSize}</span>
										</p>
										<p>
											<span class="span1">방 개수</span><span class="span2">${pdto.pvo.roomCnt}</span>
										</p>
										<p>
											<span class="span1">가족형태</span><span class="span2">${pdto.pvo.familyType}</span>
										</p>
										<p></p>
										<p>
											<span class="span1">스타일</span><span class="span2">${pdto.pvo.homeStyle}</span>
										</p>
									</div>

								</div>

							</div>
						</div>
					</div>
				</c:forEach>
			</div>
		</div>
	</div>
	<a class="moreA" href="#"><button class="morePortofolioBtn"
			type="button">후기 더보기</button></a>



	<!-- 	<script src="/resources/js/portfolioRegister.js"></script> -->

	<jsp:include page="../common/footer.jsp"></jsp:include>
	<script type="text/javascript" src="/resources/js/companyInfo.js"></script>


</body>
</html>