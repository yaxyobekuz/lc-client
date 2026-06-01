import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const expensesAPI = {
  list: (params) => http.get(ENDPOINTS.expenses.base, { params }),
  byId: (id) => http.get(ENDPOINTS.expenses.byId(id)),
  create: (body) => http.post(ENDPOINTS.expenses.base, body),
  update: (id, body) => http.patch(ENDPOINTS.expenses.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.expenses.byId(id)),
  restore: (id) => http.post(`${ENDPOINTS.expenses.byId(id)}/restore`),
  stats: (params) => http.get(ENDPOINTS.expenses.stats, { params }),
};
