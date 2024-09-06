import { apiInstance } from "..";

export default async function putMemberInfo(data, success, fail){
    const api = apiInstance();
    return await api.put("/mypage/edit",data).then(success).catch(fail);
}