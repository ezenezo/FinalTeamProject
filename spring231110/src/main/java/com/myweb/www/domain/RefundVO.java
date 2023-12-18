package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RefundVO {
	private String merchantUid; //주문번호
	private long amount; //환불금액
	private String reason; //환불사유
	private String holder; //예금주
	private String bank; //은행코드
	private String account; //계좌
}
