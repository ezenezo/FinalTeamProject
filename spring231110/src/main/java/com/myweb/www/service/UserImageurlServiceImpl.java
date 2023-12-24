package com.myweb.www.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.myweb.www.domain.FileVO;
import com.myweb.www.repository.CommentDAO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.MemberDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserImageurlServiceImpl implements UserImageurlService {
	
    // 데이터베이스 접근을 위한 리포지토리 또는 DAO
	private FileDAO fdao;
    // 예시 코드로 실제 구현은 데이터베이스 접근 방식에 따라 다릅니다.

	@Autowired
	public UserImageurlServiceImpl(FileDAO fdao) {
		this.fdao = fdao;
	}
	
	
    public String getUserProfileImageUrl(String username) {
        // 데이터베이스에서 사용자 정보를 조회
        FileVO filevo = fdao.getFile(username);
        String userfileurl = filevo.getSaveDir()+filevo.getUuid()+filevo.getFileName();
        log.info("UserImageurlServiceImpl의 userfileurl은" + userfileurl);
        return userfileurl != null ? userfileurl : null;
    }

}
