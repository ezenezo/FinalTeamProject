<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<!DOCTYPE html>
<html>

<head>

<link href="../resources/css/nav.css" rel="stylesheet">
<link href="../resources/css/login.css" rel="stylesheet">
<meta charset="UTF-8">
<title>Insert title here</title>

</head>

<body>
	<jsp:include page="../common/nav.jsp" />
	<section>
		<div class="jb-container">
			<div class="title">로그인</div>
			<!-- 카카오 로그인 -->
			<a href="/member/kakao?ok=kakaologin" id="kakaoLogin"><img alt=""
				src="../resources/img/kakao_login.png"></a>
			<!-- 네이버 로그인 -->
			<div class="naver">
				<a href="/member/naver?ok=naverLogin"> <img alt=""
					src="../resources/img/naver_logo.png">
					<p>네이버 로그인</p>
				</a>
			</div>
			<!-- 칸 나누기 -->
			<div class="divider">
				<div class="border">
					<br>
				</div>
				또는
				<div class="border right">
					<br>
				</div>
			</div>
			<!-- 일반 로그인 -->
			<form action="/member/login" method="post">
				<div class="mb-3">
					<input type="text" class="form-control inputCss" name="id" id="e"
						placeholder="아이디">
				</div>
				<div class="mb-3">
					<input type="password" class="form-control inputCss" name="pw"
						id="p" placeholder="비밀번호"> <i class="bi bi-eye-slash-fill"
						id="eye1"></i>
				</div>
				<%-- 		${param.errMsg} --%>
				<c:if test="${not empty param.errMsg }">
					<script type="text/javascript">
						console.log("errMsg메시지가 들어온듯");
					</script>
					<div class="text-danger mb-3">

						<c:choose>
							<c:when test="${param.errMsg eq 'Bad credentials'}">
								<!-- BadCredentialsException 관련 231030-->
								<c:set var="errText" value="아이디 & 비밀번호가 일치하지 않습니다." />
							</c:when>
							<c:otherwise>
								<c:set var="errText" value="관리자에게 문의해주세요. " />
							</c:otherwise>
						</c:choose>
						${errText}
					</div>
				</c:if>
				<div class="btnContainer">
					<button class="w-100 btn btn-primary btn-lg my-5 loginBtn"
						type="submit">로그인</button>
				</div>
			</form>

			<!-- 회원가입 창으로 넘어가기 -->
			<div class="RegisterPageDiv">
				<p class="moveRegisterPage">가입된 계정이 없으신가요?</p>
				<a href="/member/register">가입</a>
			</div>
			<div class="ChangePwDiv">
				<p class="moveRegisterPage">메이트로 가입하고 싶으신가요?</p>
				<a href="/member/companyRegister">메이트 가입</a>
			</div>
			<div class="ChangePwDiv">
				<p class="moveChangePw" id="modifyPwdATag">비밀번호를 잊으셨나요?</p>
				<a href="/member/checkMemberInfo">변경</a>
			</div>
		</div>
	</section>
	<script type="text/javascript" src="../resources/js/login.js"></script>
	<script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

</body>
</html>