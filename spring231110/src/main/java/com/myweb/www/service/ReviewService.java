package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.FileVO;

import com.myweb.www.domain.PagingVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;
import com.myweb.www.handler.PagingHandler;

import com.myweb.www.security.MemberDTO2;

public interface ReviewService {

	int addReview(ReviewVO rvo, FileVO reviewMainImg);

	String getComName(String comId);

	List<ReviewDTO> mainRdtoList();

	ReviewDTO getDetail(long rno, String id);

	int deleteReview(long rno);

	int postModifyReview(ReviewVO rvo, FileVO reviewMainImg);

	int postModifyReviewOnlyContent(ReviewVO rvo);

	MemberDTO2 getMdto(String comId);

	PagingHandler getList(String id, PagingVO pgvo);

	PagingHandler getAllList(PagingVO pgvo);

	int reviewLikeCheck(long rno, String id);

	void deleteReviewLike(long rno, String id);

	void addReviewLike(long rno, String id);

	int likeQtyAreaInput(long rno);

	void updateReadCount(long rno);

	String selectId(long rno);

	List<ReviewDTO> getRdtoList(String id);

	String getCompanyId(int keynum);

	FileVO getProfileImg(String writer);


}
