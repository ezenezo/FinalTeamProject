package com.myweb.www.service;

import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.handler.PagingHandler;

public interface commentService {

	int commentWrite(CommentVO cvo);

	PagingHandler getList(long pno, PagingVO pgvo, String authId);

	int remove(long cno);

	int modify(CommentVO cvo);

	int CommentLikeCheck(long cmtNo, String id);

	void deleteCommentLike(long cmtNo, String id);

	void addCommentLike(long cmtNo, String id);

	int likeQtyAreaInput(long cmtNo);

	PagingHandler getReviewCommentList(long rno, PagingVO pgvo, String authId);

}
