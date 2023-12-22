package com.myweb.www.domain;

import java.util.List;

import com.myweb.www.security.MemberVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CompanyDTO2 {
	private CompanyVO cvo;
	private MemberVO mvo;
	private List<PortfolioDTO> pdtoList;// pvo + mainImg 리스트
	private List<ReviewDTO> rdtoList;
}
