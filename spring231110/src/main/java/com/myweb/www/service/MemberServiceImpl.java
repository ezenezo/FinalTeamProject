package com.myweb.www.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.myweb.www.domain.ClubVO;
import com.myweb.www.domain.DepartmentVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.repository.ClubDAO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.security.MemberDTO;
import com.myweb.www.security.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {
   @Inject
   private MemberDAO mdao;

   @Inject
   private FileDAO fdao;

   @Inject
   private ClubDAO cdao;

   @Transactional
   @Override
   public int register(MemberVO mvo) {
      int isOk = mdao.insertMember(mvo);
      return mdao.insertAuthInit(mvo.getId());
   }

   @Override
   public int modify(MemberVO mvo) {
      // TODO Auto-generated method stub
      return mdao.modify(mvo);
   }

   @Override
   public int modifyPwdEmpty(MemberVO mvo) {
      // TODO Auto-generated method stub
      return mdao.modifyPwdEmpty(mvo);
   }

   @Override
   public int remove(String email) {
      mdao.removeAuth(email);
      return mdao.remove(email);
   }

   @Override
   public MemberVO memberDetail(String id) {
      return mdao.selectOne(id);
   }

   @Override
   public int getTotalCount(PagingVO pagingVO) {
      // TODO Auto-generated method stub
      return mdao.getTotalCount(pagingVO);
   }

   @Override
   public int updatePw(String id, String password) {
      return mdao.updatePw(id, password);
   }

   @Override
   public int checkId(String id) {
      String registerId = mdao.checkId(id);
      if (registerId == null) {
         return 1;
      } else {
         return 0;
      }
   }

//   @Override
//   public int insert(String id, FileVO fvo) {
//      log.info(fvo + "");
//      if (fvo.getFileType() == 0) {
//         return 1;
//      }
//      return fdao.insertProfile(id, fvo);
//   }

   @Override
   public JsonNode getAccessToken(String code) {
      JsonNode access = null;
      String refreshToken = "";
      String reqUrl = "https://kauth.kakao.com/oauth/token";

      try {
         URL url = new URL(reqUrl);
         HttpURLConnection conn = (HttpURLConnection) url.openConnection();

         // 필수 헤더 세팅
         conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
         conn.setDoOutput(true); // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.

         BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
         StringBuilder sb = new StringBuilder();

         // 필수 쿼리 파라미터 세팅
         sb.append("grant_type=authorization_code");
         sb.append("&client_id=e7f7342b45a67c5286814656c21b3bdd");
         sb.append("&redirect_uri=http://localhost:8088/member/login");
         sb.append("&code=").append(code);

         bw.write(sb.toString());
         bw.flush();

         int responseCode = conn.getResponseCode();
         log.info("[KakaoApi.getAccessToken] responseCode = {}", responseCode);

         BufferedReader br;
         if (responseCode >= 200 && responseCode <= 300) {
            br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
         } else {
            br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
         }

         String line = "";
         StringBuilder responseSb = new StringBuilder();
         while ((line = br.readLine()) != null) {
            responseSb.append(line);
         }
         String result = responseSb.toString();
         log.info("responseBody = {}", result);

         JsonParser parser = new JsonParser();
         JsonElement element = (JsonElement) parser.parse(result);
         //accessToken = element.getAsJsonObject().get("access_token").getAsString();
         JsonObject accessToken = (JsonObject) element.getAsJsonObject().get("access_token");
         ObjectMapper mapper = new ObjectMapper();
         access = mapper.valueToTree(accessToken);
         refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

         br.close();
         bw.close();
      } catch (Exception e) {
         e.printStackTrace();
      }
      return access;
   }
   
   @Override
   public JsonNode getUserInfo (JsonNode access_Token) {
       
       //    요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
       HashMap<String, Object> userInfo = new HashMap<>();
       String reqURL = "https://kapi.kakao.com/v2/user/me";
       try {
           URL url = new URL(reqURL);
           HttpURLConnection conn = (HttpURLConnection) url.openConnection();
           conn.setRequestMethod("POST");
           
           //    요청에 필요한 Header에 포함될 내용
           conn.setRequestProperty("Authorization", "Bearer " + access_Token);
           
           int responseCode = conn.getResponseCode();
           System.out.println("responseCode : " + responseCode);
           
           BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
           
           String line = "";
           String result = "";
           
           while ((line = br.readLine()) != null) {
               result += line;
           }
           System.out.println("response body : " + result);
           
           JsonParser parser = new JsonParser();
           JsonElement element = parser.parse(result);
           
           JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
           JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
           
           String email = kakao_account.getAsJsonObject().get("email").getAsString();
           String id = result.substring(result.indexOf(":"),result.indexOf(","));
           
           userInfo.put("email", email);
           userInfo.put("id", id);
           
           
           
       } catch (IOException e) {
           e.printStackTrace();
       }
       
       ObjectMapper mapper = new ObjectMapper();
       JsonNode user = mapper.valueToTree(userInfo);
       
       return user;
   }
   
   @Override
   public void kakaoLogout(String access_Token) {
       String reqURL = "https://kapi.kakao.com/v1/user/logout";
       try {
           URL url = new URL(reqURL);
           HttpURLConnection conn = (HttpURLConnection) url.openConnection();
           conn.setRequestMethod("POST");
           conn.setRequestProperty("Authorization", "Bearer " + access_Token);
           
           int responseCode = conn.getResponseCode();
           System.out.println("responseCode : " + responseCode);
           
           BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
           
           String result = "";
           String line = "";
           
           while ((line = br.readLine()) != null) {
               result += line;
           }
           System.out.println(result);
       } catch (IOException e) {
           e.printStackTrace();
       }
   }

   @Override
   public ModelAndView kakaojoin(JsonNode profile) {
      ModelAndView mav = new ModelAndView();
      
      String kakaoId = profile.get("id").asText(); //카카오 서버 아이디 저장
      
      mav.addObject("kakaoId", kakaoId);
      mav.setViewName("member/register");
      
      return mav;
   }

   @Override
   public ModelAndView kakaoLogin(JsonNode profile) {
      ModelAndView mav = new ModelAndView();
      
      String kakaoId = profile.get("id").asText();
      
      JsonNode kakaoAccount = profile.get("kakao_account");
      JsonNode kakaoProfile = kakaoAccount.get("profile");
      
      //로그인 후 회원정보 db에 저장
      MemberDTO member = mdao.kakaoLogin(kakaoId);
      
      HttpSession ses = null;
      ses.setAttribute("loginId", member.getMvo().getId());
      mav.addObject("kakaoId", kakaoId);
      mav.addObject("loginMember", member);
      mav.addObject("kakaoProfile", kakaoProfile);
      mav.setViewName("index");
      
      return mav;
   }

@Override
public int insert(String id, FileVO fvo) {
	// TODO Auto-generated method stub
	return 0;
}


}