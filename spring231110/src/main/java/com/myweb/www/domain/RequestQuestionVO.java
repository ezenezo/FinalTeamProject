package com.myweb.www.domain;

<<<<<<< HEAD:spring231110/src/main/java/com/myweb/www/security/MemberDTO.java
import lombok.Setter;
import lombok.ToString;

import java.util.List;

import com.myweb.www.domain.CompanyVO;
import com.myweb.www.domain.PortfolioDTO;
import com.myweb.www.domain.PortfolioVO;

=======
>>>>>>> 7d452a83189df358c84a578527fa4b84fc81fab2:spring231110/src/main/java/com/myweb/www/domain/RequestQuestionVO.java
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RequestQuestionVO {
	private long requestQuestionId;
	private String subject;
	private String questionType;
	private String region;

<<<<<<< HEAD:spring231110/src/main/java/com/myweb/www/security/MemberDTO.java
	private MemberVO mvo;
	private CompanyVO cvo;
	private List<PortfolioDTO> pdtoList;
=======
>>>>>>> 7d452a83189df358c84a578527fa4b84fc81fab2:spring231110/src/main/java/com/myweb/www/domain/RequestQuestionVO.java
}
