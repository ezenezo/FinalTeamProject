package com.myweb.www.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.handler.PagingHandler;
import com.myweb.www.service.commentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/comment/*")
@Slf4j
public class commentController {

	private commentService csv;

	@Autowired
	public commentController(commentService csv) {
		this.csv = csv;
	}

	// 댓글 등록
	@PostMapping(value = "/postcmt", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> postcmt(@RequestBody CommentVO cvo) {
		int isOk = csv.commentWrite(cvo);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 댓글 리스트 출력
	@GetMapping(value = "/list/{pno}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PagingHandler> list(@PathVariable("pno") long pno, @PathVariable("page") int page,
			Principal principal) {
		log.info("pno>>>>>" + pno);
		log.info("pageNo>>>>>" + page);

		String authId = principal.getName().toString();

		PagingVO pgvo = new PagingVO(page, 5); // qty=5

		PagingHandler ph = csv.getList(pno, pgvo, authId);

		return new ResponseEntity<PagingHandler>(ph, HttpStatus.OK);
	}

	// 댓글 리스트 출력
	@GetMapping(value = "/reviewCommentlist/{rno}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PagingHandler> reviewCommentlist(@PathVariable("rno") long rno, @PathVariable("page") int page,
			Principal principal) {

		String authId = principal.getName().toString();

		PagingVO pgvo = new PagingVO(page, 5); // qty=5

		PagingHandler ph = csv.getReviewCommentList(rno, pgvo, authId);

		return new ResponseEntity<PagingHandler>(ph, HttpStatus.OK);
	}

	// 댓글 삭제
	@DeleteMapping(value = "/remove/{cno}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> remove(@PathVariable("cno") long cno) {

		int isOk = csv.remove(cno);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);

	}

	// 댓글 수정
	@PutMapping(value = "/modify", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> modify(@RequestBody CommentVO cvo) {

		int isOk = csv.modify(cvo);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);

	}

	// 댓글 좋아요
	@PostMapping(value = "/commentLike/{cmtNo}/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> boardLike(@PathVariable("cmtNo") long cmtNo, @PathVariable("id") String id) {

		// 체크되어있는지 안되어있는지 확인
		// 1이면 이미 체크, 0이면 아닌거
		int check = csv.CommentLikeCheck(cmtNo, id);

		if (check > 0) { // 이미 체크가 되어있으면
			// like취소
			csv.deleteCommentLike(cmtNo, id);

			return new ResponseEntity<String>("0", HttpStatus.OK);
		} else { // 체크가 안되어있다면
			// like체크
			csv.addCommentLike(cmtNo, id);
			return new ResponseEntity<String>("1", HttpStatus.OK);
		}

	}

	// 좋아요수 내보내기
	@GetMapping(value = "/likeCount/{cmtNo}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> likeQtyAreaInput(@PathVariable("cmtNo") long cmtNo) {
		int likeQty = csv.likeQtyAreaInput(cmtNo);
		String likeQtyStr = String.valueOf(likeQty);
		return new ResponseEntity<String>(likeQtyStr, HttpStatus.OK);
	}

}
