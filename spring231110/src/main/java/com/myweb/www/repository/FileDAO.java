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

<<<<<<< HEAD
	int insertProfile(@Param("empNo") long empNo, @Param("file") FileVO fvo);
=======
	int insertProfile(@Param("id") String id, @Param("file") FileVO fvo);

	FileVO getFile(String id);
>>>>>>> 6d101762b9898b4588d6b29245d870cd26a20ac5

}
