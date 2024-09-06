import { apiInstance } from "..";

export default async function putProductList(data, success, fail) {
    const api = apiInstance();
    await api.put("/product", data).then(success).catch(fail);
}
