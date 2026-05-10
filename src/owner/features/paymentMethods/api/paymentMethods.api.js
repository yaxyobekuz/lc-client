import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const paymentMethodsAPI = {
  list: (params) => http.get(ENDPOINTS.paymentMethods.base, { params }),
  byId: (id) => http.get(ENDPOINTS.paymentMethods.byId(id)),
  create: (body) => http.post(ENDPOINTS.paymentMethods.base, body),
  update: (id, body) => http.patch(ENDPOINTS.paymentMethods.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.paymentMethods.byId(id)),
};
