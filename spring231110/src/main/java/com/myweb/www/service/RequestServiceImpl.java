package com.myweb.www.service;

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
public class RequestServiceImpl implements RequestService{
	
	@Inject
	private RequestDAO rdao;
	@Inject
	private QuotationService qsv;
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

	@Override
	public void insert(RequestVO rvo) {
	log.info("서비스들어옴 요청서"+rvo);
 rdao.insert(rvo);
 
 

 
	/*
	 * QuotationVO avo = new QuotationVO(); avo.setForm(rvo.getForm( ));
	 * avo.setCategoryType(rvo.getCategoryType()); avo.setRang(rvo.getRang());
	 * avo.setStatus(rvo.getStatus()); avo.setAddress(rvo.getAddress());
	 * avo.setZoneCode(rvo.getZoneCode());
	 * avo.setDetailAddress(rvo.getDetailAddress());
	 * avo.setExtraAddress(rvo.getExtraAddress());
	 * avo.setAquareFootage(rvo.getAquareFootage());
	 * avo.setSquareMeter(rvo.getSquareMeter());
	 * avo.setRequestId(rvo.getRequestId());
	 */
 
	/* log.info("서비스 avo 요청서에서 받음=> "+avo); */
// qsv.submit(avo);
// 
	}

	

	/*비동기 사용시 사용 바람
	 * @Override public String selectId(RequestVO rvo) { // TODO Auto-generated
	 * method stub return rdao.selectID(rvo); }
	 */
	/*
	 * @Override public void insert_store(requestAnswer rvo) { // TODO
	 * Auto-generated method stub rdao.insert_store(rvo); }
	 */


	@Override
	public List<RequestQuestionVO> getList_third_2_1() {
		log.info("요청 리스트 서비스 들어옴2");
		List<RequestQuestionVO> list = rdao.list2_1();
		return list;
	}

	/*비동기 사용시 사용 바람
	 * @Override public void insert_store_1(requestAnswer rvo) {
	 * rdao.insert_store_1(rvo); }
	 * 
	 * @Override public void insert_store_2_2(requestAnswer rvo) {
	 * rdao.insert_store_2_2(rvo);
	 * 
	 * }
	 * 
	 * @Override public void insert_store_2_1(requestAnswer rvo) {
	 * rdao.insert_store_2_1(rvo);
	 * 
	 * }
	 */
	
	/*
	 * @Override public long selectNm(String userid) { // TODO Auto-generated method
	 * stub return rdao.selectNm(userid); }
	 */
	@Override
	public int insert_img(RequestDTO requestDTO) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Boolean req_check(long requestNm) {
	    Boolean checkResult = rdao.req_check(requestNm);
	   
		return checkResult;
	}

	@Override
	public long getList_status(String requestId) {
		// TODO Auto-generated method stub
		return rdao.getList_status(requestId);
	}

	@Override
	public List<RequestVO> req_list(String id) {
		// TODO Auto-generated method stub
		return rdao.req_list(id);
	}

	@Override
	public List<RequestVO> req_detil(String reqNm) {
		List<RequestVO> list = rdao.req_detile(reqNm);
		log.info("list들어옴"+list);
		return list;
	}

	@Override
	public String company_name_get(long pno) {

	 return rdao.company_name(pno);
		
	}

	@Override
	public int company_keynum(long pno) {
		// TODO Auto-generated method stub
		return rdao.company_keynum(pno);
	}

	@Override
	public int getKeyNum(String id) {
		// TODO Auto-generated method stub
		return rdao.getCompanyNum(id);
	}



}
