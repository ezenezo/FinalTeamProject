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
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;
import com.myweb.www.handler.FileHandler;

import com.myweb.www.handler.PagingHandler;

import com.myweb.www.security.MemberDTO2;
import com.myweb.www.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/review/*")
@Controller
public class ReviewController {
	private ReviewService rsv;
	private FileHandler fh;

	@Autowired
	public ReviewController(ReviewService rsv, FileHandler fh) {
		this.rsv = rsv;
		this.fh = fh;
	}

	@GetMapping("/register")
	public String register() {
		return "/review/register";
	}

	// 리뷰 img 저장
	@PostMapping(value = "image-upload", consumes = "multipart/form-data", produces = "text/plain;charset=UTF-8")
	public ResponseEntity<String> imageUpload(@RequestParam MultipartFile image) {
		if (image.isEmpty()) {
			return new ResponseEntity<>("", HttpStatus.OK);
		}
		log.info("image>>" + image.getSize() + image.getName());

		FileVO fvo = fh.uploadFiles(image);
		log.info("fvo>>" + fvo);

		LocalDate date = LocalDate.now();
		String today = date.toString();

		String fullFileName = today + "_" + fvo.getUuid() + "_" + fvo.getFileName();
		log.info("fullFileName11>>" + fullFileName);

		String saveDir = fvo.getSaveDir();
		log.info("saveDir>>" + saveDir);

		return new ResponseEntity<>(fullFileName, HttpStatus.OK);

	}

	// 리뷰 img 렌더링

	@GetMapping(value = "/image-print/{filename}", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE,
			MediaType.IMAGE_PNG_VALUE })
	@ResponseBody
	public byte[] printEditorImage(@PathVariable("filename") String filename) {
		log.info("filename>>" + filename);

		// '_'를 기준으로 나누기
		String[] parts = filename.split("_");

		// today 추출
		String today = parts[0];

		log.info("today>>" + today);
		String todaySe = today.replace("-", File.separator);

//		LocalDate date = LocalDate.now();
//		String today = "2023-12-01";
//		today = today.replace("-", File.separator);

		// 업로드된 파일의 전체 경로saveDir
		String fileFullPath = Paths.get(fh.getUP_DIR() + todaySe + File.separator + filename).toString();
		log.info("fileFullPath>>" + fileFullPath);

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
			@RequestParam("rate") int rate,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {

		FileVO reviewMainImg = fh.uploadFiles(imageFile);

		ReviewVO rvo = new ReviewVO();
		rvo.setId(id);
		rvo.setComId(comId);
		rvo.setTitle(title);
		rvo.setContent(content);
		rvo.setRate(rate);
		rvo.setComName(rsv.getComName(comId));

		log.info("rvo>>>{}", rvo);

		int isOk = rsv.addReview(rvo, reviewMainImg);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/printList", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ReviewDTO>> printListReivewDto() {
		List<ReviewDTO> rdtoList = rsv.mainRdtoList();
		return new ResponseEntity<List<ReviewDTO>>(rdtoList, HttpStatus.OK);
	}
	
	@GetMapping(value = "/printListCompanyInfo/{id}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PagingHandler> printListReivewDtoCompanyInfo(@PathVariable("id") String id,@PathVariable("page") int page) {
		log.info("id>>>{}",id);
		log.info("page>>>{}",page);
		
		PagingVO pgvo = new PagingVO(page, 5); // qty=5
		PagingHandler list = rsv.getList(id, pgvo);
		
//		List<ReviewDTO> rdtoList = rsv.companyInfoRdtoList(id);
		return new ResponseEntity<PagingHandler>(list, HttpStatus.OK);
	}


	// 리뷰 상세페이지 이동
	@GetMapping("/reviewDetail")
	public String portfolioDetail(@RequestParam("rno") long rno, Model model) {

		ReviewDTO rdto = rsv.getDetail(rno);
		String comId=rdto.getRvo().getComId();
		MemberDTO2 mdto=rsv.getMdto(comId);
		
		model.addAttribute("rdto", rdto);
		model.addAttribute("mdto", mdto);
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
	public String modifyPortfolio(@RequestParam("rno") long rno, Model model) {
		ReviewDTO rdto = rsv.getDetail(rno);
		model.addAttribute("rdto", rdto);
		log.info("rdto컨트롤러231218>>{}", rdto);
		log.info("rdto.rvo.content>>{}", rdto.getRvo().getContent());
		return "/review/reviewModify";
	}

	@PostMapping(value = "/postModifyReview")
	public ResponseEntity<String> postModifyReview(@RequestParam("rno") long rno,
			@RequestParam("title") String title, @RequestParam("content") String content,
			@RequestParam("rate") int rate,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {
	
		ReviewVO rvo = new ReviewVO();
		rvo.setRno(rno);
		log.info("rvo>>" + rvo.getRno());
		rvo.setTitle(title);
		log.info("title>>" + rvo.getTitle());
		rvo.setContent(content);
		rvo.setRate(rate);
		
		int isOk=0;
		if(imageFile==null) {
			isOk=rsv.postModifyReviewOnlyContent(rvo);
			
		}else {
			log.info("imageFile>>" + imageFile);
			FileVO reviewMainImg = fh.uploadFiles(imageFile);
			log.info("reviewMainImg>>" + reviewMainImg.getFileName());
			isOk = rsv.postModifyReview(rvo, reviewMainImg);
			
		}
		

	


		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);

	}

}
