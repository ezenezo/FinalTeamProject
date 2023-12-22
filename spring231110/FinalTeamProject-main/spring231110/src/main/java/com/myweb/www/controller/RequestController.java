package com.myweb.www.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.crypto.Data;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import com.myweb.www.domain.ReqFileVO;
import com.myweb.www.domain.RequestDTO;
import com.myweb.www.domain.RequestQuestionVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.domain.StatusDTO;
import com.myweb.www.domain.StatusVO;
import com.myweb.www.handler.FileHandler_img;
import com.myweb.www.security.MemberVO;
import com.myweb.www.service.QuotationService;
import com.myweb.www.service.RequestService;
import com.myweb.www.service.StatusService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/req/*")
@Controller
public class RequestController {
	@Inject
	private RequestService rsv;
	@Inject
	private QuotationService qsv;
	@Inject
	private StatusService ssv;
	/*
	 * @GetMapping("/requestStart") public String requestStart() {
	 * log.info("requestStart 컨트롤러 들어옴"); return "/request/request_start"; }
	 */

	@GetMapping("/requestStart")
	public String requestStart(Model model, @RequestParam("pno") long pno, HttpServletRequest request) {
//	  log.info("pno들어오심"+pno);
		model.addAttribute("pno", pno);
	    return "/request/request_start";
	}
	

	@GetMapping("/main")
	public String main() {
		log.info("requestStart 컨트롤러 들어옴");
		return "/common/main";
	}

	@GetMapping("/request")
	public String request(Model model, @RequestParam("pno") long pno) {
		model.addAttribute("list", rsv.getList());
		model.addAttribute("pno", pno);
		return "/request/request_apply";
	}
	

	

	@GetMapping(value = "/mainCategory", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> mainCategory(Model model) {

		List<RequestQuestionVO> list = rsv.getList();

		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club(@PathVariable("checkedValue") String checkedValue) {
		

		List<RequestQuestionVO> list = new ArrayList<>();

		if (checkedValue.equals("주거공간")) {

			list = rsv.getList_secound();

			log.info("list_seocund" + list);
		} else {
			list = rsv.getList_third_2_1();

			log.info("list_seocund" + list);
		}
		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@GetMapping(value = "/req2/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club2(@PathVariable("checkedValue") String checkedValue) {
		log.info("String subject값:" + checkedValue);

		List<RequestQuestionVO> list = rsv.getList_third();
		log.info("list_seocund" + list);
		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}
	@GetMapping("/request_list")
	public String req_list(Model model, @RequestParam("id") String id) {
		List<StatusDTO> list = ssv.getStatus(id);
				model.addAttribute("list", list);
		
		
		/*
		 * ' MemberVO mvo = qsv.getCompany_name(quoNm);
		 * 
		 * String userNm = mvo.getUserNm(); model.addAttribute("company", userNm );
		 */
		log.info("id로 들어옴"+id);
		return "/request/request_list";
	}
	
	

	@GetMapping(value = "/req_list/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestVO>> req_list(@RequestParam("id") String id) {
	
		StatusVO svo = new StatusVO();
		 svo= ssv.getStatus_list(id);
		
		List<RequestVO> list = new ArrayList<>();

		return new ResponseEntity<List<RequestVO>>(list, HttpStatus.OK);
	}
	
	@GetMapping("/request_detil")
	public String req_detail(Model model, @RequestParam("requestNm") long requestNm) {
		
		
		RequestDTO rlist = qsv.getRequest_list_detail_user(requestNm);

			log.info("rlist"+rlist);
		model.addAttribute("qvo", rlist);
		return "/request/request_detail";
	}
	@GetMapping(value = "/req2_2/{checkedValue}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<RequestQuestionVO>> club3(@PathVariable("checkedValue") String checkedValue) {
		log.info("String subject값:" + checkedValue);

		List<RequestQuestionVO> list = rsv.getList_third_2();
		log.info("list_seocund" + list);

		return new ResponseEntity<List<RequestQuestionVO>>(list, HttpStatus.OK);
	}

	@PostMapping("/req/request_submit")
	public String request(RequestVO rvo, RedirectAttributes re,@RequestParam("requestId") String requestId
			) {

		log.info("아이디좀 들어와라" + rvo);
		int comkey =rsv.company_keynum(rvo.getPno());
		String comNm =rsv.company_name_get(rvo.getPno());
		rvo.setKeynumCom(comkey);
		rsv.insert(rvo);
		long reqNm =rvo.getRequestNm();
		log.info("reqnM들어오심"+reqNm);
		long rvo_status = rsv.getList_status(requestId);
		StatusVO svo = new StatusVO();
		
		svo.setRequestNmStatus(rvo_status);
		svo.setRequestId(requestId);
svo.setCompanyName(comNm);
		log.info("ssv들어오삼"+svo);
		ssv.insert_ssv(svo);
		ssv.quotation_status_setCompanyNm(svo);
		return "redirect:/rfc/file_img_start";

	}

	
	
	
	/*비동기용
	 * @PostMapping(value = "/store/{user_id}", consumes = "application/json",
	 * produces = MediaType.TEXT_PLAIN_VALUE) public ResponseEntity<String>
	 * receiveData(@RequestBody String data, @PathVariable("user_id") String userid)
	 * { // 여기서 'Data'는 클라이언트로부터 받은 데이터의 형태를 가진 클래스입니다. // HttpSession session =
	 * http.getSession();s
	 * 
	 * log.info("드디어 데이터 아이디 들어옴" + userid);
	 * 
	 * log.info("드디어 데이터" + data); String[] store_1_array = data.("store_1");
	 * JSONArray jsonArray = new JSONArray(data); String str =
	 * jsonArray.getString(0); log.info("드디어 데이11111터" + str); // String
	 * userIdFromSession = (String)session.getId(); // // log.info("db 보내기전 userid"
	 * + userIdFromSession);
	 * 
	 * requestAnswer rvo = new requestAnswer();
	 * 
	 * // rvo.setRequestId(userIdFromSession); long reqNm = rsv.selectNm(userid);
	 * rvo.setRequsetNm(reqNm); rvo.setRequestAnswer(str); rvo.setRequestId(userid);
	 * log.info("db 보내기전 rvo" + rvo);
	 * 
	 * rsv.insert_store(rvo); // 데이터 처리 로직 작성 // 예를 들어, 데이터를 데이터베이스에 저장하거나, 다른 서비스로
	 * 전달하는 등의 작업을 수행할 수 있습니다.
	 * 
	 * // JSON 형태로 응답
	 * 
	 * return new ResponseEntity<>("Success", HttpStatus.OK); }

	@PostMapping(value = "/store/{user_id}", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> receiveData_1(@RequestBody String data, @PathVariable("user_id") String userid, Model model) {
		// 여기서 'Data'는 클라이언트로부터 받은 데이터의 형태를 가진 클래스입니다.
		// HttpSession session = http.getSession();
		log.info("드디어 데이터 아이디 들어옴" + userid);

		log.info("드디어 데이터" + data);
		 JSONObject jsonObject = new JSONObject(data);

		    // 각 속성의 값을 가져옴
		    JSONArray store = jsonObject.getJSONArray("store");
		    JSONArray store_1 = jsonObject.getJSONArray("store_1");
		    JSONArray store_2_1 = jsonObject.getJSONArray("store_2_1");
		    JSONArray store_2_2 = jsonObject.getJSONArray("store_2_2");
		    JSONArray store_3 = jsonObject.getJSONArray("store_3");
		    JSONArray store_4 = jsonObject.getJSONArray("store_4");

		    // 값을 출력 (테스트용)
		    System.out.println("store: " + store.toString());
		    System.out.println("store_1: " + store_1.toString());
		    // 나머지 배열들도 비슷한 방식으로 처리하실 수 있습니다.
		    JSONArray jsonArray = new JSONArray(store);
	
		    JSONArray jsonArray_1 = new JSONArray(store_1);
		    JSONArray jsonArray_2_1 = new JSONArray(store_2_1);
		    JSONArray jsonArray_2_2 = new JSONArray(store_2_2);
		    JSONArray jsonArray_3 = new JSONArray(store_3);
		    JSONArray jsonArray_4 = new JSONArray(store_4);

		    
		    	String str = jsonArray.getString(0);
		    	String str_1 = jsonArray_1.getString(0);
		    	String str_2_1 = jsonArray_2_1.getString(0);
		    	String str_2_2 = jsonArray_2_2.getString(0);
		    	String str_3 = jsonArray_3.getString(0);
		    	String str_3_1 = jsonArray_3.getString(1);
		    	String str_3_2 = jsonArray_3.getString(2);
		    	String str_3_3 = jsonArray_3.getString(3);
		    	String str_4 = jsonArray_3.getString(0);
		       	String str_4_1 = jsonArray_4.getString(1);
		       	String str_4_2 = jsonArray_4.getString(2);
		       	String str_4_3 = jsonArray_4.getString(3);
		       	
		        log.info("str: " + jsonArray.getString(0));
		        log.info("str_1: " + jsonArray_1.getString(0));
		        log.info("str_2_1: " + jsonArray_2_1.getString(0));
		        log.info("str_2_2: " + jsonArray_2_2.getString(0));
		        log.info("str_3: " + jsonArray_3.getString(0));
		        log.info("str_3_1: " + jsonArray_3.getString(1));
		        log.info("str_3_2: " + jsonArray_3.getString(2));
		        log.info("str_3_3: " + jsonArray_3.getString(3));
		        log.info("str_4: " + jsonArray_4.getString(0));
		        log.info("str_4_1: " + jsonArray_4.getString(1));
		        log.info("str_4_2: " + jsonArray_4.getString(2));
		        log.info("str_4_3: " + jsonArray_4.getString(3));
			
			
			model.addAttribute("str", jsonArray.getString(0));
		    model.addAttribute("str_1", jsonArray_1.getString(0));
		    model.addAttribute("str_2_1", jsonArray_2_1.getString(0));
		    model.addAttribute("str_2_2", jsonArray_2_2.getString(0));
		    model.addAttribute("str_3", jsonArray_3.getString(0));
		    model.addAttribute("str_3_1", jsonArray_3.getString(1));
		    model.addAttribute("str_3_2", jsonArray_3.getString(2));
		    model.addAttribute("str_3_3", jsonArray_3.getString(3));
		    model.addAttribute("str_4", jsonArray_4.getString(0));
		    model.addAttribute("str_4_1", jsonArray_4.getString(1));
		    model.addAttribute("str_4_2", jsonArray_4.getString(2));
		    model.addAttribute("str_4_3", jsonArray_4.getString(3));

	
		// String userIdFromSession = (String)session.getId();
//
		// log.info("db 보내기전 userid" + userIdFromSession);

		requestAnswer rvo = new requestAnswer();
//	    rvo.setRequestId(userIdFromSession);
		rvo.setRequestAnswer(str);
		rvo.setRequestId(userid);
		log.info("db 보내기전 rvo" + rvo);

		rsv.insert_store_1(rvo);
		// 데이터 처리 로직 작성
		// 예를 들어, 데이터를 데이터베이스에 저장하거나, 다른 서비스로 전달하는 등의 작업을 수행할 수 있습니다.

		// JSON 형태로 응답

		return new ResponseEntity<>("Success", HttpStatus.OK);
	}

	@PostMapping(value = "/store_2_1/{user_id}", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> receiveData_2_1(@RequestBody String data, @PathVariable("user_id") String userid) {
		// 여기서 'Data'는 클라이언트로부터 받은 데이터의 형태를 가진 클래스입니다.
		// HttpSession session = http.getSession();
		log.info("드디어 데이터 아이디 들어옴" + userid);

		log.info("드디어 데이터" + data);
		JSONArray jsonArray = new JSONArray(data);
		String str = jsonArray.getString(0);
		log.info("드디어 데이11111터" + str);
		// String userIdFromSession = (String)session.getId();
//
		// log.info("db 보내기전 userid" + userIdFromSession);

		requestAnswer rvo = new requestAnswer();
//	    rvo.setRequestId(userIdFromSession);
		rvo.setRequestAnswer(str);
		rvo.setRequestId(userid);
		log.info("db 보내기전 rvo" + rvo);

		rsv.insert_store_2_1(rvo);
		// 데이터 처리 로직 작성
		// 예를 들어, 데이터를 데이터베이스에 저장하거나, 다른 서비스로 전달하는 등의 작업을 수행할 수 있습니다.

		// JSON 형태로 응답

		return new ResponseEntity<>("Success", HttpStatus.OK);
	}
	
	@PostMapping(value = "/store_3/{user_id}", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> receiveData_3(@RequestBody String data, @PathVariable("user_id") String userid) {
		// 여기서 'Data'는 클라이언트로부터 받은 데이터의 형태를 가진 클래스입니다.
		// HttpSession session = http.getSession();
		log.info("드디어 데이터 아이디 들어옴" + userid);

		log.info("드디어 데이터" + data);
		JSONArray jsonArray = new JSONArray(data);
		String str = jsonArray.getString(0);
		log.info("드디어 데이11111터" + str);
		// String userIdFromSession = (String)session.getId();
//
		// log.info("db 보내기전 userid" + userIdFromSession);

		requestAnswer rvo = new requestAnswer();
//	    rvo.setRequestId(userIdFromSession);
		rvo.setRequestAnswer(str);
		rvo.setRequestId(userid);
		log.info("db 보내기전 rvo" + rvo);

		rsv.insert_store_2_1(rvo);
		// 데이터 처리 로직 작성
		// 예를 들어, 데이터를 데이터베이스에 저장하거나, 다른 서비스로 전달하는 등의 작업을 수행할 수 있습니다.

		// JSON 형태로 응답

		return new ResponseEntity<>("Success", HttpStatus.OK);
	}
	 */

}
