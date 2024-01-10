package com.myweb.www.domain;

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
public class QuotationStatusDTO {
	private long quotationNm;//견적서고유번호
	private boolean approveOk;//승인여부
	private long requestNm; // 요청서 고유번호
	private String requestOp;//업체가 원하는 요청사항
	private int keynum;//회사키번호
	private String form;//주거형태, 상업형태
	private String categoryType; // 형태에 따른 유형(주거형태-아파트, 상업형태-카페)
	private String extent;// 범위(전체로 할건지, 부분적으로 할건지)
	private String status;// 공사 상태(살고 있는지, 아닌지)
	private String address;//주소
	private int zoneCode;//우편변호
	private String detailAddress;//상세주소
	private String extraAddress;//참고사항
	private float squareFootage;//평수
	private float squareMeter;//제곱미터
	private long budget;//예산(최종안)
	private String requestId;//요청자 아이디
	private Data regAt;//견적서 둥록날짜
	private boolean checked;
	private boolean okTypeNo;//취소

	private boolean okTypeYes;// 승인함
	private String pno;
	private long sno;
private boolean requestOk;
	private long requestNmStatus;
	private boolean paymentOk;
	private boolean completed;
	private boolean requestCancel;
	private boolean quotationCancel;
	private boolean refund;
	private String companyName;

}
