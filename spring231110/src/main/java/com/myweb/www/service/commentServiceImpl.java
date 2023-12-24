package com.myweb.www.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.domain.CommentDTO;
import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.handler.PagingHandler;
import com.myweb.www.repository.CommentDAO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.HeartDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class commentServiceImpl implements commentService {

	private CommentDAO cdao;
	private FileDAO fdao;
	private HeartDAO hdao;

	@Autowired
	public commentServiceImpl(CommentDAO cdao, FileDAO fdao, HeartDAO hdao) {
		this.cdao = cdao;
		this.fdao = fdao;
		this.hdao = hdao;
	}

	// 등록
	@Override
	public int commentWrite(CommentVO cvo) {
		return cdao.insert(cvo);
	}

	// 리스트
	@Override
	public PagingHandler getList(long pno, PagingVO pgvo, String authId) {
		// pgvo

		// totalCount
		int totalCount = cdao.getTotalCount(pno);
		// cmtList
		List<CommentDTO> cdtoList = new ArrayList<CommentDTO>();

		List<CommentVO> list = cdao.getcmtList(pno, pgvo);

		for (CommentVO cvo : list) {
			int isOk = cdao.CommentLikeCheck(cvo.getCmtNo(), authId);
			if (isOk > 0) {
				cvo.setLikeCheck(true);
			} else {
				cvo.setLikeCheck(false);
			}
		}

		for (CommentVO cvo : list) {
			CommentDTO cdto = new CommentDTO();

			cdto.setCvo(cvo);
			cdto.setFvo(fdao.getFile(cvo.getId()));
			cdtoList.add(cdto);
		}

		// PagingHandler
		PagingHandler ph = new PagingHandler(cdtoList, pgvo, totalCount);

		return ph;
	}

	@Override
	public int remove(long cno) {
		return cdao.remove(cno);
	}

	@Override
	public int modify(CommentVO cvo) {
		return cdao.modify(cvo);
	}

	// 좋아요 확인
	@Override
	public int CommentLikeCheck(long cmtNo, String id) {
		return cdao.CommentLikeCheck(cmtNo, id);
	}

	// 좋아요 취소
	@Override
	public void deleteCommentLike(long cmtNo, String id) {
		hdao.deleteCommentLike(cmtNo, id); // heart테이블에 delete
		cdao.updateCommentLikeQty(cmtNo); // Comment테이블에 likeQty update
	}

	// 좋아요 등록
	@Override
	public void addCommentLike(long cmtNo, String id) {
		hdao.addCommentLike(cmtNo, id);
		cdao.updateCommentLikeQty(cmtNo);
	}

	@Override
	public int likeQtyAreaInput(long cmtNo) {
		return cdao.likeQtyAreaInput(cmtNo);
	}

	@Override
	public PagingHandler getReviewCommentList(long rno, PagingVO pgvo, String authId) {
		// pgvo

		// totalCount
		int totalCount = cdao.getReviewCommentTotalCount(rno);
		// cmtList
		List<CommentDTO> cdtoList = new ArrayList<CommentDTO>();

		List<CommentVO> list = cdao.getReviewcmtList(rno, pgvo);

		for (CommentVO cvo : list) {
			int isOk = cdao.CommentLikeCheck(cvo.getCmtNo(), authId);
			if (isOk > 0) {
				cvo.setLikeCheck(true);
			} else {
				cvo.setLikeCheck(false);
			}
		}

		for (CommentVO cvo : list) {
			CommentDTO cdto = new CommentDTO();

			cdto.setCvo(cvo);
			cdto.setFvo(fdao.getFile(cvo.getId()));
			cdtoList.add(cdto);
		}

		// PagingHandler
		PagingHandler ph = new PagingHandler(cdtoList, pgvo, totalCount);

		return ph;
	}

}
