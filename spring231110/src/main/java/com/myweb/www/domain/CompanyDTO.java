package com.myweb.www.domain;

import java.util.List;

import com.myweb.www.security.MemberVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
public class CompanyDTO {
	
//	private CompanyVO companyvo;
//	private MemberVO membervo;
//	private List<FileVO> filelist;
	
	private int keynum; //회사키번호/////////////////////company table
	private float rateAverage; //별점평균
	private int reviewCount; //리뷰수 
	private String introduction; //소개 글
	private String id; //아이디
	private float lat; //위도
	private float lng; //경도
	private String phone; //연락처
	private String profileQuotepage;// 프로필및견적페이지
	
	private String userNm;
	private String address;
	private String uuid;
	private String saveDir;
	private String fileName;
	private String fileSize;
	private int filetype;
	
}
