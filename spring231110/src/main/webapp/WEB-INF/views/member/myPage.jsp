<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
   prefix="sec"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
   href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
<link href="../resources/css/status.css" rel="stylesheet">
</head>
<body>


   <jsp:include page="../common/nav.jsp" />
   <sec:authorize access="isAuthenticated()">
   
   <script type="text/javascript" src="../resources/js/status.js"></script>
      <sec:authentication property="principal.mvo" var="user" />
      <!-- 왼쪽 구역 프로필 -->
      <div class="main">
         <div id="userInfoBox">
            <c:if test="${fvo ne null }">
               <img alt=""
                  src="/upload/${fvo.saveDir}/${fvo.uuid}_${fvo.fileName}"
                  class="profileImg">
            </c:if>
            <c:if test="${fvo eq null }">
               <img alt="" src="../resources/img/profile_none.png"
                  class="profileImg">
            </c:if>
            <div class="userInfo">
               <p class="userNm">${user.userNm }</p>
               <p class="email">${user.email }</p>
               <a href="/member/modify?id=${user.id }"><button type="button"
                     class="modifyUserInfoBtn">설정</button></a>
            </div>
            <hr>
            <div class="subUser">
               <div class="iconBox">
                  <i class="bi bi-heart noClick" data-id="${user.id }"></i><span>좋아요</span>
                  <p>${heart }</p>
               </div>
               <div class="iconBox">
                  <img alt="" src="../resources/img/free-icon-ticket-7937829.png"><span>내
                     쿠폰</span>
                  <p>${couponCount }</p>
               </div>
            </div>
         </div>

         <!-- 오른쪽 구역 -->
         <section>
            <nav class="mypageNav">
               <ul>
                  <li onclick="spreadStatusList('${user.id}')">진행상황</li>

                  
                  <li onclick="spreadReviewList('${user.id}')">내가 쓴 리뷰</li>
                  
                  <li onclick="spreadCouponList('${user.id}')">쿠폰함</li>
                  <li onclick="spreadHeartList('${user.id}')">좋아요</li>
               </ul>
            </nav>

            <script type="text/javascript">spreadStatusList('${user.id}');</script>
            <div class="subMain">

            </div>
         </section>
      </div>
   </sec:authorize>
   <jsp:include page="../common/footer.jsp"></jsp:include>

</body>
<script type="text/javascript">
let id = `<c:out value="${user.id}"/>`;
</script>

<link href="../resources/css/myPage.css" rel="stylesheet">
<script type="text/javascript" src="../resources/js/mypage.js"></script>
</html>