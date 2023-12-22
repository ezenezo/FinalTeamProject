<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

<link rel="stylesheet" href="/resources/css/portfolioList.css">
</head>
<body>

<input type="hidden" id="order" value="${filter.order}">
<input type="hidden" id="homeTypeSh" value="${filter.homeTypeSh}">
<input type="hidden" id="roomCntSh" value="${filter.roomCntSh}">
<input type="hidden" id="familyTypeSh" value="${filter.familyTypeSh}">
<input type="hidden" id="homeStyleSh" value="${filter.homeStyleSh}">
<input type="hidden" id="sliderOneVal" value="${filter.sliderOneVal}">
<input type="hidden" id="sliderTwoVal" value="${filter.sliderTwoVal}">


	<jsp:include page="../common/nav.jsp"></jsp:include>

	<div class="box">
		<div class="box2">
			<div class="filterBox">

				<div class="filter num0">
					<button class="filterBtn" type="button">
						정렬
						<div class="essential1Left" id="essential1Left">
							<span class="material-symbols-outlined" id="essential2Btn">
								expand_more </span>
						</div>
					</button>

					<ul class="ulTag num0ul">

						<li>인기순</li>
						<li>최신순</li>
						<li>오래된순</li>
					</ul>
				</div>

				<div class="filter num1">
					<button class="filterBtn" type="button">
						평수
						<div class="essential1Left" id="essential1Left">
							<span class="material-symbols-outlined" id="essential2Btn">
								expand_more </span>
						</div>
					</button>
					<div class="rangeBox ulTag">
						<div class="values">
							<span id="range1"> 1 </span><span id="range2"> 232 </span>
						</div>
						<div class="container">
							<div class="slider-track"></div>
							<input type="range" min="1" max="232" value="1" id="slider-1"
								oninput="slideOne()"> <input type="range" min="1"
								max="232" value="232" id="slider-2" oninput="slideTwo()">

						</div>
						<div class="rangeText">
							<p>1㎡</p>
							<p>232㎡이상</p>
						</div>
						<div class="rangeFilter">
							<button class="filterBtn rangeBtn" type="button">1~33㎡</button>
							<button class="filterBtn rangeBtn" type="button">33~66㎡</button>
							<button class="filterBtn rangeBtn" type="button">67~99㎡</button>
							<button class="filterBtn rangeBtn" type="button">100~132㎡</button>
							<button class="filterBtn rangeBtn" type="button">133~165㎡</button>
							<button class="filterBtn rangeBtn" type="button">166~198㎡</button>
							<button class="filterBtn rangeBtn" type="button">199~231㎡</button>
							<button class="filterBtn rangeBtn" type="button">232㎡이상</button>
						</div>
					</div>
				</div>
				<div class="filter num2">
					<button class="filterBtn widthUp" type="button">
						주거형태
						<div class="essential1Left" id="essential1Left">
							<span class="material-symbols-outlined" id="essential2Btn">
								expand_more </span>
						</div>
					</button>

					<ul class="ulTag num2ul">
						<li class="num2li">원룸</li>
						<li class="num2li">오피스텔</li>
						<li class="num2li">아파트</li>
						<li class="num2li">빌라&연립</li>
						<li class="num2li">단독주택</li>
						<li class="num2li">사무공간</li>
						<li class="num2li">상업공간</li>
						<li class="num2li">기타</li>

					</ul>
				</div>
				<div class="filter num3">
					<button class="filterBtn" type="button">
						방 개수
						<div class="essential1Left" id="essential1Left">
							<span class="material-symbols-outlined" id="essential2Btn">
								expand_more </span>
						</div>
					</button>

					<ul class="ulTag num3ul">

						<li>1개</li>
						<li>1.5개</li>
						<li>2개</li>
						<li>3개</li>
						<li>4개</li>
						<li>5개 이상</li>
					</ul>

				</div>
				<div class="filter num4">
					<button class="filterBtn widthUp" type="button">
						가족형태
						<div class="essential1Left" id="essential1Left">
							<span class="material-symbols-outlined" id="essential2Btn">
								expand_more </span>
						</div>
					</button>

					<ul class="ulTag num4ul">

						<li>싱글라이프</li>
						<li>신혼부부</li>
						<li>룸메이트와 함께 사는 집</li>
						<li>아기가 있는 집</li>
						<li>취학 자녀가 있는 집</li>
						<li>부모님과 함께 사는 집</li>
						<li>기타</li>
					</ul>
				</div>
				<div class="filter num5">
					<button class="filterBtn widthUp" type="button">
						스타일
						<div class="essential1Left" id="essential1Left">
							<span class="material-symbols-outlined" id="essential2Btn">
								expand_more </span>
						</div>
					</button>

					<ul class="ulTag num5ul">

						<li>모던</li>
						<li>미니멀&심플</li>
						<li>내추럴</li>
						<li>북유럽</li>
						<li>빈티지&레트로</li>
						<li>프렌치&프로방스</li>
						<li>러블리&로맨틱</li>
						<li>인더스트리얼</li>
						<li>한국&아시아</li>
						<li>유니크&믹스ㄴ매치</li>
						<li>기타</li>
					</ul>
				</div>
			</div>

			<div id="selectFilter"></div>
			<div class="bodyContainer">
				<div class="bodyContainer2">
					
					<%-- <c:forEach items="${portfolioDTOList}" var="pdto">

						<div class="pdtoBox">
							<a class="a1"
								href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}">

								<div class="overHiddenBox">
									<img class="portfolioMainImg"
										src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">
								</div>

								<p class="pdtoBoxTitle">${pdto.pvo.title}</p> <a class="a2"
								href="/member/companyInfo?id=${pdto.pvo.id}"><p class="pdtoBoxTitle">${pdto.pvo.userNm}</p></a>
								<p class="pdtoBoxTitle pdtoTitle3th">
									<span>좋아요${pdto.pvo.likeQty} </span><span>조회수${pdto.pvo.readQty}</span>
								</p>
							</a>
						</div>
					</c:forEach> --%>
					

				</div>
			</div>
		</div>
	</div>
	</div>
	<script src="/resources/js/portfolioList.js"></script>
	<script type="text/javascript">
 	let homeStyleSh22 =`<c:out value="${filter.homeStyleSh}"/>`; 
 	let homeTypeSh22 =`<c:out value="${filter.homeTypeSh}"/>`; 
 	
	filterList();
	if(homeStyleSh22!=null && homeStyleSh22!=""){
		boxadd(homeStyleSh22,5); 
	}else if(homeTypeSh22!=null && homeTypeSh22!=""){
		boxadd(homeTypeSh22,2); 
	}
	
	</script>
	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
</html>