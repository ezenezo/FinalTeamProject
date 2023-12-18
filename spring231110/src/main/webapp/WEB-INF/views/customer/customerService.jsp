<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link href="../resources/css/customerService.css" rel="stylesheet">
</head>
<body>
	<jsp:include page="../common/nav.jsp" />
	<section>
		<!-- 기본 정보 -->
		<div class="companyInfo"></div>

		<div class="btnBox">
			<button type="button">전체</button>
			<button type="button">주문/결제</button>
			<button type="button">배송관련</button>
			<button type="button">취소/환불</button>
			<button type="button">반품/교환</button>
			<button type="button">증빙서류발급</button>
			<button type="button">로그인/회원정보</button>
			<button type="button">서비스/기타</button>
		</div>

		<!-- 아코디언 -->
		<div class="accordion accordion-flush">
			<div class="accordion-item">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed" type="button"
						data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
						aria-expanded="false" aria-controls="flush-collapseOne">
						<span class="material-symbols-outlined"> question_mark </span>주문
						내역은 어떻게 확인할 수 있나요?
					</button>
				</h2>
				<div id="flush-collapseOne" class="accordion-collapse collapse"
					data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						우측 상단 프로필 사진을 클릭 후 [마이페이지]를 통해 확인 가능합니다
					</div>
				</div>
			</div>
			<div class="accordion-item">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed" type="button"
						data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
						aria-expanded="false" aria-controls="flush-collapseOne">
						<span class="material-symbols-outlined"> question_mark </span>주문
						내역은 어떻게 확인할 수 있나요?
					</button>
				</h2>
				<div id="flush-collapseTwo" class="accordion-collapse collapse"
					data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						우측 상단 프로필 사진을 클릭 후 [마이페이지]를 통해 확인 가능합니다
					</div>
				</div>
			</div>
			<div class="accordion-item">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed" type="button"
						data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
						aria-expanded="false" aria-controls="flush-collapseOne">
						<span class="material-symbols-outlined"> question_mark </span>주문
						내역은 어떻게 확인할 수 있나요?
					</button>
				</h2>
				<div id="flush-collapseThree" class="accordion-collapse collapse"
					data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						우측 상단 프로필 사진을 클릭 후 [마이페이지]를 통해 확인 가능합니다
					</div>
				</div>
			</div>
			<div class="accordion-item">
				<h2 class="accordion-header">
					<button class="accordion-button collapsed" type="button"
						data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
						aria-expanded="false" aria-controls="flush-collapseOne">
						<span class="material-symbols-outlined"> question_mark </span>주문
						내역은 어떻게 확인할 수 있나요?
					</button>
				</h2>
				<div id="flush-collapseOne" class="accordion-collapse collapse"
					data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						우측 상단 프로필 사진을 클릭 후 [마이페이지]를 통해 확인 가능합니다
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
</html>