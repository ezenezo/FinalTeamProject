package com.myweb.www.service;

import java.io.IOException;
import java.util.List;

import com.myweb.www.domain.CouponVO;
import com.myweb.www.domain.PaymentVO;

public interface PaymentService {

	List<CouponVO> getCouponList(String id);

	CouponVO getCoupon(int cno);

	int insert(PaymentVO pvo);

	int addCoupon(CouponVO cvo);

	CouponVO getCoupon(String name, String id);

	PaymentVO getPayment(String merchant_uid);
	
	String getAccessToken() throws IOException;

	void refund(String access_token, PaymentVO pvo) throws IOException;

}
