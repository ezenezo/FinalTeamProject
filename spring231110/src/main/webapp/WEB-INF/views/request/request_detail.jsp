<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">
<link href="<c:url value='/resources/css/qutation.css'/>"
	rel="stylesheet" type="text/css">

<link href="<c:url value='/resources/css/req_detail.css'/>"
	rel="stylesheet" type="text/css">
</head>
<body>
	<jsp:include page="../common/nav.jsp" />

	<sec:authentication property="principal.mvo.id" var="authEmail" />
	<input id="auth" value="${authEmail}" type="hidden">
	<div class="total">
		<div class="subject">보낸 요청</div>

		<div class="content">




			<ul style="width: 500px;">

				<li>
					<nav>
						<ul id="nav_ul">
						</ul>
					</nav>
					<div class="detail_div" style="padding: 30px; padding-left: 40px;">

						<input type="hidden" value="${qvo.rvo.requestNm}" id="requestNm"
							name="requestNm"> <input type="hidden"
							value="${qvo.flist}" id="file_qvo" name="requestNm">
						<div class="value_row" style="margin-bottom: 10px;">
							<span class="label">요청업체 이름은 어디인가요? </span> <br> <span
								class="value" style="font-weight: 700;">${company}</span><br>
							<br> <span class="label">등록날짜</span> <br> <span
								class="value" style="font-weight: 700;"><fmt:formatDate
									value="${qvo.rvo.reqAt}" pattern="yyyy-MM-dd" /></span><br> <br>
							<span class="label">인테리어 형태는 무엇인가요? </span> <br> <span
								class="value" style="font-weight: 700;">${qvo.rvo.form}</span><br>
							<br> <span class="label">인테리어 유형는 무엇이내가요? </span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.categoryType}</span><br>
							<br> <span class="label">인테리어 공간 범위는 어디까지인가요?</span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.extent}</span><br>
							<br> <span class="label">인테리어할 공간의 상태는 어떤가요?</span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.status}</span><br>
							<br> <span class="label">인테리어할 우편번호는 어디인가요?</span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.zoneCode}</span><br>
							<br> <span class="label">인테리어할 공간의 주소는 어디인가요?</span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.address}</span><br>
							<br> <span class="label">인테리어할 공간의 상세 주소는 어떤가요?</span><br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.detailAddress}</span><br>
							<br> <span class="label">인테리어할 공간의 참고 주소는 어떤가요?</span> <br>
							<br> <span class="value" style="font-weight: 700;">${qvo.rvo.extraAddress}</span><br>
							<br> <span class="label">인테리어할 공간의 평수는 어떻게 되나요?</span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.squareFootage}평</span><br>
							<br> <span class="label">인테리어할 공간의 제곱미터는 어떻게 되나요?</span> <br>
							<span class="value" style="font-weight: 700;">${qvo.rvo.squareMeter}m<sup>2</sup></span><br>
							<br> <span class="label">고객님께서 요청사항이 있나요?</span> <br>
							
							<span class="value" style="font-weight: 700;">${qvo.rvo.requestOp}</span><br>
							<input value="${ qvo.rvo.cancellationReason}" id="cancellation" type="hidden" >
							<div id="cancellation_div">
							</div><br>
								<div class="img_div">
							<span class="label" style="font-weight: 700;">고객님께서 원하는
								스타일이 있으신가요?(이미지)</span><br>
						

								<div class="img_div">
									<img alt="그림 없당"
										src="/upload/${fn: replace(qvo.flist.saveDir,'\\','/')}/
										${qvo.flist.uuid}_${qvo.flist.fileName}">



								</div>
							</div>
						</div>

					</div>
				</li>

			</ul>
		</div>
	</div>

	<script src="/resources/js/req_detail.js"></script>

	<jsp:include page="../common/footer.jsp" />
</body>
</html>
