package com.myweb.www.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.myweb.www.domain.CompanyDTO;
import com.myweb.www.domain.CompanyDTO2;
import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.Coordinates;
import com.myweb.www.domain.FileVO;
import com.myweb.www.domain.PagingVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;
import com.myweb.www.domain.ReviewDTO;
import com.myweb.www.domain.ReviewVO;
import com.myweb.www.repository.CompanyDAO;

import com.myweb.www.repository.FileDAO;
import com.myweb.www.repository.HeartDAO;
import com.myweb.www.repository.MemberDAO;
import com.myweb.www.repository.PortfolioDAO;
import com.myweb.www.repository.ReviewDAO;
import com.myweb.www.security.AuthVO;
import com.myweb.www.security.MemberDTO;
import com.myweb.www.security.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {

	@Inject
	private MemberDAO mdao;

	@Inject
	private FileDAO fdao;

	@Inject
	private PortfolioDAO pdao;

	@Inject
	private CompanyDAO cdao;

	@Inject
	private HeartDAO hdao;

	@Inject
	private PortfolioService psv;

	@Inject
	private ReviewDAO rdao;

	@Transactional
	@Override
	public int register(MemberVO mvo) {
		int isOk = mdao.insertMember(mvo);
		return mdao.insertAuthInit(mvo.getId());
	}

	@Override
	public int modify(MemberVO mvo) {
		return mdao.modify(mvo);
	}

	@Override
	public int modifyPwdEmpty(MemberVO mvo) {
		return mdao.modifyPwdEmpty(mvo);
	}

	@Override

	@Transactional
	public int remove(String id) {
		mdao.removeAuth(id);
		return mdao.remove(id);

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
	public int updatePw(String id, String password) {
		return mdao.updatePw(id, password);
	}

	@Override
	public int checkId(String id) {
		String registerId = mdao.checkId(id);
		if (registerId == null) {
			return 1;
		} else {
			return 0;
		}
	}

	@Override
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
			sb.append("&redirect_uri=http://localhost:8088/member/" + ok);
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
		if (provider == "kakao") {
			reqURL = "https://kapi.kakao.com/v2/user/me";
		} else if (provider == "naver") {
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

			user = new ObjectMapper().readTree(result);

		} catch (IOException e) {
			e.printStackTrace();
		}

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

	@Override

	public MemberDTO getMdto(String id) {

		MemberVO mvo = mdao.selectEmail(id);
		CompanyVO cvo = cdao.getCvo(id);

		if (mvo.isType()) {
			List<PortfolioDTO> pdtoList = new ArrayList<PortfolioDTO>();
			// pvo+mainImg

			List<PortfolioVO> pvoList = pdao.getListMyPortfolio(id);

			for (PortfolioVO pvo : pvoList) {
				PortfolioDTO pdto = new PortfolioDTO();
				pdto.setPvo(pvo);
				pdto.setMainImg(fdao.selectMainImg(pvo.getPno()));
				pdtoList.add(pdto);
			}

			MemberDTO mdto = new MemberDTO();
			mdto.setMvo(mvo);
			mdto.setPdtoList(pdtoList);
			mdto.setCvo(cvo);
			return mdto;
		} else {
			return null;
		}
	}

	@Override
	public int heartCount(String id) {
		return pdao.heartCount(id);
	}

	@Override
	public CompanyDTO2 getCdto(String id) {
		CompanyDTO2 cdto = new CompanyDTO2();

		CompanyVO cvo = cdao.getCvo(id);
		MemberVO mvo = mdao.selectEmail(id);
		List<PortfolioDTO> pdtoList = psv.getMyList(id);

		List<ReviewDTO> rdtoList = new ArrayList<>();

		List<ReviewVO> rvoList = rdao.getReviewList2(id);

		for (ReviewVO rvo : rvoList) {
			ReviewDTO rdto = new ReviewDTO();
			rdto.setRvo(rvo);
			rdto.setReviewMainImg(fdao.getReviewMainImg(rvo.getRno()));
			rdtoList.add(rdto);
		}

		cdto.setCvo(cvo);
		cdto.setMvo(mvo);
		cdto.setPdtoList(pdtoList);
		cdto.setRdtoList(rdtoList);


		return cdto;

	}

	public FileVO getFilePno(long pno) {
		return fdao.selectMainImg(pno);
	}

	@Override
	public void heartCancel(String id, long pno) {
		hdao.deletePortfolioLike(pno, id);
		return;
	}

	@Override
	public void heartAdd(String id, long pno) {
		hdao.addPortfolioLike(pno, id);
		return;
	}

	@Override
	public CompanyVO getCvo(String id) {
		return cdao.getCvo(id);
	}

	// 231220 전경환 재추가
	@Override
	public int addCoordinates(String id, Coordinates coordinates) {
		return mdao.addCoordinates(id, coordinates);
	}

	@Override
	public int reviewCount(String id) {
		return rdao.reviewCount(id);
	}

}