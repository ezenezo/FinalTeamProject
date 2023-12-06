package com.myweb.www.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.service.ReviewService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/review/*")
@Controller
public class ReviewController {
	private ReviewService rsv;

	@Autowired
	public ReviewController(ReviewService rsv) {
		this.rsv = rsv;
	}
	
	@GetMapping("/register")
	public String register() {
		return "/review/register";
	}

}
