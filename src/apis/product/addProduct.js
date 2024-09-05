import { apiInstance } from "..";

export default function addProduct(data, accessToken, success, fail) {
    const api = apiInstance(accessToken);
    api.post("/product", data).then(success).catch(fail);
}
