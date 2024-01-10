<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="sec"
   uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
<head>
<link href="<c:url value='/resources/css/index_all.css'/>"
   rel="stylesheet" type="text/css">
<link href="<c:url value='/resources/css/req_img.css'/>"
   rel="stylesheet" type="text/css">
<meta charset="UTF-8">
<title>Main Page</title>
<link href="<c:url value='/resources/css/request/file_img.css'/>"
   rel="stylesheet" type="text/css">
</head>
<body>
   <jsp:include page="../common/nav.jsp"></jsp:include>
<body class="mainBody">
   <div class="total">
      <div class="content">
         <sec:authentication property="principal.mvo.id" var="authEmail" />
         <form action="/rfc/file_img" method="post"
            enctype="multipart/form-data">
            <h3 style="text-align: center;">선호하는 디자인 전달</h3>
            <input type="hidden" value="${authEmail}" id="user_id"
               name="requestId"> <input type="hidden" value="${reqNm}"
               name="requestNm"> <input type="file" class="form-control"
               name="file1" id="files1" multiple
               onchange="setThumbnail(event, 1);" style="display: none;">

            <div id="fileZone" style="">
               <button type="button" id="trigger1">
                  <ul class="image-preview">
                     <li style="font-size: 16px; font-weight: 700;">이곳을 클릭하여
                        메이트에게 원하는 디자인을 첨부해보세요:)</li>
                  </ul>
               </button>
            </div>
            <div class="total_btn">
               <div class="btn_div" id="btn_div">

                  

               </div>
               <button type="button" id="img_cancel" class="modify_btn"
                     onclick="back()" style="background-color: #f27474;">나가기</button>
               <button type="submit" class="btn btn-dark" id="regBtn">등록</button>
            </div>
         </form>
      </div>
   </div>
   <script type="text/javascript"
      src="<c:url value='/resources/js/request_img.js'/>"></script>
   <jsp:include page="../common/footer.jsp" />
   <script src="<c:url value='/resources/js/main.js'/>"></script>
   <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
   <script>
            // Form submission with Swal.fire confirmation
            document.querySelector('form').addEventListener('submit', function (e) {
                e.preventDefault();
                
                Swal.fire({
                    title: '요청서를 업체에 보내시겠습니까?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: '네, 요청합니다',
                    cancelButtonText: '아니오, 취소합니다',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: '요청서를 업체에 보냈습니다.<br>감사합니다.',
                          
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false,
                        });

                        setTimeout(function () {
                            document.querySelector('form').submit();
                        }, 2100);
                    }
                });
            });
        </script>
</body>
</html>