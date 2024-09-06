import { fileReqApiInstance } from "..";

export default async function getProfile(success, fail){
    const api = fileReqApiInstance();
    return await api.get("/mypage/profile").then(success).catch(fail);
}