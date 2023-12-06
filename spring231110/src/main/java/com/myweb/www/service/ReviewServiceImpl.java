package com.myweb.www.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myweb.www.repository.ReviewDAO;

@Service
public class ReviewServiceImpl implements ReviewService{

	private ReviewDAO rdao;

	@Autowired
	public ReviewServiceImpl(ReviewDAO rdao) {
		this.rdao = rdao;
	}
	
	
}
