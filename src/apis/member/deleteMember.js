import { apiInstance } from "..";

export default async function deleteMember(accessToken, data, success, fail){
    const api = apiInstance(accessToken);
    return await api.delete("/delete_account",data).then(success).catch(fail);
}