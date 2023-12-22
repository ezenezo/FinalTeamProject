package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.domain.StatusVO;
import com.myweb.www.security.MemberVO;

public interface StatusDAO {

	void insert(StatusVO svo);

	void request_status_cancel(long reqNm);

	void quotation_status_cancel(long quotationNm);

	void quotation_status(QuotationVO qvo);

	void quotation_status_ok(QuotationVO qvo);

	List<StatusDTO> status(String id);

	void quotation_status_setCompanyNm(StatusVO svo);

	List<StatusDTO> status_com(String id);

	int payStatus(int quotationNm);

	void refundStatus(int quotationNm);

}
