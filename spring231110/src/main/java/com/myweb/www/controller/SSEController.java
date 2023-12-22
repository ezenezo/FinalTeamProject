package com.myweb.www.controller;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.myweb.www.domain.RequestVO;
import com.myweb.www.service.QuotationService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@RestController
public class SSEController {
	@Inject
	private QuotationService qsv;

    @GetMapping("/sse")
    public SseEmitter request(@RequestParam("id") String id) {
    	
    	
        SseEmitter emitter = new SseEmitter();
        List<RequestVO> rvo = qsv.getList(id);
        log.info("받은요청 리스트 아이디 들어옴" + id);
        log.info("받은요청 리스트 보기" + rvo);
        
        try {
            emitter.send(rvo);
            
            List<RequestVO> readList = qsv.getList_read(id);
            emitter.send(readList);
            
            log.info("받은 요청 리스트들어옴" + rvo);
        } catch (IOException e) {
            e.printStackTrace();
            emitter.completeWithError(e);
        } finally {
            emitter.complete();
        }
        return emitter;
    }
}