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
<title>PortfolioModify Page</title>
<!-- 구글아이콘 -->
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

<link rel="stylesheet" href="../resources/css/portfolioModify.css">

<!-- TUI 에디터 CSS CDN -->
<link rel="stylesheet"
	href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
<!-- 제이쿼리 -->
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"></script>

</head>
<body>
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.mvo.id" var="authId" />
		<input type="hidden" id="authId" value="${authId}">
	</sec:authorize>
	<jsp:include page="../common/nav.jsp"></jsp:include>

	<input type="hidden" id="mainImgFvo" value="${pdto.mainImg}">
	<%-- 	<input type="hidden" id="title" value="${pdto.pvo.title}"> --%>
	<input type="hidden" id="homeType" value="${pdto.pvo.homeType}">
	<%-- 	<input type="hidden" id="homeSize" value="${pdto.pvo.homeSize}"> --%>
	<input type="hidden" id="roomCnt" value="${pdto.pvo.roomCnt}">
	<input type="hidden" id="familyType" value="${pdto.pvo.familyType}">
	<input type="hidden" id="homeStyle" value="${pdto.pvo.homeStyle}">
	<input type="hidden" id="pnoVal" value="${pdto.pvo.pno}">




	<div class="box">
		<div class="box2">
			<div class="essentialHead">
				<div class="essential1">
					<div class="essential1Right">
						<img class="pencilsIcon" src="/resources/img/pencils.JPG">
						<p>
							필수 정보 입력 <span>공간을 이해하는데 필요한 정보이니 최대한 정확하게 입력해주세요</span>
						</p>
					</div>
					<div class="essential1Left" id="essential1Left">
						<span class="material-symbols-outlined" id="essential2Btn">
							expand_more </span>
					</div>
				</div>
				<div class="essential2">
					<div class="info num1">
						<p>주거형태</p>
						<div>
							<select name="homeType" id="num1Select" class="selector">
								<option value="원룸">원룸</option>
								<option value="오피스텔">오피스텔</option>
								<option value="아파트">아파트</option>
								<option value="빌라&연립">빌라&연립</option>
								<option value="단독주택">단독주택</option>
								<option value="사무공간">사무공간</option>
								<option value="상업공간">상업공간</option>
								<option value="기타">기타</option>
							</select>
						</div>
					</div>
					<div class="info num2">
						<p>방 개수</p>
						<div>
							<select name="roomCnt" id="num2Select" class="selector">
								<option value="1">1개</option>
								<option value="1.5">1.5개</option>
								<option value="2">2개</option>
								<option value="3">3개</option>
								<option value="4">4개</option>
								<option value="5개이상">5개 이상</option>
							</select>
						</div>
					</div>
					<div class="info num3">
						<p>가족 형태</p>
						<div>
							<select name="familyType" id="num3Select" class="selector">
								<option value="싱글라이프">싱글라이프</option>
								<option value="신혼부부">신혼부부</option>
								<option value="룸메이트와 함께 사는 집">룸메이트와 함께 사는 집
								<option value="아기가 있는 집">아기가 있는 집</option>
								<option value="취학 자녀가 있는 집">취학 자녀가 있는 집</option>
								<option value="부모님과 함께 사는 집">부모님과 함께 사는 집</option>
								<option value="기타">기타</option>
							</select>
						</div>
					</div>
					<div class="info num3">
						<p>스타일</p>
						<div>
							<select name="homeStyle" id="num4Select" class="selector">
								<option value="모던">모던</option>
								<option value="미니멀&심플">미니멀&심플</option>
								<option value="내추럴">내추럴</option>
								<option value="북유럽">북유럽</option>
								<option value="빈티지&레트로">빈티지&레트로</option>
								<option value="클래식&앤틱">클래식&앤틱</option>
								<option value="프렌치&프로방스">프렌치&프로방스</option>
								<option value="러블리&로맨틱">러블리&로맨틱</option>
								<option value="인더스트리얼">인더스트리얼</option>
								<option value="한국&아시아">한국&아시아</option>
								<option value="유니크&믹스매치">유니크&믹스매치</option>
								<option value="기타">기타</option>
							</select>
						</div>
					</div>
					<div class="info num4">
						<p>평수</p>
						<div class="homeSizeDiv">
							<input type="number" id="homeSize" value="${pdto.pvo.homeSize}">
							<p>평</p>
						</div>
					</div>
				</div>
			</div>

			<div id="root">
				<h3 class="titleh3">커버 사진 수정하기</h3>
				<div class="contents">
					<div class="upload-box">
						<div id="drop-file" class="drag-file">
							<img class="portfolioMainImg"
								src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">
							<!-- <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png"
								alt="파일 아이콘" class="image"> -->
							<img src="" alt="미리보기 이미지" class="preview">
						</div>
						<label class="file-label" for="chooseFile">Choose File</label> <input
							class="file" id="chooseFile" type="file"
							onchange="dropFile.handleFiles(this.files)"
							accept="image/png, image/jpeg, image/gif">

					</div>
				</div>
			</div>

			<input type="text" id="title" class="titleInput"
				placeholder="제목을 입력해주세요." value="${pdto.pvo.title}">

			<!-- TOAST UI Editor가 들어갈 div태그 -->
			<div id="editor">${pdto.pvo.introduction}</div>
			<!-- !!여기!! 에디터 내용을 받을 div태그-->
			<div id="contents"></div>
			<div class="regContainer">
				<button type="button" id="modBtn" class="btn btn-primary">저장하기</button>
			</div>

		</div>
	</div>
	<!-- TOAST UI Editor CDN URL(JS) -->
	<script
		src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js"></script>

	<jsp:include page="../common/footer.jsp"></jsp:include>
	<script type="text/javascript">
		let pnoVal = `<c:out value="${pdto.pvo.pno}"/>`;
		console.log("pnoVal>>> " + pnoVal);
	</script>
	<script src="/resources/js/portfolioModify.js"></script>

</body>
</html>