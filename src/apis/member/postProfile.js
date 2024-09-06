import { fileApiInstance } from "..";

export default async function postProfile(data, success, fail){
    const api = fileApiInstance();
    return await api.post("/mypage/editprofile", data).then(success).catch(fail);
}