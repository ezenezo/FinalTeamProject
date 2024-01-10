package com.myweb.www.controller;


import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myweb.www.domain.ReqFileVO;

import com.myweb.www.domain.RequestVO;
import com.myweb.www.handler.FileHandler_img;
import com.myweb.www.service.ReqFileService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/rfc/*")
@Controller
public class ReqFileController {
	@Inject
	private FileHandler_img fh;

	@Inject
	private ReqFileService rsv;

	@GetMapping("/rfc/file_img_start")
	public String main_img_start(Model m) {
	
		long reqNm = rsv.selectNm();
		
		m.addAttribute("reqNm", reqNm);

		return "/request/file_img";
	}

	@PostMapping("/file_img")
	public String file(RequestVO rvo, RedirectAttributes re,
			@RequestParam(name = "file1", required = false) MultipartFile file1,

			@RequestParam("requestId") String requestId,
			@RequestParam("requestNm") long requestNm) {
		
		ReqFileVO file = new ReqFileVO();
		
		if(file1.getSize() > 0) {
			file = fh.uploadFiles(file1);
		}
		 rvo = new RequestVO();
		file.setRequestNm(requestNm);
		file.setRequestId(requestId);
				
		rvo.setRequestId(requestId);
		
	
		int isOk = rsv.insert_img(file);
		re.addFlashAttribute("isUp", isOk);
		return "redirect:/common/main";
	}
}
