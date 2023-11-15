<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>	
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<<<<<<< HEAD
<title>Insert title here</title>
</head>
<body>
<jsp:include page="../common/header.jsp"/>
<jsp:include page="../common/nav.jsp"/>
<!-- email, pwd, nick_name 받기 -->
<div class="container">
<form action="/member/register" method="post">
	<h4 class="mb-3">Input your Information</h4>
	<div class="mb-3">
	  <label for="e" class="form-label">ID</label>
	  <input type="text" class="form-control" name="id" id="e">
	</div>
	<div class="mb-3">
	  <label for="p" class="form-label">PASSWORD</label>
	  <input type="password" class="form-control"  name="pw" id="p">
	</div>
	<button class="w-100 btn btn-primary btn-lg my-5" type="submit">가입입력</button>
</form>
</div>

<jsp:include page="../common/footer.jsp"></jsp:include>
=======
<title>Join Page</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link href="../resources/css/register.css" rel="stylesheet">
</head>
<body>
	<!-- 사원 등록 폼 -->
	<div class="jb-container">
		<form action="/member/register" method="post"
			enctype="multipart/form-data">
			<div id="test">
				<select class="selectInput" name="depCd"
					aria-label="Default select example">
					<option selected>부서 선택</option>
					<option value="sales">영업</option>
					<option value="human">인사</option>
					<option value="general">총무</option>
				</select>
				<div class="mb-3 input-group-lg">
					<input type="text" class="inputCss t2" name="empNm"
						placeholder="Name">
				</div>
			</div>
			<div class="mb-3 input-group-lg">
				<input type="text" class="inputCss" name="id" placeholder="Id">
			</div>
			<div class="mb-3 input-group-lg">
				<input type="text" class="inputCss" name="pw" placeholder="Password">
			</div>
			<div class="mb-3 input-group-lg">
				<input type="text" class="inputCss" name="addr"
					placeholder="Address">
			</div>
			<div class="mb-3 input-group-lg">
				<input type="text" class="inputCss" name="phone" placeholder="Phone">
			</div>
			<div class="mb-3 input-group-lg">
				<input type="text" class="inputCss" name="empBirth"
					placeholder="birth(6자리)">
			</div>
			<div class="mb-3">
				<label for="f" class="form-label">프로필 이미지</label> <input
					class="form-control" type="file" id="f" name="profiles">
			</div>

			<div class="btnContainer">
				<button type="submit" class="joinBtn">사원 등록</button>
			</div>
		</form>

		<!-- 로그인 창으로 넘어가기 -->
		<a href="/member/login" >이미 가입된 아이디가 있으신가요?</a>
		<div class="explanation">
			<p>로그인 페이지로 넘어가기</p>
		</div>
	</div>

>>>>>>> origin/main
</body>
</html>