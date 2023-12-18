package com.myweb.www.domain;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;


import com.myweb.www.security.MemberVO;

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
public class RequestDTO {
private RequestVO rvo;
private ReqFileVO flist;
private FileVO file_img;
private MemberVO mvo;

}
