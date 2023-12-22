package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.myweb.www.domain.ReqFileVO;
import com.myweb.www.domain.RequestDTO;
import com.myweb.www.repository.ReqFileDAO;
import com.myweb.www.repository.RequestDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReqFileServiceImpl implements ReqFileService {

	@Inject
	private ReqFileDAO rfdao;
	
	@Inject
	private RequestDAO rdao;


	@Override
	public int insert_img(ReqFileVO file) {
		int isOk=1;
		if (file == null) {
			log.info("여기들어옴1");
			return isOk;
		} else if (isOk > 0 && file.getFileSize() > 0) {
			log.info("여기들어옴2");
			
			isOk = rfdao.insertFile(file);

		}

		
		return isOk;
	    
	}


	@Override
	public long selectNm() {
		
		return rdao.selectNm();
	}


	@Override
	public void fileInsert(MultipartFile file1) {
		// TODO Auto-generated method stub
		
	}

	
}
