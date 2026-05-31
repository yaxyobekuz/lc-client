import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const attendanceAPI = {
  listForGroupDate: (groupId, date) =>
    http.get(ENDPOINTS.attendance.groupOnDate(groupId), { params: { date } }),
  bulkRecord: (groupId, body) =>
    http.post(ENDPOINTS.attendance.bulk(groupId), body),
  studentMonthly: (studentId, params) =>
    http.get(ENDPOINTS.attendance.studentMonthly(studentId), { params }),
  studentYearly: (studentId, params) =>
    http.get(ENDPOINTS.attendance.studentYearly(studentId), { params }),
  studentSummary: (studentId, params) =>
    http.get(ENDPOINTS.attendance.studentSummary(studentId), { params }),
  groupSummary: (groupId, params) =>
    http.get(ENDPOINTS.attendance.groupSummary(groupId), { params }),
  groupMonthly: (groupId, params) =>
    http.get(ENDPOINTS.attendance.groupMonthly(groupId), { params }),
  teacherStatus: (groupId, date) =>
    http.get(ENDPOINTS.attendance.teacher(groupId), { params: { date } }),
  setTeacherAttendance: (groupId, body) =>
    http.post(ENDPOINTS.attendance.teacher(groupId), body),
  teacherSummary: (params) =>
    http.get(ENDPOINTS.attendance.teacherSummary, { params }),
  dashboard: (params) => http.get(ENDPOINTS.attendance.dashboard, { params }),
};
