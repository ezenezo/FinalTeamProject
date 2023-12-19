package com.myweb.www.domain;

import lombok.Setter;
import lombok.ToString;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RequestQuestionVO {
	private long requestQuestionId;
	private String subject;
	private String questionType;
	private String region;

}
