package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.QuotationDTO;
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

List<StatusDTO> status_com(int keynum);

StatusVO status_list(String id);

List<StatusDTO> get_ing(String id);

List<StatusDTO> get_completed(String id);

List<StatusDTO> get_start(String id);

List<StatusDTO> get_cancel(String id);

long existence(long reqNm);

void cancel_user(long reqNm);

boolean cancel_get_user(long requestNm);

List<StatusDTO> getStatus_request_no(String id);

List<QuotationDTO> completed_review(String id);

boolean payment(long quoNm);

void completed(long requestNm);

int payStatus(int quotationNm);

void refundStatus(int quotationNm);

boolean completed_user(long quoNm);


boolean getPayment(long requestNm);

boolean completed_list(long requestNm);

}