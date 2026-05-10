import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const leadSourcesAPI = {
  list: (params) => http.get(ENDPOINTS.leadSources.base, { params }),
  byId: (id) => http.get(ENDPOINTS.leadSources.byId(id)),
  create: (body) => http.post(ENDPOINTS.leadSources.base, body),
  update: (id, body) => http.patch(ENDPOINTS.leadSources.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.leadSources.byId(id)),
};
