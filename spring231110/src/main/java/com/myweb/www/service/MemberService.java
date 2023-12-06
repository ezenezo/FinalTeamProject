package com.myweb.www.service;

import java.util.List;

import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.security.AuthMember;
import com.myweb.www.security.MemberVO;

public interface MemberService {
<<<<<<< HEAD

	int register(MemberVO mvo);

	boolean updateLastLogin(String authEmail);

	List<MemberVO> getList(PagingVO pagingVO);

	AuthMember detail(String email);
	
	int modify(MemberVO mvo);
	
	int modifyPwdEmpty(MemberVO mvo);
	
	int remove(String email);

	MemberVO memberDetail(String id);

	int getTotalCount(PagingVO pagingVO);

	MemberVO getMemberDetail(String id);

	int updatePw(String id, String password);

	int checkId(String id);

	int insert(long empNo, FileVO fvo);

	long getMaxEmpNo();
	
=======
	
	//회원가입
	int register(MemberVO mvo);
	
	int modify(MemberVO mvo);
	
	int modifyPwdEmpty(MemberVO mvo);
	
	int remove(String email);

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

	FileVO getFile(String id);

	int companyRegister(MemberVO mvo);

>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
}
