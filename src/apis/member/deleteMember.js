import { apiInstance } from "..";

export default async function deleteMember(success, fail){
    const api = apiInstance();
    return await api.delete("/delete_account").then(success).catch(fail);
}