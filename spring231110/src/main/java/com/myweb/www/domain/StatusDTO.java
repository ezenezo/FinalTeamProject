package com.myweb.www.domain;


import java.text.SimpleDateFormat;
import java.util.Date;

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
public class StatusDTO {
	private long sno;
	private String requestId;
	private boolean requestOk;
	private long requestNmStatus;

	private long quotationNm;
	private boolean paymentOk;
	private boolean completed;
	private boolean requestCancel;
	private boolean quotationCancel;
	private int keynum;

	private String form;
	private String categoryType;
	private String extent;
	private String status;
	private String address;
	private int zoneCode;
	private String detailAddress;
	private String extraAddress;
	private float squareFootage;
	private float squareMeter;
	private String wishBudget;
	private String requestOp;
	private int keynumCom;
	private boolean checked;
	private boolean okTypeNo;
	private String cancellationReason;
	private boolean okTypeYes;
	private boolean refund;
	private Date reqAt;
	private String companyName; //회원명
	

    public String getFormattedReqAt() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(reqAt);
    }
	
}
