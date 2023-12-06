<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<!-- sweetAlert -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
<!-- css -->
<link href="../resources/css/register.css" rel="stylesheet">
<link href="../resources/css/nav.css" rel="stylesheet">
<meta charset="UTF-8">
<title>Join Page</title>
</head>
<body>
	<jsp:include page="../common/nav.jsp" />
	<section>
		<div class="jb-container">
			<div class="title">추가 정보 입력</div>
			<!-- 회원 등록 폼 -->
			<form action="/member/register" method="post"
				enctype="multipart/form-data" class="form">
				<input type="text" id="provider" name="provider"
					value="${provider }" hidden="hidden">

				<div id="test">
					<div class="mb-3 input-group-lg">
						<p>이름</p>
						<input type="text" class="form-control mb-3" name="userNm"
							placeholder="이름" id="userNm">
					</div>
				</div>
				<input type="text" class="form-control mb-3 idInput" name="id"
					placeholder="아이디" id="id" value="${id }" hidden="hidden"> <input
					type="email" class="form-control mb-3" name="email"
					placeholder="이메일" id="email" value="${email }" hidden="hidden">
				<div class="mb-3 profileBox">
					<label class="form-label">프로필 이미지</label>
					<div class="fileUploadDiv">
						<input class="form-control mb-3" type="file" name="profile"
							id="file">
						<button type="button" id="selectFile">파일 선택</button>
					</div>
				</div>

				<!-- 이용약관 체크 -->
				<div class="checkBoxDiv">
					<div class="allAgree">
						<input type="checkbox" class="checkbox" id="checkAll"><span>전체
							동의</span>
					</div>
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

			<!-- 이미지 정규표현식 확인용 -->
			<input type='text' id="checkImgResult" hidden="hidden">
		</div>
		<jsp:include page="../member/agree.jsp" />
	</section>
	<script type="text/javascript" src="../resources/js/moreInfo.js"></script>
</body>
</html>
