<%@ page language="java" contentType="text/html; charset=UTF-8"
     pageEncoding="UTF-8"%> 
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
 <%@ page session="false" %> 

<!DOCTYPE html>
<html lang="ko">
<style>

</style>
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>실시간 채팅 메신저 서비스</title>

<%--     <link href="<c:url value='../resources/bootstrap337/css/custom.css'/>" rel="stylesheet" type="text/css"> --%>
<%-- 	<link href="<c:url value='../resources/bootstrap337/css/bootstrap.css'/>" rel="stylesheet" type="text/css"> --%>
<%-- 	<link href="<c:url value='/resources/css/r_side.css'/>" rel="stylesheet"	type="text/css"> --%>

	<link href="<c:url value='/resources/css/index_all.css'/>" rel="stylesheet" 	type="text/css">
	<link href="<c:url value='../resources/css/chat2.css'/>" rel="stylesheet" 	type="text/css">
<!-- 	<link rel="stylesheet" type="text/css" href="경로/chat2.css"> -->
<!-- <link rel="stylesheet" href="/resources/css/main.css"> -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

</head>

<body >

<jsp:include page="../common/nav.jsp"/>

 
<div class="total">



   <div class="navBorder"></div>
 
   <div class="header-container">
   	<h1 class="title"> 채팅 상대방 :  <%= request.getParameter("toID") %></h1>
   	              
                
                       
                
            
	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	    <ul class="nav navbar-nav">
	        <li>
	            <a href="/chaturl/box" class="message-box-link">
	                메시지함
	                <span id="unread" class="label label-info"></span>
	                <i class="fas fa-envelope"></i> <!-- Font Awesome envelope icon -->
	            </a>
	        </li>

	    </ul>
	</div>
   	</div>
   <div class="border"></div>







<div id = "chattotal">
<!-- 231111_1전경환 채팅창관련해서 뭐 넣기 S -------------------------------------> <!-- class="content" -->
<!-- https://www.youtube.com/watch?v=8s98IhtgwZ0&list=PLRx0vPvlEmdAlUbX_TGDxaSxKCvfl2isa&index=6 -->
<div >
    <div >
        <div >
            <div >
                <div class="portlet-heading">
                	<div class="portlet-title">
<!--                     	<h4><i class="fa fa-circle text-green"></i>실시간 채팅창</h4> -->
                    </div>	
                	<div class="clearfix"></div>
            	</div>
	            <div id="chat" >
	                <div id="chatList2" style=""> <!-- portlet-body chat widget -->
	                <!--------------- 여기에 뭔가 주루루륵 반복해서 들어가는 부분 같음 S------------------------------------------------------------------->
					<div style="margin:20px;">채팅 시작 전입니다.</div>
<!-- 					<div class="row"> -->
<!-- 						<div class="col-lg-12"> -->
<!-- 							<div class="media"> -->
<!-- 								<a class="pull-left" href="#"> -->
<!-- 									<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt=""> -->
<!-- 								</a> -->
<!-- 							</div> -->
<!-- 							<div class="media-body"> -->
<!-- 								<h4 class="media-heading"> -->
<!-- 									chatName<span class="small pull-rigth">chatTime </span> -->
<!-- 								</h4> -->
<!-- 								<p>chatContent</p> -->
<!-- 							</div> -->
							
<!-- 						</div> -->
<!-- 					</div> -->
					
<!-- 					<div class="row"> -->
<!-- 						<div class="col-lg-12"> -->
<!-- 							<div class="media"> -->
<!-- 								<a class="pull-left" href="#"> -->
<!-- 									<img class="media-object img-circle" style="width: 30px; height:30px;" src="/resources/img/anoyicon.png" alt=""> -->
<!-- 								</a> -->
<!-- 							<div class="media-body"> -->
<!-- 								<h4 class="media-heading"> -->
<!-- 									chatName<span class="small pull-rigth"; style="margin-left: 10px;">     chatTime </span> -->
<!-- 								</h4> -->
<!-- 								<p>chatContent</p> -->
<!-- 							</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
	                <!--------------- 여기에 뭔가 주루루륵 반복해서 들어가는 부분 같음 E------------------------------------------------------------------->
	                </div>
	                <div id="messageinputboxbigdiv">    
	                    <div>
	                        <div>
<%-- 	                        <input type="text" id="chatName" value="${username}" /> --%>

								<!-- jgh231213 채팅자 이름 안보이게 처리 -->
	                            <input style="height: 30px; width: 20%;" type="text" id="chatName" class="form-control" value="${username}"  maxlength="8" readonly="readonly">
	                        </div>
	                    </div>
						<div id = "messageinputbox1" style="">
						    <div style="flex:0.97;">
						    	
						        <textarea id="chatContent" style=""  class="form-control" placeholder="메시지를 입력하세요" maxlength="100"></textarea>
						    	
						    </div>
						    <div>
						        <button id="chatSubmitBtn" type="button" class="btn btn-default" >전송</button>
						    </div>
						</div>

	                </div>
	            </div>
           </div>
        </div>
    </div>
</div>
<div class="alert alert-success" id="successMessage" style="display: none;">
	<strong>메세지 전송에 성공했습니다.</strong>
</div>
<div class="alert alert-danger" id="dangerMessage" style="display: none;">
	<strong>이름과 내용을 모두 입력하세요</strong>
</div>
<div class="alert alert-warning" id="warningMessage" style="display: none;">
	<strong>데이터베이스 오류 발생</strong>
</div>



<!-- 231111_1전경환 채팅창관련해서 뭐 넣기 E ------------------------------------->
</div>
</div>





<script type="text/javascript" src="/resources/js/chat2.js"></script>
<!-- <script type="text/javascript" src="/resources/js/chat.js"></script> -->
<script type="text/javascript">
	printChatList();
</script>

    <script type="text/javascript">
		 // 문서가 준비되면 실행될 함수를 정의합니다.
		    function setup() {
		        // input 필드에 keydown 이벤트 리스너를 추가합니다.
		        document.getElementById('chatContent').addEventListener('keydown', function(e) {
		            // 엔터 키의 키 코드는 13입니다.
		            if (e.keyCode === 13 && !e.shiftKey) {
		                // 엔터 키가 눌렸고 Shift 키가 눌리지 않았다면, chatSubmitBtn의 클릭 이벤트를 트리거합니다.
		                document.getElementById('chatSubmitBtn').click();
		                // 기본 동작을 막습니다 (새 줄 입력 방지)
		                e.preventDefault();
		            }
		        });
		    }
		
		    // 페이지 로딩 후 setup 함수를 호출합니다.
		    window.onload = setup;
    </script>


<jsp:include page="../common/footer.jsp"/>

</body>

</html>