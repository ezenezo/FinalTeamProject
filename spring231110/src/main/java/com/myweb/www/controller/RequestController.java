package com.myweb.www.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.crypto.Data;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.domain.StatusVO;
import com.myweb.www.service.QuotationService;
import com.myweb.www.service.RequestService;
import com.myweb.www.service.StatusService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/req/*")
@Controller
public class RequestController {
	@Inject
	private RequestService rsv;
	@Inject
	private QuotationService qsv;
	@Inject
	private StatusService ssv;


	@GetMapping("/requestStart")
	public String requestStart(Model model, @RequestParam("pno") long pno, HttpServletRequest request) {
		model.addAttribute("pno", pno);
		return "/request/request_start";
	}

	@GetMapping("/main")
	public String main() {
		return "/common/main";
	}

	@GetMapping("/request")
	public String request(Model model, @RequestParam("pno") long pno) {
		model.addAttribute("list", rsv.getList());
		model.addAttribute("pno", pno);
		return "/request/request_apply";
	}

	@GetMapping(value = "/mainCategory", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> mainCategory(Model model) {
		List<RequestQuestionVO> list = rsv.getList();
		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club(@PathVariable("checkedValue") String checkedValue) {
		List<RequestQuestionVO> list = new ArrayList<>();
		if (checkedValue.equals("주거공간")) {
			list = rsv.getList_secound();
		} else {
			list = rsv.getList_third_2_1();
		}
		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/req2/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club2(@PathVariable("checkedValue") String checkedValue) {
		List<RequestQuestionVO> list = rsv.getList_third();
		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/request_start/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> start(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getStatus_start(id);
		model.addAttribute("list_start", list);
		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/request_list_completed_1/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> completed(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getStatus_completed(id);
		model.addAttribute("list_completed", list);
		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);
	}

	@GetMapping("/request_list")
	public String request_list(@RequestParam("id") String authId, Model m) {
		m.addAttribute("authId", authId);
		return "/request/request_list";
	}

	@GetMapping(value = "/request_list/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> req_list(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getStatus(id);
		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);

	}

	@GetMapping(value = "/request_list_ing/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> req_ing(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getStatus_ing(id);
		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);

	}

	@GetMapping(value = "/request_request_no/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> request_no(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getStatus_request_no(id);

		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);

	}

	@GetMapping(value = "/request_list_start/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> req_start(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getStatus_start(id);
		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);

	}

	@GetMapping(value = "/nav_get/{reqNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Long> navGet(@PathVariable("reqNm") long reqNm) {
		long quotationNm = ssv.getQuotationNm(reqNm);
		return new ResponseEntity<Long>(quotationNm, HttpStatus.OK);

	}

	@GetMapping(value = "/request_list_cancel/{authId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> cancel(Model model, @PathVariable("authId") String id) {
		List<StatusDTO> list = ssv.getcancel(id);

		return new ResponseEntity<List<StatusDTO>>(list, HttpStatus.OK);

	}

	@GetMapping(value = "detail/cancel_req_user/{reqNm}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String cancel_user(Model model, @PathVariable("reqNm") long reqNm) {

		rsv.cancel_user(reqNm);
		ssv.cancel_user(reqNm);

		return "redirect:/req/request_detil?requestNm=" + reqNm;

	}

	@GetMapping("/request_detil")
	public String req_detail(Model model, @RequestParam("requestNm") long requestNm) {
		RequestDTO rlist = qsv.getRequest_list_detail_user(requestNm);
		String company = rsv.getCompany_name_req(requestNm);
		model.addAttribute("qvo", rlist);
		model.addAttribute("company", company);
		return "/request/request_detail";
	}

	@GetMapping(value = "/req2_2/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club3(@PathVariable("checkedValue") String checkedValue) {
		List<RequestQuestionVO> list = rsv.getList_third_2();
		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@PostMapping("/request_submit")
	public String request(RequestVO rvo, RedirectAttributes re, @RequestParam("requestId") String requestId) {
		int comkey = rsv.company_keynum(rvo.getPno());
		String comNm = rsv.company_name_get(rvo.getPno());
		rvo.setKeynumCom(comkey);
		rsv.insert(rvo);
		long reqNm = rvo.getRequestNm();
		long rvo_status = rsv.getList_status(requestId);
		StatusVO svo = new StatusVO();
		svo.setRequestNmStatus(rvo_status);
		svo.setRequestId(requestId);
		svo.setCompanyName(comNm);
		ssv.insert_ssv(svo);
		ssv.quotation_status_setCompanyNm(svo);
		return "redirect:/rfc/file_img_start";

	}

	@GetMapping(value = "/cancellation_reason", produces = MediaType.APPLICATION_JSON_VALUE)
	public String cancellation(@RequestParam("requestNm") long requestNm, Model m) {
		m.addAttribute("reqNm", requestNm);
		return "request/company";
	}

	@PostMapping("/cancel_request_reason")
	public String request_cancel_company(RequestVO rvo, RedirectAttributes re,
			@RequestParam("requestNm") long requestNm, @RequestParam("cancellationReason") String cancellationReason) {
		rvo = new RequestVO();
		rvo.setCancellationReason(cancellationReason);
		rvo.setRequestNm(requestNm);
		rsv.cancel_r(rvo);
		return "/common/main";
	}

}
