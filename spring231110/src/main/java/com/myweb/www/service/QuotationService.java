package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationStatusDTO;
import com.myweb.www.domain.QuotationVO;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.security.MemberVO;

public interface QuotationService {

	void submit(QuotationVO avo);

	List<RequestVO> getList(int keynum);

	int request_alarm(int keynum);
	RequestDTO  getRequest_list(long requestNm);
	void quatation_submit(QuotationVO qvo);

	List<RequestVO> getList_read(int keynum);

	int request_cancel(long reqNm);

	List<QuotationDTO> getList_user(String id);

	int request_alarm_user(String userId);

	List<RequestVO> getRequest_list_user(long qutationNm);

	List<QuotationVO> getList_read_user(String id);


	List<RequestVO> setQutation(long reNm);

	List<QuotationStatusDTO>setQutation_user(long quoNm);

	MemberVO getCompany_name(long quoNm);





	QuotationVO getQuotation(long quotationNm);

	void cancle_ok(long quotationNm);

	long getQuotationNm(int keynum);

	QuotationVO setQutation_modify(long reNm);

	void quatation_modify(QuotationVO qvo);

	RequestDTO getRequest_list_detail_user(long requestNm);
	
	 QuotationVO selectQuotation(long quoNm);


	 








}
