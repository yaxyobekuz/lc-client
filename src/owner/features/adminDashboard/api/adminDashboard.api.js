import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const adminDashboardAPI = {
  overview: (params) =>
    http.get(ENDPOINTS.adminDashboard.overview, { params }),
  monthlyFinancials: (params) =>
    http.get(ENDPOINTS.adminDashboard.monthlyFinancials, { params }),
  incomeByTeacher: (params) =>
    http.get(ENDPOINTS.adminDashboard.incomeByTeacher, { params }),
  studentFlow: (params) =>
    http.get(ENDPOINTS.adminDashboard.studentFlow, { params }),
  forecast: () => http.get(ENDPOINTS.adminDashboard.forecast),
};
