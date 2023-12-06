package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;

public interface RequestService {

	List<RequestQuestionVO> getList();

	List<RequestQuestionVO> getList_secound();

	List<RequestQuestionVO> getList_third();

	List<RequestQuestionVO> getList_third_2();

}
