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
public class ReqFileVO {
	   private String uuid; 
	   private String saveDir;
	   private String fileName;
	   private long fileSize;
	   private String regAt;
	   private int fileType;
	   private String requestId;
	   private long requestNm;
	   
	   
}
