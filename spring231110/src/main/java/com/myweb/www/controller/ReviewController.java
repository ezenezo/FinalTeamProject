package com.myweb.www.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.myweb.www.domain.FileVO;

import com.myweb.www.domain.PagingVO;

import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;
import com.myweb.www.handler.FileHandler;

import com.myweb.www.handler.PagingHandler;

import com.myweb.www.security.MemberDTO2;
import com.myweb.www.service.QuotationService;
import com.myweb.www.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/review/*")
@Controller
public class ReviewController {
	private ReviewService rsv;
	private FileHandler fh;
	private QuotationService qsv;

	@Autowired
	public ReviewController(ReviewService rsv, FileHandler fh, QuotationService qsv) {
		this.rsv = rsv;
		this.fh = fh;
		this.qsv = qsv;
	}

	@GetMapping("/register")
	public String register(@RequestParam("quotationNm") long quoNm, Model model) {
//		
		QuotationVO qvo = qsv.selectQuotation(quoNm);
		String comId=rsv.getCompanyId(qvo.getKeynum());

		model.addAttribute("qvo", qvo);
		model.addAttribute("comId", comId);
		return "/review/register";
	}

	// 리뷰 img 저장
	@PostMapping(value = "image-upload", consumes = "multipart/form-data", produces = "text/plain;charset=UTF-8")
	public ResponseEntity<String> imageUpload(@RequestParam MultipartFile image) {
		if (image.isEmpty()) {
			return new ResponseEntity<>("", HttpStatus.OK);
		}

		FileVO fvo = fh.uploadFiles(image);

		LocalDate date = LocalDate.now();
		String today = date.toString();

		String fullFileName = today + "_" + fvo.getUuid() + "_" + fvo.getFileName();

		String saveDir = fvo.getSaveDir();

		return new ResponseEntity<>(fullFileName, HttpStatus.OK);

	}

	// 리뷰 img 렌더링

	@GetMapping(value = "/image-print/{filename}", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	@ResponseBody
	public byte[] printEditorImage(@PathVariable("filename") String filename) {

		// '_'를 기준으로 나누기
		String[] parts = filename.split("_");

		// today 추출
		String today = parts[0];

		String todaySe = today.replace("-", File.separator);

//		LocalDate date = LocalDate.now();
//		String today = "2023-12-01";
//		today = today.replace("-", File.separator);

		// 업로드된 파일의 전체 경로saveDir
		String fileFullPath = Paths.get(fh.getUP_DIR() + todaySe + File.separator + filename).toString();

		// 파일이 없는 경우 예외 throw
		File uploadedFile = new File(fileFullPath);
		if (uploadedFile.exists() == false) {
			throw new RuntimeException();
		}

		try {
			// 이미지 파일을 byte[]로 변환 후 반환
			byte[] imageBytes = Files.readAllBytes(uploadedFile.toPath());
			return imageBytes;

		} catch (IOException e) {
			// 예외 처리는 따로 해주는 게 좋습니다.
			throw new RuntimeException(e);
		}
	}

	// 리뷰 등록
	@PostMapping(value = "/add")
	public ResponseEntity<String> addReview(@RequestParam("id") String id, @RequestParam("comId") String comId,
			@RequestParam("title") String title, @RequestParam("content") String content,
			@RequestParam("rate") int rate, @RequestParam("homeSize") String homeSize, @RequestParam("form") String form,
			@RequestParam("categoryType") String categoryType,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {

		FileVO reviewMainImg = fh.uploadFiles(imageFile);

		ReviewVO rvo = new ReviewVO();
		rvo.setId(id);
		rvo.setComId(comId);
		rvo.setTitle(title);
		rvo.setContent(content);
		rvo.setRate(rate);
		rvo.setHomeSize(homeSize);
		rvo.setForm(form);
		rvo.setCategoryType(categoryType);
		rvo.setComName(rsv.getComName(comId));


		int isOk = rsv.addReview(rvo, reviewMainImg);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/printList", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ReviewDTO>> printListReivewDto() {
		List<ReviewDTO> rdtoList = rsv.mainRdtoList();
		return new ResponseEntity<List<ReviewDTO>>(rdtoList, HttpStatus.OK);
	}

	// 하나의 업체 리뷰리스트(페이징)
	@GetMapping(value = "/printListCompanyInfo/{id}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PagingHandler> printListReivewDtoCompanyInfo(@PathVariable("id") String id,
			@PathVariable("page") int page) {

		PagingVO pgvo = new PagingVO(page, 5); // qty=5
		PagingHandler list = rsv.getList(id, pgvo);

		return new ResponseEntity<PagingHandler>(list, HttpStatus.OK);
	}
	
	// 하나의 업체 리뷰 리스트(페이징x)
	@GetMapping(value = "/getReviewList/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ReviewDTO>> getReviewList(@PathVariable("id") String id) {
		
		log.info("id 잘 오는지>>{}"+id);

		List<ReviewDTO> rdtoList = rsv.getRdtoList(id);
		
		log.info("rdtoList 잘 오는지>>{}"+rdtoList);

		return new ResponseEntity<List<ReviewDTO>>(rdtoList, HttpStatus.OK);
	}
	
	// 리뷰전체 리스트(처음)
	@GetMapping("/allReviewList")
	public String allReviewList() {
		return "/review/reviewList";
	}

	// 리뷰전체 리스트(더보기버튼)
	@GetMapping(value = "/allReviewListMore/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PagingHandler> allReviewListMore(@PathVariable("page") int page) {

		PagingVO pgvo = new PagingVO(page, 5); // qty=5
		PagingHandler list = rsv.getAllList(pgvo);
		return new ResponseEntity<PagingHandler>(list, HttpStatus.OK);
	}

	// 리뷰 상세페이지 이동
	@GetMapping("/reviewDetail")
	public String portfolioDetail(@RequestParam("rno") long rno, Model model, Principal principal) {
		String id = principal.getName().toString();
		String writer = rsv.selectId(rno);

		// 조회수 올리기
		if (!writer.equals(id)) {
			rsv.updateReadCount(rno);
		}

		FileVO fvo = rsv.getProfileImg(writer);
		ReviewDTO rdto = rsv.getDetail(rno, id);
		String comId = rdto.getRvo().getComId();
		MemberDTO2 mdto = rsv.getMdto(comId);

		model.addAttribute("rdto", rdto);
		model.addAttribute("mdto", mdto);
		model.addAttribute("fvo", fvo);
		return "/review/reviewDetail";
	}

	// 리뷰 삭제
	@GetMapping(value = "/deleteReview/{rno}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> deletePortfolio(@PathVariable("rno") long rno) {
		int isOk = rsv.deleteReview(rno);
		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 리뷰 수정페이지 이동
	@GetMapping("modifyReview")
	public String modifyPortfolio(@RequestParam("rno") long rno, Model model, Principal principal) {
		String id = principal.getName().toString();

		ReviewDTO rdto = rsv.getDetail(rno, id);
		model.addAttribute("rdto", rdto);
		return "/review/reviewModify";
	}

	@PostMapping(value = "/postModifyReview")
	public ResponseEntity<String> postModifyReview(@RequestParam("rno") long rno, @RequestParam("title") String title,
			@RequestParam("content") String content, @RequestParam("rate") int rate,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {

		ReviewVO rvo = new ReviewVO();
		rvo.setRno(rno);
		rvo.setTitle(title);
		rvo.setContent(content);
		rvo.setRate(rate);

		int isOk = 0;
		if (imageFile == null) {
			isOk = rsv.postModifyReviewOnlyContent(rvo);

		} else {
			FileVO reviewMainImg = fh.uploadFiles(imageFile);
			isOk = rsv.postModifyReview(rvo, reviewMainImg);

		}

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);

	}

	// 리뷰 좋아요
	@PostMapping(value = "/reviewLike/{rno}/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> boardLike(@PathVariable("rno") long rno, @PathVariable("id") String id) {
		// 체크되어있는지 안되어있는지 확인
		// 1이면 이미 체크, 0이면 아닌거
		int check = rsv.reviewLikeCheck(rno, id);

		if (check > 0) { // 이미 체크가 되어있으면
			// like취소
			rsv.deleteReviewLike(rno, id);

			return new ResponseEntity<String>("0", HttpStatus.OK);
		} else { // 체크가 안되어있다면
			// like체크
			rsv.addReviewLike(rno, id);
			return new ResponseEntity<String>("1", HttpStatus.OK);
		}

	}

	// 좋아요수 내보내기
	@GetMapping(value = "/likeQtyAreaInput/{rno}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> likeQtyAreaInput(@PathVariable("rno") long rno) {
		int likeQty = rsv.likeQtyAreaInput(rno);
		String likeQtyStr = String.valueOf(likeQty);
		return new ResponseEntity<String>(likeQtyStr, HttpStatus.OK);
	}

}
