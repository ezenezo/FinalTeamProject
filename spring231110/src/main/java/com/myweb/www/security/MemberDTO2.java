package com.myweb.www.security;

import java.util.List;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PortfolioDTO;

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
public class MemberDTO2 {
	private MemberVO mvo;
	private CompanyVO cvo;
	private FileVO fvo;
}
