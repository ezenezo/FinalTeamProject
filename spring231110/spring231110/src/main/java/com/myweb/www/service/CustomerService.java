package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.CustomerServiceVO;

public interface CustomerService{

	List<CustomerServiceVO> getList(String searchValue);

}
