// API
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const usersAPI = {
  list: (params) => http.get(ENDPOINTS.users.base, { params }),
  byId: (id) => http.get(ENDPOINTS.users.byId(id)),
  // Yaratish faqat auth.register-user orqali (parol bilan birga)
  create: (body) => http.post(ENDPOINTS.auth.registerUser, body),
  update: (id, body) => http.patch(ENDPOINTS.users.byId(id), body),
  getPassword: (id) => http.get(ENDPOINTS.users.password(id)),
  setPassword: (id, password) =>
    http.patch(ENDPOINTS.users.password(id), { password }),
  remove: (id) => http.delete(ENDPOINTS.users.byId(id)),
  restore: (id) => http.post(`${ENDPOINTS.users.byId(id)}/restore`),
  groupHistory: (id, params) =>
    http.get(ENDPOINTS.users.groupHistory(id), { params }),
};
