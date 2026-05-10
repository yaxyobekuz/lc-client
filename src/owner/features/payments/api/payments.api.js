import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const paymentsAPI = {
  list: (params) => http.get(ENDPOINTS.payments.base, { params }),
  byId: (id) => http.get(ENDPOINTS.payments.byId(id)),
  receipt: (id) => http.get(ENDPOINTS.payments.receipt(id)),
  record: (body) => http.post(ENDPOINTS.payments.base, body),
  refund: (id, body) => http.post(ENDPOINTS.payments.refund(id), body),
};
