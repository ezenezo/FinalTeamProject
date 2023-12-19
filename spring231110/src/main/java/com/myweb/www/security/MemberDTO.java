package com.myweb.www.security;

import lombok.Setter;
import lombok.ToString;

import java.util.List;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

	private MemberVO mvo;
	private CompanyVO cvo;
	private List<PortfolioDTO> pdtoList;
}

