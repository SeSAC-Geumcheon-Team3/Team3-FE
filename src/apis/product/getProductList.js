import { apiInstance } from "..";

export default async function getProductList(success, fail) {
    const api = apiInstance();
    return await api.get("/product").then(success).catch(fail);
}
