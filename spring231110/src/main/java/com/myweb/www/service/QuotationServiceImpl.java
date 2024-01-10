package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationStatusDTO;
import com.myweb.www.domain.QuotationVO;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.repository.QuotationDAO;
import com.myweb.www.repository.ReqFileDAO;
import com.myweb.www.repository.RequestDAO;
import com.myweb.www.security.MemberVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service

public class QuotationServiceImpl implements QuotationService {
	@Inject
	private QuotationDAO qdao;
	@Inject
	private RequestDAO rdao;
	@Inject
	private ReqFileDAO fdao;

	@Override
	public void submit(QuotationVO avo) {
		qdao.submit(avo);
		

	}

	@Override
	public List<RequestVO> getList(int keynum) {

		return rdao.selectrequset(keynum);
	}

	@Override
	public List<RequestVO> getList_read(int keynum) {

		return rdao.selectrequset_read(keynum);
	}

	@Override
	public int request_alarm(int keynum) {

		return rdao.request_alarm(keynum);
	}

	@Override

	public RequestDTO getRequest_list(long requestNm) {

		RequestDTO dto = new RequestDTO();
		dto.setRvo(rdao.getRequest_list(requestNm));
		log.info("flist"+fdao.req_file(requestNm));
		dto.setFlist(fdao.req_file(requestNm));
		log.info("test3 requestNm는 "+requestNm);
		dto.setFile_img(rdao.getPorImg(requestNm));
		dto.setMvo(rdao.memberSelect(requestNm));
		rdao.checked(requestNm);
		return dto;

	}

	@Override
	public void quatation_submit(QuotationVO qvo) {
		qdao.quatation_submit(qvo);
		RequestVO rvo = new RequestVO();
		long requstNm =qvo.getRequestNm();
		rdao.okTypeYes_ok(requstNm);
	}

	@Override
	public int request_cancel(long reqNm) {
		return rdao.req_cancel(reqNm);
	}

	@Override
	public List<QuotationDTO> getList_user(String id) {
	
	 
	    List<QuotationDTO> qdto = qdao.getList_user(id);
	
	return qdto;
	   
	    
	
	}


	@Override
	public int request_alarm_user(String userId) {
		return qdao.request_alarm_user(userId);
	}

	@Override
	public List<RequestVO> getRequest_list_user(long qutationNm) {
	
		return qdao.getRequest_list_user(qutationNm);
	}

	@Override
	public List<QuotationVO> getList_read_user(String id) {
		// TODO Auto-generated method stub

		return qdao.getList_read_user(id);
	}

	@Override
	public List<RequestVO> setQutation(long reNm) {
		// TODO Auto-generated method stub
		return rdao.setQutation(reNm);
	}

	@Override
	public List<QuotationStatusDTO> setQutation_user(long quoNm) {
	
		qdao.checked(quoNm);
		return qdao.setQutation_user(quoNm);
		
	}

	@Override
	public MemberVO getCompany_name(long quoNm) {
		// TODO Auto-generated method stub
		return qdao.getCompany_name(quoNm);
	}

	@Override
	public QuotationVO getQuotation(long quotationNm) {
		return qdao.getQuotation(quotationNm);
	}

	@Override
	public void cancle_ok(long quotationNm) {
		qdao.cancle_ok(quotationNm);
		
	}

	@Override
	public long getQuotationNm(int keynum) {
		long quotationNm=qdao.getQuotationNm(keynum);
		return quotationNm;
		
	}

	@Override
	public QuotationVO setQutation_modify(long reNm) {
		QuotationVO qvo = qdao.quotation_modify(reNm);
		return qvo;
	}

	@Override
	public void quatation_modify(QuotationVO qvo) {

		qdao.quatation_modify(qvo);
	}

	@Override
	public RequestDTO getRequest_list_detail_user(long requestNm) {
		RequestDTO dto = new RequestDTO();
		dto.setRvo(rdao.getRequest_list(requestNm));
		dto.setFlist(fdao.req_file(requestNm));
		dto.setFile_img(rdao.getPorImg(requestNm));
		dto.setMvo(rdao.memberSelect(requestNm));
		return dto;
	}

	@Override
	public QuotationVO selectQuotation(long quoNm) {
	
		return qdao.selectQuotation(quoNm);
	}


}
