package com.myweb.www.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.FilterdataVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.service.CommonService;
import com.myweb.www.service.PortfolioService;

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
	public void main(Model model) {
		
		FilterdataVO filter = new FilterdataVO();
		model.addAttribute("filter",filter);
		
	}
	@GetMapping(value = "/slideImg",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<FileVO>> slideImg(){
		List<FileVO> portfolioMainImgList=comsv.portfolioMainImgList();
		
		return new ResponseEntity<List<FileVO>>(portfolioMainImgList,HttpStatus.OK);
	}
	@GetMapping(value = "/postList/{sizeNum}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<PortfolioDTO>> mainPostPdtoList(@PathVariable("sizeNum") int sizeNum){
		int sliderOne=sizeNum;
		int sliderTwo=sliderOne+9;
		
		List<PortfolioDTO> portfolioDTOList = comsv.mainPostPdtoList(sliderOne,sliderTwo);
		return new ResponseEntity<List<PortfolioDTO>>(portfolioDTOList,HttpStatus.OK);
		
	}
	
	
	
}
