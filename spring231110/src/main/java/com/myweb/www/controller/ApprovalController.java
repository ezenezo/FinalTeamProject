package com.myweb.www.controller;

<<<<<<< HEAD

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.domain.ApprovalDTO;
import com.myweb.www.domain.ApprovalVO;

import com.myweb.www.domain.PagingVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.handler.PagingHandler;
import com.myweb.www.service.ApprovalService;
import com.myweb.www.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/approval/*")
@Slf4j
public class ApprovalController {
	private final ApprovalService asv;
	private final MemberService msv;

	@Autowired
	public ApprovalController(ApprovalService asv, MemberService msv) {
		this.asv = asv;
		this.msv = msv;
	}

	@PutMapping(value = "/{clubCd}/{userId}", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> club(@PathVariable("clubCd") String clubCd, @PathVariable("userId") String userId) {
	    log.info("동호회 서비스 들어옴 " + clubCd);
	    long emp_no = Integer.parseInt(userId);

	    ApprovalVO avo = new ApprovalVO();
	    avo.setClubNo(clubCd);
	    avo.setEmpNo(emp_no);
	    log.info("clubNo 컨트롤러>>" + avo.getClubNo());

	    boolean approvalResult = false;
	    try {
	    	Long approvalExist = asv.approvalExist(avo);
	    	if (Long.valueOf(emp_no).equals(approvalExist)) {
	    	    log.info("approval 결과 : 실패");
	    	    approvalResult = false;
	    	} else {
	    	    approvalResult = asv.approval_club(avo);
	    	    log.info("approval 결과 : " + approvalResult);
	    	}

	    } catch (Exception e) {
	        log.error("Error during club approval", e);
	        return new ResponseEntity<>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    return approvalResult ? new ResponseEntity<>("success", HttpStatus.OK)
	            : new ResponseEntity<>("exist", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	@GetMapping("/list")
	public void list(Model m, PagingVO pagingVO) {
		log.info(">>>승인 리스트 start >> ");
		log.info(">>> pagingVO >>" + pagingVO);
		
		ApprovalDTO ato = new ApprovalDTO();
		
		
		  List<RequestVO> dataList = asv.getList_club(ato);
		    log.info("List Size: " + dataList.size());
		m.addAttribute("list_c", asv.getList_club(ato));
	
		int totalCount_c = asv.getTotalCount_club(pagingVO);
		PagingHandler ph = new PagingHandler(totalCount_c, pagingVO);
		m.addAttribute("ph_c", ph);
	}
	


=======
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.service.ApprovalService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/approval/*")
@Controller
public class ApprovalController {
	private ApprovalService asv;
	
	@GetMapping("/clubApproval")
	public void clubApproval() {}
	
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
}
