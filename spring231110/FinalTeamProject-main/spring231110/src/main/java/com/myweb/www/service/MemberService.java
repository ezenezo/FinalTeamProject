package com.myweb.www.service;

import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.JsonNode;

import com.myweb.www.domain.CompanyDTO2;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.Coordinates;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.security.AuthVO;
import com.myweb.www.security.MemberVO;

public interface MemberService {

	// 회원가입
	int register(MemberVO mvo);

	int modify(MemberVO mvo);

	int modifyPwdEmpty(MemberVO mvo);

	int remove(String id);

	MemberVO memberDetail(String id);

	int getTotalCount(PagingVO pagingVO);

	int updatePw(String id, String password);

	int checkId(String id);

	int insert(String id, FileVO fvo);

	JsonNode getAccessToken(String code, String ok);

	JsonNode getUserInfo(JsonNode accesstoken, String provider);

	void kakaoLogout(String attribute);

	String kakaojoin(JsonNode profile, Model m);

	String kakaoLogin(JsonNode user, HttpSession ses, Model m);

	JsonNode getAccessToken(String code, String state, String provider);

	String naverjoin(JsonNode user, Model m);

	String naverLogin(JsonNode user, HttpSession ses, Model m);

	AuthVO getAuthList(String id);

	com.myweb.www.security.MemberDTO getMdto(String id);

	int heartCount(String id);

	CompanyDTO2 getCdto(String id);

	FileVO getFile(String id);

	int companyRegister(MemberVO mvo);

	FileVO getFilePno(long pno);

	void heartCancel(String id, long pno);

	void heartAdd(String id, long pno);

	CompanyVO getCvo(String id);

	int addCoordinates(String id, Coordinates coordinates); // 231207전경환 추가 위경도

	int reviewCount(String id);

}