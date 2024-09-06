import { apiInstance } from "..";

export default async function getMemberInfo(success, fail){
    const api = apiInstance();
    return await api.get("/mypage").then(success).catch(fail);
}