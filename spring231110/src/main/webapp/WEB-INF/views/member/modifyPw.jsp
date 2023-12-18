<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Join Page</title>
<link href="../resources/css/login.css" rel="stylesheet">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link href="../resources/css/register.css" rel="stylesheet">
</head>
<body>
<jsp:include page="../common/nav.jsp"></jsp:include>
	<section>
		<!-- 사원 등록 폼 -->
		<div class="jb-container">
			<div class="title title_2">새로운 비밀번호</div>
			<form action="/member/modifyPw" method="post"
				enctype="multipart/form-data" class="form">
				<div class="mb-3 input-group-lg pwBox">
					<p>비밀번호</p>
					<input type="password" class="form-control mb-3" name="pw"
						placeholder="비밀번호" id="pw"> <i
						class="bi bi-eye-slash-fill" id="eye1"></i>
					<p class="password none red">비밀번호는 최소 8 자, 문자와 숫자가 포함되어야 합니다.
					<p class="passwordOk none green">사용가능한 비밀번호입니다.</p>
				</div>
				<div class="mb-3 input-group-lg pwBox">
					<p>비밀번호 확인</p>
					<input type="password" class="form-control mb-3" placeholder="비밀번호"
						id="pwCheck"> <i class="bi bi-eye-slash-fill" id="eye2"></i>
					<p class="passwordCheck none red">비밀번호가 일치하지 않습니다.</p>
					<p class="passwordCheckOk none green">비밀번호가 일치합니다.</p>
				</div>
				<!-- id 넘기기용 hidden input -->
				<div class="mb-3 input-group-lg" hidden="hidden">
					<input type="text" class="inputCss" name="id" value="${id }">
				</div>
				<div class="btnContainer">
					<button type="submit" class="joinBtn">비밀번호 변경</button>
				</div>
			</form>
		</div>
		<!-- 비밀번호 정규표현식 확인용 -->
		<input type='text' id="checkPwResult" hidden="hidden">

		<script type="text/javascript" src="../resources/js/modifyPw.js"></script>
	</section>
</body>
</html>
