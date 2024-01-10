<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Main Page</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link rel="stylesheet" href="/resources/css/main.css">
</head>
<jsp:include page="../common/nav.jsp"></jsp:include>
<body class="mainBody">
	<div class="box">
		<div class="box2">
			<jsp:include page="../common/slider.jsp"></jsp:include>

			<div class="leftText">
				<p class="miniTitle">평형대별 인테리어</p>
			</div>

			<div class="btnBox">
				<button class="topBtn topBtn1 clicked" type="button">10평대</button>
				<button class="topBtn topBtn2" type="button">20평대</button>
				<button class="topBtn topBtn3" type="button">30평대</button>
				<button class="topBtn topBtn4" type="button">40평대</button>
			</div>



			<!-- 평수별 리스트 시작-->
			<div class="bodyContainer">
				<div class="bodyContainer2"></div>
			</div>
			<!-- 평수별 리스트 끝 -->
			<a class="moreA" href="/portfolio/list"><button
					class="morePortofolioBtn" type="button">인테리어 더보기</button></a>

			<div>
				<div class="leftText">
					<p class="miniTitle martop">이런 인테리어를 찾고 있나요?</p>
					<div class="flexx">
						<p class="secTitle">인기 있는 인테리어 콘텐츠를 추천해 드려요</p>
						<a href="/portfolio/list"><p class="blueMore">더보기</p></a>

					</div>
				</div>

				<div class="slide_wrapper">
					<ul class="slides" id="slides1">
						<c:forEach items="${portfolioMainImgList}" var="mainImg" begin="0"
							end="5">
							<li><a href="/portfolio/portfolioDetail?pno=${mainImg.pno}">
									<img class="portfolioMainImg"
									src="/upload/${mainImg.saveDir}/${fn:replace(fn:replace(mainImg.saveDir, '\\', '-'), '/', '-')}_${mainImg.uuid}_${mainImg.fileName}">

							</a></li>
						</c:forEach>
						<li><a href="/portfolio/list"><div class="mainMoreBtn">
									<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
										class="bi bi-arrow-right-circle-fill moreBtn"
										viewBox="0 0 16 16">
  <path class="moreBtn"
											d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
