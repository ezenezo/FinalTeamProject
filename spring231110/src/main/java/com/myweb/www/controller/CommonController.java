package com.myweb.www.controller;

import java.security.Principal;
import java.util.ArrayList;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.myweb.www.domain.CompanyDTO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.security.CommonService;
import com.myweb.www.service.ChatService;
import com.myweb.www.service.FindMapService;
import com.myweb.www.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/common/*")
@Controller
public class CommonController {
	
   @Inject
   private MemberService msv;
	
	@Inject
	private CommonService comsv;
	
	@Inject
	private ChatService chatsv;
	
	@Inject
	private FindMapService findmapsv;
		
	@Autowired
	public CommonController(CommonService comsv, ChatService chatsv, FindMapService findmapsv, MemberService msv) {
		this.comsv = comsv;
		this.chatsv = chatsv;
		this.findmapsv = findmapsv;
		this.msv = msv;
	}
	
	//사용자의 이미지 저장경로 URL을 가져오기 위한 컨트롤러
	@GetMapping("/main")
	public void main(Model model, Principal principal, HttpServletRequest request) { //@RequestParam String id, Model m, HttpServletRequest request
	    log.info("/common/의 GET /main 진입");
	    String id = principal.getName();
	    log.info("id"+id);
	    FileVO fvo = msv.getFile(id);
	    log.info("fvojson"+ fvo);
	    String fvojson = new Gson().toJson(fvo);
	    log.info("fvojson"+ fvojson);
	    model.addAttribute("fvojson", fvojson);
	    
//	    ArrayList<CompanyDTO> companydtolist = (ArrayList<CompanyDTO>) findmapsv.detailall();
//	    log.info("/common/의 컨트롤러에서의 username는 ~ " + username);
//	    log.info("/common/의 컨트롤러에서의 companydto는 ~ " + companydtolist.toString());
//
//	    // JSON을 String 문자열로 변환
//	    String companyListJson = new Gson().toJson(companydtolist);
//	    log.info("/common/의 컨트롤러에서의 companyListJson은 ! " + companyListJson);
//	    // model 객체에 JSON 문자열 추가
//	    model.addAttribute("companyListJson", companyListJson);

	    // model 객체에 사용자 이름 추가
	    model.addAttribute("id", id);
	    
	    
	    // 전체 안 읽은 메시지 수 가져오기
	    int unreadMessagesCount = chatsv.getAllUnreadChatID(id);
	    log.info("unreadMessagesCount의 총개수는 "+unreadMessagesCount);
	    model.addAttribute("unreadMessagesCount", unreadMessagesCount);
	    log.info("model에 unreadMessagesCount 추가 완료");
	    
	    log.info("호출한 곳으로 페이지이동 직전");   
	}
	

	
}
