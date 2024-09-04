import { apiInstance } from "..";

export default async function putMemberInfo(accessToken, data, success, fail){
    const api = apiInstance(accessToken);
    return await api.put("/mypage/edit",data).then(success).catch(fail);
}