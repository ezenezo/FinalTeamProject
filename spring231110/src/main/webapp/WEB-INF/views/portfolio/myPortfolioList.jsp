<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

<link rel="stylesheet" href="/resources/css/portfolioList.css">
</head>
<body>
	<jsp:include page="../common/nav.jsp"></jsp:include>

	<div class="box">
		<div class="box2">
			<div class="bodyContainer">
				<div class="bodyContainer2">
					<c:forEach items="${portfolioDTOList}" var="pdto">
						<a href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}">
							<div class="pdtoBox">
								<div class="overHiddenBox">
									<img class="portfolioMainImg"
										src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">
								</div>
								<p class="pdtoBoxTitle">${pdto.pvo.title}</p>
								<p class="pdtoBoxTitle pdtoTitle3th">
									<span>좋아요${pdto.pvo.likeQty} </span><span>조회수${pdto.pvo.readQty}</span>
								</p>
							</div>
						</a>
					</c:forEach>
					
		
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="../common/footer.jsp"></jsp:include>
</body>
</html>