package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

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
		
		log.info("사용자 취소 들어옴(견적서 취소)"+quotationNm);
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
		// TODO Auto-generated method stub
		
		 List<StatusDTO> sdto = sdao.status(id);

		return sdto;
	}

	@Override
	public void quotation_status_setCompanyNm(StatusVO svo) {
		sdao.quotation_status_setCompanyNm(svo);
		
	}

	@Override
	public List<StatusDTO> getStatus_com(String id) {

		 List<StatusDTO> sdto = sdao.status_com(id);

		return sdto;
	}

	

}



