package com.myweb.www.repository;


import java.util.List;

import com.myweb.www.domain.ChatDTO;

import com.myweb.www.domain.ChatDTO2;
import com.myweb.www.domain.FileVO;
import com.myweb.www.security.MemberVO;


public interface ChatDAO {

	int submit(ChatDTO cdto);

	List<ChatDTO> selectAll();


	List<MemberVO> selectEmpId(ChatDTO chatdto);

	List<MemberVO> selectEmp2(ChatDTO chatdto);

	int submitEmp2(ChatDTO chatDTO);


	List<ChatDTO> selectEmpId2(ChatDTO chatdto);
	FileVO selectFile1(ChatDTO chatdto);

	int readChat(ChatDTO chatdto);
	
	int getAllUnreadChat(ChatDTO chatdto);
	int getAllUnreadChatID(String chatid);

	List<ChatDTO> getBox(ChatDTO chatdto);
	ChatDTO getBox2(ChatDTO chatdto);

	List<ChatDTO2> getUnreadChat2(ChatDTO chatdto);

	

//	List<MemberVO> selectAllMemberforChat();


}