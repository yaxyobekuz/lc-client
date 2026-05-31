import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const salariesAPI = {
  list: (params) => http.get(ENDPOINTS.salaries.base, { params }),
  byId: (id) => http.get(ENDPOINTS.salaries.byId(id)),
  payouts: (id) => http.get(ENDPOINTS.salaries.payouts(id)),
  calculate: (body) => http.post(ENDPOINTS.salaries.calculate, body),
  recompute: (id) => http.post(ENDPOINTS.salaries.recompute(id)),
  approve: (id) => http.post(ENDPOINTS.salaries.approve(id)),
  cancel: (id, body) => http.post(ENDPOINTS.salaries.cancel(id), body),
  addAdjustment: (id, body) =>
    http.post(ENDPOINTS.salaries.adjustments(id), body),
  removeAdjustment: (id, adjId) =>
    http.delete(ENDPOINTS.salaries.adjustmentById(id, adjId)),
  recordPayout: (id, body) =>
    http.post(ENDPOINTS.salaries.payouts(id), body),
  recordPayoutBatch: (body) =>
    http.post(ENDPOINTS.salaries.payoutsBatch, body),
  removePayout: (payoutId) =>
    http.delete(ENDPOINTS.salaries.payoutById(payoutId)),
  dashboard: (params) => http.get(ENDPOINTS.salaries.dashboard, { params }),
  dashboardTeachers: (params) =>
    http.get(ENDPOINTS.salaries.dashboardTeachers, { params }),
  trend: (params) => http.get(ENDPOINTS.salaries.trend, { params }),
  myCurrent: () => http.get(ENDPOINTS.salaries.myCurrent),
  myHistory: (params) => http.get(ENDPOINTS.salaries.myHistory, { params }),
};
