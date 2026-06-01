import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const leadStatusesAPI = {
  list: (params) => http.get(ENDPOINTS.leadStatuses.base, { params }),
  byId: (id) => http.get(ENDPOINTS.leadStatuses.byId(id)),
  create: (body) => http.post(ENDPOINTS.leadStatuses.base, body),
  update: (id, body) => http.patch(ENDPOINTS.leadStatuses.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.leadStatuses.byId(id)),
  setDefault: (id) => http.post(ENDPOINTS.leadStatuses.setDefault(id)),
};
