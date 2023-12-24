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
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
</head>

<body class="body">
	<!-- 왼쪽 사이드 메뉴 -->
	<div class="left_sidemenu_div">
		<div class="logo">
				<span class="ezenDesign1">STYLE</span><span class="ezenDesign2">MATE</span>
		</div>
		<ul class="left_sidemenu">
			  <li id="mainmenu">
			 <div id="hover_menu1">
        <a href="#" onclick="getCommentList()" id="mainmenu_text" class="hover_menu" >
            <i class="bi bi-1-square-fill"></i> 공간고르기
        </a>
        </div>
        </li>
        
        
        
        
			<li id=""> <div id="hover_menu2">
        <a href="#" onclick="handleClick()" id="form_choice" class="hover_menu">
            <i class="bi bi-2-square-fill"></i> 유형고르기
        </a> </div></li>
       
        <li id=""> <div id="hover_menu3">
        <a href="#" id="choice_2" onclick="getCommentList_2_1()" class="hover_menu">
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
          <li id=""><div id="hover_menu6">
        <a href="#" onclick="final_req()" id="choice_5" class="hover_menu">
            <i class="bi bi-5-square-fill"></i>견적서 확인하기
        </a></div></li>
		</ul>

	</div>
	

</body>
</html>