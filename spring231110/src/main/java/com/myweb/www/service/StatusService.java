package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.domain.StatusVO;
import com.myweb.www.security.MemberVO;

public interface StatusService {

	void insert_ssv(StatusVO svo);

	void request_status_cancel(long reqNm);

	void quotation_status_cancel(long quotationNm);

	void quotation_status(QuotationVO qvo);

	void quotation_status_ok(QuotationVO qvo);

	List<StatusDTO> getStatus(String id);

	void quotation_status_setCompanyNm(StatusVO svo);



	List<StatusDTO> getStatus_com(String id);



	
	
	





}
