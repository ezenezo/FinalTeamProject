package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.CompanyDTO;
import com.myweb.www.domain.CompanyVO;

public interface CompanyDAO {


	List<CompanyDTO> selectdetailAll();

	CompanyVO getCvo(String id);

	int reviewCount();

	int portfolioCount();

	int updateRateAverage(String comId);

	String getCompanyId(int keynum);



}

