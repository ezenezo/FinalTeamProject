package com.myweb.www.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import com.myweb.www.service.UserImageurlService;
import lombok.extern.slf4j.Slf4j;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Slf4j
@Component // Spring Bean으로 등록
public class UserProfileInterceptor implements HandlerInterceptor {

    @Autowired
    private UserImageurlService userImageurlService;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	log.info("UserProfileInterceptor클래스의 preHandle함수진입 ");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            String imageUrl = userImageurlService.getUserProfileImageUrl(username);
            request.setAttribute("userProfileImageUrl", imageUrl);

//            String imageUrl = "http://example.com/user/profile/image.jpg";
//            request.setAttribute("userProfileImageUrl", imageUrl);
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 컨트롤러 실행 후, 뷰 렌더링 전에 실행됩니다.
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 요청 처리의 완전한 종료 후 실행됩니다. (뷰 렌더링 이후)
    }
}
