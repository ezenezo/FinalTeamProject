<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>견적서 작성하기</title>

    <link href="<c:url value='/resources/css/index_all.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/resources/css/qutation.css'/>" rel="stylesheet" type="text/css">
</head>
<body>
    <jsp:include page="../common/nav.jsp" />

    <sec:authentication property="principal.mvo.id" var="authEmail" />

    <div class="total">
        <div class="subject">견적서 작성하기</div>
        
        <div class="content">
            
        </div>
    </div>

    <script src="/resources/js/quotation_list.js"></script>
    <jsp:include page="../common/footer.jsp" />
</body>
</html>
