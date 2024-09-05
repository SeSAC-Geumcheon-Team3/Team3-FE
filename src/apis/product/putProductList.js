import { apiInstance } from "..";

export default async function putProductList(accessToken, data, success, fail) {
    const api = apiInstance(accessToken);
    return await api.put("/product", data).then(success).catch(fail);
}
