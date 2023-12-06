package com.myweb.www.repository;



import java.util.List;

import com.myweb.www.domain.ApprovalDTO;
import com.myweb.www.domain.ApprovalVO;

import com.myweb.www.domain.PagingVO;
import com.myweb.www.domain.RequestVO;





public interface ApprovalDAO {


		boolean approval_club(ApprovalVO avo);

		Long approvalExist(ApprovalVO avo);

		List<RequestVO> list_club(ApprovalDTO approvalDTO);

		int total_club(PagingVO pagingVO);

	
	

}
