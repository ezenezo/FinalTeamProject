package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.CustomerServiceVO;

public interface CustomerServiceDAO {

	List<CustomerServiceVO> getList(String searchValue);

}
