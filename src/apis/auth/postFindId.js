import { apiInstance } from "..";
export default async function postFindId(name, phone) {
    const api = apiInstance();  // API 인스턴스 생성

    try {
        const response = await api.post("/findid", { name, phone });
        return response.data; // 데이터만 반환
    } catch (error) {
        throw error; // 오류가 발생하면 오류를 던짐
    }
}