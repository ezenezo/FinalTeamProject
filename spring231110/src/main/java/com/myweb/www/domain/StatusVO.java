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
public class StatusVO {
private long sno;
private String requestId;
private boolean requestOk;
private long requestNm;
private boolean quotationOk;
private long quotationNm;
private boolean paymentOk;


}
