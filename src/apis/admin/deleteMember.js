import { apiInstance } from "..";

export default function deleteMember(memberIdx, success, fail) {
    const api = apiInstance();
    
    api.delete(`/admin/member?member_idx=${memberIdx}`)
       .then(response => {
           if (response.data && response.data.message) {
               success(response.data);
           } else {
               success({ message: '해당 멤버가 강퇴되었습니다.' });
           }
       })
       .catch(fail);
}
