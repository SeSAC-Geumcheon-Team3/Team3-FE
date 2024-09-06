import { apiInstance } from "..";

export default async function getAuthByPW(inputPassword, success, fail){
    const api = apiInstance();
    return await api.post("/mypage/get_edit_auth",{"password":inputPassword}).then(success).catch(fail);
}