package com.myweb.www.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.net.ssl.HttpsURLConnection;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.myweb.www.domain.CouponVO;
import com.myweb.www.domain.PaymentVO;
import com.myweb.www.domain.QuotationVO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.repository.PaymentDAO;
import com.myweb.www.repository.QuotationDAO;
import com.myweb.www.repository.StatusDAO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService {

	@Inject
	private PaymentDAO pdao;
	@Inject
	private MemberDAO mdao;
	@Inject
	private QuotationDAO qdao;
	@Inject
	private StatusDAO sdao;

	@Override
	public List<CouponVO> getCouponList(String id) {
		return pdao.getCouponList(id);
	}

	@Override
	public CouponVO getCoupon(int cno) {
		return pdao.getCoupon(cno);
	}

	@Override
	@Transactional
	public int insert(PaymentVO pvo) {
		int isOk = 1;
		// 지불내역 추가
		isOk *= pdao.insert(pvo);
		// 쿠폰사용
		if (pvo.getCouponNum() >= 0) {
			isOk *= pdao.useCoupon(pvo.getCouponNum());
		}
		// 포인트 업데이트
		isOk *= mdao.usePoint(pvo.getPoint(), pvo.getUserId());
		// 포인트 적립
		isOk *= mdao.updatePoint(Math.round(pvo.getAmount() / 100), pvo.getUserId());
		//결제로 상태 처리
		isOk *= sdao.payStatus(pvo.getQuotationNm());
		return isOk;
	}

	@Override
	public int addCoupon(CouponVO cvo) {
		return pdao.addCoupon(cvo);
	}

	@Override
	public CouponVO getCoupon(String name, String id) {
		return pdao.getSameCoupon(name, id);
	}

	@Override
	public PaymentVO getPayment(String merchant_uid) {
		return pdao.getPayment(merchant_uid);
	}

	@Override
	// 액세스 토큰
	public String getAccessToken() throws IOException {
		URL url = new URL("https://api.iamport.kr/users/getToken");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		conn.setDoOutput(true);

		JSONObject obj = new JSONObject();
		obj.put("imp_key", "0168753313622428");
		obj.put("imp_secret", "nuGuGZA0gArx8mSJry60lvT8KhRMzesfkCYTJAkdgteudtWeLI6S4JWpfxLYuQiBxCUl0EHuqLWRTKoL");

		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		bw.write(obj.toString());
		bw.flush();
		bw.close();
		
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		Gson gson = new Gson();
		String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
		String accessToken = gson.fromJson(response, Map.class).get("access_token").toString();
		br.close();
		
		conn.disconnect();
		
		log.info("accessToken:"+accessToken);
		return accessToken;
	}

	@Override
	@Transactional
	public void refund(String access_token, PaymentVO pvo) throws IOException {
		URL url = new URL("https://api.iamport.kr/payments/cancel");
		HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
		
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setRequestProperty("Authorization", access_token);
        conn.setDoOutput(true);
        
        JsonObject json = new JsonObject();
        json.addProperty("merchant_uid", pvo.getMerchantUid());
        json.addProperty("reason", "Test");
        
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        bw.write(json.toString());
        bw.flush();
        bw.close();
        
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        br.close();
        conn.disconnect();
        
        pdao.refund(pvo.getMerchantUid());
        sdao.refundStatus(pvo.getQuotationNm());
	}

	@Override
	public PaymentVO getPaymentByQno(String quotationNm) {
		return pdao.getPaymentByQno(quotationNm);
	}

	@Override
	public List<PaymentVO> getPaymentNoRefund(int qno, String id) {
		return pdao.getPaymentNoRefund(qno, id);
	}

}
