package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.repository.QuotationDAO;
import com.myweb.www.repository.RequestDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class QuotationServiceImpl implements QuotationService {
	@Inject
	private QuotationDAO qdao;
	@Inject
	private RequestDAO rdao;

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
	public int request_alarm(String userId) {
		// TODO Auto-generated method stub
		log.info(userId);
		return rdao.request_alarm(userId);
	}

	@Override
	public List<RequestVO> getRequest_list(long requestNm) {
		log.info("request 서비스 임필 리스트 개인" + requestNm);
		rdao.checked(requestNm);
		return rdao.getRequest_list(requestNm);
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
	public List<RequestVO> getList_read(String id) {
		// TODO Auto-generated method stub
		return rdao.selectrequset_read(id);
	}

	@Override
	public int request_cancel(long reqNm) {
		// TODO Auto-generated method stub
		return rdao.req_cancel(reqNm);
	}

	@Override
	public List<RequestVO> getList_user(String id) {

		return qdao.getList_user(id);
	}

	@Override
	public int request_alarm_user(String userId) {

		return qdao.request_alarm_user(userId);
	}

	@Override
	public List<RequestVO> getRequest_list_user(long qutationNm) {
		qdao.checked(qutationNm);
		return qdao.getRequest_list_user(qutationNm);
	}

	@Override
	public List<QuotationVO> getList_read_user(String id) {
		// TODO Auto-generated method stub
		return qdao.getList_read_user(id);
	}

	@Override
	public QuotationVO getQuotation(long quotationNm) {
		return qdao.getQuotation(quotationNm);
	}

}
