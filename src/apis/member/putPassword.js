import { apiInstance } from "..";

export default async function putPassword(accessToken, pw, success, fail){
    const api = apiInstance(accessToken);
    return await api.put("/reset_pw",{"password":pw}).then(success).catch(fail);
}