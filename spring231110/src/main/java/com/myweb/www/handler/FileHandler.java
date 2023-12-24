package com.myweb.www.handler;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.tika.Tika;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.myweb.www.domain.FileVO;

import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;

@ToString
@Getter
@Component
@Slf4j
public class FileHandler {//장원희대문자바꿔라
	private final String UP_DIR = "C:\\_myweb\\_java\\fileUpload\\";// 231120전경환
//	private final String UP_DIR = "/aj2002/tomcat/webapps/_javaweb/_java/fileUpload/";//231120전경환

	public FileVO uploadFiles(MultipartFile boardfile) {

		LocalDate date = LocalDate.now();
		String today = date.toString();
		String todaySe = today.replace("-", File.separator);

		File folders = new File(UP_DIR, todaySe);

		if (!folders.exists()) { // folders가 없다면
			folders.mkdirs();
		}

		FileVO fvo = new FileVO();
		fvo.setSaveDir(todaySe);
		fvo.setFileSize(boardfile.getSize());

		String originalFileName = boardfile.getOriginalFilename();
		String fileName = originalFileName.substring(originalFileName.lastIndexOf(File.separator) + 1);
		fvo.setFileName(fileName);

		UUID uuid = UUID.randomUUID();
		fvo.setUuid(uuid.toString());

		String fullFileName = today + "_" + uuid.toString() + "_" + fileName;

		File storeFile = new File(folders, fullFileName);

		try {
			boardfile.transferTo(storeFile);
			if (isImageFile(storeFile)) {
				fvo.setFileType(1);
				File thumbNail = new File(folders, uuid.toString() + "_th_" + fileName);
				Thumbnails.of(storeFile).size(75, 75).toFile(thumbNail);
			}
		} catch (Exception e) {
			log.debug(">>> 파일 생성 오류~!!");
			e.printStackTrace();
		}

		return fvo;
	}

	// 이미지 파일인지 확인하는 메서드
	private boolean isImageFile(File storeFile) throws IOException {
		String mimeType = new Tika().detect(storeFile); // image/jpg
		log.info("mimeType>>>>" + mimeType);
		return mimeType.startsWith("image") ? true : false;
	}
}
