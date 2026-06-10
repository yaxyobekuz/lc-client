// API
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const teacherSalaryAPI = {
  // Maoshlar
  salaries: (params) => http.get(ENDPOINTS.teacherSalary.salaries, { params }),
  salary: (id) => http.get(ENDPOINTS.teacherSalary.salaryById(id)),
  upsertSalary: (body) => http.put(ENDPOINTS.teacherSalary.salaries, body),
  regenerate: (body) => http.post(ENDPOINTS.teacherSalary.regenerate, body),
  obligations: (params) => http.get(ENDPOINTS.teacherSalary.obligations, { params }),

  // To'lovlar (chiqim)
  addTransaction: (body) => http.post(ENDPOINTS.teacherSalary.transactions, body),
  removeTransaction: (id) =>
    http.delete(ENDPOINTS.teacherSalary.transactionById(id)),

  // Bonus / Jarima
  adjustments: (params) => http.get(ENDPOINTS.teacherSalary.adjustments, { params }),
  createAdjustment: (body) => http.post(ENDPOINTS.teacherSalary.adjustments, body),
  updateAdjustment: (id, body) =>
    http.patch(ENDPOINTS.teacherSalary.adjustmentById(id), body),
  removeAdjustment: (id) =>
    http.delete(ENDPOINTS.teacherSalary.adjustmentById(id)),

  // Hisobot
  reportMonthly: (params) =>
    http.get(ENDPOINTS.teacherSalary.reportMonthly, { params }),
};
