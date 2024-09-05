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
};