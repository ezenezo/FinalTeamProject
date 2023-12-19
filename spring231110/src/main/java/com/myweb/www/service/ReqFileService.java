package com.myweb.www.service;

import org.springframework.web.multipart.MultipartFile;

import com.myweb.www.domain.ReqFileVO;
import com.myweb.www.domain.RequestDTO;

public interface ReqFileService {

	int insert_img(ReqFileVO file);

	long selectNm();

	void fileInsert(MultipartFile file1);


}
