<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link href="../resources/css/customerService.css" rel="stylesheet">
<script type="text/javascript" src="../resources/js/customerService.js"></script>
</head>
<body>
	<jsp:include page="../common/nav.jsp" />
	<section>
		<!-- 기본 정보 -->
		<div class="companyInfo">
			<div class="info_left">
				<h2>무엇을 도와드릴까요?</h2>
				<div class="question">
					<div class="accordion-item" id="question1">
						<div class="accordion_title">
							<div class="accordion_left">
								<span class="material-symbols-outlined"> question_mark </span>주문
								취소는 어떻게 하나요?
							</div>
						</div>
					</div>
					<div class="accordion-item" id="question2">
						<div class="accordion_title">
							<div class="accordion_left">
								<span class="material-symbols-outlined"> question_mark </span>비밀번호
								변경은 어떻게 하나요?
							</div>
						</div>
					</div>
					<div class="accordion-item" id="question3">
						<div class="accordion_title">
							<div class="accordion_left">
								<span class="material-symbols-outlined"> question_mark </span>결제
								방법은 어떤 것이 있나요?
							</div>
						</div>
					</div>
					<div class="accordion-item" id="question4">
						<div class="accordion_title">
							<div class="accordion_left">
								<span class="material-symbols-outlined"> question_mark </span>메이트
								계정은 무엇인가요?
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="info_right">
				<h2>
					고객센터<span>9:00 ~ 18:00</span>
				</h2>
				<ul>
					<li>• 평일: 전체 문의 상담</li>
					<li>• 토요일, 공휴일: 이사/시공/제품설치 문의 상담</li>
					<li>• 일요일: 휴무</li>
				</ul>
				<div class="phone">
					<span class="material-symbols-outlined"> call </span> 111-1111-1111
				</div>
				<div>
					<button class="consulting">1:1 상담하기</button>
					<button class="email">이메일 문의하기</button>
				</div>
			</div>
		</div>
		<hr>
		<div class="btnBox">
			<button type="button" id="search" value="all">전체</button>
			<button type="button" id="search" value="주문/결제">주문/결제</button>
			<button type="button" id="search" value="취소/환불">취소/환불</button>
			<button type="button" id="search" value="증빙서류발급">증빙서류발급</button>
			<button type="button" id="search" value="로그인/회원정보">로그인/회원정보</button>
			<button type="button" id="search" value="서비스/기타">서비스/기타</button>
		</div>

		<!-- 아코디언 -->
		<div class="accordion">
			<div class="accordion-item">
				<div class="accordion_title">
					<div class="accordion_left">
						<span class="material-symbols-outlined"> question_mark </span>주문
						내역은 어떻게 확인할 수 있나요?
					</div>
					<div class="accordion_right">
						<span class="material-symbols-outlined expand"> expand_more
						</span>
					</div>
				</div>
				<div class="accordion_body">우측 상단 프로필 사진을 클릭 후 [마이페이지]를 통해 확인
					가능합니다</div>
			</div>
		</div>
	</section>
	<jsp:include page="../common/footer.jsp" />
	<script type="text/javascript">
		spreadServiceList('all');
	</script>
</body>
</html>