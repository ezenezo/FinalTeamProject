package com.myweb.www.repository;

import java.util.List;


import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.ReqFileVO;
import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.security.MemberVO;


public interface RequestDAO {

	List<RequestQuestionVO> list();

	List<RequestQuestionVO> list2();

	List<RequestQuestionVO> list3();

	List<RequestQuestionVO> list3_2();

void insert(RequestVO rvo);

/* void insert_store(requestAnswer rvo); */

	/*
	 * List<RequestQuestionVO> list2_1();
	 * 
	 * void insert_store_1(requestAnswer rvo);
	 * 
	 * void insert_store_2_1(requestAnswer rvo);
	 * 
	 * void insert_store_2_2(requestAnswer rvo);
	 */
	/*
	 * long selectNm(String userid);
	 */
	List<RequestVO> selectrequset(int keynum);

	long selectNm();

	List<RequestQuestionVO> list2_1();

	int request_alarm(int keynum);

	String selectOneBno(String requestId);

	long selectOneBno(long requestNm);

	List<ReqFileVO> selectOneRVO(String requestId);

	RequestVO getRequest_list(long requestNm);

	void quest_alarm_submit(long reqNm_q);



void checked(long requestNm);

	Boolean req_check(long requestNm);

	List<RequestVO> selectrequset_read(int keynum);

	int req_cancel(long reqNm);

	List<RequestVO> getList_user(String id);

	int request_alarm_user(String userId);

	FileVO getPorImg(long requestNm);

	MemberVO memberSelect(long requestNm);

	List<RequestVO> setQutation(long reNm);

	void setPno(long pno);

	void okTypeYes_ok(long requstNm);

	String selectNm_status();

	long getList_status(String requestId);

	List<RequestVO> req_list(String id);

	List<RequestVO> req_detile(String reqNm);

	String company_name(long pno);

	int company_keynum(long pno);

	int getCompanyNum(String id);

	String getCompany_name_req(long requestNm);

	

	void cancel_user(long reqNm);

	void cancel_r(RequestVO rvo);

	





}
