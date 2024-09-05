import { apiInstance } from "..";

export default async function postSignup(userData, success, fail) {
    const api = apiInstance(); // API 인스턴스 생성
    try {

        const response = await api.post("/signup", userData);
        // 요청이 성공하면 success 콜백 호출
        success(response);
    } catch (error) {
        // 요청이 실패하면 fail 콜백 호출
        fail(error);
    }
}
