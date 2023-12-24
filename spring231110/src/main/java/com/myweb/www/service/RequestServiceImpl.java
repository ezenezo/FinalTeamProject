package com.myweb.www.service;

import java.io.Console;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;

import com.myweb.www.repository.RequestDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RequestServiceImpl implements RequestService {

	@Inject
	private RequestDAO rdao;
	@Inject
	private QuotationService qsv;

	@Override
	public List<RequestQuestionVO> getList() {
		List<RequestQuestionVO> list = rdao.list();

		return list;
	}

	@Override
	public List<RequestQuestionVO> getList_secound() {
		List<RequestQuestionVO> list = rdao.list2();
		return list;
	}

	@Override
	public List<RequestQuestionVO> getList_third() {
		List<RequestQuestionVO> list = rdao.list3();
		return list;
	}

	@Override
	public List<RequestQuestionVO> getList_third_2() {
		List<RequestQuestionVO> list = rdao.list3_2();
		return list;
	}

	@Override
	public void insert(RequestVO rvo) {
		rdao.insert(rvo);

	}

	
	@Override
	public List<RequestQuestionVO> getList_third_2_1() {
		List<RequestQuestionVO> list = rdao.list2_1();
		return list;
	}

	@Override
	public int insert_img(RequestDTO requestDTO) {
	
		return 0;
	}

	@Override
	public Boolean req_check(long requestNm) {
		Boolean checkResult = rdao.req_check(requestNm);

		return checkResult;
	}

	@Override
	public long getList_status(String requestId) {
		
		return rdao.getList_status(requestId);
	}

	@Override
	public List<RequestVO> req_list(String id) {
		return rdao.req_list(id);
	}

	@Override
	public List<RequestVO> req_detil(String reqNm) {
		List<RequestVO> list = rdao.req_detile(reqNm);
		return list;
	}

	@Override
	public String company_name_get(long pno) {

		return rdao.company_name(pno);

	}

	@Override
	public int company_keynum(long pno) {
		return rdao.company_keynum(pno);
	}

	@Override
	public int getKeyNum(String id) {
		return rdao.getCompanyNum(id);
	}

	@Override
	public String getCompany_name_req(long requestNm) {
		return rdao.getCompany_name_req(requestNm);
	}

	@Override
	public void cancel_user(long reqNm) {
		rdao.cancel_user(reqNm);

	}

	@Override
	public void cancel_r(RequestVO rvo) {
		rdao.cancel_r(rvo);

	}

}
