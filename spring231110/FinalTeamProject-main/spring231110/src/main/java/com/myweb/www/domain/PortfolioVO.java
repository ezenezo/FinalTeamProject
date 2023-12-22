package com.myweb.www.domain;

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
public class PortfolioVO {
	private long pno; // 포폴 번호
	private String id; // 업체 아이디
	private String userNm;//업체명
	private String title; // 제목
	private String introduction;// 소개글
	private String ragDate;// 등록일
	private String modDate;// 등록일
	private String homeType;// 주거형태
	private String roomCnt;// 방개수
	private String familyType;// 가족형태
	private int homeSize;// 평수
	private int likeQty;// 좋아요수
	private int readQty;// 조회수
	private String homeStyle;//스타일
	private boolean likeCheck;// 로그인한 아이디가 한 게시물 좋아요한 유무

}
