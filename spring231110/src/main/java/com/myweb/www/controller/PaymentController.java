package com.myweb.www.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myweb.www.domain.CouponVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PaymentVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.domain.QuotationVO;
import com.myweb.www.domain.RefundVO;
import com.myweb.www.security.MemberVO;
import com.myweb.www.service.MemberService;
import com.myweb.www.service.PaymentService;
import com.myweb.www.service.PortfolioService;
import com.myweb.www.service.QuotationService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/payment/*")
public class PaymentController {

   @Inject
   private QuotationService qsv;
   @Inject
   private MemberService msv;
   @Inject
   private PaymentService psv;
   @Inject
   private PortfolioService pfsv;

   // 쿠폰 페이지
   @RequestMapping("/couponSelect")
   public void coupon(@RequestParam("id") String id, @RequestParam("pno") long pno,
         @RequestParam("quotationNm") long quotationNm, Model m) {
      List<CouponVO> list = psv.getCouponList(id);
      if (list.size() == 0) {
         m.addAttribute("nothing", true);
      } else {
         m.addAttribute("coupon", list);
      }
      PortfolioVO pvo = pfsv.getPortfolio(pno);
      FileVO fvo = msv.getFilePno(pno);
      PortfolioDTO pdto = new PortfolioDTO(pvo, fvo);
      m.addAttribute("pdto", pdto);
      QuotationVO qvo = qsv.getQuotation(quotationNm);
      m.addAttribute("qvo", qvo);
   }

   // 결제했는지 확인
   @RequestMapping("/checkPay")
   public String checkPay(@RequestParam("pno") long pno, @RequestParam("qno") int qno, @RequestParam("id") String id,
         Model m, RedirectAttributes re) {
      List<PaymentVO> payvo = psv.getPaymentNoRefund(qno, id);
      if (payvo.size() != 0) { //결제한 적이 한 번이라도 있다면
         for (int i = 0; i < payvo.size(); i++) {
            if (!payvo.get(i).isRefund()) {
               m.addAttribute("msg", "이미 결제가 완료되었습니다.");
               m.addAttribute("url", "/common/main");
               return "/alert";
            }
         }
      }
      return "redirect:/payment/orderResult?cno=-1&pno=" + pno + "&qno=" + qno+"&id="+id;
   }

   // 결제 전 정보 확인 페이지
   @RequestMapping("/orderResult")
   public void orderResult(@RequestParam("cno") int cno, @RequestParam("pno") long pno, @RequestParam("qno") int qno,
         @RequestParam("id") String id, Model m) {
      // 견적서
      QuotationVO qvo = qsv.getQuotation(qno);
      m.addAttribute("qvo", qvo);
      // 유저정보
      MemberVO mvo = msv.memberDetail(qvo.getRequestId());
      m.addAttribute("mvo", mvo);
      // 포트폴리오
      PortfolioVO pvo = pfsv.getPortfolio(pno);
      FileVO fvo = msv.getFilePno(pno);
      PortfolioDTO pdto = new PortfolioDTO(pvo, fvo);
      m.addAttribute("pdto", pdto);
      // 쿠폰
      CouponVO cvo = psv.getCoupon(cno);
      if (cno == -1) {
         cvo = new CouponVO(-1, mvo.getId(), "쿠폰", 0, 0, false, null, 0);
      }
      m.addAttribute("cvo", cvo);
      //파일
      FileVO pfvo = msv.getFile(mvo.getId());
      m.addAttribute("pfvo", pfvo);
   }

   // 결제정보 저장
   @PostMapping(value = "/insertPay", consumes = "application/json")
   public ResponseEntity<String> insertPay(@RequestBody PaymentVO pvo, RedirectAttributes re) {
      // 결제정보 payment에 저장, 쿠폰 사용 처리
      int isOk = psv.insert(pvo);
      return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
            : new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
   }

   // 결제 완료
   @GetMapping("/alert")
   public String alert(@RequestParam("id") String id, Model m) {
      m.addAttribute("msg", "결제가 완료되었습니다.");
      m.addAttribute("url", "/member/myPage?id=" + id);
      return "/alert";
   }

   // 쿠폰
   @GetMapping("/coupon")
   public void coupon() {
   }

   // 쿠폰 리스트
   @RequestMapping(value = "/couponList", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<List<CouponVO>> couponList(@RequestParam("id") String id, Model m) {
      List<CouponVO> list = psv.getCouponList(id);
      return new ResponseEntity<List<CouponVO>>(list, HttpStatus.OK);
   }

   // 쿠폰 추가
   @PostMapping(value = "/insertCoupon", consumes = "application/json")
   public ResponseEntity<String> insertCoupon(@RequestBody CouponVO cvo, @RequestParam("id") String id) {
      // 결제정보 payment에 저장, 쿠폰 사용 처리
      cvo = psv.getCoupon(cvo.getCouponNum());
      CouponVO checkcvo = psv.getCoupon(cvo.getName(), id);
      if (checkcvo == null) {
         cvo.setId(id);
         int isOk = psv.addCoupon(cvo);
         return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
               : new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      // 받은 적 있는 쿠폰
      return new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
   }

   // 환불요청
   @PostMapping("/refund")
   public String refund(@RequestBody RefundVO rvo, @RequestParam("id") String id, Model m) throws IOException {
      PaymentVO pvo = psv.getPayment(rvo.getMerchantUid());
      psv.refund(psv.getAccessToken(), pvo);
      return "/common/main";
   }

   // 결제정보 가져오기
   @RequestMapping(value = "/getPayment", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<PaymentVO> getPayment(@RequestParam("quotationNm") String quotationNm, Model m) {
      PaymentVO pvo = psv.getPaymentByQno(quotationNm);
      PaymentVO ppvo = new PaymentVO();
      return pvo != null ? new ResponseEntity<PaymentVO>(pvo, HttpStatus.OK)
            : new ResponseEntity<PaymentVO>(ppvo, HttpStatus.INTERNAL_SERVER_ERROR);
   }

}