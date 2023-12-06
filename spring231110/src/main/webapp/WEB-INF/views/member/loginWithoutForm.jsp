<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
	window.onload = function click() {
		document.getElementById('btn').click();	
	}
</script>
</head>
<body>
	<form action="/member/loginWithoutForm" method="post">
		<input type="text" name="id" value="${user.id }">
		<button type="submit" id="btn"></button>
	</form>
</body>
</html>