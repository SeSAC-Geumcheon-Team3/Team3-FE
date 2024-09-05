import { apiInstance } from "..";

export default async function getProductList(accessToken, success, fail) {
    const api = apiInstance(accessToken);
    return await api.get("/product").then(success).catch(fail);
}
