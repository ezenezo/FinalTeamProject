
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
		<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
			<!DOCTYPE html>
			<html>

			<head>
				<meta charset="UTF-8">
				<title>Insert title here</title>
				<link href="../../../resources/css/nav.css" rel="stylesheet" type="text/css">
				<link rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
				<link rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
				<style type="text/css">
					.navHr {
						display: none;
					}
				</style>
			</head>

			<body>
				<div class="total_nav">
					<div class="left_nav">
						<div class="logo">
							<a href="/req/main"> <span class="ezenDesign1">STYLE</span><span
									class="ezenDesign2">MATE</span>
							</a>
						</div>
						<div id="menu">
							<ul class="main1">
								<li><a href="/req/requestStart">견적요청</a></li>
								<li><a href="#">메이트찾기</a></li>
								<li><a href="#">업체포토폴리오</a></li>
								<li><a href="#">커뮤니티</a></li>
							</ul>
						</div>
					</div>

					<sec:authorize access="isAnonymous()">
						<div id="menu_m">
							<ul class="main_m">
								<li><a href="../member/login">로그인</a></li>
								<li><a href="#">회원가입</a></li>
								<li><a href="#">고객센터</a></li>
								<li><a href="#"><button class="gosu_btn">메이트가입</button></a></li>
							</ul>
						</div>
					</sec:authorize>

					<sec:authorize access="isAuthenticated()">
						<sec:authentication property="principal.mvo.id" var="authId" />
						<sec:authentication property="principal.mvo.authVOList" var="auths" />
						<input type="hidden" value="${authId}" id="alarm_id">
						<div id="menu_m">
							<ul class="main_m">
								<c:choose>


									<c:when
										test="${auths.stream().anyMatch(authVO -> authVO.auth.equals('ROLE_USER')).get()}">
										<li><a href="/quotation/list_user?id=${authId}">받은견적<span id="badge"
													style="visibility: hidden;"></span></a></li>

									</c:when>
									<c:when
										test="${auths.stream().anyMatch(authVO -> authVO.auth.equals('ROLE_COM')).get()}">
										<li><a href="/quotation/list?id=${authId}">받은요청<span id="badge"
													style="visibility: hidden;"></span></a></li>



									</c:when>

								</c:choose>

								<li><a href="/member/list" class="chat_class">채팅<span id="chat_badge">1</span></a></li>
								<li id="bell_icon"><a href="/member/list"><span class="material-symbols-outlined">
											notifications </span></a></li>
								<li>
									<div class="profile">
										<img alt="프로필이미지 없음" src="../../resources/img/프로필지정안함.png"
											style="width: 35px; height: 35px;" class="profile_img">
									</div>
									<div class="usermenu-dropdown" style="visibility: hidden;">
										<div data-name="user-info">
											<h4 data-name="name" class="usermenu-dropdown-name">${authId}
												고객님</h4>


										</div>
										<ul data-name="usermenu-control">
								<li class="row" style="display: none;">
									<div class="col">프로필 관리</div>
								</li>
								<li class="row1">
									<div class="col">받은 견적</div>
								</li>
								<li class="row2">
									<div class="col">
										<a href="/member/myPage?id=${authId}">마이페이지</a>
									</div>
								</li>
								<li>
									<div class="hr_usermenu"></div>
								</li>
							</ul>

							<button type="button" class="_btn">
								<a href="/customer/customerService"> <span
									class="material-symbols-outlined" id="icon_drop">
										headset_mic </span>고객센터
								</a>

							</button>

							<div class="logout">
								<button type="button" class="logout_btn"
									id="id_usermenu-dropdown_btn">
									<a href="/member/logout"> 로그아웃</a>
								</button>
							</div>



						</div>

					</li>
				</ul>
						</div>
					</sec:authorize>
				</div>
				<hr class="navHr">
				<script src="/resources/js/main_alarm.js"></script>

				<script type="text/javascript">
					const profile = document.querySelector('.profile');
					const usermenu = document.querySelector('.usermenu-dropdown');

					profile.addEventListener('click', function () {
						event.stopPropagation();
						if (usermenu.style.visibility == 'hidden') {
							usermenu.style.visibility = 'visible';
							profile.style.boxShadow = '0 0 0px 2px #00000063';
						} else {
							usermenu.style.visibility = 'hidden'
							profile.style.boxShadow = 'none';
						}
					});

					document.addEventListener('click', function () {
						usermenu.style.visibility = 'hidden';
						profile.style.boxShadow = 'none';
					});


				

				</script>
			</body>

			</html>
