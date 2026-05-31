import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const expenseTypesAPI = {
  list: (params) => http.get(ENDPOINTS.expenseTypes.base, { params }),
  byId: (id) => http.get(ENDPOINTS.expenseTypes.byId(id)),
  create: (body) => http.post(ENDPOINTS.expenseTypes.base, body),
  update: (id, body) => http.patch(ENDPOINTS.expenseTypes.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.expenseTypes.byId(id)),
};
