package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.CustomerServiceVO;

public interface CustomerDAO {

	List<CustomerServiceVO> getList(String searchValue);

}
