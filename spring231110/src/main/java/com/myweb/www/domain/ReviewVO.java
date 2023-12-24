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
	private long rno;//o
	private String id;// 글쓴이(일반유저)
	private String comId;// 업체 아이디
	private String comName;//업체 이름
	private String title; //o
	private int rate;// 별점 //o
	private String content; //o
	private String regDate;
	private String modDate;

}
