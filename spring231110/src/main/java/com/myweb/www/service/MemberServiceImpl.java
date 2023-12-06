package com.myweb.www.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myweb.www.domain.BoardDTO;
import com.myweb.www.domain.BoardVO;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.security.AuthMember;
import com.myweb.www.security.AuthVO;
import com.myweb.www.security.MemberVO;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class MemberServiceImpl implements MemberService {
<<<<<<< HEAD
	@Inject 
	private MemberDAO mdao;
	
	@Inject 
	private FileDAO fdao;

	@Transactional
	@Override
	public int register(MemberVO mvo) {
		int isOk = mdao.insertMember(mvo); //bno 등록
=======
	@Inject
	private MemberDAO mdao;

	@Inject
	private FileDAO fdao;

	@Inject
	private ClubDAO cdao;

	@Inject
	private DepartmentDAO ddao;

	@Transactional
	@Override
	public int register(MemberVO mvo) {
		int isOk = mdao.insertMember(mvo);
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
		return mdao.insertAuthInit(mvo.getId());
	}

	@Override
<<<<<<< HEAD
	public boolean updateLastLogin(String authEmail) {
		// TODO Auto-generated method stub
		return mdao.updateLastLogin(authEmail) > 0 ? true : false;
	}

	@Override
	public List<MemberVO> getList(PagingVO pagingVO) {
		return mdao.selectAll(pagingVO);
	}

	@Transactional
	@Override
	public AuthMember detail(String id) {
		// TODO Auto-generated method stub
		List<AuthVO> testAutVoList = new ArrayList<>();
		AuthVO initialAuth = new AuthVO("temptest.test.test", "tempadminauth"); // 임시이메일 주소와 권한을 설정
		testAutVoList.add(initialAuth);

		MemberVO mvo = new MemberVO(0, id, id, id, id, id, id, id, id,id, testAutVoList ); //여기까지 임시로 지나칠려는 의도

		AuthMember amdto = new AuthMember(mvo); //새로 넣어줄려는 의도
		amdto.setMvo(mdao.selectOne(id));	//bdao bvo호출 select * from board where bno=#{bno}
		log.info(">>>>> amdto >> "+amdto.toString());
		return amdto;
	}

	@Override
=======
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
	public int modify(MemberVO mvo) {
		// TODO Auto-generated method stub
		return mdao.modify(mvo);
	}

	@Override
	public int modifyPwdEmpty(MemberVO mvo) {
		// TODO Auto-generated method stub
		return mdao.modifyPwdEmpty(mvo);
	}
<<<<<<< HEAD
	
	
	@Override
	public int remove(String email) {
			mdao.removeAuth(email);
=======

	@Override
	public int remove(String email) {
		mdao.removeAuth(email);
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
		return mdao.remove(email);
	}

	@Override
	public MemberVO memberDetail(String id) {
		return mdao.selectOne(id);
	}

	@Override
	public int getTotalCount(PagingVO pagingVO) {
		// TODO Auto-generated method stub
		return mdao.getTotalCount(pagingVO);
	}

	@Override
<<<<<<< HEAD
	public MemberVO getMemberDetail(String id) {
		return mdao.selectOne(id);	
	}

	@Override
=======
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
	public int updatePw(String id, String password) {
		return mdao.updatePw(id, password);
	}

	@Override
	public int checkId(String id) {
		String registerId = mdao.checkId(id);
<<<<<<< HEAD
		if(registerId == null) {
			return 1;
		}else {
			return 0;			
=======
		if (registerId == null) {
			return 1;
		} else {
			return 0;
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
		}
	}

	@Override
<<<<<<< HEAD
	public int insert(long empNo, FileVO fvo) {
		return fdao.insertProfile(empNo, fvo);
	}

	@Override
	public long getMaxEmpNo() {
		return mdao.getMaxEmpNo();
	}

	
=======
	public int insert(String id, FileVO fvo) {
		log.info(fvo + "");
		if (fvo.getFileType() == 0) {
			return 1;
		}
		return fdao.insertProfile(id, fvo);
	}

	@Override
	public JsonNode getAccessToken(String code, String ok) {
		JsonNode accessToken = null;
		String reqUrl = "https://kauth.kakao.com/oauth/token";

		try {
			URL url = new URL(reqUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			// 필수 헤더 세팅
			conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
			conn.setDoOutput(true); // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.

			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
			StringBuilder sb = new StringBuilder();

			// 필수 쿼리 파라미터 세팅
			sb.append("grant_type=authorization_code");
			sb.append("&client_id=e7f7342b45a67c5286814656c21b3bdd");
			sb.append("&redirect_uri=http://localhost:8088/member/");
			sb.append(ok);
			sb.append("&code=").append(code);

			bw.write(sb.toString());
			bw.flush();

			int responseCode = conn.getResponseCode();
			log.info("[KakaoApi.getAccessToken] responseCode = {}", responseCode);

			BufferedReader br;
			if (responseCode >= 200 && responseCode <= 300) {
				br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}

			String line = "";
			StringBuilder responseSb = new StringBuilder();
			while ((line = br.readLine()) != null) {
				responseSb.append(line);
			}
			String result = responseSb.toString();
			log.info("responseBody = {}", result);

			// JsonParser parser = new JsonParser();
			// JsonElement element = (JsonElement) parser.parse(result);
			ObjectMapper mapper = new ObjectMapper();
			JsonNode jsonNode = mapper.readTree(result);
			log.info("jsonnode:" + jsonNode);
			accessToken = jsonNode.get("access_token");
			// accessToken = element.getAsJsonObject().get("access_token").getAsString();
			// refreshToken = element.getAsJsonO
			// `bject().get("refresh_token").getAsString();

			br.close();
			bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return accessToken;
	}

	@Override
	public JsonNode getUserInfo(JsonNode access_Token, String provider) {
		JsonNode user = null;
		String reqURL = null;
		// 요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
		HashMap<String, Object> userInfo = new HashMap<>();
		if(provider == "kakao") {
			reqURL = "https://kapi.kakao.com/v2/user/me";			
		}else if(provider == "naver") {
			reqURL = "https://openapi.naver.com/v1/nid/me";
		}
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");

			// 요청에 필요한 Header에 포함될 내용
			conn.setRequestProperty("Authorization", "Bearer " + access_Token.asText());

			int responseCode = conn.getResponseCode();
			log.info("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String line = "";
			String result = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			log.info("response body : " + result);

			/*
			 * JsonParser parser = new JsonParser(); JsonElement element =
			 * parser.parse(result);
			 * 
			 * JsonObject properties =
			 * element.getAsJsonObject().get("properties").getAsJsonObject(); JsonObject
			 * kakao_account =
			 * element.getAsJsonObject().get("kakao_account").getAsJsonObject();
			 * 
			 * String email = kakao_account.getAsJsonObject().get("email").getAsString();
			 * String id = result.substring(result.indexOf(":"),result.indexOf(","));
			 * 
			 * userInfo.put("email", email); userInfo.put("id", id);
			 */

			user = new ObjectMapper().readTree(result);

		} catch (IOException e) {
			e.printStackTrace();
		}

		/*
		 * ObjectMapper mapper = new ObjectMapper(); JsonNode user =
		 * mapper.valueToTree(userInfo);
		 */

		return user;
	}

	@Override
	public void kakaoLogout(String access_Token) {
		String reqURL = "https://kapi.kakao.com/v1/user/logout";
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Authorization", "Bearer " + access_Token);

			int responseCode = conn.getResponseCode();
			log.info("responseCode : " + responseCode);

			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

			String result = "";
			String line = "";

			while ((line = br.readLine()) != null) {
				result += line;
			}
			log.info(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public String kakaojoin(JsonNode user, Model m) {
		String kakaoId = user.get("id").asText().substring(1);
		String kakaoEmail = user.get("kakao_account").get("email").asText();

		m.addAttribute("id", kakaoId);

		if (mdao.checkEmail(kakaoEmail) != null) { // 이미 가입된 아이디가 있음
			log.info("가입된 아이디가 있음");
			return "/member/login";
		} else { // 없으면 추가 정보 입력
			log.info("가입된 아이디가 없음");
			m.addAttribute("email", kakaoEmail);
			m.addAttribute("provider", "kakao");
			return "member/moreInfo";
		}
	}

	@Override
	public String kakaoLogin(JsonNode user, HttpSession ses, Model m) {

		log.info("user:" + user);

		String kakaoId = user.get("id").asText();
		String kakaoEmail = user.get("kakao_account").get("email").asText();

		if (mdao.checkEmail(kakaoEmail) == null) { // 가입된 아이디가 있음
			log.info("가입된 아이디가 없음");
			return "/member/register";
		}

		JsonNode kakaoAccount = user.get("kakao_account");
		JsonNode kakaoUser = kakaoAccount.get("user");

		// 로그인 후 회원정보 저장
		MemberVO member = mdao.kakaoLogin(kakaoEmail);

		// 세션 저장
		ses.setAttribute("user", member);
		log.info("session:" + ses.getAttribute("user"));
		ses.setMaxInactiveInterval(30 * 60);

		ses.setAttribute("id", kakaoId);
		m.addAttribute("loginMember", member);
		m.addAttribute("kakaoUser", kakaoUser);
		// m.setViewName("index");

		return "member/loginWithoutForm"; // 유저 계정 권한
	}

	@Override
	public JsonNode getAccessToken(String code, String state, String provider) {
		if (provider == "naver") {
			JsonNode accessToken = null;
			String reqUrl = "https://nid.naver.com/oauth2.0/token";

			try {
				URL url = new URL(reqUrl);
				HttpURLConnection conn = (HttpURLConnection) url.openConnection();

				// 필수 헤더 세팅
				conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
				conn.setDoOutput(true); // OutputStream으로 POST 데이터를 넘겨주겠다는 옵션.

				BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
				StringBuilder sb = new StringBuilder();
				
				// 필수 쿼리 파라미터 세팅
				sb.append("grant_type=authorization_code");
				sb.append("&client_id=AGtr4pd5S4hkBnMZnEyo");
				sb.append("&client_secret=1EefSsvOga");
				sb.append("&code=").append(code);
				sb.append("&state=test");

				bw.write(sb.toString());
				bw.flush();

				int responseCode = conn.getResponseCode();
				log.info("[NaverApi.getAccessToken] responseCode = {}", responseCode);

				BufferedReader br;
				if (responseCode >= 200 && responseCode <= 300) {
					br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				} else {
					br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
				}

				String line = "";
				StringBuilder responseSb = new StringBuilder();
				while ((line = br.readLine()) != null) {
					responseSb.append(line);
				}
				String result = responseSb.toString();
				log.info("responseBody = {}", result);

				ObjectMapper mapper = new ObjectMapper();
				JsonNode jsonNode = mapper.readTree(result);
				log.info("jsonnode:" + jsonNode);
				accessToken = jsonNode.get("access_token");

				br.close();
				bw.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return accessToken;
		}
		return null;
	}
	
	@Override
	public String naverjoin(JsonNode user, Model m) {
		String naverId = user.get("response").get("id").asText();
		String naverEmail = user.get("response").get("email").asText();

		m.addAttribute("id", naverId);

		if (mdao.checkEmail(naverEmail) != null) { // 이미 가입된 아이디가 있음
			log.info("가입된 아이디가 있음");
			return "/member/login";
		} else { // 없으면 추가 정보 입력
			log.info("가입된 아이디가 없음");
			m.addAttribute("email", naverEmail);
			m.addAttribute("provider", "naver");
			return "member/moreInfo";
		}
	}

	@Override
	public String naverLogin(JsonNode user, HttpSession ses, Model m) {
		log.info("user:" + user);

		JsonNode response = user.get("response");
		String naverId = response.get("id").asText();
		String naverEmail = response.get("email").asText();

		if (mdao.checkEmail(naverEmail) == null) { // 가입된 아이디가 있음
			log.info("가입된 아이디가 없음");
			return "/member/register";
		}

		// 로그인 후 회원정보 저장
		MemberVO member = mdao.kakaoLogin(naverEmail);

		// 세션 저장
		ses.setAttribute("user", member);
		log.info("session:" + ses.getAttribute("user"));
		ses.setMaxInactiveInterval(30 * 60);
		
		ses.setAttribute("id", naverId);
		m.addAttribute("id", naverId);
		m.addAttribute("loginMember", member);

		return "member/loginWithoutForm"; // 유저 계정 권한
	}

	@Override
	public AuthVO getAuthList(String id) {
		return mdao.getAuthList(id);
	}

	@Override
	public FileVO getFile(String id) {
		return fdao.getFile(id);
	}

	@Override
	@Transactional
	public int companyRegister(MemberVO mvo) {
		mdao.insertAuthCom(mvo.getId());
		return mdao.companyRegister(mvo);
	}

>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5
}
