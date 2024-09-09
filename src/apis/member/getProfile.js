import { fileReqApiInstance } from "..";

export default async function getProfile(success, fail){
    const api = fileReqApiInstance();
    return await api.get("/getprofile").then(success).catch(fail);
}