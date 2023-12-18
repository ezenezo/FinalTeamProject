package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.QuotationVO;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.security.MemberVO;

public interface QuotationService {

	void submit(QuotationVO avo);

	List<RequestVO> getList(String id);

	int request_alarm(String userId);
	RequestDTO  getRequest_list(long requestNm);
	void quatation_submit(QuotationVO qvo);

	List<RequestVO> getList_read(String id);

	int request_cancel(long reqNm);

	List<RequestVO> getList_user(String id);

	int request_alarm_user(String userId);

	List<RequestVO> getRequest_list_user(long qutationNm);

	List<QuotationVO> getList_read_user(String id);


	List<RequestVO> setQutation(long reNm);

	List<QuotationVO>setQutation_user(long quoNm);

	MemberVO getCompany_name(long quoNm);





	QuotationVO getQuotation(long quotationNm);


}
