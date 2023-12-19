package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RequestVO;

import com.myweb.www.security.MemberVO;


public interface QuotationDAO {

	void submit(QuotationVO avo);
	void quatation_submit(QuotationVO qvo);

	List<QuotationDTO> getList_user(String id);


	void checked(long qutationNm);

	List<RequestVO> getRequest_list_user(long qutationNm);

	int request_alarm_user(String userId);



	List<QuotationVO> getList_read_user(String id);

	List<QuotationVO> setQutation_user(long quoNm);

	MemberVO getCompany_name(long quoNm);





	QuotationVO getQuotation(long quotationNm);
	CompanyVO findKeynum(int keynum);


}
