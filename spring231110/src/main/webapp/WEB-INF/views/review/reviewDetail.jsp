<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>PortfolioDetail Page</title>
<link rel="stylesheet" href="../resources/css/reviewDetail.css">
<!-- TUI 에디터 CSS CDN -->
<!-- <link rel="stylesheet"
	href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
 -->
</head>
<body>
	<jsp:include page="../common/nav.jsp"></jsp:include>

	<div class="mainImgBox">
		<img class="portfolioMainImg"
			src="/upload/${rdto.reviewMainImg.saveDir}/${fn:replace(rdto.reviewMainImg.saveDir,'\\','-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">

	</div>



	<div class="box">
		<div class="box2">
			<sec:authorize access="isAuthenticated()">
				<sec:authentication property="principal.mvo.id" var="authId" />
				<input type="hidden" id="authId" value="${authId}">
				<c:choose>
					<c:when test="${authId eq rdto.rvo.id}">
						<div class="modDel">
							<a href="/review/modifyReview?rno=${rdto.rvo.rno}"><p
									id="modBtn">수정</p></a>
							<p class="classify">|</p>
							<p id="delBtn">삭제</p>
						</div>
					</c:when>
					<c:otherwise>
						<div class="he56"></div>

					</c:otherwise>
				</c:choose>
			</sec:authorize>
			<h1 class="topTitle">${rdto.rvo.title}</h1>
			<div class="top">
				<div>
					<div class="leftBox">
						<div class="left1">
							<img alt="프로필 사진 없음" src="../../../resources/img/profile.jpg">

						</div>
						<div class="left2">
							<p class="companyNm">${rdto.rvo.id}</p>
							<p class="dateP">${rdto.rvo.regDate}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="infomation">
				<div class="infomation22">
					<p>고객님은 이렇게 평가했어요!</p>
					<div class="starBox"></div>
				</div>
				<div class="portfolioInfo">
					<p>
						<span class="span1">업체명</span>${mdto.mvo.userNm}
					</p>
					<p>
						<span class="span1">주거형태</span>주거형태~
					</p>
					<p>
						<span class="span1">전용면적</span>전용면적~
					</p>
				</div>
			</div>

			<div class="introductionDiv">${rdto.rvo.content}</div>
			<div class="portfolioInfo2 marTop">
				<div class="portfolioInfo3">
					<img
						src="/upload/${mdto.fvo.saveDir}/${mdto.fvo.uuid}_${mdto.fvo.fileName}"
						class="profileImg">
					<div class="comInfo">
						<p class="userNm">${mdto.mvo.userNm}</p>
						<p>${mdto.mvo.address}</p>

					</div>
				</div>
				<a href="/member/companyInfo?id=${mdto.mvo.id}" class="infoMore"><button>보러가기</button></a>
			</div>

		</div>
	</div>


	<!-- 	<script src="/resources/js/portfolioRegister.js"></script> -->

	<jsp:include page="../common/footer.jsp"></jsp:include>

	<script type="text/javascript">
		let rnoVal = `<c:out value="${rdto.rvo.rno}"/>`;
		let reviewWriter = `<c:out value="${rdto.rvo.id}"/>`;
		let rate = `<c:out value="${rdto.rvo.rate}"/>`;
		console.log("rnoVal>>> " + rnoVal);
	</script>
	<script type="text/javascript" src="/resources/js/reviewDetail.js"></script>
	<script type="text/javascript">
		starRate();
	</script>

</body>
</html>