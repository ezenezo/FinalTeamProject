package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;
import com.myweb.www.repository.CompanyDAO;
import com.myweb.www.repository.FileDAO;
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

	@Autowired
	public ReviewServiceImpl(ReviewDAO rdao, FileDAO fdao, CompanyDAO codao, MemberDAO mdao) {
		this.rdao = rdao;
		this.fdao = fdao;
		this.codao = codao;
		this.mdao = mdao;
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
		log.info("rvoList>>{}", rvoList);
		for (ReviewVO rvo : rvoList) {
			ReviewDTO rdto = new ReviewDTO();
			rdto.setRvo(rvo);
			log.info("rdto>>{}", rdto);
			rdto.setReviewMainImg(fdao.getReviewMainImg(rvo.getRno()));
			rdtoList.add(rdto);
		}

		return rdtoList;
	}

	// detail
	@Override
	public ReviewDTO getDetail(long rno) {
		ReviewDTO rdto = new ReviewDTO();

		ReviewVO rvo = rdao.getDetailRvo(rno);
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
		log.info("reviewMainImg>>" + reviewMainImg.getFileName());

		reviewMainImg.setRno(rvo.getRno());
		log.info("reviewMainImg>>" + reviewMainImg.getRno());

		if (isOk > 0) {
			log.info("isOk>>" + isOk);
			log.info("파일 테이블 저장 부분 오는지");
			isOk = fdao.updateReviewMainImg(reviewMainImg);
			log.info("isOk2>>" + isOk);
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
		
		MemberVO mvo=mdao.selectEmail(comId);
		CompanyVO comvo = codao.getCvo(comId);
		FileVO fvo = fdao.getFile(comId);
		mdto.setMvo(mvo);
		mdto.setCvo(comvo);
		mdto.setFvo(fvo);
		return mdto;
	}

}
