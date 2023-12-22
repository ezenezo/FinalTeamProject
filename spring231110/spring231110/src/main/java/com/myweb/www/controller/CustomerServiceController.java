package com.myweb.www.controller;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.myweb.www.domain.CustomerServiceVO;
import com.myweb.www.service.CustomerService;

import lombok.extern.slf4j.Slf4j;
import retrofit2.http.GET;

@Slf4j
@Controller
@RequestMapping("/customer/*")
public class CustomerServiceController {
	@Inject
	private CustomerService csv;
	
	@GetMapping("/customerService")
	public void customerService() {}
	
	@GetMapping(value="/list", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CustomerServiceVO>> list(@RequestParam("searchValue") String searchValue){
		List<CustomerServiceVO> list = csv.getList(searchValue);
		return new ResponseEntity<List<CustomerServiceVO>>(list, HttpStatus.OK);
	}
	
	@GetMapping("/enter")
	public void enter() {}
	
	@GetMapping("/introduce")
	public void introduce() {}
	
}
