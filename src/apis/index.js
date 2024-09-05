import axios from "axios";
import { interceptors } from "./setupInterceptor";

const base_URL = "http://localhost:8000";

export const apiInstance = (accessToken) =>{
  
  const instance = axios.create({
    baseURL: base_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  interceptors(instance, accessToken)

  return instance;
};

export const basicApiInstance = () =>{
  
  const instance = axios.create({
    baseURL: base_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;

}

export const fileApiInstance = (accessToken) => {
  
  const instance = axios.create({
    baseURL: base_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  interceptors(instance, accessToken)

  return instance;

}

export const fileReqApiInstance = (accessToken) => {
  
  const instance = axios.create({
    baseURL: base_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  responseType: 'blob', // 응답 형식을 blob으로 설정

  interceptors(instance, accessToken)

  return instance;
};