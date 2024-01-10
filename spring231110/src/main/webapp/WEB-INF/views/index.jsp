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

<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
<link rel="stylesheet" href="/resources/css/index.css">
<script
	src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

<title>메인 페이지</title>

</head>



<body class="indexBody">

	<header>
		<div class="headerContainer" id="headerContainer">
			<div>
				<span class="ezenDesign1">STYLE</span><span class="ezenDesign2">MATE</span>
			</div>
			<ul class="boxContainer">
				<a href="/member/login">
					<li>What we create(login)</li>
				</a>
				<a href="/common/main">
					<li>Careers(main)</li>
				</a>
				<a href="/customer/enter">
					<li>Investment</li>
				</a>
			</ul>
		</div>

	</header>



	<!-- Slider main container -->
	<div class="swiper">
		<!-- Additional required wrapper -->
		<div class="swiper-wrapper">
			<!-- Slides1 -->
			<div class="swiper-slide">
				<a href="#" class="slideP"> <video autoplay loop muted
						preload="none" class="video">
						<source src="/resources/movie/indexMovie.mp4" type="video/mp4">
					</video>
					<div class="text">
						<p id="mainText">
							<strong>IMAGINE </strong><span>YOUR DREAM.</span><span> WE
								CREATE</span><strong> REALITY</strong>
						</p>
					</div>
				</a>
			</div>

		</div>
	</div>

	<div id="backgroundImg1">
		<div class="secText" id="secText">
			<h3>Company</h3>
			<p>
				<strong>고객의 꿈, </strong> <span>그리고 </span> <span><strong>맞춤공간</strong>을</span><br>
				<span>실현하기 위해 </span> <strong>열정</strong> <span>을 다합니다.</span>
			</p>
			<p>
				스타일메이트는 고객의 꿈을 이루어 드릴 수 있는<br> 준비된 공간전문가 집단입니다.
			</p>

			<a href="/common/main"><span>STYLE MATE</span><img
				src="/resources/img/arrow.png">
			</a>
		</div>

	</div>
	
	<jsp:include page="common/footer.jsp"></jsp:include>


	<script src="/resources/js/index.js"></script>


</body>

</html>