// API
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const teacherSalaryAPI = {
  // Maoshlar
  salaries: (params) => http.get(ENDPOINTS.teacherSalary.salaries, { params }),
  salary: (id) => http.get(ENDPOINTS.teacherSalary.salaryById(id)),
  salaryHistory: (teacherId) =>
    http.get(ENDPOINTS.teacherSalary.salaryHistory(teacherId)),
  upsertSalary: (body) => http.put(ENDPOINTS.teacherSalary.salaries, body),
  obligations: (params) => http.get(ENDPOINTS.teacherSalary.obligations, { params }),

  // To'lovlar (chiqim)
  addTransaction: (body) => http.post(ENDPOINTS.teacherSalary.transactions, body),
  removeTransaction: (id) =>
    http.delete(ENDPOINTS.teacherSalary.transactionById(id)),

  // Stabil maosh sozlamalari (foiz/fiksa per o'qituvchi+guruh)
  configs: (params) => http.get(ENDPOINTS.teacherSalary.configs, { params }),
  upsertConfig: (body) => http.put(ENDPOINTS.teacherSalary.configs, body),
  removeConfig: (teacher, group) =>
    http.delete(ENDPOINTS.teacherSalary.configByPair(teacher, group)),

  // Maosh stavkasi DAVRLARI (manba haqiqati - timeline)
  ratePeriods: (params) => http.get(ENDPOINTS.teacherSalary.ratePeriods, { params }),
  createRatePeriod: (body) => http.post(ENDPOINTS.teacherSalary.ratePeriods, body),
  updateRatePeriod: (id, body) =>
    http.patch(ENDPOINTS.teacherSalary.ratePeriodById(id), body),
  removeRatePeriod: (id) =>
    http.delete(ENDPOINTS.teacherSalary.ratePeriodById(id)),

  // Bonus / Jarima
  adjustments: (params) => http.get(ENDPOINTS.teacherSalary.adjustments, { params }),
  createAdjustment: (body) => http.post(ENDPOINTS.teacherSalary.adjustments, body),
  updateAdjustment: (id, body) =>
    http.patch(ENDPOINTS.teacherSalary.adjustmentById(id), body),
  removeAdjustment: (id) =>
    http.delete(ENDPOINTS.teacherSalary.adjustmentById(id)),
};
