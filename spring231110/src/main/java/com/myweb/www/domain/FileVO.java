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
public class FileVO {
<<<<<<< HEAD
	private String uuid; 
	private String saveDir;
	private String fileName;
	private int fileType;
	private long depBno;
	private long totalBno;
	private String carNo;
	private long empNo;
	private long fileSize;
	private String regAt;
}
=======
	   private String uuid; 
	   private String saveDir;
	   private String fileName;
	   private long fileSize;
	   private String regAt;
	   private int fileType;
	   private String id;//프로필 사진 받는 용도
	   private long pno;//포폴사진 받는 용도
	   private long rno;//리뷰사진 받는 용도
	}
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
