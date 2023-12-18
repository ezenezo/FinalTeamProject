package com.myweb.www.repository;

import org.apache.ibatis.annotations.Param;

public interface HeartDAO {

	void deletePortfolioLike(@Param("pno") long pno,@Param("id") String id);

	void addPortfolioLike(@Param("pno") long pno,@Param("id") String id);

	int likeQtyAreaInput(long pno);


}
