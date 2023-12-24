package com.myweb.www.domain;




import java.util.Date;

import java.util.Locale.Category;

import javax.xml.crypto.Data;

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
public class RequestVO {
	//요청서 칼럼
	private long requestNm;
	private String requestId;

	private Date reqAt;

	/*
	 * //요청서 질문리스트 테이블 칼럼 private long requestQuestion; private String subject;
	 * private String questionType; private String region;
	 * 
	 * //요청서 답변 목록 private String requestAnswerId; private String requestAnswer;
	 */
	private String form;
	private String categoryType;
	private String extent;
	private String status;
	private String address;
	private int zoneCode;
	private String detailAddress;
	private String extraAddress;
	private float squareFootage;
	private float squareMeter;
	private String wishBudget;
	private String requestOp;
	private int keynumCom;
	private boolean checked;
	private boolean okTypeNo;
	private String cancellationReason;
	private boolean okTypeYes;
	
	private long pno;
	

}
