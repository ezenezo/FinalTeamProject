<%@ page language="java" contentType="text/html; charset=UTF-8"
     pageEncoding="UTF-8"%> 
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
 

<!DOCTYPE html>
<html lang="ko">
<style>
/* .total {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
}
 */
/* .subject {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
} */

/* .content {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
} */

/* 채팅 관련 스타일 */
.media {
    padding: 15px;
    border-bottom: 1px solid #eee;
    height : 70px;
}

.media img {
    border-radius: 50%;
}

.media-heading {
    font-weight: bold;
}
.subject {
    display: flex; /* Flexbox를 사용하여 아이템들을 가로로 배열 */
    justify-content: space-between; /* 아이템들 사이에 공간을 균등하게 분배 */
}

.find-link {
    margin-left: 20px; /* 원하는 간격을 설정 */
}
/* 추가적인 스타일링 필요 */


.split-container {
    display: flex;
    height: 90%
}

.left-panel {
    flex: 1.3; /* 비율에 따라 조정 가능 */
/*     background-color: #ADD8E6;  연한 파랑 */ 
        width: 10%;
        float: left;
     height: 441px; /* 고정된 높이 설정 */    
}

.right-panel {
    flex: 3; /* 비율에 따라 조정 가능 */
/*      background-color: #FFC0CB;  연한 빨강 */ 
}


.find-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  height: 510px;
}
@media (min-width: 768px) {
  .find-container {
   
    width: 300px;
  }
    #empList {
    overflow-y: auto;
    height: 45vh;
	/*     max-height: 100%;  left-panel의 높이를 넘지 않도록 설정 */
		overflow-x: hidden; /* 가로 스크롤바 숨기기 */
	}
}
@media (min-width: 992px) {
  .find-container {
	width: 345px;
  }
  
  #empList {
    overflow-y: auto;
    height: 50vh;
	/*     max-height: 100%;  left-panel의 높이를 넘지 않도록 설정 */
		overflow-x: hidden; /* 가로 스크롤바 숨기기 */
	}
}

@media (min-width: 1850px) {

  #empList {
    overflow-y: auto;
    height: 55vh;
	/*     max-height: 100%;  left-panel의 높이를 넘지 않도록 설정 */
		overflow-x: hidden; /* 가로 스크롤바 숨기기 */
	}
}


#empList {
    overflow-y: auto;
/*     max-height: 100%;  left-panel의 높이를 넘지 않도록 설정 */
	overflow-x: hidden; /* 가로 스크롤바 숨기기 */
}

#findID::placeholder {
    font-size: 13px; /* 플레이스홀더의 글자 크기 조정 */
}

</style>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

    <title>실시간 채팅 메신저 서비스</title>


    <link href="<c:url value='../resources/bootstrap337/css/custom.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='../resources/bootstrap337/css/bootstrap.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='../resources/css/r_side.css'/>" rel="stylesheet"	type="text/css">
 
	<link href="<c:url value='../resources/css/index_all.css'/>" rel="stylesheet" 	type="text/css">
	
	
 	<script src="/resources/bootstrap337/js/bootstrap.js"></script>
	
</head>

<body >
<%-- <jsp:include page="../common/header.jsp"/> --%>


<jsp:include page="../common/nav.jsp"/>
<jsp:include page="../common/l_side.jsp" />





<div class="total">
   
        	<!-- 패널 내용 S-->
	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	    <ul class="nav navbar-nav">
	   		<li><a href="/chaturl/chat">채팅메신저페이지</a> </li>
		    <li class="active"><a href="/member/index">메인</a></li>
		    <li><a href="/chaturl/find" class="find-link">사원찾기</a></li> <!-- 컨트롤러가 잡게 함 -->
		    <li><a href="/chaturl/box">메시지함<span id="unread" class="label label-info"></span></a></li> <!-- 컨트롤러가 잡게 함 -->
	    </ul>
	</div>
	
<div class="split-container">
    <div class="left-panel">

	<div class="find-container">
		<table class="table table-bordered table-hover" style="margin-bottom:1px; text-align: center; border: 1px solid #dddddd;">
			<thead>
				<tr>
					<th colspan="2" style="background-color: skyblue;"><h4 style="color: black;">검색으로 친구 찾기</h4></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style="width: 110px;"><h5>친구 아이디</h5></td>
					<td><input class="form-control" type="text" id="findID" maxlength="20" placeholder="찾을 아이디를 입력하세요"> </td>
				</tr>
				<tr>
					
					<td colspan="2">
					<input type="hidden" style="magin:1px; height: 37px; width: 20%;" type="text" id="chatName" class="form-control" value="${username}"  maxlength="8" readonly="readonly">
					<button id ="findFcBtn" class="btn btn-primary pull-right"  >검색</button> 
					</td>
				</tr>
			</tbody>
		</table>	
			
		<table id="friendResult" class="" style="text-align: center; border: 1px solid #dddddd; width: 100%">

						
		</table>
					
					
