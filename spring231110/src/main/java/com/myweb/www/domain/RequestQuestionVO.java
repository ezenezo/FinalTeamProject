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
<<<<<<<< HEAD:spring231110/src/main/java/com/myweb/www/domain/RequestQuestionVO.java
public class RequestQuestionVO {
	private long requestQuestionId;
	private String subject;
	private String questionType;
	private String region;

========
public class ApprovalVO {
	private long appr_no; //승인번호
	private long vaca_no; //휴가번호
	private String car_no; //차량번호
	private long emp_no; //사번
	private boolean true_or_not; //확인 유무
>>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5:spring231110/src/main/java/com/myweb/www/domain/ApprovalVO.java
}
