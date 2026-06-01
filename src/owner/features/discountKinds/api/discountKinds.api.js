import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const discountKindsAPI = {
  list: (params) => http.get(ENDPOINTS.discountKinds.base, { params }),
  byId: (id) => http.get(ENDPOINTS.discountKinds.byId(id)),
  create: (body) => http.post(ENDPOINTS.discountKinds.base, body),
  update: (id, body) => http.patch(ENDPOINTS.discountKinds.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.discountKinds.byId(id)),
  setDefault: (id) => http.post(ENDPOINTS.discountKinds.setDefault(id)),
};
