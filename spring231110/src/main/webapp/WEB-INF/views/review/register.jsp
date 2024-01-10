<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>

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

<link rel="stylesheet" href="../resources/css/reviewRegister.css">
</head>

<body>
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.mvo.id" var="authId" />
		<input type="hidden" id="authId" value="${authId}">
	</sec:authorize>
	<input type="hidden" id="comId" value="3">
	<jsp:include page="../common/nav.jsp"></jsp:include>


	<div class="total">
		<div class="content">
			<div class="box">
				<div class="box2">
					<div>

						<h3 class="titleh3 marTop">별을 눌러 만족도를 알려주세요</h3>
						<div class="ratingStar">
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
						</div>

						<div id="root">
							<h3 class="titleh3">리뷰 메인 사진 추가하기</h3>
							<p>
								관련 없거나 부적합한 사진을 리뷰에 등록하시는 경우,<br> 사전경고 없이 삭제될 수 있습니다.
							</p>
							<div class="contents">
								<div class="upload-box">
									<div id="drop-file" class="drag-file">
										<img
											src="https://img.icons8.com/pastel-glyph/2x/image-file.png"
											alt="파일 아이콘" class="image">
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


						<input type="text" id="title" class="titleInput"
							placeholder="제목을 입력해주세요.">

						<!-- TOAST UI Editor가 들어갈 div태그 -->
						<div id="editor"></div>
						<!-- !!여기!! 에디터 내용을 받을 div태그-->
						<div id="contents"></div>
						
						<div class="portfolioInfo">
							<p>
								<span class="span1">주거형태</span><span class="span2">${qvo.form}</span>
							</p>
							<p>
								<span class="span1">주거유형</span><span class="span2">${qvo.categoryType}</span>
							</p>
							<p>
								<span class="span1">전용면적</span><span class="span2">${qvo.squareFootage}평</span>
							</p>

						</div>
						<div class="regContainer">
							<button type="button" id="regBtn" class="btn btn-primary"
								id="regBtn">저장하기</button>	
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" id="homeSizeVal" value="${qvo.squareFootage}">
	<input type="hidden" id="formVal" value="${qvo.form}">
	<input type="hidden" id="categoryTypeVal" value="${qvo.categoryType}">
	<!-- TOAST UI Editor CDN URL(JS) -->
	<script
		src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>
	<script type="text/javascript">
	let comId =`<c:out value="${comId}"/>`; 
	</script>

	<script src="/resources/js/reviewRegister.js"></script>

	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>

</html>