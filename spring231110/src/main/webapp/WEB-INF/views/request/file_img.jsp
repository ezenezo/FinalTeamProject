<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">
	<link href="<c:url value='/resources/css/req_img.css'/>"
	rel="stylesheet" type="text/css">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
	crossorigin="anonymous"></script>
<meta charset="UTF-8">
<title>Main Page</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link rel="stylesheet" href="/resources/css/main.css">
<link href="<c:url value='/resources/css/request/file_img.css'/>"
	rel="stylesheet" type="text/css">
</head>
<body>
	<jsp:include page="../common/nav.jsp"></jsp:include>
<body class="mainBody">
	<div class="total">
		<div class="content">
			<sec:authentication property="principal.mvo.id" var="authEmail" />
			<form action="/rfc/file_img" method="post"
				enctype="multipart/form-data">
				<input type="hidden" value="${authEmail}" id="user_id"
					name="requestId"> <input type="hidden" value="${reqNm}"
					name="requestNm">
				<!-- 첫 번째 파일 입력 필드 -->
				<input type="file" class="form-control" name="file1" id="files1"
					multiple onchange="setThumbnail(event, 1);" style="display: none;">

				<button type="button" id="trigger1" class="btn btn-outline-primary">File
					Upload</button>

				<div class="mb-3" id="fileZone">

					<ul class="image-preview"></ul>

				</div>


				


				<button type="submit" class="btn btn-dark" id="regBtn" onsubmit="img_submit()">등록</button>


			</form>

		</div>
	</div>
	<script type="text/javascript"
		src="../../../resources/js/request_img.js"></script>

	<jsp:include page="../common/footer.jsp" />
	<script src="/resources/js/main.js"></script>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>



</body>
</html>