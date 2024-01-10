package com.myweb.www.controller;

import java.io.File;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
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
import com.google.protobuf.StringValue;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.FilterdataVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.handler.FileHandler;
import com.myweb.www.security.MemberDTO2;
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

	// 포폴 등록(메인img,제목,내용,업체id)
	@PostMapping(value = "/add")
	public ResponseEntity<String> addPortfolio(@RequestParam("id") String id, @RequestParam("title") String title,
			@RequestParam("introduction") String introduction, @RequestParam("homeType") String homeType,
			@RequestParam("roomCnt") String roomCnt, @RequestParam("familyType") String familyType,
			@RequestParam("homeSize") int homeSize, @RequestParam("homeStyle") String homeStyle,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {

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
		String name = psv.selectCompanyName(id);
		pvo.setUserNm(name);

		int isOk = psv.add(pvo, portfolioMainImg);

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 마이포폴
	@GetMapping("/mylist")
	public String myList(Model model, @RequestParam("id") String id) {
		List<PortfolioDTO> portfolioDTOList = psv.getMyList(id);
		MemberDTO2 mdto = psv.getMdto(id);
		model.addAttribute("id", id);
		model.addAttribute("portfolioDTOList", portfolioDTOList);
		model.addAttribute("mdto", mdto);

		return "/portfolio/myPortfolioList";
	}

	// 포폴 리스트 출력.get
	@GetMapping("/list")
	public String portfolioDTOList(Model model, FilterdataVO filter) {
		log.info(">>>>> filter >> {} ", filter);
		if (filter.getSliderOneVal() == 0) {
			filter.setSliderOneVal(1);
		}
		if (filter.getSliderTwoVal() == 0) {
			filter.setSliderTwoVal(232);
		}
		
		int sliderOne = (int)Math.round(filter.getSliderOneVal()*0.3025);
		int sliderTwo = (int)Math.round(filter.getSliderTwoVal()*0.3025);
		filter.setSliderOneVal(sliderOne);
		filter.setSliderTwoVal(sliderTwo);
		
		List<PortfolioDTO> portfolioDTOList = new ArrayList<PortfolioDTO>();
		if (filter.getOrder() == null && filter.getHomeTypeSh() == null && filter.getRoomCntSh() == null
				&& filter.getFamilyTypeSh() == null && filter.getHomeStyleSh() == null
				&& (filter.getSliderOneVal() == 1 && filter.getSliderTwoVal() == 232)) {
			portfolioDTOList = psv.getList1();
		} else {
			portfolioDTOList = psv.getList2(filter);
		}

		model.addAttribute("portfolioDTOList", portfolioDTOList);
		model.addAttribute("filter", filter);
		log.info("portfolioDTOList>>{}", portfolioDTOList);

		return "/portfolio/portfolioList";
	}

	// 포폴 리스트 출력.post
	@PostMapping(value = "/postList", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PortfolioDTO>> portfolioDTOList(@RequestBody FilterdataVO filterData) {

		int sliderOne = (int)Math.round(filterData.getSliderOneVal()*0.3025);
		int sliderTwo = (int)Math.round(filterData.getSliderTwoVal()*0.3025);
		filterData.setSliderOneVal(sliderOne);
		filterData.setSliderTwoVal(sliderTwo);
		log.info("filterData>>{}",filterData);
		List<PortfolioDTO> portfolioDTOList = psv.getListFilter(filterData);
		log.info("portfolioDTOList컨트롤러>>{}", portfolioDTOList);

		return new ResponseEntity<List<PortfolioDTO>>(portfolioDTOList, HttpStatus.OK);

	}

	// 포폴 디테일
	@GetMapping("/portfolioDetail")
	public String portfolioDetail(@RequestParam("pno") long pno, Model model, Principal principal) {
		String authId = principal.getName().toString();
		String id = psv.selectId(pno);

		// 조회수 올리기
		if (!id.equals(authId)) {
			psv.updateReadCount(pno);
		}
		MemberDTO2 mdto = psv.getMdto(id);
		PortfolioDTO pdto = psv.getDetail(pno, authId);
		model.addAttribute("pdto", pdto);
		model.addAttribute("mdto", mdto);
		return "/portfolio/portfolioDetail";
	}

	// 포폴 좋아요
	@PostMapping(value = "/portfolioLike/{pno}/{id}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> boardLike(@PathVariable("pno") long pno, @PathVariable("id") String id) {
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

	// 좋아요수 내보내기
	@GetMapping(value = "/likeQtyAreaInput/{pno}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> likeQtyAreaInput(@PathVariable("pno") long pno) {
		int likeQty = psv.likeQtyAreaInput(pno);
		log.info("likeQty" + likeQty);
		String likeQtyStr = String.valueOf(likeQty);
		log.info("likeQtyStr" + likeQtyStr);
		return new ResponseEntity<String>(likeQtyStr, HttpStatus.OK);
	}

	// 포폴 삭제
	@GetMapping(value = "/deletePortfolio/{pno}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> deletePortfolio(@PathVariable("pno") long pno) {
		int isOk = psv.deletePortfolio(pno);
		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	// 포폴 수정페이지 이동
	@GetMapping("modifyPortfolio")
	public String modifyPortfolio(@RequestParam("pno") long pno, Principal principal, Model model) {
		String authId = principal.getName().toString();
		PortfolioDTO pdto = psv.getDetail(pno, authId);
		model.addAttribute("pdto", pdto);
		return "/portfolio/portfolioModify";
	}

	@PostMapping(value = "/postModifyPortfolio")
	public ResponseEntity<String> postModifyPortfolio(@RequestParam("pno") long pno,
			@RequestParam("title") String title, @RequestParam("introduction") String introduction,
			@RequestParam("homeType") String homeType, @RequestParam("roomCnt") String roomCnt,
			@RequestParam("familyType") String familyType, @RequestParam("homeSize") int homeSize,
			@RequestParam("homeStyle") String homeStyle,
			@RequestParam(name = "imageFile", required = false) MultipartFile imageFile) {

		PortfolioVO pvo = new PortfolioVO();
		pvo.setPno(pno);
		pvo.setTitle(title);
		pvo.setIntroduction(introduction);

		pvo.setHomeType(homeType);
		pvo.setRoomCnt(roomCnt);
		pvo.setFamilyType(familyType);
		pvo.setHomeSize(homeSize);
		pvo.setHomeStyle(homeStyle);

		int isOk = 0;
		if (imageFile == null) {
			isOk = psv.postModifyPortfolioOnlyContent(pvo);

		} else {


			FileVO portfolioMainImg = fh.uploadFiles(imageFile);

			isOk = psv.postModifyPortfolio(pvo, portfolioMainImg);
		}

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);

	}

}
