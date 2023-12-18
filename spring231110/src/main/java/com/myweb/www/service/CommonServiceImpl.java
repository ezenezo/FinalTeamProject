package com.myweb.www.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.repository.CommonDAO;
import com.myweb.www.security.CommonService;

@Service
public class CommonServiceImpl implements CommonService{

	private CommonDAO comDAO;

	@Autowired
	public CommonServiceImpl(CommonDAO comDAO) {
		this.comDAO = comDAO;
	}
	
	
}
