<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Main Page</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link rel="stylesheet" href="/resources/css/main.css">
</head>
<body>
	<jsp:include page="../common/nav.jsp"></jsp:include>
<body class="mainBody">
	<div class="total">
		<div class="content">
			<div class="box">
				<div class="box2">
					<div class="event">
						<div class="eventText">
							<p>스타일메이트와 함께 따뜻한 겨울을 준비하세요</p>
							<p>보일러/지역난방</p>
							<p>시공비 지원 이벤트</p>
						</div>
						<img src="/resources/img/event-removebg-preview.png">
					</div>
					<div>
						<div class="menu">
							<div class="leftText">
								<p class="miniTitle">이런 인테리어를 찾고 있나요?</p>
								<p class="secTitle">좋아하실 만한 인테리어 콘텐츠를 추천해드려요</p>
							</div>
							<div class="rightText">
								<a href="/portfolio/list"><p>더보기</p></a>
							</div>
						</div>
						<div class="slide_wrapper">
							<ul class="slides" id="slides1">
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/indexImg2.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><div class="mainMoreBtn">
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
									<span class="material-symbols-outlined">
										arrow_forward_ios </span>
								</div>
							</div>
						</div>
						<div class="menu">
							<div class="leftText">
								<p class="miniTitle margin10">숨고 커뮤니티에 물어보세요</p>
							</div>
							<div class="rightText">
								<a href="#"><p>더보기</p></a>
							</div>
						</div>
						<div class="comunity"></div>

						<div class="menu">
							<div class="leftText2">
								<p class="miniTitle">작은 자취방 나만의 감성 눌러 담기</p>
								<img src="/resources/img/hand.JPG">
							</div>
							<div class="rightText">
								<a href="#"><p>더보기</p></a>
							</div>
						</div>
						<div class="slide_wrapper">
							<ul class="slides" id="slides2">
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/indexImg2.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><div class="mainMoreBtn">
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
								<div class="prev" id="prev2"></div>
								<div class="next" id="next2">
									<span class="material-symbols-outlined">
										arrow_forward_ios </span>
								</div>
							</div>
						</div>
						<div class="menu">
							<div class="leftText2">
								<p class="miniTitle">40평 이상 BEST</p>
								<img src="/resources/img/best.JPG">
								<p class="miniTitle">모두 보셨나요?</p>
								<img id="imgSize" src="/resources/img/finger.JPG">
							</div>
							<div class="rightText">
								<a href="#"><p>더보기</p></a>
							</div>
						</div>
						<div class="slide_wrapper">
							<ul class="slides" id="slides3">
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/indexImg2.jpg"></a></li>
								<li><a href="#"><img src="/resources/img/tree.jpg"></a></li>
								<li><a href="#"><div class="mainMoreBtn">
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
								<div class="prev" id="prev3"></div>
								<div class="next" id="next3">
									<span class="material-symbols-outlined">
										arrow_forward_ios </span>
								</div>
							</div>

						</div>
						<div class="menu margin50">
							<div class="leftText areaText">
								<p class="miniTitle">전국 숨은 업체</p>
								<p class="secTitle">믿을 수 있는 업체를 스타일메이트 단 한 곳에서 찾으세요</p>
							</div>
							<div class="rightText atag">
								<div class="divAtag1">
									<a class="atag" href="#">서울</a> <a href="#">인천</a> <a href="#">세종</a>
									<a href="#">강원</a> <a href="#">경기</a> <a href="#">충북</a> <a
										href="#">충남</a> <a href="#">경북</a> <a href="#">대전</a>

								</div>
								<div class="divAtag divAtag2">
									<a href="#">대구</a> <a href="#">전북</a> <a href="#">경남</a> <a
										href="#">울산</a> <a href="#">광주</a> <a href="#">부산</a> <a
										href="#">전남</a> <a href="#">제주</a>
								</div>

							</div>
						</div>



					</div>

				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../common/footer.jsp" />
	<script src="/resources/js/main.js"></script>

<script type="text/javascript">
let isUp = '<c:out value="${isUp}"/>';

if (parseInt(isUp)) {
	
}

</script>


</body>
</html>