import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const studentFreezesAPI = {
  list: (params) => http.get(ENDPOINTS.studentFreezes.base, { params }),
  create: (body) => http.post(ENDPOINTS.studentFreezes.base, body),
  update: (id, body) => http.patch(ENDPOINTS.studentFreezes.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.studentFreezes.byId(id)),
};
