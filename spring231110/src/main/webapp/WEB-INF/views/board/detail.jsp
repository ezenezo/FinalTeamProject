<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Board Detail Page</title>
<link href="../resources/css/sb-admin-2.css" rel="stylesheet">
<link rel="stylesheet" href="../resources/css/detail.css">
<body>
	<button style="display: none;"></button>
	<div class="total">
		<div class="content">
			<div class="box">
				<div class="box2">
					<div>
						<div>
							<h3 class="titleh3">${bvo.title}</h3>




							<div class="boardDetailtop">
								<div class="leftBox">
									<div class="left1">
										<img alt="프로필 사진 없음" src="../../../resources/img/profile.jpg">
									</div>
									<div class="left2">
										<div>
											<h5 class="mag">${bvo.id}(${bvo.empNo})</h5>
											<p class="miniFont mag">${bvo.regDate}</p>
										</div>
									</div>
								</div>
								<div class="rightBox">
									<div class="heartIcon likeCnt miniFont">
										<div id="iconContainer">
											<c:choose>
												<c:when test="${bvo.likeCheck}">
													<svg id="heart"  class="colorRed" xmlns="http://www.w3.org/2000/svg"
														width="16" height="16" fill="currentColor"
														class="bi bi-heart-fill" viewBox="0 0 16 16">
           							 <path  class="colorRed" fill-rule="evenodd"
															d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
          							</svg>
												</c:when>
												<c:otherwise>
													<svg id="heart" xmlns="http://www.w3.org/2000/svg"
														width="16" height="16" fill="currentColor"
														class="bi bi-heart" viewBox="0 0 16 16">
 									<path
															d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
									</svg>
												</c:otherwise>
											</c:choose>

										</div>
										좋아요
										<div id="likeQtyArea">${bvo.likeQty}</div>
									</div>
									<div class="bubbleIcon miniFont">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											fill="currentColor" class="bi bi-chat-dots"
											viewBox="0 0 16 16">
  									<path
												d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
  									<path
												d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
									</svg>
										댓글
										<div id="cmtQtyArea">${bvo.cmtQty}</div>
									</div>
								</div>
							</div>
						</div>

						<hr>
						<div class="card-body jwh">
							<div class="contentBox">내용 ${bvo.content}</div>
							<hr>

							<sec:authorize access="isAuthenticated()">
								<sec:authentication property="principal.mvo.id" var="authId" />
								<sec:authentication property="principal.mvo.empNo"
									var="authEmpNo" />
								<input type="hidden" id="authId" value="${authId}">
								<input type="hidden" id="authEmpNo" value="${authEmpNo}">
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
									<ul>
										<li>
											<div class="cmtRow1">
												<div class="left1">
													<img alt="프로필 사진 없음"
														src="../../../resources/img/profile.jpg">
													댓글작성자id(사번),댓글작성일
												</div>
												<div>동그라미3개 아이콘</div>
											</div>

											<div class="cmtRow2">
												<div>댓글 내용</div>
											</div>
											<div class="cmtRow3">
												<div>좋아요 아이콘</div>
											</div>
										</li>
									</ul>
								</div>

								<!-- 댓글 더보기 버튼 -->
								<div>
									<div class="d-grid gap-2">
										<!-- style="visibility: hidden" <= 숨김 -->
										<button type="button" id="moreBtn" data-page="1"
											class="btn btn-outline-primary mag0"
											style="visibility: hidden">MORE+</button>
									</div>
								</div>

							</sec:authorize>

						</div>

					</div>

				</div>
			</div>
		</div>
	</div>

	<jsp:include page="../common/footer.jsp" />

	<script type="text/javascript">
		let bnoVal = `<c:out value="${bvo.bno}"/>`;
		let boardWriter = `<c:out value="${bvo.id}"/>`;
		console.log("bnoVal>>> " + bnoVal);
	</script>
	<script type="text/javascript" src="/resources/js/boardComment.js"></script>
	<script type="text/javascript">
		printCommentList(bnoVal);
	</script>
</body>
</html>