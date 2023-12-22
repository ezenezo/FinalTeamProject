<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Main Page</title>
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link rel="stylesheet" href="/resources/css/reviewList.css">
</head>
<jsp:include page="../common/nav.jsp"></jsp:include>
<body class="mainBody">
	<div class="box">
		<div class="box2">



		</div>
		<button style="visibility: hidden" data-page="1" id="moreBtn"
			class="morePortofolioBtn moreBtn" type="button">후기 더보기</button>
	</div>
	<jsp:include page="../common/footer.jsp" />

</body>
<script src="/resources/js/reviewList.js"></script>
<script type="text/javascript">
	 	reviewPrint(); 
</script>
</html>