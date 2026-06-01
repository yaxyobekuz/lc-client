import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const leadDirectionsAPI = {
  list: (params) => http.get(ENDPOINTS.leadDirections.base, { params }),
  byId: (id) => http.get(ENDPOINTS.leadDirections.byId(id)),
  create: (body) => http.post(ENDPOINTS.leadDirections.base, body),
  update: (id, body) => http.patch(ENDPOINTS.leadDirections.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.leadDirections.byId(id)),
  setDefault: (id) => http.post(ENDPOINTS.leadDirections.setDefault(id)),
};
