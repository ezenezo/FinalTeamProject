package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;


import com.myweb.www.domain.CouponVO;

import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;

public interface PortfolioDAO {

	int insert(PortfolioVO pvo);

	long selectMaxPno();

	List<PortfolioVO> getListPortfolio();

	PortfolioVO getDetailPvo(long pno);

	int portfolioLikeCheck(@Param("pno") long pno,@Param("id") String id);

	void deletePortfolioLike(@Param("pno") long pno,@Param("id") String id);

	void updatePortfolioLikeQty(@Param("pno") long pno,@Param("num") int num);

	void addPortfolioLike(@Param("pno") long pno,@Param("id") String id);

	void updateReadCount(long pno);

	String selectId(long pno);


	List<PortfolioVO> getHeartList(String id);

	PortfolioVO getPortfolio(long pno);


}
