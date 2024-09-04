/**
 * setupInterceptors.js
 * API 설정. 
 * axios 인스턴스 생성 후 호출
 */
export const interceptors = (apiInstance, accessToken) => {

  // 요청 인터셉터
  apiInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {                                              // accessToken이 있다면 헤더에 accessToken 담기
        config.headers.Authorization = `Bearer ${accessToken}`;     
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  //  응답 인터셉터
  apiInstance.interceptors.response.use(
      (response) => {
          return response;
      },
      (error) => {
        return Promise.reject(error);
      }
  );
};