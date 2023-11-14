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
<title>navBar</title>

<link href="<c:url value='/resources/css/nav.css'/>" rel="stylesheet"
	type="text/css">

</head>
<body>

	<!-- nav -->
	<nav class=".nav_header">
	<a href="index">
		<div class="c_logo">
			 <img alt="회사로고 없음"
				src="../../resources/img/회사로고.jpg">
		
		</div>
	</a>
	</nav>
</body>
</html>