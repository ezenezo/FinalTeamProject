package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.CouponVO;
import com.myweb.www.domain.PaymentVO;

public interface PaymentDAO {

	List<CouponVO> getCouponList(String id);

	CouponVO getCoupon(int cno);

	int insert(PaymentVO pvo);

	int useCoupon(int couponNum);

	int addCoupon(CouponVO cvo);

	CouponVO getSameCoupon(@Param("name") String name, @Param("id") String id);

	PaymentVO getPayment(String merchant_uid);

	void refund(String merchantUid);

	PaymentVO getPaymentByQno(String quotationNm);

	List<PaymentVO> getPaymentNoRefund(@Param("qno")int qno, @Param("id")String id);
}
