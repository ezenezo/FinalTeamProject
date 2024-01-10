package com.myweb.www.controller;

import java.lang.ProcessBuilder.Redirect;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import com.myweb.www.domain.ChatDTO;
import com.myweb.www.domain.ChatDTO2;
import com.myweb.www.domain.CommentVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;

import com.myweb.www.handler.FileHandler;
import com.myweb.www.handler.PagingHandler;
import com.myweb.www.security.AuthMember;
import com.myweb.www.security.MemberVO;

import com.myweb.www.service.ChatService;
import com.myweb.www.service.commentService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/chaturl/*")
@Controller
public class ChatController {
// 폴더명 : board / mapping : board
	// mpapping => /board/register
	// 목적지 => /board/register

	@Inject
	private ChatService chatsv;

//	private BoardService bsv;
//
//	private FileHandler fh;
//	
//	private CommentService csv;
	
	@Autowired
	public ChatController(ChatService chatsv) {
		this.chatsv = chatsv;
//		this.fh = fh;
	}

	// 익명 채팅글쓰기 jsp로 이동
	@GetMapping("/chat")
	public String register(Model model, Principal principal) {// jsp에서 온 매핑이랑 뷰로 들어가는 매핑이 같아서(이름이 같아서) void로 하면 왔던 곳으로 가라고 할 수 있음
		 // principal 객체에서 사용자 이름(ID)을 가져옴
	    String username = principal.getName();
	    // Model 객체에 사용자 이름(ID) 추가
	    model.addAttribute("username", username);
		return "/chatfolder/chat"; // 이렇게 해도 됨(뷰로 들어가는 매핑)
	}
	
	
	
	


	@PostMapping(value ="/chat" , consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	@ResponseBody
	public ResponseEntity<String> write(@RequestBody ChatDTO chatdto) 
	{
		int isOk = -888;	
		int isOk2 = -999;
		if(chatdto.getFromID() == null || chatdto.getFromID().equals("") 
//				|| chatdto.getToID() == null ||	chatdto.getToID().equals("")
				||chatdto.getChatContent().equals("")){
			isOk = 0;
		}else {
			isOk = chatsv.submit(chatdto);
		}

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
						: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	// 채팅 리스트 출력
//	@GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseEntity<List> list(Model model) {
//		
//		log.info(">>>>GetMapping>>> /chat/ 진입  >>> ");
//		chatList = chatsv.getList();
////		log.info("chatlist의 값 "+ chatlist);
//		model.addAttribute("chatList" , chatList);
//		log.info("model의 값 "+ model);
//		
//		return new ResponseEntity<List>(chatList, HttpStatus.OK);
//
//	}
	
	// 채팅 리스트 출력
	@GetMapping(value = "/list", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<ChatDTO>> list() { // Model 파라미터 제거, @ResponseBody 사용시 필요 없음
		
		List<ChatDTO> chatList = chatsv.getList(); // List<ChatDTO> 반환하는지 확인
	    
	    return new ResponseEntity<>(chatList, HttpStatus.OK); // 제네릭 파라미터 간소화
	}
	
	// 댓글 리스트 출력
//	@GetMapping(value = "/list/{bno}/{page}", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<PagingHandler> list(@PathVariable("bno") long bno,@PathVariable("page") int page) {
//		log.info(">>>>>>> bno / page >>> "+bno +"  "+page);
//		PagingVO pgvo = new PagingVO(page,5); //qty=5
//		PagingHandler list = csv.getList(bno,pgvo);
//		log.info(">>>>>>> ph List >>>>"+list);
//		return new ResponseEntity<PagingHandler>(list, HttpStatus.OK);
//
//	}
	
//	// 리스트 출력
//	@GetMapping("/list")
//	public String list(Model model) {
//		List<BoardVO> list = bsv.getList();
//		model.addAttribute("list", list);
//
//		return "/board/list";
//	}



	
	// 채팅글쓰기 jsp로 이동
	@GetMapping("/find")
	public String finduser(Model model, Principal principal) {// jsp에서 온 매핑이랑 뷰로 들어가는 매핑이 같아서(이름이 같아서) void로 하면 왔던 곳으로 가라고 할 수 있음
		 // principal 객체에서 사용자 이름(ID)을 가져옴
		String username = principal.getName();
		
		
		String empNm="";
		if (principal instanceof UsernamePasswordAuthenticationToken) {
		    UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
		    Object principalObj = token.getPrincipal();

		    if (principalObj instanceof AuthMember) {
		        AuthMember authMember = (AuthMember) principalObj;
		        //empNm = authMember.getMvo().getEmpNm(); // AuthMember 클래스와 MemberVO 클래스에 적절한 getter 메서드가 정의되어 있어야 함

		        // 이제 empNm 변수를 사용할 수 있습니다.
		    } else {
		    }
		} else {
		}
		

	    
	    // Model 객체에 사용자 이름(ID) 추가
	    model.addAttribute("username", username);
	    model.addAttribute("empNm", empNm);
	    
		return "/chatfolder/find"; // 이렇게 해도 됨(뷰로 들어가는 매핑)
	}
	
	
	
	@PostMapping(value ="/find" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<MemberVO>> find(@RequestBody ChatDTO chatdto) 
	{
		int isOk = -888;	
		int isOk2 = -999;
		List<MemberVO> findList;
		if(chatdto.getToID() == null || chatdto.getToID().equals("") )
		{
			isOk = 0;
			findList = chatsv.list(chatdto); // 뭐 에러 날것 같기 한데 일단 진행...
		}else {
			isOk = 1;
			
			findList = chatsv.list(chatdto);
		}

		return isOk > 0 ? new ResponseEntity<>(findList, HttpStatus.OK)
						: new ResponseEntity<>(findList, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	
	
	
	
	
	
	
	

	// 서로 2명만 채팅글쓰기 jsp로 이동
	@GetMapping("/chat2")
	public String register2(Model model, Principal principal) {// jsp에서 온 매핑이랑 뷰로 들어가는 매핑이 같아서(이름이 같아서) void로 하면 왔던 곳으로 가라고 할 수 있음
		 // principal 객체에서 사용자 이름(ID)을 가져옴
	    String username = principal.getName();
	    // Model 객체에 사용자 이름(ID) 추가
	    model.addAttribute("username", username);
		return "/chatfolder/chat2"; // 이렇게 해도 됨(뷰로 들어가는 매핑)
	}
	
	
	
	@PostMapping(value ="/chat2" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<String> write2(@RequestBody ChatDTO chatdto) 
	{
		int isOk = -777;	
		int isOk2 = -666;
		if(chatdto.getFromID() == null || chatdto.getFromID().equals("") 
//				|| chatdto.getToID() == null ||	chatdto.getToID().equals("")
				||chatdto.getChatContent().equals("")){
			
			isOk = 0;
		}else {
			isOk = chatsv.submitEmp2(chatdto);
		}

		return isOk > 0 ? new ResponseEntity<String>("1", HttpStatus.OK)
						: new ResponseEntity<String>("0", HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	
	
	
	//1:1 채팅 리스트 출력
//	@GetMapping(value = "/list2", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseEntity<List<ChatDTO>> list2_test1(@RequestBody ChatDTO chatdto) { // Model 파라미터 제거, @ResponseBody 사용시 필요 없음
//		
//		log.info(">>>> 겟Mapping >>> /chat/list_test1 진입 >>> ");
//		log.info(">>>>>>chatdto>> "+chatdto.toString());
//		List<ChatDTO> chatList2 = chatsv.getList2(chatdto); // List<ChatDTO> 반환하는지 확인
//	    log.info("chatList2의 값 " + chatList2);
//	    
//	    return new ResponseEntity<>(chatList2, HttpStatus.OK); // 제네릭 파라미터 간소화
//	}
	
	

	
	
	//1:1 용 채팅 리스트만 출력하려고 함
	@PostMapping(value ="/list2" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<ChatDTO>> list2_test1(@RequestBody ChatDTO chatdto) 
	{
		int isOk = -777;	
		int isOk2 = -555;
		List<ChatDTO> list2;
		if(chatdto.getToID() == null || chatdto.getToID().equals("") )
		{
			isOk = 0;
			list2 = chatsv.getList2(chatdto); // 뭐 에러 날것 같기 한데 일단 진행...
		}else {
			isOk = 1;
			list2 = chatsv.getList2(chatdto);
			FileVO filevo = chatsv.getFile1(chatdto);
		    for (ChatDTO chat : list2) {
		        chat.setFilevo(filevo); // 각 ChatDTO에 FileVO 설정
		    }
		}

		return isOk > 0 ? new ResponseEntity<>(list2, HttpStatus.OK)
						: new ResponseEntity<>(list2, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	
	
	
	
//	//나에게 온 메시지가 몇개 안읽었는지 확인용 (메시지함)
//	@PostMapping(value ="/chatUnread" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
//	@ResponseBody
//	public ResponseEntity<List<Integer>> chatUnread(@RequestBody ChatDTO chatdto) 
//	{
//		log.info("포스트 chatUnread 진입");
//		log.info(">>>>>>chatdto>> "+chatdto.toString());
//		List<Integer> unreadCounts = new ArrayList<>();
//		int unreadCount=-4444;
//		unreadCounts.add(unreadCount);
//		
//		int isOk = -7777;	
//		log.info("list2 초기화 직전");
//		
//		log.info("if문 직전");
//		if(chatdto.getToID() == null || chatdto.getToID().equals("") )
//		{
//			log.info("chatdto가 이상함");
//			isOk = 0;
//			unreadCount = chatsv.getAllUnreadChat(chatdto); // 뭐 에러 날것 같기 한데 일단 진행...
//			unreadCounts.add(unreadCount);
//		}else {
//			log.info("chatdto가 멀쩡함");
//			isOk = 1;
//			log.info("컨트롤러의 chatdto는 "+ chatdto);
//			unreadCount = chatsv.getAllUnreadChat(chatdto);
//			log.info("unreadCount는^^ "+ unreadCount);
//			unreadCounts.add(unreadCount);
//		}
//
//		log.info("어쩄든 unreadCount는 "+ unreadCount);
//		log.info(">>컨트롤러 chatsv.getAllUnreadChat(chatdto) >>>" + (isOk>0? "OK":"FAIL"));
//		log.info("isOk는" + isOk);
//		log.info("최종반납할 리스트인 unreadCounts! 는" +unreadCounts);
//		return isOk > 0 ? new ResponseEntity<>(unreadCounts, HttpStatus.OK)
//						: new ResponseEntity<>(unreadCounts, HttpStatus.INTERNAL_SERVER_ERROR);
//	}
	
	
	
	//나에게 온 메시지가 총 몇개 안읽었는지 개수 파악용 (메시지함)
	@PostMapping(value ="/chatUnread" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Integer> chatUnread(@RequestBody ChatDTO chatdto) 
	{

		int unreadCount = -99999;
		int isOk = -7777;	
		
		if(chatdto.getToID() == null || chatdto.getToID().equals("") )
		{
			isOk = 0;
			unreadCount = chatsv.getAllUnreadChat(chatdto); // 뭐 에러 날것 같기 한데 일단 진행...

		}else {
			isOk = 1;
			unreadCount = chatsv.getAllUnreadChat(chatdto);

		}


		return isOk > 0 ? new ResponseEntity<>(unreadCount, HttpStatus.OK)
						: new ResponseEntity<>(unreadCount, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	//각각의! 사원이 나에게 온 메시지가 각각! 몇개 안읽었는지 확인용 (메시지함)
	@PostMapping(value ="/chatUnread2" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<ChatDTO2>> chatUnread2(@RequestBody ChatDTO chatdto) 
	{

		List<ChatDTO2> unreadCount2; //각각의 읽지 않은 글 확인용
		int isOk = -7777;	
		
		if(chatdto.getToID() == null || chatdto.getToID().equals("") )
		{
			isOk = 0;
			unreadCount2 = chatsv.getUnreadChat2(chatdto); // 뭐 에러 날것 같기 한데 일단 진행...

		}else {
			isOk = 1;
			unreadCount2 = chatsv.getUnreadChat2(chatdto);

		}


		return isOk > 0 ? new ResponseEntity<>(unreadCount2, HttpStatus.OK)
						: new ResponseEntity<>(unreadCount2, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	
	
	
	//모든 나에게 온 메시지가 몇개 안읽었는지 확인용 (메시지함)
	@PostMapping(value ="/getBox" , consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<ChatDTO>> getBox(@RequestBody ChatDTO chatdto) 
	{

		List<ChatDTO> relistchatdto = null;
		int isOk = -7777;	
		
		if(chatdto.getToID() == null || chatdto.getToID().equals("") )
		{
			isOk = 0;
//			listgetBox.add(chatsv.getBox(chatdto)); // 뭐 에러 날것 같기 한데 일단 진행...
//			listgetBox = chatsv.getBox(chatdto); // 뭐 에러 날것 같기 한데 일단 진행...
			List<ChatDTO> rechatdto = chatsv.getBox(chatdto);// 뭐 에러 날것 같기 한데 일단 진행...
		}else {
			isOk = 1;
//			listgetBox = chatsv.getBox(chatdto);
			relistchatdto = chatsv.getBox(chatdto);
//			listgetBox.add(rechatdto);
//			log.info("포스트/getBox  listgetBox는^^ "+ listgetBox);

		}


		return isOk > 0 ? new ResponseEntity<>(relistchatdto, HttpStatus.OK)
						: new ResponseEntity<>(relistchatdto, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	
	
	
	
	//다른페이지에서 a태그로 box.jsp로 이동 할떄 동작하는 부분
	@GetMapping("/box")
	public String box(Model model, Principal principal) {// jsp에서 온 매핑이랑 뷰로 들어가는 매핑이 같아서(이름이 같아서) void로 하면 왔던 곳으로 가라고 할 수 있음
		 // principal 객체에서 사용자 이름(ID)을 가져옴
	    String username = principal.getName();
	    // Model 객체에 사용자 이름(ID) 추가
	    model.addAttribute("username", username);
		return "/chatfolder/box"; // 이렇게 해도 됨(뷰로 들어가는 매핑)
	}
	
	
	
	
	
	// 사원 리스트 출력
	@GetMapping(value = "/selectAllMemberforChat", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<MemberVO>> selectAllMemberforChat() { // Model 파라미터 제거, @ResponseBody 사용시 필요 없음
		
		List<MemberVO> empList = chatsv.selectAllMemberforChat(); // List<ChatDTO> 반환하는지 확인
	    
	    return new ResponseEntity<>(empList, HttpStatus.OK); // 제네릭 파라미터 간소화
	}
	
	
	//서버에서 안 읽은 메시지 수를 세션에 저장하는 엔드포인트 (box.jsp전용으로만듬)231216
//	@PostMapping("/updateUnreadCount")
//	public ResponseEntity<?> updateUnreadCount(HttpSession session, @RequestBody Map<String, Integer> payload) {
//	    int unreadCount = payload.getOrDefault("unreadCount", 0);
//	    log.info("/updateUnreadCount의 unreadCount는 "+unreadCount);
//	    session.setAttribute("AllUnreadChat", unreadCount); // 세션에 'AllUnreadChat' 키로 값을 저장
//	    return ResponseEntity.ok().build();
//	}
	
	//get방식
	@GetMapping("/updateUnreadCount")
	public ResponseEntity<?> updateUnreadCount(HttpSession session, @RequestParam("userId") String userId) {
	    // userId 값을 사용하여 안 읽은 메시지 수를 계산하는 로직 필요
	    int unreadCount = chatsv.getAllUnreadChatID(userId);
	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.TEXT_PLAIN);
	    session.setAttribute("AllUnreadChat", unreadCount);
	    return new ResponseEntity<>(String.valueOf(unreadCount), headers, HttpStatus.OK);
	}
	
//	@PostMapping("/chatUnread")
//	public ResponseEntity<?> chatUnread3(@RequestBody ChatDTO chatDTO) {
//		log.info("포스트방식으로 /chatUnread/chatUnread 진입1");
//	    // chatDTO에서 toID 값을 사용하여 안 읽은 메시지 수를 계산하는 로직 필요
//	    String userId = chatDTO.getToID();
//	    int unreadCount = chatsv.getAllUnreadChatID(userId);
//	    HttpHeaders headers = new HttpHeaders();
//	    headers.setContentType(MediaType.TEXT_PLAIN);
//	    log.info("포스트방식으로 /chaturl/chatUnread 진입2");
//	    log.info("unreadCount는" + unreadCount);
//
//	    return new ResponseEntity<>(String.valueOf(unreadCount), headers, HttpStatus.OK);
//	}

	
	
	//사진 주소 가져올려고 하나 팜 231220 전경환
	@PostMapping(value = "/getProfileImagepost", consumes = "application/json", produces = "text/plain")
	@ResponseBody
	public ResponseEntity<String> getProfileImagepost(@RequestBody ChatDTO chatdto) {

	    // 프로필 이미지 URL을 가져오는 로직 (예시)
	    String imageUrl;
	    try {
	        FileVO filevo = chatsv.getFile1(chatdto);
	        imageUrl = filevo.getSaveDir() + "/" + filevo.getUuid() + "_" + filevo.getFileName();
	        return ResponseEntity.ok(imageUrl); // 단순 문자열 반환
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("../resources/img/profile_none.png");
	    }
	}
	
	
	
	
	
}