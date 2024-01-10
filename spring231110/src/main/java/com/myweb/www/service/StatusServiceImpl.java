package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.domain.StatusVO;
import com.myweb.www.repository.QuotationDAO;
import com.myweb.www.repository.StatusDAO;
import com.myweb.www.security.MemberVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class StatusServiceImpl implements StatusService {
   @Inject
   private StatusDAO sdao;
   
   @Inject
   private QuotationDAO qdao;

   @Override
   public void insert_ssv(StatusVO svo) {
         sdao.insert(svo);
      
   }

   @Override
   public void request_status_cancel(long reqNm) {
      sdao.request_status_cancel(reqNm);
      
   }

   @Override
   public void quotation_status_cancel(long quotationNm) {
      sdao.quotation_status_cancel(quotationNm);
      
   }

   @Override
   public void quotation_status(QuotationVO qvo) {
   
   sdao.quotation_status(qvo);
      
   }

   @Override
   public void quotation_status_ok(QuotationVO qvo) {
      sdao.quotation_status_ok(qvo);
      
   }

   @Override
   public List<StatusDTO> getStatus(String id) {
       List<StatusDTO> sdto = sdao.status(id);
      return sdto;
   }

   @Override
   public void quotation_status_setCompanyNm(StatusVO svo) {
      sdao.quotation_status_setCompanyNm(svo);
      
   }

   @Override
   public List<StatusDTO> getStatus_com(int keynum) {

       List<StatusDTO> sdto = sdao.status_com(keynum);

      return sdto;
   }

   @Override
   public StatusVO getStatus_list(String id) {
   StatusVO svo =sdao.status_list(id);
      return  svo;
   }

   @Override
   public StatusVO getStatus_list_ing(String id) {
      return null;
   }

   @Override
   public List<StatusDTO> getStatus_ing(String id) {
      log.info("id"+id);
      List<StatusDTO> list =sdao.get_ing(id);
      log.info("list"+list);
      return sdao.get_ing(id);
   }

   @Override
   public List<StatusDTO> getStatus_completed(String id) {
      return sdao.get_completed(id);
   }

   @Override
   public List<StatusDTO> getStatus_start(String id) {
      return sdao.get_start(id);
   }

   @Override
   public List<StatusDTO> getcancel(String id) {
      return sdao.get_cancel(id);
   }

   @Override
   public long getQuotationNm(long reqNm) {
       long quoNm = sdao.existence(reqNm);
       if(quoNm != 0) {
           return quoNm;
       }
       return 0;
   }

   @Override
   public void cancel_user(long reqNm) {
      sdao.cancel_user(reqNm);
   }
   @Override
   public boolean getStatus_cancel(long requestNm) {
       try {
           boolean ok = sdao.cancel_get_user(requestNm);
           return ok;
       } catch (Exception e) {
         
           e.printStackTrace();
           return false; 
       }
   }

   @Override
   public List<StatusDTO> getStatus_request_no(String id) {
      return sdao.getStatus_request_no(id);
   }

   @Override
   public List<QuotationDTO> completed_review(String id) {
   
      return sdao.completed_review(id);
   }

   @Override
   public boolean payment(long quoNm) {
       
      return sdao.payment(quoNm);
      
   }

   @Override
   public void completed(long requestNm) {
      sdao.completed(requestNm);      
   }

   @Override
   public boolean completed_user(long quoNm) {
      
      return sdao.completed_user(quoNm);
   }

   @Override
   public boolean getPayment(long requestNm) {

      return sdao.getPayment(requestNm);
   }

@Override
public boolean completed_list(long requestNm) {
   // TODO Auto-generated method stub
   
boolean com =
sdao.completed_list(requestNm);

   return sdao.completed_list(requestNm);
}

   



}

