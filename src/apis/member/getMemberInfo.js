import { apiInstance } from "..";

export default async function getMemberInfo(accessToken, success, fail){
    const api = apiInstance(accessToken);
    return await api.get("/mypage").then(success).catch(fail);
}