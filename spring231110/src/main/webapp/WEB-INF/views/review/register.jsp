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

<link rel="stylesheet" href="../resources/css/reviewRegister.css">
</head>
<body>

<jsp:include page="../common/nav.jsp"></jsp:include>


	<div class="total">
		<div class="content">
			<div class="box">
				<div class="box2">
					<div>
						<h3 class="titleh3">별을 눌러 만족도를 알려주세요</h3>
						<div clss="ratingStar">
							<svg class="star" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>
							<svg class="star" xmlns="http://www.w3.org/2000/svg"
								fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
  <path
									d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
</svg>


						</div>
						<h3 class="titleh3">사진 업로드<span> (선택)</span></h3>
						<p>
							상품과 관련 없거나 부적합한 사진을 리뷰에 등록하시는 경우,<br> 사전경고 없이 삭제될 수 있습니다.
						</p>

						<div class="upload-box">
							<div id="drop-file" class="drag-file">
								<img src="https://img.icons8.com/pastel-glyph/2x/image-file.png"
									alt="파일 아이콘" class="image">
								<p class="message">Drag files to upload</p>
								<img src="" alt="미리보기 이미지" class="preview">
							</div>
						</div>
						
						<h3 class="titleh3 reviewTitle">리뷰를 작성해주세요.</h3>
						<div class="reviewBox">
							<textarea placeholder="느꼈던 장점과 단점을 솔직하게 알려주세요." rows="5" wrap="soft"
											id="reviewText" maxlength="500"></textarea>
						</div>
						
						<div class="regContainer">
							<button type="button" class="btn btn-primary" id="regBtn">저장하기</button>
						</div>
						
						<hr>

						<div class="card-body">
							<form action="/board/register" method="post">

								<sec:authorize access="isAuthenticated()">
									<sec:authentication property="principal.mvo.empNo"
										var="authEmpNo" />
									<sec:authentication property="principal.mvo.id" var="authId" />
									<sec:authentication property="principal.mvo.depCd"
										var="authDepCd" />
									<sec:authentication property="principal.mvo.clubCd"
										var="authClubCd" />

									<input type="hidden" name="empNo" value="${authEmpNo}">
									<input type="hidden" name="id" value="${authId}">

									<div class="input-group mb-3">
										<select name="boardType" class="form-select"
											id="inputGroupSelect03"
											aria-label="Example select with button addon">
											<option selected>게시판을 선택해주세요.</option>
											<option value="anony">익명</option>
											<option value="depart">부서</option>
											<option value="club">동호회</option>
										</select>
									</div>
									</sec:authorize>

						<div class="mb-3">
									<input type="text" class="form-control" name="title"
											placeholder="제목을 입력해 주세요.">
								</div>

								<div class="btnContainer">
									<button type="submit" class="btn btn-outline-primary"
											id="regBtn">등록</button>
									<a href="/member/index"><button type="button"
												class="btn btn-outline-primary" type="button">HOME</button></a>
								</div>
							
							</form>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>

<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
</html>