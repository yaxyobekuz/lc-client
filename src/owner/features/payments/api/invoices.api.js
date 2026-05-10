import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const invoicesAPI = {
  list: (params) => http.get(ENDPOINTS.invoices.base, { params }),
  byId: (id) => http.get(ENDPOINTS.invoices.byId(id)),
  create: (body) => http.post(ENDPOINTS.invoices.base, body),
  update: (id, body) => http.patch(ENDPOINTS.invoices.byId(id), body),
  cancel: (id, body) => http.post(ENDPOINTS.invoices.cancel(id), body),
  generateMonth: (body) => http.post(ENDPOINTS.invoices.generateMonth, body),
};
