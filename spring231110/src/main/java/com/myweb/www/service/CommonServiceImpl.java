package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.repository.CommonDAO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.PortfolioDAO;
import com.myweb.www.repository.ReviewDAO;
import com.myweb.www.security.CommonService;

@Service
public class CommonServiceImpl implements CommonService{

	private CommonDAO comDAO;

	private FileDAO fdao;
	private PortfolioDAO pdao;
	private ReviewDAO rdao;


	@Autowired
	public CommonServiceImpl(FileDAO fdao, PortfolioDAO pdao,ReviewDAO rdao , CommonDAO comDAO) {
		this.fdao = fdao;
		this.pdao = pdao;
		this.rdao = rdao;
		this.comDAO = comDAO;
	}

	@Override
	public List<FileVO> portfolioMainImgList() {
		return fdao.getFileList();
	}

	@Override
	public List<PortfolioDTO> mainPostPdtoList(int sliderOne, int sliderTwo) {

		List<PortfolioDTO> pdtoList = new ArrayList<>(); // 리스트 초기화

		List<PortfolioVO> pvoList = pdao.mainPostPdtoList(sliderOne, sliderTwo);
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

	
	
}
