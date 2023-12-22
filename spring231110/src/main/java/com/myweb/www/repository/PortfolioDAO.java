package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.FilterdataVO;


import com.myweb.www.domain.CouponVO;

import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;

public interface PortfolioDAO {

	int insert(PortfolioVO pvo);

	long selectMaxPno();

	List<PortfolioVO> getListPortfolio(FilterdataVO filter);
	
	List<PortfolioVO> getListPortfolio1();

	PortfolioVO getDetailPvo(long pno);

	void updatePortfolioLikeQty(@Param("pno") long pno);

	void updateReadCount(long pno);

	String selectId(long pno);

	int heartCount(String id);

	int deletePortfolio(long pno);

	int updatePortfolio(PortfolioVO pvo);

	List<PortfolioVO> getListFilter(FilterdataVO filterData);

	List<PortfolioVO> getListMyPortfolio(String id);

	List<PortfolioVO> mainPostPdtoList(@Param("sliderOne") int sliderOne,@Param("sliderTwo") int sliderTwo);

//	List<PortfolioDTO> getListFilter(@Param("order") String order,@Param("homeTypeSh") String homeTypeSh,@Param("roomCntSh") String roomCntSh,@Param("familyTypeSh") String familyTypeSh,
//			@Param("homeStyle") String homeStyle);

	List<PortfolioVO> getHeartList(String id);

	PortfolioVO getPortfolio(long pno);


}
