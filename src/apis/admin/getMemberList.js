import { apiInstance } from "..";

export default function getMemberList(page, size, accessToken, success, fail) {
    const api = apiInstance(accessToken);
    api.get(`/admin/member?size=${size}&page=${page}`).then(success).catch(fail);
}
