package com.myweb.www.service;


import java.util.List;

import com.myweb.www.domain.ChatDTO;

import com.myweb.www.domain.ChatDTO2;
import com.myweb.www.domain.FileVO;
import com.myweb.www.security.MemberVO;


public interface ChatService {

	int submit(ChatDTO chatDTO);

	List<ChatDTO> getList();


	List<MemberVO> list(ChatDTO chatdto);

	List<MemberVO> list2(ChatDTO chatdto);

	int submitEmp2(ChatDTO chatdto);


	List<ChatDTO> getList2(ChatDTO chatdto);
	FileVO getFile1(ChatDTO chatdto);

	int getAllUnreadChat(ChatDTO chatdto);
	int getAllUnreadChatID(String chatid);

//	Object getIntAllUnreadChat(ChatDTO chatdto);

	List<ChatDTO> getBox(ChatDTO chatdto);

	List<ChatDTO2> getUnreadChat2(ChatDTO chatdto);

	List<MemberVO> selectAllMemberforChat();


}