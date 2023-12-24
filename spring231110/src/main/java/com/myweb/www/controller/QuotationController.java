package com.myweb.www.controller;

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
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationVO;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.security.MemberVO;

import com.myweb.www.service.QuotationService;
import com.myweb.www.service.RequestService;
import com.myweb.www.service.StatusService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/quotation/*")
@Controller
public class QuotationController {
	@Inject
	private QuotationService qsv;
	@Inject
	private StatusService ssv;
	
	@Inject
	private RequestService rsv;

	@GetMapping("/list")
	public void request(Model model, @RequestParam("id") String id, HttpServletRequest request) {

		int keynum = rsv.getKeyNum(id);

		List<RequestVO> rvo = qsv.getList(keynum);
		
		model.addAttribute("list", qsv.getList(keynum));
		model.addAttribute("list_read", qsv.getList_read(keynum));
	
	}

	@GetMapping("/quotation")
	public String quotation(Model model, @RequestParam("requestNm") long reNm, HttpServletRequest request) {
	    model.addAttribute("list", qsv.setQutation(reNm));
	   
	    return "/quotation/quotation";
	}
	
	@GetMapping("/modify")
	public String quotation_modify(Model model, @RequestParam("requestNm") long reNm, HttpServletRequest request) {
	    model.addAttribute("qvo", qsv.setQutation_modify(reNm));
	
	    return "/quotation/quotation_mod";
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
	    boolean payment = ssv.payment(quoNm);
	    
	 		model.addAttribute("pay", payment );
	    
		model.addAttribute("company", userNm );
	    return "/quotation/quotation_user";
	}

	/*
	 * @PostMapping("/quotation_user_cancle") public String
	 * quotation_user_cancle(Model model, @RequestParam("quotationNm") String quoNm,
	 * HttpServletRequest request) { long quotationNm; try { quotationNm =
	 * Long.parseLong(quoNm); } catch (NumberFormatException e) {
	 * 
	 * return "error-page"; }
	 * 
	 * // Your method implementation using the converted quotationNm
	 * 
	 * return "/quotation/quotation_user"; }
	 */
	
	@PutMapping(value = "/quotation_user_cancle", produces = MediaType.APPLICATION_JSON_VALUE)
	public ModelAndView quotationNm_get(@RequestBody QuotationVO qvo) {
		qsv.cancle_ok(qvo.getQuotationNm());
		
		ssv.quotation_status_cancel(qvo.getQuotationNm());
	    ModelAndView modelAndView = new ModelAndView("/quotation/list_user"); 
	    modelAndView.addObject("quotationNm", qvo.getQuotationNm()); 

	    return modelAndView;
	}


	@GetMapping("/list_user")
	public void request_user(Model model,@RequestParam("id")String id,HttpServletRequest request)  {
		//RequestDTO rlist = qsv.getRequest_list(requestNm);
		/*
		 * QuotationDTO rvo = qsv.getList_user(id); log.info("받은요청 리스트 아이디 들어옴"+id);
		 * log.info("받은요청 리스트 보기"+rvo);
		 * 
		 * model.addAttribute("list", rvo);
		 */
		List<QuotationDTO> rvo = qsv.getList_user(id);
		List<QuotationDTO> qvo = ssv.completed_review(id);
		
		 model.addAttribute("list", rvo);
		 model.addAttribute("list_com", qvo);

	}
	
	@GetMapping("/completed")
	public String completed(Model model, @RequestParam("requestNm")long requestNm) {

	
ssv.completed(requestNm);
	
		 return "/quotation/list";
	}
	
	@GetMapping("/list_controller")
	public String request(Model model, @RequestParam("id")  int keynum, HttpServletRequest request) {

	

		List<RequestVO> rvo = qsv.getList(keynum);
		
		model.addAttribute("list", qsv.getList(keynum));
		model.addAttribute("list_read", qsv.getList_read(keynum));
	
		 return "/quotation/list";
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
	
	    int keynum = rsv.getKeyNum(id);
	    List<RequestVO> quotationList = qsv.getList_read(keynum);
	 
	    return new ResponseEntity<List<RequestVO>>(quotationList, HttpStatus.OK);
	}

	@PostMapping(value = "/cancel/{reqNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> request_reqNm_cancel(@PathVariable("reqNm") long reqNm, RedirectAttributes reAttr) {
		int alarm_count = qsv.request_cancel(reqNm);
		
		ssv.request_status_cancel(reqNm);

		return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
				: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping(value = "/alarm/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> request_alarm(@PathVariable("userId") String userId, RedirectAttributes reAttr) {
		
		int keynum = rsv.getKeyNum(userId);
		int alarm_count = qsv.request_alarm(keynum);
		reAttr.addFlashAttribute("alarm_count", alarm_count);

		return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK):new ResponseEntity<>(HttpStatus.NO_CONTENT);
			
	}

	@PostMapping(value = "/alarm_user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> request_alarm_user(@PathVariable("userId") String userId, RedirectAttributes reAttr) {

		//log.info("사용자확인하기"+userId);
		int alarm_count = qsv.request_alarm_user(userId);
		//log.info("사용자 카운트 하기"+alarm_count);


		reAttr.addFlashAttribute("alarm_count", alarm_count);
		return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK):new ResponseEntity<>(HttpStatus.NO_CONTENT);
			
	}

	@GetMapping(value = "/{requestNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RequestDTO> quatation(@PathVariable("requestNm") long requestNm,
			RedirectAttributes reAttr) {


		
	RequestDTO rlist = qsv.getRequest_list(requestNm);

		return new ResponseEntity<RequestDTO>(rlist, HttpStatus.OK);
	}

	@GetMapping(value = "/user/{qutationNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestVO>> quatation_user(@PathVariable("qutationNm") long qutationNm,
			RedirectAttributes reAttr, Model model) {
		List<RequestVO> rlist = qsv.getRequest_list_user(qutationNm);
		return new ResponseEntity<List<RequestVO>>(rlist, HttpStatus.OK);

	}

	@PostMapping("/req_ok")
	public String quatation_submit(
			@RequestParam(value = "form", required = false) String form,
			@RequestParam(value = "extent", required = false) String extent,
			@RequestParam(value = "categoryType", required = false) String categoryType,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "zoneCode", required = false) int zoneCode,
			@RequestParam(value = "address", required = false) String address,
			@RequestParam(value = "detailAddress", required = false) String detailAddress,
			@RequestParam(value = "extraAddress", required = false) String extraAddress,
			@RequestParam(value = "squareMeter", required = false) float squatMeter,
			@RequestParam(value = "squareFootage", required = false) float squareFootage,
			@RequestParam(value = "budget", required = false) long budget,
			@RequestParam(value = "requestOp", required = false) String requestOp,
			@RequestParam(value = "requestId", required = false) String requestId,
			@RequestParam(value = "requestNm", required = false) long requestNm,
			@RequestParam(value = "keynum", required = false) int keynum,
			@RequestParam(value = "pno", required = false) long pno, Model model)

	{
		
	
		QuotationVO qvo = new QuotationVO();
		qvo.setForm(form);
		qvo.setCategoryType(categoryType);
		qvo.setExtent(extent);
		qvo.setStatus(status);
		qvo.setZoneCode(zoneCode);
		qvo.setAddress(address);
		qvo.setDetailAddress(detailAddress);
		qvo.setExtraAddress(extraAddress);
		qvo.setSquareFootage(squareFootage);
		qvo.setSquareMeter(squatMeter);
		qvo.setBudget(budget);
		qvo.setRequestOp(requestOp);
		qvo.setRequestId(requestId);
		qvo.setKeynum(keynum);
		qvo.setRequestNm(requestNm);

		qvo.setPno(pno);
		qsv.quatation_submit(qvo);
		long quotationNm=qsv.getQuotationNm(keynum);
		qvo.setQuotationNm(quotationNm);
	   
		ssv.quotation_status(qvo);

		ssv.quotation_status_ok(qvo); 
		
	
		
		model.addAttribute("keynum", keynum);
		return "redirect:/quotation/list_controller?id={keynum}";
	}
	
	
	@PostMapping("/modify_submit")
	public String modify_submit(
			@RequestParam(value = "form", required = false) String form,
			@RequestParam(value = "extent", required = false) String extent,
			@RequestParam(value = "categoryType", required = false) String categoryType,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "zoneCode", required = false) int zoneCode,
			@RequestParam(value = "address", required = false) String address,
			@RequestParam(value = "detailAddress", required = false) String detailAddress,
			@RequestParam(value = "extraAddress", required = false) String extraAddress,
			@RequestParam(value = "squareMeter", required = false) float squatMeter,
			@RequestParam(value = "squareFootage", required = false) float squareFootage,
			@RequestParam(value = "budget", required = false) long budget,
			@RequestParam(value = "requestOp", required = false) String requestOp,
			@RequestParam(value = "requestId", required = false) String requestId,
			@RequestParam(value = "requestNm", required = false) long requestNm,
			@RequestParam(value = "keynum", required = false) int keynum,
			@RequestParam(value = "pno", required = false) long pno, Model model)

	{
		

		QuotationVO qvo = new QuotationVO();
		qvo.setForm(form);
		qvo.setCategoryType(categoryType);
		qvo.setExtent(extent);
		qvo.setStatus(status);
		qvo.setZoneCode(zoneCode);
		qvo.setAddress(address);
		qvo.setDetailAddress(detailAddress);
		qvo.setExtraAddress(extraAddress);
		qvo.setSquareFootage(squareFootage);
		qvo.setSquareMeter(squatMeter);
		qvo.setBudget(budget);
		qvo.setRequestOp(requestOp);
		qvo.setRequestId(requestId);
		qvo.setKeynum(keynum);
		qvo.setRequestNm(requestNm);
		qvo.setPno(pno);
		qsv.quatation_modify(qvo);

	

		model.addAttribute("keynum", keynum);
		return "redirect:/quotation/list_controller?id={keynum}";
	}
	
	
}
