package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.PortfolioDAO;
import com.myweb.www.repository.ReviewDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommonServiceImpl implements CommonService {

	private FileDAO fdao;
	private PortfolioDAO pdao;
	private ReviewDAO rdao;

	@Autowired
	public CommonServiceImpl(FileDAO fdao, PortfolioDAO pdao,ReviewDAO rdao) {
		this.fdao = fdao;
		this.pdao = pdao;
		this.rdao = rdao;
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
