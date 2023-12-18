package com.myweb.www.controller;

import java.io.Console;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.security.MemberVO;
import com.myweb.www.service.QuotationService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/quotation/*")
@Controller
public class QuotationController {
	@Inject
	private QuotationService qsv;

	@GetMapping("/list")
	public void request(Model model, @RequestParam("id") String id, HttpServletRequest request) {

		List<RequestVO> rvo = qsv.getList(id);
		log.info("받은요청 리스트 아이디 들어옴" + id);
		log.info("받은요청 리스트 보기" + rvo);
		model.addAttribute("list", qsv.getList(id));
		model.addAttribute("list_read", qsv.getList_read(id));
		log.info("받은 요청 리스트들어옴" + rvo);
	}
	
	@GetMapping("/quotation")
	public String quotation(Model model, @RequestParam("requestNm") long reNm, HttpServletRequest request) {
	    model.addAttribute("list", qsv.setQutation(reNm));
	    log.info("여기들어옴");
	    return "/quotation/quotation";
	}
	
	
	@GetMapping("/quotation_user")
	public String quotation_user(Model model, @RequestParam("quotationNm") long quoNm, HttpServletRequest request) {
	    model.addAttribute("list", qsv.setQutation_user(quoNm));
		/*
		 * MemberVO mvo = new MemberVO(); String userName=
		 * mvo.getUserNm(qsv.getUserName(quoNm));
		 */
	    
	    MemberVO mvo = qsv.getCompany_name(quoNm);
	    
	    String userNm = mvo.getUserNm();
		model.addAttribute("company", userNm );
	    return "/quotation/quotation_user";
	}

	
	@PostMapping("/quotation_user_cancle")
	public String quotation_user_cancle(Model model, @RequestParam("quotationNm") long quoNm, HttpServletRequest request) {
	  
	    return "/quotation/quotation_user";
	}
	@GetMapping("/list_user")
	public void request_user(Model model,@RequestParam("id")String id,HttpServletRequest request)  {
		
		List<RequestVO> rvo = qsv.getList_user(id);
		log.info("받은요청 리스트 아이디 들어옴"+id);
		log.info("받은요청 리스트 보기"+rvo);
		model.addAttribute("list", qsv.getList_user(id));
		
		log.info("받은 요청 리스트들어옴"+rvo);
	}
	
	
	/*실시간 리스트 비동기용
	 * @GetMapping(value = "/left/{authEmail}", produces =
	 * MediaType.APPLICATION_JSON_VALUE) public ResponseEntity<List<RequestVO>>
	 * req_left(@PathVariable("authEmail") String id, RedirectAttributes reAttr,
	 * Model model) { log.info("받은견적 리스트 아이디 들어옴" + id);
	 * 
	 * List<RequestVO> quotationList = qsv.getList(id);
	 * log.info("quo왼쪽리스트"+quotationList);
	 * 
	 * return new ResponseEntity<List<RequestVO>>(quotationList, HttpStatus.OK); }
	 */
	@GetMapping(value = "/left/read/{authEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestVO>> req_left_read(@PathVariable("authEmail") String id, RedirectAttributes reAttr, Model model) {
	    log.info("받은견적 리스트 아이디 들어옴" + id);

	    List<RequestVO> quotationList = qsv.getList_read(id);
	    log.info("quo왼쪽리스트(읽음)"+quotationList);

	    return new ResponseEntity<List<RequestVO>>(quotationList, HttpStatus.OK);
	}

	@PostMapping(value = "/cancel/{reqNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> request_reqNm_cancel(@PathVariable("reqNm") long reqNm, RedirectAttributes reAttr) {
		int alarm_count = qsv.request_cancel(reqNm);
		log.info("취소 컨트롤러 들어옴");
		return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping(value = "/alarm/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> request_alarm(@PathVariable("userId") String userId, RedirectAttributes reAttr) {
		int alarm_count = qsv.request_alarm(userId);
		reAttr.addFlashAttribute("alarm_count", alarm_count);

		return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping(value = "/alarm_user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> request_alarm_user(@PathVariable("userId") String userId, RedirectAttributes reAttr) {
		//log.info("사용자확인하기"+userId);
		int alarm_count = qsv.request_alarm_user(userId);
		//log.info("사용자 카운트 하기"+alarm_count);
		reAttr.addFlashAttribute("alarm_count", alarm_count);
		return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/{requestNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RequestDTO> quatation(@PathVariable("requestNm") long requestNm,
			RedirectAttributes reAttr) {

		log.info("받은요청 리스트 요청페이지 들어옴111111" + requestNm);
		
	RequestDTO rlist = qsv.getRequest_list(requestNm);
		log.info("받은요청 개인 리스트 받음" + rlist);
		return new ResponseEntity<RequestDTO>(rlist, HttpStatus.OK);

	}

	@GetMapping(value = "/user/{qutationNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestVO>> quatation_user(@PathVariable("qutationNm") long qutationNm,
			RedirectAttributes reAttr, Model model) {

		log.info("받은요청 리스트 견적페이지 들어옴111111" + qutationNm);
		List<RequestVO> rlist = qsv.getRequest_list_user(qutationNm);
		log.info("받은요청 개인 리스트 받음" + rlist);
		
		return new ResponseEntity<List<RequestVO>>(rlist, HttpStatus.OK);

	}

	@PostMapping("/req_ok")
	public String quatation_submit(@RequestParam(value = "form", required = false) String form,
			@RequestParam(value = "rang", required = false) String rang,
			@RequestParam(value = "categoryType", required = false) String categoryType,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "zoneCode", required = false) int zoneCode,
			@RequestParam(value = "address", required = false) String address,
			@RequestParam(value = "detailAddress", required = false) String detailAddress,
			@RequestParam(value = "extraAddress", required = false) String extraAddress,
			@RequestParam(value = "squatMeter", required = false) Float squatMeter,
			@RequestParam(value = "aquareFootage", required = false) Float aquareFootage,
			@RequestParam(value = "budget", required = false) long budget,
			@RequestParam(value = "requestOp", required = false) String requestOp,
			@RequestParam(value = "requestId", required = false) String requestId,
			@RequestParam(value = "requestNm", required = false) long requestNm,
			@RequestParam(value = "keynum", required = false) int keynum)

	{
		log.info("form_값 받음: " + form);
		log.info("카테고리_값 받음: " + categoryType);
		log.info("rang_값 받음: " + rang);
		log.info("status_값 받음: " + status);
		log.info("zone_값 받음: " + zoneCode);
		log.info("add_값 받음: " + address);
		log.info("detail_값 받음: " + detailAddress);
		log.info("extra_값 받음: " + extraAddress);
		log.info("평수_값 받음: " + aquareFootage);
		log.info("squatme_값 받음: " + squatMeter);
		log.info("견적값_값 받음: " + budget);
		log.info("마지막 요청사항: " + requestOp);
		log.info("요청 아이디 (고객): " + requestId);
		log.info("요청서 고유번호: " + requestNm);
		log.info("회사이름: " + keynum);
		QuotationVO qvo = new QuotationVO();
		qvo.setForm(form);
		qvo.setCategoryType(categoryType);
		qvo.setRang(rang);
		qvo.setStatus(status);
		qvo.setZoneCode(zoneCode);
		qvo.setAddress(address);
		qvo.setDetailAddress(detailAddress);
		qvo.setExtraAddress(extraAddress);
		qvo.setAquareFootage(aquareFootage);
		qvo.setSquareMeter(squatMeter);
		qvo.setBudget(budget);
		qvo.setRequestOp(requestOp);
		qvo.setRequestId(requestId);
		qvo.setKeynum(keynum);
		qvo.setRequestNm(requestNm);
		qsv.quatation_submit(qvo);
		return "/common/main";
	}

}
