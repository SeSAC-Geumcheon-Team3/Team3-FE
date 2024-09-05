import { fileApiInstance } from "..";

export default async function postProfile(accessToken, data, success, fail){
    const api = fileApiInstance(accessToken);
    return await api.post("/mypage/editprofile", data).then(success).catch(fail);
}