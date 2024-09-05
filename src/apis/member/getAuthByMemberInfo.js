import { basicApiInstance } from "..";

export default async function getAuthByMemberInfo(data, success, fail){
    const api = basicApiInstance();
    return await api.post("/findpw",data).then(success).catch(fail);
}