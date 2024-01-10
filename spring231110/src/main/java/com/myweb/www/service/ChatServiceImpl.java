package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.myweb.www.domain.ChatDTO;
import com.myweb.www.domain.ChatDTO2;
import com.myweb.www.domain.FileVO;

import com.myweb.www.repository.ChatDAO;
import com.myweb.www.repository.CommentDAO;
import com.myweb.www.repository.FileDAO;

import com.myweb.www.repository.MemberDAO;


import com.myweb.www.security.MemberVO;


import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ChatServiceImpl implements ChatService {

	
	private ChatDAO chatdao;
	
	private MemberDAO memberdao;

	private FileDAO fdao;
	
//	@Inject
//	private FileDAO fdao;
	
	@Autowired
	public ChatServiceImpl(ChatDAO chatdao, MemberDAO memberdao, FileDAO fdao) {
		this.chatdao=chatdao;
		this.memberdao=memberdao;
		this.fdao= fdao;
	}
	
	
	@Override
	public int submit(ChatDTO chatDTO) {
		int isUp = chatdao.submit(chatDTO);
		return isUp;
	}


	@Override
	public List<ChatDTO> getList() {
		return chatdao.selectAll();
	}



	@Override
	public List<MemberVO> list(ChatDTO chatdto) {
		return chatdao.selectEmpId(chatdto);
	}


	@Override
	public List<MemberVO> list2(ChatDTO chatdto) {
		return chatdao.selectEmp2(chatdto);
	}


	@Override
	public int submitEmp2(ChatDTO chatDTO) {
		// TODO Auto-generated method stub
		int isUp = chatdao.submitEmp2(chatDTO);
		return isUp;
	}



	@Override
	public List<ChatDTO> getList2(ChatDTO chatdto) {
		// TODO Auto-generated method stub
		int oneorzero = chatdao.readChat(chatdto);
		log.info("읽음처리상태 " + oneorzero); //읽으면 개수별 1이상일듯 아님 0 
		return chatdao.selectEmpId2(chatdto);
	}
	@Override
	public FileVO getFile1(ChatDTO chatdto) {
		// TODO Auto-generated method stub
		return chatdao.selectFile1(chatdto);
	}



	@Override
	public int getAllUnreadChat(ChatDTO chatdto) {
		return chatdao.getAllUnreadChat(chatdto);
	}
	
	@Override
	public int getAllUnreadChatID(String chatid) {
		return chatdao.getAllUnreadChatID(chatid);
	}


	@Override
	public List<ChatDTO> getBox(ChatDTO chatdto) {
		//231220 다수의 사진을 위해 추가 전경환
		FileVO fvo = fdao.getFile(chatdto.getToID());
		log.info("fvo는 "+ fvo);
		List<ChatDTO> chdto = chatdao.getBox(chatdto);
		log.info("리스트인 chdto는 1 "+ chatdto);
//		ChatDTO chdto2 = chatdao.getBox2(chatdto);
//		log.info("dto인 chdto2는 "+ chdto2);
//		if(chdto2 != null) {
//			chdto2.setFilevo(fvo);
//		}
//		log.info("서비스임플마지막 dto인 chdto2는 "+ chdto2);
		return chatdao.getBox(chatdto);
	}


	@Override
	public List<ChatDTO2> getUnreadChat2(ChatDTO chatdto) {
		// TODO Auto-generated method stub
		return chatdao.getUnreadChat2(chatdto);
	}


	@Override
	public List<MemberVO> selectAllMemberforChat() {
		// TODO Auto-generated method stub
		return memberdao.selectAllMemberforChat();
	}









//	@Transactional
//	@Override
//	public List<BoardVO> getList() {
//		int isOk = bdao.updateCommentCount();
//		isOk = bdao.updateFileCount();
//		return bdao.selectAll();
//	}

}