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
<title>페이지 제목</title>
<link href="<c:url value='/resources/css/l_side.css'/>" rel="stylesheet"
	type="text/css">
<<<<<<< HEAD
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
=======
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
</head>

<body class="body">
	<!-- 왼쪽 사이드 메뉴 -->
	<div class="left_sidemenu_div">
<<<<<<< HEAD
		<div class="logo">
				<span class="ezenDesign1">STYLE</span><span class="ezenDesign2">MATE</span>
		</div>
		<ul class="left_sidemenu">
			  <li id="mainmenu">
			 <div id="hover_menu1">
        <a href="#" onclick="getCommentList()" id="mainmenu_text" >
            <i class="bi bi-1-square-fill"></i> 유형고르기
        </a>
        </div>
        </li>
        
        
        
        
			<li id=""> <div id="hover_menu2">
        <a href="#" onclick="getCommentList_1()" id="form_choice" class="hover_menu">
            <i class="bi bi-2-square-fill"></i> 형태고르기
        </a> </div></li>
       
        <li id=""> <div id="hover_menu3">
        <a href="#" id="choice_2" class="hover_menu">
            <i class="bi bi-3-square-fill"></i>공사 범위/상태
        </a></div></li>
         <li id=""><div id="hover_menu4">
        <a href="#" onclick="getCommentList_3()" id="choice_3" class="hover_menu">
            <i class="bi bi-4-square-fill"></i>주소 선택
        </a></div></li>
                <li id=""><div id="hover_menu5">
        <a href="#" onclick="getCommentList_4()" id="choice_4" class="hover_menu">
            <i class="bi bi-5-square-fill"></i>추가 질문
        </a></div></li>
		</ul>

	</div>
	

=======
		<div class="c_logo">
			<a href="index"> <img alt="회사로고 없음"
				src="../../resources/img/회사로고.jpg">
			</a> <a href="index">EZEN</a>
		</div>
		<ul class="left_sidemenu">
			<li id="mainmenu"><a href="#" data-hover="예약"><i
					class="bi bi-bookmarks"></i>예약</a>
				<ul class="submenu">
					<li><a href="#">주차등록</a></li>
					<li><a href="#">회의실예약</a></li>
					<li><a href="#">휴가신청</a></li>
					<li><a href="/board/register">게시판등록</a></li>
				</ul></li>
			<li id="mainmenu"><a href="#" data-hover="게시판"><i
					class="bi bi-card-text"></i>게시판</a>
				<ul class="submenu">
					<li><a href="#">공지사항</a></li>
					<li><a href="/board/departBoardList">부서게시판</a></li>
					<li><a href="/board/anonymousBoardList">익명게시판</a></li>
				</ul></li>
			<li id="mainmenu"><a href="#"><i class="bi bi-airplane"></i>동호회</a>
				<ul class="submenu">
					<li><a href="#">동호회신청</a></li>
					<li><a href="/board/clubBoardList">동호회게시판</a></li>
				</ul></li>
			<li id="mainmenu"><a href="#"><i class="bi bi-check2-square"></i>승인</a>
				<ul class="submenu">
					<li><a href="/approval/clubApproval">동호회 등록</a></li>
					<li><a href="#">차량 등록</a></li>
					<li><a href="#">사원 등록</a></li>
					<li><a href="#">사원 목록</a></li>

				</ul></li>
			<li id="mainmenu"><a href="#"><i class="bi bi-door-open"></i>멤버확인용</a>
				<ul class="submenu">
				<li><a>${user.userNm }</a></li>
					<c:if test="${user==null }">
						<li><a href="/member/register">회원가입</a></li>
					</c:if>
					<li><a href="#">동호회 설정</a></li>
					<li><a href="/member/login">로그인</a></li>
					<li><a href="/member/logout">로그아웃</a></li>
					<li><a href="/member/list">회원 리스트</a></li>
				</ul></li>
		</ul>
	</div>
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
</body>
</html>