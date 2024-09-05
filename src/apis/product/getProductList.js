import { apiInstance } from "..";

export default async function getProductList(accessToken, data, success, fail) {
    const api = apiInstance(accessToken);
    return await api.get("/product", {params:data}).then(success).catch(fail);
}
