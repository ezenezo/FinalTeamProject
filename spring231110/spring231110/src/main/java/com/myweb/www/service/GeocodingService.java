package com.myweb.www.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.myweb.www.domain.Coordinates;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GeocodingService {

	@Autowired
    private RestTemplate restTemplate;

    // 네이버 API 키 설정
    private String clientId = "pue5mbf2xj";
    private String clientSecret = "LidSyDCXhVdStsAMjTC5tVxpatPLyAc6d7NH5I3x";

    public Coordinates getCoordinate(String address) {
        String url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=" + address;
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", clientId);
        headers.set("X-NCP-APIGW-API-KEY", clientSecret);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE); 
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        
        String responseBody = response.getBody();
        log.info("Response from Geocoding API:는: " + responseBody);
        JSONObject jsonObject = new JSONObject(responseBody);
        JSONArray jsonArray = jsonObject.getJSONArray("addresses");
        if (jsonArray.length() > 0) {
            JSONObject firstAddress = jsonArray.getJSONObject(0);
            double latitude = firstAddress.getDouble("y");
            double longitude = firstAddress.getDouble("x");
            return new Coordinates(latitude, longitude);
        } else {
            // 적절한 예외 처리 또는 반환 값 처리
            return null;
        }
        
    }
}
