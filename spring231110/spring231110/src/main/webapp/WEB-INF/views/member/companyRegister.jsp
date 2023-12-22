<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<!-- 부트스트랩 -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
<!-- sweetAlert -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
<!-- css -->
<link href="../resources/css/register.css" rel="stylesheet">
<meta charset="UTF-8">
<title>Join Page</title>
</head>
<body>
	<section>
		<jsp:include page="../common/nav.jsp" />
		<div class="jb-container">
			<div class="title">메이트 가입</div>
			<!-- 회원 등록 폼 -->
			<form action="/member/companyRegister" method="post"
				enctype="multipart/form-data" class="form">
				<input type="text" id="provider" name="provider" hidden="hidden">
				<div id="test">
					<div class="mb-3 input-group-lg">
						<p>업체명</p>
						<input type="text" class="form-control mb-3" name="userNm"
							placeholder="이름" id="userNm">
					</div>
				</div>
				<div class="mb-3 input-group-lg idInputBox">
					<p id="idP">아이디</p>
					<div class="idBox">
						<input type="text" class="form-control mb-3 idInput" name="id"
							placeholder="아이디" id="id">
						<button type="button" id="checkId">중복 확인</button>
					</div>
				</div>
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
				<div class="mb-3 input-group-lg">
					<p id="emailP">이메일</p>
					<input type="email" class="form-control mb-3" name="email"
						placeholder="이메일" id="email">
				</div>
				<div class="mb-3 input-group-lg">
					<p id="phoneP">전화번호</p>
					<input type="text" class="form-control mb-3" name="phone"
						placeholder="ex ) 010-1111-1111" id="phone">
					<p class="phone none red">올바르지 않은 전화번호 형태입니다.</p>
				</div>
				<div class="mb-3 input-group-lg">
					<p id="addrP">주소</p>
					<div class="addrBox">
						<input type="text" id="zoneCode" class="form-control mb-3"
							placeholder="우편번호" name="zoneCode"> <input type="button"
							class="form-control mb-3 addrBtn" onclick="inputAddr()"
							value="우편번호 찾기"><br>
					</div>
					<input type="text" id="address" class="form-control mb-3"
						placeholder="주소" name="address"><br> <input type="text"
						class="form-control mb-3" id="detailAddress" placeholder="상세주소"
						name="detailAddress"> <input type="text" id="extraAddress"
						class="form-control mb-3" placeholder="참고항목" name="extraAddress">
				</div>
				<div class="mb-3 profileBox">
					<label class="form-label">메이트 대표 이미지</label>
					<div class="fileUploadDiv">
						<input class="form-control mb-3" type="file" name="profile"
							id="file">
						<button type="button" id="selectFile">파일 선택</button>
					</div>
				</div>

				<!-- 이용약관 체크 -->
				<div class="checkBoxDiv">
					<p class="agreeP">약관 동의</p>
					<div class="agree1">
						<div class="agreeBox">
							<input type="checkbox" class="checkbox check" id="agree1Check"><span>(필수)
								이용약관 동의</span>
						</div>
						<button type="button" class="allRead" id="agree1Btn"
							onclick="modalOpen()">전문보기</button>
					</div>
					<div class="agree2">
						<div class="agreeBox">
							<input type="checkbox" class="checkbox check" id="agree2Check"><span>(필수)
								개인정보취급 동의</span>
						</div>
						<button type="button" class="allRead" onclick="modalOpen2()">전문보기</button>
					</div>
				</div>

				<div class="btnContainer">
					<button type="submit" class="joinBtn">가입</button>
				</div>
			</form>

			<!-- 아이디 중복체크 확인용 -->
			<input type='text' id="checkIdResult" hidden="hidden">
			<!-- 비밀번호 정규표현식 확인용 -->
			<input type='text' id="checkPwResult" hidden="hidden">
			<!-- 비밀번호 일치 확인용 -->
			<input type='text' id="checkPwOkResult" hidden="hidden">
			<!-- 이미지 정규표현식 확인용 -->
			<input type='text' id="checkImgResult" hidden="hidden">
			<!-- 전화번호 정규표현식 확인용 -->
			<input type='text' id="checkPhoneResult" hidden="hidden">

			<!-- 로그인 창으로 넘어가기 -->
			<div class="LoginPageDiv">
				<p class="moveLoginPage">이미 가입된 아이디가 있으신가요?</p>
				<a href="/member/login">로그인</a>
			</div>
		</div>
		<jsp:include page="../member/agree.jsp" />
	</section>
	<script type="text/javascript" src="../resources/js/companyRegister.js"></script>
	<script
		src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
</body>
<link href="../resources/css/registerNav.css" rel="stylesheet">
</html>
