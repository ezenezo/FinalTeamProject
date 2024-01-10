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
         <div class="userContainer">
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
                     <i class="bi bi-heart"></i> <span>받은 좋아요</span>
                     <p>${heartCount}</p>
                  </div>
                  <div class="iconBox">
                     <span class="material-symbols-outlined reviewIcon">
                        rate_review </span><span>받은 리뷰</span>
                     <p>${reviewCount}</p>
                  </div>
               </div>
            </div>

            <a href="/portfolio/register"><button id="moreBtn" class="writePortfolioBtn moreBtn" type="button">포트폴리오 작성하기</button></a>
            <a href="/member/companyInfo?id=${user.id}"><button id="moreBtn" class="writePortfolioBtn moreBtn" type="button">기업정보 더보기</button></a>
            
         </div>

         <section class="rightSection">
   
            <div class="menu">
               <div class="leftText">
                  <p class="miniTitle">진행 상황</p>
               </div>
            </div>

            <script type="text/javascript">spreadStatusList('${user.id}');</script>
            <div class="rightBoxbox boxNum1"></div>

            <div class="menu">
               <div class="leftText">
                  <p class="miniTitle">나의 포트폴리오</p>
               </div>
               <div class="rightText">
                  <a href="/portfolio/mylist?id=${user.id}"><p>더보기</p></a>
               </div>
            </div>
            <div class="rightBoxbox boxNum2">
               <c:forEach items="${mdto.pdtoList}" var="pdto" begin="0" end="3">
                  <div class="wid22">
                     <a href="/portfolio/portfolioDetail?pno=${pdto.pvo.pno}">
                           <img class="portfolioMainImg"
                              src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">

                     </a>
                        <p class="pdtoBoxTitle">${pdto.pvo.title}</p>
                           <span>좋아요${pdto.pvo.likeQty} </span><span>조회수${pdto.pvo.readQty}</span>
                        </p>
                  </div>

               </c:forEach>

            </div>
         </section>
      </div>
   </sec:authorize>
   <jsp:include page="../common/footer.jsp"></jsp:include>

</body>
<link href="../resources/css/companyMyPage.css" rel="stylesheet">
<link href="../resources/css/myPage.css" rel="stylesheet">
</html>