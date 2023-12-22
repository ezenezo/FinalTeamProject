package com.myweb.www.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import com.myweb.www.domain.CouponVO;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.FilterdataVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.security.MemberDTO2;

public interface PortfolioService {

	int add(PortfolioVO pvo, FileVO portfolioMainImg);
	
	List<PortfolioDTO> getList1();

	List<PortfolioDTO> getList2(FilterdataVO filter);

	PortfolioDTO getDetail(long pno, String authId);

	int portfolioLikeCheck(long pno, String id);

	void deletePortfolioLike(long pno, String id);

	void addPortfolioLike(long pno, String id);

	String selectCompanyName(String id);

	void updateReadCount(long pno);

	String selectId(long pno);

	int likeQtyAreaInput(long pno);


	int deletePortfolio(long pno);

	int postModifyPortfolio(PortfolioVO pvo, FileVO portfolioMainImg);

	List<PortfolioDTO> getListFilter(FilterdataVO filterData);

	List<PortfolioDTO> getMyList(String id);

	int postModifyPortfolioOnlyContent(PortfolioVO pvo);

	List<PortfolioVO> getHeartList(String id);

	PortfolioVO getPortfolio(long pno);

	MemberDTO2 getMdto(String id);




}
