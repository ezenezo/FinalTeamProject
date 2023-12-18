package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.HeartVO;

public interface HeartDAO {

	void deletePortfolioLike(@Param("pno") long pno, @Param("id") String id);

	void addPortfolioLike(@Param("pno") long pno, @Param("id") String id);

	int likeQtyAreaInput(long pno);
}