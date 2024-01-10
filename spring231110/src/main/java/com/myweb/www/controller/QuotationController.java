package com.myweb.www.controller;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.myweb.www.domain.QuotationDTO;
import com.myweb.www.domain.QuotationVO;

import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.security.MemberVO;

import com.myweb.www.service.QuotationService;
import com.myweb.www.service.RequestService;
import com.myweb.www.service.StatusService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/quotation/*")
@Controller
public class QuotationController {
   @Inject
   private QuotationService qsv;
   @Inject
   private StatusService ssv;
   
   @Inject
   private RequestService rsv;

   @GetMapping("/list")
   public void request(Model model, @RequestParam("id") String id, HttpServletRequest request) {

      int keynum = rsv.getKeyNum(id);

      List<RequestVO> rvo = qsv.getList(keynum);
   
      model.addAttribute("list", qsv.getList(keynum));
      model.addAttribute("list_read", qsv.getList_read(keynum));
   
   }

   @GetMapping("/quotation")
   public String quotation(Model model, @RequestParam("requestNm") long reNm, HttpServletRequest request) {
   
      model.addAttribute("list", qsv.setQutation(reNm));
        
       return "/quotation/quotation";
   }
   
   @GetMapping("/modify")
   public String quotation_modify(Model model, @RequestParam("requestNm") long reNm, HttpServletRequest request) {
       model.addAttribute("qvo", qsv.setQutation_modify(reNm));
   
       return "/quotation/quotation_mod";
   }
   
   
   
   @GetMapping("/quotation_user")
   public String quotation_user(Model model, @RequestParam("quotationNm") long quoNm, HttpServletRequest request) {
      

      model.addAttribute("list", qsv.setQutation_user(quoNm));
       MemberVO mvo = qsv.getCompany_name(quoNm);
       
       String userNm = mvo.getUserNm();
       boolean payment = ssv.payment(quoNm);
       boolean completed = ssv.completed_user(quoNm);
          model.addAttribute("pay", payment );

         model.addAttribute("completed", completed );
      model.addAttribute("company", userNm );
       return "/quotation/quotation_user";
   }

   @PutMapping(value = "/quotation_user_cancle", produces = MediaType.APPLICATION_JSON_VALUE)
   public ModelAndView quotationNm_get(@RequestBody QuotationVO qvo) {
      qsv.cancle_ok(qvo.getQuotationNm());
      
      ssv.quotation_status_cancel(qvo.getQuotationNm());
       ModelAndView modelAndView = new ModelAndView("/quotation/list_user"); 
       modelAndView.addObject("quotationNm", qvo.getQuotationNm()); 

       return modelAndView;
   }


   @GetMapping("/list_user")
   public void request_user(Model model,@RequestParam("id")String id,HttpServletRequest request)  {
      List<QuotationDTO> rvo = qsv.getList_user(id);
      List<QuotationDTO> qvo = ssv.completed_review(id);
      
       model.addAttribute("list", rvo);
       model.addAttribute("list_com", qvo);

   }
   
   @GetMapping("/completed")
   public String completed(Model model, @RequestParam("requestNm")long requestNm, @RequestParam("keynumCom") String keynum) {

   
ssv.completed(requestNm);
return "redirect:/quotation/list?id=" + keynum;

   }
   
  

   
   @GetMapping("/list_controller")
   public String request(Model model, @RequestParam("id")  int keynum, HttpServletRequest request) {

   

      List<RequestVO> rvo = qsv.getList(keynum);
      
      model.addAttribute("list", qsv.getList(keynum));
      model.addAttribute("list_read", qsv.getList_read(keynum));
   
       return "/quotation/list";
   }
   /*실시간 리스트 비동기용
    * @GetMapping(value = "/left/{authEmail}", produces =
    * MediaType.APPLICATION_JSON_VALUE) public ResponseEntity<List<RequestVO>>
    * req_left(@PathVariable("authEmail") String id, RedirectAttributes reAttr,
    * Model model) { log.info("받은견적 리스트 아이디 들어옴" + id);
    * 
    * List<RequestVO> quotationList = qsv.getList(id);
    * log.info("quo왼쪽리스트"+quotationList);
    * 
    * return new ResponseEntity<List<RequestVO>>(quotationList, HttpStatus.OK); }
    */
   @GetMapping(value = "/left/read/{authEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<List<RequestVO>> req_left_read(@PathVariable("authEmail") String id, RedirectAttributes reAttr, Model model) {
   
       int keynum = rsv.getKeyNum(id);
       List<RequestVO> quotationList = qsv.getList_read(keynum);
    
       return new ResponseEntity<List<RequestVO>>(quotationList, HttpStatus.OK);
   }

   @PostMapping(value = "/cancel/{reqNm}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> request_reqNm_cancel(@PathVariable("reqNm") long reqNm, RedirectAttributes reAttr) {
      int alarm_count = qsv.request_cancel(reqNm);
      
      ssv.request_status_cancel(reqNm);

      return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
            : new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
   }

   @PostMapping(value = "/alarm/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> request_alarm(@PathVariable("userId") String userId, RedirectAttributes reAttr) {
      
      int keynum = rsv.getKeyNum(userId);
      int alarm_count = qsv.request_alarm(keynum);
      reAttr.addFlashAttribute("alarm_count", alarm_count);

      return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK):new ResponseEntity<>(HttpStatus.NO_CONTENT);
         
   }

   @PostMapping(value = "/alarm_user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<String> request_alarm_user(@PathVariable("userId") String userId, RedirectAttributes reAttr) {

      //log.info("사용자확인하기"+userId);
      int alarm_count = qsv.request_alarm_user(userId);
      //log.info("사용자 카운트 하기"+alarm_count);


      reAttr.addFlashAttribute("alarm_count", alarm_count);
      return alarm_count > 0 ? new ResponseEntity<String>("1", HttpStatus.OK):new ResponseEntity<>(HttpStatus.NO_CONTENT);
         
   }

   @GetMapping(value = "/{requestNm}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<RequestDTO> quatation(@PathVariable("requestNm") long requestNm,
         RedirectAttributes reAttr) {
   RequestDTO rlist = qsv.getRequest_list(requestNm); 
      return new ResponseEntity<RequestDTO>(rlist, HttpStatus.OK);
   }

   @GetMapping(value = "/user/{qutationNm}", produces = MediaType.APPLICATION_JSON_VALUE)
   public ResponseEntity<List<RequestVO>> quatation_user(@PathVariable("qutationNm") long qutationNm,
         RedirectAttributes reAttr, Model model) {
      List<RequestVO> rlist = qsv.getRequest_list_user(qutationNm);
      return new ResponseEntity<List<RequestVO>>(rlist, HttpStatus.OK);

   }

   @PostMapping("/req_ok")
   public String quatation_submit(@ModelAttribute QuotationVO qvo, Model model) {

      qsv.quatation_submit(qvo);
      long quotationNm = qsv.getQuotationNm(qvo.getKeynum());
      qvo.setQuotationNm(quotationNm);

      ssv.quotation_status(qvo);
      ssv.quotation_status_ok(qvo); 

      model.addAttribute("keynum", qvo.getKeynum());
      return "redirect:/quotation/list_controller?id={keynum}";
   }

   
   @PostMapping("/modify_submit")
   public String modify_submit(QuotationVO qvo, Model model) {

      qsv.quatation_modify(qvo);

      model.addAttribute("keynum", qvo.getKeynum());
      return "redirect:/quotation/list_controller?id={keynum}";
   }

}