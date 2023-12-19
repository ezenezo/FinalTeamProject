package com.myweb.www.repository;

import java.util.List;

import com.myweb.www.domain.ReviewVO;

public interface ReviewDAO {

	int addReview(ReviewVO rvo);

	List<ReviewVO> getReviewList(String id);

	long selectMaxRno();

	List<ReviewVO> allReviewList();

	ReviewVO getDetailRvo(long rno);

	int deleteReview(long rno);

	int updateReview(ReviewVO rvo);

}
