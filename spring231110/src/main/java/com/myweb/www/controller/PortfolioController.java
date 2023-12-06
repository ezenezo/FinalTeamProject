package com.myweb.www.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.google.gson.Gson;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.handler.FileHandler;
import com.myweb.www.service.PortfolioService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/portfolio/*")
@Controller
public class PortfolioController {
	private PortfolioService psv;
	private FileHandler fh;
	@Autowired
	public PortfolioController(PortfolioService psv, FileHandler fh) {
		this.psv = psv;
		this.fh = fh;
	}

	@GetMapping("/register")
	public void register() {
	}

	// 포폴 content img 저장
	@PostMapping(value = "image-upload", consumes = "multipart/form-data", produces = "text/plain;charset=UTF-8")
	public  ResponseEntity<String> imageUpload(@RequestParam MultipartFile image) {
		if (image.isEmpty()) {
			return new ResponseEntity<>("", HttpStatus.OK);
		}
		log.info("image>>" + image.getSize() + image.getName());

		FileVO fvo = fh.uploadFiles(image);
		log.info("fvo>>" + fvo);
		
		LocalDate date = LocalDate.now();
		String today = date.toString();
		
		String fullFileName =today+"_"+ fvo.getUuid() + "_" + fvo.getFileName();
		log.info("fullFileName11>>" + fullFileName);
		
		String saveDir = fvo.getSaveDir();
		log.info("saveDir>>" + saveDir);
		
		return new ResponseEntity<>(fullFileName,HttpStatus.OK);

	}

	/**
	 * 디스크에 업로드된 파일을 byte[]로 반환
	 * 
	 * @param filename 디스크에 업로드된 파일명
	 * @return image byte array
	 */
	// 포폴 content img 렌더링

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

	// 포폴 등록(메인img,제목,내용,업체id)
	@PostMapping(value = "/add")
	public ResponseEntity<String> addPortfolio(@RequestParam("id") String id, @RequestParam("title") String title,
			@RequestParam("introduction") String introduction, @RequestParam("homeType") String homeType,
			@RequestParam("roomCnt") String roomCnt, @RequestParam("familyType") String familyType,
			@RequestParam("homeSize") int homeSize,@RequestParam("homeStyle") String homeStyle,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {

		log.info("여기오냐~~~!!!111111");
		FileVO portfolioMainImg = fh.uploadFiles(imageFile);

		PortfolioVO pvo = new PortfolioVO();
		pvo.setId(id);
		pvo.setTitle(title);
		pvo.setIntroduction(introduction);
		pvo.setHomeType(homeType);
		pvo.setRoomCnt(roomCnt);
		pvo.setFamilyType(familyType);
		pvo.setHomeSize(homeSize);
		pvo.setHomeStyle(homeStyle);
		String name=psv.selectCompanyName(id);
		log.info("name>>>>>{}",name);	
		pvo.setUserNm(name);
		
		
		log.info("pvo>>{}여기오냐",pvo);

		int isOk = psv.add(pvo, portfolioMainImg);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 포폴 리스트 출력
	@GetMapping("/list")
	public String portfolioDTOList(Model model) {
		log.info("여기 오는지 111");
		List<PortfolioDTO> portfolioDTOList = psv.getList();
		
		model.addAttribute("portfolioDTOList", portfolioDTOList);
		log.info("portfolioDTOList>>{}", portfolioDTOList);

		return "/portfolio/portfolioList";
	}
	
	// 포폴 디테일
	@GetMapping("/portfolioDetail")
	public String portfolioDetail(@RequestParam("pno") long pno,Model model,Principal principal) {
		String authId=principal.getName().toString();
		String id=psv.selectId(pno);
		
		//조회수 올리기
		if(!id.equals(authId)) {
			psv.updateReadCount(pno);
		}
		
		PortfolioDTO pdto=psv.getDetail(pno,authId);
		model.addAttribute("pdto",pdto);
		return "/portfolio/portfolioDetail";
	}
	// 포폴 좋아요
	@PostMapping(value = "/portfolioLike/{pno}/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> boardLike(@PathVariable("pno") long pno, @PathVariable("id") String id) {
		log.info("pno>>>{}", pno);
		log.info("id>>>{}", id);

		// 체크되어있는지 안되어있는지 확인
		// 1이면 이미 체크, 0이면 아닌거
		int check = psv.portfolioLikeCheck(pno, id);

		if (check > 0) { // 이미 체크가 되어있으면
			// like취소
			psv.deletePortfolioLike(pno, id);

			return new ResponseEntity<String>("0", HttpStatus.OK);
		} else { // 체크가 안되어있다면
			// like체크
			psv.addPortfolioLike(pno, id);
			return new ResponseEntity<String>("1", HttpStatus.OK);
		}

	}

}
