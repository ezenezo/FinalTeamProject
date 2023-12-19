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
public class HeartVO {

	private int cmtNo;//댓글 좋아요용
	private String id;// 아이디
	private int pno;//포폴 좋아요용
	private int rno;//리뷰 좋아요용
}
