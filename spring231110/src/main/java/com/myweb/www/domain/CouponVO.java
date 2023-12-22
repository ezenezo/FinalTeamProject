package com.myweb.www.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class CouponVO {
	private int couponNum; //쿠폰번호
	private String id; //유저 아이디
	private String name; //쿠폰이름
	private int percent; //할인율
	private int discount; //할인금
	private boolean used; //사용여부
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy년 MM월 dd일")
	private Date expire; //만료날짜
	private int maxAmount; //최대할인금액
}