<!-- 					여기가 반복되면서 모든 친구 검색 결과를 알수 있는 부분임  S-->
<!-- 						모든 사원들 여러명이 보일수도 있는 위치           S-->
					<div id="empList">
					
						<div class="row">
							<div class="col-lg-12">
								<div class="media">
									<a class="pull-left" href="#">
										<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt="">
									</a>
								<div class="media-body">
									<h4 class="media-heading">
										chatName<span class="small pull-rigth"; style="margin-left: 10px;">     chatTime </span>
									</h4>
									<p>chatContent</p>
								</div>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-lg-12">
								<div class="media">
									<a class="pull-left" href="#">
										<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt="">
									</a>
								<div class="media-body">
									<h4 class="media-heading">
										chatName<span class="small pull-rigth"; style="margin-left: 10px;">     chatTime </span>
									</h4>
									<p>chatContent</p>
								</div>
								</div>
							</div>
						</div>
					
					</div>
<!-- 					여기가 반복되면서 모든 친구 검색 결과를 알수 있는 부분임  E-->
<!-- 						모든 사원들 여러명이 보일수도 있는 위치           E-->
			
		
					
	</div>
	


	</div>
	
	
<div class="right-panel">
<!-- 	<div class="container"> -->
<!-- 		<table class="table table-bordered table-hover" style="text-align: center; border: 1px solid #dddddd;"> -->
<!-- 			<thead> -->
<!-- 				<tr> -->
<!-- 					<th colspan="2" style="background-color: skyblue;"><h4 style="color: black;">검색으로 친구 찾기</h4></th> -->
<!-- 				</tr> -->
<!-- 			</thead> -->
<!-- 			<tbody> -->
<!-- 				<tr> -->
<!-- 					<td style="width: 110px;"><h5>친구 아이디</h5></td> -->
<!-- 					<td><input class="form-control" type="text" id="findID" maxlength="20" placeholder="찾을 아이디를 입력하세요"> </td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
					
<!-- 					<td colspan="2"> -->
<%-- 					<input type="hidden" style="height: 40px; width: 20%;" type="text" id="chatName" class="form-control" value="${username}"  maxlength="8" readonly="readonly"> --%>
<!-- 					<button id ="findFcBtn" class="btn btn-primary pull-right"  >검색</button>  -->
<!-- 					</td> -->
<!-- 				</tr> -->
<!-- 			</tbody> -->
<!-- 					<table id="AllfriendResult" class="" style="text-align: center; border: 1px solid #dddddd;"> -->
<!-- <!-- 					여기가 반복되면서 모든 친구 검색 결과를 알수 있는 부분임  --> 
<!-- <!--  						모든 사원들 여러명이 보일수도 있는 위치   --> 
<!-- 					<div class=""> -->
<!-- 						<div class=""> -->
<!-- 							<div class="media"> -->
<!-- 								<a class="pull-left" href="#"> -->
<!-- 									<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt=""> -->
<!-- 								</a> -->
<!-- 							<div class="media-body"> -->
<!-- 								<h4 class="media-heading"> -->
<!-- 									chatName -->
<!-- 								</h4> -->
								
<!-- 							</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
						
<!-- 					</table> -->
			
			
<!-- 		</table> -->
<!-- 	</div> -->
</div>

        
        
    </div>




 
</div>




			<!-- 모달창 뭐 언젠가 쓸거 같아서 일단 박아둠231117전경환 S-->
			<div class="modal" id="myModal" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Writer</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>

						<div class="modal-body">
							<div class="input-group mb-3">
								<input type="text" class="form-control" id="cmtTextModal"
									placeholder="Test Comment">
								<button class="btn btn-primary" id="cmtModBtn" type="button">댓글수정</button>
							</div>

							<div class="modal-footer">
								<button type="button" class="btn btn-secondary"
									data-bs-dismiss="modal">모달창닫기Close</button>

							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 모달창 뭐 언젠가 쓸거 같아서 일단 박아둠231117전경환 E-->












<script type="text/javascript" src="/resources/js/find.js"></script>

<!-- <script type="text/javascript" src="/resources/js/chat.js"></script> -->

<script type="text/javascript">
	printChatList();
</script>

    <script type="text/javascript">
        // 문서가 준비되면 실행될 함수를 정의합니다.
        function setup() {
            // input 필드에 keypress 이벤트 리스너를 추가합니다.
            document.getElementById('chatContent').addEventListener('keypress', function(e) {
                // 엔터 키의 키 코드는 13입니다.
                if (e.keyCode === 13) {
                    // 엔터 키가 눌렸다면, chatSubmitBtn의 클릭 이벤트를 트리거합니다.
                    document.getElementById('chatSubmitBtn').click();
                }
            });
        }

        // 페이지 로딩 후 setup 함수를 호출합니다.
        window.onload = setup;
    </script>


<jsp:include page="../common/footer.jsp"/>

</body>

</html>