</svg>
									<p class="moreText">더보기</p>
								</div> </a></li>

					</ul>
					<div class="controls">
						<div class="prev" id="prev1"></div>
						<div class="next" id="next1">
							<span class="material-symbols-outlined"> arrow_forward_ios
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--  -->

		<div class="promotion">
			<div class="leftText centerText">
				<p class="miniTitle margin30">인테리어, 왜 스타일메이트에 맡겨야 할까요?</p>
			</div>
			<div class="promotionBoxContainer">
				<div
					class="promotionBox promotionBoxNum1 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="280">
					<a href="/customer/introduce">
						<p class="absolText2">
							<span>꼼꼼한</span><span>비교견적</span> <span
								class="poromotionMiniText">믿을 수 있는 업체를</span> <span
								class="poromotionMiniText">연결해 드려요</span>
						</p> <img class="absolImg" src="/resources/img/promotion1.png">
					</a>
				</div>
				<div
					class="promotionBox promotionBoxNum2 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="300" data-wow-delay="0.3s">
					<a href="/customer/introduce">
						<p class="absolText2">
							<span>상세한</span><span>스타일메이트 플래너</span> <span
								class="poromotionMiniText">견적서의 분석과 상담을</span> <span
								class="poromotionMiniText">전담플래너가 관리해드려요</span>
						</p> <img class="absolImg" src="/resources/img/promotion2.png">
					</a>
				</div>
				<div
					class="promotionBox promotionBoxNum3  wow animate__animated animate__fadeInUpBig"
					data-wow-offset="300" data-wow-delay="0.5s">
					<a href="/customer/introduce">
						<p class="absolText2">
							<span>현장케어</span><span>스타일메이트</span> <span
								class="poromotionMiniText">스타일메이트가 시공현장을</span> <span
								class="poromotionMiniText">꼼꼼하게 체크해 드려요</span>
						</p> <img class="absolImg" src="/resources/img/promotion3.png">
					</a>
				</div>
				<div
					class="promotionBox promotionBoxNum4  wow animate__animated animate__fadeInUpBig"
					data-wow-offset="300" data-wow-delay="1s">
					<a href="/customer/introduce">
						<p class="absolText2">
							<span>든든한</span><span>A/S케어</span> <span
								class="poromotionMiniText">스타일메이트와 함께하면</span> <span
								class="poromotionMiniText">3년동안 A/S 해드려요</span>
						</p> <img class="absolImg" src="/resources/img/promotion4.png">
					</a>
				</div>
			</div>
		</div>

		<div class="box2">


			<div class="leftText">
				<p class="miniTitle margin30">테마로 보는 인테리어</p>
			</div>
			<div class="thema">
				<a
					href="/portfolio/list?homeStyleSh=모던&sliderOneVal=1&sliderTwoVal=232">
					<div class="thema-2 themaImg1">
						<img src="/resources/img/thema1.png">
						<p class="absolText">
							<span>신혼부부가 많이 찾는</span><span>모던 심플 스타일</span>
						</p>
					</div>
				</a> <a
					href="/portfolio/list?homeTypeSh=상업공간&sliderOneVal=1&sliderTwoVal=232">
					<div class="thema-2 themaImg2">
						<img src="/resources/img/thema2.png">
						<p class="absolText">
							<span>사진 찍고 싶은</span><span>카페&식당 인테리어</span>
						</p>
					</div>
				</a>
			</div>

			<div class="thema margin20">
				<a
					href="/portfolio/list?homeTypeSh=원룸&sliderOneVal=1&sliderTwoVal=232">
					<div class="thema-2 themaImg3">
						<img src="/resources/img/thema3.jpg">
						<p class="absolText">
							<span>1.8평 작은 방</span><span>나만의 감성 눌러 담기</span>
						</p>
					</div>
				</a> <a
					href="/portfolio/list?homeStyleSh=북유럽&sliderOneVal=1&sliderTwoVal=232">
					<div class="thema-2 themaImg4">
						<img src="/resources/img/thema4-2.jpg">
						<p class="absolText">
							<span>유럽 감성을 더한</span><span>유러피언 하우스</span>
						</p>
					</div>
				</a>
			</div>
		</div>

		<!-- 리뷰란 시작 -->
		<div class="promotion reviewBox">
			<div class="leftText centerText">
				<a href="/review/allReviewList"><p class="miniTitle margin30">따끈따끈한 고객 후기 ></p></a>
			</div>
			<div class="promotionBoxContainer reviewContainer"></div>
		</div>
		<!-- 리뷰 끝 -->
		<div class="box2 mar80">
			<div class="menu ma">
				<div class="leftText areaText">
					<p class="miniTitle">전국 숨은 업체</p>
					<p class="secTitle">믿을 수 있는 업체를 스타일메이트 단 한 곳에서 찾으세요</p>
				</div>
				<div class="rightText atag">
								<div class="divAtag1">
								<!-- 카페24배포용webapps 전경환231223-->
<!-- 									<a class="atag" href="http://aj2002.cafe24.com/findmap/findmap#%EC%84%9C%EC%9A%B8%20%EC%A0%84%EC%B2%B4">서울</a>  -->
<!-- 									<a href="http://aj2002.cafe24.com/findmap/findmap#%EC%9D%B8%EC%B2%9C%20%EC%A0%84%EC%B2%B4">인천</a>  -->
									<!-- 로컬용 -->
									<a class="atag" href="http://localhost:8088/findmap/findmap#%EC%84%9C%EC%9A%B8%20%EC%A0%84%EC%B2%B4">서울</a> 
									<a href="http://localhost:8088/findmap/findmap#%EC%9D%B8%EC%B2%9C%20%EC%A0%84%EC%B2%B4">인천</a> 
									
									<a href="#">세종</a>
									<a href="#">강원</a> 
									<a href="#">경기</a> 
									<a href="#">충북</a> 
									<a href="#">충남</a> 
									<a href="#">경북</a> 
									<a href="#">대전</a>
								</div>
								<div class="divAtag divAtag2">
									<a href="#">대구</a> 
									<a href="#">전북</a> 
									<a href="#">경남</a> 
									<a href="#">울산</a> 
									<a href="#">광주</a> 
									<!-- 카페24배포용webapps 전경환231223-->
<!-- 									<a href="http://aj2002.cafe24.com/findmap/findmap#%EB%B6%80%EC%82%B0%20%EC%A0%84%EC%B2%B4">부산</a> -->
									<!-- 로컬용 -->
									<a href="http://localhost:8088/findmap/findmap#%EB%B6%80%EC%82%B0%20%EC%A0%84%EC%B2%B4">부산</a>  
									
									<a href="#">전남</a> 
									<a href="#">제주</a>
								</div>			
				</div>
			</div>
		</div>


	</div>
	<jsp:include page="../common/footer.jsp" />

</body>
<script src="/resources/js/main.js"></script>
<script src="/resources/js/wow.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
<script type="text/javascript">
	homeSizeList(sizeNum);
	reviewPrint();
	new WOW().init();
</script>
</html>