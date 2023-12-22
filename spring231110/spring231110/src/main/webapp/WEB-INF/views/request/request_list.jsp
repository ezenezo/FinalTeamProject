<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>

    <link href="<c:url value='/resources/css/index_all.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/resources/css/req_list.css'/>" rel="stylesheet" type="text/css">
</head>
<body>
    <jsp:include page="../common/nav.jsp" />

    <sec:authentication property="principal.mvo.id" var="authEmail" />

    <div class="total">
        <div class="subject">보낸 요청</div>
     
        <div class="content">
        
           <nav>
        </nav>
            <ul id="req_list_ul">
                <c:forEach items="${list}" var="qvo">
                    <li>
                        <input type="text" value="${qvo.requestNmStatus}" id="requestNm_">
                        <a href="/req/request_detil?requestNm=${qvo.requestNmStatus}">
                            ${qvo.requestId}<br> ${qvo.form}<br>
                            ${qvo.categoryType}<br> ${qvo.address}
                            ${qvo.companyName}<br>
                        </a>
                    </li>
                </c:forEach>
            </ul>
        </div>
    </div>

    <script src="/resources/js/req_list.js"></script>
    <jsp:include page="../common/footer.jsp" />
</body>
</html>
