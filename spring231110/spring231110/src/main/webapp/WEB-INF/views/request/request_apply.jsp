<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>신청하기</title>
    <!-- CSS 관련 설정-->
    <link href="../../../resources/css/request/request_apply.css" rel="stylesheet" type="text/css">
</head>

<body>

    <sec:authentication property="principal.mvo.id" var="authEmail" />
    
    
    <jsp:include page="l_side.jsp" />
    <c:set value="${pno}" var="pno"></c:set>
    <div class="top">
        <div class="exit">
            <button class="gosu_btn" id="gosu_btn">나가기</button>
        </div>
        <div>
            <progress value="0" max="100" id="progress"></progress>
        </div>
    </div>

    <form action="/req/request_submit" id="card_form" method="post">
 
    <input value="${pno}" name="pno"  type="hidden">
        <input type="hidden" value="${authEmail}" id="user_id" name="requestId">
        <div class="total">
            <div class="content">
                <div class="card_box">
                    <ul class="cards" id="cards">

                    </ul>

                </div>
            </div>
        </div>
    </form>

    <script type="text/javascript">
      

    </script>
    <a href="" onclick=""><span class="material-symbols-outlined">contract_edit</span></a>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script type="text/javascript">
        let bnoVal = `<c:out value="${principal.mvo.id}" />`;
        console.log("이거값 가져와라" + bnoVal);
    </script>

    <script src="../../../resources/js/popup_2.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script type="text/javascript" src="../../../resources/js/request_apply.js"></script>
</body>

</html>
