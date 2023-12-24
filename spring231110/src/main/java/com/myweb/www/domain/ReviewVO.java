package com.myweb.www.domain;

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
public class ReviewVO {
	private long rno;//
	private String id;// 글쓴이(일반유저)
	private String comId;// 업체 아이디
	private String comName;//업체 이름
	private String title; //
	private int rate;// 별점
	private String content;//
	private String regDate;
	private String modDate;
	private int likeQty;//좋아요수
	private boolean likeCheck;// 로그인한 아이디가 한 리뷰 좋아요한 유무
	private int readQty;//조회수
	private String homeSize;//평수
	private String form;//주거형태
	private String categoryType;//주거유형
	
}
