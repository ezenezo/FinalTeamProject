package com.myweb.www.security;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
public class MemberVO{
   private String id; //아이디
   private String pw; //비밀번호
   private String email; //이메일
   private String userNm; //회원명
   private String provider; //(naver, kakao, ...) //삭제
   private boolean type; //업체 여부

   private List<AuthVO> authVOList;
   
}