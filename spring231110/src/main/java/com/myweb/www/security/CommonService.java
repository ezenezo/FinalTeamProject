package com.myweb.www.security;

import java.util.List;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.ReviewDTO;

public interface CommonService {

	List<FileVO> portfolioMainImgList();

	List<PortfolioDTO> mainPostPdtoList(int sliderOne, int sliderTwo);





}
