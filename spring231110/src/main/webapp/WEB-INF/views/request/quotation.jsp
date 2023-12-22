<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>

    <link href="<c:url value='/resources/css/index_all.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/resources/css/qutation.css'/>" rel="stylesheet" type="text/css">
</head>
<body>
    <jsp:include page="../common/nav.jsp" />

    <sec:authentication property="principal.mvo.id" var="authEmail" />

    <div class="total">
        <div class="subject">받은 요청</div>
        <nav></nav>
        <div class="content">
            <ul>
                <c:forEach items="${list}" var="qvo">
                    <li>
                        <input type="hidden" value="${qvo.requestNm}" id="requestNm_${qvo.someUniqueIdentifier}">
                        <a href="#" onclick="handleClick('requestNm_${qvo.someUniqueIdentifier}')">
                            ${qvo.requestId}<br> ${qvo.form}<br>
                            ${qvo.categoryType}<br> ${qvo.address}
                        </a>
                    </li>
                </c:forEach>
            </ul>
        </div>
    </div>

    <script src="/resources/js/quotation_list.js"></script>
    <jsp:include page="../common/footer.jsp" />
</body>
</html>
