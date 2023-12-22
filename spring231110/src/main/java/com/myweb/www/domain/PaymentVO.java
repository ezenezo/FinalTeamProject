package com.myweb.www.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class PaymentVO {
	private String merchantUid; //고유번호
	private String pg; //결제PG사
	private String payMethod; //결제방식
	private long amount; //가격
	private String userName; //고객이름
	private String name; //테스트
	private String userId; //고객 아이디
	private int quotationNm; //견적서 번호
	private int couponNum; //쿠폰 번호
	private int point; //사용 포인트
	private boolean refund; //환불여부
	private Date regAt; //환불날짜
}
