<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Join Page</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link href="../resources/css/register.css" rel="stylesheet">
<link href="../resources/css/checkMemberInfo.css" rel="stylesheet">
</head>
<body>
<jsp:include page="../common/nav.jsp"></jsp:include>
	<section>
		<!-- 본인 확인 폼 -->
		<div class="jb-container">
			<div class="title">비밀번호 찾기</div>
			<form action="/member/checkMemberInfo" method="post" class="form">
				<div class="mb-3 input-group-lg">
					<p>이메일</p>
					<input type="email" class="form-control mb-3" name="email"
						placeholder="이메일" id="email">
				</div>
				<div class="mb-3 input-group-lg">
					<p>아이디</p>
					<input type="text" class="form-control mb-3" name="id"
						placeholder="아이디" id="id">
				</div>

				<div class="btnContainer">
					<button type="submit" class="joinBtn">본인 확인</button>
				</div>
			</form>

			<!-- 로그인 창으로 넘어가기 -->
			<div class="LoginPageDiv">
				<p class="moveLoginPage">로그인 창으로 돌아가기</p>
				<a href="/member/login">로그인</a>
			</div>
		</div>

		<!-- 생년월일 정규표현식 확인용 -->
		<input type='text' id="checkBirthResult" hidden="hidden">

		<script type="text/javascript"
			src="../resources/js/checkMemberInfo.js"></script>
	</section>
	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
</html>