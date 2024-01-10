package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;


public interface RequestService {

	List<RequestQuestionVO> getList();

	List<RequestQuestionVO> getList_secound();

	List<RequestQuestionVO> getList_third();

	List<RequestQuestionVO> getList_third_2();

	void insert(RequestVO rvo);

//void insert_store(requestAnswer rvo);

//	String selectId(RequestVO rvo);

	List<RequestQuestionVO> getList_third_2_1();

	/*
	 * void insert_store_1(requestAnswer rvo);
	 * 
	 * void insert_store_2_2(requestAnswer rvo);
	 * 
	 * void insert_store_2_1(requestAnswer rvo);
	 */
//	long selectNm(String userid);

	int insert_img(RequestDTO requestDTO);

	Boolean req_check(long requestNm);

	long getList_status(String requestId);

	List<RequestVO> req_list(String id);

	List<RequestVO> req_detil(String reqNm);

	String company_name_get(long pno);

	int company_keynum(long pno);

	int getKeyNum(String id);

	String getCompany_name_req(long requestNm);

	void cancel_user(long reqNm);

	void cancel_r(RequestVO rvo);





}
