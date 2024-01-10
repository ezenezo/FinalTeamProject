package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.QuotationDTO;
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

   


   List<StatusDTO> getStatus_com(int keynum);

   void quotation_status_setCompanyNm(StatusVO svo);

   StatusVO getStatus_list(String id);

   StatusVO getStatus_list_ing(String id);

   List<StatusDTO> getStatus_ing(String id);

   List<StatusDTO> getStatus_completed(String id);

   List<StatusDTO> getStatus_start(String id);

   List<StatusDTO> getcancel(String id);

   long getQuotationNm(long reqNm);

   void cancel_user(long reqNm);

   boolean getStatus_cancel(long requestNm);

   List<StatusDTO> getStatus_request_no(String id);

   List<QuotationDTO> completed_review(String id);

   boolean payment(long quoNm);

   void completed(long requestNm);

   boolean completed_user(long quoNm);

    boolean getPayment(long requestNm);

   boolean completed_list(long requestNm);


}