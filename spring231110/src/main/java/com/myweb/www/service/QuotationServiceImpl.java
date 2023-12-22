package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationVO;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
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
	public List<RequestVO> getList(String id) {
		log.info("서비스임플 아이디 들어옴" + id);
		return rdao.selectrequset(id);
	}

	@Override
	public List<RequestVO> getList_read(String id) {

		return rdao.selectrequset_read(id);
	}

	@Override
	public int request_alarm(String userId) {

		return rdao.request_alarm(userId);
	}

	@Override

	public RequestDTO getRequest_list(long requestNm) {
		log.info("request 서비스 임필 리스트 개인" + requestNm);
		RequestDTO dto = new RequestDTO();
		dto.setRvo(rdao.getRequest_list(requestNm));
		dto.setFlist(fdao.req_file(requestNm));
		dto.setFile_img(rdao.getPorImg(requestNm));
		dto.setMvo(rdao.memberSelect(requestNm));
		rdao.checked(requestNm);
		return dto;

	}

	@Override
	public void quatation_submit(QuotationVO qvo) {
		qdao.quatation_submit(qvo);
		RequestVO req = new RequestVO();

		long reqNm_q = qvo.getRequestNm();

		// rdao.quest_alarm_submit(reqNm_q);
		// rdao.quest_alarm_submit(reqNm_q);

	}

	@Override
	public int request_cancel(long reqNm) {
		// TODO Auto-generated method stub
		return rdao.req_cancel(reqNm);
	}

	@Override
	public List<QuotationDTO> getList_user(String id) {
	   // List<QuotationDTO> list = new ArrayList<>();
	    
	 
	    List<QuotationDTO> qdto = qdao.getList_user(id);
	    log.info("값 들어옴"+qdto);
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
	public List<QuotationVO> setQutation_user(long quoNm) {
		log.info("견적서 보러 들러옴(사용자)");
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

	
}
