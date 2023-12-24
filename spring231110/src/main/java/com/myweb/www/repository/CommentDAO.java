package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.PagingVO;

public interface CommentDAO {

	int insert(CommentVO cvo);

	int getTotalCount(long pno);

	List<CommentVO> getcmtList(@Param("pno") long pno,@Param("pgvo") PagingVO pgvo);

	int remove(long cno);

	int modify(CommentVO cvo);

	int CommentLikeCheck(@Param("cmtNo") long cmtNo, @Param("id") String id);

	void updateCommentLikeQty(long cmtNo);

	int likeQtyAreaInput(long cmtNo);

	int getReviewCommentTotalCount(long rno);

	List<CommentVO> getReviewcmtList(@Param("rno") long rno,@Param("pgvo") PagingVO pgvo);


}
