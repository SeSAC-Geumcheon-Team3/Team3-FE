import { apiInstance } from "./";

export default async function getAuth(success, fail){
    const api = apiInstance();
    return await api.get("/getAuth").then(success).catch(fail);
}