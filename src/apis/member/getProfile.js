import { fileReqApiInstance } from "..";

export default async function getProfile(accessToken, data, success, fail){
    const api = fileReqApiInstance(accessToken);
    return await api.get("/mypage/profile").then(success).catch(fail);
}