import { Navigate } from "react-router-dom";
import { removeCookie } from "utils/cookie";
import { getCookie } from "utils/cookie";

/**
 * setupInterceptors.js
 * API 설정. 
 * axios 인스턴스 생성 후 호출
 */
export const interceptors = (apiInstance) => {
  const navigate = Navigate();
  const token = getCookie('accessToken');

  // 요청 인터셉터
  apiInstance.interceptors.request.use(
    (config) => {
      if (token) {                                              // accessToken이 있다면 헤더에 accessToken 담기
        config.headers.Authorization = `Bearer ${token}`;     
      }
      return config;
    },
    (error) => {
      Promise.reject(error)
    }
  );
  
  //  응답 인터셉터
  apiInstance.interceptors.response.use(
      (response) => {
          return response;
      },
      (error) => {
        // 인증 관련 에러 처리 (401, 403 등)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          removeCookie('accessToken'); // 만료된 토큰을 제거
          navigate('/login'); // 로그인 페이지로 리다이렉트
        }
        return Promise.reject(error);
      }
  );
};