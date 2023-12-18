package com.myweb.www.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import com.myweb.www.domain.CouponVO;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;

public interface PortfolioService {

	int add(PortfolioVO pvo, FileVO portfolioMainImg);

	List<PortfolioDTO> getList();

	PortfolioDTO getDetail(long pno, String authId);

	int portfolioLikeCheck(long pno, String id);

	void deletePortfolioLike(long pno, String id);

	void addPortfolioLike(long pno, String id);

	String selectCompanyName(String id);

	void updateReadCount(long pno);

	String selectId(long pno);

	int likeQtyAreaInput(long pno);

	List<PortfolioVO> getHeartList(String id);

	PortfolioVO getPortfolio(long pno);


}
