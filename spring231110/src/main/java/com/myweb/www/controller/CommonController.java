package com.myweb.www.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.security.CommonService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/common/*")
@Controller
public class CommonController {
	
	private CommonService comsv;
	
	@Autowired
	public CommonController(CommonService comsv) {
		this.comsv = comsv;
	}
	
	@GetMapping("/main")
	public void main() {}
	
}
