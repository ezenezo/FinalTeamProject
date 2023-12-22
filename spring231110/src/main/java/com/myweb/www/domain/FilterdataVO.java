package com.myweb.www.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FilterdataVO {
	private String order;
	private String homeTypeSh;
	private String roomCntSh;
	private String familyTypeSh;
	private String homeStyleSh;
	private int sliderOneVal;
	private int sliderTwoVal;
	private String id;

}
