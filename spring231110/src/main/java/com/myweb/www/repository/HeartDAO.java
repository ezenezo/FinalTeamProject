package com.myweb.www.repository;

import org.apache.ibatis.annotations.Param;

public interface HeartDAO {

	void deletePortfolioLike(@Param("pno") long pno,@Param("id") String id);

	void addPortfolioLike(@Param("pno") long pno,@Param("id") String id);

	int likeQtyAreaInput(long pno);

	void deleteCommentLike(@Param("cmtNo") long cmtNo, @Param("id") String id);

	void addCommentLike(@Param("cmtNo") long cmtNo, @Param("id") String id);

	int reviewLikeCheck(@Param("rno") long rno, @Param("id") String id);

	int portfolioLikeCheck(@Param("pno") long pno, @Param("id") String id);

	void deleteReviewLike(@Param("rno") long rno, @Param("id") String id);

	void addReviewLike(@Param("rno") long rno, @Param("id") String id);

	int reviewlikeQtyAreaInput(long rno);



}

