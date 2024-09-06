import { setCookie, getCookie } from "utils/cookie";
import { basicApiInstance } from "..";

const api = basicApiInstance();

export default async function postLogin(data){
    await api.post("/signin",data)
    .then(res=>{
        setCookie('accessToken', res.data.access_token, {maxAge:3600});
    });
}