package com.myweb.www.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.myweb.www.repository.StatusDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class StatusServiceImpl implements StatusService {
	@Inject
	private StatusDAO sdao;
}
