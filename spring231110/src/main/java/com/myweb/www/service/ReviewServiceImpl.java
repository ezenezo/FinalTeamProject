package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.FileVO;

import com.myweb.www.domain.PagingVO;

import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;

import com.myweb.www.handler.PagingHandler;
import com.myweb.www.repository.CompanyDAO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.HeartDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.repository.ReviewDAO;
import com.myweb.www.security.MemberDTO2;
import com.myweb.www.security.MemberVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReviewServiceImpl implements ReviewService {

	private ReviewDAO rdao;
	private FileDAO fdao;
	private CompanyDAO codao;
	private MemberDAO mdao;
	private HeartDAO hdao;

	@Autowired
	public ReviewServiceImpl(ReviewDAO rdao, FileDAO fdao, CompanyDAO codao, MemberDAO mdao, HeartDAO hdao) {
		this.rdao = rdao;
		this.fdao = fdao;
		this.codao = codao;
		this.mdao = mdao;
		this.hdao = hdao;
	}

	@Override
	public int addReview(ReviewVO rvo, FileVO reviewMainImg) {
		String comId = rvo.getComId();
		int isOk = rdao.addReview(rvo);

		if (reviewMainImg == null) {
			return isOk;
		} else if (isOk > 0 && reviewMainImg.getFileSize() > 0) {
			long rno = rdao.selectMaxRno();
			reviewMainImg.setRno(rno);
			isOk = fdao.insertReviewMainImg(reviewMainImg);
		}

		if (isOk > 0) {
			isOk = codao.updateRateAverage(comId);
			isOk = codao.reviewCount();
		}

		return isOk;
	}

	@Override
	public String getComName(String comId) {
		String id = comId;
		return mdao.selectCompanyName(id);
	}

	@Override
	public List<ReviewDTO> mainRdtoList() {
		List<ReviewDTO> rdtoList = new ArrayList<>();
		List<ReviewVO> rvoList = rdao.allReviewList();
		for (ReviewVO rvo : rvoList) {
			ReviewDTO rdto = new ReviewDTO();
			rdto.setRvo(rvo);
			rdto.setReviewMainImg(fdao.getReviewMainImg(rvo.getRno()));
			rdtoList.add(rdto);
		}

		return rdtoList;
	}

	// detail
	@Override
	public ReviewDTO getDetail(long rno,String id) {
		ReviewDTO rdto = new ReviewDTO();

		ReviewVO rvo = rdao.getDetailRvo(rno);
		
		int isOk=hdao.reviewLikeCheck(rno,id);
		if(isOk>0) {
			rvo.setLikeCheck(true);
		}else {
			rvo.setLikeCheck(false);
		}
		
		FileVO fvo = fdao.getReviewMainImg(rno);
		rdto.setRvo(rvo);
		rdto.setReviewMainImg(fvo);
		return rdto;
	}

	@Override
	public int deleteReview(long rno) {
		int isOk = rdao.deleteReview(rno);
		if (isOk > 0) {
			fdao.deleteReviewMainImg(rno);
			codao.reviewCount();
		}
		return isOk;
	}

	@Override
	public int postModifyReview(ReviewVO rvo, FileVO reviewMainImg) {
		int isOk = rdao.updateReview(rvo); // 내용 업데이트

		reviewMainImg.setRno(rvo.getRno());

		if (isOk > 0) {
			isOk = fdao.updateReviewMainImg(reviewMainImg);
		}
		return isOk;
	}

	@Override
	public int postModifyReviewOnlyContent(ReviewVO rvo) {
		int isOk = rdao.updateReview(rvo); // 내용 업데이트
		return isOk;
	}

	@Override
	public MemberDTO2 getMdto(String comId) {
		MemberDTO2 mdto = new MemberDTO2();

		MemberVO mvo = mdao.selectEmail(comId);

		CompanyVO comvo = codao.getCvo(comId);
		FileVO fvo = fdao.getFile(comId);
		mdto.setMvo(mvo);
		mdto.setCvo(comvo);
		mdto.setFvo(fvo);
		return mdto;
	}

	@Override
	public PagingHandler getList(String id, PagingVO pgvo) {
		List<ReviewDTO> rdtoList = new ArrayList<>();

		// totalCount 구하기
		int totalCount = rdao.selectOneIdTotalCount(id);
		// ReivewVO List 찾아오기
		List<ReviewVO> rvoList = rdao.getReviewList(id, pgvo);

		for (ReviewVO rvo : rvoList) {
			ReviewDTO rdto = new ReviewDTO();
			rdto.setRvo(rvo);
			rdto.setReviewMainImg(fdao.getReviewMainImg(rvo.getRno()));
			rdtoList.add(rdto);
		}

		// pagingHandler 값 완성 후 리턴
		PagingHandler ph = new PagingHandler(pgvo, totalCount, rdtoList);

		return ph;
	}

	@Override
	public PagingHandler getAllList(PagingVO pgvo) {
		List<ReviewDTO> rdtoList = new ArrayList<>();

		// totalCount 구하기
		int totalCount = rdao.selectAllReviewTotalCount();
		// ReivewVO List 찾아오기
		List<ReviewVO> rvoList = rdao.getAllReviewListPh(pgvo);

		for (ReviewVO rvo : rvoList) {
			ReviewDTO rdto = new ReviewDTO();
			rdto.setRvo(rvo);
			rdto.setReviewMainImg(fdao.getReviewMainImg(rvo.getRno()));
			rdtoList.add(rdto);
		}

		// pagingHandler 값 완성 후 리턴
		PagingHandler ph = new PagingHandler(pgvo, totalCount, rdtoList);

		return ph;
	}

	@Override
	public int reviewLikeCheck(long rno, String id) {
		return hdao.reviewLikeCheck(rno, id);
	}

	@Override
	public void deleteReviewLike(long rno, String id) {
		hdao.deleteReviewLike(rno, id);
		rdao.updateReviewLikeQty(rno);
	}

	@Override
	public void addReviewLike(long rno, String id) {
		hdao.addReviewLike(rno, id);
		rdao.updateReviewLikeQty(rno);
	}

	@Override
	public int likeQtyAreaInput(long rno) {
		return hdao.reviewlikeQtyAreaInput(rno);
	}

	@Override
	public void updateReadCount(long rno) {
		rdao.updateReadCount(rno);
	}

	@Override
	public String selectId(long rno) {
		return rdao.selectId(rno);
	}

	@Override
	public List<ReviewDTO> getRdtoList(String id) {
		List<ReviewDTO> rdtoList = new ArrayList<ReviewDTO>();
		long rno=0;
		
		List <ReviewVO> rvoList = rdao.getMyReviewList(id);
		for(ReviewVO rvo : rvoList) {
		ReviewDTO rdto = new ReviewDTO();
		rdto.setRvo(rvo);
		rno=rvo.getRno();
		
		rdto.setReviewMainImg(fdao.getReviewMainImg(rno));
		rdtoList.add(rdto);
		}
		return rdtoList;
	}

	@Override
	public String getCompanyId(int keynum) {
		return codao.getCompanyId(keynum);
	}

	@Override
	public FileVO getProfileImg(String writer) {
		String id=writer;
		return fdao.getFile(id);
	}

}
