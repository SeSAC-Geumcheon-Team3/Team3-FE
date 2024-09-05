import { basicApiInstance } from "..";

export default async function postLogin(data, success, fail){
    const api = basicApiInstance();
    return await api.post("/signin",data).then(success).catch(fail);
}