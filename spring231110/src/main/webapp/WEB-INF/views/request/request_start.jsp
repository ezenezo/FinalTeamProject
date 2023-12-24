<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>메인 페이지</title>


<!-- css 관련 설정-->


<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">

<link href="<c:url value='/resources/css/request/request_start.css'/>"
	rel="stylesheet" type="text/css">
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">


</head>


<body>

	<jsp:include page="../common/nav.jsp" />
<c:set value="${pno}" var="pno"></c:set>
<input value="${pno}" type="hidden">
	<div class="total">
		<!-- 		<div class="subject">주제입니다.</div> -->
		<div class="content">
			<div class="left" style="width: 50%; height: 70vh;">
				<div class="left_into">
					<img alt="이미지 없음" src="../../resources/img/start.jpg"
						class="into_img">
				</div>
			</div>
			<div class="right" style="width: 48%;">
				<h2>
					인테리어를 <em class="em_color">감각적이며 트렌디한 업체</em>에게<br>하루 안에 견적을
					받아보세요
				</h2>
				<div class="right_total_detail">
					<div class="into_info">
						<div class="froemR">
							<div class="no_money">
								<i class="bi bi-currency-exchange"></i>
								<p class="explanation">
									<b>별도 비용이 들지 않아요<br></b>인테리어 업체에게 별도 비용 없이 <br>제안서와
									견적,포트폴리오를 받아볼 수 있어요.
								</p>
							</div>
							<hr>
							<div class="yes_call">
								<i class="bi bi-telephone-fill"></i>
								<p class="explanation">
									<b>매칭 요청 후 유선상담이 진행돼요<br></b>고객님께 딱 맞는 업체 매칭을 위해 <br>담당
									매니저가 구체적인 내용을 확인합니다.
								</p>

							</div>
						</div>

					</div>
					<a href="/req/request?pno=${pno}">
						<button type="button" class="start_btn">
							시작하기<span class="material-symbols-outlined" style="COLOR: WHITE;">
								keyboard_arrow_right </span>
						</button>

					</a>
					<p class="explanation_time">약 2분 소유</p>
				</div>


			</div>
		</div>
	</div>

	<jsp:include page="../common/footer.jsp" />



</body>

</html>