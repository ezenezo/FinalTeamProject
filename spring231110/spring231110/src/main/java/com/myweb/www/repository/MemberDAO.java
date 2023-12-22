package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.userdetails.User;

import com.myweb.www.domain.Coordinates;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.security.AuthVO;
import com.myweb.www.security.MemberVO;

public interface MemberDAO {

	int insertMember(MemberVO mvo);

	int insertAuthInit(String id);

	MemberVO selectEmail(String username);

	List<AuthVO> selectAuths(String username);

	MemberVO selectOne(String id);

	int modify(MemberVO mvo);

	int modifyPwdEmpty(MemberVO mvo);

	int remove(String email);

	void removeAuth(String email);

	int getTotalCount(PagingVO pagingVO);

	int getMemberNo(String id);

	String selectDepCd(String id);

	String selecClubCd(String id);

	int updatePw(@Param("id") String id, @Param("pw") String password);

	String checkEmail(String email);

	MemberVO getUserKakao(String email);

	MemberVO kakaoLogin(String kakaoEmail);

	String checkId(String id);

	AuthVO getAuthList(String id);

	int companyRegister(MemberVO mvo);

	void insertAuthCom(String id);

	List<MemberVO> selectAllMemberforChat();

	String selectCompanyName(String id);



	int usePoint(@Param("point") int point, @Param("id") String id);

	int updatePoint(@Param("round") int round, @Param("id") String id);

	int addCoordinates(@Param("id") String id, @Param("coordinates") Coordinates coordinates ); //231207전경환추가

}