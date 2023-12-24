package com.myweb.www.repository;

import java.util.List;


import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.PagingVO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;

public interface ReviewDAO {

	int addReview(ReviewVO rvo);


	List<ReviewVO> getReviewList(@Param("id") String id,@Param("pgvo") PagingVO pgvo);


	long selectMaxRno();

	List<ReviewVO> allReviewList();

	ReviewVO getDetailRvo(long rno);

	int deleteReview(long rno);

	int updateReview(ReviewVO rvo);

	List<ReviewVO> companyInfoReviewList(String id);

	int selectOneIdTotalCount(String id);

	List<ReviewVO> getReviewList2(String id);

	int selectAllReviewTotalCount();


	List<ReviewVO> getAllReviewListPh(PagingVO pgvo);


	void updateReviewLikeQty(long rno);


	void updateReadCount(long rno);


	String selectId(long rno);


	int reviewCount(String id);


	List<ReviewVO> getMyReviewList(String id);





}
