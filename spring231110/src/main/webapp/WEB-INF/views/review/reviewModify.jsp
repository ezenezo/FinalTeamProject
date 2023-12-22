<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Board Register Page</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<!-- TUI 에디터 CSS CDN -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
<!-- 제이쿼리 -->
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="../resources/css/reviewModify.css">
</head>
<body>
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.mvo.id" var="authId" />
		<input type="hidden" id="authId" value="${authId}">
	</sec:authorize>
	<input type="hidden" id="comId" value="3">
	<jsp:include page="../common/nav.jsp"></jsp:include>

	<input type="hidden" id="mainImgFvo" value="${rdto.reviewMainImg}">
	<%-- 	<input type="hidden" id="title" value="${pdto.pvo.title}"> --%>





	<div class="total">
		<div class="content">
			<div class="box">
				<div class="box2">
					<div>
						<h3 class="titleh3">별을 눌러 만족도를 알려주세요</h3>
						<div clss="ratingStar">
							<svg class="star star1" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="star1"
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star star2" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="star2"
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star star3" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="star3"
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star star4" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="star4"
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star star5" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path class="star5"
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>


							<div id="root">
								<h3 class="titleh3">리뷰 메인 사진 추가하기</h3>
								<p>
									관련 없거나 부적합한 사진을 리뷰에 등록하시는 경우,<br> 사전경고 없이 삭제될 수 있습니다.
								</p>
								<div class="contents">
									<div class="upload-box">
										<div id="drop-file" class="drag-file">
											<img class="portfolioMainImg"
												src="/upload/${rdto.reviewMainImg.saveDir}/${fn:replace(rdto.reviewMainImg.saveDir,'\\','-')}_${rdto.reviewMainImg.uuid}_${rdto.reviewMainImg.fileName}">

											<!-- <img
												src="https://img.icons8.com/pastel-glyph/2x/image-file.png"
												alt="파일 아이콘" class="image"> -->
											<p class="message">Drag files to upload</p>
											<img src="" alt="미리보기 이미지" class="preview">
										</div>
										<label class="file-label" for="chooseFile">Choose File</label>
										<input class="file" id="chooseFile" type="file"
											onchange="dropFile.handleFiles(this.files)"
											accept="image/png, image/jpeg, image/gif">

									</div>
								</div>
							</div>

						</div>
						<input type="text" id="title" class="titleInput"
							placeholder="제목을 입력해주세요." value="${rdto.rvo.title}">

						<!-- TOAST UI Editor가 들어갈 div태그 -->
						<div id="editor">${rdto.rvo.content}</div>
						<div id="contents"></div>
						<div class="regContainer">
							<button type="button" id="modBtn" class="btn btn-primary"
								>저장하기</button>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- TOAST UI Editor CDN URL(JS) -->
	<script
		src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
	<jsp:include page="../common/footer.jsp"></jsp:include>

	<script type="text/javascript">
		let rnoVal = `<c:out value="${rdto.rvo.rno}"/>`;
		console.log("rnoVal>>> " + rnoVal);
	</script>

	<script src="/resources/js/modifyReview.js"></script>
</body>
</html>
