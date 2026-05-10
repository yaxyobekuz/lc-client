import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const paymentReportsAPI = {
  summary: (params) => http.get(ENDPOINTS.paymentReports.summary, { params }),
  groupStats: (params) =>
    http.get(ENDPOINTS.paymentReports.groupStats, { params }),
  topDebtors: (params) =>
    http.get(ENDPOINTS.paymentReports.topDebtors, { params }),
  topPayers: (params) =>
    http.get(ENDPOINTS.paymentReports.topPayers, { params }),
  monthlyTrend: (params) =>
    http.get(ENDPOINTS.paymentReports.monthlyTrend, { params }),
  daily: (params) => http.get(ENDPOINTS.paymentReports.daily, { params }),
};
