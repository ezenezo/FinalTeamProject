package com.myweb.www.security;

import java.util.List;

import com.myweb.www.domain.ClubVO;
import com.myweb.www.domain.DepartmentVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
<<<<<<< HEAD
	private List<MemberVO> mlist;
	private List<DepartmentVO> dlist;
	private List<ClubVO> clist;
=======
	private MemberVO mvo;
	private String kakaoId;
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
}
