package com.myweb.www.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.myweb.www.domain.ApprovalDTO;
import com.myweb.www.domain.ApprovalVO;

import com.myweb.www.domain.PagingVO;
import com.myweb.www.domain.RequestVO;
import com.myweb.www.repository.ApprovalDAO;
import com.myweb.www.security.MemberVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ApprovalServiceImpl implements ApprovalService {
	private final ApprovalDAO adao;

	public ApprovalServiceImpl(ApprovalDAO adao) {
		this.adao = adao;
	}

	@Override
	public boolean approval_club(ApprovalVO avo) {
		log.info("제발 avo " + avo);

		boolean result = adao.approval_club(avo);

		if (result) {
			log.error("성공");
			return true;
		}

		return false;
	}

	@Override
	public Long approvalExist(ApprovalVO avo) {
		Long result = adao.approvalExist(avo);
		log.info("승인이 존재하는지" + result);
		return result;
	}


	@Override
	public List<RequestVO> getList_club(ApprovalDTO approvalDTO) {
		log.info("동호회 승인 리스트 들어옴");

		return adao.list_club(approvalDTO);
	}

	@Override
	public int getTotalCount_club(PagingVO pagingVO) {
		log.info("동호회 승인 총 개수 들어옴");

		return adao.total_club(pagingVO);
	}

}