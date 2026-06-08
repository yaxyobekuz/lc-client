import http from "@/shared/api/http";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const leadsAPI = {
  list: (params) => http.get(ENDPOINTS.leads.base, { params }),
  byId: (id) => http.get(ENDPOINTS.leads.byId(id)),
  create: (body) => http.post(ENDPOINTS.leads.base, body),
  update: (id, body) => http.patch(ENDPOINTS.leads.byId(id), body),
  remove: (id) => http.delete(ENDPOINTS.leads.byId(id)),
  changeStatus: (id, body) => http.post(ENDPOINTS.leads.status(id), body),
  addNote: (id, body) => http.post(ENDPOINTS.leads.notes(id), body),
  recordContact: (id, body) => http.post(ENDPOINTS.leads.contacts(id), body),
  setFollowUp: (id, body) => http.post(ENDPOINTS.leads.followUp(id), body),
  setTrial: (id, body) => http.post(ENDPOINTS.leads.trial(id), body),
  recordTrialOutcome: (id, body) =>
    http.post(ENDPOINTS.leads.trialOutcome(id), body),
  convert: (id, body) => http.post(ENDPOINTS.leads.convert(id), body),
  dashboard: (params) => http.get(ENDPOINTS.leads.dashboard, { params }),
  sourcePerformance: (params) =>
    http.get(ENDPOINTS.leads.sourcePerformance, { params }),
  todayReminders: () => http.get(ENDPOINTS.leads.todayReminders),
  overdueReminders: () => http.get(ENDPOINTS.leads.overdueReminders),
};
