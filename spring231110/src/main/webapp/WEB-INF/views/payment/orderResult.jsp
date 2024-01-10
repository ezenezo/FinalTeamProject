<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
   href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<link rel="stylesheet" href="../resources/css/orderResult.css">
<!-- jQuery -->
<script type="text/javascript"
   src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script type="text/javascript"
   src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
   <jsp:include page="../common/nav.jsp"></jsp:include>
   <div class="navBorder"></div>
   <h1 class="title">주문결제</h1>
   <div class="border"></div>

   <!-- 결제 전 확인할 정보들 -->
   <section>
      <!-- 왼쪽 주문 정보 확인 -->
      <div class="leftSection">
         <!-- 주소정보 -->
         <div>
            <h2 class="addressTitle">주소정보</h2>
            <div class="userInfo">
               <c:if test="${pfvo ne null }">
                  <img alt=""
                     src="/upload/${pfvo.saveDir}/${pfvo.uuid}_${pfvo.fileName}"
                     class="profileImg">
               </c:if>
               <c:if test="${pfvo eq null }">
                  <img alt="" src="../resources/img/profile_none.png"
                     class="profileImg">
               </c:if>
               <div class="exceptImg">
                  <p class="userNm bold" data-name="${mvo.userNm }">${mvo.userNm }님</p>
                  <p class="email seventeen">${mvo.email }</p>
               </div>
            </div>
         </div>
         <div>
            <h2 class="portTitle">
               주문상품
               <p id="text">현재 페이지에서는 변경이 불가능합니다.</p>
            </h2>
            <p class="companyNm">
               <span class="material-symbols-outlined"> store </span>${pdto.pvo.userNm }</p>
            <div class="portInfo">
               <div class="portfolio">
                  <img class="portfolioMainImg"
                     src="/upload/${pdto.mainImg.saveDir}/${fn:replace(pdto.mainImg.saveDir,'\\','-')}_${pdto.mainImg.uuid}_${pdto.mainImg.fileName}">
                  <div>
                     <p class="portNm">${pdto.pvo.title }</p>
                     <p class="portDetail">${pdto.pvo.homeType }/${pdto.pvo.familyType }/
                        ${pdto.pvo.homeStyle }</p>
                  </div>
               </div>
               <div class="discountDiv">
                  <p>최종가격</p>
                  <div class="priceDiv">
                     <p class="budget">
                        <fmt:formatNumber value="${qvo.budget}" pattern="#,###" />
                        원
                     </p>
                     <fmt:parseNumber var="discountPrice"
                        value="${qvo.budget * (cvo.percent/100)}" integerOnly="true" />

                     <!-- 적용 금액 -->
                     <c:if test="${cvo.percent ne 0}">
                        <c:if test="${discountPrice >cvo.maxAmount}">
                           <c:set var="realDiscount" value="${cvo.maxAmount }"></c:set>
                        </c:if>
                        <c:if test="${discountPrice <cvo.maxAmount}">
                           <c:set var="realDiscount" value="${discountPrice }"></c:set>
                        </c:if>
                     </c:if>
                     <c:if test="${cvo.discount ne 0}">
                        <c:set var="realDiscount" value="${cvo.discount }"></c:set>
                     </c:if>

                     <span class="material-symbols-outlined"> trending_flat </span>
                     <c:set var="price" value="${qvo.budget - realDiscount}"></c:set>
                     <p class="finalPrice" data-price="${price }" id="finalPrice">
                        <fmt:formatNumber value="${price}" pattern="#,###" />
                        원
                     </p>
                  </div>
               </div>
            </div>
         </div>


         <div>
            <h2 class="discountTitle">할인/포인트</h2>
            <div>
               <p class="couponDiscount">
                  <span class="material-symbols-outlined"> local_activity </span>쿠폰할인
               </p>
               <div class="coupon">
                  <input type="text" value="${cvo.couponNum }" hidden="hidden"
                     id="coupon">
                  <p class="discountCoupon">할인쿠폰</p>
                  <p class="finalPrice">
                     -
                     <fmt:formatNumber value="${realDiscount }" pattern="#,###" />
                  </p>
                  <p>원</p>
                  <button type="button"
                     onclick="popup('${mvo.id}', ${pdto.pvo.pno}, ${qvo.quotationNm})"
                     class="couponChange">쿠폰변경</button>
               </div>
               <div>
                  <div class="couponDiscount">
                     <span class="material-symbols-outlined"> monetization_on </span>포인트
                     <p id="text">최종금액의 1%가 적립됩니다.</p>
                  </div>
                  <div class="pointDiv">
                     <p>사용 가능 포인트</p>
                     <div class="pointBox">
                        <input type="number" id="point" data-max="${mvo.point }"><span>원</span>
                        <button type="button" id="allUseBtn">전액사용</button>
                     </div>
                     <p>사용가능</p>
                     <p>
                        <fmt:formatNumber value="${mvo.point }" pattern="#,###" />
                        P
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <h2 class="payTitle" data-pg="0">결제방법</h2>
            <div class="payList">
               <div class="pay">
                  <input type="radio" value="tosspay" name="pg" class="pg">
                  <div class="center">
                     <img alt="" src="../resources/img/toss.jpg" id="toss">토스페이
                  </div>
               </div>
               <div class="pay">
                  <input type="radio" value="smilepay" name="pg" class="pg">
                  <div class="center">
                     <img alt="" src="../resources/img/smilepay.jpg" id="smile">스마일페이
                  </div>
               </div>
               <div class="pay">
                  <input type="radio" value="kakaopay" name="pg" class="pg">
                  <div class="center">
                     <img alt="" src="../resources/img/kakaopay.png">카카오페이
                  </div>
               </div>
               <div class="pay" id="normal">
                  <input type="radio" value="html5_inicis" name="pg" class="pg">
                  <div>일반결제</div>
               </div>
            </div>
         </div>
      </div>

      <!-- 오른쪽 결제 금액 확인창 -->
      <div class="sticky">
         <h1 class="stickyTitle">결제 예정금액</h1>
         <div class="rightWon">
            <p>상품금액</p>
            <p class="bold">
               <fmt:formatNumber value="${qvo.budget}" pattern="#,###" />
               원
            </p>
         </div>
         <div class="rightWon">
            <p>쿠폰 할인금액</p>
            <p class="bold red">
               -
               <fmt:formatNumber value="${realDiscount }" pattern="#,###" />
               원
            </p>
         </div>
         <div class="rightWon">
            <p>포인트 할인금액</p>
            <p class="bold red" id="pointDiscount">-0원</p>
         </div>
         <div class="rightWon final">
            <p class="red">합계</p>
            <p class="bold red finalPrice">
               <fmt:formatNumber value="${price }" pattern="#,###" />
               원
            </p>
         </div>
         <p class="agree">하기 필수약관을 확인하였으며 결제에 동의합니다.</p>
         <button type="button"
            onclick="requestPay('${mvo.id}', ${qvo.quotationNm}, ${cvo.couponNum })"
            class="payBtn">결제하기</button>
         <div class="agreeList">
            <p class="agreeTitle">개인정보 수집 및 이용 동의</p>
            <div class="id_agrmt">
               <p>고객님께서는 아래 내용에 대하여 동의를 거부하실 수 있으며, 거부 시 상품배송, 구매 및 결제, 일부 포인트
                  적립이 제한됩니다.</p>
               <table>
                  <caption>개인정보 수집 내용</caption>
                  <colgroup>
                     <col width="35%">
                     <col width="30%">
                     <col width="35%">
                  </colgroup>
                  <tbody>
                     <tr>
                        <th scope="col">수집이용목적</th>
                        <th scope="col">수집 항목</th>
                        <th scope="col">보유기간</th>
                     </tr>
                     <tr>
                        <td>대금 결제/환불 서비스 제공, 주문/배송/거래 내역 조회 서비스 제공, 전자상거래법 준수 등</td>
                        <td>신용카드 정보, 계좌 정보, 주문/배송/거래 내역</td>
                        <td rowspan="3"><strong class="txt_point"> 회원탈퇴 시
                              까지 단, 관계 법령의 규정에 따라 보존할 의무가 있으면 해당 기간 동안 보존 <br> <br>
                              가. 개별적으로 고객님의 동의를 받은 경우에는 약속한 보유기간<br> 나. 통신사실확인자료 제공 시
                              필요한 로그기록자료, IP주소 등 : 3개월 (통신비밀보호법)<br> 다. 계약 또는 청약철회 등에
                              관한 기록 : 5년 (전자상거래법)<br> 라. 대금결제 및 재화 등의 공급에 관한 기록 : 5년
                              (전자상거래법)<br> 마. 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래법)<br>
                              바. 서비스제공과 관련된 문의사항 응대를 위해 서비스사용로그는 서비스 종료 후 1개월간 회사방침에 의해 보존<br>
                        </strong></td>
                     </tr>
                     <tr>
                        <td>현금영수증 발급(현금영수증 신청 시)</td>
                        <td>현금영수증 신청정보(현금영수증카드번호, 휴대전화번호)</td>
                     </tr>
                     <tr>
                        <td>상품 및 경품(포인트, 쿠폰 포함) 배송(반품/환불/취소등), 배송지 확인, 최초 입력 후 불러오기
                           기능 제공</td>
                        <td>아이디, 배송지 정보 (수령인,유무선 포함 연락처,주소), 이메일주소(입력시), 공동현관
                           출입번호(입력,저장선택시)</td>
                     </tr>
                     <!--PIN번호(정보입력)상품 주문시 노출  -->
                     <tr id="idArmt2View_sub4" style="display: none;">
                        <td>국내항공권 예약(반품/환불/취소등), 예약자 정보 확인</td>
                        <td>법정생년월일</td>
                        <td>배송완료 후<br>5년 보관
                        </td>
                     </tr>
                     <!-- //PIN번호(정보입력)상품 주문시 노출 -->
                  </tbody>
               </table>
               <p>이용계약(이용약관)이 존속중인 탈퇴하지 않은 회원의 경우 보유기간은 보존의무기간 이상 보관할 수 있으며 이
                  기간이 경과된 기록에 대해서 파기요청이 있는 경우 파기함</p>
               <p>결제수단에 따른 개인정보 수집.이용 항목이 상이할 수 있음</p>
            </div>
         </div>
         <div>
            <p class="agreeTitle">주문 상품정보 동의</p>
            <div class="id_agrmt">
               <p>주문 상품의 상품명, 가격, 배송정보에 동의합니다.</p>
            </div>
         </div>
      </div>
   </section>

   <jsp:include page="../common/footer.jsp"></jsp:include>
</body>
<script type="text/javascript">
   var IMP = window.IMP;
   IMP.init("imp13246533");
</script>
<script type="text/javascript" src="../resources/js/payment.js"></script>
<script type="text/javascript" src="../resources/js/orderResult.js"></script>
</html>