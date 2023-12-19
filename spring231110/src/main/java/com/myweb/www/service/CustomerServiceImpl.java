package com.myweb.www.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.repository.CustomerServiceDao;

@Service
public class CustomerServiceImpl implements CustomerService {
	@Inject
	private CustomerServiceDao cdao;
}
