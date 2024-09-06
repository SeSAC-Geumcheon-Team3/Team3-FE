import { apiInstance } from "..";

export default function addProduct(data, success, fail) {
    const api = apiInstance();
    api.post("/product", data).then(success).catch(fail);
}
