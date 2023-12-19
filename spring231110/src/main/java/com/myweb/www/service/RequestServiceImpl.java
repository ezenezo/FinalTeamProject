package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.repository.RequestDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RequestServiceImpl implements RequestService{
	
	@Inject
	private RequestDAO rdao;

	@Override
	public List<RequestQuestionVO> getList() {
		log.info("요청 리스트 서비스 들어옴");
		List<RequestQuestionVO> list = rdao.list();
		
		return list;
	}

	@Override
	public List<RequestQuestionVO> getList_secound() {
		log.info("요청 리스트 서비스 들어옴2");
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
		log.info("요청 리스트 서비스 들어옴2");

		List<RequestQuestionVO> list = rdao.list3_2();
		return list;
	}

}
