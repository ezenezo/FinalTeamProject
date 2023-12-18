package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.CompanyDTO;

public interface CompanyDAO {

	List<CompanyDTO> selectdetailAll();
	
}
