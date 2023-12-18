package com.myweb.www.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.myweb.www.domain.FileVO;

public interface FileDAO {

	int insertFile(FileVO fvo);

	List<FileVO> getFileList(long bno);

	int removefile(String uuid);

	int deleteBnoFileAll(long bno);

	List<FileVO> selectListAllFiles();

	int insertProfile(@Param("id") String id, @Param("file") FileVO fvo);

	FileVO getFile(String id);

	int insertPortfolioMainImg(FileVO portfolioMainImg);//

	FileVO selectMainImg(long pno);//


	FileVO getFilePno(long pno);

}
