package com.myweb.www.controller;

import java.io.Console;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.domain.StatusVO;
import com.myweb.www.service.PaymentService;
import com.myweb.www.service.RequestService;
import com.myweb.www.service.StatusService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/status/**")
@Controller
public class StatusController {
	@Inject
	private StatusService ssv;
	
	@Inject
	private RequestService rsv;

	// 고객진행상황
	@GetMapping(value = "/sts", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> status(@RequestParam String id) {
	
	//	String auth = ssv.get
		log.info("회사 svo들어옴ㅋㅋ");
//if
		List<StatusDTO> svo = ssv.getStatus(id);
log.info("svo들어오심"+svo);
		return new ResponseEntity<List<StatusDTO>>(svo, HttpStatus.OK);
	}

	// 업체진행상황

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<StatusDTO>> status_com(@PathVariable("id") String id) {
		log.info("회사 svo들어옴"+id);
		int keynum = rsv.getKeyNum(id);
		List<StatusDTO> svo = ssv.getStatus_com(keynum);
		log.info("회사 svo들어옴"+svo);

		return new ResponseEntity<List<StatusDTO>>(svo, HttpStatus.OK);
	}
}
