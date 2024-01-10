package com.myweb.www.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.GsonFactoryBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mysql.cj.x.protobuf.MysqlxDatatypes.Array;
import com.myweb.www.domain.ChatDTO;
import com.myweb.www.domain.ChatDTO2;
import com.myweb.www.domain.CompanyDTO;
import com.myweb.www.domain.Coordinates;
import com.myweb.www.security.AuthMember;
import com.myweb.www.security.MemberVO;
import com.myweb.www.service.ChatService;
import com.myweb.www.service.FindMapService;
import com.myweb.www.service.GeocodingService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/findmap/*")
@Controller
public class FindMapController {
	// 폴더명 : board / mapping : board
		// mpapping => /board/register
		// 목적지 => /board/register

		@Inject
		private FindMapService findmapsv;
		
//		private CompanyService compnaysv;

		
		@Autowired
		public FindMapController(FindMapService findmapsv) {
			log.info("FindMapService입니당");
			this.findmapsv = findmapsv;
		}

		// 고수찾기jsp로 이동
//		@GetMapping(value = "/findmap")
//		public String maplist(Model model, Principal principal ) {
//		    log.info("겟 /findmap 진입");
//		    String username = principal.getName();
//
//		    ArrayList<CompanyDTO> companydtolist = (ArrayList<CompanyDTO>) findmapsv.detailall();
//		    log.info("컨트롤러에서의 username는 ~ " + username);
//		    log.info("컨트롤러에서의 companydto는 ~ " + companydtolist.toString());
//		    
//		    String companyListJson = new Gson().toJson(companydtolist);
//		    model.addAttribute("companyListJson", companyListJson);
//		    
//		    model.addAttribute("username", username);
//
//		    log.info("/findmap/findmap로 페이지이동 직전 ");
//		    return "/findmap/findmap"; // 이렇게 해도 됨(뷰로 들어가는 매핑)
//		}
		
		
		@GetMapping(value = "/findmap")
		public String maplist(Model model, Principal principal) {
		    log.info("GET /findmap 진입");
		    String username = principal.getName();

		    ArrayList<CompanyDTO> companydtolist = (ArrayList<CompanyDTO>) findmapsv.detailall();
		    log.info("컨트롤러에서의 username는 ~ " + username);
		    log.info("컨트롤러에서의 companydto는 ~ " + companydtolist.toString());

		    // JSON 문자열로 변환
		    String companyListJson = new Gson().toJson(companydtolist);
		    log.info("컨트롤러에서의 companyListJson은 ! " + companyListJson);
		    // model 객체에 JSON 문자열 추가
		    model.addAttribute("companyListJson", companyListJson);

		    // model 객체에 사용자 이름 추가
		    model.addAttribute("username", username);

		    log.info("/findmap/findmap로 페이지이동 직전");
		    return "/findmap/findmap"; // JSP 페이지 경로
		}

		
		    @Autowired
		    private GeocodingService geocodingService;
		    //http://localhost:8088/findmap/get-coordinates?address=인천광역시 연수구 원인재로 88
		    @GetMapping("/get-coordinates")
		    public ResponseEntity<?> getCoordinates(@RequestParam String address) {
		    	log.info("컨트롤러의 /get-coordinates쪽 진입");
		        Coordinates coordinates = geocodingService.getCoordinate(address);
		        // 위도와 경도 정보를 반환하거나 `company` 테이블에 저장하는 로직
		        log.info("coordinates는 " +coordinates);
		        return ResponseEntity.ok(coordinates);
		    }
		
		
}
