import { apiInstance } from "..";

export default async function getAuthByPW(accessToken, inputPassword, success, fail){
    const api = apiInstance(accessToken);
    return await api.post("/mypage/get_edit_auth",{"password":inputPassword}).then(success).catch(fail);
}