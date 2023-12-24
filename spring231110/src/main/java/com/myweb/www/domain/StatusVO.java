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
private long requestNmStatus;

private long quotationNm;
private boolean paymentOk;
private boolean completed;
private boolean requestCancel;
private boolean quotation_cancel;
private boolean refund;
private String companyName;


}
