<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- sweetAlert -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
</head>
<link href="../resources/css/modify.css" rel=" stylesheet">
<body>
	<jsp:include page="../common/nav.jsp" />

	<!-- 회원정보 수정폼 -->
	<section>
		<form action="/member/modify" method="post" class="form"
			enctype="multipart/form-data">
			<h2 class="title">회원정보수정</h2>
			<a href="/member/remove"><button type="button" class="remove">회원탈퇴</button></a>
			<div class="info">
				<div class="infoLeftMargin">
					<p>아이디</p>
					<span>*변경불가</span>
				</div>
				<input type="text" value="${mvo.id }" name="id" readonly="readonly">
			</div>
			<div class="info">
				<div class="infoLeft">
					<p>닉네임</p>
				</div>
				<input type="text" value="${mvo.userNm }" name="userNm">
			</div>
			<div class="info">
				<div class="infoLeft">
					<p>비밀번호</p>
				</div>
				<input type="password" value="${mvo.pw.substring(0, 10) }"
					readonly="readonly">
				<p class="pwModify">
					<a href="/member/modifyPw?id=${mvo.id }">비밀번호 변경</a>
				</p>
			</div>
			<div class="info">
				<div class="infoLeft">
					<p>이메일</p>
				</div>
				<input type="text"
					value="${mvo.email.substring(0,mvo.email.indexOf('@')) }"
					id="startEmail" class="email"> <span id="at">@</span> <select>
					<option selected disabled hidden="hidden"
						value="${mvo.email.substring(mvo.email.indexOf('@')+1) }">${mvo.email.substring(mvo.email.indexOf('@')+1) }</option>
					<option disabled>선택해주세요.</option>
					<option value="gmail.com">gmail.com</option>
					<option value="naver.com">naver.com</option>
					<option value="hanmail.net">hanmail.net</option>
					<option value="daum.net">daum.net</option>
					<option value="nate.com">nate.com</option>
					<option>직접입력</option>
				</select> <input type="text" id="lastEmail" class="email" placeholder="직접입력">
				<!-- 실제 이메일 데이터 -->
				<input type="text" name="email" id="email" value="${mvo.email }"
					hidden="hidden">
			</div>
			<div class="info" id="imageInfo">
				<div class="infoLeft">
					<p>프로필 이미지</p>
				</div>
				<input class="form-control mb-3" type="file" name="profile"
					id="file" hidden="hidden">
				<div id="imageBox">
					<c:if test="${fvo ne null }">
						<img alt=""
							src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
							class="profileImg">
					</c:if>
					<c:if test="${fvo eq null }">
						<img alt="" src="../resources/img/profile_none.png"
							class="profileImg">
					</c:if>
				</div>
			</div>
			<button type="submit" class="modifyBtn">회원 정보 수정</button>
		</form>
	</section>

	<!-- 이미지 정규표현식 확인용 -->
	<input type='text' id="checkImgResult" hidden="hidden">

	<jsp:include page="../common/footer.jsp" />
</body>
<script type="text/javascript" src="../resources/js/modify.js"></script>
</html>