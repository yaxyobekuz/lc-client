import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const teacherGroupRatesAPI = {
  list: (params) => http.get(ENDPOINTS.teacherGroupRates.base, { params }),
  byId: (id) => http.get(ENDPOINTS.teacherGroupRates.byId(id)),
  create: (body) => http.post(ENDPOINTS.teacherGroupRates.base, body),
  update: (id, body) =>
    http.patch(ENDPOINTS.teacherGroupRates.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.teacherGroupRates.byId(id)),
};
