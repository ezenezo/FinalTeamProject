<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Board Register Page</title>
 <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
	crossorigin="anonymous"></script>
<link href="../resources/css/sb-admin-2.css" rel="stylesheet">  

<!-- 서머노트를 위해 추가해야할 부분 -->
 <script src="/resources/js/summernote/summernote-lite.js"></script>
<script src="/resources/js/summernote/lang/summernote-ko-KR.js"></script>
<link rel="stylesheet" href="/resources/css/summernote/summernote-lite.css">
  <!--  -->
</head>
<body>
   <div class="box">
   <div class="box2">
	   
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
                        </div>
                        <div class="card-body">
			<form action="/board/register" method="post"
				enctype="multipart/form-data">

				<input type="hidden" name="bno">

				<%-- <sec:authorize access="isAuthenticated()">
					<sec:authentication property="principal.mvo.emp_no" var="authEmpNo" />
					<sec:authentication property="principal.mvo.nickName" var="authNick" />
					<sec:authentication property="principal.mvo.authList" var="auths" />
				</sec:authorize> --%>


				<div class="input-group mb-3">
					<select class="form-select" id="inputGroupSelect03"
						aria-label="Example select with button addon">
						<option selected>게시판을 선택해주세요.</option>
						<option value="1">익명</option>
						<option value="2">부서</option>
						<!-- principar로 부서,동호회정보 가져오기 -->
						<option value="3">동호회</option>
					</select>
				</div>


				<div class="mb-3">
					<input type="text" class="form-control" name="writer"
						placeholder="작성자(이거는 나중에 지울거임)">
				</div>
				<div class="mb-3">
					<input type="text" class="form-control" name="title"
						placeholder="제목을 입력해 주세요.">
				</div>
				<!-- <div class="mb-3">
					<textarea class="form-control" rows="5" name="content"
						placeholder="내용을 입력하세요."></textarea>
				</div>

				<div class="mb-3">
					<label for="f" class="form-label">FILE_UPLOAD</label> <input
						class="form-control" type="file" id="files" name="files"
						multiple="multiple">
				</div>
				<div id="fileZone">
					파일 출력하는 부분
				</div>  -->

<!-- 썸머노트 시작 -->
<div class="container">
  <textarea class="summernote" name="content"></textarea>    
</div>
<script>
$('.summernote').summernote({

	placeholder:'글 내용을 입력해 주세요.',
	height: 450,
	  lang: "ko-KR",
	  onImageUpload : function(files, editor,welEditable){
		  console.log(files);
		  console.log(files[0]);
		  
		  data = new FormData();
		  data.append("file",diles[0]);
		  
		  var $note = $(this);
		  $.ajax({
			data : data,
			type : "POST",
			url : "/board/imageupload",
			cache : false,
			contentType : false,
			processData : false,
			success : function(url){
				alert(url);
				$note.summernote('insertImage',url);
			}
		  });
	  }
	});
</script>
<!-- 썸머노트 끝 -->


				<div class="btnContainer">
					<button type="submit" class="btn btn-outline-primary" id="regBtn">등록</button>
					<a href="/member/index"><button type="button"class="btn btn-outline-primary" type="button">HOME</button></a>
				</div>
			</form>
	</div></div>
	</div></div>
	
</body>
</html>