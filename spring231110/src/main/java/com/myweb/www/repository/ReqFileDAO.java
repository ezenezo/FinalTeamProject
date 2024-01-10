package com.myweb.www.repository;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.myweb.www.domain.ReqFileVO;
import com.myweb.www.domain.RequestDTO;

public interface ReqFileDAO {

	int insertFile(ReqFileVO file);

	ReqFileVO req_file(long requestNm);


}
