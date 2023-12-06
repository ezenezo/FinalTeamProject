package com.myweb.www.service;

import java.util.HashMap;

import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.JsonNode;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.security.MemberVO;

public interface MemberService {
   
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

   JsonNode getAccessToken(String code);

   JsonNode getUserInfo(JsonNode accesstoken);

   void kakaoLogout(String attribute);

   ModelAndView kakaojoin(JsonNode profile);

   ModelAndView kakaoLogin(JsonNode profile);

   
   
}