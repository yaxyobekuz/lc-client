// API
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const usersAPI = {
  list: (params) => http.get(ENDPOINTS.users.base, { params }),
  byId: (id) => http.get(ENDPOINTS.users.byId(id)),
  // Yaratish faqat auth.register-user orqali (parol bilan birga)
  create: (body) => http.post(ENDPOINTS.auth.registerUser, body),
  update: (id, body) => http.patch(ENDPOINTS.users.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.users.byId(id)),
  groupHistory: (id, params) =>
    http.get(ENDPOINTS.users.groupHistory(id), { params }),
};
