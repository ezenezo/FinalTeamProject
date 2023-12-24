<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link href="../resources/css/enter.css" rel="stylesheet">
<body>
	<jsp:include page="../common/nav.jsp" />

	<!-- 메인 -->
	<section>
		<div class="beige">
			<div class="beige1"></div>
			<img alt="" src="../resources/img/img1.png" class="img1">
			<div class="beige2"></div>
		</div>
		<div class="yellow">
			<img alt="" src="../resources/img/img2.png" class="img2">
		</div>
		<div class="why">
			<p class="whyTitle wow animate__animated animate__fadeInUpBig"
					data-wow-offset="10">스타일 메이트와 함께해야 하는 이유</p>
			<p class="whySubTitle wow animate__animated animate__fadeInUpBig"
					data-wow-offset="15">이 모든 혜택을 누릴 수 있습니다</p>
			<div class="reasonBox">
				<div class="reason wow animate__animated animate__fadeInUpBig"
					data-wow-offset="17" id="reason1">
					<img>
					<div>
						<p class="reason1">고정적인 수익 모델 제공</p>
						<p class="reason2">
							비수기 없이 안정적으로<br>보장되는 고객 정보 매칭 서비스
						</p>
					</div>
				</div>
				<div class="reason wow animate__animated animate__fadeInUpBig"
					data-wow-offset="17" data-wow-delay="0.1s" id="reason2">
					<img>
					<div>
						<p class="reason1">지역 기반 고객 필터링</p>
						<p class="reason2">지역/예산/스타일 기준으로 원하는 맞춤 견적 분배</p>
					</div>
				</div>
				<div class="reason wow animate__animated animate__fadeInUpBig"
					data-wow-offset="17" data-wow-delay="0.2s" id="reason3">
					<img>
					<div>
						<p class="reason1">다양한 채널 홍보</p>
						<p class="reason2">다양한 마케팅 활동을 통해 시공 사례 디지털 홍보</p>
					</div>
				</div>
			</div>
			<div class="review wow animate__animated animate__fadeInUpBig"
					data-wow-offset="20" data-wow-delay="0.2s">
				<p class="reviewTitle">시공사례 무료 촬영 & 고객 후기 관리</p>
				<p class="subreview">
					전문 포토그래퍼의 시공 사례 영상과 이미지로<br>우리 업체 포트폴리오를 만들어 보세요.
				</p>
				<p class="subreview">
					스타일메이트 후기 이벤트로 고객의 양질 후기까지<br>한 번에 관리해 드립니다!
				</p>
			</div>
		</div>

		<div class="mint">
			<p class="whyTitle wow animate__animated animate__fadeInUpBig"
					data-wow-offset="25">메이트들의 생생한 후기</p>
			<div class="reviewBox">
				<div class="review1 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="26">
					<p>스타일메이트는 고객중심적 가치로 꾸준히 발전하는 플랫폼이라고 느꼈습니다. 메이트 혜택과 브랜드 파워가 계약에
						정말 큰 도움이 되고 있어요.</p>
					<div class="companyBox">
						<div class="companyImg companyImg1">
							<img
								src="data:image/jpeg;base64,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">
						</div>
						<div class="companyInfo">
							<p class="companyName">주람공사</p>
							<p class="companyCount">총 공사 40건 이상</p>
						</div>
					</div>
				</div>
				<div class="review1 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="26" data-wow-delay="0.1s">
					<p>여러 중개 사이트와 비교해봤을 때, 타 사이트보다 고객과의 신뢰 관계가 탄탄해요. 실제 계약 성사율도
						올랐어요.</p>
					<div class="companyBox">
						<div class="companyImg">
							<img
								src="data:image/jpeg;base64,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">
						</div>
						<div class="companyInfo">
							<p class="companyName">배곧인테리어</p>
							<p class="companyCount">총 공사 70건 이상</p>
						</div>
					</div>
				</div>
				<div class="review1 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="26" data-wow-delay="0.2s">
					<p>정확한 고객정보 중개, A/S 혜택 등이 영업의 큰 도움이 되고 있어요. 집닥이라는 브랜드 파워로 마케팅
						효과까지 얻을 수 있었어요.</p>
					<div class="companyBox">
						<div class="companyImg companyImg33">
							<img
								src="data:image/jpeg;base64,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">
						</div>
						<div class="companyInfo">
							<p class="companyName">예일아이디</p>
							<p class="companyCount">총 공사 40건 이상</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="step">
			<p class="whyTitle wow animate__animated animate__fadeInUpBig"
					data-wow-offset="30">메이트 가입 절차</p>
			<p class="whySubTitle wow animate__animated animate__fadeInUpBig"
					data-wow-offset="31">쉽고 빠르게 가입하고 매출을 올려보세요</p>
			<div class="stepBox">
				<div class="step1 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32">
					<p class="stepTitle">회원가입</p>
					<p class="stepSubTitle">
						휴대폰 인증 및<br>사업자 정보 등록 후 간편가입
					</p>
				</div>
				<span class="material-symbols-outlined wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32"> chevron_right </span>
				<div class="step2 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32" data-wow-delay="0.1s">
					<p class="stepTitle">담당자 지정</p>
					<p class="stepSubTitle">
						전담 담당자 배정 및<br>상품 등록절차 안내
					</p>
				</div>
				<span class="material-symbols-outlined wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32" data-wow-delay="0.1s"> chevron_right </span>
				<div class="step3 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32" data-wow-delay="0.2s">
					<p class="stepTitle">정보 등록 및 결제</p>
					<p class="stepSubTitle">
						파트너스 사업장 지역, 시공 가능<br>영역 정보 등록 및 상품 결제
					</p>
				</div>
				<span class="material-symbols-outlined wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32" data-wow-delay="0.2s"> chevron_right </span>
				<div class="step4 wow animate__animated animate__fadeInUpBig"
					data-wow-offset="32" data-wow-delay="0.3s">
					<p class="stepTitle">고객 매칭</p>
					<p class="stepSubTitle">
						파트너스 대상 적합 고객<br>필터링 후 매칭
					</p>
				</div>
			</div>
		</div>
		<div class="purple">
			<div class="purpleBox">
				<p class="wow animate__animated animate__fadeInUpBig"
					data-wow-offset="35">
					지금 스타일메이트의 메이트로 가입하고<br> <strong>사장님 지역의 고객</strong>을 만나보세요
				</p>
				<a href="/member/companyRegister"><button type="button"
						class="mateRegisterBtn wow animate__animated animate__fadeInUpBig"
					data-wow-offset="38">메이트 가입하기</button></a>
			</div>
		</div>
	</section>

	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
<script src="/resources/js/wow.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
<script type="text/javascript">
	new WOW().init();
</script>
</html>