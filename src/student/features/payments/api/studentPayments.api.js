import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const studentPaymentsAPI = {
  invoices: (studentId) =>
    http.get(ENDPOINTS.invoices.base, {
      params: { studentId, limit: 100 },
    }),
  payments: (studentId) =>
    http.get(ENDPOINTS.payments.base, {
      params: { studentId, limit: 100 },
    }),
};
