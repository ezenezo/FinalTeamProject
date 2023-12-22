package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.CompanyDTO;
import com.myweb.www.repository.CompanyDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FindMapServiceImpl implements FindMapService {
	
	@Inject 
	private CompanyDAO companydao;
	

	@Override
	public List<CompanyDTO> detailall() {
		// TODO Auto-generated method stub
//		bdao.readCount(bno);
		log.info("List<CompanyDTO> detailall() 진입");
		return companydao.selectdetailAll();
	}

}
