<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Main Page</title>
    <link href="<c:url value='/resources/css/index_all.css'/>" rel="stylesheet">
    <link href="<c:url value='/resources/css/req_img.css'/>" rel="stylesheet">
    <link href="<c:url value='/resources/css/request/cancel_com.css'/>" rel="stylesheet">
</head>
<body>
    <jsp:include page="../common/nav.jsp"></jsp:include>
    <div class="total">
        <div class="content">
            <sec:authentication property="principal.mvo.id" var="authEmail" />
            <form action="/req/cancel_request_reason" method="post" enctype="multipart/form-data">
                <input value="${reqNm}" name="requestNm" type="hidden"> 
                
                <h3 style="text-align: center;">요청서 취소 사유를 고객님께 알려주세요</h3>
                <div class="quo_user_div">
                    <span class="span_teg">
                        <textarea maxlength="200" placeholder="고객님께 취소할 사유를 알려주세요" name="cancellationReason" id="comment"></textarea>
                    </span>
                    <div class="sc-ef390a2d-0 donOnO">
                        <div color="#ff7631" class="sc-7683fa06-0 eAkweW">&nbsp;</div>
                        <div color="#7a7a7c" class="sc-7683fa06-0 kTtyyx" id="counter" style="visibility: visible;display: flex;justify-content: flex-end;">/ 200자</div>
                    </div>
                    <div class="total_btn">
                        <div class="btn_div" id="btn_div">
                            <a href="../req/main"><button type="button" id="img_cancel" class="modify_btn">취소 사유 없음</button></a>
                        </div>
                        <button type="submit" class="btn btn-dark" id="regBtn">사유 등록</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/resources/js/quotation.js"></script>
    <script src="<c:url value='/resources/js/request_img.js'/>"></script>
    <script>
        $(document).ready(function () {
            $('#counter').html("<div style='color:#ff7631' class='sc-7683fa06-0 kTtyyx'>0</div> / <div style='color:#7a7a7c' class='sc-7683fa06-0 kTtyyx'>200자</div>");

            $('#comment').on('input', function () {
                var content = $(this).val();
                $('#counter').html("<div style='color:#ff7631' class='sc-7683fa06-0 kTtyyx'>" + content.length + "</div> / <div style='color:#7a7a7c' class='sc-7683fa06-0 kTtyyx'>200자</div>");

                if (content.length > 200) {
                    $(this).val(content.substring(0, 200));
                    $('#counter').html("<div style='color:#ff7631' class='sc-7683fa06-0 kTtyyx'>200</div> / <div style='color:#7a7a7c' class='sc-7683fa06-0 kTtyyx'>200자</div>");
                }
            });
        });
    </script>
    <jsp:include page="../common/footer.jsp" />
</body>
</html>
