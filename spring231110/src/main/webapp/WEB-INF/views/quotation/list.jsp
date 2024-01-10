<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<link rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link href="<c:url value='/resources/css/index_all.css'/>"
	rel="stylesheet" type="text/css">
<link href="<c:url value='/resources/css/qutation.css'/>"
	rel="stylesheet" type="text/css">


</head>
<body>

	<jsp:include page="../common/nav.jsp" />

	<sec:authentication property="principal.mvo.id" var="authEmail" />
	<%-- <input type="text" value="${authEmail}" id="user_id" name="requestId"> --%>
	<input value="${authEmail }" type="hidden" id="authIdValue">
	<form action="/quotation/quotation" method="post">
		<div class="total">
			<div class="subject">받은 요청</div>
			<nav></nav>
			<div class="content">
				<div class="p_left">
					<ul id="u_left">
						<c:forEach items="${list }" var="qvo">
							<a href="#" onclick="handleClick_q(event,${qvo.requestNm })">
								<li class="list_requset" id="list_requset_${qvo.requestNm }">
									<span class="not_badge" id="not_badge_${qvo.requestNm }">미확인</span>
									<input type="hidden" value="${qvo.requestNm }" id="requestNm"
									class="quo_click">
									<div class="left_div_list">
										<span class="material-symbols-outlined"
											style="margin-right: 10px;">person</span> ${qvo.requestId }님의
										요청서
									</div>
									<div class="left_div_list">
										<span class="material-symbols-outlined"
											style="margin-right: 10px;"> fmd_bad </span>${qvo.form} |
										${qvo.categoryType}
									</div>

									<div class="left_div_list">
										<span class="material-symbols-outlined"
											style="margin-right: 10px;">calendar_month</span>
										<fmt:formatDate value="${qvo.reqAt}" pattern="yyyy-MM-dd" />
									</div>
							</li>
							</a>
						</c:forEach>

						<c:forEach items="${list_read}" var="qvo">
							<a href="#" onclick="handleClick_q(event,${qvo.requestNm })">
								<li class="list_requset_read" id="list_requset_${qvo.requestNm}">
									<span class="read_after" id="read_after_${qvo.requestNm}">
										<script type="text/javascript">
                 
                    if(${qvo.okTypeNo}==1){
                        let read_after= document.getElementById('read_after_${qvo.requestNm}');
                        read_after.innerText=`승인취소`;
                        read_after.style.color='gray';
                    }
                    
                    else{
                    	  let read_after= document.getElementById('read_after_${qvo.requestNm}');
                          read_after.innerText=`미승인`;
                          read_after.style.color='red';
                    }
                </script>


								</span> <input type="hidden" value="${qvo.requestNm }" id="requestNm"
									class="quo_click">
									<div class="left_div_list">
										<span class="material-symbols-outlined"
											style="margin-right: 10px;">person</span> ${qvo.requestId }님의
										요청서
									</div>
									<div class="left_div_list">
										<span class="material-symbols-outlined"
											style="margin-right: 10px;"> fmd_bad </span>${qvo.form} |
										${qvo.categoryType}
									</div>

									<div class="left_div_list">
										<span class="material-symbols-outlined"
											style="margin-right: 10px;">calendar_month</span>
										<fmt:formatDate value="${qvo.reqAt}" pattern="yyyy-MM-dd" />
									</div> <script type="text/javascript">
if(${qvo.okTypeYes}==1){
    let read_after= document.getElementById('read_after_${qvo.requestNm}');
    read_after.innerText=`승인함`;
    read_after.style.color='green';
}

</script>
							</li>
							</a>
						</c:forEach>
					</ul>


				</div>

				<div class="p_right">


					<ul id="u_right"></ul>


				</div>


			</div>
		</div>


	
	</form>

	<script
		src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>


	<script src="/resources/js/quotation_list.js">
	</script>

	<script type="text/javascript">
	
	</script>
	<jsp:include page="../common/footer.jsp" />
</body>
</html>