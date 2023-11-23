package com.myweb.www.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myweb.www.domain.BoardVO;
import com.myweb.www.domain.ChatDTO;
import com.myweb.www.domain.ChatDTO2;
import com.myweb.www.repository.BoardDAO;
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
	
	@Autowired
	public ChatServiceImpl(ChatDAO chatdao, MemberDAO memberdao) {
		this.chatdao=chatdao;
		this.memberdao=memberdao;
	}
	
	
	@Override
	public int submit(ChatDTO chatDTO) {
		// TODO Auto-generated method stub
		log.info("ChatServiceImpl의 submit() chatDTO>>> " + chatDTO);
		int isUp = chatdao.submit(chatDTO);
		return isUp;
	}


	@Override
	public List<ChatDTO> getList() {
		// TODO Auto-generated method stub
		return chatdao.selectAll();
	}


	@Override
	public List<MemberVO> list(ChatDTO chatdto) {
		// TODO Auto-generated method stub
		return chatdao.selectEmpId(chatdto);
	}


//	@Override
//	public List<MemberVO> list2(ChatDTO chatdto) {
//		// TODO Auto-generated method stub
//		return chatdao.selectEmp2(chatdto);
//	}


	@Override
	public int submitEmp2(ChatDTO chatDTO) {
		// TODO Auto-generated method stub
		log.info("ChatServiceImpl의 submitEmp2() chatDTO>>> " + chatDTO);
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
	public int getAllUnreadChat(ChatDTO chatdto) {
		// TODO Auto-generated method stub
		log.info("쳇서비스임플의 chatdto는"+ chatdto);
		return chatdao.getAllUnreadChat(chatdto);
	}


	@Override
	public List<ChatDTO> getBox(ChatDTO chatdto) {
		// TODO Auto-generated method stub
		log.info("포스트형getBox관련 쳇서비스임플의 getBox의 chatdto는"+ chatdto);
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