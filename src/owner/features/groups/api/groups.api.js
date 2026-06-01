// API
import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const groupsAPI = {
  list: (params) => http.get(ENDPOINTS.groups.base, { params }),
  byId: (id) => http.get(ENDPOINTS.groups.byId(id)),
  create: (body) => http.post(ENDPOINTS.groups.base, body),
  update: (id, body) => http.patch(ENDPOINTS.groups.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.groups.byId(id)),
  restore: (id) => http.post(`${ENDPOINTS.groups.byId(id)}/restore`),

  addStudent: (id, studentId) =>
    http.post(ENDPOINTS.groups.students(id), { studentId }),
  removeStudent: (id, studentId, leaveStatus) =>
    http.delete(ENDPOINTS.groups.studentById(id, studentId), {
      data: leaveStatus ? { leaveStatus } : {},
    }),
  transferStudent: (id, studentId, targetGroupId) =>
    http.post(ENDPOINTS.groups.transfer(id, studentId), { targetGroupId }),

  replaceTeacher: (id, body) =>
    http.post(`/groups/${id}/replace-teacher`, body),

  history: (id, params) => http.get(ENDPOINTS.groups.history(id), { params }),
};
