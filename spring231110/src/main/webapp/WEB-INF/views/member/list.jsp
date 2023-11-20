<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>member list</title>
<link href="../resources/css/index_all.css" rel="stylesheet">
<style type="text/css">
.container-fluid {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.pagination {
	justify-content: center;
}
</style>
</head>

<body>
	<jsp:include page="../common/header.jsp" />
	<jsp:include page="../common/nav.jsp" />
	<jsp:include page="../common/l_side.jsp" />
	<div class="total">
		<div class="subject">주제입니다.</div>
		<div class="content">
			<!-- 검색 라인 -->
			<div class="container-fluid">
				<form action="/member/list" class="d-flex" role="search"
					method="get">
					<c:set value="${ph.pgvo.type}" var="typed"></c:set>
					<div>
						<select name="type" class="form-select" id="inputGroupSelect01">
							<option ${typed eq null?'selected':''}>선택</option>
							<option value="e" ${typed eq 'e'?'selected':''}>사원명</option>
							<option value="n" ${typed eq 'n'?'selected':''}>아이디</option>
							<option value="n" ${typed eq 'n'?'selected':''}>부서</option>
							<option value="n" ${typed eq 'n'?'selected':''}>동아리</option>
							<option value="en" ${typed eq 'en'?'selected':''}>all</option>
						</select>
					</div>
					<div>
						<input class="form-control me-2" name="keyword"
							value="${ph.pgvo.keyword}" type="search" placeholder="Search"
							aria-label="Search">
					</div>
					<input type="hidden" name="pageNo" value="1"> <input
						type="hidden" name="qty" value="${ph.pgvo.qty}">
					<button class="btn btn-primary position-relative" type="submit">
						검색</button>
				</form>
			</div>

			<div class="listBox">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">사원명</th>
							<th scope="col">아이디</th>
							<th scope="col">주소</th>
							<th scope="col">전화번호</th>
							<th scope="col">부서</th>
							<th scope="col">생년월일</th>
							<th scope="col">동아리</th>
							<th scope="col">마지막 접속일</th>

						</tr>
					</thead>

					<tbody>

						<c:forEach items="${list}" var="mvo">
							<tr>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.empNm }</a></td>
								<th><a href="/member/detail?id=${mvo.id}">${mvo.id }</a></th>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.addr }</a></td>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.phone }</a></td>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.depCd }</a></td>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.empBirth }</a></td>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.clubCd }</a></td>
								<td><a href="/member/detail?id=${mvo.id}">${mvo.lastLogin }</a></td>
							</tr>
						</c:forEach>
					</tbody>
				</table>

				<!-- 페이징 라인 -->
				<!-- 		<div> -->
				<!-- 			<nav aria-label="Page navigation example"> -->
				<!-- 				<ul class="pagination"> -->
				<!-- 					이전(prev) -->
				<%-- 					<li class="page-item ${(ph.prev eq false)?'disabled':''}"><a --%>
				<!-- 						class="page-link" -->
				<%-- 						href="/member/list?pageNo=${ph.startPage -1}&qty=${ph.pgvo.qty}&type=${ph.pgvo.type}&keyword=${ph.pgvo.keyword}" --%>
				<!-- 						aria-label="Previous"> <span aria-hidden="true">&laquo;</span> -->
				<!-- 					</a></li> -->
				<%-- 					<c:forEach begin="${ph.startPage }" end="${ph.endPage}" var="i"> --%>
				<!-- 						<li class="page-item"><a class="page-link" -->
				<%-- 							href="/member/list?pageNo=${i}&qty=${ph.pgvo.qty}&type=${ph.pgvo.type}&keyword=${ph.pgvo.keyword}">${i}</a></li> --%>
				<%-- 					</c:forEach> --%>

				<!-- 					다음(next) -->
				<%-- 					<li class="page-item ${(ph.next eq false)?'disabled':''}"><a --%>
				<!-- 						class="page-link" -->
				<%-- 						href="/member/list?pageNo=${ph.endPage +1}&qty=${ph.pgvo.qty}&type=${ph.pgvo.type}&keyword=${ph.pgvo.keyword}" --%>
				<!-- 						aria-label="Next"> <span aria-hidden="true">&raquo;</span> -->
				<!-- 					</a></li> -->
				<!-- 				</ul> -->
				<!-- 			</nav> -->
				<!-- 		</div> -->
				<div>
					<nav aria-label="Page navigation example">
						<ul class="pagination">
							<!-- 이전(prev) -->
							<li class="page-item ${(ph.prev eq false)?'disabled':''}"><a
								class="page-link"
								href="/board/list?pageNo=${ph.startPage -1}&qty=${ph.pgvo.qty}&type=${ph.pgvo.type}&keyword=${ph.pgvo.keyword}"
								aria-label="Previous"> <span aria-hidden="true">&laquo;</span>
							</a></li>
							<c:forEach begin="${ph.startPage}" end="${ph.endPage}" var="i">
								<li class="page-item ${i == ph.pgvo.pageNo ? 'active' : ''}"><a
									class="page-link"
									href="/board/list?pageNo=${i}&qty=${ph.pgvo.qty}&type=${ph.pgvo.type}&keyword=${ph.pgvo.keyword}">${i}</a></li>
							</c:forEach>

							<!-- 다음(next) -->
							<li class="page-item ${(ph.next eq false)?'disabled':''}"><a
								class="page-link"
								href="/board/list?pageNo=${ph.endPage +1}&qty=${ph.pgvo.qty}&type=${ph.pgvo.type}&keyword=${ph.pgvo.keyword}"
								aria-label="Next"> <span aria-hidden="true">&raquo;</span>
							</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>

	<jsp:include page="../common/footer.jsp" />
</body>
</html>