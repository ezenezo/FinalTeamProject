package com.myweb.www.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.service.RequestService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/req/*")
@Controller
public class RequestController {
	@Inject
	private RequestService rsv;

	@GetMapping("/requestStart")
	public String requestStart() {
		log.info("requestStart 컨트롤러 들어옴");
		return "/request/request_start";
	}

	@GetMapping("/main")
	public String main() {
		log.info("requestStart 컨트롤러 들어옴");
		return "/common/main";
	}
	

	@GetMapping("/request")
	public String request(Model model) {
		model.addAttribute("list", rsv.getList());
		return "/request/request_apply";
	}


	@GetMapping(value ="/mainCategory", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> mainCategory(Model model) {
		
		  List<RequestQuestionVO> list = rsv.getList();

		   return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club(@PathVariable("checkedValue") String checkedValue) {
	    log.info("String subject값:" + checkedValue);

	    List<RequestQuestionVO> list = rsv.getList_secound();
	    log.info("list_seocund" + list);
	    return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}
	
	@GetMapping(value = "/req2/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club2(@PathVariable("checkedValue") String checkedValue) {
	    log.info("String subject값:" + checkedValue);

	    List<RequestQuestionVO> list = rsv.getList_third();
	    log.info("list_seocund" + list);
	    return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}


	@GetMapping(value = "/req2_2/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club3(@PathVariable("checkedValue") String checkedValue) {
	    log.info("String subject값:" + checkedValue);

	    List<RequestQuestionVO> list = rsv.getList_third_2();
	    log.info("list_seocund" + list);
	    return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}
}
