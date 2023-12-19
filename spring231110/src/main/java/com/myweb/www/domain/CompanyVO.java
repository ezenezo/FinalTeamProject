package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class CompanyVO {		
	private int key_num; //회사키번호 auto_increment
	private float rateAverage; //별점평균
	private int reviewCount; //리뷰 수
	private int portfolioCount; //포폴 수
	private String id; //아이디
	private float lat; //위도
	private float lng; //경도
	private String phone; //연락처
	private String profileQuotepage; //프로필 및 견적 페이지
}
