package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.CustomerServiceVO;
import com.myweb.www.repository.CustomerDAO;

@Service
public class CustomerServiceImpl implements CustomerService {
	@Inject
	private CustomerDAO cdao;

	@Override
	public List<CustomerServiceVO> getList(String searchValue) {
		return cdao.getList(searchValue);
	}
}
