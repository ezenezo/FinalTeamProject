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
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">

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
							<img
								src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
								class="profileImg">
						</div>
						<div class="left2">
							<p class="companyNm">${rdto.rvo.id}</p>
							<p class="dateP">${rdto.rvo.regDate}</p>
						</div>
					</div>
				</div>

				<div class="heartIcon likeCnt miniFont">
					<div id="iconContainer">
						<c:choose>
							<c:when test="${rdto.rvo.likeCheck}">
								<svg id="heart" class="colorRed"
									xmlns="http://www.w3.org/2000/svg" width="16" height="16"
									fill="currentColor" class="bi bi-heart-fill"
									viewBox="0 0 16 16">
           							 <path id="heart" class="colorRed" fill-rule="evenodd"
										d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          							</svg>
							</c:when>
							<c:otherwise>
								<svg id="heart" xmlns="http://www.w3.org/2000/svg" width="16"
									height="16" fill="currentColor" class="bi bi-heart"
									viewBox="0 0 16 16">
 									<path id="heart"
										d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
									</svg>
							</c:otherwise>
						</c:choose>

					</div>
					<span>좋아요</span>
					<div id="likeQtyArea" class="mar">${rdto.rvo.likeQty}</div>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
						fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path
							d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
  <path
							d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
</svg>
					<span>조회수</span>
					<div id="likeQtyArea">${rdto.rvo.readQty}</div>
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
						<span class="span1">주거형태</span>${rdto.rvo.form}
					</p>
					<p>
						<span class="span1">주거유형</span>${rdto.rvo.categoryType}
					</p>
					<p>
						<span class="span1">전용면적</span>${rdto.rvo.homeSize}
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

			<!-- 댓글 -->
			<sec:authorize access="isAuthenticated()">
				<sec:authentication property="principal.mvo.id" var="authId" />
				<input type="hidden" id="authId" value="${authId}">
				<div class="postCntBox">
					<div class="cmtContainer">
						<textarea placeholder="댓글을 남겨보세요." rows="1" wrap="soft"
							id="cmtText" maxlength="500"></textarea>
						<!-- div를 position: absolute로 설정하여 textarea 내부에 위치시킴 -->
						<div class="cmtBtnContainer">
							<div id="cmtPostBtn">등록</div>
						</div>
					</div>
				</div>
				<!-- 댓글 표시 라인 -->
				<div id="cmtListArea">
					<ul class="ulTag">


					</ul>
				</div>

				<!-- 댓글 더보기 버튼 -->
				<div>
					<div class="d-grid gap-2">
						<button type="button" id="moreBtn" data-page="1"
							class="morePortofolioBtn" style="visibility: hidden">MORE+</button>
					</div>
				</div>

			</sec:authorize>
			<!-- 댓글 끝 -->

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
		printCommentList(rnoVal);
	</script>

</body>
</html>