<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko" class="" style="-gnb-height: 58px; - -vh: 9.19px;">
<head>

<meta name="description" content="">
<meta name="author" content="">

<link href="../resources/css/findmap.css" rel="stylesheet">


<link
	href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css"
	rel="stylesheet">
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">

<title>간단한 지도 표시하기</title>

<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<!-- <link rel="stylesheet" href="/resources/css/main.css"> -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript"	src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=82r632girq"></script>


<link href="<c:url value='/resources/css/index_all.css'/>"	rel="stylesheet" type="text/css">
<link	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"	rel="stylesheet">

</head>

<body data-modal-open-count="0" style=""
	class="page-content search-geo-address">

	<jsp:include page="../common/nav.jsp" />
	<!--   <div class="total"> -->
	<!-- 		<div class="subject">주제입니다.</div> -->
	<!-- 		<div class="content">content 입니다.</div> -->
	<!-- 	</div> -->
	<div class="total">
		<div class="subject">메이트찾기</div>
		<div class="content">
			<!-- 	content 입니다. -->


			<div id="app" data-browser="Chrome" data-is-loaded="true" class="">

				<div id="app-body">
					<div class="container">
						<!-- 				<h1 class="heading-title">고수찾기</h1> -->

						<div class="button-container" style="display: flex;">
						<!-- jgh231209  serviceButton 히든 처리 코드는 남아있음 -->
							<button type="button" id="serviceButton" class="btn1 service-btn">
								서비스 <i class="bi bi-chevron-down"></i>
							</button>
							<div id="serviceTooltip" class="tooltip">원하는 서비스와 지역을 선택해주세요</div>

							<button type="button" id="nationwideButton" class="btn1 nationwide-btn">
								전국 <i class="bi bi-chevron-down"></i>
								<!--         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"> -->
								<!-- 			  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/> -->
								<!-- 			</svg> -->
							</button>
						</div>
						
						<br> 
						<br>


					<!-- 지도-----------------------------------------------------------S -->
					<div id="map" style="width: 100%; height: 600px;"></div>

					</div>
					<script>			        

					</script>
				</div>
				
		

			</div>


		</div>
		

	</div>










	<!-- 모달 창 HTML -->
	<div id="myModal" class="modal">
		<!-- 모달 컨텐츠 -->
		<div class="modal-content">
			<span class="close">&times;</span>
			<!-- 탭 메뉴 -->
			<div class="tab">
				<button data-v-1a6cbb9c="" class="remove-button" style="display: none;"></button>
<!-- 				<button class="tablinks" onclick="openTab(event, 'Services')">서비스</button> --><!-- 231210주석처리 -->
				<button class="tablinks" onclick="openTab(event, 'Locations')">지역</button>
			</div>

			<!-- 서비스 탭 컨텐츠 -->
			<div id="Services" class="tabcontent">
				<div class="input-with-icon">
					<i class="fas fa-search"></i> <input data-v-1a6cbb9c="" type="text"
						placeholder="어떤 분야의 업체를 찾으세요?" autocomplete="off"
						class="autocomplete-input form-control" id="__BVID__494">
				</div>
				<hr class="custom-hr">
				<ul>
					<li>
						<div class="list-item">
							<a href="#서비스전체">서비스전체</a>
						</div>

					</li>
					<hr class="custom-hr">

					<li id="movingMenu"><a href="#"
						onclick="toggleSubMenu('subMenuMoving'); return false;">이사</a>
						<ul id="subMenuMoving" style="display: none;">
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#이사 전체">이사 전체</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#가정이사">가정이사</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#원룸이사">원룸이사</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#사무실이사">사무실이사</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#용달화물운송">용달/화물운송</a></li>
						</ul></li>
					<hr class="custom-hr">

					<li id="cleaningMenu"><a href="#"
						onclick="toggleSubMenu('subMenuCleaning'); return false;">청소/정리</a>
						<ul id="subMenuCleaning" style="display: none;">
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#청소/정리 전체">청소/정리 전체</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#철거정리">철거/정리</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item"><a href="#청소업체">청소 업체</a></li>
						</ul></li>

					<hr class="custom-hr">
					<li><a href="#청소/정리">수리/설치</a></li>
					<hr class="custom-hr">
					<li><a href="#청소/정리">인테리어/시공</a></li>
					<!-- 추가 서비스 목록 -->
				</ul>
			</div>

			<!-- 지역 탭 컨텐츠 -->
			<div id="Locations" class="tabcontent">
				<!--       <ul> -->
				<!--         <li><a href="#전국">전국</a></li> -->
				<!--          <hr class="custom-hr"> -->
				<!--         <li><a href="#서울">서울</a></li> -->
				<!--          <hr class="custom-hr"> -->
				<!--         <li><a href="#세종">세종</a></li> -->
				<!--          <hr class="custom-hr"> -->
				<!--         <li><a href="#강원">강원</a></li> -->
				<!--          <hr class="custom-hr"> -->
				<!--         <li><a href="#인천">인천</a></li> -->
				<!--         추가 지역 목록 -->
				<!--       </ul> -->
				<ul>
					<li class="modal-item">
						<div class="list-item">
							<a href="#서비스전체">전국</a>
						</div>

					</li>
					<hr class="custom-hr">

					<li id="seoulMenu">
<!-- 					<a href="#" onclick="toggleSubMenu(event, 'subMenuSeoul'); return false;">서울</a> -->
						<a href="#"	onclick="">서울</a>
						<ul id="subMenuSeoul" class="subMenu" style="display: none;">
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="서울"><a href="#서울 전체">서울 전체</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="서울"><a href="#강남구">강남구</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="서울"><a href="#강서구">강서구</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="서울"><a href="#구로구">구로구</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="서울"><a href="#노원구">노원구</a></li>
						</ul>
					</li>
					<hr class="custom-hr">

					<li id="incheonMenu">
<!-- 					<a href="#"	onclick="toggleSubMenu('subMenuIncheon'); return false;">인천</a> -->
						<a href="#"	onclick="">인천</a>
						<ul id="subMenuIncheon" class="subMenu" style="display: none;">
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="인천"><a href="#인천 전체">인천 전체</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="인천"><a href="#남동구">남동구</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="인천"><a href="#연수구">연수구</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="인천"><a href="#미추홀구">미추홀구</a></li>
						</ul>
					</li>

					<hr class="custom-hr">
					<li id="busanMenu"><a href="#부산">부산</a>
						<ul id="subMenuBusan" class="subMenu" style="display: none;">
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="부산"><a href="#부산 전체">부산 전체</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="부산"><a href="#남구">남구</a></li>
							<hr class="custom-hr">
							<li class="sub-menu-item" data-city="부산"><a href="#동구">동구</a></li>
						</ul>
					</li>

				</ul>
			</div>


		</div>
		

		
			
	</div>

<jsp:include page="../common/footer.jsp" />
<script>
var companyList = JSON.parse('${companyListJson}');
</script>
<script type="text/javascript" src="/resources/js/findmap.js"></script>
</body>
</html>