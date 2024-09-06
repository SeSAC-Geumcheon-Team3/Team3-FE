import { apiInstance } from "..";

export default function getMemberList(page, size, success, fail) {
    const api = apiInstance();
    api.get(`/admin/member?size=${size}&page=${page}`).then(success).catch(fail);
}
