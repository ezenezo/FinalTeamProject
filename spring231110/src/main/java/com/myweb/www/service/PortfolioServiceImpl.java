package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.myweb.www.domain.CouponVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.HeartDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.repository.PortfolioDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PortfolioServiceImpl implements PortfolioService {

	private PortfolioDAO pdao;
	private FileDAO fdao;
	private MemberDAO mdao;
	private HeartDAO hdao;

	@Autowired
	public PortfolioServiceImpl(PortfolioDAO pdao, FileDAO fdao, MemberDAO mdao) {
		this.pdao = pdao;
		this.fdao = fdao;
		this.mdao = mdao;

	}

	// insert
	@Override
	public int add(PortfolioVO pvo, FileVO portfolioMainImg) {
		int isOk = pdao.insert(pvo);

		if (portfolioMainImg == null) {
			return isOk;
		} else if (isOk > 0 && portfolioMainImg.getFileSize() > 0) {
			long pno = pdao.selectMaxPno();// 가장 최근에 add된 포폴 pno
			portfolioMainImg.setPno(pno);
			isOk = fdao.insertPortfolioMainImg(portfolioMainImg);

		}
		return isOk;
	}

	// list
	@Override
	public List<PortfolioDTO> getList() {
		List<PortfolioDTO> pdtoList = new ArrayList<>(); // 리스트 초기화

		List<PortfolioVO> pvoList = pdao.getListPortfolio();
		for (PortfolioVO pvo : pvoList) {
			PortfolioDTO pdto = new PortfolioDTO();
			pdto.setPvo(pvo);
			pdtoList.add(pdto);
		}
		for (PortfolioDTO pdto : pdtoList) {
			pdto.setMainImg(fdao.selectMainImg(pdto.getPvo().getPno()));
		}
		return pdtoList;
	}

	// detail
	@Override
	public PortfolioDTO getDetail(long pno, String authId) {
		PortfolioDTO pdto = new PortfolioDTO();

		PortfolioVO pvo = pdao.getDetailPvo(pno);

		int isOk = pdao.portfolioLikeCheck(pno, authId);
		if (isOk > 0) {
			pvo.setLikeCheck(true);
		} else {
			pvo.setLikeCheck(false);
		}
		FileVO fvo = fdao.selectMainImg(pno);
		pdto.setPvo(pvo);
		pdto.setMainImg(fvo);
		return pdto;
	}

	@Override
	public int likeQtyAreaInput(long pno) {
		log.info("서비스임플 오는지");
		return hdao.likeQtyAreaInput(pno);
	}

	// 포폴 좋아요 확인(1이면 이미 체크, 0이면 체크안되어있는거)
	@Override
	public int portfolioLikeCheck(long pno, String id) {
		return pdao.portfolioLikeCheck(pno, id);
	}

	// 포폴 좋아요 취소
	@Override
	public void deletePortfolioLike(long pno, String id) {
		int num = -1;
		log.info("취소할 때 여기오는지2");
		log.info("서비스임플pno>> " + pno);
		log.info("서비스임플id>> " + id);
		hdao.deletePortfolioLike(pno, id);// heart테이블에 delete
		log.info("취소할 때 여기오는지3");
		pdao.updatePortfolioLikeQty(pno, num); // portfolio테이블의 likeQty에 -1해주기

	}

	// 포폴 좋아요
	@Override
	public void addPortfolioLike(long pno, String id) {
		int num = 1;
		hdao.addPortfolioLike(pno, id); // heart테이블에 insert
		pdao.updatePortfolioLikeQty(pno, num); // portfolio테이블의 likeQty에 +1해주기
	}

	// 컴퍼니 이름 찾아오기
	@Override
	public String selectCompanyName(String id) {
		return mdao.selectCompanyName(id);
	}

	// 조회수 올리기
	@Override
	public void updateReadCount(long pno) {
		pdao.updateReadCount(pno);

	}

	@Override
	public String selectId(long pno) {
		return pdao.selectId(pno);
	}

	//좋아요 찍힌 포폴 가져오기
	@Override
	public List<PortfolioVO> getHeartList(String id) {
		return pdao.getHeartList(id);
	}

	@Override
	public PortfolioVO getPortfolio(long pno) {
		return pdao.getPortfolio(pno);
	}

}
