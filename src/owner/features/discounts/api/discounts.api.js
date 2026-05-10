import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const discountsAPI = {
  list: (params) => http.get(ENDPOINTS.discounts.base, { params }),
  create: (body) => http.post(ENDPOINTS.discounts.base, body),
  update: (id, body) => http.patch(ENDPOINTS.discounts.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.discounts.byId(id)),
};
